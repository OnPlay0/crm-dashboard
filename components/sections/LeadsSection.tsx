"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getLeads, deleteLead } from "@/app/lib/leads";
import { LeadForm } from "@/components/lead-form";
import { LeadsTable } from "@/components/leads-table";
import { Lead } from "@/app/lib/types";
import { Plus } from "lucide-react";

export default function LeadsSection() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      console.error("Error al obtener leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleCreate = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (lead: Lead) => {
    setEditData(lead);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro que querés eliminar este lead?")) return;
    try {
      await deleteLead(id);
      fetchLeads();
    } catch (error) {
      console.error("Error al eliminar lead:", error);
    }
  };

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Lead
        </Button>
      </div>

      {showForm ? (
        <LeadForm
          onClose={() => setShowForm(false)}
          editData={editData}
          onLeadSaved={fetchLeads}
        />
      ) : (
        <LeadsTable leads={leads} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
