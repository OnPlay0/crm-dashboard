// lib/users.ts
import { getAuthHeaders } from "@/app/lib/api";
import { UsuarioForm } from "@/app/lib/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function createUser(data: UsuarioForm) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      ...data,
      role: data.role, // directamente el string
    }),
  });
  return res.json();
}

export async function updateUser(id: number, data: UsuarioForm) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      ...data,
      role: data.role, // directamente el string
    }),
  });
  return res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.ok;
}
