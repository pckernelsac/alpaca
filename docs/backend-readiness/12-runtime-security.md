# R7.0V — 12 — Runtime Security Validation

> **Fecha:** 2026-07-16 | **Entorno:** PostgreSQL 16.14 + Redis 7

---

## 1. ActorGuard (APP_GUARD global)

| Prueba | Resultado |
|--------|-----------|
| GET /users sin token | ✅ 401 |
| GET /orders sin token | ✅ 401 |
| POST /checkout sin token (customer) | ✅ 401 |
| POST /create-payment-intent sin token | ✅ 401 |
| GET /users con token staff | ✅ 200 |
| GET /orders con token staff | ✅ 200 |

## 2. @Public Endpoints

| Endpoint | Acceso sin token | Resultado |
|----------|-----------------|-----------|
| GET /products | Público | ✅ 200 |
| GET /categories | Público | ✅ 200 |
| GET /hero-slides | Público | ✅ 200 |
| GET /faq | Público | ✅ 200 |
| GET /testimonials | Público | ✅ 200 |
| GET /gallery | Público | ✅ 200 |
| GET /settings/company | Público | ✅ 200 |
| POST /contact | Público | ✅ 201 |
| POST /newsletter/subscribe | Público | ✅ 201 |
| POST /coupons/validate | Público | ✅ 200 |
| POST /stripe/webhook | Público | ✅ 200 (sin firma: 400) |

## 3. Rate Limiting (ThrottlerGuard)

| Perfil | Configuración | Verificado |
|--------|--------------|------------|
| short | 3 req / 1s | ✅ APP_GUARD activo |
| medium | 20 req / 10s | ✅ APP_GUARD activo |
| long | 100 req / 60s | ✅ APP_GUARD activo |
| Redis storage | RedisThrottlerStorage | ✅ Fail-open |
| Fail-open (Redis caído) | totalHits=1, sin bloqueo | ✅ Implementado |

## 4. Middleware de Seguridad

| Middleware | Estado |
|-----------|--------|
| Helmet (headers seguridad) | ✅ Instalado |
| Compression (gzip) | ✅ Instalado |
| CORS (3 orígenes: 5173, 3101, 3102) | ✅ Configurado |
| Graceful shutdown | ✅ enableShutdownHooks |

## 5. JWT Security

| Propiedad | Estado |
|-----------|--------|
| Firma HMAC SHA-256 | ✅ JWT_SECRET de env |
| Expiración | ✅ 24h staff, 7d customer |
| Type diferenciado | ✅ staff / customer |
| Bearer scheme | ✅ Authorization header |

## 6. Conclusión

| Criterio | Estado |
|----------|--------|
| ActorGuard bloquea sin token | ✅ PASS |
| @Public bypass funciona | ✅ PASS (11 endpoints) |
| Rate limiting configurado | ✅ PASS |
| Helmet + Compression + CORS | ✅ PASS |
| Graceful shutdown | ✅ PASS |
