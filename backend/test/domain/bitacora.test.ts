import { test } from "node:test";
import assert from "node:assert/strict";
import { getUltimasEntradas, getCostoPorGrupoUltimos12Meses, buscarElementos } from "../../src/domain/bitacora";
import type { Elemento, Grupo } from "../../src/types";

function entrada(fechaActividad: string, costo: number) {
  return {
    id: `${fechaActividad}-${costo}`,
    fechaActividad,
    fechaRegistro: `${fechaActividad}T09:00:00`,
    usuarioRegistro: "Administración Edificio",
    actividad: "REPORTE GENERAL" as const,
    proveedor: "Proveedor X",
    costo,
    comentarios: "",
  };
}

const grupos: Grupo[] = [
  { id: "rampas", nombre: "Rampas" },
  { id: "elevadores", nombre: "Elevadores" },
];

const hoy = new Date();
const hace2Meses = new Date(hoy);
hace2Meses.setMonth(hace2Meses.getMonth() - 2);
const hace2MesesStr = hace2Meses.toISOString().slice(0, 10);
const hace2Anios = new Date(hoy);
hace2Anios.setFullYear(hace2Anios.getFullYear() - 2);
const hace2AniosStr = hace2Anios.toISOString().slice(0, 10);

const elementos: Elemento[] = [
  {
    id: "rampa-1",
    nombre: "Rampa 1",
    grupoId: "rampas",
    estatus: "VERDE",
    bitacora: [entrada(hace2MesesStr, 100), entrada(hace2AniosStr, 999)],
  },
  {
    id: "elevador-1",
    nombre: "Elevador 1",
    grupoId: "elevadores",
    estatus: "ROJO",
    bitacora: [entrada(hace2MesesStr, 50)],
  },
];

test("getUltimasEntradas ordena por fechaActividad descendente y respeta el límite", () => {
  const resultado = getUltimasEntradas(elementos, 2);
  assert.equal(resultado.length, 2);
  assert.ok(resultado[0].entrada.fechaActividad >= resultado[1].entrada.fechaActividad);
});

test("getCostoPorGrupoUltimos12Meses excluye entradas de hace más de 12 meses", () => {
  const resultado = getCostoPorGrupoUltimos12Meses(grupos, elementos);
  const rampas = resultado.find((r) => r.grupo.id === "rampas");
  const elevadores = resultado.find((r) => r.grupo.id === "elevadores");
  assert.equal(rampas?.costoUltimos12Meses, 100);
  assert.equal(elevadores?.costoUltimos12Meses, 50);
});

test("buscarElementos filtra por nombre de elemento o de grupo, sin distinguir mayúsculas", () => {
  const grupoNombrePorId = new Map(grupos.map((g) => [g.id, g.nombre]));
  assert.deepEqual(
    buscarElementos(elementos, grupoNombrePorId, "elevador").map((e) => e.id),
    ["elevador-1"],
  );
  assert.deepEqual(
    buscarElementos(elementos, grupoNombrePorId, "RAMPAS").map((e) => e.id),
    ["rampa-1"],
  );
  assert.equal(buscarElementos(elementos, grupoNombrePorId, "").length, 2);
});
