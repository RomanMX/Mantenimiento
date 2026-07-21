import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import { ROLES, useRole } from "../../context/RoleContext";

const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  padding: "var(--space-2) var(--space-3)",
  borderRadius: "var(--radius-md)",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "var(--text-body-size)",
  color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
  background: isActive ? "var(--color-primary-tint)" : "transparent",
});

export function AppShell({ children }: { children: ReactNode }) {
  const { rol, setRol } = useRole();

  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          padding: "var(--space-3) var(--space-4)",
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
          <h1 style={{ fontSize: "var(--text-headline-size)" }}>Mantenimiento</h1>
          <nav style={{ display: "flex", gap: "var(--space-1)" }}>
            <NavLink to="/" style={navLinkStyle} end>
              Dashboard
            </NavLink>
            <NavLink to="/catalogo" style={navLinkStyle}>
              Catálogo
            </NavLink>
          </nav>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-caption-size)", color: "var(--color-text-secondary)" }}>
          Rol activo
          <select
            className="input"
            style={{ width: "auto", height: 32 }}
            value={rol}
            onChange={(e) => setRol(e.target.value as typeof rol)}
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "var(--space-4)" }}>{children}</main>
    </div>
  );
}
