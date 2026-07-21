import { useMemo, useState } from "react";
import { buscarElementos, grupos } from "../data/mockData";
import { SearchBar } from "../components/SearchBar";
import { ElementCard } from "../components/ElementCard";

export function CatalogoPage() {
  const [query, setQuery] = useState("");
  const resultados = useMemo(() => buscarElementos(query), [query]);

  const gruposConResultados = grupos
    .map((grupo) => ({ grupo, elementos: resultados.filter((e) => e.grupoId === grupo.id) }))
    .filter(({ elementos }) => elementos.length > 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div>
        <h2 style={{ fontSize: "var(--text-subhead-size)", marginBottom: "var(--space-3)" }}>Catálogo de elementos</h2>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {gruposConResultados.length === 0 && (
        <p style={{ color: "var(--color-text-secondary)" }}>No se encontraron elementos.</p>
      )}

      {gruposConResultados.map(({ grupo, elementos }) => (
        <section key={grupo.id}>
          <h3
            style={{
              fontSize: "var(--text-overline-size)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-2)",
            }}
          >
            {grupo.nombre} ({elementos.length})
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-2)" }}>
            {elementos.map((elemento) => (
              <ElementCard key={elemento.id} elemento={elemento} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
