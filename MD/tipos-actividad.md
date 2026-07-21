# Catálogo de Tipos de Actividad

Catálogo fijo de tipos de actividad seleccionable al registrar una entrada en la bitácora de un elemento (ver [`README.md`](../README.md#32-bitácora-de-mantenimiento)). Cada tipo tiene un ícono y color distintivo para identificación rápida en la bitácora, las tarjetas de elemento y el dashboard.

| Tipo | Uso |
|---|---|
| REPORTE DE FALLA | Reportar una falla o anomalía detectada en el elemento. |
| MANTENIMIENTO PREVENTIVO | Actividad de mantenimiento programado/rutinario. |
| MANTENIMIENTO CORRECTIVO | Reparación o corrección de una falla ya identificada. |
| REPORTE GENERAL | Comentario o nota general que no corresponde a los tipos anteriores. |
| PAGO SERVICIO | Registro de pago realizado a un proveedor por el servicio. |

## Notas

- El catálogo es fijo en esta etapa (no editable desde la UI); ampliarlo requiere actualizar el código del frontend (`frontend/src/types.ts`).
- Ver también [`MD/catalogo-elementos.md`](./catalogo-elementos.md) para el catálogo de grupos y elementos del edificio, que es independiente de este catálogo de tipos de actividad.
