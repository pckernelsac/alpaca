# Especificación Funcional

# Volumen V

# Parte IV

# Master Data (MDM)

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

El módulo Master Data (MDM) administra los catálogos maestros utilizados por todo el sistema.

Su propósito es garantizar la integridad, consistencia y reutilización de la información de referencia, evitando duplicidad y diferencias entre módulos.

---

# 2. Alcance

Administra:

- Países
- Departamentos
- Provincias
- Distritos
- Monedas
- Impuestos
- Unidades de Medida
- Métodos de Contacto
- Tipos de Documento
- Géneros
- Estados Civiles
- Tipos de Dirección

---

# 3. Actores

Administrador

Supervisor

Usuarios ERP con permisos de consulta.

---

# 4. Interfaces Funcionales

- Gestión de Catálogos
- Gestión Geográfica
- Gestión Tributaria
- Gestión de Unidades
- Gestión de Tipos

---

# 5. Funcionalidades

F-001 Consultar catálogos.

F-002 Registrar catálogo.

F-003 Editar catálogo.

F-004 Desactivar catálogo.

F-005 Consultar jerarquías geográficas.

F-006 Administrar monedas.

F-007 Administrar impuestos.

---

# 6. Reglas de Negocio

RN-MDM-001

Los datos maestros serán compartidos por todos los módulos.

RN-MDM-002

No podrán eliminarse registros utilizados por otros módulos.

RN-MDM-003

Las modificaciones deberán quedar auditadas.

RN-MDM-004

Los códigos deberán ser únicos.

RN-MDM-005

La jerarquía geográfica deberá respetarse:

País → Departamento → Provincia → Distrito.

---

# 7. Validaciones

- Código obligatorio.
- Nombre obligatorio.
- Código único.
- Estado válido.
- Relaciones válidas.

---

# 8. Estados

Activo

Inactivo

---

# 9. Flujo General

Consulta

↓

Validación

↓

Actualización

↓

Auditoría

↓

Disponibilidad para todos los módulos

---

# 10. Casos de Uso

CU-MDM-001 Consultar catálogo.

CU-MDM-002 Registrar catálogo.

CU-MDM-003 Actualizar catálogo.

CU-MDM-004 Desactivar catálogo.

CU-MDM-005 Consultar jerarquía geográfica.

---

# 11. APIs Relacionadas

GET /api/v1/master-data

GET /api/v1/master-data/{catalog}

POST /api/v1/master-data

PATCH /api/v1/master-data/{id}

DELETE /api/v1/master-data/{id}

---

# 12. Tablas

md_country

md_department

md_province

md_district

md_currency

md_tax

md_unit

md_document_type

---

# 13. Permisos

MASTER_DATA.READ

MASTER_DATA.CREATE

MASTER_DATA.UPDATE

MASTER_DATA.DELETE

---

# 14. Mensajes

Catálogo creado.

Catálogo actualizado.

Registro utilizado por otros módulos.

Código duplicado.

---

# 15. Criterios de Aceptación

- Los catálogos deberán estar disponibles para todos los módulos.
- No se permitirá eliminar información utilizada.
- Toda modificación será auditada.

---

# 16. Casos de Prueba

Consultar catálogo.

Registrar moneda.

Editar impuesto.

Intentar eliminar un país utilizado.

---

# 17. Dependencias

Consume

IAM

Audit

Produce

CRM

Catalog

Inventory

Shipping

Configuration

---

# 18. Observaciones

Master Data constituye la fuente única de datos maestros del ERP.

Ningún módulo deberá crear catálogos propios cuando exista uno equivalente en MDM.