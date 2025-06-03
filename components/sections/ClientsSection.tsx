"use client";

import { useEffect, useState } from "react";
import { ClientForm } from "@/components/client-form";
import { ClientsTable } from "@/components/clients-table";
import { getClients } from "@/app/lib/cliente";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { Cliente } from "@/app/lib/types";

export default function ClientsSection() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Cliente | null>(null);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      console.error("Error al obtener clientes", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreateNew = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (client: Cliente) => {
    setEditData(client);
    setShowForm(true);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
        {!showForm && (
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Button>
        )}
      </div>
      {showForm ? (
        <ClientForm
          onClose={() => setShowForm(false)}
          editData={editData}
          onClienteGuardado={fetchClients}
        />
      ) : (
        <ClientsTable
          clients={clients}
          onEdit={handleEdit}
          onClientCreated={handleCreateNew}
          onClientDeleted={fetchClients}
        />
      )}
    </div>
  );
}
