import { decodeJwt } from "./auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
}

export async function loginRequest(
  username: string,
  password: string,
  router?: AppRouterInstance // 👈 opcional para redirigir desde acá
): Promise<void> {
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

  let json: any;
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

  // ✅ Redirección al final, después de guardar todo
  if (router) {
    router.push("/");
  } else {
    window.location.href = "/";
  }
}
