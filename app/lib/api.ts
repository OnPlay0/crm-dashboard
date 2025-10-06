// api.ts
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export function getAuthHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function handleAuthError(res: Response) {
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.clear();
      alert("⏳ Tu sesión ha expirado. Por favor, iniciá sesión nuevamente.");
      window.location.href = "/login";
    }
    throw Object.assign(new Error("Sesión expirada."), { status: 401 });
  }
  if (res.status === 403) {
    if (typeof window !== "undefined") {
      alert("🚫 No tenés permisos para acceder a esta sección.");
    }
    throw Object.assign(new Error("Acceso prohibido."), { status: 403 });
  }
}

const parseBackendError = async (res: Response): Promise<string> => {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    return (json.message || json.mensaje || text) as string;
  } catch {
    return text;
  }
};

// GET tipado
export async function fetchData<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const res = await fetch(url, { method: "GET", headers: getAuthHeaders() });
  await handleAuthError(res);
  if (!res.ok) throw new Error(await parseBackendError(res));
  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

// POST tipado
export const postData = async <T>(endpoint: string, data: any): Promise<T> => {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const res = await fetch(url, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  await handleAuthError(res);
  if (!res.ok)
    throw Object.assign(new Error(await parseBackendError(res)), {
      status: res.status,
    });
  return res.json() as Promise<T>;
};

// PUT tipado
export const putData = async <T>(endpoint: string, data: any): Promise<T> => {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  await handleAuthError(res);
  if (!res.ok)
    throw Object.assign(new Error(await parseBackendError(res)), {
      status: res.status,
    });
  return res.json() as Promise<T>;
};

// DELETE
export const deleteData = async (endpoint: string) => {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const res = await fetch(url, { method: "DELETE", headers: getAuthHeaders() });
  await handleAuthError(res);
  if (!res.ok)
    throw Object.assign(new Error(await parseBackendError(res)), {
      status: res.status,
    });
  return true;
};

// 👇 NUEVO: descarga de binarios con filename
export async function fetchBlob(
  endpoint: string
): Promise<{ blob: Blob; filename: string }> {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        typeof window !== "undefined"
          ? `Bearer ${localStorage.getItem("accessToken") || ""}`
          : "",
    },
  });

  await handleAuthError(res);
  if (!res.ok) throw new Error(await parseBackendError(res));

  // filename (si el servidor expone el header por CORS)
  let filename = "download";
  const dispo =
    res.headers.get("Content-Disposition") ||
    res.headers.get("content-disposition") ||
    "";
  const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i.exec(dispo);
  if (match?.[1]) filename = decodeURIComponent(match[1].replace(/['"]/g, ""));

  // MIME correcto (forzamos xlsx si el content-type viene vacío o genérico)
  const ct =
    res.headers.get("Content-Type") || res.headers.get("content-type") || "";
  const isExcel = ct.includes(
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  const ab = await res.arrayBuffer();
  const blob = new Blob([ab], {
    type: isExcel
      ? ct
      : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return { blob, filename };
}
