# Consultas y Operaciones de Lectura — ALPACART Backend

## 1. Convenciones

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Campo persistido** | Columna directa en tabla | `products.name` |
| **Campo relacionado** | JOIN a otra tabla | `products.category_id → categories.name` |
| **Campo calculado** | Derivable de otros campos | `stock_items.quantity - stock_items.reserved` |
| **Agregación SQL** | COUNT, SUM, AVG, etc. | `COUNT(orders)` por status |
| **Proyección** | DTO que combina varias tablas | OrderList: order + client + payment |
| **Métrica** | KPI calculado en runtime | `totalRevenueYTD` |
| **Serie temporal** | Datos agrupados por período | Ventas diarias del mes |

---

## 2. Dashboard Ejecutivo

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/` |
| **Tipo** | Dashboard multi-KPI |
| **Paginación** | No |

### KPIs (8 cards)

| KPI | Tipo | Cálculo | Fuente |
|-----|------|---------|--------|
| Daily Sales | Agregación | `SUM(transactions.amount) WHERE date = TODAY AND status = 'succeeded'` | transactions |
| Monthly Sales | Agregación | `SUM(transactions.amount) WHERE month = CURRENT AND status = 'succeeded'` | transactions |
| New Customers | Agregación | `COUNT(customers) WHERE createdAt = TODAY` | customers |
| Units Sold | Agregación | `SUM(order_items.qty) WHERE order.date = TODAY` | order_items |
| Pending Orders | Agregación | `COUNT(orders) WHERE status = 'pending'` | orders |
| Completed Orders | Agregación | `COUNT(orders) WHERE status = 'delivered' AND month = CURRENT` | orders |
| Critical Items | Agregación | `COUNT(stock_items) WHERE quantity <= min_stock * 0.5` | stock_items |
| Revenue YTD | Agregación | `SUM(transactions.amount) WHERE year = CURRENT AND status = 'succeeded'` | transactions |

### Charts

| Chart | Tipo | Datos | SQL |
|-------|------|-------|-----|
| Sales History | Barras (7 días) | `SUM(amount) GROUP BY day` | transactions |
| Top Categories | Progress bars | `COUNT(products) GROUP BY category` | products |
| Payment Methods | Donut | `COUNT(transactions) GROUP BY method` | transactions |

### Data Tables

| Tabla | Columnas | Origen |
|-------|----------|--------|
| Recent Orders | id, client, amount, status, initials | orders + clients |
| Activity Feed | icon, title, highlight, time | order_events + audit_logs |

### Filtros

| Filtro | Tipo | Valores |
|--------|------|---------|
| Period | button group | Hoy, Semana, Mes |

---

## 3. Catálogo

### 3.1 Catalog Dashboard

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/catalog` |
| **Tipo** | Dashboard |

**KPIs:**
| KPI | Cálculo |
|-----|---------|
| Total Products | `COUNT(products)` |
| Active SKUs | `COUNT(products) WHERE status = 'active'` |
| Hidden Products | `COUNT(products) WHERE status = 'hidden'` |
| Out of Stock | `COUNT(product_variants) WHERE stock = 0` |
| Total Variants | `COUNT(product_variants)` |
| Total Categories | `COUNT(categories)` |

**Charts:**
| Chart | Datos |
|-------|-------|
| Products by Category | `COUNT(products) GROUP BY category` |
| Collection Volume | `COUNT(products) GROUP BY collection` |
| Top Products | orders + order_items + products |

---

### 3.2 Product List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/catalog/productos` |
| **Tipo** | DataTable con filtros |
| **Paginación** | 50/100/200 per page, ~4,200 total |
| **Exportación** | CSV/Excel |

**DTO (ProductListRow):**
| Columna | Origen | Tipo |
|---------|--------|------|
| checkbox | — | UI |
| image | `product_media.url WHERE isPrincipal` | Relacionado |
| sku | `products.sku` | Persistido |
| name | `products.name` | Persistido |
| material | `products.material` | Persistido |
| collection | `collections.name` | Relacionado (JOIN) |
| category | `categories.name` | Relacionado (JOIN) |
| status | `products.status` | Persistido |
| stock | `SUM(stock_items.quantity)` | Agregación |
| price | `MIN(product_variants.price)` | Agregación |
| updated | `products.updated_at` | Persistido |

