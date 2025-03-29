"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, ArrowLeft } from "lucide-react";

export function SaleForm({ onClose, onSave, editData }: any) {
  const [form, setForm] = useState({
    cliente: editData?.cliente || "",
    producto: editData?.producto || "",
    monto: editData?.monto || "",
    fecha: editData?.fecha || "",
    estado: editData?.estado || "PENDIENTE",
    notas: editData?.notas || "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(form);
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
          <Label>Producto</Label>
          <Input
            name="producto"
            value={form.producto}
            onChange={handleChange}
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
          />
        </div>
        <div>
          <Label>Fecha</Label>
          <Input
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Estado</Label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="COMPLETADA">Completada</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <Label>Notas</Label>
          <Textarea
            name="notas"
            value={form.notas}
            onChange={handleChange}
            rows={4}
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
