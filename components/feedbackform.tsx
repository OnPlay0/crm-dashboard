"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function FeedbackForm() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setEnviado(false);

    try {
      await emailjs.send(
        "gmail0123", // ✅ ID de servicio
        "template_rj7f05j", // ✅ ID de plantilla
        {
          nombre: nombre,
          mensaje: mensaje,
        },
        "nUHVQD_g_qFrmtChZ" // ✅ esta es tu clave pública
      );
      setEnviado(true);
      setNombre("");
      setMensaje("");
    } catch (err) {
      console.error("❌ Error al enviar sugerencia:", err);
      setError(true);
    }
  };

  return (
    <form onSubmit={sendEmail} className="space-y-4 max-w-xl">
      <div>
        <Label htmlFor="nombre">Tu nombre</Label>
        <Input
          id="nombre"
          name="nombre" // <-- Agregá esto
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="mensaje">¿Cómo podríamos mejorar?</Label>
        <Textarea
          id="mensaje"
          name="mensaje" // <-- Y esto también
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          rows={5}
          required
        />
      </div>
      <Button type="submit">Enviar sugerencia</Button>
      {enviado && <p className="text-green-600">¡Gracias por tu sugerencia!</p>}
      {error && (
        <p className="text-red-600">
          Hubo un problema al enviar. Verificá EmailJS o tu conexión.
        </p>
      )}
    </form>
  );
}