**Filtros:**
| Campo | Tipo | SQL |
|-------|------|-----|
| search | text (LIKE) | `sku ILIKE :q OR name ILIKE :q OR categories.name ILIKE :q` |
| collection | select (equality) | `collection_id = :val` |
| category | select (equality) | `category_id = :val` |
| status | select (equality) | `status = :val` |
| stock_level | select (range) | Ver nota abajo |

**Nota stock_level:** No es columna, es cálculo:
- `low`: `quantity > 0 AND quantity <= max * 0.2`
- `in`: `quantity > max * 0.2`
- `out`: `quantity = 0 OR quantity IS NULL`

**Ordenamiento:**
- Por nombre, precio, stock, fecha (ASC/DESC)

---

### 3.3 Product Detail

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/products/:id` (dashboard) / `/product/:id` (tienda) |
| **Tipo** | DTO compuesto |

**DTO (ProductDetail):**
| Sección | Campos | Origen |
|---------|--------|--------|
| Info | name, sku, description, material, weight, tags | products + tags (JOIN) |
| Media | images[] (url, alt, isPrincipal) | product_media |
| Variants | [color, size, price, stock, sku] | product_variants + sizes + colors |
| Pricing | price (min/max de variantes) | product_variants (agregación) |
| Category | name, slug | categories |
| Collection | name, description | collections |
| Reviews | count, avgRating, items[] | reviews (agregación) |
| Related | products[] de misma category/collection | products |

**Relaciones necesarias:** 6 JOINs + 2 agregaciones

---

### 3.4 Variant List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/catalog/variantes` |
| **Tipo** | DataTable editable inline |
| **Paginación** | ~15 variantes por producto |

**DTO (VariantRow):**
| Columna | Origen | Editable |
|---------|--------|----------|
| color (swatch) | `product_variants.color_hex` | No |
| color_name | `product_variants.color_name` | No |
| size | `sizes.name` (JOIN) | No |
| material | `fiber_materials.name` (JOIN) | No |
| sku | `product_variants.sku` | Sí |
| code | `product_variants.code` | Sí |
| price | `product_variants.price` | Sí |
| stock | `product_variants.stock` | Sí |
| status | `product_variants.status` | Select |

---

### 3.5 Media Gallery

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/catalog/productos/multimedia` |
| **Tipo** | Gallery + Detail panel |

**DTO (MediaAsset):**
| Campo | Origen |
|-------|--------|
| id, name, url, type, format | product_media |
| fileSize, dimensions | product_media |
| isPrincipal, visible, optimized | product_media |
| altText, description | product_media |

**Filtros:** search (name), type select (image/video), sort (date/size)

---

## 4. Pedidos

### 4.1 Order Dashboard

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/orders` |
| **Tipo** | Dashboard |

**KPIs (7):**
| KPI | SQL |
|-----|-----|
| Pending | `COUNT(orders) WHERE status = 'pending'` |
| Confirmed | `COUNT(orders) WHERE status = 'confirmed'` |
| Paid | `COUNT(orders) WHERE status = 'paid'` |
| Preparing | `COUNT(orders) WHERE status = 'preparing'` |
| Shipped | `COUNT(orders) WHERE status = 'shipped'` |
| Delivered | `COUNT(orders) WHERE status = 'delivered'` |
| Cancelled | `COUNT(orders) WHERE status = 'cancelled'` |

**Charts:**
| Chart | SQL |
|-------|-----|
| Daily Order Volume | `COUNT(orders) GROUP BY date LIMIT 13` |
| Orders by Status | `COUNT(orders) GROUP BY status` |
| Avg Dispatch Time | `AVG(shipped_at - created_at)` |

---

### 4.2 Order List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/orders/list` |
| **Tipo** | DataTable |
| **Paginación** | 50/100/200 per page, ~12,450 total |
| **Exportación** | CSV/Excel |

