import type { EstatusSemaforo } from "../types";

const COLOR: Record<EstatusSemaforo, string> = {
  VERDE: "var(--color-semaforo-verde)",
  AMARILLO: "var(--color-semaforo-amarillo)",
  ROJO: "var(--color-semaforo-rojo)",
};

export function SemaforoBadge({ estatus }: { estatus: EstatusSemaforo }) {
  const color = COLOR[estatus];
  return (
    <span
      className="chip"
      style={{ background: `${color}1A`, color }}
    >
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: "var(--radius-full)",
          background: color,
        }}
      />
      {estatus}
    </span>
  );
}
