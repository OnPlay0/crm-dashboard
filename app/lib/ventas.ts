import { fetchData, postData, putData, deleteData, BASE_URL } from "./api";
import { Venta } from "./types";

export const getVentas = () => fetchData("oportunidades");
export const createVenta = (data: any) => postData("oportunidades", data);
export const updateVenta = (id: number, data: any) =>
  putData(`oportunidades/${id}`, data);
export const deleteVenta = (id: number) => deleteData(`oportunidades/${id}`);

console.log("🧪 BASE_URL detectada:", BASE_URL);

export const getUltimasVentas = async (): Promise<Venta[]> => {
  const todas: Venta[] = await fetchData("oportunidades");

  return todas
    .sort(
      (a, b) =>
        new Date(b.fecha ?? "").getTime() - new Date(a.fecha ?? "").getTime()
    )
    .slice(0, 5);
};

export async function getVentasMensuales(): Promise<{ [key: string]: number }> {
  const fullUrl = `${BASE_URL}/oportunidades/resumen-mensual`;
  console.log("🌐 Llamando a:", fullUrl);

  const res = await fetch(fullUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!res.ok) {
    console.error("❌ Error en fetch:", res.status, res.statusText);
    throw new Error("Error al obtener resumen mensual");
  }

  const json = await res.json();
  console.log("📊 Resumen mensual recibido:", json); // 👈 AGREGALO

  return json;
}
