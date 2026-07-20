# System Integration — Security

> **Verificación de seguridad**

---

## Backend

| Componente | Estado | Detalle |
|-----------|--------|---------|
| JWT Staff | ✅ | 24h exp, HMAC SHA-256, type: 'staff' |
| JWT Customer | ✅ | 7d exp, HMAC SHA-256, type: 'customer' |
| ActorGuard (APP_GUARD) | ✅ | Global, lee metadata @StaffOnly/@CustomerOnly/@Actor/@Public |
| ThrottlerGuard (APP_GUARD) | ✅ | 3 perfiles: 3/1s, 20/10s, 100/60s |
| Helmet | ✅ | Middleware de seguridad HTTP |
| CORS | ✅ | 3 orígenes: 5173, 3101, 3102 |
| Rate limiting | ✅ | RedisThrottlerStorage + fail-open |
| Webhook Stripe | ✅ | Firma HMAC + dedup + replay protection |
| Idempotency | ✅ | UNIQUE(customer_id, scope, idempotency_key) |
| ValidationPipe | ✅ | whitelist + transform |
| DTOs conectados | ⚠️ | 2/11 (LoginDto), resto pendiente |

## Frontend

| Componente | Estado | Detalle |
|-----------|--------|---------|
| ProtectedRoute | ✅ | 3 frontends con guards |
| 401 Interceptor | ✅ | ApiClient → removeToken → redirect /login |
| AuthContext | ✅ | 3 frontends con login/logout |
| localStorage JWT | ✅ | auth_token + auth_user |
| GuestRoute | ✅ | Redirect a / si autenticado |

## Conclusión

Seguridad: ✅ Aceptable para producción
