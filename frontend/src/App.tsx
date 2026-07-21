import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { RoleProvider } from "./context/RoleContext";
import { DashboardPage } from "./pages/DashboardPage";
import { CatalogoPage } from "./pages/CatalogoPage";
import { ElementoDetailPage } from "./pages/ElementoDetailPage";

export function App() {
  return (
    <RoleProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/elementos/:id" element={<ElementoDetailPage />} />
        </Routes>
      </AppShell>
    </RoleProvider>
  );
}
