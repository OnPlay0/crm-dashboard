"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "../../components/dashboard/dashboard-header";
import { Overview } from "../../components/dashboard/overview";

import ClientsSection from "@/components/clients/ClientsSection";
import ServiciosSection from "@/components/services/ServiciosSection";
import VentasSection from "@/components/sales/VentasSection";
import UsuarioSection from "@/components/sections/UsuarioSection";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [role, setRole] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verificarSesion = () => {
      const token = localStorage.getItem("accessToken");
      const storedRole = localStorage.getItem("role");

      if (!token) {
        router.push("/login");
        return;
      }

      setRole(storedRole);
      setAuthChecked(true);
    };

    const delay = setTimeout(verificarSesion, 100);
    return () => clearTimeout(delay);
  }, [router]);

  if (!authChecked) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="clients">Clientes</TabsTrigger>
                <TabsTrigger value="oportunidades">Ventas</TabsTrigger>
                <TabsTrigger value="services">Servicios/Productos</TabsTrigger>
                {role === "ROLE_ADMIN" && (
                  <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
                )}
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <Overview />
            </TabsContent>
            <TabsContent value="clients" className="space-y-4">
              <ClientsSection />
            </TabsContent>
            <TabsContent value="oportunidades" className="space-y-4">
              <VentasSection />
            </TabsContent>
            <TabsContent value="services" className="space-y-4">
              <ServiciosSection />
            </TabsContent>

            {role === "ROLE_ADMIN" && (
              <TabsContent value="usuarios" className="space-y-4">
                <UsuarioSection />
              </TabsContent>
            )}
          </Tabs>
        </main>
      </div>
    </div>
  );
}
