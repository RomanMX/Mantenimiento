import { Link } from "react-router-dom";
import { getElementosEnRojo, getUltimasEntradas, getCostoPorGrupoUltimos12Meses } from "../data/mockData";
import { ElementCard } from "../components/ElementCard";
import { ActividadIcon } from "../components/ActividadIcon";

export function DashboardPage() {
  const enRojo = getElementosEnRojo();
  const ultimasEntradas = getUltimasEntradas();
  const costoPorGrupo = getCostoPorGrupoUltimos12Meses();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <section>
        <h2 style={{ fontSize: "var(--text-subhead-size)", marginBottom: "var(--space-3)" }}>
          Elementos en estatus ROJO ({enRojo.length})
        </h2>
        {enRojo.length === 0 ? (
          <p style={{ color: "var(--color-text-secondary)" }}>No hay elementos en estatus ROJO.</p>
        ) : (
          <div className="grid-2">
            {enRojo.map((elemento) => (
              <ElementCard key={elemento.id} elemento={elemento} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 style={{ fontSize: "var(--text-subhead-size)", marginBottom: "var(--space-3)" }}>
          Costo por grupo (últimos 12 meses)
        </h2>
        <div className="grid-2">
          {costoPorGrupo.map(({ grupo, costoUltimos12Meses }) => (
            <div key={grupo.id} className="card">
              <div style={{ fontSize: "var(--text-caption-size)", color: "var(--color-text-secondary)" }}>{grupo.nombre}</div>
              <div style={{ fontFamily: "var(--font-headline)", fontWeight: 700, fontSize: "var(--text-headline-size)" }}>
                ${costoUltimos12Meses.toLocaleString("es-MX")}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "var(--text-subhead-size)", marginBottom: "var(--space-3)" }}>
          Últimas entradas de bitácora
        </h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {ultimasEntradas.map(({ elemento, entrada }) => (
            <li key={entrada.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to={`/elementos/${elemento.id}`} style={{ fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}>
                  {elemento.nombre}
                </Link>
                <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-caption-size)" }}>{entrada.fechaActividad}</span>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--space-1)",
                  fontSize: "var(--text-body-small-size)",
                  color: "var(--color-text-secondary)",
                }}
              >
                <ActividadIcon tipo={entrada.actividad} />
                {entrada.actividad}
              </div>
              <div style={{ fontSize: "var(--text-caption-size)", color: "var(--color-text-secondary)", marginTop: "var(--space-1)" }}>
                Registrado por: {entrada.usuarioRegistro}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
