# infra

Infraestructura como código (AWS CDK, TypeScript) para Calli.

## Estado actual

Solo las tablas DynamoDB que usa `../backend` (`lib/calli-stack.ts`):

- **`calli-elementos`** — un item por elemento, con su bitácora completa embebida (lista). Índices secundarios `GrupoIndex` (por `grupoId`) y `EstatusIndex` (por `estatus`, para el dashboard).
- **`calli-grupos`** — catálogo de grupos.

API Gateway y Cognito **no** están definidos todavía — son los siguientes ítems pendientes en `../CLAUDE.md`.

## Desarrollo

```bash
npm install
npm run synth   # genera la plantilla CloudFormation localmente, no toca AWS
npm run diff    # compara contra lo ya desplegado (si existe)
npm run deploy  # despliega a la cuenta/región configurada en el entorno — acción real, con costo
```

`npm run deploy` no se ha corrido en este proyecto: la cuenta de AWS configurada en el entorno de desarrollo es una cuenta real y compartida con otros proyectos, así que desplegar requiere una decisión explícita aparte.
