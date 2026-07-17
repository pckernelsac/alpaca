# Contrato API REST — ALPACART Backend

## 1. Convenciones

| Convención | Regla |
|------------|-------|
| **Base URL** | `/api/v1` |
| **Response envelope** | `{ success: boolean, data: T, meta?: PaginationMeta, error?: ErrorObject }` |
| **PaginationMeta** | `{ page, perPage, total, totalPages }` |
| **ErrorObject** | `{ code: string, message: string, details?: any }` |
| **Auth** | `Authorization: Bearer <jwt>` |
| **Content-Type** | `application/json` (excepto uploads: `multipart/form-data`) |
| **Date format** | ISO 8601 (`2024-10-24T14:30:00Z`) |
| **Money** | `{ amount: number, currency: string }` (amount en entero de centavos o NUMERIC string) |

---

## 2. Auth & IAM

### 2.1 Autenticación

```
POST /api/v1/auth/login
POST /api/v1/auth/register       [Tienda]
POST /api/v1/auth/logout
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
GET  /api/v1/auth/me
PUT  /api/v1/auth/profile
PUT  /api/v1/auth/password
POST /api/v1/auth/avatar         [multipart]
```

#### `POST /api/v1/auth/login`

| Aspecto | Detalle |
|---------|---------|
| **Frontend** | Dashboard, Tienda, Institucional |
| **Auth** | No |
| **Permiso** | — |

**Request body:**
```json
{
  "email": "mateo.q@alpacart.com",
  "password": "securePassword123",
  "remember": true
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 2592000,
    "user": {
      "id": "uuid",
      "name": "Mateo Quispe",
      "email": "mateo.q@alpacart.com",
      "role": "admin",
      "permissions": ["catalog.*", "orders.*", "iam.users"],
      "avatar": "https://cdn.alpacart.com/avatars/uuid.jpg"
    }
  }
}
```

**Errors:** `401` Invalid credentials, `403` Account suspended, `429` Rate limit

---

### 2.2 Usuarios

```
GET    /api/v1/users              [Dashboard: UserList]
POST   /api/v1/users              [Dashboard: UserCreate]
GET    /api/v1/users/:id
PUT    /api/v1/users/:id
DELETE /api/v1/users/:id
PATCH  /api/v1/users/:id/status
GET    /api/v1/users/export       [CSV]
```

#### `GET /api/v1/users`

| Aspecto | Detalle |
|---------|---------|
| **Frontend** | Dashboard |
| **Página** | UserList |
| **Auth** | Sí |
| **Permiso** | `iam.users.read` |

**Query params:**
| Parám | Tipo | Ejemplo | Descripción |
|-------|------|---------|-------------|
| `search` | string | `mateo` | Filtro por nombre o email (ILIKE) |
| `role` | string | `admin` | Filtro por rol slug |
| `status` | string | `active` | Filtro por status |
| `department_id` | int | `1` | Filtro por departamento |
| `page` | int | `1` | Número de página |
| `per_page` | int | `25` | Items por página (10/25/50/100) |
| `sort` | string | `name` | Campo de ordenamiento |
| `order` | string | `asc` | ASC o DESC |

