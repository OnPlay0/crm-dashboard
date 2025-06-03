export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  window.location.href = "/login";
};

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
