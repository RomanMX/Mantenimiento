# backend

Funciones Lambda (Node.js/TypeScript) y lógica de negocio/API de Calli: catálogo (grupos/elementos, solo lectura por ahora) y bitácora de mantenimiento (alta/edición de entradas, cambio de estatus).

## Estructura

- `src/types.ts` — modelo de datos (mismo que `frontend/src/types.ts`).
- `src/domain/` — lógica de negocio pura: agregaciones de bitácora (`bitacora.ts`), permisos por rol (`permisos.ts`), validación de entradas (`validarEntrada.ts`).
- `src/db/` — cliente de DynamoDB (`DynamoDBDocumentClient`), configurable por variables de entorno.
- `src/repositories/` — acceso a las tablas DynamoDB `calli-elementos` y `calli-grupos` (definidas en `../infra`).
- `src/handlers/` — una función por Lambda, con firma de API Gateway (`APIGatewayProxyEventV2`/`Result`).
- `src/seed.ts` — puebla las tablas con el catálogo de ejemplo (mismos datos que `frontend/src/data/mockData.ts`).

Pendiente (siguiente etapa): alta/baja/edición del catálogo (grupos y elementos), rol Administrador de Portal.

## Autenticación (temporal)

Todavía no hay Cognito conectado. Los endpoints de escritura reciben el rol activo en el body de la request (`rol`) y validan permisos contra `src/domain/permisos.ts`, igual que hoy lo simula el frontend con su selector de "rol activo". Cuando se conecte Cognito, esto se reemplaza por los claims del JWT autenticado.

## Desarrollo

```bash
npm install
npm run build   # tsc — compila a dist/
npm run seed    # puebla la tabla apuntada por las variables de entorno con el catálogo de ejemplo
npm test        # corre las pruebas (ver abajo)
```

### Correr las pruebas localmente

Las pruebas de integración necesitan DynamoDB Local corriendo en Docker:

```bash
docker run -d --name calli-dynamodb-local -p 8000:8000 amazon/dynamodb-local
npm test
```

`npm test` usa `.env.test` (`DYNAMODB_ENDPOINT=http://localhost:8000`, tablas `calli-elementos-test`/`calli-grupos-test`) para no pisar ninguna tabla real; las pruebas de integración crean y destruyen esas tablas de prueba en cada corrida.

Las variables de entorno que leen los handlers en producción (`DYNAMODB_ENDPOINT` opcional, `ELEMENTOS_TABLE`, `GRUPOS_TABLE`) se definen ahí o se inyectan desde `../infra` al desplegar las Lambdas reales — eso todavía no está hecho (ver `../CLAUDE.md`).