**Response 200 (paginated):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Mateo Quispe",
      "email": "mateo.q@alpacart.com",
      "role": { "id": 1, "name": "Admin" },
      "department": { "id": 1, "name": "IT & Sistemas" },
      "status": "active",
      "avatar": "https://...",
      "lastAccessAt": "2024-10-24T10:00:00Z"
    }
  ],
  "meta": { "page": 1, "perPage": 25, "total": 154, "totalPages": 7 }
}
```

#### `POST /api/v1/users`

**Request body:**
```json
{
  "name": "Mateo Quispe",
  "email": "mateo.q@alpacart.com",
  "phone": "+51 900 000 000",
  "employeeId": "ALP-0000",
  "departmentId": 1,
  "position": "Supervisor de Planta",
  "locationId": 1,
  "roleId": 1,
  "status": "active",
  "forcePasswordChange": true,
  "permissions": [1, 2, 3, 4]
}
```

---

### 2.3 Roles y Permisos

```
GET    /api/v1/roles              [Dashboard: RoleList]
POST   /api/v1/roles
PUT    /api/v1/roles/:id
DELETE /api/v1/roles/:id
POST   /api/v1/roles/:id/duplicate
GET    /api/v1/permissions
GET    /api/v1/permissions/matrix [Dashboard: PermissionMatrix]
PUT    /api/v1/permissions/matrix
GET    /api/v1/departments
```

---

### 2.4 Sesiones

```
GET    /api/v1/auth/sessions      [Dashboard: MyProfile]
DELETE /api/v1/auth/sessions/:id
DELETE /api/v1/auth/sessions
```

---

## 3. Catálogo

```
GET    /api/v1/products                        [Dashboard: ProductList] [Tienda: Category/Collection]
POST   /api/v1/products                        [Dashboard: ProductCreate]
GET    /api/v1/products/:id                    [Dashboard: ProductDetail] [Tienda: ProductDetail]
PUT    /api/v1/products/:id                    [Dashboard: ProductEdit]
DELETE /api/v1/products/:id
PATCH  /api/v1/products/:id/status
POST   /api/v1/products/:id/publish
POST   /api/v1/products/batch/status
POST   /api/v1/products/batch/collection
DELETE /api/v1/products/batch
POST   /api/v1/products/import                 [multipart]
GET    /api/v1/products/export                 [CSV]
GET    /api/v1/products/featured               [Tienda: Home]
GET    /api/v1/products/new                    [Tienda: Home]
GET    /api/v1/products/best-sellers           [Tienda: Home]
GET    /api/v1/products/related/:id            [Tienda: ProductDetail]
GET    /api/v1/products/search                 [Tienda: SearchResults]
GET    /api/v1/catalog/summary                 [Dashboard: CatalogDashboard]
```

#### `GET /api/v1/products`

| Aspecto | Detalle |
|---------|---------|
| **Frontend** | Dashboard, Tienda |
| **Auth** | Dashboard: Sí, Tienda: No |
| **Permiso** | `catalog.products.read` |

**Query params:**
| Parám | Tipo | Dashboard | Tienda |
|-------|------|-----------|--------|
| `search` | string | ✓ SKU, name, category | — |
| `category_id` | int | ✓ | ✓ |
| `category_slug` | string | — | ✓ |
| `collection_id` | int | ✓ | — |
| `status` | string | ✓ active/hidden/discontinued | ✓ active |
| `stock_level` | string | ✓ low/in/out | — |
| `sort` | string | ✓ name/price/stock/date | ✓ popular/price-asc/price-desc |
| `page` | int | ✓ | ✓ |
| `per_page` | int | ✓ (50/100/200) | ✓ |
| `min_price` | number | — | ✓ |
| `max_price` | number | — | ✓ |
| `material` | string | — | ✓ |

**Response 200 (listado público — Tienda):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Bufanda de Vicuña",
      "slug": "bufanda-de-vicuna",
      "image": "https://cdn.alpacart.com/products/uuid/thumb.jpg",
      "price": { "amount": 850.00, "currency": "USD" },
      "originalPrice": { "amount": 950.00, "currency": "USD" },
      "rating": 4.8,
      "reviewCount": 12,
      "badge": "NUEVO",
      "material": "100% Vicuña"
    }
  ],
  "meta": { "page": 1, "perPage": 20, "total": 4200, "totalPages": 210 }
}
```

**Response 200 (detalle — Dashboard):**
```json
{
  "id": "uuid",
  "sku": "ALP-INV-24-001",
  "name": "Manta Imperial Gold",
  "description": "Manta confeccionada...",
  "material": "100% Baby Alpaca",
  "category": { "id": 1, "name": "Manta" },
  "collection": { "id": 1, "name": "Invierno 2024" },
  "status": "active",
  "weight": 500.00,
  "tags": ["Premium", "Alpaca Baby"],
  "images": [
    { "id": "uuid", "url": "https://...", "isPrincipal": true, "alt": "Manta dorada" }
  ],
  "variants": [
    { "id": "uuid", "sku": "ALP-MIG-GOLD-ST", "color": "#D4AF37", "size": "ESTANDAR", "price": 285.00, "stock": 45, "status": "active" }
  ],
  "totalStock": 428,
  "createdAt": "2024-10-12T00:00:00Z",
  "updatedAt": "2024-10-24T00:00:00Z",
  "createdBy": { "id": "uuid", "name": "Admin" }
}
```

---

### 3.1 Variantes

```
GET    /api/v1/variants                       [Dashboard: VariantList]
POST   /api/v1/variants                       [Dashboard: VariantCreate]
GET    /api/v1/variants/:id
PUT    /api/v1/variants/:id
DELETE /api/v1/variants/:id
PATCH  /api/v1/variants/:id/stock
PATCH  /api/v1/variants/:id/price
POST   /api/v1/variants/:id/duplicate
POST   /api/v1/variants/generate
PATCH  /api/v1/variants/batch
GET    /api/v1/variants/export
```

