"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "@/app/lib/users";
import UserForm from "@/components/user-form";
import UserTable from "@/components/usert-table";
import { Usuario, UsuarioForm } from "@/app/lib/types";

export default function UsuarioSection() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [nuevoUsuario, setNuevoUsuario] = useState<UsuarioForm>({
    username: "",
    email: "",
    password: "",
    role: "ROLE_USER", // Valor por defecto válido
  });
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsers();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const handleCrearOActualizarUsuario = async () => {
    try {
      if (editandoId) {
        const actualizado = await updateUser(editandoId, nuevoUsuario);
        setUsuarios((prev) =>
          prev.map((u) => (u.id === editandoId ? actualizado : u))
        );
        setEditandoId(null);
      } else {
        const creado = await createUser(nuevoUsuario);
        setUsuarios((prev) => [...prev, creado]);
      }

      setNuevoUsuario({
        username: "",
        email: "",
        password: "",
        role: "ROLE_USER",
      });
    } catch (error) {
      console.error("Error al crear/actualizar usuario:", error);
    }
  };

  const handleEditar = (usuario: Usuario) => {
    setNuevoUsuario({
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      password: "", // no se edita desde el back al traer
      role: usuario.role.name,
    });
    setEditandoId(usuario.id);
  };

  const handleEliminar = async (id: number) => {
    try {
      await deleteUser(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
        <UserForm
          usuario={nuevoUsuario}
          onChange={setNuevoUsuario}
          onSubmit={handleCrearOActualizarUsuario}
          onCancel={() => {
            setNuevoUsuario({
              username: "",
              email: "",
              password: "",
              role: "ROLE_USER",
            });
            setEditandoId(null);
          }}
          editando={!!editandoId}
        />

        <UserTable
          usuarios={usuarios}
          loading={loading}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      </div>
    </div>
  );
}
