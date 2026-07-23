import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { updateBitacoraEntry } from "../repositories/ElementoRepository";
import { validarEntradaInput } from "../domain/validarEntrada";
import { parseRol, permisosDeRol } from "../domain/permisos";
import { badRequest, forbidden, notFound, ok } from "../http";

export async function handler(event: APIGatewayProxyEventV2) {
  const id = event.pathParameters?.id;
  const entryId = event.pathParameters?.entryId;
  if (!id || !entryId) return badRequest("Faltan parámetros id/entryId");

  const body = event.body ? JSON.parse(event.body) : {};

  const rol = parseRol(body.rol);
  if (!rol) return badRequest("rol inválido o faltante");
  if (!permisosDeRol(rol).canEditEntries) return forbidden(`El rol ${rol} no puede editar entradas de bitácora`);

  const input = validarEntradaInput(body);
  if (typeof input === "string") return badRequest(input);

  const resultado = await updateBitacoraEntry(id, entryId, input);
  if (resultado.status === "elemento-no-encontrado") return notFound(`Elemento no encontrado: ${id}`);
  if (resultado.status === "entrada-no-encontrada") return notFound(`Entrada no encontrada: ${entryId}`);

  return ok(resultado.entrada);
}
