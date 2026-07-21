# frontend

SPA en React (Vite + TypeScript) que implementa el portal de mantenimiento descrito en la [propuesta de solución](../README.md).

Por ahora corre con **datos mock** (`src/data/mockData.ts`, basados en [`MD/catalogo-elementos.md`](../MD/catalogo-elementos.md)) y sin autenticación real: hay un selector de "rol activo" en el header que simula los 4 roles definidos en el README y habilita/oculta acciones según sus permisos.

## Funcionalidad incluida

- **Dashboard** (`/`): elementos con estatus ROJO + últimas entradas de bitácora.
- **Catálogo** (`/catalogo`): buscador de elementos, agrupados por grupo.
- **Detalle de elemento** (`/elementos/:id`): bitácora histórica, estatus semáforo (editable según rol) y formulario para agregar comentarios (solo en memoria).

## Desarrollo

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción (incluye chequeo de tipos)
npm run preview   # sirve el build de producción localmente
```

## Pendiente (fuera de este scaffold)

- Conexión a API real (backend en `/backend`) en lugar de datos mock.
- Autenticación con Amazon Cognito.
- Persistencia de comentarios y cambios de estatus.
