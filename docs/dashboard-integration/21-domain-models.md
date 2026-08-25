# Dashboard — Domain Models

> **Modelos de dominio para el Dashboard**

---

## Ubicación: `src/domain/index.js`

| Modelo | Función | Propiedades |
|--------|---------|-------------|
| User | `createUser(raw)` | id, name, email, role, phone, status, createdAt |
| Role | `createRole(raw)` | id, name, category, status |
| Permission | `createPermission(raw)` | id, module, action, name |
| Product | `createProduct(raw)` | id, sku, name, price, status, stock, image |
| Order | `createOrder(raw)` | id, orderNumber, status, subtotal, total, paid, items[] |
| Client | `createClient(raw)` | id, name, company, email, type, status |
| Campaign | `createCampaign(raw)` | id, name, type, status, budget, channel |
| Content | `createContent(raw)` | id, title, slug, type, status, publishedAt |
| StockItem | `createStockItem(raw)` | id, productId, variantId, warehouseId, quantity, reserved |
| Transaction | `createTransaction(raw)` | id, transactionId, orderId, method, amount, status |
| Shipment | `createShipment(raw)` | id, waybill, orderId, carrier, status |
| AuditLog | `createAuditLog(raw)` | id, userId, action, module, description, severity |
| CompanySetting | `createCompanySetting(raw)` | id, legalName, taxId, email, phone, currency |
