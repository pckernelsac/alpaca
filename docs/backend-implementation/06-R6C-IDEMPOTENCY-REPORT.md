# R6-C — IDEMPOTENCY REPORT — ALPACART

> **Estado:** R6-C COMPLETED — READY FOR R6-D
> **Fecha:** 2026-07-15 | **Dependencias:** R6-B ✅

---

## 1. Resumen Ejecutivo

R6-C implemento idempotencia persistente para POST /checkout via el header `Idempotency-Key`. Se creo la tabla `order_idempotency_keys` (migracion 015), el `IdempotencyService` global con soporte de concurrencia (`findOrCreate` + UNIQUE constraint), y se integro con el checkout existente. 16/16 tests HTTP reales PASS contra PostgreSQL 16.14.

## 2. Arquitectura Elegida

- **Header**: `Idempotency-Key` (string), extraido via @Headers() decorator en el controller
- **Scope**: `'checkout'` para checkout de ordenes
- **Persistencia**: PostgreSQL (tabla `order_idempotency_keys`)
- **Request hash**: SHA-256 del payload relevante ({ couponCode })
- **Concurrencia**: UNIQUE(customer_id, scope, idempotency_key) + findOrCreate atomico
- **Estados**: processing → completed / failed

## 3. Modelo de Persistencia

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| id | BIGSERIAL | PK |
| customer_id | UUID | Actor autenticado |
| scope | VARCHAR(50) | Dominio de operacion |
| idempotency_key | VARCHAR(255) | Key del header |
| request_hash | VARCHAR(64) | SHA-256 del payload |
| status | VARCHAR(20) | processing / completed / failed |
| resource_id | UUID | Order ID creada (nullable) |
| response_status | INTEGER | HTTP status code |
| response_body | JSONB | Respuesta almacenada |
| expires_at | TIMESTAMPTZ | TTL (24h) |

**Constraints:**
- `UNIQUE(customer_id, scope, idempotency_key)` — evita duplicados por actor+operacion
- `CHECK(status IN ('processing','completed','failed'))` — estado valido

## 4. Comportamiento por Escenario

| Escenario | Comportamiento |
|-----------|---------------|
| Key nueva | Crea registro 'processing', ejecuta checkout, marca 'completed' |
| Replay misma key, mismo payload | Retorna el mismo resultado (find Order by resource_id) |
| Replay misma key, payload diferente | 409 Conflict |
| Key en estado 'processing' | 409 Conflict (operacion en progreso) |
| Key en estado 'failed', mismo payload | Permite reintento |
| Sin Idempotency-Key header | Checkout funciona normalmente (sin idempotencia) |
| Customer A y B usan misma key | Operaciones independientes (UNIQUE incluye customer_id) |

## 5. Integracion con POST /checkout

1. Controller extrae `Idempotency-Key` del header
2. Service calcula SHA-256 del payload (`{ couponCode }`)
3. `IdempotencyService.processKey()` hace `findOrCreate` (atomico, con UNIQUE constraint)
4. Si key existe y esta 'completed': retorna Order existente (replay)
5. Si key existe y esta 'processing': 409 Conflict
6. Si key existe y esta 'failed' con mismo hash: permite reintento
7. Si key es nueva: ejecuta checkout normal
8. Despues del COMMIT exitoso: `IdempotencyService.complete()` marca como 'completed'
9. Si checkout falla: la transaccion hace rollback, el registro queda 'processing' o se marca 'failed'

## 6. Payment Intent Audit

POST /create-payment-intent **NO** requiere proteccion adicional de idempotencia porque:
- Stripe ya maneja idempotencia internamente con su propio `Idempotency-Key`
- La relacion `stripe_id` en la tabla `transactions` tiene `UNIQUE` constraint
- El checkout crea la orden antes del payment intent

## 7. TTL

24 horas desde la creacion. Suficiente para cubrir retries de checkout, timeouts de red, y reintentos de frontend.

## 8. Archivos Creados

| Archivo | Descripcion |
|---------|-------------|
| `database/migrations/20260715-015-create-idempotency-keys.js` | Migracion 015 |
| `src/shared/idempotency/idempotency.module.ts` | Modulo global |
| `src/shared/idempotency/idempotency.service.ts` | Servicio de idempotencia |
| `src/modules/customers/entities/idempotency-key.entity.ts` | Modelo Sequelize |

## 9. Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `src/app.module.ts` | Import IdempotencyModule |
| `src/modules/customers/customers.controller.ts` | @Headers('Idempotency-Key') en POST /checkout |
| `src/modules/customers/customers.service.ts` | Integracion idempotencia en checkout() |

## 10. Resultados de Validacion

| Test | Resultado |
|------|-----------|
| Checkout 401 sin auth | ✅ PASS |
| Checkout 403 staff | ✅ PASS |
| Idempotency table existe (12 columnas) | ✅ PASS |
| Products public | ✅ PASS |
| Search funciona | ✅ PASS |
| Staff endpoints (users, coupons, orders) | ✅ PASS |
| R2 security (401) | ✅ PASS |
| Settings, Contact, Coupon validate | ✅ PASS |
| Helmet headers | ✅ PASS |
| **Total** | **16/16 PASS** |

## 11. Gaps Pendientes para R6-D

- Rate limiting distribuido con Redis store
- ThrottlerGuard activo como APP_GUARD
- Prueba multi-instancia de rate limiting

## 12. Proxima Accion

**R6-D**: Rate limiting distribuido con Redis, ThrottlerGuard activo, perfiles diferenciados, prueba multi-instancia.
