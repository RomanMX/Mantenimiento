# CLAUDE.md

Contexto técnico y seguimiento del proyecto **Mantenimiento**, para retomar el trabajo entre sesiones.

## Organización de la documentación

- **[`README.md`](./README.md)**: definiciones de negocio y operación (propuesta, alcance funcional, roles). No debe contener detalle técnico.
- **[`MD/`](./MD)**: specs detalladas por función/feature del sistema (ej. catálogo de elementos). Aquí se agregan los archivos conforme se van definiendo o construyendo nuevas funciones.
- **[`minidash-DESIGN.md`](./minidash-DESIGN.md)**: sistema de diseño visual (MiniDash) que sigue el portal.
- **`CLAUDE.md`** (este archivo): contexto técnico, arquitectura y seguimiento del estado del proyecto.

## Arquitectura técnica

- **Frontend**: React (Vite + TypeScript)
- **Backend**: Node.js sobre AWS Lambda
- **Infraestructura**: AWS serverless (API Gateway + Lambda), definida como código con AWS CDK (TypeScript)
- **Base de datos**: DynamoDB
- **Autenticación**: Amazon Cognito (User Pools) — usuario/contraseña y Google como proveedor federado

## Diseño de interfaz

El portal sigue el sistema de diseño **MiniDash** (compacto, estilo dashboard/widgets) definido en [`minidash-DESIGN.md`](./minidash-DESIGN.md): paleta índigo-teal-ámbar, tipografía Inter/DM Sans, grid de widgets de 2 columnas y componentes (cards, chips de estatus, botones, inputs). El frontend implementa estos tokens en `frontend/src/styles/tokens.css`.

## Estructura del repositorio

```
/frontend   → Aplicación React (SPA)
/backend    → Funciones Lambda (Node.js) y lógica de negocio/API
/infra      → Infraestructura como código con AWS CDK (TypeScript)
/MD         → Specs específicas por función/feature
```

- **frontend/**: SPA en React que consume la API a través de API Gateway.
- **backend/**: código de las funciones Lambda que implementan la lógica de la bitácora de mantenimiento (alta/consulta de elementos y actividades).
- **infra/**: definición de la infraestructura AWS (API Gateway, Lambda, DynamoDB, Cognito) usando AWS CDK en TypeScript.

## Estado del proyecto / Seguimiento

- [x] Propuesta de negocio definida (`README.md`)
- [x] Sistema de diseño definido (`minidash-DESIGN.md`)
- [x] Catálogo inicial de elementos, plantilla de ejemplo (`MD/catalogo-elementos.md`)
- [x] Estructura de carpetas del monorepo (`frontend/`, `backend/`, `infra/`)
- [x] Scaffold del frontend con datos mock (React + Vite + TS, tokens de MiniDash): dashboard inicial (elementos en ROJO + últimas entradas), catálogo con buscador, detalle de elemento (bitácora, estatus, comentarios en memoria) y selector de rol activo
- [ ] Backend: Lambdas Node.js para catálogo y bitácora de mantenimiento
- [ ] Infraestructura AWS (CDK): DynamoDB, API Gateway, Cognito
- [ ] Autenticación real (Cognito) y permisos por rol conectados al backend
- [ ] Persistencia real de comentarios y cambios de estatus (hoy solo viven en memoria en el frontend)
- [ ] Carga del inventario real de elementos del edificio (hoy `MD/catalogo-elementos.md` es una plantilla genérica)
- [ ] Tests automatizados

## Notas del entorno de desarrollo

- El frontend corre con datos mock; ver [`frontend/README.md`](./frontend/README.md) para los comandos de desarrollo.
- En este entorno (WSL), `node`/`npm` no están en el `PATH` de WSL; se usa la instalación de Windows en `/mnt/c/Program Files/nodejs/`.
