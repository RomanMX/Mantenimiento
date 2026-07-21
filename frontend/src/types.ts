export type EstatusSemaforo = "VERDE" | "AMARILLO" | "ROJO";

export type Rol =
  | "Administrador de Portal"
  | "Comité de Vigilancia"
  | "Personal Sitio"
  | "Administración Edificio";

export interface BitacoraEntry {
  id: string;
  fecha: string;
  actividad: string;
  proveedor: string;
  costo: number;
  comentarios: string;
}

export interface Elemento {
  id: string;
  nombre: string;
  grupoId: string;
  estatus: EstatusSemaforo;
  bitacora: BitacoraEntry[];
}

export interface Grupo {
  id: string;
  nombre: string;
}
