"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/app/lib/login";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { loginRequest } = useLogin();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      await loginRequest(username, password);
      router.push("/dashboard");
    } catch (error: any) {
      setErrorMessage("Usuario o contraseña incorrectos");
      console.error(error.message);
    }
  };

  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
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
      <p className="text-center text-sm text-gray-400 mt-4">
        ¿No tenés cuenta?{" "}
        <a href="/register" className="text-blue-400 hover:underline">
          Registrate acá
        </a>
      </p>
    </form>
  );
}
