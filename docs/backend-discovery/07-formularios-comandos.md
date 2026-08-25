# Formularios y Operaciones de Escritura — ALPACART Backend

## 1. Convenciones

| Tipo | Descripción | HTTP | Ejemplo |
|------|-------------|------|---------|
| CREATE | Creación de entidad completa | POST | `POST /products` |
| UPDATE | Actualización completa | PUT | `PUT /products/:id` |
| PATCH | Actualización parcial | PATCH | `PATCH /products/:id/status` |
| DELETE | Eliminación | DELETE | `DELETE /products/:id` |
| COMMAND | Acción de negocio específica | POST | `POST /orders/:id/confirm` |

---

## 2. Dashboard — Formularios y Operaciones

### 2.1 Login

| Aspecto | Detalle |
|---------|---------|
| **Página** | Login |
| **Dominio** | Auth |
| **Propósito** | Autenticar usuario en el sistema |
| **Tipo operación** | COMMAND |
| **Comando sugerido** | `POST /auth/login` |

| Campo | Tipo | Requerido | Validación frontend |
|-------|------|-----------|---------------------|
| email | email | Sí | Formato email |
| password | password | Sí | No vacío |
| remember | checkbox | No | — |

**Entidades afectadas:** User, Session
**Respuesta:** `{ token, user }`

---

### 2.2 My Profile

| Aspecto | Detalle |
|---------|---------|
| **Página** | MyProfile |
| **Dominio** | IAM |
| **Propósito** | Actualizar perfil del usuario autenticado |
| **Tipo operación** | UPDATE |

| Campo | Tipo | Requerido |
|-------|------|-----------|
| name | text | Sí |
| position | text | No |
| email | email | Sí |
| phone | tel | No |

**Entidad afectada:** User
**Comando sugerido:** `PUT /auth/profile`

#### Password Change

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| current_password | password | Sí | No vacío |
| new_password | password | Sí | ≥8 chars, 1 number/symbol, 1 uppercase |
| confirm_password | password | Sí | Match new_password |

**Comando sugerido:** `PUT /auth/password`

#### Account Preferences

| Campo | Tipo | Requerido |
|-------|------|-----------|
| language | select (es/en) | Sí |
| timezone | select | Sí |
| push_notifications | toggle | — |
| weekly_reports | toggle | — |

**Comando sugerido:** `PATCH /auth/preferences`

#### Account Actions

| Acción | Comando sugerido |
|--------|-----------------|
| Upload avatar | `POST /auth/avatar` |
| Close all sessions | `DELETE /auth/sessions` |
| Close one session | `DELETE /auth/sessions/:id` |
| Download my data | `GET /auth/export` |
| Deactivate account | `POST /auth/deactivate` |

---

### 2.3 User Management

| Aspecto | Detalle |
|---------|---------|
| **Página** | UserCreate |
| **Dominio** | IAM |
| **Propósito** | Crear nuevo usuario del sistema |
| **Tipo operación** | CREATE |

| Campo | Tipo | Requerido | Observaciones |
|-------|------|-----------|---------------|
| avatar | file (JPG/PNG/WEBP ≤2MB) | No | Upload |
| full_name | text | Sí | |
| email | email | Sí | |
| phone | tel | No | |
| employee_id | text | No | |
| department | select | No | FK → departments |
| position | text | No | |
| location/sede | select | No | FK → locations |
| role | radio | Sí | Admin/Logistics/Sales |
| status | toggle | — | Activo/Inactivo |
| permissions[] | checkbox[] | No | 4 granular permissions |
| password_type | radio | — | auto-generate / manual |
| force_password_change | toggle | — | Default: true |

**Entidad afectada:** User
**Comando sugerido:** `POST /users`

#### Status change

| Origen | Acción | Comando |
|--------|--------|---------|
| UserList | Activar/Desactivar/Suspender | `PATCH /users/:id/status` |
| UserList | Eliminar | `DELETE /users/:id` |
| UserList | Exportar | `GET /users/export` |

---

### 2.4 Role Management

| Aspecto | Detalle |
|---------|---------|
| **Página** | RoleList |
| **Dominio** | IAM |
| **Propósito** | CRUD de roles |
| **Tipo operación** | CREATE / UPDATE / DELETE / COMMAND |

