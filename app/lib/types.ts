// src/app/lib/types.ts

// TIPOS DE LA PAGINA CLIENTE
export enum EstadoCliente {
  PROSPECTO = "PROSPECTO",
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
  CERRADO = "CERRADO",
}

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  estado: EstadoCliente;
}

// TIPOS DE LA PAGINA LEAD
export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  notes?: string;
}

export type CatalogType = "PRODUCT" | "SERVICE";
type CatalogItemDTO = {
  id: number;
  sku?: string | null;
  name: string;
  description?: string | null;
  type: "PRODUCT" | "SERVICE";
  price?: number | null;
  category?: string | null;
  active?: boolean | null;
  stock?: number | null;
  createdAt?: string | null;
};

export interface Servicio {
  id?: number;
  name: string; // ✅ consistente con el back
  description: string;
  price: number;
  type?: CatalogType;
  sku?: string;
  stock?: number;
  active?: boolean;
  category?: string;
}

// src/app/lib/types.ts
export interface Venta {
  id: number;
  fecha: string;
  descripcion: string;
  monto: number;
  productName: string; // 👈 nombre a mostrar en columna "Nombre"
  productType: string; // 👈 tipo a mostrar en columna "Producto"
  estado: string;
  cliente?: string;
}

// Enum de roles posibles
export type Rol = "ROLE_ADMIN" | "ROLE_USER" | "ROLE_INVITED";

// Usuario recibido desde el backend
export interface Usuario {
  id: number;
  username: string;
  email: string;
  password: string;
  role: {
    id: number;
    name: Rol; // acá usamos el tipo Rol como string
  };
}

// Usuario que estamos creando desde el form (sin objeto `role`, solo el string)
export interface UsuarioForm {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: Rol;
}