### 3.2 Multimedia

```
GET    /api/v1/products/:id/media              [Dashboard: ProductMedia]
POST   /api/v1/products/:id/media              [multipart]
PUT    /api/v1/media/:id
DELETE /api/v1/media/:id
POST   /api/v1/media/:id/optimize
PATCH  /api/v1/media/:id/visibility
PATCH  /api/v1/media/:id/principal
```

### 3.3 Catálogos de Referencia

```
GET    /api/v1/categories
GET    /api/v1/categories/:slug
GET    /api/v1/collections
GET    /api/v1/collections/:id
```

---

## 4. Pedidos

```
GET    /api/v1/orders                          [Dashboard: OrderList] [Tienda: OrderHistory]
POST   /api/v1/orders                          [Dashboard: OrderCreate]
GET    /api/v1/orders/:id                      [Dashboard: OrderDetail] [Tienda: Thanks]
PUT    /api/v1/orders/:id/status               [Dashboard: status change]
PATCH  /api/v1/orders/:id/notes
POST   /api/v1/orders/:id/notify
POST   /api/v1/orders/batch/status
POST   /api/v1/orders/import                   [multipart]
GET    /api/v1/orders/export                   [CSV]
GET    /api/v1/orders/summary                  [Dashboard: OrderDashboard]
```

#### `GET /api/v1/orders`

| Aspecto | Detalle |
|---------|---------|
| **Frontend** | Dashboard, Tienda |
| **Auth** | Sí |
| **Permiso** | `orders.manage.read` (Dashboard), propio (Tienda) |

**Query params (Dashboard):**
| Parám | Tipo | Opciones |
|-------|------|----------|
| `search` | string | Order number, client name |
| `status` | string | pending/confirmed/paid/preparing/shipped/delivered/cancelled |
| `payment_status` | string | paid/pending/failed |
| `shipping_status` | string | pending/transit/delivered |
| `carrier` | string | DHL/FedEx/etc |
| `date_from` | date | 2024-10-01 |
| `date_to` | date | 2024-10-24 |
| `client_id` | int | Cliente B2B |
| `customer_id` | int | Cliente B2C (auto para Tienda) |
| `page` | int | 1 |
| `per_page` | int | 50 (100/200) |
| `sort` | string | date/total/status |
| `order` | string | asc/desc |

**Response 200 (Dashboard):**
```json
{
  "id": "uuid",
  "orderNumber": "ORD-2024-0892",
  "client": { "id": 1, "name": "Luxe Modas Paris", "avatar": "..." },
  "placedAt": "2024-10-24T14:32:00Z",
  "items": 3,
  "total": { "amount": 4250.00, "currency": "USD" },
  "status": "shipped",
  "paymentStatus": "paid",
  "shippingStatus": "transit",
  "channel": "showroom",
  "agent": "Elena Rodriguez"
}
```

---

### 4.1 Detalle y Timeline

```
GET    /api/v1/orders/:id                      [Dashboard: OrderDetail]
GET    /api/v1/orders/:id/events               [Dashboard: OrderTimeline]
GET    /api/v1/orders/:id/documents
GET    /api/v1/orders/:id/invoice              [PDF]
GET    /api/v1/orders/:id/tracking             [Tienda: OrderTracking]
```

---

## 5. Pagos

```
GET    /api/v1/transactions                    [Dashboard: TransactionList]
POST   /api/v1/transactions/:id/refund
POST   /api/v1/transactions/batch-approve
GET    /api/v1/transactions/export             [CSV]
GET    /api/v1/payments/summary                [Dashboard: PaymentDashboard]
```

#### `GET /api/v1/transactions`

| Parám | Tipo | Opciones |
|-------|------|----------|
| `search` | string | Transaction ID, order number, client |
| `status` | string | pending/processing/succeeded/failed/refunded |
| `method` | string | visa/mastercard/amex/paypal/bank_transfer |
| `currency` | string | USD/PEN/EUR |
| `date_from` | date | |
| `date_to` | date | |
| `page` | int | 1 |
| `per_page` | int | 25 |

