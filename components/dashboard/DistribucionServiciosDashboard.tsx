import { useEffect, useState } from "react";
import { getServicios } from "@/app/lib/servicios"; // Asegurate que el path sea correcto
import { Servicio } from "@/app/lib/types";

export function ServiciosPorCantidad() {
  const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    getServicios()
      .then(setServicios)
      .catch((err) => console.error("Error al cargar servicios:", err));
  }, []);

  return (
    <div className="grid gap-4 grid-cols-2">
      {servicios.map((servicio) => (
        <div key={servicio.id} className="flex flex-col gap-1">
          <div className="text-sm font-medium">{servicio.nombre}</div>
          <div className="text-xs text-muted-foreground">
            {servicio.descripcion}
          </div>
          <div className="text-xs text-muted-foreground">
            {servicio.precio}$
          </div>
          <div className="h-2 w-full bg-muted mt-1 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[100%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
