"use client";

import { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Search } from "lucide-react";
import { EstadoCliente, Cliente } from "@/app/lib/types";
import { removeClient } from "@/app/lib/cliente";

interface ClientsTableProps {
  onEdit: (client: Cliente) => void;
  onClientCreated: () => void;
  onClientDeleted: () => void; // 👈 NUEVA PROP
  clients: Cliente[];
}

export function ClientsTable({ onEdit, onClientCreated, onClientDeleted, clients }: ClientsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter( // Usa la prop clients aquí
    (client) =>
      client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que querés eliminar este cliente?")) return;
  
    try {
      await removeClient(id);
      console.log("✅ Cliente eliminado");
      onClientDeleted(); // 👈 Llamada al callback

    } catch (error) {
      console.error("❌ Error al eliminar cliente:", error);
    }
  };

  const handleEditClick = (client: Cliente) => {
    onEdit(client);
  };

  const handleCreateNew = () => {
    onClientCreated();
  };
  
    return (
      <div className="space-y-4">
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
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No se encontraron clientes
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.nombre}</TableCell>
                    <TableCell>{client.apellido}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.telefono}</TableCell>
                    <TableCell>{client.direccion}</TableCell>
                    <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    client.estado === EstadoCliente.ACTIVO
                      ? "bg-green-100 text-green-800"
                      : client.estado === EstadoCliente.INACTIVO || client.estado === EstadoCliente.CERRADO
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {client.estado}
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
                        <DropdownMenuItem onClick={() => handleEditClick(client)}>Editar</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(client.id)}>Eliminar</DropdownMenuItem>
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
    )
  }
