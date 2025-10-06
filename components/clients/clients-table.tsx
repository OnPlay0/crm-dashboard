// ✅ clients-table.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { EstadoCliente, Cliente } from "@/app/lib/types";
import { removeClient, updateClientEstado } from "@/app/lib/cliente";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";

interface ClientsTableProps {
  clients: Cliente[];
  onEdit: (client: Cliente) => void;
  onClientDeleted: () => void;
  paginaActual: number;
  setPaginaActual: (page: number) => void;
  totalClientes: number;
  pageSize: number; // << añadido para coherencia
  setTerminoBusqueda: (value: string) => void;
}

export function ClientsTable({
  clients,
  onEdit,
  onClientDeleted,
  paginaActual,
  setPaginaActual,
  totalClientes,
  pageSize,
  setTerminoBusqueda,
}: ClientsTableProps) {
  const [q, setQ] = useState("");

  // Debounce búsqueda y reseteo de página
  const debounced = useMemo(
    () =>
      debounce((val: string) => {
        setPaginaActual(0);
        setTerminoBusqueda(val.trim());
      }, 400),
    [setPaginaActual, setTerminoBusqueda]
  );

  useEffect(() => () => debounced.cancel(), [debounced]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQ(val);
    debounced(val);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que querés eliminar este cliente?")) return;
    try {
      await removeClient(id);
      toast.success("🗑️ Cliente eliminado");
      onClientDeleted();
    } catch (error: any) {
      toast.error(error?.message || "❌ Error al eliminar cliente");
      console.error("Eliminar cliente:", error);
    }
  };

  const handleEstadoChange = async (id: number, nuevo: EstadoCliente) => {
    try {
      await updateClientEstado(id, nuevo);
      toast.success(`✅ Estado actualizado a ${nuevo}`);
      onClientDeleted();
    } catch (err: any) {
      toast.error(err?.message || "❌ Error al actualizar estado");
    }
  };

  const totalPages = Math.max(
    1,
    Math.ceil(totalClientes / Math.max(1, pageSize))
  );

  const estadoBadge = (estado: EstadoCliente) => {
    const cls =
      estado === EstadoCliente.ACTIVO
        ? "bg-green-100 text-green-800"
        : estado === EstadoCliente.PROSPECTO
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";
    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}
      >
        {estado}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* 🔍 Buscador */}
      <div className="flex items-center justify-between">
        <Input
          value={q}
          onChange={onSearchChange}
          placeholder="Buscar por nombre, apellido o email..."
          className="w-full max-w-md"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No se encontraron clientes
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.nombre}</TableCell>
                  <TableCell>{client.apellido}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.telefono}</TableCell>
                  <TableCell>{client.direccion}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="px-0">
                          {estadoBadge(client.estado)}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {Object.values(EstadoCliente).map((es) => (
                          <DropdownMenuItem
                            key={es}
                            onClick={() =>
                              handleEstadoChange(client.id, es as EstadoCliente)
                            }
                          >
                            {es}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(client)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(client.id)}
                        >
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔢 Paginación */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-muted-foreground">
          Página {paginaActual + 1} de {totalPages}
        </span>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPaginaActual(Math.max(0, paginaActual - 1))}
            disabled={paginaActual === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setPaginaActual(Math.min(totalPages - 1, paginaActual + 1))
            }
            disabled={paginaActual + 1 >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
