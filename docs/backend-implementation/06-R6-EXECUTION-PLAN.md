# R6 — EXECUTION PLAN — ALPACART

> **Estado:** R6-A COMPLETED — READY FOR R6-B
> **Fecha:** 2026-07-15 | **Dependencias:** R1 ✅, R2 ✅, R3 ✅, R4 ✅, R5 ✅

---

## 1. Estado Inicial

| Fase | Estado |
|------|--------|
| R1 | VALIDATED |
| R2 | VALIDATED |
| R3 | VALIDATED |
| R4 | VALIDATED |
| R5 | VALIDATED |
| R6 (pre-audit) | NOT STARTED |

## 2. Fuentes Inspeccionadas

- `src/modules/customers/customers.service.ts` / `customers.controller.ts`
- `src/modules/inventory/inventory.service.ts` / `inventory.controller.ts`
- `src/modules/orders/orders.service.ts` / `orders.controller.ts`
- `src/modules/marketing/marketing.service.ts` / `marketing.controller.ts`
- `src/modules/payments/payments.service.ts` / `payments.controller.ts` / `stripe.service.ts`
- `src/app.module.ts`
- `src/modules/auth/auth.service.ts`
- Entity files for Cart, CartItem, Order, OrderItem, OrderEvent, StockItem, StockMovement, Coupon, Transaction
- Migration files (001-014)
- Seed files (001-007)

## 3. Flujo Actual de Compra

| Etapa | Endpoint | Service | Modelo/Tabla | Estado | Gap |
|-------|----------|---------|--------------|--------|-----|
| Cart GET | GET /cart | CustomersService.getCart | Cart + CartItem | COMPLETE | — |
| Cart ADD | POST /cart/items | CustomersService.addCartItem | CartItem | COMPLETE | — |
| Cart UPDATE | PATCH /cart/items/:id | CustomersService.updateCartItem | CartItem | COMPLETE | — |
| Cart REMOVE | DELETE /cart/items/:id | CustomersService.removeCartItem | CartItem | COMPLETE | — |
| Cart CLEAR | DELETE /cart | CustomersService.clearCart | CartItem | COMPLETE | — |
| **Checkout** | **MISSING** | **MISSING** | — | **MISSING** | **No endpoint que consolide cart→order** |
| Order CREATE | POST /orders | OrdersService.create | Order | **PARTIAL** | No crea OrderItems, no usa cart |
| OrderItems CREATE | — | — | OrderItem | **MISSING** | OrderItems nunca se persisten |
| Stock CHECK | — | — | StockItem | **MISSING** | No se verifica stock disponible |
| Stock RESERVATION | — | — | StockItem.reserved | **MISSING** | reserved nunca se modifica |
| Coupon VALIDATE | POST /coupons/validate | MarketingService.validateCoupon | Coupon | COMPLETE | Solo validacion, no consumo |
| Coupon CONSUME | — | — | Coupon.usedCount | **MISSING** | usedCount nunca se incrementa |
| Payment INTENT | POST /create-payment-intent | PaymentsService.createPaymentIntent | Transaction | COMPLETE | Stripe integration OK |
| Payment WEBHOOK | POST /stripe/webhook | PaymentsService.handleWebhookEvent | Transaction | **PARTIAL** | Sin dedup ni replay protection |
| Idempotency | — | — | — | **MISSING** | Sin idempotency keys |
| ThrottlerGuard | — | — | — | **UNSAFE** | Configurado pero no activo |

## 4. Gaps Encontrados

