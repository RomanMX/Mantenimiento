import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getElementoById, getGrupoNombre } from "../data/mockData";
import type { BitacoraEntry, EstatusSemaforo } from "../types";
import { SemaforoBadge } from "../components/SemaforoBadge";
import { BitacoraList } from "../components/BitacoraList";
import { BitacoraEntryForm, type NuevaEntradaInput } from "../components/BitacoraEntryForm";
import { useRole } from "../context/RoleContext";

const ESTATUS_OPCIONES: EstatusSemaforo[] = ["VERDE", "AMARILLO", "ROJO"];

export function ElementoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const original = id ? getElementoById(id) : undefined;
  const { canComment, canChangeEstatus } = useRole();

  const [estatus, setEstatus] = useState<EstatusSemaforo | undefined>(original?.estatus);
  const [bitacora, setBitacora] = useState<BitacoraEntry[]>(original?.bitacora ?? []);

  if (!original || !estatus) {
    return (
      <div>
        <p>Elemento no encontrado.</p>
        <Link to="/catalogo">Volver al catálogo</Link>
      </div>
    );
  }

  function agregarEntrada(input: NuevaEntradaInput) {
    const nuevaEntrada: BitacoraEntry = {
      id: `${Date.now()}`,
      fecha: new Date().toISOString().slice(0, 10),
      ...input,
    };
    setBitacora((prev) => [nuevaEntrada, ...prev]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <Link to="/catalogo" style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-caption-size)" }}>
        ← Volver al catálogo
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div>
          <h2 style={{ fontSize: "var(--text-headline-size)" }}>{original.nombre}</h2>
          <div style={{ color: "var(--color-text-secondary)" }}>{getGrupoNombre(original.grupoId)}</div>
        </div>

        {canChangeEstatus ? (
          <label style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <span style={{ fontSize: "var(--text-caption-size)", color: "var(--color-text-secondary)" }}>Estatus</span>
            <select
              className="input"
              style={{ width: "auto", height: 32 }}
              value={estatus}
              onChange={(e) => setEstatus(e.target.value as EstatusSemaforo)}
            >
              {ESTATUS_OPCIONES.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <SemaforoBadge estatus={estatus} />
        )}
      </div>

      <section>
        <h3 style={{ fontSize: "var(--text-subhead-size)", marginBottom: "var(--space-3)" }}>Bitácora histórica</h3>
        <BitacoraList entradas={bitacora} />
      </section>

      {canComment && (
        <section>
          <h3 style={{ fontSize: "var(--text-subhead-size)", marginBottom: "var(--space-3)" }}>Registrar actividad</h3>
          <BitacoraEntryForm onSubmit={agregarEntrada} />
        </section>
      )}
    </div>
  );
}
