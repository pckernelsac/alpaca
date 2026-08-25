# CREACIÓN DE USUARIOS IAM (POST) — REAL API

## Integración del Formulario de Usuarios (`/usuarios/nuevo`)

Se migró `UserCreate.jsx` para procesar altas reales de usuarios Staff contra `POST /api/v1/users`.

---

## Cambios Realizados

1. **Captura de Campos del Formulario**:
   - `name`, `email`, `phone`, `role`, `password`, `status`.

2. **Invocación al Repositorio**:
   - `iamRepository.createUser(payload)` genera la cuenta en la tabla `users` de PostgreSQL.

3. **Respuesta y Redirección**:
   - Al completar la creación HTTP 201 Created, redirige al listado `/usuarios`.
