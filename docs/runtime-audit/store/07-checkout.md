# AUDITORÍA DE CHECKOUT Y PAGOS — TIENDA

## Evaluación de Proceso de Compra

Se auditaron las vistas y repositorios involucrados en el flujo de checkout: `/checkout` y `/order/payment`.

---

## Flujo Completo de Checkout y Pago

```
Carrito (Cart) ➔ Selección de Dirección ➔ Validación de Cupón ➔ Payment Intent (Stripe) ➔ Checkout (Orden DB)
```

---

## Registro de Validación de Endpoints

| Etapa | Componente / Hook | Endpoint Backend | Método | Payload | Estado |
|-------|-------------------|------------------|--------|---------|--------|
| Validar Cupón | `useCoupon.js` | `/api/v1/coupons/validate` | POST | `{ code }` | **PASS (API REAL)** |
| Crear Payment Intent | `Payment.jsx` | `/api/v1/create-payment-intent` | POST | `{ amount, currency }` | **PASS (API REAL - Stripe SDK)** |
| Enviar Orden Checkout | `useCheckout.js` | `/api/v1/checkout` | POST | `{ cartId, addressId, paymentMethod }` | **PASS (API REAL)** |

---

## Idempotencia y Seguridad
- **Idempotency Key Header**: `checkoutRepository.checkout(data, idempotencyKey)` envía el encabezado `Idempotency-Key` en la petición POST si es provisto, evitando la duplicación de órdenes ante reintentos de red o doble clic en el cliente.
- **Manejo de Errores de Stock / Fondos Insuficientes**: El servidor responde con códigos 400 / 422 en caso de stock insuficiente o cupón expirado, siendo capturado adecuadamente por el estado `error` del hook `useCheckout`.
