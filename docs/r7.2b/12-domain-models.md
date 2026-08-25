# R7.2BV — Domain Models Creados

> **Modelos de dominio para la Tienda**

---

## Ubicación: `src/domain/`

### Catalog
```js
createProduct(raw)     → { id, sku, name, price, image, category, variants, ... }
createProductList(arr) → [createProduct(...)]
```

### Cart
```js
createCart(raw)     → { id, items, subtotal, total, couponId }
createCartItem(raw) → { id, productId, name, sku, unitPrice, quantity, total, ... }
```

### Orders
```js
createOrder(raw)      → { id, orderNumber, status, subtotal, total, items, events, ... }
createOrderItem(raw)  → { id, productName, sku, unitPrice, quantity, total }
createOrderEvent(raw) → { id, type, title, description, createdAt }
createOrderList(arr)  → [createOrder(...)]
```

### Customer
```js
createCustomer(raw) → { id, firstName, lastName, email, phone, language, currency }
```

## Propósito

- Los componentes React **nunca** ven los DTO del backend
- Los mappers transforman DTO → domain model
- Los domain models normalizan: null → '', undefined → 0, valores por defecto
- Inmutables por convención (no se mutan después de creados)
