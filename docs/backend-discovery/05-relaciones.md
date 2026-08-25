# Relaciones y Cardinalidades — ALPACART Backend

## 1. Mapa de Agregados

| Agregado | Raíz | Partes | FKs | Cascade |
|----------|------|--------|-----|---------|
| **IAM** | User | Session, AuditLog | user_id | RESTRICT |
| **Roles** | Role | RolePermission | role_id | CASCADE |
| **Producto** | Product | ProductVariant, ProductMedia | product_id | CASCADE |
| **Pedido** | Order | OrderItem, OrderEvent, OrderDocument | order_id | CASCADE |
| **Cliente B2B** | Client | ClientAddress, ClientPaymentMethod, ClientNote | client_id | CASCADE |
| **Cliente B2C** | Customer | CustomerAddress, WishlistItem | customer_id | CASCADE |
| **Inventario** | Warehouse | StockItem | warehouse_id | RESTRICT |
| **Logística** | Shipment | ShipmentEvent | shipment_id | CASCADE |

---

## 2. Matriz Completa de Relaciones

### 2.1 IAM / Auth

#### `users` → `roles`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Users to One Role) |
| **FK propuesta** | `users.role_id` → `roles.id` |
| **Nullable** | No |
| **On delete** | RESTRICT (no eliminar rol con usuarios asignados) |
| **Evidencia** | UserList: cada usuario tiene un rol (Admin, Logística, Ventas, Editor). RoleList: cada rol muestra "3 usuarios", "12 usuarios". |
| **Confianza** | Alta |

#### `roles` → `permissions` (N:M)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:M (Many Roles to Many Permissions) |
| **Tabla puente** | `role_permissions` |
| **FKs** | `role_permissions.role_id` → `roles.id`, `role_permissions.permission_id` → `permissions.id` |
| **Nullable** | No |
| **On delete** | CASCADE (eliminar relación al eliminar rol o permiso) |
| **Evidencia** | PermissionMatrix: matriz 5 roles × 7 permisos con checkboxes. Cada celda es una relación role-permission. |
| **Confianza** | Alta |

#### `users` → `sessions`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One User to Many Sessions) |
| **FK propuesta** | `sessions.user_id` → `users.id` |
| **Nullable** | No |
| **On delete** | CASCADE (al eliminar usuario, cerrar sesiones) |
| **Evidencia** | MyProfile: 2 sesiones activas (MacBook + iPhone) para el mismo usuario "Alejandro Vicuña". "Cerrar todas las sesiones" sugiere N sesiones. |
| **Confianza** | Alta |

#### `users` → `departments`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Users to One Department) |
| **FK propuesta** | `users.department_id` → `departments.id` |
| **Nullable** | Sí (un usuario puede no tener departamento) |
| **On delete** | SET NULL |
| **Evidencia** | UserList: "Mateo Quispe → IT & Sistemas". UserCreate: select de departamento. Filtro por departamento sugiere agrupación N:1. |
| **Confianza** | Alta |

#### `users` (self) → creado por

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One User creates many Users) |
| **FK propuesta** | `users.created_by` → `users.id` |
| **Nullable** | Sí (registro inicial no tiene creador) |
| **On delete** | SET NULL |
| **Evidencia** | UserCreate formulario requiere creador (usuario autenticado). AuditLog registra userId. |
| **Confianza** | Media |

---

### 2.2 Catálogo

#### `products` → `categories`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Products to One Category) |
| **FK propuesta** | `products.category_id` → `categories.id` |
| **Nullable** | Sí |
| **On delete** | SET NULL (no eliminar productos al eliminar categoría) |
| **Evidencia** | ProductList: "Manta Imperial Gold → Manta". CategoryGrid: productos filtrados por categoría. CategoryBento: 4 categorías en home. |
| **Confianza** | Alta |

#### `products` → `collections`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Products to One Collection) |
| **FK propuesta** | `products.collection_id` → `collections.id` |
| **Nullable** | Sí |
| **On delete** | SET NULL |
| **Evidencia** | CatalogDashboard: colecciones con "1,200 productos". ProductCreate: selector de colección. CollectionGrid: 4 colecciones con distintos productos. |
| **Confianza** | Alta |

