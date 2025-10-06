// src/app/lib/servicios.ts
import { fetchData, postData, putData, deleteData } from "./api";
import { fetchBlob } from "./api";
import type { Servicio } from "./types";

/** DTO del backend (CatalogItemDTO) */
type CatalogItemDTO = {
  id: number;
  sku?: string | null;
  name: string;
  description?: string | null;
  type: "PRODUCT" | "SERVICE";
  price?: number | null;
  category?: string | null;
  active?: boolean | null;
  stock?: number | null;
  createdAt?: string | null;
};

/** Helpers de mapeo */
const toUI = (it: CatalogItemDTO): Servicio => ({
  id: it.id,
  name: it.name, // ✅ usar name
  description: it.description ?? "",
  price: Number(it.price ?? 0),
  type: it.type,
  sku: it.sku ?? undefined,
  stock: it.stock ?? undefined,
  active: it.active ?? true,
  category: it.category ?? undefined,
});

const toDTO = (
  s: Omit<Servicio, "id"> | Servicio
): Partial<CatalogItemDTO> => ({
  name: s.name,
  description: s.description,
  price: s.price,
  type: (s as any).type ?? "SERVICE",
  category: s.category,
  active: (s as any).active ?? true,
  sku: s.sku,
});

/** Listado + buscador */
export async function getServicios(
  page = 0,
  size = 10,
  search?: string,
  options?: { sort?: string; type?: "PRODUCT" | "SERVICE" }
): Promise<{
  items: Servicio[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const qp = new URLSearchParams({
    page: String(page),
    size: String(size),
    // 👇 ya no forzamos SERVICE ni PRODUCT, puede traer ambos
    ...(options?.type ? { type: options.type } : {}),
  });
  if (options?.sort) qp.append("sort", options.sort);
  const s = (search || "").trim();
  if (s) qp.append("q", s);

  const res = await fetchData<any>(`catalog?${qp.toString()}`);

  const content: CatalogItemDTO[] = Array.isArray(res?.content)
    ? res.content
    : Array.isArray(res)
    ? res
    : [];

  const filtrados = content;

  return {
    items: filtrados.map(toUI),
    total:
      typeof res?.totalElements === "number"
        ? res.totalElements
        : filtrados.length ?? 0,
    page: typeof res?.number === "number" ? res.number : page,
    totalPages: typeof res?.totalPages === "number" ? res.totalPages : 1,
  };
}

/** Contador total (opcionalmente por tipo) */
export async function getServiciosCount(
  type?: "PRODUCT" | "SERVICE"
): Promise<number> {
  const { items } = await getServicios(0, 999, undefined, { type });
  return items.filter((it) => it.category !== "VENTA_RAPIDA").length;
}

/** Últimos N agregados */
export async function getUltimosCatalogo(n = 5, type?: "PRODUCT" | "SERVICE") {
  const { items } = await getServicios(0, n, undefined, {
    sort: "id,desc",
    type,
  });
  return items.filter((it) => it.category !== "VENTA_RAPIDA").length;
}

export async function createServicio(servicio: Omit<Servicio, "id">) {
  const payload = {
    ...toDTO(servicio),
    sku: servicio.sku ?? `SKU-${Date.now()}`,
  };

  const dto = await postData<CatalogItemDTO>("/catalog", payload);
  return dto;
}

/**
 * Actualizar
 * ⚠️ Requiere que exista PUT /api/catalog/{id} en el backend.
 */
export const updateServicio = async (id: number, data: Servicio) => {
  const dto = await putData<CatalogItemDTO>(`catalog/${id}`, toDTO(data));
  return toUI(dto);
};

/** Borrar (soft en el back si así lo definiste) */
export const deleteServicio = (id: number) => deleteData(`catalog/${id}`);

/** Export Excel (usa fetchBlob para respetar filename y MIME) */
export async function exportServiciosExcel() {
  const { blob, filename } = await fetchBlob("/catalog/export/excel");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "servicios.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Import Excel */
export async function importServiciosExcel(file: File) {
  const MAX = 10 * 1024 * 1024;
  const name = (file.name || "").toLowerCase();
  const okExt =
    name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".csv");
  if (!okExt) throw new Error("Formato no permitido. Subí XLSX/XLS o CSV");
  if (file.size > MAX) throw new Error("Archivo demasiado grande (>10MB)");

  const form = new FormData();
  form.append("file", file);

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"
    }/catalog/import/excel`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken") || ""
            : ""
        }`,
      },
      body: form,
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // {inserted/updated/errors} según tu dto.ImportResult
}
