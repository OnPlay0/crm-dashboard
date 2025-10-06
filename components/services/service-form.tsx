"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { createServicio, updateServicio } from "@/app/lib/servicios";
import type { Servicio } from "@/app/lib/types";
import toast from "react-hot-toast";

interface ServiceFormProps {
  onClose: () => void;
  editData: Servicio | null;
  onSaved: () => void;
}

export function ServiceForm({ onClose, editData, onSaved }: ServiceFormProps) {
  const [formData, setFormData] = useState<
    Omit<Servicio, "id"> & { id?: number }
  >({
    id: editData?.id,
    name: editData?.name || "",
    description: editData?.description || "",
    price: editData?.price ?? 0,
    type: editData?.type ?? "SERVICE",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      toast.error("Ingresá un precio válido (> 0)");
      return;
    }

    try {
      if (formData.id) {
        await updateServicio(formData.id, formData as Servicio);
        toast.success("✅ Servicio actualizado");
      } else {
        const { id, ...dataSinId } = formData;
        await createServicio(dataSinId);
        toast.success("✅ Servicio creado");
      }
      onSaved();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "❌ Error al guardar servicio");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onClose} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <h2 className="text-2xl font-bold">
          {editData ? "Editar Servicio" : "Nuevo Servicio"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" /> Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}
