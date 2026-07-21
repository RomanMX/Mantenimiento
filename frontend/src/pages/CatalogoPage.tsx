import { useMemo, useState } from "react";
import { buscarElementos, grupos } from "../data/mockData";
import { SearchBar } from "../components/SearchBar";
import { ElementCard } from "../components/ElementCard";

function ChevronIcon({ abierto }: { abierto: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: abierto ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 150ms" }}
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function CatalogoPage() {
  const [query, setQuery] = useState("");
  const [colapsados, setColapsados] = useState<Set<string>>(new Set());
  const resultados = useMemo(() => buscarElementos(query), [query]);

  const gruposConResultados = grupos
    .map((grupo) => ({ grupo, elementos: resultados.filter((e) => e.grupoId === grupo.id) }))
    .filter(({ elementos }) => elementos.length > 0);

  function toggleGrupo(id: string) {
    setColapsados((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div>
        <h2 style={{ fontSize: "var(--text-subhead-size)", marginBottom: "var(--space-3)" }}>Catálogo de elementos</h2>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {gruposConResultados.length === 0 && (
        <p style={{ color: "var(--color-text-secondary)" }}>No se encontraron elementos.</p>
      )}

      {gruposConResultados.map(({ grupo, elementos }) => {
        const abierto = query.trim() !== "" || !colapsados.has(grupo.id);
        return (
          <section key={grupo.id}>
            <button
              type="button"
              onClick={() => toggleGrupo(grupo.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-1)",
                width: "100%",
                background: "none",
                border: "none",
                padding: 0,
                marginBottom: "var(--space-2)",
                cursor: "pointer",
                color: "var(--color-text-secondary)",
              }}
              aria-expanded={abierto}
            >
              <ChevronIcon abierto={abierto} />
              <h3
                style={{
                  fontSize: "var(--text-overline-size)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "inherit",
                }}
              >
                {grupo.nombre} ({elementos.length})
              </h3>
            </button>
            {abierto && (
              <div className="grid-2">
                {elementos.map((elemento) => (
                  <ElementCard key={elemento.id} elemento={elemento} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
