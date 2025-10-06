// ✅ ClientsSection.tsx
"use client";

import { useEffect, useState } from "react";
import { ClientForm } from "@/components/clients/client-form";
import { ClientsTable } from "@/components/clients/clients-table";
import {
  getClients,
  exportClientsToExcel,
  importarClientesDesdeExcel,
  getEstadisticas,
} from "@/app/lib/cliente";

import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";
import { Cliente } from "@/app/lib/types";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

export default function ClientsSection() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [totalClients, setTotalClients] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Cliente | null>(null);
  const [paginaActual, setPaginaActual] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState<{
    total: number;
    porEstado: Record<string, number>;
    ultimosClientes: any[];
  } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const [{ clients, total }, est] = await Promise.all([
          getClients(paginaActual, PAGE_SIZE, terminoBusqueda),
          getEstadisticas(),
        ]);
        if (!alive) return;
        setClients(clients);
        setTotalClients(est?.total ?? total);
        setStats(est);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        toast.error(err?.message || "❌ Error al obtener clientes");
        console.error("Error al obtener clientes", err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [paginaActual, terminoBusqueda]);

  const handleCreateNew = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (client: Cliente) => {
    setEditData(client);
    setShowForm(true);
  };

  const handleExport = async () => {
    const ok = await exportClientsToExcel();
    if (ok) toast.success("📤 Exportación completada");
    else toast.error("❌ Error al exportar");
  };

  const handleImport = async (file: File) => {
    try {
      const res: any = await importarClientesDesdeExcel(file);
      if (
        typeof res?.inserted === "number" ||
        typeof res?.updated === "number"
      ) {
        toast.success(
          `✅ Importación: insertados ${res.inserted ?? 0}, actualizados ${
            res.updated ?? 0
          }${res?.errors?.length ? `, errores ${res.errors.length}` : ""}`
        );
      } else {
        toast.success(res?.mensaje || "✅ Importación realizada");
      }
      // refrescar
      const { clients, total } = await getClients(
        paginaActual,
        PAGE_SIZE,
        terminoBusqueda
      );
      setClients(clients);
      setTotalClients(stats?.total ?? total);
    } catch (err: any) {
      const m =
        err?.message ||
        (err?.__status === 413 && "Archivo demasiado grande (>10MB)") ||
        "❌ Error al importar";
      toast.error(m);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Clientes totales</div>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat("es-AR").format(
              stats?.total ?? totalClients
            )}
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Por estado</div>
          <ul className="text-sm mt-1">
            {Object.entries(stats?.porEstado ?? {}).map(([k, v]) => (
              <li key={k}>
                {k}: {new Intl.NumberFormat("es-AR").format(v)}
              </li>
            ))}
          </ul>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Últimos clientes</div>
          <ul className="text-sm mt-1">
            {(stats?.ultimosClientes ?? []).slice(0, 5).map((c: any) => (
              <li key={c.id}>
                {c.nombre} {c.apellido} — {c.email}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Encabezado + acciones */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <p className="text-muted-foreground">
            {loading
              ? "Cargando..."
              : `${new Intl.NumberFormat("es-AR").format(
                  totalClients
                )} registrados`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Import con input inline */}
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

          {/* Export */}
          <Button variant="secondary" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>

          {!showForm && (
            <Button onClick={handleCreateNew}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </Button>
          )}
        </div>
      </div>

      {showForm ? (
        <ClientForm
          onClose={() => setShowForm(false)}
          editData={editData}
          onClienteGuardado={async () => {
            const { clients, total } = await getClients(
              paginaActual,
              PAGE_SIZE,
              terminoBusqueda
            );
            setClients(clients);
            setTotalClients(stats?.total ?? total);
          }}
        />
      ) : (
        <ClientsTable
          clients={clients}
          onEdit={handleEdit}
          onClientDeleted={async () => {
            const { clients, total } = await getClients(
              paginaActual,
              PAGE_SIZE,
              terminoBusqueda
            );
            setClients(clients);
            setTotalClients(stats?.total ?? total);
          }}
          paginaActual={paginaActual}
          setPaginaActual={setPaginaActual}
          totalClientes={totalClients}
          pageSize={PAGE_SIZE}
          setTerminoBusqueda={(q) => {
            setPaginaActual(0); // reset paginación al buscar
            setTerminoBusqueda(q);
          }}
        />
      )}
    </div>
  );
}
