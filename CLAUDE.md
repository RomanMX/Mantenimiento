# CLAUDE.md

Contexto técnico y seguimiento del proyecto **Calli** (sistema de mantenimiento de edificio), para retomar el trabajo entre sesiones.

## Organización de la documentación

- **[`README.md`](./README.md)**: definiciones de negocio y operación (propuesta, alcance funcional, roles). No debe contener detalle técnico.
- **[`MD/`](./MD)**: specs detalladas por función/feature del sistema (ej. catálogo de elementos, tipos de actividad). Aquí se agregan los archivos conforme se van definiendo o construyendo nuevas funciones.
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

- **frontend/**: SPA en React que hoy consume datos mock; falta conectarla a la API real.
- **backend/**: funciones Lambda (Node.js/TypeScript) para catálogo (lectura) y bitácora de mantenimiento (alta/consulta/edición), sobre DynamoDB. Ver `backend/README.md`.
- **infra/**: CDK (TypeScript) con las tablas DynamoDB. API Gateway/Lambda/Cognito aún no están definidos aquí. Ver `infra/README.md`.

## Estado del proyecto / Seguimiento

- [x] Propuesta de negocio definida (`README.md`)
- [x] Sistema de diseño definido (`minidash-DESIGN.md`)
- [x] Catálogo inicial de elementos, plantilla de ejemplo (`MD/catalogo-elementos.md`)
- [x] Estructura de carpetas del monorepo (`frontend/`, `backend/`, `infra/`)
- [x] Catálogo de tipos de actividad, con ícono por tipo (`MD/tipos-actividad.md`)
- [x] Especificación de autenticación y gestión de usuarios: login con Gmail o usuario/contraseña propio (alta solo por Administrador de Portal), cambio de contraseña para cuentas propias (`MD/usuarios-autenticacion.md`)
- [x] Scaffold del frontend con datos mock (React + Vite + TS, tokens de MiniDash):
  - Dashboard inicial: elementos en ROJO, costo por grupo (últimos 12 meses) y últimas entradas de bitácora
  - Catálogo con buscador y categorías colapsables
  - Detalle de elemento: bitácora histórica, estatus semáforo, costo total y de últimos 12 meses, registro de actividad (catálogo fijo + proveedor/costo/comentarios)
  - Edición de entradas de bitácora ya registradas (rol Comité de Vigilancia)
  - Selector de rol activo con permisos condicionados por rol
  - Layout responsivo (mobile-first breakpoint <600px), verificado sin overflow horizontal
- [x] Infraestructura AWS (CDK): tablas DynamoDB `calli-elementos`/`calli-grupos` (`infra/lib/calli-stack.ts`) — **desplegadas** a la cuenta real (`CalliStack`, cuenta `681567442203`, `us-east-1`), vacías. API Gateway y Cognito aún no están definidos en `infra/`.
- [x] Backend: Lambdas Node.js/TypeScript para catálogo (solo lectura) y bitácora de mantenimiento (alta/edición de entradas, cambio de estatus), con permisos por rol validados en servidor (`backend/src/`). Probado con `node --test` contra DynamoDB Local (Docker), 16/16 pruebas pasando. Alta/baja/edición del catálogo (grupos y elementos) queda pendiente para una siguiente etapa.
- [ ] Conectar el frontend al backend real (hoy sigue leyendo de `frontend/src/data/mockData.ts`)
- [ ] Desplegar las Lambdas de `backend/` (código listo, aún no definidas/desplegadas en `infra/`)
- [ ] API Gateway (exponer las Lambdas como HTTP API) y Cognito (autenticación real, ver `MD/usuarios-autenticacion.md`) — permisos por rol en backend ya están listos para conectarse a los claims del JWT
- [ ] `npm run seed` en `backend/` contra la tabla real (hoy vacía) para cargar el catálogo de ejemplo
- [ ] Alta/baja/edición del catálogo (grupos y elementos) en el backend, rol Administrador de Portal
- [ ] Carga del inventario real de elementos del edificio (hoy `MD/catalogo-elementos.md` es una plantilla genérica)
- [ ] Tests automatizados del frontend (el backend ya tiene los suyos, ver `backend/README.md`)

## Notas del entorno de desarrollo

- El frontend corre con datos mock; ver [`frontend/README.md`](./frontend/README.md) para los comandos de desarrollo.
- En este entorno (WSL), `node`/`npm` no están en el `PATH` de WSL; se usa la instalación de Windows en `/mnt/c/Program Files/nodejs/`. Al invocar esos binarios `.exe` desde bash de WSL, **las variables de entorno exportadas en bash no se pasan al proceso de Windows** (WSL no las reenvía salvo que estén en `WSLENV`); por eso `backend/package.json` usa `node --env-file=.env.test` en vez de `VAR=valor npm test`.
- Docker está disponible pero el usuario de este shell no pertenece al grupo `docker` (permission denied en `/var/run/docker.sock`); comandos `docker run/ps/...` los tiene que correr el usuario directamente en su terminal (prefijo `!`), no Claude.
- La CLI de AWS ya está configurada en este entorno con credenciales reales de una cuenta compartida (no solo de este proyecto — ya tiene otro proyecto desplegado). No correr `cdk deploy` ni ninguna acción que cree/modifique recursos reales sin confirmación explícita del usuario.
