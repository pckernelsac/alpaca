# R7.2B — Coupons Integration

> **Validación de cupones**

---

## Endpoints

| Método | Endpoint | Request | Response |
|--------|----------|---------|----------|
| POST | /coupons/validate | `{ code, cartSubtotal? }` | Cupón válido o error |

## Body
```json
{ "code": "ALPA10", "cartSubtotal": 300 }
```

## Response (200)
```json
{
  "code": "ALPA10",
  "type": "percentage",
  "value": 10,
  "minPurchase": 100,
  "active": true
}
```

## Response (404)
```json
{ "statusCode": 404, "message": "Cupón no válido" }
```

## Hook

| Hook | Método | Endpoint |
|------|--------|----------|
| `useCoupon()` | `.validate(code, subtotal)` | POST /coupons/validate |
| | `.reset()` | Limpia estado |

## Reglas de Validación (Backend)

- Cupón debe existir y estar activo
- Si tiene `minPurchase`, el subtotal debe ser >= minPurchase
- Si tiene `maxUses`, `usedCount` debe ser < `maxUses`
- Si tiene `expiresAt`, la fecha debe ser futura
- **No incrementa `used_count` durante validación** (solo en checkout)

## DTO

`ValidateCouponDto` existe pero no está conectado al controller (usa `b: any`). ICC-01 P1 identificado.
