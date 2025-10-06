// src/components/dashboard/recent-sales.tsx
"use client";

import { useEffect, useState } from "react";
import { getUltimasVentas } from "@/app/lib/ventas";
import { Venta } from "@/app/lib/types";

export function RecentSales() {
  const [ventas, setVentas] = useState<Venta[]>([]);

  useEffect(() => {
    getUltimasVentas()
      .then(setVentas)
      .catch((err) => console.error("❌ Error cargando últimas ventas:", err));
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {ventas.map((venta, index) => (
        <div
          key={venta.id ?? index}
          className="flex flex-col border-b pb-2 last:border-0 last:pb-0"
        >
          {/* 👉 Nombre de la venta */}
          <div className="flex justify-between items-center">
            <p className="font-medium text-sm">
              {venta.nombre || "Venta rápida"}
            </p>
            <span className="font-bold text-green-600">
              {venta.monto.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </span>
          </div>

          {/* 👉 Producto (solo si existe) */}
          {venta.producto && (
            <p className="text-xs text-gray-500">Producto: {venta.producto}</p>
          )}

          {/* 👉 Descripción (solo si existe) */}
          {venta.descripcion && (
            <p className="text-xs text-gray-500">{venta.descripcion}</p>
          )}

          {/* 👉 Fecha */}
          <p className="text-xs text-gray-400">{formatDate(venta.fecha)}</p>
        </div>
      ))}
    </div>
  );
}
