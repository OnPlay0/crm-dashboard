// app/(dashboard)/layout.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { EstadisticaClientes } from "@/components/estadisticas-cliente";
import { EstadisticaLeads } from "@/components/estadisticas-leads";
import { EstadisticaServicios } from "@/components/estadisticas-servicios";
import { EstadisticaVentasMensuales } from "@/components/estadisticas-ventas";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authState, setAuthState] = useState<"loading" | "ok">("loading");

  // Correr solo una vez al montar
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // Sin token, redirige inmediatamente
      router.replace("/login");
    } else {
      // Con token, habilitamos el renderizado
      setAuthState("ok");
    }
  }, [router]);

  // Mientras no esté "ok", no renderizamos NADA (ni las estadísticas)
  if (authState !== "ok") {
    return null;
  }

  // Solo cuando authState === "ok" montamos el Dashboard completo
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <DashboardHeader />
        <div className="grid grid-cols-4 gap-4 mb-6">
          <EstadisticaClientes />
          <EstadisticaLeads />
          <EstadisticaServicios />
          <EstadisticaVentasMensuales />
        </div>
        {children}
      </div>
    </div>
  );
}
