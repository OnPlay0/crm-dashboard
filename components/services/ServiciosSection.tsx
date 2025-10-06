// src/components/sections/ServiciosSection.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";
import { Servicio } from "@/app/lib/types";
import {
  getServicios,
  createServicio,
  updateServicio,
  deleteServicio,
  exportServiciosExcel,
  importServiciosExcel,
} from "@/app/lib/servicios";
import { ServicesTable } from "@/components/services/services-table";
import { ServiceForm } from "@/components/services/service-form";
import toast from "react-hot-toast";

export default function ServiciosSection() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const size = 10;
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Servicio | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchServicios = useCallback(async () => {
    try {
      setLoading(true);
      const { items, total } = await getServicios(page, size, search);
      setServicios(items);
      setTotal(total);
    } catch (e: any) {
      toast.error(e?.message || "❌ Error al obtener servicios");
    } finally {
      setLoading(false);
    }
  }, [page, size, search]);

  useEffect(() => {
    fetchServicios();
  }, [fetchServicios]);

  const handleCreate = () => {
    setEditData(null);
    setShowForm(true);
  };
  const handleEdit = (s: Servicio) => {
    setEditData(s);
    setShowForm(true);
  };
  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar servicio?")) return;
    try {
      await deleteServicio(id);
      toast.success("🗑️ Eliminado");
      fetchServicios();
    } catch (e: any) {
      toast.error(e?.message || "❌ Error al eliminar");
    }
  };

  const handleSaved = () => fetchServicios();

  const handleExport = async () => {
    try {
      await exportServiciosExcel();
      toast.success("📤 Exportación OK");
    } catch {
      toast.error("❌ Error al exportar");
    }
  };

  const handleImport = async (f: File) => {
    try {
      const r = await importServiciosExcel(f);
      toast.success(
        `✅ Importados: ${r.insertados ?? r.cantidadInsertados} / Errores: ${
          r.errores ?? r.cantidadErrores
        }`
      );
      fetchServicios();
    } catch (e: any) {
      toast.error(e?.message || "❌ Error al importar");
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Servicio</h2>
          <p className="text-muted-foreground">
            {loading ? "Cargando..." : `${total} registrados`}
          </p>
        </div>

        <div className="flex items-center gap-2">
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
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          {!showForm && (
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Servicio
            </Button>
          )}
        </div>
      </div>

      {showForm ? (
        <ServiceForm
          onClose={() => setShowForm(false)}
          editData={editData}
          onSaved={handleSaved}
        />
      ) : (
        <ServicesTable
          servicios={servicios}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreateNew={handleCreate}
          paginaActual={page}
          setPaginaActual={setPage}
          total={total}
          size={size}
          setSearch={(q) => {
            setPage(0);
            setSearch(q);
          }}
        />
      )}
    </div>
  );
}
