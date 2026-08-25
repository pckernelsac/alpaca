# AUDITORÍA DE AUTENTICACIÓN Y SEGURIDAD — DASHBOARD

## Lógica y Componentes de Autenticación

### 1. Mecanismos Implementados
- **Staff Login Real**:
  - `authRepository.login(email, password)` efectúa un `POST` a `/api/v1/auth/login`.
  - Credenciales Staff Sembradas (Seeds DB):
    - Super Admin: `mateo.q@alpacart.com` / `Admin123!`
    - Super Admin: `sofia.m@alpacart.com` / `Admin123!`
    - Analista Financiero: `r.paredes@alpacart.com` / `Admin123!`
- **Persistencia de Sesión**:
  - `src/services/auth/index.js` gestiona `localStorage` con las claves `alpacart_token` y `alpacart_user`.
- **Rutas Protegidas (`ProtectedRoute.jsx`)**:
  - Verifica la propiedad `isAuthenticated` proveída por `AuthContext.jsx`. Si no está autenticado, redirige a `/login`.

---

## Hallazgo Crítico: Autenticación Simulada (Preview Mode)

### `src/preview/PreviewProvider.jsx`
En `.env.development` la variable `VITE_DASHBOARD_PREVIEW` está configurada como `true`.
Esto activa `PreviewProvider`, el cual inyecta automáticamente en el inicio de la app un usuario ficticio:

```js
login('preview_token', {
  name: 'Admin Preview',
  email: 'preview@alpacart.com',
  role: 'Super Administrador',
});
```

### Impacto
1. **Bypass del Login**: Al cargar cualquier ruta del Dashboard en desarrollo, el usuario es autenticado sin ingresar credenciales y sin consultar la API real de autenticación.
2. **Tokens Falsos**: Las peticiones de axios (si se ejecutaran) enviarían `Authorization: Bearer preview_token`, lo cual generaría un error `401 Unauthorized` inmediato en el backend NestJS (que valida JWT firmados con `JWT_SECRET`).
