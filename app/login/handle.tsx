"use client";

import { loginRequest } from "@/app/lib/login";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function handleGuestLogin(router: AppRouterInstance) {
  try {
    await loginRequest("invitado", "123", router); // ✅ ahora pasamos el router
  } catch (error) {
    console.error("Error al ingresar como invitado:", error);
    alert("No se pudo ingresar como invitado.");
  }
}
