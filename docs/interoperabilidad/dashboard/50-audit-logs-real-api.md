# INTEGRACIÓN DE LOGS DE AUDITORÍA — REAL API

## Migración de Auditoría (`/audit`)

Se migró `AuditLog.jsx` para consumir el endpoint real NestJS `GET /api/v1/audit/logs`.

---

## Cambios Realizados

1. **Eliminación de Logs Hardcodeados**:
   - Se removieron los eventos fijos de prueba.

2. **Renderizado de Trazabilidad Real**:
   - Muestra usuario ejecutor, fecha y hora exacta, módulo ERP afectado, acción realizada, dirección IP y nivel de severidad registrados en la base de datos PostgreSQL.