#### `products` → `users` (creator)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Products to One Creator) |
| **FK propuesta** | `products.created_by` → `users.id` |
| **Nullable** | No |
| **On delete** | RESTRICT |
| **Evidencia** | ProductCreate requiere usuario autenticado. Audit trail implícito. |
| **Confianza** | Media |

#### `products` → `tags` (N:M)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:M (Many Products to Many Tags) |
| **FKs** | Tabla puente `product_tags`: `product_tags.product_id` → `products.id`, `product_tags.tag_id` → `tags.id` |
| **Evidencia** | ProductCreate: input de tags con chips (Enter para agregar). ProductDetail muestra tags. |
| **Confianza** | Alta |

#### `products` → `product_variants`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Product to Many Variants) |
| **FK propuesta** | `product_variants.product_id` → `products.id` |
| **Nullable** | No |
| **On delete** | CASCADE (al eliminar producto, eliminar variantes) |
| **Evidencia** | VariantList: parent product card muestra "12 activas / 15 total". VariantCreate requiere product_id padre. ProductDetail: selector color/talla variantes. |
| **Confianza** | Alta |

#### `products` → `product_media`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Product to Many Media) |
| **FK propuesta** | `product_media.product_id` → `products.id` |
| **Nullable** | Sí (media puede asociarse a variante en lugar de producto) |
| **On delete** | CASCADE |
| **Evidencia** | ProductMedia: galería de 4 assets para un producto. ProductDetail: 3 imágenes de galería. Upload zone en ProductCreate. |
| **Confianza** | Alta |

#### `product_variants` → `product_media`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Variants to One Media) o 1:N inversa |
| **FK propuesta** | `product_media.variant_id` → `product_variants.id` (nullable) |
| **Nullable** | Sí |
| **On delete** | CASCADE |
| **Evidencia** | VariantCreate: upload de imagen específica para variante. |
| **Confianza** | Media |

#### `product_variants` → `fiber_materials`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Variants to One Material) |
| **FK propuesta** | `product_variants.material_id` → `fiber_materials.id` |
| **Nullable** | Sí |
| **On delete** | RESTRICT |
| **Evidencia** | VariantList: columna "Material" (Baby Alpaca 100%, Alpaca/Seda Mix). TextileDashboard: distribución por material. |
| **Confianza** | Alta |

#### `product_variants` → `textile_sizes`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Variants to One Size) |
| **FK propuesta** | `product_variants.size_id` → `textile_sizes.id` |
| **Nullable** | Sí |
| **On delete** | RESTRICT |
| **Evidencia** | VariantList: columna "Talla" (Estándar, King, S, M, L, XL). ProductDetail: selector de talla. |
| **Confianza** | Alta |

#### `categories` (self) → parent category

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N auto-referencia |
| **FK propuesta** | `categories.parent_id` → `categories.id` |
| **Nullable** | Sí |
| **On delete** | RESTRICT |
| **Evidencia** | CategoryBento: Mujer, Hombre, Hogar, Accesorios (categorías padre). ProductList: categorías planas (subcategorías implícitas). |
| **Confianza** | Baja (no hay evidencia fuerte de jerarquía multi-nivel) |

---

### 2.3 Clientes (B2B)

#### `clients` → `client_addresses`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Client to Many Addresses) |
| **FK propuesta** | `client_addresses.client_id` → `clients.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | ClientProfile: "Principal" y "Facturación" direcciones para el mismo cliente. |
| **Confianza** | Alta |

#### `clients` → `client_payment_methods`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Client to Many Payment Methods) |
| **FK propuesta** | `client_payment_methods.client_id` → `clients.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | ClientProfile: VISA + MasterCard para el mismo cliente. |
| **Confianza** | Alta |

#### `clients` → `client_notes`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Client to Many Notes) |
| **FK propuesta** | `client_notes.client_id` → `clients.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | ClientProfile: timeline de notas + input "Agregar nota rápida". |
| **Confianza** | Alta |

#### `clients` → `users` (assigned seller)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Clients to One Seller) |
| **FK propuesta** | `clients.assigned_seller_id` → `users.id` |
| **Nullable** | Sí |
| **On delete** | SET NULL |
| **Evidencia** | ClientCreate: campo "Vendedor asignado" (select de usuarios). |
| **Confianza** | Alta |

---

### 2.4 Ecommerce (B2C)

#### `customers` → `customer_addresses`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Customer to Many Addresses) |
| **FK propuesta** | `customer_addresses.customer_id` → `customers.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | Addresses: 2 direcciones para "Julianne Moore". AddressCard: botón "Establecer como predeterminada". |
| **Confianza** | Alta |

