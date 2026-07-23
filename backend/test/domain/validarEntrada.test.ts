import { test } from "node:test";
import assert from "node:assert/strict";
import { validarEntradaInput } from "../../src/domain/validarEntrada";

test("validarEntradaInput acepta un body válido y normaliza tipos", () => {
  const resultado = validarEntradaInput({
    fechaActividad: "2026-07-20",
    actividad: "REPORTE DE FALLA",
    proveedor: "  Proveedor X  ",
    costo: "150.5",
    comentarios: "  algo  ",
  });
  assert.deepEqual(resultado, {
    fechaActividad: "2026-07-20",
    actividad: "REPORTE DE FALLA",
    proveedor: "Proveedor X",
    costo: 150.5,
    comentarios: "algo",
  });
});

test("validarEntradaInput rechaza fechaActividad con formato inválido", () => {
  const resultado = validarEntradaInput({ fechaActividad: "20-07-2026", actividad: "REPORTE GENERAL" });
  assert.equal(typeof resultado, "string");
});

test("validarEntradaInput rechaza actividad fuera del catálogo fijo", () => {
  const resultado = validarEntradaInput({ fechaActividad: "2026-07-20", actividad: "ALGO INVENTADO" });
  assert.equal(typeof resultado, "string");
});