| Campo | Tipo | Requerido |
|-------|------|-----------|
| name | text | Sí |
| category | select | Sí (crítico/operativo/administrativo/externo) |
| description | textarea | No |

**Órdenes:**
| Acción | Comando |
|--------|---------|
| Crear | `POST /roles` |
| Editar | `PUT /roles/:id` |
| Duplicar | `POST /roles/:id/duplicate` |
| Eliminar | `DELETE /roles/:id` |
| Exportar | `GET /roles/export` |

---

### 2.5 Permission Matrix

| Aspecto | Detalle |
|---------|---------|
| **Página** | PermissionMatrix |
| **Dominio** | IAM |
| **Propósito** | Asignar permisos a roles |
| **Tipo operación** | COMMAND |

| Acción | Comando |
|--------|---------|
| Toggle checkbox | `PATCH /roles/:id/permissions` |
| Guardar matriz completa | `PUT /permissions/matrix` |
| Exportar | `GET /permissions/export` |

---

### 2.6 Product

| Aspecto | Detalle |
|---------|---------|
| **Página** | ProductCreate (4-step wizard) |
| **Dominio** | Catálogo |
| **Propósito** | Crear producto con variantes y media |
| **Tipo operación** | CREATE (multi-paso) |

**Step 1 — Basic Info:**
| Campo | Tipo | Requerido |
|-------|------|-----------|
| name | text | Sí |
| sku | text | Sí (único) |
| weight | number | No |
| collection | select | No FK → collections |
| category | select | No FK → categories |
| tags | tags input (chips) | No |
| description | rich text | No |

**Step 2 — Multimedia:**
| Campo | Tipo | Requerido |
|-------|------|-----------|
| images[] | file (JPG/PNG/MP4 ≤50MB) | No |

**Step 3 — Variants:**
| Campo | Tipo |
|-------|------|
| variants[] | table: status, color, size, price, stock |

**Step 4 — SEO:**
| Campo | Tipo |
|-------|------|
| seo_title | text |
| seo_keywords | text |
| seo_description | text (≤160 chars) |

**Órdenes:**
| Acción | Comando |
|--------|---------|
| Guardar borrador | `POST /products?status=draft` |
| Publicar | `POST /products/:id/publish` |
| Aplicar plantilla AI | `POST /products/ai-template` |

**Entidad afectada:** Product + ProductVariant + ProductMedia + Tag

---

### 2.7 Product List (Bulk Operations)

| Acción | Comando |
|--------|---------|
| Bulk: cambiar estado | `PATCH /products/batch/status` |
| Bulk: mover a colección | `PATCH /products/batch/collection` |
| Bulk: eliminar | `DELETE /products/batch` |
| Import CSV | `POST /products/import` |
| Export | `GET /products/export` |

---

### 2.8 Variant

| Aspecto | Detalle |
|---------|---------|
| **Página** | VariantCreate (4-tab) |
| **Dominio** | Catálogo |
| **Propósito** | Crear variante para producto existente |
| **Tipo operación** | CREATE |

**Tab 1 — General Info:**
| Campo | Tipo | Requerido |
|-------|------|-----------|
| sku | text | Sí |
| parent_product | select | Sí (FK) |
| season | select | No FK → seasons |
| collection | text | No |
| status | radio | Sí |

**Tab 2 — Technical Specs:**
| Campo | Tipo |
|-------|------|
| material | select FK → fiber_materials |
| weight_g_m2 | number |
| composition | textarea |
| dimensions | text |
| thread_twist | text |

**Tab 3 — Visual Attributes:**
| Campo | Tipo |
|-------|------|
| color | color picker |
| color_name | text |
| size | button grid FK → sizes |
| pattern | select |

**Tab 4 — Care & Media:**
| Campo | Tipo |
|-------|------|
| care_items[] | toggle icons |
| images[] | upload gallery |

**Órdenes:**
| Acción | Comando |
|--------|---------|
| Crear | `POST /variants` |
| Inline edit (stock) | `PATCH /variants/:id/stock` |
| Inline edit (price) | `PATCH /variants/:id/price` |
| Inline edit (sku) | `PATCH /variants/:id/sku` |
| Duplicar | `POST /variants/:id/duplicate` |
| Eliminar | `DELETE /variants/:id` |
| Bulk: price/stock/status | `PATCH /variants/batch` |
| Generar variantes | `POST /variants/generate` |
| Exportar | `GET /variants/export` |

---

