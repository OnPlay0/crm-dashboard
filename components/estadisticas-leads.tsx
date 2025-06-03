"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserPlus, TrendingUp } from "lucide-react";
import { fetchData } from "@/app/lib/api";

export function EstadisticaLeads() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData("leads/count")
      .then(setTotal)
      .catch((err) => console.error("Error al obtener total de leads:", err));
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Leads Activos</CardTitle>
        <UserPlus className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
        <p className="text-xs text-muted-foreground">
          <TrendingUp className="mr-1 h-4 w-4 text-green-500 inline" />
          Leads Activos del Mes
        </p>
      </CardContent>
    </Card>
  );
}
