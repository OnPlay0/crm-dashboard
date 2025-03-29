"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";

import { createLead, updateLead } from "@/app/lib/leads";
import { Lead } from "@/app/lib/types"; // ✅ Importa el tipo Lead

// ✨ Props del componente
interface LeadFormProps {
  onClose: () => void;
  editData: Lead | null;
  onLeadSaved?: () => void;
}

export function LeadForm({ onClose, editData, onLeadSaved }: LeadFormProps) {
  const [formData, setFormData] = useState<Omit<Lead, "id"> & { id?: number }>({
    id: editData?.id || undefined,
    name: editData?.name || "",
    company: editData?.company || "",
    email: editData?.email || "",
    phone: editData?.phone || "",
    source: editData?.source || "WEB",
    status: editData?.status || "NUEVO",
    notes: editData?.notes || "",
  });

  // ✅ Tipado para inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Tipado para selects
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Tipado para submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (formData.id) {
        await updateLead(formData.id, formData as Lead); // 👈 le aclaramos a TypeScript el tipo
        console.log("✅ Lead actualizado");
      } else {
        const { id, ...leadSinId } = formData;
        await createLead(leadSinId); // 👈 sin id, perfecto para createLead
        console.log("✅ Lead creado");
      }
    
      onLeadSaved?.();
      onClose();
    } catch (error) {
      console.error("❌ Error al guardar lead:", error);
    }
    
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onClose} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <h2 className="text-2xl font-bold">{editData ? "Editar Lead" : "Nuevo Lead"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Origen</Label>
            <Select value={formData.source} onValueChange={(value) => handleSelectChange("source", value)}>
              <SelectTrigger id="source">
                <SelectValue placeholder="Seleccionar origen" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="WEB">Web</SelectItem>
              <SelectItem value="REFERIDO">Referido</SelectItem>
              <SelectItem value="REDES_SOCIALES">Redes Sociales</SelectItem>
              <SelectItem value="LLAMADA">Llamada</SelectItem>
              <SelectItem value="EMAIL">Email</SelectItem>
              <SelectItem value="EVENTO">Evento</SelectItem>
              <SelectItem value="OTRO">Otro</SelectItem>

              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NUEVO">Nuevo</SelectItem>
                <SelectItem value="EN_PROCESO">En seguimiento</SelectItem>
                <SelectItem value="CONTACTADO">Calificado</SelectItem>
                <SelectItem value="CALIFICADO">Negociación</SelectItem>
                <SelectItem value="DESCARTADO">Propuesta enviada</SelectItem>


              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notas</Label>
          <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={4} />
        </div>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}
