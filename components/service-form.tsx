// src/components/services/ServiceForm.tsx
"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { createServicio, updateServicio } from "@/app/lib/servicios";
import { Servicio } from "@/app/lib/types";

interface ServiceFormProps {
  onClose: () => void;
  editData: Servicio | null;
  onSaved: () => void;
}

export function ServiceForm({ onClose, editData, onSaved }: ServiceFormProps) {
  const [formData, setFormData] = useState<Omit<Servicio, "id"> & { id?: number }>({
    id: editData?.id,
    nombre: editData?.nombre || "",
    descripcion: editData?.descripcion || "",
    precio: editData?.precio || 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) : value,
    }));
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateServicio(formData.id, formData as Servicio);

      } else {
        const { id, ...dataSinId } = formData;
        await createServicio(dataSinId);
      }
      onSaved();
      onClose();
    } catch (error) {
      console.error("Error al guardar servicio:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onClose} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <h2 className="text-2xl font-bold">{editData ? "Editar Servicio" : "Nuevo Servicio"}</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="descripcion">Descripción</Label>
          <Textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} rows={4} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="precio">Precio</Label>
          <Input id="precio" name="precio" type="number" step="0.01" value={formData.precio} onChange={handleChange} required />
        </div>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit"><Save className="mr-2 h-4 w-4" /> Guardar</Button>
        </div>
      </form>
    </div>
  );
}