# Especificación Funcional

# Volumen V

# Parte III

# Storage

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

El módulo Storage administra el almacenamiento, organización, recuperación y eliminación lógica de archivos utilizados por el sistema Alpacart ERP.

Su propósito es centralizar la gestión de archivos para evitar duplicidad, facilitar el mantenimiento y garantizar la trazabilidad de los recursos digitales.

Todos los módulos deberán utilizar Storage para gestionar archivos.

No se permitirá almacenar archivos directamente desde otros módulos.

---

# 2. Alcance

El módulo administra:

- Imágenes de productos.
- Imágenes de categorías.
- Imágenes de colecciones.
- Imágenes institucionales.
- Banners.
- Logotipos.
- Avatares de usuarios.
- Documentos.
- Archivos temporales.
- Archivos de configuración (cuando corresponda).

---

# 3. Actores

## Administrador

Administración completa.

Puede:

- Consultar archivos.
- Eliminar archivos.
- Restaurar archivos.
- Consultar uso del almacenamiento.

---

## Usuario ERP

Puede subir archivos según los permisos asignados.

Puede consultar archivos asociados a los módulos que administra.

---

## Sistema

Gestiona automáticamente:

- Organización.
- Eliminación temporal.
- Asociación de archivos.
- Limpieza de archivos huérfanos.

---

# 4. Interfaces Funcionales

## Biblioteca de Archivos

Permite consultar todos los archivos registrados.

Operaciones

- Buscar.
- Filtrar.
- Visualizar.
- Descargar.
- Eliminar.
- Restaurar.

---

## Subida de Archivos

Permite cargar archivos al sistema.

Operaciones

- Seleccionar.
- Validar.
- Subir.
- Asociar.

---

## Detalle del Archivo

Permite visualizar la información completa del archivo.

Incluye:

- Nombre.
- Tamaño.
- Tipo.
- Fecha.
- Usuario.
- Módulo asociado.
- Estado.

---

# 5. Funcionalidades

F-001

Subir archivos.

---

F-002

Consultar archivos.

---

F-003

Actualizar metadatos.

---

F-004

Eliminar lógicamente archivos.

---

F-005

Restaurar archivos.

---

F-006

Descargar archivos.

---

F-007

Consultar archivos asociados a una entidad.

---

F-008

Detectar archivos huérfanos.

---

F-009

Gestionar carpetas lógicas.

---

F-010

Registrar historial de archivos.

---

# 6. Reglas de Negocio

RN-ST-001

Todo archivo deberá poseer un identificador único.

---

RN-ST-002

Todo archivo deberá registrar el usuario que lo cargó.

---

RN-ST-003

Todo archivo deberá indicar el módulo propietario.

---

RN-ST-004

Los archivos eliminados permanecerán disponibles para restauración hasta que sean eliminados definitivamente mediante procesos administrativos.

---

RN-ST-005

No se permitirá almacenar archivos sin validar su tipo.

---

RN-ST-006

Los archivos deberán organizarse mediante carpetas lógicas.

---

RN-ST-007

Todo cambio deberá registrarse en Audit.

---

RN-ST-008

Un archivo podrá estar asociado a múltiples entidades únicamente cuando el negocio lo permita.

---

# 7. Validaciones

- Archivo obligatorio.
- Tipo permitido.
- Tamaño máximo permitido.
- Nombre válido.
- Extensión válida.
- Usuario autenticado.
- Permisos suficientes.

---

# 8. Estados

Archivo

- Activo
- Inactivo
- Eliminado

Proceso

- Pendiente
- Procesando
- Completado
- Error

---

# 9. Flujo General

```text
Usuario

↓

Selecciona Archivo

↓

Validación

↓

Carga

↓

Registro

↓

Asociación

↓

Disponible para los módulos
```

---

# 10. Casos de Uso

CU-ST-001

Subir archivo.

---

CU-ST-002

Consultar archivo.

---

CU-ST-003

Actualizar información.

---

CU-ST-004

Eliminar archivo.

---

CU-ST-005

Restaurar archivo.

---

CU-ST-006

Descargar archivo.

---

CU-ST-007

Consultar archivos por entidad.

---

CU-ST-008

Detectar archivos huérfanos.

---

# 11. APIs Relacionadas

POST

/api/v1/storage/upload

GET

/api/v1/storage/assets

GET

/api/v1/storage/assets/{id}

PATCH

/api/v1/storage/assets/{id}

DELETE

/api/v1/storage/assets/{id}

POST

/api/v1/storage/assets/{id}/restore

GET

/api/v1/storage/entities/{entity}/{id}

---

# 12. Tablas Involucradas

storage_asset

storage_folder

storage_asset_relation

audit_log

---

# 13. Permisos

STORAGE.READ

STORAGE.UPLOAD

STORAGE.UPDATE

STORAGE.DELETE

STORAGE.RESTORE

STORAGE.DOWNLOAD

---

# 14. Mensajes

Éxito

- Archivo cargado correctamente.
- Archivo actualizado correctamente.
- Archivo restaurado correctamente.

Advertencia

- El archivo ya existe.
- El archivo no está asociado a ninguna entidad.

Error

- Tipo de archivo no permitido.
- Tamaño máximo excedido.
- Archivo no encontrado.
- No posee permisos.

---

# 15. Criterios de Aceptación

- Todo archivo deberá quedar registrado.
- Todo archivo deberá estar asociado a un usuario.
- Todo archivo deberá cumplir las validaciones establecidas.
- El sistema deberá permitir consultar la información del archivo.
- Toda eliminación deberá registrarse en Audit.
- Los módulos consumidores deberán acceder al archivo mediante su identificador.

---

# 16. Casos Generales de Prueba

## Carga

- Subir imagen válida.
- Subir documento válido.
- Intentar subir archivo con extensión no permitida.
- Intentar subir archivo que exceda el tamaño máximo.

---

## Consulta

- Buscar archivo existente.
- Consultar archivo inexistente.

---

## Eliminación

- Eliminar archivo.
- Restaurar archivo.
- Descargar archivo eliminado.

---

# 17. Dependencias

Consume

- IAM
- Audit
- Configuration

Produce servicios para

- CRM
- Catalog
- Textile
- Inventory
- CMS
- Marketing
- Analytics

---

# 18. Observaciones

Storage es un módulo transversal.

Ningún módulo deberá almacenar rutas físicas de archivos.

Todos los módulos deberán almacenar únicamente el identificador del archivo (asset_id), delegando a Storage la administración de la ubicación, metadatos y acceso a los recursos digitales.

El diseño permite reemplazar el mecanismo de almacenamiento en el futuro sin afectar el resto del sistema.