**DTO (OrderRow):**
| Columna | Origen | Tipo |
|---------|--------|------|
| id | `orders.order_number` | Persistido |
| customer | `clients.name` / `customers.first_name` | Relacionado |
| avatar | `clients.avatar` | Relacionado |
| date | `orders.created_at` | Persistido |
| products | `COUNT(order_items)` | Agregación |
| total | `orders.total` | Persistido |
| status | `orders.status` | Persistido |
| payment | `transactions.status` | Relacionado (último) |
| shipping | `shipments.status` | Relacionado (último) |
| channel | `orders.channel` | Persistido |

**Filtros:**
| Campo | Tipo | SQL |
|-------|------|-----|
| search | text | `order_number ILIKE :q OR client.name ILIKE :q` |
| status | select | `orders.status = :val` |
| payment | select | `transactions.status = :val` |
| shipping | select | `shipments.status = :val` |
| courier | select | `shipments.carrier = :val` |
| date_range | date range | `orders.created_at BETWEEN :from AND :to` |

**Dependencias:** Filtrar por shipping requiere JOIN a shipments. Filtrar por payment requiere JOIN a transactions.

---

### 4.3 Order Detail

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/pedidos/detalle` |
| **Tipo** | DTO compuesto (8 secciones) |

**DTO (OrderDetail):**
| Sección | Campos | JOINS |
|---------|--------|-------|
| Order info | order_number, status, createdAt, channel, agent | — |
| Fulfillment | paymentStatus%, shippingStatus% | transactions, shipments |
| Customer | name, email, avatar, address, shippingMethod | clients |
| Financials | subtotal, tax, shippingFee, total, paid | orders |
| Items | [name, variant, sku, qty, unitPrice, total, img] | order_items + product_media |
| Timeline | [title, date, note, done] | order_events |
| Documents | [name, url, type] | order_documents |
| Notes | textarea | orders.notes |

**Relaciones:** 7 JOINs

---

### 4.4 Order Timeline

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/pedidos/seguimiento` |
| **Tipo** | Timeline + Sidebar |

**DTO (TimelineEvent):**
| Campo | Origen |
|-------|--------|
| title, date, actor, note | order_events |
| icon, colorClass | Derivado de event type |
| active | calculated (último completed) |

**Sidebar:**
| Campo | Origen |
|-------|--------|
| order_id, amount, method, carrier | orders + transactions + shipments |
| cycle_days, effectiveness | Calculado de eventos |

**Filtros:**
| Filter | Tipo |
|--------|------|
| search | text |
| responsible | select |
| date range | date |
| event types | checkbox[] |

---

## 5. CRM

### 5.1 CRM Dashboard

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/crm` |
| **Tipo** | Dashboard |

**KPIs:**
| KPI | SQL |
|-----|-----|
| Total Clients | `COUNT(clients)` |
| New Clients (month) | `COUNT(clients) WHERE createdAt >= month_start` |
| Active Clients | `COUNT(clients) WHERE status = 'active'` |
| Inactive Clients | `COUNT(clients) WHERE status = 'inactive'` |
| Recurring Rate | `COUNT(clients) WHERE orders > 1 * 100.0 / COUNT(clients)` |

**Charts:**
| Chart | SQL |
|-------|-----|
| Client Growth (8 months) | `COUNT(clients) GROUP BY month` |
| Client by Category | `COUNT(clients) GROUP BY type` |
| Geographic | `COUNT(clients) GROUP BY city` |

---

### 5.2 Client List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/crm/clientes` |
| **Tipo** | DataTable |
| **Exportación** | CSV |

**DTO (ClientRow):**
| Columna | Origen | Tipo |
|---------|--------|------|
| name + company | `clients.name`, `clients.company` | Persistido |
| email + phone | `clients.email`, `clients.phone` | Persistido |
| type | `clients.type` | Persistido |
| orders | `COUNT(orders) WHERE client_id` | Agregación |
| totalSpent | `SUM(transactions.amount) WHERE payable_id = client.id` | Agregación |
| lastPurchase | `MAX(orders.created_at)` | Agregación |
| status | `clients.status` | Persistido |

**Filtros:**
| Campo | Tipo |
|-------|------|
| search | text (name, company, email) |
| status | select (active/inactive/vip) |
| type | select (wholesale/retail) |
| location | select (city) |

---