### 2.9 Media

| Aspecto | Detalle |
|---------|---------|
| **Página** | ProductMedia |
| **Dominio** | Catálogo |
| **Propósito** | Gestionar assets multimedia de producto |
| **Tipo operación** | CREATE / UPDATE / DELETE |

| Acción | Comando |
|--------|---------|
| Upload | `POST /products/:id/media` |
| Update metadata | `PUT /media/:id` |
| Optimize | `POST /media/:id/optimize` |
| Toggle visibility | `PATCH /media/:id/visibility` |
| Set as principal | `PATCH /media/:id/principal` |
| Delete | `DELETE /media/:id` |

---

### 2.10 Client (CRM)

| Aspecto | Detalle |
|---------|---------|
| **Página** | ClientCreate (6-tab form) |
| **Dominio** | CRM |
| **Propósito** | Crear cliente corporativo |
| **Tipo operación** | CREATE |

| Campo | Tipo | Requerido |
|-------|------|-----------|
| name | text | Sí |
| document_type | select | Sí (RUC/DNI/Pasaporte/CE) |
| document_number | text | Sí |
| email | email | No |
| phone | tel | No |
| website | url | No |
| street | text | No |
| city | text | No |
| country | select | No |
| postal_code | text | No |
| client_type | radio | Sí (Mayorista/Minorista/Corporativo) |
| assigned_seller | select | No FK → users |
| internal_notes | textarea | No |
| status | toggle | — (Activo/Inactivo) |
| credit_limit | number | No |
| avatar | file | No |

**Órdenes:**
| Acción | Comando |
|--------|---------|
| Crear | `POST /clients` |
| Editar | `PUT /clients/:id` |
| Cambiar estado | `PATCH /clients/:id/status` |
| Exportar | `GET /clients/export` |

#### Client Profile (sub-operaciones)

| Acción | Comando |
|--------|---------|
| Agregar nota | `POST /clients/:id/notes` |
| Contactar | (mailto/tel) |
| Nuevo pedido | `POST /orders?client_id=:id` |

---

### 2.11 Order

| Aspecto | Detalle |
|---------|---------|
| **Página** | OrderDetail |
| **Dominio** | Pedidos |
| **Propósito** | Gestionar pedido existente |
| **Tipo operación** | PATCH / COMMAND |

| Acción | Comando |
|--------|---------|
| Cambiar estado | `PATCH /orders/:id/status` |
| Agregar nota | `POST /orders/:id/notes` |
| Contactar cliente | (acción UI → mailto) |
| Imprimir factura | `GET /orders/:id/invoice` |
| Exportar PDF | `GET /orders/:id/export` |

#### Order List (bulk)

| Acción | Comando |
|--------|---------|
| Bulk: cambiar estado | `PATCH /orders/batch/status` |
| Bulk: imprimir etiquetas | `POST /orders/batch/labels` |
| Import | `POST /orders/import` |
| Export | `GET /orders/export` |

#### Order Timeline

| Acción | Comando |
|--------|---------|
| Notificar cliente | `POST /orders/:id/notify` |
| Imprimir acta | `GET /orders/:id/report` |
| Filtrar eventos | (query params) |

---

### 2.12 Transaction

| Aspecto | Detalle |
|---------|---------|
| **Dominio** | Pagos |
| **Propósito** | Gestionar transacciones financieras |
| **Tipo operación** | COMMAND |

| Acción | Comando |
|--------|---------|
| Reembolsar | `POST /transactions/:id/refund` |
| Batch approval | `POST /transactions/batch-approve` |
| Export CSV | `GET /transactions/export` |

---

### 2.13 Stock / Inventory

#### Stock

| Acción | Comando |
|--------|---------|
| Ajustar stock | `POST /stock/:id/adjust` |
| Import | `POST /stock/import` |
| Export | `GET /stock/export` |

#### Movement

| Acción | Comando |
|--------|---------|
| Crear movimiento | `POST /movements` |
| Export | `GET /movements/export` |

#### Transfer

| Acción | Comando |
|--------|---------|
| Crear transferencia | `POST /transfers` |
| Cambiar estado | `PATCH /transfers/:id/status` |
| Imprimir guía | `GET /transfers/:id/guide` |

---

### 2.14 Campaign / Marketing

