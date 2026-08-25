# AUTENTICACIÓN REAL Y SEGURIDAD — DASHBOARD

## Verificación del Flujo JWT Real

---

## Componentes y Endpoints Involucrados

1. **Eliminación del Preview Mode**:
   - `VITE_DASHBOARD_PREVIEW=false` en `.env.development`.
   - Removido `PreviewProvider.jsx` de `AppProvider.jsx`.

2. **Login de Staff (`POST /api/v1/auth/login`)**:
   - `Login.jsx` envía credenciales reales (`email`, `password`) a la API NestJS.
   - El backend devuelve un token JWT firmado (`accessToken`) y los datos del usuario Staff.

3. **Inyección de Header Bearer**:
   - `createApiClient` de `@alpacart/shared-api-client` lee `localStorage.getItem('alpacart_token')` e inyecta `Authorization: Bearer <token>` en todas las peticiones posteriores.

4. **Validación de Perfil (`GET /api/v1/auth/me`)**:
   - Permite verificar la validez y expiración del JWT en la base de datos PostgreSQL.

5. **Protección de Rutas (`ProtectedRoute.jsx`)**:
   - Si no existe token válido, bloquea el acceso a `/` o `/catalog/productos` y redirige a `/login`.