| ID | Dominio | Descripcion | Severidad | Bloque R6 |
|----|---------|-------------|-----------|-----------|
| GAP-01 | Checkout | No existe POST /checkout que consolide cart→order | P0 | R6-B |
| GAP-02 | OrderItems | OrderItems no se persisten al crear orden | P0 | R6-B |
| GAP-03 | Transaccion | Order creation sin transaccion PostgreSQL | P1 | R6-B |
| GAP-04 | Stock | No se verifica stock disponible ni se reserva | P1 | R6-B |
| GAP-05 | Overselling | Sin SELECT FOR UPDATE ni lock de fila | P1 | R6-B |
| GAP-06 | Coupon | usedCount nunca se incrementa | P1 | R6-B |
| GAP-07 | Idempotencia | Sin idempotency keys en orders/payments | ✅ RESUELTO R6-C | R6-C |
| GAP-08 | Rate limiting | ThrottlerGuard no activo como APP_GUARD | P2 | R6-D |
| GAP-09 | Rate limiting | Sin Redis store para multi-instancia | P2 | R6-D |
| GAP-10 | Webhook | Sin deduplicacion por event_id | P1 | R6-E |
| GAP-11 | Webhook | Sin replay protection | P2 | R6-E |

## 5. Invariantes

| ID | Invariante |
|----|-----------|
| INV-01 | El stock fisico (`quantity`) nunca puede quedar negativo |
| INV-02 | El stock reservado (`reserved`) nunca puede exceder el stock fisico (`quantity`) |
| INV-03 | Una misma operacion idempotente no puede crear dos ordenes |
| INV-04 | Un checkout fallido no debe dejar una orden parcial ni stock inconsistente |
| INV-05 | Los precios finales se calculan exclusivamente en backend desde la DB |
| INV-06 | Redis no es source of truth del stock — PostgreSQL siempre lo es |
| INV-07 | Un webhook duplicado no puede aplicar dos veces el mismo efecto |
| INV-08 | Una firma de webhook invalida debe rechazarse (ya implementado) |
| INV-09 | El cupon `used_count` debe incrementarse atomicamente |
| INV-10 | Dos instancias del backend deben compartir el estado del rate limiter |

## 6. Modelo Actual de Stock

```
stock_items {
  id: INTEGER (PK)
  productId: UUID (nullable, FK → products)
  variantId: UUID (nullable, FK → product_variants)
  warehouseId: INTEGER (FK → warehouses)
  quantity: INTEGER (default 0)           ← stock fisico on-hand
  reserved: INTEGER (default 0)           ← stock reservado
  minStock: INTEGER (default 0)
  maxStock: INTEGER (default 0)
  lastMovementAt: DATE (nullable)
  created_at, updated_at
}
```

**CHECK constraints (R1):** `quantity >= 0`, `reserved >= 0 AND reserved <= quantity`

**Decision arquitectonica:** `stock_reservations` table fue DEFERRED TO R5 y posteriormente se decidio que el modelo actual es suficiente para R6.

## 7. Modelo Actual de Ordenes

```
orders {
  id: UUID (PK)
  orderNumber: STRING(30) UNIQUE
  customerId: UUID (nullable)
  clientId: UUID (nullable)
  userId: UUID (nullable)
  status: STRING(30) default 'pending'    ← con CHECK constraint (9 valores)
  subtotal, tax, shippingFee, discount, total: DECIMAL
  paid: BOOLEAN default false
  paidAt, notes, placedAt, couponId
  created_at, updated_at
}
```

**State machine:** `pending → confirmed → paid → preparing → shipped → in_transit → delivered → returned` (+ `cancelled` desde pending/confirmed/paid)

## 8. Estado de Checkout

**NO EXISTE.** No hay endpoint que lea el carrito, valide stock, cree la orden, los items, descuente reservas, ni inicie el pago. El carrito y la orden son dos mundos separados.

## 9. Estado de Idempotencia

**NO EXISTE.** Sin `Idempotency-Key` header, sin tabla de idempotencia, sin unique constraints que prevengan duplicados semanticos.

## 10. Estado del Rate Limiting

`ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 60 }] })` configurado en app.module.ts pero `ThrottlerGuard` NO esta registrado como `APP_GUARD` ni aplicado a ningun controlador. Almacen: memoria local. No es distribuido.

## 11. Estado de Pagos y Webhooks

Stripe integrado via StripeService. Webhook con verificacion de firma (constructEvent). Sin deduplicacion por event_id. Sin replay protection.

## 12. Riesgos

