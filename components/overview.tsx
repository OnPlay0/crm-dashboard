"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Overview as OverviewChart } from "./overview-chart";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { ServiciosPorCantidad } from "@/components/DistribucionServiciosDashboard";

import { EstadisticaClientes } from "@/components/estadisticas-cliente";
import { EstadisticaLeads } from "@/components/estadisticas-leads";
import { EstadisticaVentasMensuales } from "@/components/estadisticas-ventas";
import { EstadisticaServicios } from "@/components/estadisticas-servicios";

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <EstadisticaClientes />
      <EstadisticaLeads />
      <EstadisticaVentasMensuales />
      <EstadisticaServicios />

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Resumen de Ventas</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <OverviewChart />
        </CardContent>
      </Card>

      <Card className="col-span-4 md:col-span-2">
        <CardHeader>
          <CardTitle>Ventas Recientes</CardTitle>
          <CardDescription>Últimas ventas realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentSales />
        </CardContent>
      </Card>

      <Card className="col-span-4 md:col-span-2">
        <CardHeader>
          <CardTitle>Tus Servicios o Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <ServiciosPorCantidad />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