### 5.3 Client Profile

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/crm/clientes/:id` |
| **Tipo** | DTO compuesto |

**DTO (ClientProfile):**
| Sección | Fuente | JOINS |
|---------|--------|-------|
| Header | clients | — |
| KPIs (LTV, avgTicket, frequency, credit) | clients + orders + transactions | 2 |
| Contact | clients | — |
| Addresses | client_addresses | — |
| Payment Methods | client_payment_methods | — |
| Recent Orders | orders WHERE client_id | — |
| Top Products | order_items + products GROUP BY | 2 |
| Promotions | promotions | — |
| Notes | client_notes | — |
| Timeline | client_notes + orders + events | 3 |

**Total JOINS:** ~8

---

## 6. Pagos

### 6.1 Payment Dashboard

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/payments` |
| **Tipo** | Dashboard |

**KPIs:**
| KPI | SQL |
|-----|-----|
| Daily Sales | `SUM(amount) WHERE date = TODAY AND status = 'succeeded'` |
| Monthly Sales | `SUM(amount) WHERE month = CURRENT AND status = 'succeeded'` |
| YTD Revenue | `SUM(amount) WHERE year = CURRENT AND status = 'succeeded'` |
| Volume by Status | `COUNT(transactions) GROUP BY status` |

**Charts:**
| Chart | SQL |
|-------|-----|
| Cash Flow (12 months) | `SUM(amount) GROUP BY month` |
| Payment Methods | `COUNT(transactions) GROUP BY method` |
| Conversion Funnel | 2 bars: success rate, abandonment |

---

### 6.2 Transaction List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/payments/transactions` |
| **Tipo** | DataTable |
| **Paginación** | ~12,450 |
| **Exportación** | CSV |

**DTO (TransactionRow):**
| Columna | Origen |
|---------|--------|
| payId | `transactions.transaction_id` |
| order | `orders.order_number` (JOIN) |
| client | `clients.name` (JOIN polimórfico) |
| method | `transactions.method` |
| amount | `transactions.amount` |
| currency | `transactions.currency` |
| status | `transactions.status` |
| date | `transactions.created_at` |

**Filtros:**
| Campo | Tipo |
|-------|------|
| date_range | select (Last 30 days, Quarter, Year, Custom) |
| status | select (all, succeeded, pending, failed, refunded) |
| method | select (all, credit_card, bank_transfer, paypal) |
| currency | select (all, USD, PEN, EUR) |

---

## 7. Inventario

### 7.1 Inventory Dashboard

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/inventory` |
| **Tipo** | Dashboard |

**KPIs:**
| KPI | SQL |
|-----|-----|
| Total Stock | `SUM(quantity)` |
| Out of Stock | `COUNT(product_variants) WHERE stock = 0` |
| Critical | `COUNT(stock_items) WHERE quantity <= min * 0.5` |
| Incoming (month) | `SUM(quantity) FROM movements WHERE type = 'receipt'` |
| Outgoing (month) | `SUM(quantity) FROM movements WHERE type = 'issue'` |
| Reserved | `SUM(reserved)` |

**Charts:**
| Chart | SQL |
|-------|-----|
| In/Out by Month (12) | `SUM(qty) GROUP BY month, type` |
| Warehouse Distribution | `SUM(qty) GROUP BY warehouse` |
| Top/Low Rotation | `SUM(qty) FROM movements GROUP BY product` |

**Filtros:**
| Campo | Tipo |
|-------|------|
| warehouse | select |
| period | select |

---

### 7.2 Stock List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/inventory/stock` |
| **Tipo** | DataTable con view toggle |
| **Paginación** | 10/25/50 per page, ~1,284 |
| **Exportación** | CSV |

**DTO (StockRow):**
| Columna | Origen |
|---------|--------|
| product (img + name) | products + product_media (JOIN) |
| sku | products.sku |
| category | categories.name (JOIN) |
| warehouse | warehouses.name (JOIN) |
| units | `stock_items.quantity` |
| value | `stock_items.quantity * AVG(product_variants.price)` (calculado) |
| location | warehouses.name |
| status | Calculado: `low/in/out` |
| lastMovement | `MAX(stock_movements.created_at)` (agregación) |

**Filtros:**
| Campo | Tipo |
|-------|------|
| search | text (sku, name) |
| warehouse | select (5 opciones) |
| category | select |
| stock_status | select (critical, low, optimal, overstock) |

---

