import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { updateEstatus } from "../repositories/ElementoRepository";
import { parseRol, permisosDeRol } from "../domain/permisos";
import { badRequest, forbidden, notFound, ok } from "../http";
import type { EstatusSemaforo } from "../types";

const ESTATUS_VALIDOS: EstatusSemaforo[] = ["VERDE", "AMARILLO", "ROJO"];

export async function handler(event: APIGatewayProxyEventV2) {
  const id = event.pathParameters?.id;
  if (!id) return badRequest("Falta el parámetro id");

  const body = event.body ? JSON.parse(event.body) : {};

  const rol = parseRol(body.rol);
  if (!rol) return badRequest("rol inválido o faltante");
  if (!permisosDeRol(rol).canChangeEstatus) return forbidden(`El rol ${rol} no puede cambiar el estatus`);

  if (!ESTATUS_VALIDOS.includes(body.estatus)) {
    return badRequest(`estatus inválido, valores permitidos: ${ESTATUS_VALIDOS.join(", ")}`);
  }

  const existe = await updateEstatus(id, body.estatus as EstatusSemaforo);
  if (!existe) return notFound(`Elemento no encontrado: ${id}`);

  return ok({ id, estatus: body.estatus });
}
