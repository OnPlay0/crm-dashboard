"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLeads, deleteLead } from "@/app/lib/leads";
import { LeadForm } from "@/components/lead-form";
import { LeadsTable } from "@/components/leads-table";
import { Lead } from "@/app/lib/types";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Leads</h2>
        <Button onClick={handleCreate}>Nuevo Lead</Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Filtrar leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
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
