// src/lib/clients.ts
import { fetchData, postData, putData, deleteData } from "./api";
import { Servicio } from "./types";

export const getServicios = async (): Promise<Servicio[]> => {
  return fetchData("servicios");
};

export const createServicio = (data: Omit<Servicio, "id">) => {
  return postData("servicios", data);
};

export const updateServicio = (id: number, data: Servicio) => {
  return putData(`servicios/${id}`, data);
};

export const deleteServicio = (id: number) => {
  return deleteData(`servicios/${id}`);
};