| Acción | Comando |
|--------|---------|
| Crear campaña | `POST /campaigns` |
| Editar campaña | `PUT /campaigns/:id` |
| Preview | `GET /campaigns/:id/preview` |
| Ver analytics | `GET /campaigns/:id/analytics` |
| Crear cupón | `POST /coupons` |
| Crear landing page | `POST /landing-pages` |

---

### 2.15 CMS Content

| Acción | Comando |
|--------|---------|
| Crear contenido | `POST /contents` |
| Editar contenido | `PUT /contents/:id` |
| Preview | `GET /contents/:id/preview` |
| Duplicar | `POST /contents/:id/duplicate` |
| Eliminar | `DELETE /contents/:id` |
| Bulk actions | `POST /contents/batch` |

---

### 2.16 Company Settings

| Aspecto | Detalle |
|---------|---------|
| **Página** | Settings |
| **Dominio** | Configuración |
| **Propósito** | Actualizar configuración de la empresa |
| **Tipo operación** | UPDATE |

| Campo | Tipo | Requerido |
|-------|------|-----------|
| logo | file (SVG/PNG/JPG ≤5MB) | No |
| legal_name | text | Sí |
| tax_id | text | Sí |
| industry | select | No |
| website | url | No |
| email | email | Sí |
| phone | tel | No |
| address | textarea | No |
| currency | select | Sí |
| timezone | select | Sí |
| language | select | Sí |

**Comando sugerido:** `PUT /settings/company`

---

### 2.17 Master Data

| Acción | Comando |
|--------|---------|
| Crear entidad | `POST /master-data/:type` |
| Gestionar entidad | `PUT /master-data/:type/:id` |
| Sincronizar todo | `POST /master-data/sync` |
| Ejecutar diagnóstico | `GET /master-data/diagnostic` |

---

### 2.18 Textile

| Acción | Comando |
|--------|---------|
| Crear variante textil | `POST /textile/variants` |
| Crear material | `POST /textile/materials` |
| Crear colección | `POST /textile/collections` |
| Import | `POST /textile/variants/import` |
| Export | `GET /textile/variants/export` |

---

### 2.19 Audit

| Acción | Comando |
|--------|---------|
| Exportar CSV/PDF | `GET /audit/export` |
| Generar reporte incidente | `POST /audit/report` |

---

## 3. Tienda — Formularios y Operaciones

### 3.1 Customer Login & Register

| Aspecto | Detalle |
|---------|---------|
| **Página** | Login (Tienda) |
| **Dominio** | Auth |
| **Propósito** | Login de cliente B2C |
| **Comando** | `POST /auth/login` |

| Campo | Requerido |
|-------|-----------|
| email | Sí |
| password | Sí |

| Aspecto | Detalle |
|---------|---------|
| **Página** | Register |
| **Dominio** | Auth |
| **Propósito** | Registro de nuevo cliente |
| **Comando** | `POST /auth/register` |

---

### 3.2 Profile Settings (Tienda)

| Aspecto | Detalle |
|---------|---------|
| **Página** | ProfileSettings |
| **Dominio** | Customer |
| **Propósito** | Actualizar perfil del cliente |
| **Comando** | `PUT /account/profile` |

| Campo | Tipo | Requerido |
|-------|------|-----------|
| first_name | text | Sí |
| last_name | text | Sí |
| email | email | Sí |
| phone | tel | No |
| language | select (es/en) | Sí |
| currency | select (USD/PEN) | Sí |
| comms | checkbox | — |

#### Password change

| Comando | `PUT /account/password` |
|---------|------------------------|

---

### 3.3 Addresses (Tienda)

| Aspecto | Detalle |
|---------|---------|
| **Página** | Addresses |
| **Dominio** | Customer |
| **Propósito** | CRUD de direcciones de envío |
| **Tipo operación** | CREATE / UPDATE / DELETE |

| Campo | Tipo | Requerido |
|-------|------|-----------|
| name | text | Sí |
| street | text | Sí |
| city | text | Sí |
| state | text | No |
| zip | text | No |
| country | select (12 países) | Sí |
| phone | tel | No |
| is_default | boolean | No |

**Órdenes:**
| Acción | Comando |
|--------|---------|
| Crear | `POST /account/addresses` |
| Editar | `PUT /account/addresses/:id` |
| Eliminar | `DELETE /account/addresses/:id` |
| Set default | `PATCH /account/addresses/:id/default` |

---

### 3.4 Wishlist

