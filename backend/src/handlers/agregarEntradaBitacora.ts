import { randomUUID } from "node:crypto";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { addBitacoraEntry } from "../repositories/ElementoRepository";
import { validarEntradaInput } from "../domain/validarEntrada";
import { parseRol, permisosDeRol } from "../domain/permisos";
import { badRequest, created, forbidden, notFound } from "../http";
import type { BitacoraEntry } from "../types";

export async function handler(event: APIGatewayProxyEventV2) {
  const id = event.pathParameters?.id;
  if (!id) return badRequest("Falta el parámetro id");

  const body = event.body ? JSON.parse(event.body) : {};

  const rol = parseRol(body.rol);
  if (!rol) return badRequest("rol inválido o faltante");
  if (!permisosDeRol(rol).canComment) return forbidden(`El rol ${rol} no puede registrar actividades`);

  const input = validarEntradaInput(body);
  if (typeof input === "string") return badRequest(input);

  const entrada: BitacoraEntry = {
    id: randomUUID(),
    fechaRegistro: new Date().toISOString(),
    usuarioRegistro: rol,
    ...input,
  };

  const existe = await addBitacoraEntry(id, entrada);
  if (!existe) return notFound(`Elemento no encontrado: ${id}`);

  return created(entrada);
}
