// src/app/lib/leads.ts
import { fetchData, postData, putData, deleteData } from "./api";
import { Lead } from "./types";

// Mapeo visual para mostrar valores amigables (si querés usar en el futuro en UI)
export const statusMap: Record<string, string> = {
  NUEVO: "Nuevo",
  EN_PROCESO: "En seguimiento",
  CONTACTADO: "Contactado",
  CALIFICADO: "Calificado",
  DESCARTADO: "Descartado",
};

export const sourceMap: Record<string, string> = {
  WEB: "Web",
  REFERIDO: "Referido",
  REDES_SOCIALES: "Redes Sociales",
  LLAMADA: "Llamada",
  EMAIL: "Email",
  EVENTO: "Evento",
  OTRO: "Otro",
};

const mapLeadFromBackend = (lead: any): Lead => ({
  id: lead.id,
  name: lead.nombre ?? "",
  company: lead.empresa ?? "",
  email: lead.email ?? "",
  phone: lead.telefono ?? "",
  source: lead.fuente ?? "",
  status: lead.estado ?? "",
  notes: lead.notas ?? "",
});

export const getLeads = async (): Promise<Lead[]> => {
  const data = await fetchData("leads");
  return data.map(mapLeadFromBackend);
};

export const createLead = (data: Omit<Lead, "id">) => postData("leads", {
  nombre: data.name,
  empresa: data.company,
  email: data.email,
  telefono: data.phone,
  fuente: data.source,
  estado: data.status,
  notas: data.notes,
});

export const updateLead = (id: number, data: Lead) => putData(`leads/${id}`, {
  id: data.id,
  nombre: data.name,
  empresa: data.company,
  email: data.email,
  telefono: data.phone,
  fuente: data.source,
  estado: data.status,
  notas: data.notes,
});

export const deleteLead = (id: number) => deleteData(`leads/${id}`);
