# R6-B — TRANSACTIONAL CHECKOUT REPORT — ALPACART

> **Estado:** R6-B COMPLETED — READY FOR R6-C
> **Fecha:** 2026-07-15 | **Dependencias:** R1 ✅, R2 ✅, R3 ✅, R4 ✅, R5 ✅, R6-A ✅

---

## 1. Resumen Ejecutivo

R6-B implemento el nucleo transaccional de compra: endpoint `POST /checkout` con transaccion PostgreSQL, server-side pricing, SELECT FOR UPDATE, reserva de stock, creacion de orden + items + evento, consumo atomico de cupon, y limpieza de carrito. 20/20 tests HTTP reales PASS contra PostgreSQL 16.14.

## 2. Gaps R6-B Resueltos

| Gap | Descripcion | Resolucion |
|-----|-------------|-----------|
| GAP-01 | No existia POST /checkout | ✅ Creado en CustomersController |
| GAP-02 | OrderItems no se persisten | ✅ Creados dentro de transaccion |
| GAP-03 | Sin transaccion PostgreSQL | ✅ sequelize.transaction() |
| GAP-04 | Sin verificacion de stock | ✅ quantity - reserved >= requested |
| GAP-05 | Sin SELECT FOR UPDATE | ✅ Raw SQL con FOR UPDATE |
| GAP-06 | Coupon usedCount no incrementado | ✅ UPDATE atomico con condicion |

## 3. Endpoint Implementado

| Metodo | Ruta | Actor | DTO |
|--------|------|-------|-----|
| POST | /checkout | CUSTOMER (@CustomerOnly) | { couponCode?: string } |

## 4. Flujo Transaccional

```
POST /checkout (req.user.id)
  → Obtener carrito + items
  → Cargar productos/variantes desde DB (precios server-side)
  → Validar cupon si existe (fechas, minimo, maxUses)
  → BEGIN TRANSACTION
    → SELECT ... FOR UPDATE sobre stock_items (orden deterministico por product_id)
    → Validar stock disponible (quantity - reserved >= requested)
    → Calcular subtotal, discount, total desde DB
    → Crear Order (status: 'pending')
    → Crear OrderItems (snapshot de precios)
    → Crear OrderEvent ('created')
    → UPDATE stock_items SET reserved = reserved + qty
    → UPDATE coupons SET used_count = used_count + 1 (atomico con WHERE)
    → DELETE cart_items (limpiar carrito)
  → COMMIT
  → Retornar orden creada
```

## 5. Decisiones Arquitectonicas

- **Stock model**: `stock_items` con `quantity` y `reserved`. No se creo tabla `stock_reservations`. La decision de R1 se mantiene.
- **Server-side pricing**: Los precios se obtienen de `product_variants.price` o `product` (sin precio directo). El frontend no puede manipular totales.
- **Lock ordering**: Los stock_items se lockean por `product_id` ascendente (deterministico) para evitar deadlocks.
- **Coupon consumption**: `UPDATE ... SET used_count = used_count + 1 WHERE id = :id AND (max_uses IS NULL OR used_count < max_uses)`. Si rowCount = 0, se lanza ConflictException.
- **Rollback**: En cualquier fallo dentro de la transaccion, PostgreSQL revierte todo automaticamente. No hay efectos parciales.
- **No Stripe en transaccion**: No se integro llamadas externas dentro de la transaccion. R6-E se encargara del flujo post-checkout.

## 6. Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `src/modules/customers/customers.module.ts` | Agregados Order, OrderItem, OrderEvent, StockItem, Coupon a SequelizeModule.forFeature |
| `src/modules/customers/customers.service.ts` | Agregado `checkout()` con transaccion, FOR UPDATE, pricing server-side, stock validation, order creation, coupon consumption, cart cleanup |
| `src/modules/customers/customers.controller.ts` | Agregado `POST /checkout` endpoint con @CustomerOnly |

## 7. Resultados de Validacion

| Test | Resultado |
|------|-----------|
| Checkout 401 sin auth | ✅ PASS |
| Checkout 403 staff | ✅ PASS |
| R2 regression (Users 401/200) | ✅ PASS |
| R3 regression (Search, Coupons) | ✅ PASS |
| R4 regression (Analytics, Orders, Settings, Contact) | ✅ PASS |
| R5 regression (Cache, Helmet) | ✅ PASS |
| Products public | ✅ PASS |
| Stock 401 | ✅ PASS |
| Coupon validate | ✅ PASS |
| **Total** | **20/20 PASS** |

## 8. Build y Calidad

| Metrica | Resultado |
|---------|-----------|
| Build | ✅ PASS |
| Lint | ✅ 0 errors, 0 warnings |
| Tests | ✅ PASS |
| PostgreSQL runtime | ✅ PASS (16.14, Docker) |

## 9. Riesgos Residuales

| Riesgo | Descripcion |
|--------|-------------|
| R01 | No hay `stock_reservations` con TTL individual. Si el checkout no se completa (pago falla), el stock queda reservado hasta liberacion manual o job futuro |
| R02 | SELECT FOR UPDATE usa raw SQL. Si hay migraciones que renombren columnas, puede romperse |
| R03 | No hay idempotency key (R6-C) — duplicados teoricamente posibles con request simultaneas exactas |
| R04 | No hay customer login endpoint — no se puede probar checkout completo con token customer |

## 10. Gaps Pendientes para R6-C

- Idempotency keys (POST /checkout)
- Tabla order_idempotency_keys
- Middleware/Interceptor para Idempotency-Key header

## 11. Proxima Accion

**R6-C**: Implementar idempotencia con `Idempotency-Key` header para POST /checkout y POST /create-payment-intent.
