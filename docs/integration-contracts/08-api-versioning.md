# ICC-01 — Integration Contract Certification
# API Versioning — ALPACART

> **Certificación del contrato base /api/v1**

---

## 1. Estado Actual

### Backend
```typescript
// app.controller.ts — Global prefix
@Controller('api/v1')
// Todos los controladores se mapean bajo /api/v1/
```

**NestJS global prefix configurado en bootstrap:**
```typescript
app.setGlobalPrefix('api/v1');
```

**Backend escucha en:** `http://localhost:8000`
**API completa:** `http://localhost:8000/api/v1/{resource}`

### Frontend Base URLs (Actual)

| Frontend | .env VITE_API_URL | Correcto para /api/v1 |
|----------|------------------|----------------------|
| Institucional | `http://localhost:8000/api` | ❌ **Falta /v1** |
| Tienda | `http://localhost:8000/api/tienda` | ❌ **Path incorrecto** |
| Dashboard | `http://localhost:8000/api/dashboard` | ❌ **Path incorrecto** |

---

## 2. Contrato Definido

### Única variable para los 3 frontends:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Comportamiento esperado:
```typescript
// En cualquier frontend:
const API = import.meta.env.VITE_API_URL; // "http://localhost:8000/api/v1"

// Llamadas:
GET  ${API}/products
POST ${API}/auth/login
POST ${API}/checkout
GET  ${API}/orders
```

---

## 3. Plan de Unificación

| Paso | Acción | Frontend |
|------|--------|----------|
| 1 | Cambiar `.env.development` y `.env.production` a `http://localhost:8000/api/v1` | Institucional |
| 2 | Cambiar `.env.development` y `.env.production` a `http://localhost:8000/api/v1` | Tienda |
| 3 | Cambiar `.env.development` y `.env.production` a `http://localhost:8000/api/v1` | Dashboard |
| 4 | Verificar que `services/api/axios.js` use `VITE_API_URL` correctamente | Todos |

### Verificación:
```typescript
// En services/api/axios.js de cada FE:
const api = axios.create({
  baseURL: VITE_API_URL,  // debe ser "http://localhost:8000/api/v1"
  timeout: 15000,
});
```

---

## 4. Progreso

| Frontend | VITE_API_URL actual | Debe ser | Estado |
|----------|-------------------|----------|--------|
| Institucional | `http://localhost:8000/api` | `http://localhost:8000/api/v1` | ❌ PENDIENTE |
| Tienda | `http://localhost:8000/api/tienda` | `http://localhost:8000/api/v1` | ❌ PENDIENTE |
| Dashboard | `http://localhost:8000/api/dashboard` | `http://localhost:8000/api/v1` | ❌ PENDIENTE |

**API Versioning Score:** **0/100** (no implementado en ningún frontend)
**Impacto:** P1 — debe resolverse antes de cualquier integración
