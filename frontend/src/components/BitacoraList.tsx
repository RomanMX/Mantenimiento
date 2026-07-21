import type { BitacoraEntry } from "../types";

export function BitacoraList({ entradas }: { entradas: BitacoraEntry[] }) {
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
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
            <span>{entrada.actividad}</span>
            <span style={{ color: "var(--color-text-secondary)", fontWeight: 400, fontSize: "var(--text-caption-size)" }}>
              {entrada.fecha}
            </span>
          </div>
          <div style={{ fontSize: "var(--text-body-small-size)", color: "var(--color-text-secondary)", marginTop: "var(--space-1)" }}>
            Proveedor: {entrada.proveedor || "—"} · Costo: ${entrada.costo.toLocaleString("es-MX")}
          </div>
          {entrada.comentarios && (
            <div style={{ fontSize: "var(--text-body-small-size)", marginTop: "var(--space-1)" }}>{entrada.comentarios}</div>
          )}
        </li>
      ))}
    </ul>
  );
}