| Aspecto | Detalle |
|---------|---------|
| **Página** | Wishlist |
| **Dominio** | Customer |
| **Propósito** | Gestionar lista de deseos |
| **Tipo operación** | CREATE / DELETE |

| Acción | Comando |
|--------|---------|
| Agregar item | `POST /wishlist/items` |
| Mover al carrito | `POST /wishlist/items/:id/move-to-cart` |
| Eliminar item | `DELETE /wishlist/items/:id` |
| Compartir lista | `GET /wishlist/share` |

---

### 3.5 Cart & Checkout

| Aspecto | Detalle |
|---------|---------|
| **Dominio** | Ecommerce |
| **Propósito** | Gestión del carrito de compras |
| **Tipo operación** | CREATE / UPDATE / DELETE / COMMAND |

| Acción | Comando |
|--------|---------|
| Agregar al carrito | `POST /cart/items` |
| Actualizar cantidad | `PATCH /cart/items/:id` |
| Eliminar item | `DELETE /cart/items/:id` |
| Aplicar cupón | `POST /cart/coupon` |
| Remover cupón | `DELETE /cart/coupon` |
| Obtener shipping | `GET /cart/shipping-options` |

#### Checkout flow (COMMAND)

| Paso | Comando | Input |
|------|---------|-------|
| 1. Contact info | `PATCH /checkout/contact` | email, phone |
| 2. Shipping address | `PATCH /checkout/address` | address fields |
| 3. Place order | `POST /checkout/place` | — |
| 4. Process payment | `POST /checkout/payment` | card details |

---

### 3.6 Order (Customer)

| Acción | Comando |
|--------|---------|
| Ver historial | `GET /orders` |
| Ver detalle | `GET /orders/:id` |
| Rastrear pedido | `GET /orders/:id/tracking` |
| Descargar factura | `GET /orders/:id/invoice` |

---

## 4. Página Institucional — Formularios y Operaciones

### 4.1 Contact

| Aspecto | Detalle |
|---------|---------|
| **Página** | Contact |
| **Dominio** | Leads |
| **Propósito** | Enviar consulta de contacto |
| **Tipo operación** | CREATE |

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| name | text | Sí | No vacío |
| email | email | Sí | Formato email |
| subject | text | Sí | No vacío |
| message | textarea | Sí | No vacío |

**Comando sugerido:** `POST /contact`

---

### 4.2 Newsletter

| Aspecto | Detalle |
|---------|---------|
| **Dominio** | Marketing |
| **Propósito** | Suscribirse al newsletter |
| **Tipo operación** | CREATE |

| Campo | Tipo | Requerido |
|-------|------|-----------|
| email | email | Sí |

**Comando sugerido:** `POST /newsletter/subscribe`
**Comando secundario:** `DELETE /newsletter/unsubscribe?email=:email`

---

## 5. Matriz Completa de Operaciones

