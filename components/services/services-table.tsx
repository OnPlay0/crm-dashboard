// src/components/services/ServicesTable.tsx
"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import type { Servicio } from "@/app/lib/types";
import debounce from "lodash.debounce";

interface ServicesTableProps {
  servicios: Servicio[];
  onEdit: (servicio: Servicio) => void;
  onDelete: (id: number) => void;
  onCreateNew: () => void;
  paginaActual: number;
  setPaginaActual: (p: number) => void;
  total: number;
  size: number;
  setSearch: (q: string) => void;
}

export function ServicesTable({
  servicios,
  onEdit,
  onDelete,
  onCreateNew,
  paginaActual,
  setPaginaActual,
  total,
  size,
  setSearch,
}: ServicesTableProps) {
  const [q, setQ] = useState("");

  const debounced = useMemo(
    () =>
      debounce((val: string) => {
        setPaginaActual(0);
        setSearch(val.trim());
      }, 400),
    [setPaginaActual, setSearch]
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQ(val);
    debounced(val);
  };

  const totalPages = Math.max(1, Math.ceil(total / size));
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar servicios..."
            value={q}
            onChange={onSearchChange}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No hay servicios
                </TableCell>
              </TableRow>
            ) : (
              servicios.map((s) => (
                <TableRow key={s.id}>
                  {/* 👇 ahora usamos name / description / price */}
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.description}</TableCell>
                  <TableCell>{formatCurrency(s.price)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(s)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(s.id!)}>
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

      {/* Paginación */}
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
