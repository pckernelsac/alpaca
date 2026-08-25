# MIGRACIÓN DE USUARIOS E IAM — REAL API

## Integración del Módulo de Usuarios IAM (`/usuarios`)

Se migró la vista `UserList.jsx` para consumir el endpoint real de la API NestJS `GET /api/v1/users`.

---

## Cambios Realizados

1. **Eliminación de Mocks**:
   - Se removió el arreglo estático `users` de 5 colaboradores ficticios.

2. **Integración con Zustand Store (`useUsersStore`)**:
   - `UserList.jsx` consume `users`, `meta`, `loading`, `error` y `fetchAll` desde `useUsersStore`.
   - Soporta búsqueda reactiva `q` y paginación.

3. **Mappers y Modelos de Dominio**:
   - `iamRepository.getUsers` ejecuta `mapUsers`, transformando la respuesta en modelos de dominio `createUser`.

4. **Estados de UI Implementados**:
   - **Loading**: Spinner de estado activo.
   - **Error**: Manejo de errores de conexión HTTP.
   - **Empty State**: Indicador claro cuando la tabla de usuarios no arroja registros.
   - **Success Table**: Lista de usuarios Staff con avatares iniciales, roles, teléfonos y estado activo/inactivo.
