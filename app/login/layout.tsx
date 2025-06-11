// app/login/layout.tsx
"use client";

import { useEffect } from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";

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
  useEffect(() => {
    // Limpiamos todo antes de montar el LoginPage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  }, []);

  return <main className={inter.className}>{children}</main>;
}
