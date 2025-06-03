"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, TrendingUp } from "lucide-react";
import { fetchData } from "@/app/lib/api";

export function EstadisticaServicios() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData("servicios/count")
      .then(setTotal)
      .catch((err) =>
        console.error("Error al obtener total de servicios:", err)
      );
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Servicios o Productos
        </CardTitle>
        <Briefcase className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
        <p className="text-xs text-muted-foreground">
          <TrendingUp className="mr-1 h-4 w-4 text-green-500 inline" />
          Servicios o productos en el inventario
        </p>
      </CardContent>
    </Card>
  );
}
