"use client";

import { useEffect, useState } from "react";
import { Servicio } from "@/app/lib/types";
import { getServicios, deleteServicio } from "@/app/lib/servicios";
import { ServiceForm } from "@/components/service-form";
import { ServicesTable } from "@/components/services-table";

export default function ServicesPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [editData, setEditData] = useState<Servicio | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchServicios = async () => {
    const data = await getServicios();
    setServicios(data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar servicio?")) return;
    await deleteServicio(id);
    fetchServicios();
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  return (
    <div className="p-8">
      {showForm ? (
        <ServiceForm
          editData={editData}
          onClose={() => setShowForm(false)}
          onSaved={fetchServicios}
        />
      ) : (
        <ServicesTable
          servicios={servicios}
          onEdit={(data) => {
            setEditData(data);
            setShowForm(true);
          }}
          onDelete={handleDelete}
          onCreateNew={() => {
            setEditData(null);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
}
