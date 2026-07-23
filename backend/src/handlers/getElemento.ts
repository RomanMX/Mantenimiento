import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { getElemento } from "../repositories/ElementoRepository";
import { badRequest, notFound, ok } from "../http";

export async function handler(event: APIGatewayProxyEventV2) {
  const id = event.pathParameters?.id;
  if (!id) return badRequest("Falta el parámetro id");

  const elemento = await getElemento(id);
  if (!elemento) return notFound(`Elemento no encontrado: ${id}`);

  return ok(elemento);
}