| # | Formulario | Entidad | Operación | Comando | Prioridad |
|---|-----------|---------|-----------|---------|-----------|
| 01 | Login (Dashboard) | User + Session | COMMAND | `POST /auth/login` | Crítica |
| 02 | Login (Tienda) | Customer + Session | COMMAND | `POST /auth/login` | Crítica |
| 03 | Register (Tienda) | Customer | CREATE | `POST /auth/register` | Alta |
| 04 | My Profile | User | UPDATE | `PUT /auth/profile` | Alta |
| 05 | My Password | User | UPDATE | `PUT /auth/password` | Alta |
| 06 | My Preferences | User | PATCH | `PATCH /auth/preferences` | Media |
| 07 | My Avatar | User | UPDATE | `POST /auth/avatar` | Baja |
| 08 | Close Sessions | Session | DELETE | `DELETE /auth/sessions` | Media |
| 09 | Create User | User | CREATE | `POST /users` | Alta |
| 10 | Update User | User | UPDATE | `PUT /users/:id` | Alta |
| 11 | Delete User | User | DELETE | `DELETE /users/:id` | Alta |
| 12 | Change User Status | User | PATCH | `PATCH /users/:id/status` | Alta |
| 13 | Create Role | Role | CREATE | `POST /roles` | Alta |
| 14 | Update Role | Role | UPDATE | `PUT /roles/:id` | Alta |
| 15 | Duplicate Role | Role | COMMAND | `POST /roles/:id/duplicate` | Media |
| 16 | Delete Role | Role | DELETE | `DELETE /roles/:id` | Alta |
| 17 | Save Permissions | RolePermission | UPDATE | `PUT /permissions/matrix` | Alta |
| 18 | Create Product | Product | CREATE | `POST /products` | Crítica |
| 19 | Publish Product | Product | COMMAND | `POST /products/:id/publish` | Alta |
| 20 | Bulk Product Status | Product | PATCH | `PATCH /products/batch/status` | Media |
| 21 | Bulk Product Collection | Product | PATCH | `PATCH /products/batch/collection` | Media |
| 22 | Bulk Delete Products | Product | DELETE | `DELETE /products/batch` | Alta |
| 23 | Import Products | Product | CREATE | `POST /products/import` | Alta |
| 24 | Create Variant | Variant | CREATE | `POST /variants` | Alta |
| 25 | Update Variant Stock | Variant | PATCH | `PATCH /variants/:id/stock` | Alta |
| 26 | Update Variant Price | Variant | PATCH | `PATCH /variants/:id/price` | Alta |
| 27 | Duplicate Variant | Variant | COMMAND | `POST /variants/:id/duplicate` | Media |
| 28 | Delete Variant | Variant | DELETE | `DELETE /variants/:id` | Alta |
| 29 | Generate Variants | Variant | COMMAND | `POST /variants/generate` | Alta |
| 30 | Upload Media | Media | CREATE | `POST /products/:id/media` | Alta |
| 31 | Update Media | Media | UPDATE | `PUT /media/:id` | Media |
| 32 | Delete Media | Media | DELETE | `DELETE /media/:id` | Alta |
| 33 | Create Client | Client | CREATE | `POST /clients` | Alta |
| 34 | Update Client | Client | UPDATE | `PUT /clients/:id` | Alta |
| 35 | Change Client Status | Client | PATCH | `PATCH /clients/:id/status` | Media |
| 36 | Add Client Note | ClientNote | CREATE | `POST /clients/:id/notes` | Media |
| 37 | Change Order Status | Order | PATCH | `PATCH /orders/:id/status` | Crítica |
| 38 | Add Order Note | Order | PATCH | `PATCH /orders/:id/notes` | Media |
| 39 | Bulk Order Status | Order | PATCH | `PATCH /orders/batch/status` | Media |
| 40 | Import Orders | Order | CREATE | `POST /orders/import` | Alta |
| 41 | Notify Customer | Order | COMMAND | `POST /orders/:id/notify` | Media |
| 42 | Refund Transaction | Transaction | COMMAND | `POST /transactions/:id/refund` | Alta |
| 43 | Adjust Stock | StockItem | COMMAND | `POST /stock/:id/adjust` | Crítica |
| 44 | Create Movement | Movement | CREATE | `POST /movements` | Alta |
| 45 | Create Transfer | Transfer | CREATE | `POST /transfers` | Alta |
| 46 | Update Transfer Status | Transfer | PATCH | `PATCH /transfers/:id/status` | Alta |
| 47 | Create Shipment | Shipment | CREATE | `POST /shipments` | Alta |
| 48 | Notify Shipment Delay | Shipment | COMMAND | `POST /shipments/:id/notify` | Media |
| 49 | Create Campaign | Campaign | CREATE | `POST /campaigns` | Alta |
| 50 | Create Coupon | Coupon | CREATE | `POST /coupons` | Media |
| 51 | Create Content | Content | CREATE | `POST /contents` | Alta |
| 52 | Update Content | Content | UPDATE | `PUT /contents/:id` | Alta |
| 53 | Duplicate Content | Content | COMMAND | `POST /contents/:id/duplicate` | Media |
| 54 | Delete Content | Content | DELETE | `DELETE /contents/:id` | Alta |
| 55 | Create Textile Variant | TextileVariant | CREATE | `POST /textile/variants` | Alta |
| 56 | Update Company Settings | CompanySetting | UPDATE | `PUT /settings/company` | Alta |
| 57 | Create Address (B2C) | Address | CREATE | `POST /account/addresses` | Alta |
| 58 | Update Address (B2C) | Address | UPDATE | `PUT /account/addresses/:id` | Alta |
| 59 | Delete Address (B2C) | Address | DELETE | `DELETE /account/addresses/:id` | Alta |
| 60 | Set Default Address | Address | PATCH | `PATCH /account/addresses/:id/default` | Media |
| 61 | Add to Wishlist | WishlistItem | CREATE | `POST /wishlist/items` | Media |
| 62 | Remove from Wishlist | WishlistItem | DELETE | `DELETE /wishlist/items/:id` | Media |
| 63 | Add to Cart | CartItem | CREATE | `POST /cart/items` | Crítica |
| 64 | Update Cart Qty | CartItem | PATCH | `PATCH /cart/items/:id` | Alta |
| 65 | Remove from Cart | CartItem | DELETE | `DELETE /cart/items/:id` | Alta |
| 66 | Apply Coupon | Cart | COMMAND | `POST /cart/coupon` | Media |
| 67 | Place Order | Order | COMMAND | `POST /checkout/place` | Crítica |
| 68 | Process Payment | Payment | COMMAND | `POST /checkout/payment` | Crítica |
| 69 | Submit Contact | ContactInquiry | CREATE | `POST /contact` | Media |
| 70 | Subscribe Newsletter | Newsletter | CREATE | `POST /newsletter/subscribe` | Baja |
| 71 | Update Profile (B2C) | Customer | UPDATE | `PUT /account/profile` | Alta |
| 72 | Change Password (B2C) | Customer | UPDATE | `PUT /account/password` | Alta |

