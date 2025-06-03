"use client";

import { useState } from "react";
import { BASE_URL } from "@/app/lib/api";

interface FileUploaderProps {
  path: string; // ej: "clientes/upload"
  onUploadSuccess?: () => void; // <- para refrescar la tabla
}

export default function FileUploader({
  path,
  onUploadSuccess,
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Seleccioná un archivo");

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${BASE_URL}/${path}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("✅ Archivo subido correctamente");
        onUploadSuccess?.(); // 🔁 recarga la tabla si se definió la función
      } else {
        const error = await response.text();
        alert("❌ Error al subir archivo: " + error);
      }
    } catch (err) {
      console.error("Error al subir archivo:", err);
      alert("❌ Falló la carga del archivo.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border rounded px-2 py-1 text-sm"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
      >
        Subir archivo
      </button>
    </div>
  );
}
