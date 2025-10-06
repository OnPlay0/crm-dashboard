"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UsuarioForm } from "@/app/lib/types";

interface Props {
  usuario: UsuarioForm;
  onChange: (u: UsuarioForm) => void;
  onSubmit: () => void;
  onCancel: () => void;
  editando: boolean;
}
export default function UserForm({
  usuario,
  onChange,
  onSubmit,
  onCancel,
  editando,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Nombre de usuario"
          value={usuario.username}
          onChange={(e) => onChange({ ...usuario, username: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={usuario.email}
          onChange={(e) => onChange({ ...usuario, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={usuario.password}
          onChange={(e) => onChange({ ...usuario, password: e.target.value })}
          required={!editando}
          minLength={8}
        />
      </div>
      <div>
        <label className="text-sm font-medium block mb-1">Rol</label>
        <select
          value={usuario.role}
          onChange={(e) =>
            onChange({
              ...usuario,
              role: e.target.value as UsuarioForm["role"],
            })
          }
          required
        >
          <option value="">Seleccionar rol</option>
          <option value="ROLE_USER">Usuario</option>
          <option value="ROLE_ADMIN">Administrador</option>
          <option value="ROLE_INVITED">Invitado</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{editando ? "Actualizar" : "Crear"}</Button>
      </div>
    </form>
  );
}
