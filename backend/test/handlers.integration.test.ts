/**
 * Pruebas de integración contra DynamoDB Local (Docker). Requieren:
 *   docker run -d -p 8000:8000 amazon/dynamodb-local
 * y las variables de entorno DYNAMODB_ENDPOINT/ELEMENTOS_TABLE/GRUPOS_TABLE
 * (ya configuradas en el script "test" de package.json).
 */
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import {
  CreateTableCommand,
  DeleteTableCommand,
  DynamoDBClient,
  ResourceNotFoundException,
} from "@aws-sdk/client-dynamodb";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { ELEMENTOS_TABLE, GRUPOS_TABLE } from "../src/db/client";
import { putElemento } from "../src/repositories/ElementoRepository";
import { putGrupo } from "../src/repositories/GrupoRepository";
import { grupos, elementos } from "../src/seed";

import { handler as listGrupos } from "../src/handlers/listGrupos";
import { handler as listElementos } from "../src/handlers/listElementos";
import { handler as getElemento } from "../src/handlers/getElemento";
import { handler as agregarEntradaBitacora } from "../src/handlers/agregarEntradaBitacora";
import { handler as editarEntradaBitacora } from "../src/handlers/editarEntradaBitacora";
import { handler as cambiarEstatus } from "../src/handlers/cambiarEstatus";
import { handler as getUltimasEntradas } from "../src/handlers/getUltimasEntradas";
import { handler as getCostoPorGrupo } from "../src/handlers/getCostoPorGrupo";

const raw = new DynamoDBClient({ endpoint: process.env.DYNAMODB_ENDPOINT });

function event(overrides: Partial<APIGatewayProxyEventV2> = {}): APIGatewayProxyEventV2 {
  return { pathParameters: {}, queryStringParameters: {}, body: undefined, ...overrides } as APIGatewayProxyEventV2;
}

async function dropTableIfExists(TableName: string) {
  try {
    await raw.send(new DeleteTableCommand({ TableName }));
  } catch (err) {
    if (!(err instanceof ResourceNotFoundException)) throw err;
  }
}

before(async () => {
  await dropTableIfExists(ELEMENTOS_TABLE);
  await dropTableIfExists(GRUPOS_TABLE);

  await raw.send(
    new CreateTableCommand({
      TableName: ELEMENTOS_TABLE,
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "grupoId", AttributeType: "S" },
        { AttributeName: "estatus", AttributeType: "S" },
      ],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      GlobalSecondaryIndexes: [
        {
          IndexName: "GrupoIndex",
          KeySchema: [
            { AttributeName: "grupoId", KeyType: "HASH" },
            { AttributeName: "id", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
        },
        {
          IndexName: "EstatusIndex",
          KeySchema: [
            { AttributeName: "estatus", KeyType: "HASH" },
            { AttributeName: "id", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
        },
      ],
    }),
  );

  await raw.send(
    new CreateTableCommand({
      TableName: GRUPOS_TABLE,
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    }),
  );

  await Promise.all(grupos.map(putGrupo));
  await Promise.all(elementos.map(putElemento));
});

after(async () => {
  await dropTableIfExists(ELEMENTOS_TABLE);
  await dropTableIfExists(GRUPOS_TABLE);
});

test("listGrupos regresa el catálogo sembrado", async () => {
  const res = await listGrupos();
  const body = JSON.parse(res.body as string);
  assert.equal(body.length, grupos.length);
});

test("listElementos con estatus=ROJO regresa solo los elementos en rojo", async () => {
  const res = await listElementos(event({ queryStringParameters: { estatus: "ROJO" } }));
  const body = JSON.parse(res.body as string);
  assert.ok(body.length > 0);
  assert.ok(body.every((e: { estatus: string }) => e.estatus === "ROJO"));
});

test("getElemento regresa 404 para un id inexistente", async () => {
  const res = await getElemento(event({ pathParameters: { id: "no-existe" } }));
  assert.equal(res.statusCode, 404);
});

test("flujo completo de bitácora: agregar, editar, y aplicar permisos por rol", async () => {
  const elementoId = "rampa-1";

  const rechazo = await agregarEntradaBitacora(
    event({
      pathParameters: { id: elementoId },
      body: JSON.stringify({
        rol: "Administrador de Portal",
        fechaActividad: "2026-07-20",
        actividad: "REPORTE GENERAL",
        proveedor: "X",
        costo: 10,
        comentarios: "no debería poder",
      }),
    }),
  );
  assert.equal(rechazo.statusCode, 403);

  const altaRes = await agregarEntradaBitacora(
    event({
      pathParameters: { id: elementoId },
      body: JSON.stringify({
        rol: "Comité de Vigilancia",
        fechaActividad: "2026-07-20",
        actividad: "REPORTE GENERAL",
        proveedor: "Proveedor de prueba",
        costo: 250,
        comentarios: "entrada de integración",
      }),
    }),
  );
  assert.equal(altaRes.statusCode, 201);
  const nuevaEntrada = JSON.parse(altaRes.body as string);
  assert.equal(nuevaEntrada.usuarioRegistro, "Comité de Vigilancia");
  assert.ok(nuevaEntrada.fechaRegistro);

  const detalleRes = await getElemento(event({ pathParameters: { id: elementoId } }));
  const detalle = JSON.parse(detalleRes.body as string);
  assert.equal(detalle.bitacora[0].id, nuevaEntrada.id);

  const edicionRes = await editarEntradaBitacora(
    event({
      pathParameters: { id: elementoId, entryId: nuevaEntrada.id },
      body: JSON.stringify({
        rol: "Comité de Vigilancia",
        fechaActividad: "2026-07-21",
        actividad: "REPORTE GENERAL",
        proveedor: "Proveedor editado",
        costo: 300,
        comentarios: "editado",
      }),
    }),
  );
  assert.equal(edicionRes.statusCode, 200);
  const entradaEditada = JSON.parse(edicionRes.body as string);
  assert.equal(entradaEditada.proveedor, "Proveedor editado");
  assert.equal(entradaEditada.usuarioRegistro, "Comité de Vigilancia", "no debe cambiar quién la registró originalmente");
});

test("cambiarEstatus respeta permisos por rol y persiste el cambio", async () => {
  const elementoId = "porton-secundario";

  const rechazo = await cambiarEstatus(
    event({ pathParameters: { id: elementoId }, body: JSON.stringify({ rol: "Comité de Vigilancia", estatus: "ROJO" }) }),
  );
  assert.equal(rechazo.statusCode, 403);

  const okRes = await cambiarEstatus(
    event({ pathParameters: { id: elementoId }, body: JSON.stringify({ rol: "Personal Sitio", estatus: "ROJO" }) }),
  );
  assert.equal(okRes.statusCode, 200);

  const detalleRes = await getElemento(event({ pathParameters: { id: elementoId } }));
  const detalle = JSON.parse(detalleRes.body as string);
  assert.equal(detalle.estatus, "ROJO");
});

test("getUltimasEntradas y getCostoPorGrupo agregan a través de todos los elementos", async () => {
  const ultimas = await getUltimasEntradas(event({ queryStringParameters: { limit: "3" } }));
  const bodyUltimas = JSON.parse(ultimas.body as string);
  assert.equal(bodyUltimas.length, 3);

  const costos = await getCostoPorGrupo();
  const bodyCostos = JSON.parse(costos.body as string);
  assert.equal(bodyCostos.length, grupos.length);
});
