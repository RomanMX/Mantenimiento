import type { Rol } from "../types";

export const ROLES: Rol[] = [
  "Administrador de Portal",
  "Comité de Vigilancia",
  "Personal Sitio",
  "Administración Edificio",
];

export function parseRol(value: unknown): Rol | undefined {
  return typeof value === "string" && (ROLES as string[]).includes(value) ? (value as Rol) : undefined;
}

export interface Permisos {
  canManageCatalogo: boolean;
  canComment: boolean;
  canChangeEstatus: boolean;
  canEditEntries: boolean;
}

export function permisosDeRol(rol: Rol): Permisos {
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
