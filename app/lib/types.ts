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

export enum FuenteLead {
  WEB = "WEB",
  REFERIDO = "REFERIDO",
  REDES_SOCIALES = "REDES_SOCIALES",
  LLAMADA = "LLAMADA",
  EMAIL = "EMAIL",
  EVENTO = "EVENTO",
  OTRO = "OTRO"
}

export enum EstadoLead {
  NUEVO = "NUEVO",
  EN_PROCESO = "EN_PROCESO",
  CONTACTADO = "CONTACTADO",
  CALIFICADO = "CALIFICADO",
  DESCARTADO = "DESCARTADO"
}

// TIPOS DE LA PAGINA SERVICIOS 
export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

//TIPOS DE LA PAGINA VENTAS
type Venta = {
  id?: number;
  cliente: string;
  producto: string;
  monto: number;
  fecha: string;
  estado: string;
  notas?: string;
};