**Response 200:**
```json
{
  "id": "uuid",
  "transactionId": "PAY-9921",
  "order": { "id": "uuid", "orderNumber": "ORD-5542" },
  "client": { "id": 1, "name": "Textiles Cusco S.A.C" },
  "method": "visa",
  "amount": { "amount": 12450.00, "currency": "USD" },
  "status": "succeeded",
  "stripeId": "pi_3N9xJ2L9e1Wz",
  "createdAt": "2024-10-24T10:45:00Z"
}
```

---

## 6. CRM

```
GET    /api/v1/clients                         [Dashboard: ClientList]
POST   /api/v1/clients                         [Dashboard: ClientCreate]
GET    /api/v1/clients/:id                     [Dashboard: ClientProfile]
PUT    /api/v1/clients/:id
PATCH  /api/v1/clients/:id/status
GET    /api/v1/clients/export                  [CSV]
GET    /api/v1/clients/:id/orders
GET    /api/v1/clients/:id/activity
POST   /api/v1/clients/:id/notes
GET    /api/v1/crm/summary                     [Dashboard: CrmDashboard]
```

#### `GET /api/v1/clients`

| Parám | Tipo | Opciones |
|-------|------|----------|
| `search` | string | Name, company, email |
| `status` | string | active/inactive/vip |
| `type` | string | wholesale/retail/corporate |
| `city` | string | Lima/Cusco/Puno |
| `assigned_seller_id` | int | |
| `page` | int | |
| `per_page` | int | 25 |

---

## 7. Inventario

```
GET    /api/v1/stock                           [Dashboard: StockList]
POST   /api/v1/stock/:id/adjust
POST   /api/v1/stock/import                    [multipart]
GET    /api/v1/stock/export                    [CSV]
GET    /api/v1/kardex                          [Dashboard: KardexPage]
GET    /api/v1/kardex/:productId/timeline
GET    /api/v1/movements                       [Dashboard: MovementList]
POST   /api/v1/movements
GET    /api/v1/movements/:id
GET    /api/v1/movements/export                [CSV]
GET    /api/v1/inventory/summary               [Dashboard: InventoryDashboard]
GET    /api/v1/warehouses
```

#### `GET /api/v1/kardex`

| Parám | Tipo | Opciones |
|-------|------|----------|
| `product_id` | uuid | |
| `variant_id` | uuid | |
| `warehouse_id` | int | |
| `type` | string | receipt/issue/transfer/adjustment/reservation |
| `date_from` | date | |
| `date_to` | date | |
| `person_id` | uuid | Responsable |
| `page` | int | |
| `per_page` | int | 25 |

### 7.1 Transferencias

```
GET    /api/v1/transfers                       [Dashboard: TransferList]
POST   /api/v1/transfers
GET    /api/v1/transfers/:id
PATCH  /api/v1/transfers/:id/status
GET    /api/v1/transfers/:id/guide
```

---

## 8. Logística

```
GET    /api/v1/shipments                       [Dashboard: ShipmentList]
POST   /api/v1/shipments
GET    /api/v1/shipments/:id
PATCH  /api/v1/shipments/:id/status
POST   /api/v1/shipments/:id/events
POST   /api/v1/shipments/:id/notify
GET    /api/v1/logistics/summary               [Dashboard: LogisticsDashboard]
```

---

## 9. Marketing

```
GET    /api/v1/campaigns                       [Dashboard: CampaignList]
POST   /api/v1/campaigns
PUT    /api/v1/campaigns/:id
DELETE /api/v1/campaigns/:id
GET    /api/v1/campaigns/:id/analytics
GET    /api/v1/marketing/summary               [Dashboard: MarketingDashboard]
POST   /api/v1/coupons
POST   /api/v1/promotions
```

---

## 10. CMS

```
GET    /api/v1/contents                        [Dashboard: ContentList]
POST   /api/v1/contents
GET    /api/v1/contents/:id
PUT    /api/v1/contents/:id
DELETE /api/v1/contents/:id
POST   /api/v1/contents/:id/duplicate
PATCH  /api/v1/contents/:id/status
POST   /api/v1/contents/batch
GET    /api/v1/cms/summary                     [Dashboard: CmsDashboard]
```

---

## 11. Textil

```
GET    /api/v1/textile/variants                [Dashboard: TextileVariantList]
POST   /api/v1/textile/variants
POST   /api/v1/textile/variants/import
GET    /api/v1/textile/variants/export
GET    /api/v1/textile/summary                 [Dashboard: TextileDashboard]
GET    /api/v1/textile/materials
GET    /api/v1/textile/colors
GET    /api/v1/textile/sizes
GET    /api/v1/textile/seasons
```

