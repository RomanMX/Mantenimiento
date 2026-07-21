import { Link } from "react-router-dom";
import { getElementosEnRojo, getUltimasEntradas } from "../data/mockData";
import { ElementCard } from "../components/ElementCard";

export function DashboardPage() {
  const enRojo = getElementosEnRojo();
  const ultimasEntradas = getUltimasEntradas();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <section>
        <h2 style={{ fontSize: "var(--text-subhead-size)", marginBottom: "var(--space-3)" }}>
          Elementos en estatus ROJO ({enRojo.length})
        </h2>
        {enRojo.length === 0 ? (
          <p style={{ color: "var(--color-text-secondary)" }}>No hay elementos en estatus ROJO.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-2)" }}>
            {enRojo.map((elemento) => (
              <ElementCard key={elemento.id} elemento={elemento} />
            ))}
          </div>
        )}
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
                <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-caption-size)" }}>{entrada.fecha}</span>
              </div>
              <div style={{ fontSize: "var(--text-body-small-size)", color: "var(--color-text-secondary)" }}>{entrada.actividad}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
