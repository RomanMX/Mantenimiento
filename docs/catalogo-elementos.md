# Catálogo Inicial de Elementos (Plantilla)

Plantilla de ejemplo con la estructura de grupos y elementos individuales descrita en la propuesta ([`README.md`](../README.md#31-catálogo-de-elementos)). Las cantidades y nombres son genéricos; deben ajustarse con el inventario real del edificio antes de la carga definitiva.

| Grupo | Elemento | Estatus inicial |
|---|---|---|
| Rampas de carros | Rampa 1 | VERDE |
| Rampas de carros | Rampa 2 | VERDE |
| Elevadores | Elevador 1 | VERDE |
| Elevadores | Elevador 2 | VERDE |
| Bomba de agua | Bomba de Agua 1 | VERDE |
| Portones | Portón Principal | VERDE |
| Portones | Portón Secundario | VERDE |
| Lámparas de estacionamiento | Lámpara Estacionamiento 1 | VERDE |
| Lámparas de estacionamiento | Lámpara Estacionamiento 2 | VERDE |
| Lámparas de pasillo | Lámpara Pasillo 1 | VERDE |
| Lámparas de pasillo | Lámpara Pasillo 2 | VERDE |

## Notas

- Todo elemento nuevo inicia con estatus **VERDE** salvo que se indique lo contrario al darlo de alta.
- El Administrador de Portal es el rol responsable de mantener este catálogo (alta, baja y edición de grupos/elementos).
- Este catálogo es la base para poblar los datos iniciales del sistema (por ejemplo, como seed de DynamoDB en `infra/`).
