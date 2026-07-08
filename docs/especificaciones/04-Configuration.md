# Especificación Funcional

# Volumen V

# Parte V

# Configuration (CFG)

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

El módulo Configuration administra toda la configuración funcional y operativa del sistema.

Centraliza parámetros generales evitando configuraciones duplicadas entre módulos.

---

# 2. Alcance

Administra

- Información de la empresa.
- Redes sociales.
- Correos.
- Parámetros generales.
- Configuración del sistema.
- Parámetros de ventas.
- Parámetros de inventario.
- Configuración del checkout.
- Configuración de Stripe.
- Configuración de envíos.

---

# 3. Actores

Administrador.

Supervisor.

Usuarios con permisos de configuración.

---

# 4. Interfaces Funcionales

Configuración General.

Empresa.

Ventas.

Inventario.

Pagos.

Envíos.

Sistema.

---

# 5. Funcionalidades

F-001 Consultar configuración.

F-002 Actualizar configuración.

F-003 Configurar empresa.

F-004 Configurar Stripe.

F-005 Configurar impuestos.

F-006 Configurar correos.

F-007 Configurar redes sociales.

F-008 Configurar parámetros del ERP.

---

# 6. Reglas de Negocio

RN-CFG-001

Toda configuración tendrá historial.

RN-CFG-002

Solo administradores podrán modificar configuraciones críticas.

RN-CFG-003

Los cambios deberán registrarse en Audit.

RN-CFG-004

La configuración deberá cargarse al iniciar el sistema.

RN-CFG-005

No podrán existir parámetros duplicados.

---

# 7. Validaciones

- Clave obligatoria.
- Valor obligatorio.
- Clave única.
- Tipo válido.
- Usuario autorizado.

---

# 8. Estados

Activo

Inactivo

---

# 9. Flujo General

Configuración

↓

Validación

↓

Guardar

↓

Auditoría

↓

Disponible para todos los módulos

---

# 10. Casos de Uso

CU-CFG-001 Consultar configuración.

CU-CFG-002 Actualizar configuración.

CU-CFG-003 Configurar empresa.

CU-CFG-004 Configurar Stripe.

CU-CFG-005 Configurar parámetros del sistema.

---

# 11. APIs Relacionadas

GET /api/v1/configuration

PATCH /api/v1/configuration

GET /api/v1/company

PATCH /api/v1/company

---

# 12. Tablas

cfg_parameter

cfg_company

cfg_social_network

cfg_email

cfg_payment

cfg_shipping

audit_log

---

# 13. Permisos

CONFIG.READ

CONFIG.UPDATE

CONFIG.COMPANY

CONFIG.SYSTEM

---

# 14. Mensajes

Configuración actualizada.

Empresa actualizada.

Parámetro inválido.

Configuración no encontrada.

---

# 15. Criterios de Aceptación

- Toda configuración deberá persistirse.
- Toda modificación deberá auditarse.
- El sistema deberá utilizar la configuración actual sin reinicio cuando sea posible.

---

# 16. Casos de Prueba

Actualizar configuración.

Modificar empresa.

Configurar Stripe.

Actualizar correo institucional.

Intentar modificar configuración sin permisos.

---

# 17. Dependencias

Consume

IAM

Audit

Master Data

Produce

Todos los módulos del ERP.

---

# 18. Observaciones

Configuration es un módulo transversal.

Todos los parámetros globales deberán obtenerse desde este módulo.

No se permitirá almacenar configuraciones duplicadas dentro de otros dominios.