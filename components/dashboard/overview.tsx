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
import { ServiciosPorCantidad } from "@/components/dashboard/DistribucionServiciosDashboard";
import RecentProducts from "@/components/dashboard/recent-products";

import { EstadisticaClientes } from "@/components/dashboard/estadisticas-cliente";
import { EstadisticaVentasMensuales } from "@/components/dashboard/estadisticas-ventas";
import { EstadisticaServicios } from "@/components/dashboard/estadisticas-servicios";

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <EstadisticaClientes />
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
          <CardTitle>Últimos Productos Agregados</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentProducts type="PRODUCT" limit={5} />
        </CardContent>
      </Card>

      <Card className="col-span-4 md:col-span-2">
        <CardHeader>
          <CardTitle>Últimos Servicios Agregados</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentProducts type="SERVICE" limit={5} />
        </CardContent>
      </Card>
    </div>
  );
}
