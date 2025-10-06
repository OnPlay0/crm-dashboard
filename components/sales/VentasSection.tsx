// src/components/sections/VentasSection.tsx  (o donde lo tengas)
"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SalesTable } from "@/components/sales/sales-table";
import { SaleForm } from "@/components/sales/sale-form";
import {
  getVentasMes,
  createVentaDesdeUI,
  updateVentaDesdeUI,
  deleteVenta,
  exportVentasExcel,
  importVentasExcel,
} from "@/app/lib/ventas";
import { getServicios } from "@/app/lib/servicios";
import { Plus, Upload, Download } from "lucide-react";
import { Venta } from "@/app/lib/types";
import toast from "react-hot-toast";

export default function VentasSection() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<
    | (Venta & { productId?: number; customerId?: number; quantity?: number })
    | null
  >(null);

  const fetchVentas = async () => {
    try {
      const page = await getVentasMes(year, month, 0, 100);
      const list: any[] = page?.content ?? [];

      setVentas(
        list.map((s: any) => ({
          id: s.id,
          productName: s.productName || "Venta rápida", // 👈 usar directamente lo que manda el back
          productType: s.productType || "-",
          descripcion: s.description ?? "",
          monto: Number(s.total ?? 0),
          estado: s.estado || "NUEVO",
          fecha: s.date,
          fechaCierreEstimada: s.fechaCierreEstimada || s.date,
          cliente: String(s.customerId ?? ""),
        })) as Venta[]
      );
    } catch (err: any) {
      console.error("❌ Error al obtener ventas:", err);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, [year, month]);

  const handleCreateNew = () => {
    setEditData(null);
    setShowForm(true);
  };
  const handleEdit = (venta: Venta) => {
    setEditData(venta);
    setShowForm(true);
  };

  const handleSave = async (
    ventaData: Venta & {
      productId: number;
      customerId: number;
      quantity?: number;
    }
  ) => {
    try {
      if (ventaData.id) {
        await updateVentaDesdeUI(ventaData.id, ventaData);
      } else {
        await createVentaDesdeUI(ventaData);
      }
      setShowForm(false);
      await fetchVentas();
      toast.success("✅ Venta guardada");
    } catch (err: any) {
      toast.error(err?.message || "❌ Error al guardar venta");
      console.error("❌ Error al guardar venta:", err);
    }
  };

  const handleExport = async () => {
    try {
      await exportVentasExcel(year, month);
      toast.success("📤 Exportación OK");
    } catch {
      toast.error("❌ Error al exportar");
    }
  };

  const handleImport = async (file: File) => {
    try {
      const res = await importVentasExcel(file);
      toast.success(
        `✅ Importados: ${
          res.insertados ?? res.cantidadInsertados
        } / Errores: ${res.errores ?? res.cantidadErrores}`
      );
      await fetchVentas();
    } catch (e: any) {
      toast.error(e?.message || "❌ Error al importar");
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-2">
          <div>
            <label className="text-sm">Año</label>
            <input
              type="number"
              className="border rounded p-2 w-28"
              value={year}
              onChange={(e) => {
                setYear(+e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-sm">Mes</label>
            <input
              type="number"
              min={1}
              max={12}
              className="border rounded p-2 w-20"
              value={month}
              onChange={(e) => {
                setMonth(+e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <label className="inline-flex items-center gap-2 bg-white border px-3 py-2 rounded shadow text-sm cursor-pointer">
            <Upload className="w-4 h-4" />
            Importar
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImport(f);
                e.currentTarget.value = "";
              }}
            />
          </label>

          <Button variant="secondary" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>

          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Venta
          </Button>
        </div>
      </div>

      {showForm ? (
        <SaleForm
          onClose={() => setShowForm(false)}
          editData={editData as any}
          onSave={handleSave as any}
        />
      ) : (
        <SalesTable data={ventas} onEdit={handleEdit} />
      )}
    </div>
  );
}
