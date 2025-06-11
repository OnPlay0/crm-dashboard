// app/(dashboard)/layout.tsx
"use client";
import "@/app/globals.css";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { EstadisticaVentasMensuales } from "@/components/estadisticas-ventas";
import { EstadisticaClientes } from "@/components/estadisticas-cliente";
import { EstadisticaLeads } from "@/components/estadisticas-leads";
import { EstadisticaServicios } from "@/components/estadisticas-servicios";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // Sin token, redirijo a login y abortamos todo
      router.replace("/login");
    } else {
      // Con token, ya podemos cargar el dashboard
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    // Mientras no verifiquemos token, no montamos nada
    return null;
  }

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
