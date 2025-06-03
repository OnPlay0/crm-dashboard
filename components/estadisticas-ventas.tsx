"use client";

import { useEffect, useState } from "react";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getVentasMensuales } from "@/app/lib/ventas";

export function EstadisticaVentasMensuales() {
  const [totalMesActual, setTotalMesActual] = useState(0);
  const [variacion, setVariacion] = useState(0);
  const [isPositive, setIsPositive] = useState(true);

  useEffect(() => {
    async function fetchVentas() {
      try {
        const resumen = await getVentasMensuales();

        const ahora = new Date();
        const mesActual = `${ahora.getFullYear()}-${String(
          ahora.getMonth() + 1
        ).padStart(2, "0")}`;
        const mesAnterior = `${
          ahora.getMonth() === 0 ? ahora.getFullYear() - 1 : ahora.getFullYear()
        }-${String(ahora.getMonth() === 0 ? 12 : ahora.getMonth()).padStart(
          2,
          "0"
        )}`;

        const actual = resumen[mesActual] ?? 0;
        const anterior = resumen[mesAnterior] ?? 0;

        setTotalMesActual(actual);

        if (anterior > 0) {
          const cambio = ((actual - anterior) / anterior) * 100;
          setVariacion(Math.abs(cambio));
          setIsPositive(cambio >= 0);
        } else {
          setVariacion(0);
          setIsPositive(true);
        }
      } catch (error) {
        console.error("Error al obtener resumen mensual:", error);
      }
    }

    fetchVentas();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Ventas Mensuales</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {totalMesActual.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </div>
        <p className="text-xs text-muted-foreground">
          {isPositive ? (
            <TrendingUp className="mr-1 h-4 w-4 text-green-500 inline" />
          ) : (
            <TrendingDown className="mr-1 h-4 w-4 text-red-500 inline" />
          )}
          Total del mes actual
        </p>
      </CardContent>
    </Card>
  );
}
