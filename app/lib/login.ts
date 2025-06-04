"use client";

import { decodeJwt } from "./auth";
import { useRouter } from "next/navigation";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
}

export function useLogin() {
  const router = useRouter();

  const loginRequest = async (
    username: string,
    password: string
  ): Promise<void> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("❌ Error al loguear:", error);
      throw new Error("Credenciales inválidas");
    }

    let json: LoginResponse;
    try {
      json = await response.json();
    } catch (e) {
      console.error("❌ Error al parsear respuesta:", e);
      throw new Error("Respuesta inválida del servidor");
    }

    const token = json.accessToken;
    if (!token) {
      throw new Error("No se recibió token");
    }

    const decoded = decodeJwt(token);
    console.log("🎯 Decodificado JWT:", decoded);

    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", decoded.sub ?? "");
    localStorage.setItem("userId", decoded.userId ?? "");
    localStorage.setItem("role", decoded.role ?? "");

    router.push("/");
  };

  return { loginRequest };
}
