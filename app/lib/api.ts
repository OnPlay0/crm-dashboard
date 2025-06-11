export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("accessToken");
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
}
// 🔐 Verificación global de sesión expirada o rechazada
async function handleAuthError(res: Response) {
  if (res.status === 401 || res.status === 403) {
    localStorage.clear();
    alert(
      "⏳ Tu sesión ha expirado o fue revocada. Por favor, iniciá sesión nuevamente."
    );
    window.location.href = "/login";
    throw new Error("Sesión inválida o expirada.");
  }
}

// 🔍 GET
export async function fetchData<T>(endpoint: string): Promise<T> {
  // 1) Guardia: si no hay token, aborta aquí
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return Promise.reject("No autenticado");
  }

  // 2) Construcción de URL
  const cleanedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanedEndpoint}`;
  console.log("➡️ URL que se va a fetch:", url);

  // 3) Llamada con headers ya incluyendo Authorization
  const res = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  // 4) Manejo de 401/403
  await handleAuthError(res);

  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`);
  }

  return res.json();
}

// ➕ POST
export const postData = async (endpoint: string, data: any) => {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  console.log("Posting to:", url);
  console.log("📦 Payload que se va a enviar:", data);

  const res = await fetch(url, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  await handleAuthError(res);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Error detalle del backend:", errorText);
    try {
      const json = JSON.parse(errorText);
      console.error("📄 Error JSON:", json);
    } catch (e) {
      console.error("❌ No se pudo parsear el error como JSON");
    }
    throw new Error(`Error posting data: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

// ✏️ PUT
export const putData = async (endpoint: string, data: any) => {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  await handleAuthError(res);

  if (!res.ok) {
    throw new Error(`Error al actualizar: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

// 🗑️ DELETE
export const deleteData = async (endpoint: string) => {
  const cleanedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanedEndpoint}`;
  console.log("🔗 DELETE URL:", url);

  const res = await fetch(url, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  await handleAuthError(res);

  if (!res.ok) {
    throw new Error(`Error al eliminar: ${res.status} ${res.statusText}`);
  }

  return true;
};