### 7.3 Kardex

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/inventory/kardex` |
| **Tipo** | DataTable + Timeline sidebar |
| **Paginación** | ~1,482 |
| **Exportación** | PDF/Excel |

**DTO (KardexRow):**
| Columna | Origen |
|---------|--------|
| date, time | `stock_movements.created_at` |
| product | `products.name` (JOIN) |
| sku | `products.sku` (JOIN) |
| type | `stock_movements.type` |
| quantity | `stock_movements.quantity` |
| balance | `stock_movements.balance` |
| document | `stock_movements.reference` |
| reason | `stock_movements.reason` |

**Filtros:**
| Campo | Tipo |
|-------|------|
| date_range | date (from/to) |
| warehouse | select |
| movement_type | select |
| user | text (responsable) |
| product | text (SKU) |

---

### 7.4 Movement List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/inventory/movements` |
| **Paginación** | ~1,248 |

**DTO (MovementRow):**
| Columna | Origen |
|---------|--------|
| id | `stock_movements.movement_number` |
| date | `stock_movements.created_at` |
| type | `stock_movements.type` |
| product + sku | products (JOIN) |
| quantity | `stock_movements.quantity` |
| route | `stock_movements.metadata->>'route'` |
| responsible | `users.name` (JOIN) |
| status | `stock_movements.status` |

---

## 8. Logística

### 8.1 Logistics Dashboard

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/logistics` |

**KPIs:**
| KPI | SQL |
|-----|-----|
| Prepared | `COUNT(shipments) WHERE status = 'preparing'` |
| In Transit | `COUNT(shipments) WHERE status = 'transit'` |
| Delivered | `COUNT(shipments) WHERE status = 'delivered' AND date = TODAY` |
| Delayed | `COUNT(shipments) WHERE status = 'delayed'` |
| Returned | `COUNT(shipments) WHERE status = 'returned'` |
| Avg Delivery | `AVG(delivered_at - dispatched_at)` |

**Charts:**
| Chart | SQL |
|-------|-----|
| Daily Deliveries (12 days) | `COUNT(shipments) GROUP BY date` |
| Carrier Mix | `COUNT(shipments) GROUP BY carrier` |
| On-Time Gauge | `COUNT(delivered_on_time) * 100 / COUNT(delivered)` |

---

### 8.2 Shipment List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/logistics/envios` |
| **Paginación** | ~842 |

**DTO (ShipmentRow):**
| Columna | Origen |
|---------|--------|
| waybill | `shipments.waybill` |
| order | `orders.order_number` (JOIN) |
| client | `clients.name` (JOIN) |
| carrier | `shipments.carrier` |
| status | `shipments.status` |
| city | `shipments.destination_city` |
| dispatched | `shipments.dispatched_at` |
| estimated | `shipments.estimated_at` |

**Filtros:** Tabs (All/Exceptions/Watchlist)

---

## 9. Marketing

### 9.1 Marketing Dashboard

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/marketing` |

**KPIs:** Active Campaigns (COUNT), Reach (SUM), Conversion Rate, CTR, Coupons (COUNT), Promotions (COUNT)

**Charts:** Line (revenue + conversion), Donut (channel distribution), Campaign ROI bars

---

### 9.2 Campaign List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/marketing/campanas` |
| **Paginación** | ~48 |

**DTO (CampaignRow):**
| Columna | Origen |
|---------|--------|
| name, meta | campaigns |
| type, channel | campaigns |
| budget, spent | campaigns |
| roi | `(revenue - spent) / spent` (calculado) |
| status | campaigns |

**Filtros:** status (6 opciones), channel (4), date

---

## 10. CMS

### 10.1 CMS Dashboard

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/cms` |

**KPIs:** Total Pages, Published, Drafts, Scheduled, Visitors, Engagement

**Charts:** Publishing Activity (16 days), Content Status Donut, Content Distribution (Institutional vs E-commerce)

---

### 10.2 Content List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/cms/contenido` |
| **Paginación** | ~154 |
| **View toggle** | Table / Card |

**DTO (ContentRow):**
| Columna | Origen |
|---------|--------|
| title + slug | contents |
| type | contents.type |
| status | contents.status |
| author | `users.name` (JOIN) |
| date | `contents.created_at` OR `contents.published_at` |

