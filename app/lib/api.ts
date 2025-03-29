// src/app/lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchData(endpoint: string) {
  const cleanedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanedEndpoint}`;
  console.log("➡️ URL que se va a fetch:", url);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`);
  }

  return res.json();
}

export const postData = async (endpoint: string, data: any) => {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  console.log("Posting to:", url);
  console.log("📦 Payload que se va a enviar:", data);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
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

export const putData = async (endpoint: string, data: any) => {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Error al actualizar: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const deleteData = async (endpoint: string) => {
  const cleanedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanedEndpoint}`;
  console.log("🔗 DELETE URL:", url);

  const res = await fetch(url, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Error al eliminar: ${res.status} ${res.statusText}`);
  }

  return true;
};
