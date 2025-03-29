"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "../components/dashboard-header";

import { Overview } from "../components/overview";
import ClientsPage from "./clients/page";
import LeadsPage from "./leads/page";
import ServicesPage from "./services/page";
import VentasPage from "./ventas/page";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview"); // Esta es la variable que controlás

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {/* Le pasamos la pestaña activa al header */}
        <DashboardHeader activeTab={activeTab} />

        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="clients">Clientes</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
                <TabsTrigger value="services">Servicios</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <Overview />
            </TabsContent>

            <TabsContent value="clients" className="space-y-4">
              <ClientsPage />
            </TabsContent>

            <TabsContent value="leads" className="space-y-4">
              <LeadsPage />
            </TabsContent>

            <TabsContent value="oportunidades" className="space-y-4">
              <VentasPage />
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <ServicesPage />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
