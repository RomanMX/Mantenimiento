import { test } from "node:test";
import assert from "node:assert/strict";
import { parseRol, permisosDeRol } from "../../src/domain/permisos";

test("parseRol acepta solo valores de Rol válidos", () => {
  assert.equal(parseRol("Comité de Vigilancia"), "Comité de Vigilancia");
  assert.equal(parseRol("rol-inventado"), undefined);
  assert.equal(parseRol(undefined), undefined);
  assert.equal(parseRol(42), undefined);
});

test("permisosDeRol: solo Comité de Vigilancia puede editar entradas", () => {
  assert.equal(permisosDeRol("Comité de Vigilancia").canEditEntries, true);
  assert.equal(permisosDeRol("Administrador de Portal").canEditEntries, false);
  assert.equal(permisosDeRol("Personal Sitio").canEditEntries, false);
});

test("permisosDeRol: Personal Sitio y Administración Edificio pueden cambiar estatus y comentar", () => {
  for (const rol of ["Personal Sitio", "Administración Edificio"] as const) {
    const permisos = permisosDeRol(rol);
    assert.equal(permisos.canChangeEstatus, true);
    assert.equal(permisos.canComment, true);
    assert.equal(permisos.canManageCatalogo, false);
  }
});

test("permisosDeRol: solo Administrador de Portal administra el catálogo", () => {
  assert.equal(permisosDeRol("Administrador de Portal").canManageCatalogo, true);
  assert.equal(permisosDeRol("Comité de Vigilancia").canManageCatalogo, false);
});