**Filtros:**
| Campo | Tipo |
|-------|------|
| type | select (page/blog/banner/collection/promo/faq) |
| status | select (published/draft/scheduled/review) |
| author | select (by user) |

---

## 11. Textil

### 11.1 Textile Dashboard

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/textile` |

**KPIs:** Total Variants, Materials, Colors, Sizes, Active Collections

**Charts:** Material Donut, Variants by Size (bars), Products by Season (progress bars)

---

### 11.2 Textile Variant List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/textil/variantes` |
| **Paginación** | 25/50/100 per page, ~1,248 |
| **Exportación** | CSV |

**DTO (TextileVariantRow):**
| Columna | Origen |
|---------|--------|
| image | product_media (JOIN) |
| sku | products.sku |
| product + category | products + categories (JOIN) |
| material | fiber_materials.name (JOIN) |
| color + hex | textile_colors (JOIN) |
| size | textile_sizes.name (JOIN) |
| season | seasons.name (JOIN) |
| status | products.status |
| date | products.updated_at |

**Filtros:** search, advanced filters

---

## 12. IAM

### 12.1 User List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/usuarios` |
| **Paginación** | ~154 |
| **Exportación** | CSV |

**DTO (UserRow):**
| Columna | Origen |
|---------|--------|
| name + email | users |
| avatar / initials | `users.avatar` o calculado |
| role | `roles.name` (JOIN) |
| department | `departments.name` (JOIN) |
| status | users.status |
| lastAccess | `sessions.last_activity_at` (agregación) |

**Filtros:**
| Campo | Tipo |
|-------|------|
| search | text (name, email) |
| role | select |
| status | select |
| department | select |

---

### 12.2 Role List

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/usuarios/roles` |
| **Paginación** | ~128 |

**DTO (RoleRow):**
| Columna | Origen |
|---------|--------|
| name + category | roles |
| description | roles |
| users | `COUNT(users) WHERE role_id` (agregación) |
| permissions | `COUNT(role_permissions)` (agregación) |
| status | roles.status |

**Filtros:** search (name), status, category

---

### 12.3 Permission Matrix

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/usuarios/permisos` |

**DTO (MatrixView):**
| Columna | Origen |
|---------|--------|
| module | permissions.module |
| permission + description | permissions |
| roles[] | `role_permissions` (5 columnas por rol) |

---

## 13. Auditoría

### 13.1 Audit Log

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/audit` |
| **Paginación** | 25/50/100 per page, ~1,402 |
| **Exportación** | CSV/PDF |

**DTO (AuditRow):**
| Columna | Origen |
|---------|--------|
| fecha | audit_logs.created_at |
| user + avatar | `users.name` (JOIN) |
| module | audit_logs.module |
| action | audit_logs.action |
| details (IP + device) | audit_logs |
| severity | audit_logs.severity |

**Filtros:**
| Campo | Tipo |
|-------|------|
| search | text (user, action, IP) |
| module | select (5 módulos) |
| action | select (create/update/delete/login) |
| date | date picker |

---

## 14. Configuración

### 14.1 Master Data

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/datos-maestros` |

**DTO (EntityTypeCard):**
| Campo | Origen |
|-------|--------|
| icon | lookup |
| name | master_entity_types.name |
| count | `COUNT(master_entities) WHERE type` (agregación) |

---

### 14.2 Company Settings

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/settings` |

**DTO (CompanySettings):**
| Campo | Origen |
|-------|--------|
| logo, legalName, taxId, industry, website | company_settings |
| email, phone, address | company_settings |
| currency, timezone, language | company_settings |

---

## 15. Tienda — Lecturas

### 15.1 Home Page

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/` (tienda) |

**Consultas:**
| Sección | Query |
|---------|-------|
| Hero | Product destacado con imagen |
| Categories | `categories WHERE active` (4) |
| New Arrivals | `products ORDER BY created_at LIMIT 4` |
| Best Sellers | `products ORDER BY sales LIMIT 4` |
| Artisan Series | products WHERE collection = 'artisan' |
| Testimonials | reviews aleatorio |
| Benefits | Catálogo |

---

