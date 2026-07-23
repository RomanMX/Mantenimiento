# Autenticación y Gestión de Usuarios

Detalle del inicio de sesión y alta de usuarios descrito en la propuesta ([`README.md`](../README.md#4-usuarios-y-roles)).

## Métodos de inicio de sesión

| Método | Descripción |
|---|---|
| **Cuenta de Gmail** | El usuario inicia sesión directamente con su cuenta de Google (proveedor federado). No requiere que se le genere una cuenta local en el portal. |
| **Usuario y contraseña propios** | Cuenta local del portal, generada únicamente por el rol **Administrador de Portal** (alta de usuarios). El Administrador de Portal define el usuario, la contraseña inicial y el rol asignado. |

## Cambio de contraseña

- Los usuarios que ingresan con **usuario y contraseña propios** pueden cambiar su contraseña desde su perfil dentro del portal.
- Los usuarios que ingresan con **cuenta de Gmail** no tienen contraseña propia en el sistema (la gestionan directamente en Google), por lo que esta opción no les aplica.

## Notas

- Implementación técnica prevista con Amazon Cognito (User Pools), que soporta ambos flujos: usuario/contraseña nativo y Google como proveedor de identidad federado (ver [`CLAUDE.md`](../CLAUDE.md#arquitectura-técnica)).
- El rol asignado a cada usuario (independientemente del método de inicio de sesión) determina sus permisos según la tabla de [Usuarios y Roles](../README.md#4-usuarios-y-roles).
- Pendiente de construir: hoy el frontend simula el acceso mediante un selector de "rol activo" sin login real (ver `CLAUDE.md`, ítem "Autenticación real (Cognito) y permisos por rol conectados al backend").
