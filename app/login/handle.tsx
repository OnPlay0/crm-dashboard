"use client";

import { loginRequest } from "@/app/lib/login";

import { useRouter } from "next/navigation";

export type Router = ReturnType<typeof useRouter>;

export async function handleGuestLogin(router: Router) {
  try {
    await loginRequest("invitado", "123", router); // ✅ ahora pasamos el router
  } catch (error) {
    console.error("Error al ingresar como invitado:", error);
    alert("No se pudo ingresar como invitado.");
  }
}
