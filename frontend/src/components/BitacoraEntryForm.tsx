import { useState, type FormEvent } from "react";

export interface NuevaEntradaInput {
  actividad: string;
  proveedor: string;
  costo: number;
  comentarios: string;
}

interface BitacoraEntryFormProps {
  onSubmit: (entrada: NuevaEntradaInput) => void;
}

export function BitacoraEntryForm({ onSubmit }: BitacoraEntryFormProps) {
  const [actividad, setActividad] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [costo, setCosto] = useState("");
  const [comentarios, setComentarios] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = actividad.trim();
    if (!trimmed) return;
    onSubmit({
      actividad: trimmed,
      proveedor: proveedor.trim(),
      costo: Number(costo) || 0,
      comentarios: comentarios.trim(),
    });
    setActividad("");
    setProveedor("");
    setCosto("");
    setComentarios("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", gap: "var(--space-2)" }}>
        <input
          className="input"
          value={actividad}
          onChange={(e) => setActividad(e.target.value)}
          placeholder="Actividad realizada"
          aria-label="Actividad realizada"
        />
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
      <input
        className="input"
        value={comentarios}
        onChange={(e) => setComentarios(e.target.value)}
        placeholder="Comentarios"
        aria-label="Comentarios"
      />
      <button type="submit" className="btn btn-primary" disabled={!actividad.trim()} style={{ alignSelf: "flex-start" }}>
        Registrar actividad
      </button>
    </form>
  );
}