---

## 6. Comandos de Negocio vs CRUD

| Tipo | Cantidad | Ejemplos |
|------|----------|----------|
| CREATE | 22 | Crear producto, cliente, usuario, orden |
| UPDATE / PUT | 12 | Actualizar perfil, settings, producto |
| PATCH | 14 | Cambiar status, stock, precio |
| DELETE | 8 | Eliminar producto, variante, rol, contenido |
| COMMAND | 16 | Publicar, cancelar, reembolsar, ajustar stock, generar variantes |

**Total: 72 operaciones de escritura.**

---

## 7. Resumen por Entidad

| Entidad | CREATE | UPDATE | PATCH | DELETE | COMMAND | Total |
|---------|--------|--------|-------|--------|---------|-------|
| User | 1 | 2 | 1 | 1 | 0 | 5 |
| Role | 1 | 1 | 0 | 1 | 1 | 4 |
| Permission | 0 | 1 | 0 | 0 | 0 | 1 |
| Product | 1 | 0 | 0 | 0 | 2 | 3 |
| Variant | 1 | 0 | 2 | 1 | 2 | 6 |
| Media | 1 | 1 | 0 | 1 | 0 | 3 |
| Client | 1 | 1 | 1 | 0 | 0 | 3 |
| ClientNote | 1 | 0 | 0 | 0 | 0 | 1 |
| Order | 0 | 0 | 1 | 0 | 4 | 5 |
| Transaction | 0 | 0 | 0 | 0 | 1 | 1 |
| StockItem | 0 | 0 | 0 | 0 | 1 | 1 |
| Movement | 1 | 0 | 0 | 0 | 0 | 1 |
| Transfer | 1 | 0 | 1 | 0 | 0 | 2 |
| Shipment | 1 | 0 | 0 | 0 | 1 | 2 |
| Campaign | 1 | 0 | 0 | 0 | 0 | 1 |
| Coupon | 1 | 0 | 0 | 0 | 0 | 1 |
| Content | 1 | 1 | 0 | 1 | 1 | 4 |
| CompanySetting | 0 | 1 | 0 | 0 | 0 | 1 |
| Address | 1 | 1 | 1 | 1 | 0 | 4 |
| WishlistItem | 1 | 0 | 0 | 1 | 0 | 2 |
| CartItem | 1 | 1 | 0 | 1 | 0 | 3 |
| Cart (coupon) | 0 | 0 | 0 | 0 | 1 | 1 |
| Customer | 1 | 2 | 0 | 0 | 0 | 3 |
| ContactInquiry | 1 | 0 | 0 | 0 | 0 | 1 |
| NewsletterSub | 1 | 0 | 0 | 0 | 0 | 1 |
| Auth (session) | 1 | 0 | 0 | 1 | 0 | 2 |
| TextileVariant | 1 | 0 | 0 | 0 | 0 | 1 |
| **Total** | **22** | **12** | **14** | **8** | **16** | **72** |

---

*Documento generado el 2026-07-10. 72 operaciones de escritura identificadas, 16 comandos de negocio.*
