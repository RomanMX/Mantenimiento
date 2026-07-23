export type EstatusSemaforo = "VERDE" | "AMARILLO" | "ROJO";

export type Rol =
  | "Administrador de Portal"
  | "Comité de Vigilancia"
  | "Personal Sitio"
  | "Administración Edificio";

export type TipoActividad =
  | "REPORTE DE FALLA"
  | "MANTENIMIENTO PREVENTIVO"
  | "MANTENIMIENTO CORRECTIVO"
  | "REPORTE GENERAL"
  | "PAGO SERVICIO";

export const TIPOS_ACTIVIDAD: TipoActividad[] = [
  "REPORTE DE FALLA",
  "MANTENIMIENTO PREVENTIVO",
  "MANTENIMIENTO CORRECTIVO",
  "REPORTE GENERAL",
  "PAGO SERVICIO",
];

export interface BitacoraEntry {
  id: string;
  fechaActividad: string;
  fechaRegistro: string;
  usuarioRegistro: string;
  actividad: TipoActividad;
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
