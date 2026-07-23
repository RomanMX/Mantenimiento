import type { BitacoraEntry, Elemento, Grupo } from "../types";

export interface UltimaEntrada {
  elemento: Elemento;
  entrada: BitacoraEntry;
}

export function getUltimasEntradas(elementos: Elemento[], limit = 5): UltimaEntrada[] {
  return elementos
    .flatMap((elemento) => elemento.bitacora.map((entrada) => ({ elemento, entrada })))
    .sort((a, b) => b.entrada.fechaActividad.localeCompare(a.entrada.fechaActividad))
    .slice(0, limit);
}

export function fechaCorteUltimos12Meses(): string {
  const haceUnAnio = new Date();
  haceUnAnio.setFullYear(haceUnAnio.getFullYear() - 1);
  return haceUnAnio.toISOString().slice(0, 10);
}

export interface CostoPorGrupo {
  grupo: Grupo;
  costoUltimos12Meses: number;
}

export function getCostoPorGrupoUltimos12Meses(grupos: Grupo[], elementos: Elemento[]): CostoPorGrupo[] {
  const fechaCorte = fechaCorteUltimos12Meses();
  return grupos.map((grupo) => ({
    grupo,
    costoUltimos12Meses: elementos
      .filter((elemento) => elemento.grupoId === grupo.id)
      .flatMap((elemento) => elemento.bitacora)
      .filter((entrada) => entrada.fechaActividad >= fechaCorte)
      .reduce((total, entrada) => total + entrada.costo, 0),
  }));
}

export function buscarElementos(elementos: Elemento[], grupoNombrePorId: Map<string, string>, query: string): Elemento[] {
  const q = query.trim().toLowerCase();
  if (!q) return elementos;
  return elementos.filter(
    (e) =>
      e.nombre.toLowerCase().includes(q) ||
      (grupoNombrePorId.get(e.grupoId) ?? e.grupoId).toLowerCase().includes(q),
  );
}
