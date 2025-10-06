"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FeedbackForm } from "@/components/shared/feedbackform";
import { Badge } from "@/components/ui/badge";

export default function HelpPage() {
  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      {/* 🧪 Aviso de estado beta */}
      <Card className="border-yellow-400">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Badge variant="outline" className="bg-yellow-200 text-yellow-900">
              Beta
            </Badge>
            Esta aplicación está en desarrollo
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Estamos constantemente trabajando para mejorarla. ¡Tu opinión nos
            ayuda mucho!
          </p>
        </CardContent>
      </Card>

      {/* 🛠️ Soporte técnico */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">🛠️ Soporte Técnico</h2>
        <p>¿Tenés algún problema técnico o funcional con la plataforma?</p>
        <ul className="list-disc list-inside text-muted-foreground text-sm">
          <li>📧 Email: onplay0000@gmail.com</li>
          <li>📞 WhatsApp: +54 11 5155-0235</li>
        </ul>
      </section>

      {/* 💡 Formulario de sugerencias */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">💡 Ayudanos a mejorar</h2>
        <p className="text-muted-foreground text-sm">
          Invitado, dejanos tus ideas o sugerencias para mejorar esta app.
        </p>
        <FeedbackForm />
      </section>
    </div>
  );
}
