import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddb, GRUPOS_TABLE } from "../db/client";
import type { Grupo } from "../types";

export async function listGrupos(): Promise<Grupo[]> {
  const items: Grupo[] = [];
  let exclusiveStartKey: Record<string, unknown> | undefined;

  do {
    const result = await ddb.send(
      new ScanCommand({ TableName: GRUPOS_TABLE, ExclusiveStartKey: exclusiveStartKey }),
    );
    items.push(...((result.Items as Grupo[]) ?? []));
    exclusiveStartKey = result.LastEvaluatedKey;
  } while (exclusiveStartKey);

  return items;
}

export async function putGrupo(grupo: Grupo): Promise<void> {
  await ddb.send(new PutCommand({ TableName: GRUPOS_TABLE, Item: grupo }));
}