#### `customers` → `wishlist_items`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Customer to Many Wishlist Items) |
| **FK propuesta** | `wishlist_items.customer_id` → `customers.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | Wishlist: "12 artículos guardados". WishlistGrid: 4 items. wishlistStore: customer-scoped. |
| **Confianza** | Alta |

#### `customers` → `reviews`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Customer to Many Reviews) |
| **FK propuesta** | `reviews.customer_id` → `customers.id` |
| **Nullable** | Sí (review anónima permite null) |
| **On delete** | SET NULL |
| **Evidencia** | ProductReviews: "Julian V., Ginebra" (autor), "Compra verificada" (tag vinculado a cuenta). |
| **Confianza** | Media |

#### `customers` → `orders` (B2C orders)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Customer to Many Orders) |
| **FK propuesta** | `orders.customer_id` → `customers.id` |
| **Nullable** | Sí (orden B2B usa client_id) |
| **On delete** | RESTRICT |
| **Evidencia** | OrderHistory: lista de pedidos del customer. Account: "Tus últimos pedidos". |
| **Confianza** | Alta |

---

### 2.5 Pedidos

#### `orders` → `order_items`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Order to Many Items) |
| **FK propuesta** | `order_items.order_id` → `orders.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | OrderDetail: 2 items para #ORD-2024-0892. Thanks (Tienda): 2 items. |
| **Confianza** | Alta |

#### `orders` → `order_events`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Order to Many Events) |
| **FK propuesta** | `order_events.order_id` → `orders.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | OrderTimeline: 9 eventos para #APC-98234102. OrderDetail: 4 eventos. |
| **Confianza** | Alta |

#### `orders` → `order_documents`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Order to Many Documents) |
| **FK propuesta** | `order_documents.order_id` → `orders.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | OrderDetail: 2 documentos (Invoice + Packing List). |
| **Confianza** | Alta |

#### `orders` → `clients` (B2B)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Orders to One Client) |
| **FK propuesta** | `orders.client_id` → `clients.id` |
| **Nullable** | Sí (pedido puede ser B2C) |
| **On delete** | RESTRICT |
| **Evidencia** | OrderList: "Luxe Modas Paris" (cliente B2B). ClientProfile: tabla "Pedidos Recientes" del cliente. |
| **Confianza** | Alta |

#### `orders` → `users` (agent/creator)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Orders to One User) |
| **FK propuesta** | `orders.user_id` → `users.id` |
| **Nullable** | Sí (pedido creado por customer B2C no tiene agente) |
| **On delete** | SET NULL |
| **Evidencia** | OrderDetail: "Agente: Elena Rodriguez". OrderList: filtro por agente implícito. |
| **Confianza** | Media |

#### `order_items` → `products`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Items to One Product) |
| **FK propuesta** | `order_items.product_id` → `products.id` |
| **Nullable** | Sí (por si el producto se elimina, el registro histórico se conserva) |
| **On delete** | SET NULL |
| **Evidencia** | OrderDetail: item "Chunky Alpaca Sweater" con SKU. |
| **Confianza** | Alta |

#### `order_items` → `product_variants`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Items to One Variant) |
| **FK propuesta** | `order_items.variant_id` → `product_variants.id` |
| **Nullable** | Sí |
| **On delete** | SET NULL |
| **Evidencia** | OrderDetail: "Color: Sand | Size: M" (variante específica). |
| **Confianza** | Alta |

---

### 2.6 Pagos

#### `orders` → `transactions`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Order to Many Transactions) |
| **FK propuesta** | `transactions.order_id` → `orders.id` |
| **Nullable** | No |
| **On delete** | RESTRICT |
| **Evidencia** | TransactionList: "#PAY-9921 → #ORD-5542". PaymentDashboard: transacciones por pedido. OrderDetail: sección de pago con status. |
| **Confianza** | Alta |