### 15.2 Product Detail (Tienda)

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/product/:id` |

**DTO:**
| Sección | Origen | JOINS |
|---------|--------|-------|
| Product info | products | — |
| Images | product_media WHERE product_id | 1 |
| Variants | product_variants WHERE product_id | 1 |
| Colors | product_variants.color_hex DISTINCT | 1 |
| Sizes | product_variants.size DISTINCT | 1 |
| Description | products.description | — |
| Tabs (composition, care, shipping) | products.description (parsed) | — |
| Reviews | reviews WHERE product_id | 1 |
| Rating | `AVG(rating), COUNT(reviews)` | 1 |
| Related | products WHERE same category LIMIT 4 | 1 |

---

### 15.3 Category Page

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/category/:slug` |
| **Paginación** | No (6 productos) |

**DTO:**
| Campo | Origen |
|-------|--------|
| category name + description | categories WHERE slug |
| products[] | products WHERE category_id |
| recentlyViewed | (variante por usuario) |

**Filtros:**
| Campo | Tipo |
|-------|------|
| category | sidebar (5 opciones) |
| sort | select (popular, price-asc, price-desc) |

---

### 15.4 Search Results

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/search/:query` |

**DTO:**
| Campo | Origen |
|-------|--------|
| query | URL param |
| results[] | `products WHERE name ILIKE :q OR description ILIKE :q OR sku ILIKE :q` |

---

### 15.5 Order History (Tienda)

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/order/history` |
| **Protegida** | Sí |

**DTO (OrderRow):**
| Campo | Origen |
|-------|--------|
| id | orders.order_number |
| date | orders.created_at |
| status | orders.status |
| total | orders.total |
| items[] | `order_items WHERE order_id` |

---

### 15.6 Order Tracking (Tienda)

| Aspecto | Detalle |
|---------|---------|
| **Ruta** | `/order/tracking/:id` |

**DTO:**
| Campo | Origen |
|-------|--------|
| status | orders |
| timeline[] | order_events |
| carrier | shipments |
| trackingNumber | shipments |
| deliveryAddress | orders |
| paymentStatus | transactions |

---

## 16. Resumen de Consultas por Tipo

| Tipo | Cantidad | Ejemplos |
|------|----------|----------|
| **Listados simples** | 12 | ContentList, TextileVariantList, CampaignList |
| **Listados con filtros múltiples** | 8 | ProductList, OrderList, ClientList, StockList, TransactionList, UserList, RoleList, MovementList |
| **Dashboards multi-KPI** | 11 | Dashboard, CatalogDashboard, OrderDashboard, CrmDashboard, PaymentDashboard, InventoryDashboard, LogisticsDashboard, MarketingDashboard, CmsDashboard, TextileDashboard, AnalyticsPage |
| **DTOs compuestos (5+ JOINs)** | 5 | ProductDetail, OrderDetail, ClientProfile, OrderTracking, VariantList |
| **Exportaciones** | ~12 | ProductList, OrderList, ClientList, etc. |
| **Timelines** | 2 | OrderTimeline, KardexPage (sidebar) |
| **Matrices** | 1 | PermissionMatrix |
| **Galerías** | 1 | ProductMedia |
| **Agregaciones (KPIs)** | ~60 | Aprox 5-7 KPIs por dashboard × 11 dashboards |

---

## 17. Endpoints GET Propuestos

### Dashboard
| Endpoint | Propósito |
|----------|-----------|
| `GET /dashboard/summary` | KPIs + alerts + chart data |

### Catálogo
| Endpoint | Propósito |
|----------|-----------|
| `GET /products` | Listado con filtros y paginación |
| `GET /products/:id` | Detalle completo con variantes, media, reviews |
| `GET /products/export` | Exportación CSV/Excel |
| `GET /products/:id/media` | Galería multimedia |
| `GET /variants` | Variantes con filtros |
| `GET /variants/:id` | Detalle de variante |
| `GET /catalog/summary` | KPIs del catálogo |
| `GET /collections` | Colecciones |
| `GET /categories` | Categorías |

### Pedidos
| Endpoint | Propósito |
|----------|-----------|
| `GET /orders` | Listado con filtros |
| `GET /orders/:id` | Detalle completo |
| `GET /orders/:id/timeline` | Eventos de timeline |
| `GET /orders/:id/documents` | Documentos |
| `GET /orders/export` | Exportación |
| `GET /orders/summary` | KPIs |

