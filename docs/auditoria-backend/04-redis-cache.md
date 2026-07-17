# 04 — Redis & Caché

## Objetivo
Analizar el uso de Redis en el backend: servicio de caché, rate limiting, key namespace, TTLs y fallback behavior.

## Alcance
- `src/shared/redis/redis.service.ts`
- `src/shared/redis/redis-throttler-storage.ts`
- `src/modules/catalog/catalog.service.ts`
- `src/app.module.ts`

## Estado actual
Redis se utiliza para 2 propósitos: (1) caché cache-aside en el catálogo de productos, (2) almacenamiento del throttler de rate limiting. No se usa para sesiones, colas ni pub/sub. Redis es opcional: la app funciona sin Redis con fallback silencioso.

## Evidencias encontradas

### RedisService (`src/shared/redis/redis.service.ts`)
- Conexión lazy (`lazyConnect: true`)
- Retry strategy: hasta 10 reintentos con backoff exponencial (200ms → 3000ms)
- `maxRetriesPerRequest: 3`
- Fallback silencioso: todos los métodos (`get`, `set`, `del`, `incr`, `expire`, `ttl`) retornan `null`/`0`/`-2` si `isConnected === false`
- Errores capturados con `catch` vacío o logging
- Tiene `onModuleDestroy` para desconexión graceful

### RedisThrottlerStorage (`src/shared/redis/redis-throttler-storage.ts`)
- Namespace: `alpacart:ratelimit:${key}`
- Usa `INCR` + `PEXPIRE` atómico
- 3 throttlers configurados en AppModule:
  - `short`: 1s TTL, 3 requests
  - `medium`: 10s TTL, 20 requests
  - `long`: 60s TTL, 100 requests
- Fallback: si Redis falla, retorna `{ totalHits: 1, timeToExpire, isBlocked: false }` — permite el request

### CatalogService Cache-Aside Pattern (`src/modules/catalog/catalog.service.ts`)
```typescript
const CACHE_TTL = 300; // 5 minutes
const cacheKey = (key: string) => `alpacart:dev:catalog:${key}`;
```

Patrón implementado:
1. **findAllProducts**: busca key `alpacart:dev:catalog:products:${JSON.stringify(query)}`
   - Cache hit → retorna JSON.parse
   - Cache miss → query a PostgreSQL, almacena en Redis con TTL 300s
2. **findProductById**: busca key `alpacart:dev:catalog:product:${id}`
   - Mismo patrón cache-aside
3. **Invalidación**: create/update/delete de producto elimina `product:${id}` y `products:*`

### ThrottlerModule Configuración (`src/app.module.ts`)
```typescript
ThrottlerModule.forRootAsync({
  imports: [RedisModule],
  inject: [RedisService],
  useFactory: (redis: RedisService) => ({
    throttlers: [
      { name: 'short', ttl: 1000, limit: 3 },
      { name: 'medium', ttl: 10000, limit: 20 },
      { name: 'long', ttl: 60000, limit: 100 },
    ],
    storage: new RedisThrottlerStorage(redis),
  }),
}),
```

### RedisModule (`src/shared/redis/redis.module.ts`)
- Decorado con `@Global()` — disponible en toda la app sin importar

### Configuración (.env)
```env
REDIS_HOST=localhost
REDIS_PORT=6379
```
Redis es opcional: `REDIS_HOST` tiene default `localhost`, no hay validación obligatoria.

## Hallazgos
1. **F1**: Cache-aside implementado correctamente con invalidación en escritura.
2. **F2**: TTL de 5 minutos razonable para un catálogo de productos.
3. **F3**: Fallback silencioso robusto — la app funciona sin Redis.
4. **F4**: Rate limiting con 3 niveles de throttling.
5. **F5**: Namespace inconsistente: `alpacart:dev:catalog:` (cache) vs `alpacart:ratelimit:` (throttler).
6. **F6**: Cache solo implementado en catálogo — otros módulos no usan Redis.

## Riesgos
- **R1**: La invalidación de cache con `products:*` usa patrón de glob, que en Redis con muchos keys puede ser lento. Mejor usar un set de keys o versionado.
- **R2**: Sin Redis, el rate limiting usa fallback que permite todos los requests — riesgo en producción si Redis cae.

## Recomendaciones
1. Unificar namespace: usar `alpacart:cache:` en lugar de `alpacart:dev:catalog:`.
2. Extender cache-aside a otros módulos (CMS, textile, marketing).
3. Considerar usar `SCAN` en lugar de `DEL products:*` para invalidation.

## Acciones Prioridad P0
- Ninguna — el sistema de cache funciona correctamente.

## Acciones Prioridad P1
- Unificar key namespace entre cache y throttler.
- Cambiar invalidación glob por estrategia más eficiente.

## Acciones Prioridad P2
- Extender caché a más módulos.

## Score
**8.0 / 10**

## Estado: APROBADO CON OBSERVACIONES