#### `transactions` → `transaction_refunds`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Transaction to Many Refunds) |
| **FK propuesta** | `transaction_refunds.transaction_id` → `transactions.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | TransactionList: botón "refund" por transacción. PaymentDashboard: "Reembolsos 8". |
| **Confianza** | Alta |

#### `transactions` → `clients` (polimórfico)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 |
| **FK propuesta** | `transactions.payable_id` + `transactions.payable_type` (polimórfico: client/customer) |
| **Nullable** | Sí |
| **Evidencia** | TransactionList: columna "Cliente" (puede ser B2B "Textiles Cusco" o B2C "Juan Pérez"). |
| **Confianza** | Media |

---

### 2.7 Inventario

#### `warehouses` → `stock_items`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Warehouse to Many Stock Items) |
| **FK propuesta** | `stock_items.warehouse_id` → `warehouses.id` |
| **Nullable** | No |
| **On delete** | RESTRICT (no eliminar almacén con stock) |
| **Evidencia** | InventoryDashboard: 4 warehouses con "42,500 units". StockList: filtro por almacén. Cada producto tiene ubicación. |
| **Confianza** | Alta |

#### `products` → `stock_items`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Product to Many Stock Items — one per warehouse) |
| **FK propuesta** | `stock_items.product_id` → `products.id` |
| **Nullable** | Sí (stock puede ser por variante) |
| **On delete** | CASCADE |
| **Evidencia** | StockList: "Camel Vicuna Blend" con stock en almacén específico. |
| **Confianza** | Alta |

#### `product_variants` → `stock_items`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Variant to Many Stock Items — one per warehouse) |
| **FK propuesta** | `stock_items.variant_id` → `product_variants.id` |
| **Nullable** | Sí (stock puede ser por producto sin variante) |
| **On delete** | CASCADE |
| **Evidencia** | VariantList: stock inline editable por variante. StockList: algunos items son variantes. |
| **Confianza** | Alta |

**Restricción:** `stock_items.product_id` y `stock_items.variant_id` no deben ser ambos NULL. Al menos uno debe estar presente. Se recomienda CHECK constraint: `(product_id IS NOT NULL) OR (variant_id IS NOT NULL)`.

#### `stock_items` → `stock_movements`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Stock Item to Many Movements) |
| **FK propuesta** | `stock_movements.product_id` → `products.id` (o stock_items.id para tracking preciso) |
| **Nullable** | Sí |
| **On delete** | RESTRICT |
| **Evidencia** | KardexPage: 5 movimientos para diferentes productos. MovementList: historial de movimientos. |
| **Confianza** | Alta |

#### `warehouses` → `warehouse_transfers`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Warehouse to Many Transfers — as origin) |
| **FK propuesta** | `warehouse_transfers.origin_warehouse_id` → `warehouses.id` |
| **Nullable** | No |
| **On delete** | RESTRICT |
| **Evidencia** | TransferList: columna "Origen" (Arequipa HQ → Cusco Planta). |
| **Confianza** | Alta |

#### `warehouses` → `warehouse_transfers` (as destination)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Warehouse to Many Transfers — as destination) |
| **FK propuesta** | `warehouse_transfers.destination_warehouse_id` → `warehouses.id` |
| **Nullable** | No |
| **On delete** | RESTRICT |
| **Evidencia** | TransferList: columna "Destino". Timeline: "Llegada a Destino". |
| **Confianza** | Alta |

#### `warehouse_transfers` → `users` (responsible)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Transfers to One User) |
| **FK propuesta** | `warehouse_transfers.responsible_id` → `users.id` |
| **Nullable** | Sí |
| **On delete** | SET NULL |
| **Evidencia** | TransferList: columna "Responsable" (R. Mendoza). |
| **Confianza** | Alta |

#### `stock_movements` → `users`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Movements to One User) |
| **FK propuesta** | `stock_movements.person_id` → `users.id` |
| **Nullable** | Sí |
| **On delete** | SET NULL |
| **Evidencia** | KardexPage: columna "Responsable" en sidebar timeline. MovementList: columna Responsable. |
| **Confianza** | Media |

---

### 2.8 Logística

#### `orders` → `shipments`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Order to Many Shipments — partial shipments) |
| **FK propuesta** | `shipments.order_id` → `orders.id` |
| **Nullable** | No |
| **On delete** | RESTRICT |
| **Evidencia** | ShipmentList: columna "Pedido". OrderDetail: shipping status + timeline. |
| **Confianza** | Alta |

#### `shipments` → `shipment_events`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Shipment to Many Events) |
| **FK propuesta** | `shipment_events.shipment_id` → `shipments.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | LogisticsDashboard: activity feed con eventos de carriers. |
| **Confianza** | Alta |

