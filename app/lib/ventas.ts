import { fetchData, postData, putData, deleteData } from "./api";

export const getVentas = () => fetchData("oportunidades");
export const createVenta = (data: any) => postData("oportunidades", data);
export const updateVenta = (id: number, data: any) => putData(`oportunidades/${id}`, data);
export const deleteVenta = (id: number) => deleteData(`oportunidades/${id}`);