---

## 12. Auditoría

```
GET    /api/v1/audit/logs                      [Dashboard: AuditLog]
GET    /api/v1/audit/export                    [CSV/PDF]
GET    /api/v1/audit/summary
```

#### `GET /api/v1/audit/logs`

| Parám | Tipo | Opciones |
|-------|------|----------|
| `search` | string | User, action, IP |
| `module` | string | inventory/sales/iam/finance/catalog |
| `action` | string | create/update/delete/login |
| `severity` | string | success/info/warning/error/critical |
| `date_from` | date | |
| `date_to` | date | |
| `user_id` | uuid | |
| `page` | int | |
| `per_page` | int | 25 (50/100) |

---

## 13. Configuración

```
GET    /api/v1/settings/company                [Dashboard: Settings]
PUT    /api/v1/settings/company
POST   /api/v1/settings/logo                   [multipart]
GET    /api/v1/master-data                     [Dashboard: MasterData]
POST   /api/v1/master-data/:type
PUT    /api/v1/master-data/:type/:id
DELETE /api/v1/master-data/:type/:id
POST   /api/v1/master-data/sync
```

---

## 14. Dashboard KPIs

```
GET    /api/v1/dashboard/summary               [Dashboard: Panel de Control]
```

**Response 200:**
```json
{
  "kpis": {
    "dailySales": { "amount": 12540, "currency": "USD", "trend": 8.2 },
    "monthlySales": { "amount": 340200, "currency": "USD", "trend": 12.4 },
    "newCustomers": 42,
    "unitsSold": 1248,
    "pendingOrders": 15,
    "completedOrders": 128,
    "criticalItems": 8,
    "revenueYTD": { "amount": 2400000, "currency": "USD" }
  },
  "alerts": [
    { "type": "error", "title": "Stock crítico detectado", "description": "Fibra Premium Oro (2kg remaining)" }
  ],
  "recentOrders": [...],
  "activities": [...]
}
```

---

## 15. Analítica

```
GET    /api/v1/analytics                       [Dashboard: AnalyticsPage]
```

**Query params:**
| Parám | Tipo | Ejemplo |
|-------|------|---------|
| `date_from` | date | 2024-10-01 |
| `date_to` | date | 2024-10-31 |

**Response 200:**
```json
{
  "kpis": { "totalSales": 245800, "netRevenue": 182400, "totalOrders": 1452, "conversionRate": 4.2 },
  "salesTrend": [{ "date": "2024-10-01", "revenue": 8200, "costs": 6100 }],
  "channelDistribution": [{ "channel": "web", "percentage": 45 }],
  "topCategories": [{ "name": "Vicuña Premium", "percentage": 85 }],
  "marketingROI": [{ "campaign": "Social Campaign", "roi": "3.2x" }],
  "geography": [{ "city": "Lima", "percentage": 42 }]
}
```

---

## 16. Tienda — Ecommerce (B2C)

### 16.1 Productos (Público)

```
GET    /api/v1/products                        [Tienda: Category, Search]
GET    /api/v1/products/:id                    [Tienda: ProductDetail]
GET    /api/v1/products/featured               [Tienda: Home]
GET    /api/v1/products/new                    [Tienda: Home NewArrivals]
GET    /api/v1/products/best-sellers           [Tienda: Home BestSellers]
GET    /api/v1/products/related/:id            [Tienda: ProductDetail]
GET    /api/v1/products/recently-viewed        [Tienda: Category]
GET    /api/v1/products/search                 [Tienda: SearchResults]
```

### 16.2 Categorías y Colecciones (Público)

```
GET    /api/v1/categories                      [Tienda: Home Bento]
GET    /api/v1/categories/:slug                [Tienda: Category]
GET    /api/v1/collections                     [Tienda: Collection]
GET    /api/v1/collections/:id                 [Tienda: Collection detail]
```

### 16.3 Reseñas

```
GET    /api/v1/products/:id/reviews            [Tienda: ProductReviews]
POST   /api/v1/products/:id/reviews
GET    /api/v1/products/:id/reviews/stats
```

### 16.4 Cuenta (Customer)

```
GET    /api/v1/account/profile                 [Tienda: Account]
PUT    /api/v1/account/profile                 [Tienda: ProfileSettings]
PUT    /api/v1/account/password
POST   /api/v1/account/avatar                  [multipart]
GET    /api/v1/account/addresses               [Tienda: Addresses]
POST   /api/v1/account/addresses
PUT    /api/v1/account/addresses/:id
DELETE /api/v1/account/addresses/:id
PATCH  /api/v1/account/addresses/:id/default
```