---

### 2.9 Marketing

#### `campaigns` → `users` (creator)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Campaigns to One Creator) |
| **FK propuesta** | `campaigns.created_by` → `users.id` |
| **Nullable** | No |
| **On delete** | RESTRICT |
| **Evidencia** | CampaignList: cada campaña tiene un creador implícito. |
| **Confianza** | Media |

---

### 2.10 CMS

#### `contents` → `users` (author)

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | N:1 (Many Contents to One Author) |
| **FK propuesta** | `contents.author_id` → `users.id` |
| **Nullable** | No |
| **On delete** | RESTRICT |
| **Evidencia** | ContentList: columna "Author" (Elena R.). Filtro por autor. |
| **Confianza** | Alta |

#### `faq_categories` → `faq_items`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Category to Many Items) |
| **FK propuesta** | `faq_items.category_id` → `faq_categories.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | FAQ: 4 categorías con ~15 items total. ContactFAQ: 3 items. |
| **Confianza** | Alta |

---

### 2.11 Auditoría

#### `users` → `audit_logs`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One User to Many Audit Logs) |
| **FK propuesta** | `audit_logs.user_id` → `users.id` |
| **Nullable** | Sí (eventos del sistema sin usuario) |
| **On delete** | SET NULL |
| **Evidencia** | AuditLog: columna "Usuario" (Javier Delgado) + avatar. Filtro por usuario. |
| **Confianza** | Alta |

---

### 2.12 Reseñas

#### `products` → `reviews`

| Aspecto | Valor |
|---------|-------|
| **Cardinalidad** | 1:N (One Product to Many Reviews) |
| **FK propuesta** | `reviews.product_id` → `products.id` |
| **Nullable** | No |
| **On delete** | CASCADE |
| **Evidencia** | ProductReviews: 2 reseñas para "Abrigo Heritage". Rating 5.0 de 5.0 (12 reseñas). |
| **Confianza** | Alta |

---

## 3. Diagrama Relacional Textual

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│   roles      │1──N│   users      │1──N│   sessions       │
│              │     │              │     │                  │
│              │     │  department_id│    │  user_id          │
└──────┬───────┘     └──────┬───────┘     └──────────────────┘
       │                    │
       │N                   │N
       │                    │
┌──────┴────────┐  ┌───────┴──────────┐
│ role_         │  │   departments    │
│ permissions   │  │                  │
│               │  └──────────────────┘
│ role_id       │
│ permission_id │
└──────┬────────┘
       │N
       │
┌──────┴──────────┐
│   permissions   │
│                 │
└─────────────────┘

┌──────────────┐1───N┌──────────────────┐1───N┌──────────────────┐
│  categories  │     │    products      │     │ product_variants │
│              │     │                  │     │                  │
│              │     │ category_id ─────┘     │ product_id ──────┘
│              │     │ collection_id ──┐      │ material_id ──┐
└──────────────┘     │ created_by ──┐  │      │ size_id ────┐ │
                     └──────────────┴──┴──┐   └─────────────┴─┴─┐
                                         │                    │ │
┌──────────────┐1───N┌──────────────────┐ │                    │ │
│  collections │     │   product_media  │ │                    │ │
│              │     │                  │ │                    │ │
│              │     │ product_id ───────┘ │                    │ │
│              │     │ variant_id ─────────┘                    │ │
└──────────────┘     └──────────────────┘                       │ │
                                                                 │ │
┌──────────────────┐  ┌──────────────────┐                      │ │
│  fiber_materials  │N─│ product_variants │                      │ │
│                   │  └──────────────────┘                      │ │
└──────────────────┘                                            │ │
                                                                 │ │
┌──────────────────┐  ┌──────────────────┐                      │ │
│  textile_sizes   │N─│ product_variants │                      │ │
└──────────────────┘  └──────────────────┘                      │ │
                                                                 │ │
┌──────────────┐     ┌──────────────────┐                       │ │
│   tags       │N──N│    products       │                       │ │
│              │  (through product_tags) │                       │ │
└──────────────┘     └──────────────────┘                       │ │

                        CLIENTES / CRM
┌──────────────┐1───N┌──────────────────┐1───N┌──────────────────┐
│   clients    │     │ client_addresses │     │client_payment_   │
│              │     │                  │     │   methods        │
│ assigned_    │     │ client_id ───────┘     │ client_id ───────┘
│ seller_id ───┼──N users                     └──────────────────┘
└──────┬───────┘
       │1
       │N
┌──────┴─────────────┐
│   client_notes     │
│                    │
│ client_id ──────────┘
└────────────────────┘
                        ECOMMERCE B2C
┌──────────────┐1───N┌──────────────────┐
│  customers   │     │customer_addresses │
│              │     │                   │
│              │     │ customer_id ──────┘
└──────┬───────┘     └──────────────────┘
       │1
       │N
┌──────┴───────────┐  ┌──────────────────┐
│  wishlist_items  │  │    reviews       │
│                  │  │                  │
│ customer_id ─────┘  │ customer_id ─────┘
│ product_id ─────────│ product_id ──────┐
│ variant_id ────┐    └──────────────────┘
└────────────────┘

                        PEDIDOS
┌──────────────┐1───N┌──────────────────┐1───N┌──────────────────┐
│   clients    │     │     orders       │     │  order_items     │
│  (B2B)       │     │                  │     │                  │
│              │     │ client_id ───────┘     │ order_id ────────┘
└──────────────┘     │ customer_id ────┐      │ product_id ────┐
                     │ user_id ────┐   │      │ variant_id ─┐  │
                     └─────────────┴───┴───┐  └─────────────┴──┴──┐
                                          │                      │
┌──────────────┐1───N┌──────────────────┐ │                      │
│  customers   │     │  order_events    │ │                      │
│  (B2C)       │     │                  │ │                      │
│              │     │ order_id ─────────┘ │                      │
└──────────────┘     └──────────────────┘  │                      │
                                           │                      │
┌──────────────┐1───N┌──────────────────┐  │                      │
│   users      │     │ order_documents  │  │                      │
│  (agents)    │     │                  │  │                      │
│              │     │ order_id ─────────┘  │                      │
└──────────────┘     └──────────────────┘  │                      │
                                           │                      │
┌──────────────┐1───N┌──────────────────┐  │                      │
│   orders     │     │  transactions    │  │                      │
│              │     │                  │  │                      │
│              │     │ order_id ─────────┘  │                      │
└──────────────┘     │ payable_id ───┐     │                      │
                     └──────────────┴──┐   │                      │
                                       │   │                      │
┌──────────────────┐1───N┌────────────┐│   │                      │
│  transactions    │     │transaction_││   │                      │
│                  │     │  refunds   ││   │                      │
│                  │     │            ││   │                      │
│                  │     │transaction ││   │                      │
│                  │     │  _id ──────┘│   │                      │
└──────────────────┘     └────────────┘   │                      │
                                          │                      │
┌──────────────┐1───N┌──────────────────┐  │                      │
│   orders     │     │   shipments      │  │                      │
│              │     │                  │  │                      │
│              │     │ order_id ─────────┘  │                      │
└──────────────┘     └──────┬───────────┘  │                      │
                            │1             │                      │
                            │N             │                      │
                     ┌──────┴───────────┐  │                      │
                     │ shipment_events  │  │                      │
                     │                  │  │                      │
                     │ shipment_id ──────┘  │                      │
                     └──────────────────┘  │                      │
                                           │                      │
                        INVENTARIO         │                      │
                                           │                      │
┌──────────────┐1───N┌──────────────────┐  │                      │
│  warehouses  │     │  stock_items     │  │                      │
│              │     │                  │  │                      │
└──────┬───────┘     │ warehouse_id ─────┘  │                      │
       │             │ product_id → products│                      │
       │1            │ variant_id → variants│                      │
       │N            └──────────────────┘  │                      │
┌──────┴───────────────┐                   │                      │
│ warehouse_transfers  │                   │                      │
│                      │                   │                      │
│ origin_warehouse_id  │                   │                      │
│ dest_warehouse_id    │                   │                      │
│ responsible_id → users                  │                      │
└──────────────────────┘                  │                      │
                                          │                      │
┌──────────────────┐                      │                      │
│ stock_movements  │                      │                      │
│                  │                      │                      │
│ product_id → prods│                      │                      │
│ warehouse_id → wh│                      │                      │
│ person_id → users│                      │                      │
└──────────────────┘                      │                      │
                                           │                      │
                        TEXTIL             │                      │
                                           │                      │
┌──────────────┐     ┌──────────────────┐  │                      │
│ fiber_materials│    │ textile_colors   │  │                      │
└──────────────┘     └──────────────────┘  │                      │
                                           │                      │
┌──────────────┐     ┌──────────────────┐  │                      │
│ textile_sizes│     │    seasons       │  │                      │
└──────────────┘     └──────────────────┘  │                      │
                                           │                      │
┌──────────────┐1───N┌──────────────────┐  │                      │
│ faq_categories│    │   faq_items      │  │                      │
│              │     │                  │  │                      │
│              │     │ category_id ──────┘  │                      │
└──────────────┘     └──────────────────┘  │                      │
                                           │                      │
┌──────────────┐1───N┌──────────────────┐  │                      │
│   users      │     │   audit_logs     │  │                      │
│              │     │                  │  │                      │
│              │     │ user_id ──────────┘  │                      │
└──────────────┘     └──────────────────┘  │                      │
                                           │                      │
┌──────────────┐1───N┌──────────────────┐  │                      │
│   users      │     │   contents       │  │                      │
│              │     │  (CMS)           │  │                      │
│              │     │                  │  │                      │
│              │     │ author_id ────────┘  │                      │
└──────────────┘     └──────────────────┘  │                      │
                                           │                      │
┌──────────────────┐  ┌──────────────────┐  │                      │
│   campaigns       │  │    coupons       │  │                      │
│                   │  │                  │  │                      │
│ created_by → users│  └──────────────────┘  │                      │
└──────────────────┘                       │                      │
                                           │                      │
┌──────────────────┐                       │                      │
│   promotions      │                       │                      │
│                   │                       │                      │
│ product_ids (JSONB)─── products (virtual)│                      │
└──────────────────┘                       │                      │
```

