// ✅ ClientForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EstadoCliente, Cliente } from "@/app/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient, updateClient } from "@/app/lib/cliente";
import toast from "react-hot-toast";

interface ClientFormProps {
  onClose: () => void;
  editData: Cliente | null;
  onClienteGuardado?: () => void;
}

export function ClientForm({
  onClose,
  editData,
  onClienteGuardado,
}: ClientFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<
    Omit<Cliente, "id"> & { id?: number }
  >(
    editData || {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      direccion: "",
      estado: EstadoCliente.PROSPECTO,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const telefonoLimpio = (formData.telefono || "").replace(/\D/g, "");
    // Validación más flexible (7–15 dígitos)
    if (telefonoLimpio.length < 7 || telefonoLimpio.length > 15) {
      toast.error("El teléfono debe tener entre 7 y 15 dígitos.");
      return;
    }

    const payload = { ...formData, telefono: telefonoLimpio };

    try {
      setLoading(true);
      if (editData) {
        await updateClient({ ...payload, id: editData.id });
        toast.success("✅ Cliente actualizado");
      } else {
        const { id, ...dataWithoutId } = payload;
        await createClient(dataWithoutId);
        toast.success("✅ Cliente creado");
      }
      onClienteGuardado?.();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "❌ Error al guardar cliente");
      console.error("Error al guardar cliente:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="apellido">Apellido</Label>
        <Input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="telefono">Teléfono</Label>
        <Input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="direccion">Dirección</Label>
        <Input
          type="text"
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="estado">Estado</Label>
        <Select
          value={formData.estado}
          onValueChange={(value) =>
            setFormData((s) => ({ ...s, estado: value as EstadoCliente }))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={EstadoCliente.PROSPECTO}>
              {EstadoCliente.PROSPECTO}
            </SelectItem>
            <SelectItem value={EstadoCliente.ACTIVO}>
              {EstadoCliente.ACTIVO}
            </SelectItem>
            <SelectItem value={EstadoCliente.INACTIVO}>
              {EstadoCliente.INACTIVO}
            </SelectItem>
            <SelectItem value={EstadoCliente.CERRADO}>
              {EstadoCliente.CERRADO}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
