"use client";

import { useState } from "react";
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
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { Lead } from "@/app/lib/types";

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: number) => void;
}

export function LeadsTable({ leads, onEdit, onDelete }: LeadsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter((lead) => {
    const name = lead.name || "";
    const company = lead.company || "";
    const email = lead.email || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NUEVO":
        return "bg-blue-100 text-blue-800";
      case "EN_PROCESO":
        return "bg-yellow-100 text-yellow-800";
      case "CONTACTADO":
        return "bg-green-100 text-green-800";
      case "CALIFICADO":
        return "bg-purple-100 text-purple-800";
      case "DESCARTADO":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "NUEVO":
        return "Nuevo";
      case "EN_PROCESO":
        return "En seguimiento";
      case "CONTACTADO":
        return "Contactado";
      case "CALIFICADO":
        return "Calificado";
      case "DESCARTADO":
        return "Descartado";
      default:
        return status;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case "WEB":
        return "Web";
      case "REFERIDO":
        return "Referido";
      case "REDES_SOCIALES":
        return "Redes Sociales";
      case "LLAMADA":
        return "Llamada";
      case "EMAIL":
        return "Email";
      case "EVENTO":
        return "Evento";
      case "OTRO":
        return "Otro";
      default:
        return source;
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No se encontraron leads
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{getSourceLabel(lead.source)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {getStatusLabel(lead.status)}
                    </span>
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
                        <DropdownMenuItem onClick={() => onEdit(lead)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(lead.id)}>
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

      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
