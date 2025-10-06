"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // ✅ nuevo
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(username, email, password); // ✅ ahora con email
      router.push("/"); // vuelve al login
    } catch (err: any) {
      setError("Error al registrarse");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto mt-32 p-6 bg-zinc-900 rounded-xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-white text-center">Registrarse</h2>

      {error && <div className="text-red-500 text-center">{error}</div>}

      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
      />
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
      >
        Crear cuenta
      </button>
      <p className="text-center text-sm text-gray-400">
        ¿Ya tenés cuenta?{" "}
        <a href="/" className="text-blue-400 hover:underline">
          Iniciá sesión
        </a>
      </p>
    </form>
  );
}
