"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, ArrowLeft } from "lucide-react";
import type { Venta, Servicio } from "@/app/lib/types";
import { getServicios, createServicio } from "@/app/lib/servicios";

interface SaleFormProps {
  onClose: () => void;
  onSave: (
    venta: Venta & { customerId?: number; productId: number; quantity?: number }
  ) => void;
  editData: Venta | null;
}

export function SaleForm({ onClose, onSave, editData }: SaleFormProps) {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loadingOpts, setLoadingOpts] = useState(true);
  const [ventaRapida, setVentaRapida] = useState(false);

  const [form, setForm] = useState({
    productId: 0,
    quantity: 1,
    nombreManual: "",
    monto: editData?.monto?.toString() || "",
    descripcion: editData?.descripcion || "",
    estado: editData?.estado || "NUEVO",
    fecha: editData?.fecha || "",
  });

  useEffect(() => {
    (async () => {
      try {
        const srvRes = await getServicios(0, 50);
        const items: Servicio[] = Array.isArray(srvRes?.items)
          ? srvRes.items
          : [];
        setServicios(items);
        if (items.length === 0) setVentaRapida(true);
      } catch (e) {
        console.error("❌ Error cargando productos/servicios", e);
        setVentaRapida(true);
      } finally {
        setLoadingOpts(false);
      }
    })();
  }, []);

  const servicioSeleccionado = useMemo(
    () => servicios.find((s) => s.id === Number(form.productId)),
    [servicios, form.productId]
  );

  useEffect(() => {
    if (
      !ventaRapida &&
      servicioSeleccionado &&
      (!editData || !editData.monto)
    ) {
      setForm((f) => ({
        ...f,
        monto: String(servicioSeleccionado.price ?? ""),
      }));
    }
  }, [ventaRapida, servicioSeleccionado, editData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "productId" || name === "quantity" ? Number(value) : value,
    }));
  };

  const ensureProductoParaVentaRapida = async (): Promise<number> => {
    const name = form.nombreManual?.trim() || "Venta rápida";
    const price = Number(form.monto || 0);
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");

    const sku =
      `VR-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
      `${pad(now.getHours())}${pad(now.getMinutes())}${pad(
        now.getSeconds()
      )}-` +
      Math.random().toString(36).slice(2, 6).toUpperCase();

    // 👉 Enviamos `name` y `description` al back
    const dto = await createServicio({
      name,
      description: form.descripcion || "Venta rápida",
      price,
      type: "PRODUCT",
      active: true,
      sku,
      category: "VENTA_RAPIDA",
    });

    return Number(dto.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const montoNumerico = parseFloat(form.monto);

    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      alert("Ingresá un monto válido mayor a 0.");
      return;
    }
    if (!ventaRapida && !form.productId) {
      alert("Seleccioná un producto del catálogo o activá 'Venta rápida'.");
      return;
    }
    if (ventaRapida && !form.nombreManual.trim()) {
      alert("Ingresá un nombre para la venta rápida.");
      return;
    }

    let productId = form.productId;
    if (ventaRapida || !productId) {
      try {
        productId = await ensureProductoParaVentaRapida();
      } catch (err) {
        console.error("❌ No se pudo crear el producto genérico", err);
        alert(
          "No se pudo crear el producto genérico. Revisá permisos en catálogo."
        );
        return;
      }
    }

    const servicioSeleccionado = servicios.find(
      (s) => s.id === Number(productId)
    );

    onSave({
      id: editData?.id,
      cliente: "",
      descripcion:
        form.descripcion ||
        servicioSeleccionado?.description ||
        form.nombreManual ||
        "Venta rápida",
      monto: montoNumerico,
      estado: form.estado as any,
      fecha: form.fecha,
      productId: Number(productId),

      // 👇 estos dos SI o SI van a ir al back
      productName:
        servicioSeleccionado?.name || form.nombreManual || "Venta rápida",
      productType: servicioSeleccionado?.type || "PRODUCT",

      quantity: Number(form.quantity || 1),
    } as any);
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
        {/* Toggle Venta rápida */}
        <div className="md:col-span-2 flex items-center gap-2">
          <input
            id="ventaRapida"
            type="checkbox"
            checked={ventaRapida}
            onChange={(e) => setVentaRapida(e.target.checked)}
          />
          <Label htmlFor="ventaRapida">
            Venta rápida (sin elegir producto del catálogo)
          </Label>
        </div>

        {/* Producto del catálogo */}
        {!ventaRapida && (
          <div>
            <Label>Producto del catálogo</Label>
            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              disabled={loadingOpts}
              required
            >
              <option value={0} disabled>
                {loadingOpts ? "Cargando..." : "Seleccioná un producto"}
              </option>
              {servicios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — ${s.price?.toLocaleString("es-AR")}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Nombre manual (solo venta rápida) */}
        {ventaRapida && (
          <div>
            <Label>Nombre (venta rápida)</Label>
            <Input
              name="nombreManual"
              value={form.nombreManual}
              onChange={handleChange}
              placeholder="Ej: Servicio puntual / Trabajo express"
              required
            />
          </div>
        )}

        {/* Cantidad */}
        <div>
          <Label>Cantidad</Label>
          <Input
            name="quantity"
            type="number"
            min={1}
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Monto */}
        <div>
          <Label>Monto (Unit Price)</Label>
          <Input
            name="monto"
            type="number"
            value={form.monto}
            onChange={handleChange}
            disabled={!ventaRapida && !!servicioSeleccionado}
            required={ventaRapida}
            min="0.01"
            step="0.01"
          />
        </div>

        {/* Descripción */}
        <div className="md:col-span-2">
          <Label>Descripción</Label>
          <Textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
            placeholder="Notas de la venta"
          />
        </div>

        {/* Estado */}
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

        {/* Fecha */}
        <div>
          <Label>Fecha de la venta</Label>
          <Input
            name="fecha"
            type="date"
            value={form.fecha}
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
