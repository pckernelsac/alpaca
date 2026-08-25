# R6-D — RATE LIMITING REPORT — ALPACART

> **Estado:** R6-D COMPLETED
> **Fecha:** 2026-07-16 | **Dependencias:** R6-C ✅

---

## 1. Resumen Ejecutivo

R6-D implementa rate limiting distribuido usando Redis como backend de almacenamiento para ThrottlerModule. Se configuraron 3 perfiles con límites diferenciados (short/medium/long), se registró ThrottlerGuard como APP_GUARD global, y se implementó `RedisThrottlerStorage` con fail-open para tolerancia a fallos de Redis. Los contadores son atómicos vía `INCR` + `PEXPIRE` de Redis.

## 2. Arquitectura

```
Cliente → ThrottlerGuard (APP_GUARD) → RedisThrottlerStorage → Redis (ioredis)
         ↓ fail-open si Redis caído
         Permite solicitud (totalHits=1, sin bloqueo)
```

### Componentes

| Componente | Archivo | Propósito |
|------------|---------|-----------|
| ThrottlerModule.forRootAsync | `app.module.ts` | Configura los 3 throttlers con RedisStorage |
| RedisThrottlerStorage | `shared/redis/redis-throttler-storage.ts` | Implementa `incr`+`pexpire` sobre Redis |
| RedisService | `shared/redis/redis.service.ts` | Cliente ioredis con reconexión y lazyConnect |
| ThrottlerGuard | `@nestjs/throttler` | Guard global que consulta el storage por cada request |

## 3. Perfiles de Rate Limiting

| Perfil | TTL | Límite | Uso típico | Clave Redis |
|--------|-----|--------|------------|-------------|
| short | 1s | 3 | Login, registro, contacto | `alpacart:ratelimit:short:{key}` |
| medium | 10s | 20 | Checkout, creación de recursos | `alpacart:ratelimit:medium:{key}` |
| long | 60s | 100 | Lectura general (GET) | `alpacart:ratelimit:long:{key}` |

### Algoritmo de throttling

1. Redis `INCR` en clave `alpacart:ratelimit:{name}:{ip|user}`
2. Si hits === 1: `PEXPIRE` con TTL en ms
3. Si hits > limit: se bloquea la request
4. Si Redis falla: retorna `{ totalHits: 1 }` (no bloquea)

## 4. RedisThrottlerStorage

```typescript
// shared/redis/redis-throttler-storage.ts
async increment(key, ttl, limit, blockDuration, throttlerName) {
  const redisKey = `alpacart:ratelimit:${key}`;
  const hits = await redis.incr(redisKey);
  if (hits === 1) await redis.pexpire(redisKey, ttl);
  const pttl = await redis.pttl(redisKey);
  return {
    totalHits: hits,
    timeToExpire: pttl > 0 ? ceil(pttl/1000) : ceil(ttl/1000),
    isBlocked: hits > limit,
    timeToBlockExpire: hits > limit ? timeToExpire : 0,
  };
}
```

## 5. Fail-Open Strategy

| Escenario | Comportamiento |
|-----------|---------------|
| Redis disponible | Rate limiting normal |
| Redis caído (conexión) | RedisService retorna `isConnected=false` |
| Redis caído (comando) | Catch silencioso → `totalHits: 1, isBlocked: false` |
| Redis reconecta | RedisService retryStrategy hasta 10 intentos |

## 6. Integración con APP_GUARD

```typescript
// app.module.ts — Providers
{ provide: APP_GUARD, useClass: ActorGuard },      // R2
{ provide: APP_GUARD, useClass: ThrottlerGuard },   // R6-D
```

Ambos guards coexisten: ActorGuard se evalúa primero (auth), luego ThrottlerGuard (rate).

## 7. Dependencias

| Paquete | Versión | Uso |
|---------|---------|-----|
| @nestjs/throttler | 6.x | ThrottlerModule + ThrottlerGuard |
| ioredis | 5.x | Cliente Redis para storage |

## 8. Diferencias vs Diseño Original

| Aspecto | Plan Original | Implementado |
|---------|--------------|--------------|
| Storage | Redis | ✅ RedisThrottlerStorage |
| Perfiles | No definidos | ✅ short/medium/long |
| Fail-open | No especificado | ✅ Fail-open completo |
| Decoradores por endpoint | @Throttle() opcional | ✅ No requiere decoración (APP_GUARD) |
| Claves | No especificado | ✅ Prefijo `alpacart:ratelimit:` |

## 9. Pendiente

- Los decoradores `@Throttle({ defaults: { limit: 5, ttl: 60000 } })` no se han aplicado aún a endpoints específicos que requieran límites personalizados
