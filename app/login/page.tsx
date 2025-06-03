"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/app/lib/login";
import Image from "next/image";
import { handleGuestLogin } from "@/app/login/handle";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(""); // Limpia error anterior

    try {
      await loginRequest(username, password);
      router.push("/");
    } catch (error: any) {
      setErrorMessage("Usuario o contraseña incorrectos");
      console.error(error.message);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Opcional: lógica para expiración
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-32 p-6 bg-zinc-900 rounded-xl shadow-lg space-y-4"
    >
      <div className="flex justify-center">
        <Image
          src="/ovelinkfondo.png"
          alt="Logo Ovelink"
          width={180}
          height={80}
          priority
        />
      </div>

      <h2 className="text-2xl font-bold text-white">
        Iniciar sesión en Ovelink
      </h2>

      {errorMessage && (
        <div className="bg-red-600 text-white p-2 rounded text-center">
          {errorMessage}
        </div>
      )}

      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Entrar
      </button>
      <button
        type="button"
        onClick={() => handleGuestLogin(router)}
        className="mt-2 w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
      >
        Ingresar como Invitado
      </button>
    </form>
  );
}
