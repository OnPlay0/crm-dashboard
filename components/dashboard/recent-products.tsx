"use client";

import { useEffect, useState } from "react";
import { getUltimosCatalogo } from "@/app/lib/servicios";
import { Servicio } from "@/app/lib/types";

export default function RecentProducts({
  type,
  limit = 5,
}: {
  type?: "PRODUCT" | "SERVICE";
  limit?: number;
}) {
  const [items, setItems] = useState<Servicio[]>([]);

  useEffect(() => {
    getUltimosCatalogo(limit, type)
      .then((res) =>
        setItems(res.filter((it) => it.categoria !== "VENTA_RAPIDA"))
      )
      .catch(console.error);
  }, [limit, type]);

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No hay {type === "SERVICE" ? "servicios" : "productos"} recientes
        </p>
      )}
      {items.map((it) => (
        <div key={it.id} className="flex items-center justify-between">
          <div>
            <p className="truncate text-sm font-medium">{it.nombre}</p>
            <p className="truncate text-xs text-muted-foreground">
              {it.descripcion || "Sin descripción"}
            </p>
          </div>
          <p className="text-sm font-semibold">
            ${(it.precio ?? 0).toLocaleString("es-AR")}
          </p>
        </div>
      ))}
    </div>
  );
}
