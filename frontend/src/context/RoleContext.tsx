import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Rol } from "../types";

export const ROLES: Rol[] = [
  "Administrador de Portal",
  "Comité de Vigilancia",
  "Personal Sitio",
  "Administración Edificio",
];

interface Permisos {
  canManageCatalogo: boolean;
  canComment: boolean;
  canChangeEstatus: boolean;
  canEditEntries: boolean;
}

function permisosDeRol(rol: Rol): Permisos {
  switch (rol) {
    case "Administrador de Portal":
      return { canManageCatalogo: true, canComment: false, canChangeEstatus: false, canEditEntries: false };
    case "Comité de Vigilancia":
      return { canManageCatalogo: false, canComment: true, canChangeEstatus: false, canEditEntries: true };
    case "Personal Sitio":
    case "Administración Edificio":
      return { canManageCatalogo: false, canComment: true, canChangeEstatus: true, canEditEntries: false };
  }
}

interface RoleContextValue extends Permisos {
  rol: Rol;
  setRol: (rol: Rol) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [rol, setRol] = useState<Rol>("Administrador de Portal");
  const value = useMemo<RoleContextValue>(() => ({ rol, setRol, ...permisosDeRol(rol) }), [rol]);
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole debe usarse dentro de RoleProvider");
  return ctx;
}
