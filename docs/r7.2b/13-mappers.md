# R7.2BV — Mappers Creados

> **Transformación DTO → Domain Model para la Tienda**

---

## Ubicación: `src/mappers/`

### Catalog Mapper
```js
mapProducts(rawList)  → createProductList(rawList.data || rawList || [])
mapProduct(raw)       → createProductList([raw])[0]
```

### Cart Mapper
```js
mapCart(raw) → createCart(raw)
```

### Orders Mapper
```js
mapOrders(rawList) → createOrderList(rawList.data || rawList || [])
mapOrder(raw)      → createOrder(raw)
```

### Customer Mapper
```js
mapCustomer(raw) → createCustomer(raw.data || raw.customer || raw.user || raw)
```

## Flujo

```
Backend JSON
  ↓ ApiClient (unwrap { success, data })
  ↓ Repository (raw data)
  ↓ Service (passthrough)
  ↓ Hook → Mapper → Domain Model
  ↓ Componente React
```
