import { useState } from "react";
import type { BitacoraEntry } from "../types";
import { ActividadIcon } from "./ActividadIcon";
import { BitacoraEntryForm, type NuevaEntradaInput } from "./BitacoraEntryForm";

interface BitacoraListProps {
  entradas: BitacoraEntry[];
  editable?: boolean;
  onEdit?: (id: string, entrada: NuevaEntradaInput) => void;
}

export function BitacoraList({ entradas, editable = false, onEdit }: BitacoraListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (entradas.length === 0) {
    return (
      <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-body-size)" }}>
        Aún no hay actividades registradas para este elemento.
      </p>
    );
  }

  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      {entradas.map((entrada) => (
        <li key={entrada.id} className="card">
          {editingId === entrada.id ? (
            <BitacoraEntryForm
              initial={{
                actividad: entrada.actividad,
                proveedor: entrada.proveedor,
                costo: entrada.costo,
                comentarios: entrada.comentarios,
              }}
              submitLabel="Guardar cambios"
              onCancel={() => setEditingId(null)}
              onSubmit={(input) => {
                onEdit?.(entrada.id, input);
                setEditingId(null);
              }}
            />
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)" }}>
                  <ActividadIcon tipo={entrada.actividad} />
                  {entrada.actividad}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <span style={{ color: "var(--color-text-secondary)", fontWeight: 400, fontSize: "var(--text-caption-size)" }}>
                    {entrada.fecha}
                  </span>
                  {editable && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      style={{ height: 24, padding: "0 var(--space-2)", fontSize: "var(--text-caption-size)" }}
                      onClick={() => setEditingId(entrada.id)}
                    >
                      Editar
                    </button>
                  )}
                </span>
              </div>
              <div style={{ fontSize: "var(--text-body-small-size)", color: "var(--color-text-secondary)", marginTop: "var(--space-1)" }}>
                Proveedor: {entrada.proveedor || "—"} · Costo: ${entrada.costo.toLocaleString("es-MX")}
              </div>
              {entrada.comentarios && (
                <div style={{ fontSize: "var(--text-body-small-size)", marginTop: "var(--space-1)", whiteSpace: "pre-wrap" }}>
                  {entrada.comentarios}
                </div>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
