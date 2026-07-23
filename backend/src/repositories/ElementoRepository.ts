import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand, QueryCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, ELEMENTOS_TABLE } from "../db/client";
import type { BitacoraEntry, Elemento, EstatusSemaforo } from "../types";

export async function listAllElementos(): Promise<Elemento[]> {
  const items: Elemento[] = [];
  let exclusiveStartKey: Record<string, unknown> | undefined;

  do {
    const result = await ddb.send(
      new ScanCommand({ TableName: ELEMENTOS_TABLE, ExclusiveStartKey: exclusiveStartKey }),
    );
    items.push(...((result.Items as Elemento[]) ?? []));
    exclusiveStartKey = result.LastEvaluatedKey;
  } while (exclusiveStartKey);

  return items;
}

export async function listElementosPorGrupo(grupoId: string): Promise<Elemento[]> {
  const result = await ddb.send(
    new QueryCommand({
      TableName: ELEMENTOS_TABLE,
      IndexName: "GrupoIndex",
      KeyConditionExpression: "grupoId = :grupoId",
      ExpressionAttributeValues: { ":grupoId": grupoId },
    }),
  );
  return (result.Items as Elemento[]) ?? [];
}

export async function listElementosPorEstatus(estatus: EstatusSemaforo): Promise<Elemento[]> {
  const result = await ddb.send(
    new QueryCommand({
      TableName: ELEMENTOS_TABLE,
      IndexName: "EstatusIndex",
      KeyConditionExpression: "estatus = :estatus",
      ExpressionAttributeValues: { ":estatus": estatus },
    }),
  );
  return (result.Items as Elemento[]) ?? [];
}

export async function getElemento(id: string): Promise<Elemento | undefined> {
  const result = await ddb.send(new GetCommand({ TableName: ELEMENTOS_TABLE, Key: { id } }));
  return result.Item as Elemento | undefined;
}

export async function putElemento(elemento: Elemento): Promise<void> {
  await ddb.send(new PutCommand({ TableName: ELEMENTOS_TABLE, Item: elemento }));
}

/** Antepone una entrada a la bitácora del elemento. Retorna false si el elemento no existe. */
export async function addBitacoraEntry(id: string, entrada: BitacoraEntry): Promise<boolean> {
  try {
    await ddb.send(
      new UpdateCommand({
        TableName: ELEMENTOS_TABLE,
        Key: { id },
        ConditionExpression: "attribute_exists(id)",
        UpdateExpression: "SET bitacora = list_append(:nueva, bitacora)",
        ExpressionAttributeValues: { ":nueva": [entrada] },
      }),
    );
    return true;
  } catch (err) {
    if (err instanceof ConditionalCheckFailedException) return false;
    throw err;
  }
}

/**
 * Reemplaza los campos editables (todo salvo id/fechaRegistro/usuarioRegistro) de una entrada
 * existente. Retorna "elemento-no-encontrado" | "entrada-no-encontrada" | "ok".
 */
export type UpdateBitacoraEntryResult =
  | { status: "elemento-no-encontrado" }
  | { status: "entrada-no-encontrada" }
  | { status: "ok"; entrada: BitacoraEntry };

export async function updateBitacoraEntry(
  id: string,
  entryId: string,
  cambios: Omit<BitacoraEntry, "id" | "fechaRegistro" | "usuarioRegistro">,
): Promise<UpdateBitacoraEntryResult> {
  const elemento = await getElemento(id);
  if (!elemento) return { status: "elemento-no-encontrado" };

  const index = elemento.bitacora.findIndex((entrada) => entrada.id === entryId);
  if (index === -1) return { status: "entrada-no-encontrada" };

  const entradaActualizada: BitacoraEntry = { ...elemento.bitacora[index], ...cambios };

  await ddb.send(
    new UpdateCommand({
      TableName: ELEMENTOS_TABLE,
      Key: { id },
      ConditionExpression: `attribute_exists(id) AND size(bitacora) > :index`,
      UpdateExpression: `SET bitacora[${index}] = :entrada`,
      ExpressionAttributeValues: { ":entrada": entradaActualizada, ":index": index },
    }),
  );
  return { status: "ok", entrada: entradaActualizada };
}

/** Cambia el estatus semáforo del elemento. Retorna false si el elemento no existe. */
export async function updateEstatus(id: string, estatus: EstatusSemaforo): Promise<boolean> {
  try {
    await ddb.send(
      new UpdateCommand({
        TableName: ELEMENTOS_TABLE,
        Key: { id },
        ConditionExpression: "attribute_exists(id)",
        UpdateExpression: "SET estatus = :estatus",
        ExpressionAttributeValues: { ":estatus": estatus },
      }),
    );
    return true;
  } catch (err) {
    if (err instanceof ConditionalCheckFailedException) return false;
    throw err;
  }
}