### CRM
| Endpoint | Propósito |
|----------|-----------|
| `GET /clients` | Listado con filtros |
| `GET /clients/:id` | Perfil completo |
| `GET /clients/:id/orders` | Historial de pedidos |
| `GET /clients/:id/activity` | Timeline de actividad |
| `GET /clients/export` | Exportación |
| `GET /crm/summary` | KPIs |

### Pagos
| Endpoint | Propósito |
|----------|-----------|
| `GET /transactions` | Listado con filtros |
| `GET /transactions/:id` | Detalle |
| `GET /transactions/export` | Exportación |
| `GET /payments/summary` | KPIs |

### Inventario
| Endpoint | Propósito |
|----------|-----------|
| `GET /stock` | Listado con filtros |
| `GET /stock/:id` | Detalle |
| `GET /stock/export` | Exportación |
| `GET /kardex` | Movimientos con filtros |
| `GET /movements` | Listado de movimientos |
| `GET /movements/export` | Exportación |
| `GET /inventory/summary` | KPIs |

### Logística
| Endpoint | Propósito |
|----------|-----------|
| `GET /shipments` | Listado con filtros |
| `GET /shipments/:id` | Detalle + tracking |
| `GET /logistics/summary` | KPIs |
| `GET /transfers` | Transferencias |
| `GET /transfers/:id` | Detalle + timeline |

### Marketing
| Endpoint | Propósito |
|----------|-----------|
| `GET /campaigns` | Listado |
| `GET /campaigns/:id` | Detalle |
| `GET /campaigns/:id/analytics` | Analytics |
| `GET /marketing/summary` | KPIs |

### CMS
| Endpoint | Propósito |
|----------|-----------|
| `GET /contents` | Listado con filtros |
| `GET /contents/:id` | Detalle |
| `GET /cms/summary` | KPIs |

### IAM
| Endpoint | Propósito |
|----------|-----------|
| `GET /users` | Listado con filtros |
| `GET /users/:id` | Detalle |
| `GET /users/export` | Exportación |
| `GET /roles` | Roles |
| `GET /roles/:id` | Detalle |
| `GET /permissions/matrix` | Matriz completa |

### Textil
| Endpoint | Propósito |
|----------|-----------|
| `GET /textile/variants` | Listado |
| `GET /textile/variants/export` | Exportación |
| `GET /textile/summary` | KPIs |

### Auditoría
| Endpoint | Propósito |
|----------|-----------|
| `GET /audit/logs` | Listado con filtros |
| `GET /audit/logs/export` | Exportación |
| `GET /audit/summary` | KPIs |

### Configuración
| Endpoint | Propósito |
|----------|-----------|
| `GET /settings/company` | Configuración |
| `GET /master-data` | Datos maestros |

### Tienda (Ecommerce)
| Endpoint | Propósito |
|----------|-----------|
| `GET /products` | Listado público (home, category) |
| `GET /products/:id` | Detalle público |
| `GET /products/search?q=` | Búsqueda |
| `GET /products/featured` | Destacados |
| `GET /products/new` | Nuevos |
| `GET /products/best-sellers` | Más vendidos |
| `GET /products/related/:id` | Relacionados |
| `GET /collections` | Colecciones públicas |
| `GET /categories` | Categorías públicas |
| `GET /orders` | Mis pedidos (customer) |
| `GET /orders/:id` | Detalle pedido |
| `GET /orders/:id/tracking` | Seguimiento |
| `GET /account/profile` | Mi perfil |
| `GET /account/addresses` | Mis direcciones |
| `GET /wishlist` | Mi wishlist |

---

## 18. Resumen General

| Métrica | Valor |
|---------|-------|
| DataTables | ~20 |
| Dashboards | 11 |
| KPIs totales | ~60 |
| DTOs compuestos (5+ JOINs) | 5 |
| Exportaciones | ~12 |
| Endpoints GET estimados | ~80 |
| Filtros totales | ~60 |
| Tipos de ordenamiento | ~10 |
| Paginaciones | ~15 |

---

*Documento generado el 2026-07-10. 80 endpoints GET identificados, 11 dashboards, 60 KPIs.*
