# AUDITORÍA DE AUTENTICACIÓN Y SEGURIDAD — TIENDA

## Lógica y Componentes de Autenticación Customer

### 1. Flujo de Login y Registro
- **Customer Login (`POST /api/v1/auth/customer/login`)**:
  - Implementado en `src/pages/Login/Login.jsx`.
  - Invocación: `authRepository.login(email, password)`.
  - Credenciales Customer de Prueba (Seeds DB):
    - `camila.g@email.com` / `Cliente2024!`
    - `james.m@email.com` / `Cliente2024!`
- **Customer Registration (`POST /api/v1/auth/register`)**:
  - Implementado en `src/pages/Register/Register.jsx`.
  - Invocación: `authRepository.register(data)`.

### 2. Manejo de Tokens JWT y Persistencia
- **Storage**: Guardado en `localStorage` con la clave `alpacart_token` y el objeto usuario en `alpacart_user` mediante `src/services/storage/index.js`.
- **Axios Interceptor**: `@alpacart/shared-api-client` inyecta automáticamente el encabezado `Authorization: Bearer <token>` en cada request emitido si existe un token en storage.

### 3. Rutas Protegidas (`ProtectedRoute.jsx`)
Las siguientes rutas requieren autenticación obligatoria y redirigen a `/login` si no existe token:
- `/account` (Panel de Cuenta)
- `/addresses` (Gestión de Direcciones)
- `/wishlist` (Lista de Deseos)
- `/order/history` (Historial de Compras)
- `/settings` (Ajustes de Perfil)

### 4. Manejo de Errores de Autenticación
- **Token Ausente / 401 Unauthorized**: `client.js` captura las respuestas HTTP 401. A diferencia del Dashboard (que fuerza redirección inmediata), en la Tienda se permite la navegación anónima en catálogo y carrito (usando fallback local). Al intentar acceder a una ruta protegida o sincronizar el carrito, el sistema solicita credenciales de cliente.
- **Logout**: Limpia las claves de `localStorage` (`alpacart_token`, `alpacart_user`, `tienda_cart_synced`) y restablece el estado reactivo en `AuthContext`.
