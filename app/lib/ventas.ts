// src/app/lib/ventas.ts
import { fetchData, postData, deleteData, BASE_URL } from "./api";
import type { Venta } from "./types";

export type CreateSaleForm = {
  customerId: number;
  productId: number;
  quantity?: number;
  unitPrice: number;
  notes?: string;
  date?: string;
};

function ymDefaults(y?: number, m?: number) {
  const d = new Date();
  return { year: y ?? d.getFullYear(), month: m ?? d.getMonth() + 1 };
}

export async function getVentasMes(
  year?: number,
  month?: number,
  page = 0,
  size = 50
) {
  const { year: yy, month: mm } = ymDefaults(year, month);
  const q = new URLSearchParams({
    year: String(yy),
    month: String(mm),
    page: String(page),
    size: String(size),
  });
  return fetchData<any>(`sales/month?${q.toString()}`);
}

export async function getAllClientes(): Promise<
  Array<{ id: number; label: string }>
> {
  const res = await fetchData<any>("clientes?size=1000&page=0");
  const list = Array.isArray(res?.content)
    ? res.content
    : Array.isArray(res)
    ? res
    : [];
  return list.map((c: any) => ({
    id: Number(c.id),
    label:
      c.nombre ??
      c.name ??
      c.razonSocial ??
      c.fullName ??
      c.email ??
      `Cliente ${c.id}`,
  }));
}

// Devuelve revenue mensual del año dado (por defecto el año actual)
export async function getVentasMensuales(
  year?: number
): Promise<Record<string, number>> {
  const y = year ?? new Date().getFullYear();
  const out: Record<string, number> = {};

  // 12 llamadas (una por mes) usando tu endpoint de resumen
  for (let m = 1; m <= 12; m++) {
    try {
      const summary = await getResumenMes(y, m); // { sales, items, revenue }
      const key = `${y}-${String(m).padStart(2, "0")}`;
      out[key] = Number(summary?.revenue ?? 0);
    } catch {
      const key = `${y}-${String(m).padStart(2, "0")}`;
      out[key] = 0; // si falla un mes, lo dejamos en 0 para no romper gráficos
    }
  }

  return out;
}

export async function getVentasMesDetalle(year?: number, month?: number) {
  const { year: yy, month: mm } = ymDefaults(year, month);
  return fetchData<any>(`sales/month/detail?year=${yy}&month=${mm}`);
}

export async function getResumenMes(year?: number, month?: number) {
  const { year: yy, month: mm } = ymDefaults(year, month);
  return fetchData<any>(`sales/month/summary?year=${yy}&month=${mm}`);
}

export async function getVentasPorDia(year?: number, month?: number) {
  const { year: yy, month: mm } = ymDefaults(year, month);
  return fetchData<any>(`sales/month/by-day?year=${yy}&month=${mm}`);
}

export async function getTopProductos(
  year?: number,
  month?: number,
  limit = 5
) {
  const { year: yy, month: mm } = ymDefaults(year, month);
  return fetchData<any>(
    `sales/month/top-products?year=${yy}&month=${mm}&limit=${limit}`
  );
}

// -------------------- Crear / Borrar --------------------

export async function createVentaDesdeUI(
  ventaUI: Venta & { productId: number; customerId: number; quantity?: number }
) {
  const dateISO =
    ventaUI.fecha && !isNaN(new Date(ventaUI.fecha).getTime())
      ? ventaUI.fecha
      : new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const payload = {
    date: dateISO,
    customerId: Number(ventaUI.customerId),
    notes: ventaUI.descripcion || "",
    items: [
      {
        productId: Number(ventaUI.productId),
        quantity: Number(ventaUI.quantity ?? 1),
        unitPrice: Number(ventaUI.monto),

        // ✅ Ahora viajan desde SaleForm → createVentaDesdeUI → back
        name: ventaUI.productName || "Venta rápida",
        description: ventaUI.descripcion || "Sin descripción",
        service: ventaUI.productType === "SERVICE",
      },
    ],
  };

  return postData(`/sales`, payload);
}

export async function updateVentaDesdeUI(
  id: number,
  ventaUI: Venta & { productId: number; customerId: number; quantity?: number }
) {
  // Por ahora hacemos delete + create, pero reusamos el mismo payload
  await deleteVenta(id);
  return createVentaDesdeUI(ventaUI);
}

export const deleteVenta = (id: number) => deleteData(`/sales/${id}`);

export async function getUltimasVentas(): Promise<Venta[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sales/recent`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  if (!res.ok) throw new Error("Error al obtener ventas recientes");

  const data = await res.json();
  return data.map((s: any) => ({
    id: s.id,
    fecha: s.date,
    descripcion: s.description,
    monto: s.total,
    producto: s.productName,
  }));
}
// Export / Import Excel mensual
export async function exportVentasExcel(year: number, month: number) {
  const res = await fetch(
    `${BASE_URL}/sales/export/excel?year=${year}&month=${month}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    }
  );
  if (!res.ok) throw new Error(`Export HTTP ${res.status}`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `sales-${year}-${month}.xlsx`;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function importVentasExcel(file: File) {
  const MAX = 10 * 1024 * 1024;
  const name = (file.name || "").toLowerCase();
  const okExt =
    name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".csv");
  if (!okExt) throw new Error("Formato no permitido. Subí XLSX/XLS o CSV");
  if (file.size > MAX) throw new Error("Archivo demasiado grande (>10MB)");

  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE_URL}/sales/import/excel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
    },
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // {insertados, errores}
}

console.log("🧪 BASE_URL detectada:", BASE_URL);
