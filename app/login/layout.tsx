// app/login/layout.tsx
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login - Ovelink CRM",
  description: "Pantalla de acceso al CRM multitenant",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Solo el formulario de login, sin sidebar, sin header, sin estadísticas.
  return <>{children}</>;
}
