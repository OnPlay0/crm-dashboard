// app/lib/cliente.ts
import {
  fetchData,
  postData,
  putData,
  deleteData,
  fetchBlob,
  BASE_URL,
} from "./api";
import type { Cliente } from "./types";

export type EstadisticasClientes = {
  total: number;
  porEstado: Record<string, number>;
  ultimosClientes: Cliente[];
};

export const getClients = async (page = 0, size = 10, search = "") => {
  const qp = new URLSearchParams({ page: String(page), size: String(size) });
  const s = (search || "").trim();
  if (s) qp.append("q", s); // ← más simple. Si tu back exige nombre/apellido/email, vuelve a tu heurística.
  const res = await fetchData<any>(`clientes?${qp.toString()}`);
  return {
    clients: Array.isArray(res?.content) ? res.content : [],
    total: res?.totalElements ?? 0,
    page: res?.number ?? page,
    totalPages: res?.totalPages ?? 1,
  };
};

export const getClientsCount = () => fetchData<number>("clientes/count");
export const getEstadisticas = () =>
  fetchData<EstadisticasClientes>("clientes/estadisticas");

// CRUD
export const createClient = (data: Omit<Cliente, "id">) =>
  postData<Cliente>("clientes", data);
export const updateClient = (data: Partial<Cliente> & { id: number }) =>
  putData<Cliente>(`clientes/${data.id}`, data);
export const removeClient = (id: number) => deleteData(`clientes/${id}`);

// Estado (si tu back no tiene endpoint específico, usa updateClient(id,{estado:nuevo}))
export const updateClientEstado = (id: number, nuevoEstado: string) =>
  putData(`clientes/${id}/estado`, { estado: nuevoEstado });

// Export
export const exportClientsToExcel = async () => {
  const { blob, filename } = await fetchBlob("/clientes/export/excel");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "clientes.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return true;
};

// Import
export type ImportResult = {
  inserted: number;
  updated: number;
  errors: Array<{ row: number; message: string }>;
};

export async function importarClientesDesdeExcel(
  file: File
): Promise<ImportResult> {
  const MAX = 10 * 1024 * 1024;
  const name = (file.name || "").toLowerCase();
  const okExt =
    name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".csv");
  if (!okExt) throw new Error("Formato no permitido. Subí XLSX/XLS o CSV");
  if (file.size > MAX) {
    const err: any = new Error("Archivo demasiado grande (>10MB)");
    err.__status = 413;
    throw err;
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/clientes/import/excel`, {
    method: "POST",
    headers: {
      // NO 'Content-Type' — deja que el browser ponga el boundary
      Authorization: `Bearer ${
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") || ""
          : ""
      }`,
    },
    body: formData,
  });

  if (!res.ok) {
    const txt = await res.text();
    const err: any = new Error(txt || `HTTP ${res.status}`);
    err.__status = res.status;
    throw err;
  }
  return (await res.json()) as ImportResult;
}

// Select liviano
export async function getAllClientesLite(): Promise<
  Array<{ id: number; label: string }>
> {
  const pageSize = 1000;
  const res: any = await fetchData(`clientes?page=0&size=${pageSize}`);
  const list: any[] = res?.content ?? [];
  return list.map((c: any) => ({
    id: Number(c.id),
    label: `${c.nombre ?? ""} ${c.apellido ?? ""} — ${c.email ?? ""}`.trim(),
  }));
}
