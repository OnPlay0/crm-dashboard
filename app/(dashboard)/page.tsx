"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "../../components/dashboard-header";
import { Overview } from "../../components/overview";

import ClientsSection from "@/components/sections/ClientsSection";
import ServiciosSection from "@/components/sections/ServiciosSection";
import VentasSection from "@/components/sections/VentasSection";
import LeadsSection from "@/components/sections/LeadsSection";
import UsuarioSection from "@/components/sections/UsuarioSection";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [role, setRole] = useState<string | null>(null);
  const [isInvited, setIsInvited] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // 👈 Clave
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
      setAuthChecked(true); // 👈 Ya está verificado

      if (storedRole === "ROLE_INVITED") {
        setIsInvited(true);

        const logoutTimeout = setTimeout(() => {
          localStorage.clear();
          alert(
            "🔒 Tu sesión como invitado ha expirado.\n\nGracias por probar nuestro CRM. Si querés más información o una demo personalizada, escribinos a ovelink0000@gmail.com.\n\nEstamos para ayudarte a potenciar tu gestión comercial. 💼✨"
          );
          router.push("/login");
        }, 2 * 60 * 1000);

        return () => clearTimeout(logoutTimeout);
      }
    };

    const delay = setTimeout(verificarSesion, 100);
    return () => clearTimeout(delay);
  }, [router]);

  if (!authChecked) return null; // ⛔ No renderizar nada si no hay auth confirmada

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        {isInvited && (
          <div className="bg-yellow-200 text-yellow-800 text-center p-2 mb-4 rounded">
            Estás usando el CRM como <strong>invitado</strong>. Los datos serán
            eliminados automáticamente.
          </div>
        )}
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
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
                <TabsTrigger value="services">Servicios</TabsTrigger>
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
            <TabsContent value="leads" className="space-y-4">
              <LeadsSection />
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
