# CREACIÓN DE CLIENTES CRM (POST) — REAL API

## Integración del Formulario de Clientes (`/crm/clientes/nuevo`)

Se migró `ClientCreate.jsx` para procesar altas reales de clientes CRM contra `POST /api/v1/crm/clients`.

---

## Cambios Realizados

1. **Captura de Campos del Formulario**:
   - `name`, `company`, `email`, `phone`, `type`, `status`.

2. **Invocación al Repositorio**:
   - `crmRepository.createClient(payload)` transmite el payload al controlador NestJS.

3. **Respuesta y Redirección**:
   - Tras respuesta exitosa HTTP 201 Created, redirige a la vista `/crm/clientes`.
