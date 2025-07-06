"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/app/globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [tokenChecked, setTokenChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login");
    } else {
      setHasToken(true);
    }
    setTokenChecked(true);
  }, [router]);

  if (!tokenChecked) return null;

  if (!hasToken) return null;

  // 🧠 recién acá importás todo si hay token
  const Sidebar = require("@/components/dashboard/sidebar").Sidebar;
  const DashboardHeader =
    require("@/components/dashboard-header").DashboardHeader;
  const EstadisticaClientes =
    require("@/components/estadisticas-cliente").EstadisticaClientes;
  const EstadisticaLeads =
    require("@/components/estadisticas-leads").EstadisticaLeads;
  const EstadisticaServicios =
    require("@/components/estadisticas-servicios").EstadisticaServicios;
  const EstadisticaVentasMensuales =
    require("@/components/estadisticas-ventas").EstadisticaVentasMensuales;

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
