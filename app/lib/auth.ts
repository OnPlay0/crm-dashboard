// 🔓 Cierre de sesión
export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  window.location.href = "/"; // redirige al nuevo login
};

// 🧠 Decodifica un JWT
export function decodeJwt(token: string): any {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (err) {
    console.error("❌ Error al decodificar JWT:", err);
    return {};
  }
}

// ✍️ Registro de usuario
export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, // ✔️ ruta correcta
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }), // ✔️ ahora con email
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("❌ Error al registrar:", error);
    throw new Error("Registro fallido");
  }

  return await response.json();
}
