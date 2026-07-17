# R7.1A — Error Handling

> **Structured error architecture**

---

## Error Classes (`@alpacart/shared-api-client`)

| Class | When | Properties |
|-------|------|-----------|
| `ApiError` | HTTP 4xx/5xx response | `.status`, `.message`, `.details` |
| `NetworkError` | No response (network failure) | `.message` |
| `ValidationError` | HTTP 400 with field errors | `.errors` (array of strings) |

## Error Mapping (`mapHttpError`)

| HTTP Status | Error Class | Message |
|-------------|-------------|---------|
| 400 | `ValidationError` | From response body |
| 401 | `ApiError(401)` | "Sesión expirada. Inicia sesión nuevamente." |
| 403 | `ApiError(403)` | "No tienes permisos para esta acción." |
| 404 | `ApiError(404)` | "Recurso no encontrado." |
| 409 | `ApiError(409)` | From response body |
| 429 | `ApiError(429)` | "Demasiadas solicitudes. Intenta más tarde." |
| Other | `ApiError(status)` | "Error del servidor" |

## Usage in Hooks

```jsx
function MyComponent() {
  const { data, loading, error, fetch } = useHero();

  if (loading) return <Spinner />;
  if (error) {
    if (error.name === 'NetworkError') return <OfflineBanner />;
    return <Alert type="error">{error.message}</Alert>;
  }
  return <HeroSlider slides={data} />;
}
```
