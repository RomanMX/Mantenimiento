import { TIPOS_ACTIVIDAD, type TipoActividad } from "../types";

export interface EntradaInput {
  fechaActividad: string;
  actividad: TipoActividad;
  proveedor: string;
  costo: number;
  comentarios: string;
}

const FECHA_RE = /^\d{4}-\d{2}-\d{2}$/;

export function validarEntradaInput(body: unknown): EntradaInput | string {
  if (typeof body !== "object" || body === null) return "Cuerpo de la solicitud inválido";
  const b = body as Record<string, unknown>;

  if (typeof b.fechaActividad !== "string" || !FECHA_RE.test(b.fechaActividad)) {
    return "fechaActividad inválida, se espera formato YYYY-MM-DD";
  }
  if (typeof b.actividad !== "string" || !(TIPOS_ACTIVIDAD as string[]).includes(b.actividad)) {
    return `actividad inválida, valores permitidos: ${TIPOS_ACTIVIDAD.join(", ")}`;
  }

  return {
    fechaActividad: b.fechaActividad,
    actividad: b.actividad as TipoActividad,
    proveedor: typeof b.proveedor === "string" ? b.proveedor.trim() : "",
    costo: typeof b.costo === "number" && Number.isFinite(b.costo) ? b.costo : Number(b.costo) || 0,
    comentarios: typeof b.comentarios === "string" ? b.comentarios.trim() : "",
  };
}
