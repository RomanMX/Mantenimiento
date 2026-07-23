import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { listAllElementos } from "../repositories/ElementoRepository";
import { getUltimasEntradas } from "../domain/bitacora";
import { ok } from "../http";

export async function handler(event: APIGatewayProxyEventV2) {
  const params = "queryStringParameters" in event ? event.queryStringParameters : undefined;
  const limit = params?.limit ? Number(params.limit) : 5;

  const elementos = await listAllElementos();
  return ok(getUltimasEntradas(elementos, limit));
}
