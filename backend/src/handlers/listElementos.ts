import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { listAllElementos, listElementosPorEstatus, listElementosPorGrupo } from "../repositories/ElementoRepository";
import { listGrupos } from "../repositories/GrupoRepository";
import { buscarElementos } from "../domain/bitacora";
import { badRequest, ok } from "../http";
import type { EstatusSemaforo } from "../types";

const ESTATUS_VALIDOS: EstatusSemaforo[] = ["VERDE", "AMARILLO", "ROJO"];

export async function handler(event: APIGatewayProxyEventV2) {
  const params = "queryStringParameters" in event ? event.queryStringParameters : undefined;
  const q = params?.q;
  const grupoId = params?.grupoId;
  const estatus = params?.estatus;

  if (q) {
    const [elementos, grupos] = await Promise.all([listAllElementos(), listGrupos()]);
    const grupoNombrePorId = new Map(grupos.map((g) => [g.id, g.nombre]));
    return ok(buscarElementos(elementos, grupoNombrePorId, q));
  }

  if (estatus) {
    if (!ESTATUS_VALIDOS.includes(estatus as EstatusSemaforo)) {
      return badRequest(`estatus inválido: ${estatus}`);
    }
    return ok(await listElementosPorEstatus(estatus as EstatusSemaforo));
  }

  if (grupoId) {
    return ok(await listElementosPorGrupo(grupoId));
  }

  return ok(await listAllElementos());
}
