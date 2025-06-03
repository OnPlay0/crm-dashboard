// src/app/(dashboard)/ventas/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SalesTable } from "@/components/sales-table";
import { SaleForm } from "@/components/sale-form";
import { getVentas, createVenta, updateVenta } from "@/app/lib/ventas";
import { Plus } from "lucide-react";
import { Venta } from "@/app/lib/types";



export default function VentasSection() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Venta | null>(null);

  const fetchVentas = async () => {
    try {
      const data = await getVentas();
      setVentas(data);
    } catch (err) {
      console.error("❌ Error al obtener ventas:", err);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  const handleCreateNew = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (venta: Venta) => {
    setEditData(venta);
    setShowForm(true);
  };

  const handleSave = async (ventaData: Venta) => {
    try {
      const fechaValida =
        ventaData.fecha && !isNaN(new Date(ventaData.fecha).getTime())
          ? ventaData.fecha
          : new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      const data: Venta = {
        ...ventaData,
        fecha: fechaValida,
        monto: Number(ventaData.monto),
      };

      if (ventaData.id) {
        await updateVenta(ventaData.id, data);
      } else {
        await createVenta(data);
      }

      setShowForm(false);
      fetchVentas();
    } catch (err) {
      console.error("❌ Error al guardar venta:", err);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Ventas</h2>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Venta
        </Button>
      </div>

      {showForm ? (
        <SaleForm
          onClose={() => setShowForm(false)}
          editData={editData}
          onSave={handleSave}
        />
      ) : (
        <SalesTable
          data={ventas}
          onEdit={handleEdit}
          onCreateNew={handleCreateNew}
        />
      )}
    </div>
  );
}
