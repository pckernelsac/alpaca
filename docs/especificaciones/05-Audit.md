# Especificación Funcional

# Volumen V

# Parte VI

# Audit

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

El módulo Audit registra todas las acciones relevantes realizadas dentro del sistema, garantizando trazabilidad, cumplimiento y soporte para investigaciones, revisiones y controles internos.

---

# 2. Alcance

Administra

- Inicio y cierre de sesión.
- Cambios en registros.
- Eliminaciones lógicas.
- Cambios de configuración.
- Acciones administrativas.
- Exportaciones.
- Errores críticos.

---

# 3. Actores

Administrador

Auditor

Supervisor

Sistema

---

# 4. Interfaces Funcionales

- Consulta de Auditoría.
- Filtros.
- Detalle del Evento.
- Exportación.

---

# 5. Funcionalidades

F-001 Registrar eventos.

F-002 Consultar eventos.

F-003 Filtrar auditorías.

F-004 Exportar auditorías.

F-005 Consultar detalle.

---

# 6. Reglas de Negocio

RN-AUD-001

Toda acción crítica deberá registrarse.

RN-AUD-002

Los registros de auditoría no podrán modificarse.

RN-AUD-003

Los registros no podrán eliminarse desde la aplicación.

RN-AUD-004

Cada registro deberá identificar usuario, fecha, IP y módulo.

---

# 7. Validaciones

- Usuario registrado.
- Evento válido.
- Fecha válida.

---

# 8. Estados

Los registros son inmutables.

---

# 9. Flujo General

Evento

↓

Registro

↓

Persistencia

↓

Consulta

---

# 10. Casos de Uso

Consultar auditoría.

Exportar auditoría.

Consultar detalle.

---

# 11. APIs

GET /api/v1/audit

GET /api/v1/audit/{id}

GET /api/v1/audit/export

---

# 12. Tablas

audit_log

audit_event

audit_export

---

# 13. Permisos

AUDIT.READ

AUDIT.EXPORT

---

# 14. Mensajes

Consulta realizada.

Exportación completada.

Evento no encontrado.

---

# 15. Criterios de Aceptación

Toda acción crítica deberá quedar registrada automáticamente.

---

# 16. Casos de Prueba

Consultar eventos.

Filtrar eventos.

Exportar registros.

---

# 17. Dependencias

Consume

IAM

Produce

Información para Analytics.

---

# 18. Observaciones

Audit es transversal y obligatorio para todos los módulos.