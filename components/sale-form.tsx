"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, ArrowLeft } from "lucide-react";
import { Venta } from "@/app/lib/types";

interface SaleFormProps {
  onClose: () => void;
  onSave: (venta: Venta) => void;
  editData: Venta | null;
}

export function SaleForm({ onClose, onSave, editData }: SaleFormProps) {
  const [form, setForm] = useState({
    cliente: editData?.cliente || "",
    descripcion: editData?.descripcion || "",
    monto: editData?.monto?.toString() || "",
    estado: editData?.estado || "NUEVO",
    fechaCierreEstimada: editData?.fechaCierreEstimada || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const montoNumerico = parseFloat(form.monto);

    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      alert("Por favor ingresá un monto válido mayor a 0.");
      return;
    }

    onSave({
      ...form,
      monto: montoNumerico,
    });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center mb-4">
        <Button variant="ghost" onClick={onClose} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <h2 className="text-2xl font-bold">
          {editData ? "Editar Venta" : "Nueva Venta"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Cliente</Label>
          <Input
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Descripción</Label>
          <Textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
        <div>
          <Label>Monto</Label>
          <Input
            name="monto"
            type="number"
            value={form.monto}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <div>
          <Label>Estado</Label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="NUEVO">Nuevo</option>
            <option value="EN_PROCESO">En proceso</option>
            <option value="GANADO">Ganado</option>
            <option value="PERDIDO">Perdido</option>
          </select>
        </div>
        <div>
          <Label>Fecha de cierre estimada</Label>
          <Input
            name="fechaCierreEstimada"
            type="date"
            value={form.fechaCierreEstimada}
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-4">
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
