# R7.2B — Checkout Integration

> **Flujo de compra completo**

---

## Endpoints

| Método | Endpoint | Request | Headers |
|--------|----------|---------|---------|
| POST | /checkout | `{ couponCode? }` | `Idempotency-Key` (opcional) |

## Body
```json
{ "couponCode": "ALPA10" }
```

## Flujo Backend (Transaccional)

```
POST /checkout
  → Validar Idempotency-Key (si existe)
  → Iniciar transacción SQL
  → Obtener carrito del customer (FOR UPDATE)
  → Validar stock de cada item (FOR UPDATE, ordenado por product_id)
  → Validar cupón (si existe)
  → Aplicar descuento
  → Crear Order + OrderItems + OrderEvent
  → Reservar stock (incrementar reserved)
  → Consumir cupón (incrementar used_count)
  → Limpiar carrito
  → Commit
  → Retornar Order
```

## Hook

| Hook | Método | Endpoint |
|------|--------|----------|
| `useCheckout()` | `.placeOrder(data, idempotencyKey?)` | POST /checkout |

## Estado Actual

| Componente | Store | Hook Disponible | Migrado |
|-----------|-------|----------------|---------|
| Checkout.jsx | cartStore (localStorage) + navegación mock | `useCheckout` | ❌ No |

## Migración Requerida

```jsx
// Antes (Checkout.jsx)
const handlePlaceOrder = () => navigate('/order/payment');

// Después
const { placeOrder, loading, order, error } = useCheckout();
const handlePlaceOrder = async () => {
  const result = await placeOrder({ couponCode: appliedCoupon }, crypto.randomUUID());
  if (result) navigate('/order/confirmed', { state: { order: result } });
};
```

## Idempotencia

- Header `Idempotency-Key: uuid` previene órdenes duplicadas
- Backend usa `findOrCreate` + UNIQUE(customer_id, scope, idempotency_key)
- Si misma key se reenvía, retorna la orden original (no crea duplicado)