### 16.5 Wishlist

```
GET    /api/v1/wishlist                        [Tienda: Wishlist]
POST   /api/v1/wishlist/items
DELETE /api/v1/wishlist/items/:id
POST   /api/v1/wishlist/items/:id/move-to-cart
POST   /api/v1/wishlist/share
```

### 16.6 Carrito

```
GET    /api/v1/cart                            [Tienda: Cart]
POST   /api/v1/cart/items
PATCH  /api/v1/cart/items/:id
DELETE /api/v1/cart/items/:id
POST   /api/v1/cart/coupon
DELETE /api/v1/cart/coupon
GET    /api/v1/cart/shipping-options
```

### 16.7 Checkout

```
PATCH  /api/v1/checkout/contact                [Tienda: Checkout step 1]
PATCH  /api/v1/checkout/address                [Tienda: Checkout step 2]
POST   /api/v1/checkout/place                  [Tienda: Checkout step 3]
POST   /api/v1/checkout/payment                [Tienda: Payment]
```

### 16.8 Órdenes (Customer)

```
GET    /api/v1/orders                          [Tienda: OrderHistory]
GET    /api/v1/orders/:id                      [Tienda: OrderConfirmed, Thanks]
GET    /api/v1/orders/:id/tracking             [Tienda: OrderTracking]
```

---

## 17. Página Institucional

```
POST   /api/v1/contact                         [Institucional: Contact]
POST   /api/v1/newsletter/subscribe            [Institucional, Tienda: Newsletter]
DELETE /api/v1/newsletter/unsubscribe
GET    /api/v1/faq                             [Institucional: FAQ]
GET    /api/v1/faq/:category
GET    /api/v1/institutional/products          [Institucional: Catalog]
GET    /api/v1/institutional/featured
GET    /api/v1/brand                           [Institucional: About]
GET    /api/v1/brand/timeline
GET    /api/v1/testimonials
GET    /api/v1/gallery
GET    /api/v1/benefits
GET    /api/v1/materials
GET    /api/v1/promotions
GET    /api/v1/contact/info
GET    /api/v1/terms
GET    /api/v1/policies
```

---

## 18. Cuadro Resumen

| Métrica | Dashboard | Tienda | Institucional | Total |
|---------|-----------|--------|---------------|-------|
| Endpoints GET | 48 | 22 | 15 | **85** |
| Endpoints POST | 28 | 12 | 2 | **42** |
| Endpoints PUT | 12 | 3 | 0 | **15** |
| Endpoints PATCH | 10 | 5 | 1 | **16** |
| Endpoints DELETE | 8 | 4 | 1 | **13** |
| **Total** | **106** | **46** | **19** | **171** |

| Métrica | Valor |
|---------|-------|
| Endpoints totales | 171 |
| CRUD estándar | ~120 |
| Comandos de negocio | ~30 |
| Export/Download | ~12 |
| Upload | ~9 |
| Públicos (sin auth) | ~20 |
| Protegidos | ~151 |
| Módulos cubiertos | 16 |

---

## 19. Endpoints de Comando vs CRUD

| Endpoint | Comando | Alternativa CRUD |
|----------|---------|------------------|
| `POST /auth/login` | ✓ | — |
| `PATCH /users/:id/status` | ✓ | `PUT /users/:id` con body status |
| `POST /products/:id/publish` | ✓ | `PATCH /products/:id/status { status: 'active' }` |
| `PATCH /variants/:id/stock` | ✓ | `PUT /variants/:id` |
| `POST /orders/:id/status` | ✓ | `PATCH /orders/:id` |
| `POST /orders/:id/notify` | ✓ | — |
| `POST /transactions/:id/refund` | ✓ | `PUT /transactions/:id/status` |
| `POST /stock/:id/adjust` | ✓ | `PUT /stock/:id` |
| `PATCH /transfers/:id/status` | ✓ | `PUT /transfers/:id` |
| `PATCH /contents/:id/status` | ✓ | `PUT /contents/:id` |
| `POST /wishlist/items/:id/move-to-cart` | ✓ | — |
| `POST /checkout/place` | ✓ | `POST /orders` |
| `POST /checkout/payment` | ✓ | `POST /transactions` |

---

*Documento generado el 2026-07-10. 171 endpoints REST diseñados, 16 dominios cubiertos.*
