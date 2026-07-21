import type { BitacoraEntry, Elemento, Grupo } from "../types";

export const grupos: Grupo[] = [
  { id: "rampas", nombre: "Rampas de carros" },
  { id: "elevadores", nombre: "Elevadores" },
  { id: "bomba-agua", nombre: "Bomba de agua" },
  { id: "portones", nombre: "Portones" },
  { id: "lamparas-estacionamiento", nombre: "Lámparas de estacionamiento" },
  { id: "lamparas-pasillo", nombre: "Lámparas de pasillo" },
];

function bitacora(entries: Omit<BitacoraEntry, "id">[]): BitacoraEntry[] {
  return entries.map((entry, index) => ({ id: `${entry.fecha}-${index}`, ...entry }));
}

export const elementos: Elemento[] = [
  {
    id: "rampa-1",
    nombre: "Rampa 1",
    grupoId: "rampas",
    estatus: "VERDE",
    bitacora: bitacora([
      {
        fecha: "2026-05-12",
        actividad: "Lubricación de mecanismo",
        proveedor: "Portones y Rampas del Valle",
        costo: 1200,
        comentarios: "Funcionamiento correcto tras servicio.",
      },
    ]),
  },
  {
    id: "rampa-2",
    nombre: "Rampa 2",
    grupoId: "rampas",
    estatus: "VERDE",
    bitacora: bitacora([
      {
        fecha: "2026-04-02",
        actividad: "Revisión de sensores",
        proveedor: "Portones y Rampas del Valle",
        costo: 800,
        comentarios: "Sin novedades.",
      },
    ]),
  },
  {
    id: "elevador-1",
    nombre: "Elevador 1",
    grupoId: "elevadores",
    estatus: "VERDE",
    bitacora: bitacora([
      {
        fecha: "2026-06-20",
        actividad: "Mantenimiento preventivo mensual",
        proveedor: "Otis Elevadores",
        costo: 3500,
        comentarios: "Todo en orden.",
      },
    ]),
  },
  {
    id: "elevador-2",
    nombre: "Elevador 2",
    grupoId: "elevadores",
    estatus: "ROJO",
    bitacora: bitacora([
      {
        fecha: "2026-07-18",
        actividad: "Falla en puerta de cabina",
        proveedor: "Otis Elevadores",
        costo: 0,
        comentarios: "Elevador fuera de servicio, en espera de refacción.",
      },
      {
        fecha: "2026-07-01",
        actividad: "Mantenimiento preventivo mensual",
        proveedor: "Otis Elevadores",
        costo: 3500,
        comentarios: "Se detectó desgaste en riel de puerta.",
      },
    ]),
  },
  {
    id: "bomba-agua-1",
    nombre: "Bomba de Agua 1",
    grupoId: "bomba-agua",
    estatus: "AMARILLO",
    bitacora: bitacora([
      {
        fecha: "2026-07-15",
        actividad: "Revisión de presión y ruido anómalo",
        proveedor: "Hidráulica Del Norte",
        costo: 950,
        comentarios: "Se recomienda cambio de sello en próximas 4 semanas.",
      },
    ]),
  },
  {
    id: "porton-principal",
    nombre: "Portón Principal",
    grupoId: "portones",
    estatus: "VERDE",
    bitacora: bitacora([
      {
        fecha: "2026-03-10",
        actividad: "Ajuste de motor",
        proveedor: "Portones y Rampas del Valle",
        costo: 600,
        comentarios: "Operación normal.",
      },
    ]),
  },
  {
    id: "porton-secundario",
    nombre: "Portón Secundario",
    grupoId: "portones",
    estatus: "VERDE",
    bitacora: [],
  },
  {
    id: "lampara-estacionamiento-1",
    nombre: "Lámpara Estacionamiento 1",
    grupoId: "lamparas-estacionamiento",
    estatus: "VERDE",
    bitacora: bitacora([
      {
        fecha: "2026-06-05",
        actividad: "Cambio de foco LED",
        proveedor: "Eléctrica Sáenz",
        costo: 150,
        comentarios: "",
      },
    ]),
  },
  {
    id: "lampara-estacionamiento-2",
    nombre: "Lámpara Estacionamiento 2",
    grupoId: "lamparas-estacionamiento",
    estatus: "VERDE",
    bitacora: [],
  },
  {
    id: "lampara-pasillo-1",
    nombre: "Lámpara Pasillo 1",
    grupoId: "lamparas-pasillo",
    estatus: "VERDE",
    bitacora: [],
  },
  {
    id: "lampara-pasillo-2",
    nombre: "Lámpara Pasillo 2",
    grupoId: "lamparas-pasillo",
    estatus: "ROJO",
    bitacora: bitacora([
      {
        fecha: "2026-07-19",
        actividad: "Reporte de falla total",
        proveedor: "Eléctrica Sáenz",
        costo: 0,
        comentarios: "Pasillo sin iluminación, se solicitó visita urgente.",
      },
    ]),
  },
];

export function getGrupoNombre(grupoId: string): string {
  return grupos.find((g) => g.id === grupoId)?.nombre ?? grupoId;
}

export function getElementosPorGrupo(grupoId: string): Elemento[] {
  return elementos.filter((e) => e.grupoId === grupoId);
}

export function getElementoById(id: string): Elemento | undefined {
  return elementos.find((e) => e.id === id);
}

export function getElementosEnRojo(): Elemento[] {
  return elementos.filter((e) => e.estatus === "ROJO");
}

export interface UltimaEntrada {
  elemento: Elemento;
  entrada: BitacoraEntry;
}

export function getUltimasEntradas(limit = 5): UltimaEntrada[] {
  return elementos
    .flatMap((elemento) => elemento.bitacora.map((entrada) => ({ elemento, entrada })))
    .sort((a, b) => b.entrada.fecha.localeCompare(a.entrada.fecha))
    .slice(0, limit);
}

export function buscarElementos(query: string): Elemento[] {
  const q = query.trim().toLowerCase();
  if (!q) return elementos;
  return elementos.filter(
    (e) =>
      e.nombre.toLowerCase().includes(q) ||
      getGrupoNombre(e.grupoId).toLowerCase().includes(q),
  );
}
