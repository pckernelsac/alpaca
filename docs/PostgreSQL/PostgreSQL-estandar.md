# PostgreSQL Physical Data Model (PPDM)

> Proyecto: Alpacart ERP
>
> Volumen III
>
> Parte I
>
> PostgreSQL Standards & Naming Convention

---

# 1. Objetivo

Este documento establece los estándares oficiales para el diseño físico de la base de datos PostgreSQL.

Todas las tablas, columnas, índices, restricciones y relaciones deberán cumplir estas reglas.

Este documento será la referencia oficial para:

- PostgreSQL
- NestJS
- Sequelize
- Prisma (si se usa en el futuro)
- API REST
- Auditoría
- Machine Learning

---

# 2. Motor

PostgreSQL 17+

UTF8

Timezone UTC

UUID Primary Keys

Soft Delete

Auditoría

---

# 3. Convenciones de Nombres

## Tablas

snake_case

Singular

Correcto

cliente

producto

pedido

stock

Incorrecto

Clientes

tbl_clientes

CLIENTE

TB_PRODUCTO

---

## Columnas

snake_case

Ejemplo

nombre

precio

fecha_creacion

fecha_actualizacion

usuario_creacion_id

---

## Claves Primarias

Siempre

id

Tipo

UUID

Ejemplo

id UUID PRIMARY KEY

---

## Claves Foráneas

Siempre

entidad_id

Ejemplo

cliente_id

producto_id

categoria_id

pedido_id

---

# 4. Campos Base

Todas las tablas tendrán obligatoriamente:

| Campo | Tipo |
|--------|------|
| id | UUID |
| created_at | TIMESTAMPTZ |
| updated_at | TIMESTAMPTZ |
| deleted_at | TIMESTAMPTZ NULL |
| created_by | UUID NULL |
| updated_by | UUID NULL |
| deleted_by | UUID NULL |
| version | INTEGER |

---

# 5. Soft Delete

Nunca eliminar físicamente registros.

Siempre utilizar:

deleted_at

deleted_by

---

# 6. Auditoría

Toda operación importante deberá generar un evento.

Ejemplo

INSERT

UPDATE

DELETE

LOGIN

EXPORT

IMPORT

PAYMENT

---

# 7. UUID

Todos los IDs serán UUID v7 cuando esté disponible.

Mientras tanto

UUID v4.

Nunca SERIAL.

Nunca BIGSERIAL.

---

# 8. Índices

Toda FK tendrá índice.

Ejemplo

cliente_id

producto_id

pedido_id

categoria_id

---

Además

Campos frecuentes

correo

sku

codigo

slug

estado

---

# 9. Convenciones para ENUM

Preferir tablas maestras cuando el catálogo pueda crecer.

Usar ENUM únicamente cuando el conjunto sea prácticamente inmutable.

Ejemplos válidos

estado_pago

estado_pedido

tipo_movimiento

---

# 10. Dinero

Nunca utilizar FLOAT.

Siempre

NUMERIC(12,2)

---

# 11. Cantidades

INTEGER

SMALLINT

NUMERIC

Según el caso.

Nunca FLOAT.

---

# 12. Fechas

Siempre

TIMESTAMP WITH TIME ZONE

Nunca TIMESTAMP sin zona.

---

# 13. Booleanos

BOOLEAN

Ejemplo

activo

destacado

principal

publicado

---

# 14. Imágenes

Nunca almacenar imágenes.

Solo

url

storage_key

mime_type

size

width

height

---

# 15. Archivos

Siempre guardar

nombre_original

storage_key

mime_type

extension

checksum

tamano

---

# 16. Estados

Toda entidad importante tendrá un estado.

Ejemplo

Borrador

Publicado

Archivado

Activo

Inactivo

Pendiente

Cancelado

---

# 17. Slugs

Toda entidad pública tendrá

slug

UNIQUE

Ejemplo

cardigan-heritage

coleccion-winter-2026

---

# 18. SEO

Toda entidad pública podrá tener

meta_title

meta_description

canonical_url

og_image

robots

---

# 19. Convenciones de Relaciones

Uno a Uno

PK = FK

Uno a Muchos

FK en la tabla hija

Muchos a Muchos

Tabla puente

---

# 20. Estrategia de Versionado

Las entidades críticas deberán soportar versionado.

Inicialmente

version INTEGER

Futuro

Historial completo

---

# 21. Convención para Auditoría

Todas las tablas críticas deberán registrar:

Quién creó

Quién modificó

Quién eliminó

Fecha

Versión

---

# 22. Convención para Eventos

Toda modificación importante publicará eventos de dominio.

Ejemplo

ProductoPublicado

PedidoCreado

PagoConfirmado

StockReducido

ClienteRegistrado

---

# 23. Organización del Esquema

Inicialmente

public

Futuro

iam

crm

catalog

inventory

orders

payments

shipping

cms

marketing

analytics

audit

configuration

---

# 24. Próxima Parte

La siguiente parte documentará completamente el dominio IAM.

Se definirán todas las tablas físicas, columnas, restricciones, índices, relaciones y convenciones para:

- usuarios
- roles
- permisos
- sesiones
- tokens
- auditoría de acceso

Cada tabla estará lista para implementarse directamente mediante migraciones PostgreSQL.