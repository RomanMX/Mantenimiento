import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getElementoById, getGrupoNombre, fechaCorteUltimos12Meses } from "../data/mockData";
import type { BitacoraEntry, EstatusSemaforo } from "../types";
import { SemaforoBadge } from "../components/SemaforoBadge";
import { BitacoraList } from "../components/BitacoraList";
import { BitacoraEntryForm, type NuevaEntradaInput } from "../components/BitacoraEntryForm";
import { useRole } from "../context/RoleContext";

const ESTATUS_OPCIONES: EstatusSemaforo[] = ["VERDE", "AMARILLO", "ROJO"];

export function ElementoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const original = id ? getElementoById(id) : undefined;
  const { rol, canComment, canChangeEstatus, canEditEntries } = useRole();

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
      fechaRegistro: new Date().toISOString(),
      usuarioRegistro: rol,
      ...input,
    };
    setBitacora((prev) => [nuevaEntrada, ...prev]);
  }

  function editarEntrada(id: string, input: NuevaEntradaInput) {
    setBitacora((prev) => prev.map((entrada) => (entrada.id === id ? { ...entrada, ...input } : entrada)));
  }

  const costoTotal = bitacora.reduce((total, entrada) => total + entrada.costo, 0);

  const fechaCorte = fechaCorteUltimos12Meses();
  const costoUltimos12Meses = bitacora
    .filter((entrada) => entrada.fechaActividad >= fechaCorte)
    .reduce((total, entrada) => total + entrada.costo, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <Link to="/catalogo" style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-caption-size)" }}>
        ← Volver al catálogo
      </Link>

      <div className="detail-header">
        <div>
          <h2 style={{ fontSize: "var(--text-headline-size)" }}>{original.nombre}</h2>
          <div style={{ color: "var(--color-text-secondary)" }}>{getGrupoNombre(original.grupoId)}</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-3)",
              fontSize: "var(--text-body-small-size)",
              color: "var(--color-text-secondary)",
              marginTop: "var(--space-1)",
            }}
          >
            <span>
              Costo total: <strong style={{ color: "var(--color-text-primary)" }}>${costoTotal.toLocaleString("es-MX")}</strong>
            </span>
            <span>
              Últimos 12 meses:{" "}
              <strong style={{ color: "var(--color-text-primary)" }}>${costoUltimos12Meses.toLocaleString("es-MX")}</strong>
            </span>
          </div>
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
        <BitacoraList entradas={bitacora} editable={canEditEntries} onEdit={editarEntrada} />
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
