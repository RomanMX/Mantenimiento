import { putElemento } from "./repositories/ElementoRepository";
import { putGrupo } from "./repositories/GrupoRepository";
import type { BitacoraEntry, Elemento, Grupo } from "./types";

export const grupos: Grupo[] = [
  { id: "rampas", nombre: "Rampas de carros" },
  { id: "elevadores", nombre: "Elevadores" },
  { id: "bomba-agua", nombre: "Bomba de agua" },
  { id: "portones", nombre: "Portones" },
  { id: "lamparas-estacionamiento", nombre: "Lámparas de estacionamiento" },
  { id: "lamparas-pasillo", nombre: "Lámparas de pasillo" },
];

function bitacora(entries: Omit<BitacoraEntry, "id">[]): BitacoraEntry[] {
  return entries.map((entry, index) => ({ id: `${entry.fechaActividad}-${index}`, ...entry }));
}

export const elementos: Elemento[] = [
  {
    id: "rampa-1",
    nombre: "Rampa 1",
    grupoId: "rampas",
    estatus: "VERDE",
    bitacora: bitacora([
      {
        fechaActividad: "2026-05-12",
        fechaRegistro: "2026-05-12T09:00:00",
        usuarioRegistro: "Administración Edificio",
        actividad: "MANTENIMIENTO PREVENTIVO",
        proveedor: "Portones y Rampas del Valle",
        costo: 1200,
        comentarios: "Lubricación de mecanismo. Funcionamiento correcto tras servicio.",
      },
    ]),
  },
  {
    id: "rampa-2",
    nombre: "Rampa 2",
    grupoId: "rampas",
    estatus: "VERDE",
    bitacora: bitacora([
      {
        fechaActividad: "2026-04-02",
        fechaRegistro: "2026-04-02T09:00:00",
        usuarioRegistro: "Administración Edificio",
        actividad: "MANTENIMIENTO PREVENTIVO",
        proveedor: "Portones y Rampas del Valle",
        costo: 800,
        comentarios: "Revisión de sensores. Sin novedades.",
      },
    ]),
  },
  {
    id: "elevador-1",
    nombre: "Elevador 1",
    grupoId: "elevadores",
    estatus: "VERDE",
    bitacora: bitacora([
      {
        fechaActividad: "2026-06-20",
        fechaRegistro: "2026-06-20T09:00:00",
        usuarioRegistro: "Administración Edificio",
        actividad: "MANTENIMIENTO PREVENTIVO",
        proveedor: "Otis Elevadores",
        costo: 3500,
        comentarios: "Mantenimiento preventivo mensual. Todo en orden.",
      },
    ]),
  },
  {
    id: "elevador-2",
    nombre: "Elevador 2",
    grupoId: "elevadores",
    estatus: "ROJO",
    bitacora: bitacora([
      {
        fechaActividad: "2026-07-18",
        fechaRegistro: "2026-07-18T09:00:00",
        usuarioRegistro: "Administración Edificio",
        actividad: "REPORTE DE FALLA",
        proveedor: "Otis Elevadores",
        costo: 0,
        comentarios: "Falla en puerta de cabina. Elevador fuera de servicio, en espera de refacción.",
      },
      {
        fechaActividad: "2026-07-01",
        fechaRegistro: "2026-07-01T09:00:00",
        usuarioRegistro: "Administración Edificio",
        actividad: "MANTENIMIENTO PREVENTIVO",
        proveedor: "Otis Elevadores",
        costo: 3500,
        comentarios: "Mantenimiento preventivo mensual. Se detectó desgaste en riel de puerta.",
      },
    ]),
  },
  {
    id: "bomba-agua-1",
    nombre: "Bomba de Agua 1",
    grupoId: "bomba-agua",
    estatus: "AMARILLO",
    bitacora: bitacora([
      {
        fechaActividad: "2026-07-15",
        fechaRegistro: "2026-07-15T09:00:00",
        usuarioRegistro: "Administración Edificio",
        actividad: "REPORTE DE FALLA",
        proveedor: "Hidráulica Del Norte",
        costo: 950,
        comentarios: "Revisión de presión y ruido anómalo. Se recomienda cambio de sello en próximas 4 semanas.",
      },
    ]),
  },
  {
    id: "porton-principal",
    nombre: "Portón Principal",
    grupoId: "portones",
    estatus: "VERDE",
    bitacora: bitacora([
      {
        fechaActividad: "2026-03-10",
        fechaRegistro: "2026-03-10T09:00:00",
        usuarioRegistro: "Administración Edificio",
        actividad: "MANTENIMIENTO CORRECTIVO",
        proveedor: "Portones y Rampas del Valle",
        costo: 600,
        comentarios: "Ajuste de motor. Operación normal.",
      },
    ]),
  },
  {
    id: "porton-secundario",
    nombre: "Portón Secundario",
    grupoId: "portones",
    estatus: "VERDE",
    bitacora: [],
  },
  {
    id: "lampara-estacionamiento-1",
    nombre: "Lámpara Estacionamiento 1",
    grupoId: "lamparas-estacionamiento",
    estatus: "VERDE",
    bitacora: bitacora([
      {
        fechaActividad: "2026-06-05",
        fechaRegistro: "2026-06-05T09:00:00",
        usuarioRegistro: "Administración Edificio",
        actividad: "MANTENIMIENTO CORRECTIVO",
        proveedor: "Eléctrica Sáenz",
        costo: 150,
        comentarios: "Cambio de foco LED.",
      },
    ]),
  },
  {
    id: "lampara-estacionamiento-2",
    nombre: "Lámpara Estacionamiento 2",
    grupoId: "lamparas-estacionamiento",
    estatus: "VERDE",
    bitacora: [],
  },
  {
    id: "lampara-pasillo-1",
    nombre: "Lámpara Pasillo 1",
    grupoId: "lamparas-pasillo",
    estatus: "VERDE",
    bitacora: [],
  },
  {
    id: "lampara-pasillo-2",
    nombre: "Lámpara Pasillo 2",
    grupoId: "lamparas-pasillo",
    estatus: "ROJO",
    bitacora: bitacora([
      {
        fechaActividad: "2026-07-19",
        fechaRegistro: "2026-07-19T09:00:00",
        usuarioRegistro: "Administración Edificio",
        actividad: "REPORTE DE FALLA",
        proveedor: "Eléctrica Sáenz",
        costo: 0,
        comentarios: "Reporte de falla total. Pasillo sin iluminación, se solicitó visita urgente.",
      },
    ]),
  },
];

async function seed() {
  await Promise.all(grupos.map(putGrupo));
  await Promise.all(elementos.map(putElemento));
  console.log(`Sembrados ${grupos.length} grupos y ${elementos.length} elementos.`);
}

if (require.main === module) {
  seed().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
