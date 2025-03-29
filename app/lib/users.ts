// src/lib/clients.ts
import { fetchData, postData } from "./api";

export const getUsers = () => fetchData("users");
export const createUsers = (data: any) => postData("users", data);
