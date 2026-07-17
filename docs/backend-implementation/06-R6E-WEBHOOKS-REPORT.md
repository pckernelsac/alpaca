# R6-E — WEBHOOKS REPORT — ALPACART

> **Estado:** R6-E COMPLETED
> **Fecha:** 2026-07-16 | **Dependencias:** R6-D ✅

---

## 1. Resumen Ejecutivo

R6-E implementa manejo robusto de webhooks de Stripe con deduplicación, replay protection, y manejadores para los 3 eventos críticos del ciclo de pago: `payment_intent.succeeded`, `payment_intent.payment_failed`, y `charge.refunded`. Se creó la tabla `webhook_events` (migración 016) con UNIQUE(provider, external_event_id) para garantizar idempotencia a nivel de evento. Se implementó `releaseExpiredReservations()` para limpieza de reservas expiradas.

## 2. Modelo de Datos — webhook_events

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | BIGSERIAL | PK |
| provider | VARCHAR(50) | NOT NULL — 'stripe' |
| external_event_id | VARCHAR(255) | NOT NULL — Stripe Event.id |
| event_type | VARCHAR(100) | NOT NULL — ej: payment_intent.succeeded |
| status | VARCHAR(20) | received / processing / completed / failed |
| order_id | UUID | nullable — order asociada |
| raw_body | TEXT | nullable — payload completo del webhook |
| created_at | DATE | NOT NULL |
| processed_at | DATE | nullable |

**Restricciones:**
- UNIQUE(provider, external_event_id) — deduplicación
- CHECK(status IN ('received','processing','completed','failed'))

## 3. Flujo de Webhook

```
Stripe → POST /stripe/webhook → PaymentsController.handleWebhook()
  → Validar firma (stripe-signature + whsec)
  → Buscar webhook_event por (provider='stripe', external_event_id)
  → Si existe: ✅ OK (idempotente, retorna 200 sin procesar)
  → Si no existe: INSERT webhook_event(status='received')
  → Rechazar si evento tiene >5 minutos de antigüedad
  → Actualizar status='processing'
  → Dispatch según event_type:
      ├── payment_intent.succeeded → handlePaymentSuccess()
      ├── payment_intent.payment_failed → handlePaymentFailure()
      └── charge.refunded → handleChargeRefunded()
  → Actualizar status='completed'
```

## 4. Manejadores de Eventos

| Evento | Método | Acciones |
|--------|--------|---------|
| payment_intent.succeeded | handlePaymentSuccess() | 1. Actualiza transaction → status='succeeded'<br>2. Actualiza order → status='paid'<br>3. Stock: decrementa quantity, zeroes reserved<br>4. Crea order_event('paid') |
| payment_intent.payment_failed | handlePaymentFailure() | 1. Actualiza transaction → status='failed'<br>2. Actualiza order → status='cancelled'<br>3. Stock: libera reserved (reserved -= cantidad)<br>4. Crea order_event('cancelled') |
| charge.refunded | handleChargeRefunded() | 1. Actualiza transaction → status='refunded'<br>2. Actualiza order → status='cancelled'<br>3. Stock: restaura quantity, decrementa reserved<br>4. Crea order_event('refunded') |

## 5. Release de Reservas Expiradas

```typescript
async releaseExpiredReservations(): Promise<number> {
  // Busca orders con status='pending' creadas hace >30 min
  // Por cada una:
  //   1. Libera reserved stock (reserved -= cantidad)
  //   2. Cancela la orden (status='cancelled')
  //   3. Crea order_event('reservation_expired')
  // Retorna cantidad de reservas liberadas
}
```

Endpoint: `POST /reservations/release-expired` (JWT, staff-only)

## 6. Endpoints de Payments

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | /transactions | JWT | Lista transacciones |
| POST | /create-payment-intent | JWT | Crea PaymentIntent en Stripe |
| POST | /transactions/:id/refund | JWT | Reembolso |
| POST | /stripe/webhook | Public | Webhook Stripe (firma) |
| POST | /reservations/release-expired | JWT Staff | Libera reservas expiradas |

## 7. Seguridad

| Mecanismo | Implementación |
|-----------|---------------|
| Firma Stripe | `stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)` |
| Deduplicación | UNIQUE(provider, external_event_id) en webhook_events |
| Stale events | Rechazo si evento tiene >5 minutos |
| Fail-open | Si falla validación de firma → 400 Bad Request |

## 8. Pendientes

- `raw_body` no se persiste actualmente en la tabla (campo nullable, siempre NULL)
- No hay replay protection por tiempo de vida del evento (solo se rechazan >5 min)
