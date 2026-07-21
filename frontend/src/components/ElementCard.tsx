import { Link } from "react-router-dom";
import type { Elemento } from "../types";
import { getGrupoNombre } from "../data/mockData";
import { SemaforoBadge } from "./SemaforoBadge";
import { ActividadIcon } from "./ActividadIcon";

export function ElementCard({ elemento }: { elemento: Elemento }) {
  const ultima = elemento.bitacora[0];
  return (
    <Link
      to={`/elementos/${elemento.id}`}
      className="card"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "var(--space-2)" }}>
        <div>
          <div style={{ fontFamily: "var(--font-headline)", fontWeight: 600, fontSize: "var(--text-subhead-size)" }}>
            {elemento.nombre}
          </div>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-caption-size)" }}>
            {getGrupoNombre(elemento.grupoId)}
          </div>
        </div>
        <SemaforoBadge estatus={elemento.estatus} />
      </div>
      {ultima && (
        <div
          style={{
            marginTop: "var(--space-2)",
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-1)",
            fontSize: "var(--text-body-small-size)",
            color: "var(--color-text-secondary)",
          }}
        >
          <ActividadIcon tipo={ultima.actividad} />
          {ultima.actividad} ({ultima.fecha})
        </div>
      )}
    </Link>
  );
}
