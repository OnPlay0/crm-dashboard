"use client";

import { useEffect, useState } from "react";
import { getUltimasVentas } from "@/app/lib/ventas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Venta } from "@/app/lib/types";

export function RecentSales() {
  const [ventas, setVentas] = useState<Venta[]>([]);

  useEffect(() => {
    getUltimasVentas().then(setVentas).catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      {ventas.map((venta, index) => (
        <div key={venta.id ?? index} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{venta.cliente}</p>
            <p className="text-sm text-muted-foreground">
              {venta.descripcion || "Sin descripción"}
            </p>
          </div>
          <div className="ml-auto font-medium">
            +${venta.monto.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