| ID | Riesgo | Probabilidad | Impacto |
|----|--------|-------------|---------|
| R01 | Overselling si no se usa SELECT FOR UPDATE en checkout concurrente | Alta | Alto |
| R02 | Duplicacion de orden si no hay idempotency key | Media | Alto |
| R03 | Webhook duplicado procesa pago dos veces | Media | Alto |
| R04 | Cupon agotado si usedCount no se incrementa atomicamente | Baja | Medio |
| R05 | Rate limiting inefectivo sin ThrottlerGuard activo | Alta | Medio |

## 13. Cambios Requeridos — R6-B (Checkout, Stock, Orders)

1. **POST /checkout**: nuevo endpoint en CustomersController que:
   - Lee carrito del customer autenticado (req.user.id)
   - Valida stock disponible para cada item
   - Valida cupon si aplica
   - Calcula totales desde backend (no confia en datos del frontend)
   - Inicia transaccion PostgreSQL
   - Dentro de la transaccion:
     a. SELECT ... FOR UPDATE sobre stock_items
     b. Verifica quantity - reserved >= requested_qty
     c. UPDATE stock_items SET reserved = reserved + qty
     d. Crea Order con estado 'pending'
     e. Crea OrderItems con snapshot de precios
     f. Crea OrderEvent 'created'
     g. Si hay cupon: UPDATE used_count = used_count + 1
   - Limpia el carrito (DELETE cart_items)
   - Retorna la orden + payment intent (Stripe)

2. **Fix POST /orders existente**: No es necesario si /checkout reemplaza la funcionalidad.

3. **Validacion DTO**: Crear CheckoutDto con campos necesarios (couponCode, shippingAddress, etc.)

4. **Transaccion**: Usar `sequelize.transaction()` con isolation level READ COMMITTED.

5. **Lock orden deterministico**: Siempre lockear stock_items por id ascendente para evitar deadlocks.

## 14. Cambios Requeridos — R6-C (Idempotencia)

1. **Tabla order_idempotency_keys**: (id, key, customer_id, response_status, response_body, created_at, expires_at) con UNIQUE(key).
2. **Middleware/Interceptor**: Leer `Idempotency-Key` header en POST /checkout y POST /create-payment-intent.
3. **Logica**: Si key ya existe → devolver response almacenada. Si no → procesar y almacenar.
4. **TTL**: 24 horas.

## 15. Cambios Requeridos — R6-D (Rate Limiting Distribuido)

1. **Activar ThrottlerGuard**: Registrar como APP_GUARD o aplicar a controladores sensibles.
2. **Redis store**: Configurar ThrottlerStorageRedisService de `@nestjs/throttler-storage-redis`.
3. **Perfiles**: Diferenciar auth_sensitive, checkout, public_read, staff.
4. **Multi-instancia**: Verificar que dos instancias comparten el mismo bucket via Redis.
5. **Comportamiento con Redis DOWN**: fail-open para public_read, fail-closed para auth_sensitive.

## 16. Cambios Requeridos — R6-E (Webhooks y Pagos)

1. **Deduplicacion**: Almacenar `stripe_event_id` en columna UNIQUE en tabla transactions (o webhook_events).
2. **Logica**: Al recibir webhook, verificar si event_id ya existe → 200 OK sin procesar.
3. **Replay protection**: Verificar `event.created > now - 5min`.
4. **Transaccion webhook**: Procesar dentro de transaccion para consistencia.

## 17. Orden de Implementacion

```
R6-B → R6-C → R6-D → R6-E → R6-F (validacion final)
```

Cada bloque depende del anterior:
- R6-B es el nucleo transaccional (checkout + stock + orden).
- R6-C protege R6-B contra duplicados.
- R6-D protege R6-B contra abuso.
- R6-E protege la post-orden (webhooks).
- R6-F valida todo junto.

## 18. Proxima Accion

**R6-B**: Implementar POST /checkout con transaccion, reserva de stock, creacion de orden + items, consumo de cupon, y limpieza de carrito.
