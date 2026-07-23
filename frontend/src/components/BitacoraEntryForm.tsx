import { useState, type FormEvent } from "react";
import { TIPOS_ACTIVIDAD, type TipoActividad } from "../types";
import { ActividadIcon } from "./ActividadIcon";

export interface NuevaEntradaInput {
  fechaActividad: string;
  actividad: TipoActividad;
  proveedor: string;
  costo: number;
  comentarios: string;
}

interface BitacoraEntryFormProps {
  onSubmit: (entrada: NuevaEntradaInput) => void;
  initial?: NuevaEntradaInput;
  submitLabel?: string;
  onCancel?: () => void;
}

function hoy(): string {
  return new Date().toISOString().slice(0, 10);
}

export function BitacoraEntryForm({ onSubmit, initial, submitLabel = "Registrar actividad", onCancel }: BitacoraEntryFormProps) {
  const [fechaActividad, setFechaActividad] = useState(initial?.fechaActividad ?? hoy());
  const [actividad, setActividad] = useState<TipoActividad>(initial?.actividad ?? TIPOS_ACTIVIDAD[0]);
  const [proveedor, setProveedor] = useState(initial?.proveedor ?? "");
  const [costo, setCosto] = useState(initial ? String(initial.costo) : "");
  const [comentarios, setComentarios] = useState(initial?.comentarios ?? "");
  const isEdit = Boolean(initial);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      fechaActividad,
      actividad,
      proveedor: proveedor.trim(),
      costo: Number(costo) || 0,
      comentarios: comentarios.trim(),
    });
    if (!isEdit) {
      setFechaActividad(hoy());
      setActividad(TIPOS_ACTIVIDAD[0]);
      setProveedor("");
      setCosto("");
      setComentarios("");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      <div className="entry-form-grid">
        <input
          className="input"
          type="date"
          value={fechaActividad}
          onChange={(e) => setFechaActividad(e.target.value)}
          aria-label="Fecha de la actividad"
        />
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <span style={{ position: "absolute", left: 10, pointerEvents: "none" }}>
            <ActividadIcon tipo={actividad} />
          </span>
          <select
            className="input"
            style={{ paddingLeft: 32 }}
            value={actividad}
            onChange={(e) => setActividad(e.target.value as TipoActividad)}
            aria-label="Actividad realizada"
          >
            {TIPOS_ACTIVIDAD.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
        <input
          className="input"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          placeholder="Proveedor"
          aria-label="Proveedor"
        />
        <input
          className="input"
          type="number"
          min="0"
          step="0.01"
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
          placeholder="Costo"
          aria-label="Costo"
        />
      </div>
      <textarea
        className="input textarea"
        value={comentarios}
        onChange={(e) => setComentarios(e.target.value)}
        placeholder="Comentarios"
        aria-label="Comentarios"
        rows={3}
      />
      <div style={{ display: "flex", gap: "var(--space-2)" }}>
        <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
