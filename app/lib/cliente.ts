import { fetchData, postData, putData, deleteData } from "./api";

export const getClients = () => fetchData("clientes");
export const createClient = (data: any) => postData("clientes", data);
export const updateClient = (data: any) => putData(`clientes/${data.id}`, data);
export const removeClient = (id: number) => deleteData(`clientes/${id}`);

