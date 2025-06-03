"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";
import { fetchData } from "@/app/lib/api";

export function EstadisticaClientes() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData("clientes/count")
      .then(setTotal)
      .catch((err) =>
        console.error("Error al obtener total de clientes:", err)
      );
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total Clientes Activos
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
        <p className="text-xs text-muted-foreground">
          <TrendingUp className="mr-1 h-4 w-4 text-green-500 inline" />
          clientes activos del mes
        </p>
      </CardContent>
    </Card>
  );
}
