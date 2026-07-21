# Propuesta de Solución: Sistema de Mantenimiento

## 1. Resumen Ejecutivo

Se propone el desarrollo de un sistema web para el seguimiento del mantenimiento de un edificio, que permita llevar una bitácora centralizada, digital y accesible de las actividades realizadas sobre los distintos elementos de la propiedad, dando visibilidad y trazabilidad tanto a la administración como al comité de vigilancia.

## 2. Objetivo

Llevar una bitácora centralizada de las actividades de mantenimiento realizadas sobre los distintos elementos del edificio, permitiendo su registro, consulta y seguimiento de forma ágil y transparente.

## 3. Alcance Funcional

### 3.1 Catálogo de elementos

Los elementos del edificio se organizan en **grupos de elementos**, y cada grupo agrupa a los elementos individuales correspondientes. Por ejemplo:

- **Rampas**: Rampa 1, Rampa 2, Rampa 3
- **Lámparas**: Lámpara Estacionamiento 1, Lámpara Pasillo 1
- **Bombas**: Bomba de Agua 1

### 3.2 Bitácora de mantenimiento

Para cada elemento individual se debe poder registrar y consultar su bitácora histórica, con los siguientes datos por actividad:

- Fecha
- Actividad realizada
- Proveedor
- Costo
- Comentarios

### 3.3 Estatus tipo semáforo

Cada elemento individual cuenta con un estatus tipo semáforo que indica su condición actual:

- **VERDE**
- **AMARILLO**
- **ROJO**

### 3.4 Pantalla inicial (Dashboard)

Al ingresar al portal, la pantalla inicial debe mostrar:

- Los elementos con estatus de semáforo en **ROJO**.
- Las últimas entradas registradas en la bitácora, de cualquier elemento.

### 3.5 Buscador de elementos

El portal debe contar con un buscador de elementos que permita ubicarlos rápidamente para consultar su bitácora y registrar comentarios de forma ágil.

## 4. Usuarios y Roles

| Rol | Permisos |
|---|---|
| **Administrador de Portal** | Acceso a los catálogos, alta y baja de usuarios, y temas propios de gestión de la plataforma. |
| **Comité de Vigilancia** | Consultas y generación de entradas de comentarios sobre los elementos de mantenimiento. |
| **Personal Sitio** | Registro de comentarios y cambio de estatus de los elementos de mantenimiento. |
| **Administración Edificio** | Registro de comentarios y cambio de estatus de los elementos de mantenimiento. |
