"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SalesTable } from "@/components/sales-table";
import { SaleForm } from "@/components/sale-form";
import { getVentas, createVenta, updateVenta } from "@/app/lib/ventas";
import { Plus } from "lucide-react";

type Venta = {
  id?: number;
  cliente: string;
  producto: string;
  monto: number;
  fecha: string;
  estado: string;
  notas?: string;
};

export default function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Venta | null>(null);

  const fetchVentas = async () => {
    try {
      const data = await getVentas();
      setVentas(data);
    } catch (err) {
      console.error("Error al obtener ventas", err);
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
      if (ventaData.id) {
        await updateVenta(ventaData.id, ventaData);
      } else {
        await createVenta(ventaData);
      }
      setShowForm(false);
      fetchVentas();
    } catch (err) {
      console.error("Error al guardar venta", err);
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
        <SalesTable data={ventas} onEdit={handleEdit} />
      )}
    </div>
  );
}