---

## 4. Tablas Sin Relaciones Fuertes

Estas tablas son principalmente independientes o tienen relaciones débiles:

| Tabla | Relaciones |
|-------|-----------|
| `company_settings` | Singleton, 1 registro, sin FKs |
| `master_entity_types` | Catálogo interno, podría FK a tabla genérica de master_data |
| `newsletter_subscribers` | Independiente, sin FKs |
| `contact_inquiries` | Independiente, status interno |
| `carriers` | Referenciada por shipments.carrier (como string, no FK) |
| `seasons` | Referenciada por collections.season_id |
| `textile_colors` | Referenciada por variantes (color_hex es embedded) |

**Decisión:** `shipments.carrier` se mantiene como VARCHAR (denormalizado) para preservar el nombre del transportista incluso si cambia el catálogo. Opcionalmente se puede agregar `carriers` como catálogo y FK.

---

## 5. Resumen de Cardinalidades

| Tipo | Cantidad | Ejemplos |
|------|----------|----------|
| 1:N | 28 | User→Session, Product→Variant, Client→Address |
| N:1 | 15 | Order→Client, Variant→Material, Content→Author |
| N:M | 2 | Role↔Permission (via role_permissions), Product↔Tag (via product_tags) |
| 1:1 | 0 | — |

## 6. Entidades Polimórficas

| Tabla | Campo tipo | Campo ID | Usos |
|-------|-----------|----------|------|
| `transactions` | `payable_type` | `payable_id` | client, customer |
| `product_media` | — | `product_id` o `variant_id` | producto o variante |
| `stock_items` | — | `product_id` o `variant_id` | producto o variante |

---

*Documento generado el 2026-07-10. 30 relaciones documentadas, 2 N:M, 28 1:N.*
