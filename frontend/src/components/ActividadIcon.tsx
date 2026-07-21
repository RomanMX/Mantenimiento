import type { ReactNode } from "react";
import type { TipoActividad } from "../types";

const COLOR: Record<TipoActividad, string> = {
  "REPORTE DE FALLA": "var(--color-error)",
  "MANTENIMIENTO PREVENTIVO": "var(--color-secondary)",
  "MANTENIMIENTO CORRECTIVO": "var(--color-tertiary)",
  "REPORTE GENERAL": "var(--color-primary)",
  "PAGO SERVICIO": "var(--color-success)",
};

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const ICONS: Record<TipoActividad, ReactNode> = {
  "REPORTE DE FALLA": (
    <Svg>
      <path d="M8 1.5 14.5 13.5H1.5Z" />
      <line x1="8" y1="6.5" x2="8" y2="9.5" />
      <circle cx="8" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  ),
  "MANTENIMIENTO PREVENTIVO": (
    <Svg>
      <circle cx="8" cy="8" r="6" />
      <line x1="8" y1="8" x2="8" y2="4.5" />
      <line x1="8" y1="8" x2="10.5" y2="9.5" />
    </Svg>
  ),
  "MANTENIMIENTO CORRECTIVO": (
    <Svg>
      <path d="M5.5 2 3 4.5 4.5 6 2 8.5l5.5 5.5 2.5-2.5L11.5 13 14 10.5 8.5 5 11 2.5 9.5 1 7 3.5Z" />
    </Svg>
  ),
  "REPORTE GENERAL": (
    <Svg>
      <rect x="3" y="1.5" width="10" height="13" rx="1" />
      <line x1="5.5" y1="5" x2="10.5" y2="5" />
      <line x1="5.5" y1="8" x2="10.5" y2="8" />
      <line x1="5.5" y1="11" x2="8.5" y2="11" />
    </Svg>
  ),
  "PAGO SERVICIO": (
    <Svg>
      <circle cx="8" cy="8" r="6" />
      <path d="M9.8 6.2c-.3-.5-1-.8-1.8-.8-1.1 0-2 .6-2 1.5s.9 1.3 2 1.5c1.1.2 2 .6 2 1.5s-.9 1.5-2 1.5c-.8 0-1.5-.3-1.8-.8" />
      <line x1="8" y1="4.3" x2="8" y2="5.4" />
      <line x1="8" y1="10.6" x2="8" y2="11.7" />
    </Svg>
  ),
};

export function ActividadIcon({ tipo }: { tipo: TipoActividad }) {
  return (
    <span style={{ color: COLOR[tipo], display: "inline-flex", flexShrink: 0 }} title={tipo}>
      {ICONS[tipo]}
    </span>
  );
}
