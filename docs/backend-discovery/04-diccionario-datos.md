# Diccionario de Datos — ALPACART Backend

## 1. Convenciones

| Convención | Regla |
|------------|-------|
| **Timestamps** | Toda tabla incluye `created_at` y `updated_at` (TIMESTAMPTZ) |
| **Soft delete** | `deleted_at` (TIMESTAMPTZ, NULL), tablas: users, products, clients, content |
| **Audit trail** | `created_by` y `updated_by` como FK → users en tablas críticas |
| **Moneda** | NUMERIC(12,2) para montos, NUMERIC(5,2) para porcentajes |
| **IDs** | UUID primario, secuencial como business_key opcional |
| **Status** | VARCHAR(30) con CHECK constraint o ENUM PostgreSQL |
| **JSONB** | Para metadatos extendidos no normalizados |
| **Naming** | snake_case para columnas, singular para tablas |

---

## 2. Diccionario por Tabla

### 2.1 `users` — Usuarios del sistema

| # | Campo | Columna | Tipo frontend | Tipo PostgreSQL | Long | Nul | Req | UQ | Default | Ejemplo mock | Validaciones |
|---|-------|---------|--------------|-----------------|------|-----|-----|-----|---------|--------------|--------------|
| 1 | ID | `id` | number | UUID | — | No | Sí | Sí | gen_random_uuid() | 1 | — |
| 2 | Nombre | `name` | string | VARCHAR | 255 | No | Sí | No | — | "Mateo Quispe" | min(2), max(255) |
| 3 | Email | `email` | string | VARCHAR | 255 | No | Sí | Sí | — | "mateo.q@alpacart.com" | email format |
| 4 | Password | `password` | string | VARCHAR | 255 | No | Sí | No | — | "hash_bcrypt" | min(8), hash |
| 5 | Teléfono | `phone` | string | VARCHAR | 50 | Sí | No | No | — | "+51 900 000 000" | — |
| 6 | Employee ID | `employee_id` | string | VARCHAR | 50 | Sí | No | Sí | — | "ALP-0000" | — |
| 7 | Cargo | `position` | string | VARCHAR | 255 | Sí | No | No | — | "Supervisor de Planta" | — |
| 8 | Department ID | `department_id` | number | INTEGER | — | Sí | No | No | — | 1 | FK → departments |
| 9 | Location ID | `location_id` | number | INTEGER | — | Sí | No | No | — | 1 | FK → master_data |
| 10 | Role ID | `role_id` | number | INTEGER | — | No | Sí | No | — | 1 | FK → roles |
| 11 | Avatar | `avatar` | string (URL) | VARCHAR | 500 | Sí | No | No | — | "https://..." | URL format |
| 12 | Status | `status` | string | VARCHAR | 30 | No | Sí | No | 'active' | "Activo" | 'active','inactive','suspended' |
| 13 | Force password change | `force_password_change` | boolean | BOOLEAN | — | No | Sí | No | false | true | — |
| 14 | Last access | `last_access_at` | string (date) | TIMESTAMPTZ | — | Sí | No | No | — | "Hace 10 min" | — |
| 15 | Created at | `created_at` | — | TIMESTAMPTZ | — | No | Sí | No | NOW() | — | — |
| 16 | Updated at | `updated_at` | — | TIMESTAMPTZ | — | No | Sí | No | NOW() | — | — |
| 17 | Deleted at | `deleted_at` | — | TIMESTAMPTZ | — | Sí | No | No | NULL | — | Soft delete |

**Fuente:** `UserList.jsx`, `UserCreate.jsx`, `MyProfile.jsx`
**Sensibilidad:** ALTA (password, email, nombre)

---

### 2.2 `roles` — Roles

| # | Campo | Columna | Tipo frontend | PostgreSQL | Long | Nul | Req | UQ | Default | Ejemplo |
|---|-------|---------|--------------|-----------|------|-----|-----|-----|---------|---------|
| 1 | ID | `id` | number | INTEGER | — | No | Sí | Sí | auto | 1 |
| 2 | Nombre | `name` | string | VARCHAR | 255 | No | Sí | Sí | — | "Super Administrador" |
| 3 | Categoría | `category` | string | VARCHAR | 30 | No | No | No | — | "critico" |
| 4 | Descripción | `description` | string | TEXT | — | Sí | No | No | — | "Acceso total a todos los módulos..." |
| 5 | Status | `status` | string | VARCHAR | 30 | No | Sí | No | 'active' | "Activo" |

**Categorías válidas:** `'critico','operativo','administrativo','externo'`
**Fuente:** `RoleList.jsx`, `PermissionMatrix.jsx`

---

### 2.3 `permissions` — Permisos

| # | Campo | Columna | Tipo frontend | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|--------------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | number | INTEGER | — | No | Sí | Sí | 1 |
| 2 | Módulo | `module` | string | VARCHAR | 100 | No | Sí | No | "Inventory" |
| 3 | Acción | `action` | string | VARCHAR | 100 | No | Sí | No | "View Stock levels" |
| 4 | Nombre | `name` | string | VARCHAR | 255 | No | Sí | Sí | "inventory.view_stock" |
| 5 | Descripción (ES) | `description` | string | VARCHAR | 500 | Sí | No | No | "Visualización global de existencias" |

**Fuente:** `PermissionMatrix.jsx`

---

### 2.4 `role_permissions`

| # | Campo | Columna | PostgreSQL | Nul | Req | FK |
|---|-------|---------|-----------|-----|-----|----|
| 1 | ID | `id` | INTEGER | No | Sí | — |
| 2 | Role ID | `role_id` | INTEGER | No | Sí | → roles.id |
| 3 | Permission ID | `permission_id` | INTEGER | No | Sí | → permissions.id |
| 4 | Created at | `created_at` | TIMESTAMPTZ | No | Sí | — |

**Fuente:** `PermissionMatrix.jsx` (matriz 5 roles × 7 permisos)

---

### 2.5 `departments`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR | 100 | No | Sí | Sí | "IT & Sistemas" |

**Valores:** `'IT & Sistemas','Operaciones','Finanzas','Recursos Humanos','Producción','Comercial','Almacén Central'`
**Fuente:** `UserList.jsx` (filtro departamento), `UserCreate.jsx`

---

### 2.6 `sessions`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | 1 |
| 2 | User ID | `user_id` | INTEGER | — | No | Sí | 1 |
| 3 | Token | `token` | VARCHAR | 500 | No | Sí | "jwt..." |
| 4 | Device name | `device_name` | VARCHAR | 255 | Sí | No | "MacBook Pro - Lima, PE" |
| 5 | Platform | `platform` | VARCHAR | 50 | Sí | No | "macOS" |
| 6 | Browser | `browser` | VARCHAR | 100 | Sí | No | "Chrome v120" |
| 7 | IP address | `ip_address` | VARCHAR | 45 | Sí | No | "192.168.1.45" |
| 8 | Last activity | `last_activity_at` | TIMESTAMPTZ | — | Sí | No | "2024-10-24T09:42:00Z" |
| 9 | Expires at | `expires_at` | TIMESTAMPTZ | — | No | Sí | — |
| 10 | Created at | `created_at` | TIMESTAMPTZ | — | No | Sí | — |

**Fuente:** `MyProfile.jsx` (2 sesiones activas)

---

### 2.7 `products`

| # | Campo | Columna | Tipo frontend | PostgreSQL | Long | Nul | Req | UQ | Default | Ejemplo |
|---|-------|---------|--------------|-----------|------|-----|-----|-----|---------|---------|
| 1 | ID | `id` | number | UUID | — | No | Sí | Sí | gen_random_uuid() | 1 |
| 2 | SKU | `sku` | string | VARCHAR | 50 | No | Sí | Sí | — | "ALP-INV-24-001" |
| 3 | Nombre | `name` | string | VARCHAR | 255 | No | Sí | No | — | "Manta Imperial Gold" |
| 4 | Descripción | `description` | string | TEXT | — | Sí | No | No | — | "Manta confeccionada..." |
| 5 | Material | `material` | string | VARCHAR | 255 | Sí | No | No | — | "100% Baby Alpaca" |
| 6 | Category ID | `category_id` | number | INTEGER | — | Sí | No | No | — | 1 |
| 7 | Collection ID | `collection_id` | number | INTEGER | — | Sí | No | No | — | 1 |
| 8 | Peso (g) | `weight` | number | NUMERIC(8,2) | — | Sí | No | No | — | 500.00 |
| 9 | Status | `status` | string | VARCHAR | 30 | No | Sí | No | 'draft' | "Activo" |
| 10 | Tags | `tags` | string[] | JSONB | — | Sí | No | No | '[]' | ["Premium","Alpaca Baby"] |
| 11 | Created by | `created_by` | — | INTEGER | — | No | Sí | No | — | 1 |
| 12 | Published at | `published_at` | — | TIMESTAMPTZ | — | Sí | No | No | NULL | — |
| 13 | Created at | `created_at` | date string | TIMESTAMPTZ | — | No | Sí | No | NOW() | "12 Oct, 2023" |
| 14 | Deleted at | `deleted_at` | — | TIMESTAMPTZ | — | Sí | No | No | NULL | — |

**Status válidos:** `'draft','active','hidden','discontinued'`
**Fuente:** `ProductList.jsx` (8 registros), `ProductCreate.jsx`, `ProductDetail.jsx`

---

### 2.8 `product_variants`

| # | Campo | Columna | Tipo frontend | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|--------------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | number | UUID | — | No | Sí | Sí | 1 |
| 2 | Product ID | `product_id` | number | INTEGER | — | No | Sí | No | 1 |
| 3 | SKU | `sku` | string | VARCHAR | 50 | No | Sí | Sí | "ALP-MIG-GOLD-ST" |
| 4 | Código interno | `code` | string | VARCHAR | 50 | Sí | No | Sí | "784-001" |
| 5 | Color hex | `color_hex` | string | VARCHAR | 7 | Sí | No | No | "#D4AF37" |
| 6 | Color nombre | `color_name` | string | VARCHAR | 100 | Sí | No | No | "Dorado Inca" |
| 7 | Size ID | `size_id` | number | INTEGER | — | Sí | No | No | 1 |
| 8 | Material ID | `material_id` | number | INTEGER | — | Sí | No | No | 1 |
| 9 | Precio | `price` | number (decimal) | NUMERIC(12,2) | — | No | Sí | No | 145.00 |
| 10 | Stock | `stock` | number | INTEGER | — | No | Sí | No | 45 |
| 11 | Status | `status` | string | VARCHAR | 30 | — | No | Sí | No | "Activo" |

**Status válidos:** `'active','hidden','out_of_stock','discontinued'`
**Fuente:** `VariantList.jsx` (6 registros), `VariantCreate.jsx`, `ProductDetail.jsx`

---

### 2.9 `categories`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR | 100 | No | Sí | No | "Ponchos" |
| 3 | Slug | `slug` | VARCHAR | 100 | No | Sí | Sí | "ponchos" |
| 4 | Descripción | `description` | TEXT | — | Sí | No | No | "Explora nuestra colección..." |
| 5 | Imagen | `image` | VARCHAR | 500 | Sí | No | No | "https://..." |
| 6 | Parent ID | `parent_id` | INTEGER | — | Sí | No | No | NULL |

**Slugs:** `'ponchos','chompas','bufandas','accesorios','abrigos','materials','nuevos','ofertas','women','men','home','all','bestsellers'`
**Fuente:** `Category.jsx`, `CategoryBento.jsx`, `ProductList.jsx`

---

### 2.10 `collections`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | VARCHAR | 20 | No | Sí | Sí | "AG-2024" |
| 2 | Nombre | `name` | VARCHAR | 255 | No | Sí | No | "Oro de los Andes" |
| 3 | Slug | `slug` | VARCHAR | 100 | No | Sí | Sí | "oro-de-los-andes" |
| 4 | Descripción | `description` | TEXT | — | Sí | No | No | "Inspirada en la primera luz..." |
| 5 | Imagen | `image` | VARCHAR | 500 | Sí | No | No | "https://..." |
| 6 | Piece count | `piece_count` | INTEGER | — | Sí | No | No | 42 |
| 7 | Season ID | `season_id` | INTEGER | — | Sí | No | No | 1 |
| 8 | Active | `active` | BOOLEAN | — | No | Sí | No | true |

**Fuente:** `CollectionGrid.jsx` (4 colecciones), `CatalogDashboard.jsx`

---

### 2.11 `product_media`

| # | Campo | Columna | Tipo frontend | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|--------------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | string | UUID | — | No | Sí | Sí | "asset-1" |
| 2 | Product ID | `product_id` | number | INTEGER | — | Sí | No | No | 1 |
| 3 | Variant ID | `variant_id` | number | INTEGER | — | Sí | No | No | null |
| 4 | URL | `url` | string (URL) | VARCHAR | 500 | No | Sí | No | "https://..." |
| 5 | Tipo | `type` | string | VARCHAR | 10 | No | Sí | No | "image" |
| 6 | Formato | `format` | string | VARCHAR | 10 | Sí | No | No | "jpg" |
| 7 | File size | `file_size` | string | VARCHAR | 20 | Sí | No | No | "4.2 MB" |
| 8 | Dimensiones | `dimensions` | string | VARCHAR | 30 | Sí | No | No | "2400x1600 px" |
| 9 | Alt text | `alt_text` | string | VARCHAR | 500 | Sí | No | No | "Manta dorada frontal" |
| 10 | Descripción | `description` | string | TEXT | — | Sí | No | No | "Fotografía de alta resolución..." |
| 11 | Is principal | `is_principal` | boolean | BOOLEAN | — | No | Sí | No | false |
| 12 | Visible | `visible` | boolean | BOOLEAN | — | No | Sí | No | true |
| 13 | Optimizado | `optimized` | boolean | BOOLEAN | — | No | Sí | No | false |
| 14 | Created at | `created_at` | — | TIMESTAMPTZ | — | No | Sí | No | NOW() |

**Tipos válidos:** `'image','video'`
**Formatos válidos:** `'jpg','png','mp4'`
**Fuente:** `ProductMedia.jsx` (4 assets)

---

### 2.12 `tags`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR | 100 | No | Sí | Sí | "Premium" |

**Fuente:** `ProductCreate.jsx` (tag input)

---

### 2.13 `clients`

| # | Campo | Columna | Tipo frontend | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|--------------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | number | UUID | — | No | Sí | Sí | 1 |
| 2 | Nombre | `name` | string | VARCHAR | 255 | No | Sí | No | "Andean Textiles Ltd." |
| 3 | Empresa | `company` | string | VARCHAR | 255 | Sí | No | No | "Exportaciones Peruanas S.A.C." |
| 4 | Email | `email` | string | VARCHAR | 255 | No | Sí | No | "contacto@andeantextiles.pe" |
| 5 | Teléfono | `phone` | string | VARCHAR | 50 | Sí | No | No | "+51 984 123 456" |
| 6 | Website | `website` | string | VARCHAR | 500 | Sí | No | No | "https://www.empresa.com" |
| 7 | Tipo documento | `document_type` | string | VARCHAR | 30 | Sí | No | No | "RUC" |
| 8 | Nro documento | `document_number` | string | VARCHAR | 30 | Sí | No | Sí | "20123456789" |
| 9 | Tipo cliente | `type` | string | VARCHAR | 30 | No | Sí | No | "Mayorista" |
| 10 | Status | `status` | string | VARCHAR | 30 | No | Sí | No | "Activo" |
| 11 | Assigned seller ID | `assigned_seller_id` | number | INTEGER | — | Sí | No | No | 1 |
| 12 | Límite crédito | `credit_limit` | — | NUMERIC(12,2) | — | Sí | No | No | 15000.00 |
| 13 | Payment terms | `payment_terms` | string | VARCHAR | 100 | Sí | No | No | "Net 30" |
| 14 | LTV | `ltv` | — | NUMERIC(12,2) | — | Sí | No | No | 42850.00 |
| 15 | Avg ticket | `avg_ticket` | — | NUMERIC(10,2) | — | Sí | No | No | 1240.00 |
| 16 | Notas internas | `internal_notes` | string | TEXT | — | Sí | No | No | "Cliente con potencial de exportación..." |
| 17 | Created at | `created_at` | — | TIMESTAMPTZ | — | No | Sí | No | NOW() |
| 18 | Deleted at | `deleted_at` | — | TIMESTAMPTZ | — | Sí | No | No | NULL |

**Tipos cliente:** `'mayorista','minorista','corporativo'`
**Status:** `'active','inactive','vip'`
**Documentos:** `'RUC','DNI','Pasaporte','Carné_de_Extranjería'`
**Fuente:** `ClientList.jsx` (5 registros), `ClientCreate.jsx`, `ClientProfile.jsx`

---

### 2.14 `client_addresses`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | Sí | 1 |
| 2 | Client ID | `client_id` | INTEGER | — | No | Sí | No | 1 |
| 3 | Tipo | `type` | VARCHAR | 20 | No | Sí | No | "principal" |
| 4 | Calle | `street` | VARCHAR | 255 | No | Sí | No | "Av. Principal 123" |
| 5 | Ciudad | `city` | VARCHAR | 100 | No | Sí | No | "Lima" |
| 6 | Estado | `state` | VARCHAR | 100 | Sí | No | No | "Lima" |
| 7 | País | `country` | VARCHAR | 100 | No | Sí | No | "Perú" |
| 8 | Código postal | `postal_code` | VARCHAR | 20 | Sí | No | No | "15001" |
| 9 | Default | `is_default` | BOOLEAN | — | No | Sí | No | false |

**Tipos:** `'principal','billing','shipping'`
**Fuente:** `ClientProfile.jsx`

---

### 2.15 `client_payment_methods`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | 1 |
| 2 | Client ID | `client_id` | INTEGER | — | No | Sí | 1 |
| 3 | Marca | `brand` | VARCHAR | 50 | No | Sí | "VISA" |
| 4 | Últimos 4 | `last4` | VARCHAR | 4 | No | Sí | "4242" |
| 5 | Exp mes | `exp_month` | INTEGER | — | No | Sí | 12 |
| 6 | Exp año | `exp_year` | INTEGER | — | No | Sí | 2026 |
| 7 | Default | `is_default` | BOOLEAN | — | No | Sí | false |

**Fuente:** `ClientProfile.jsx`

---

### 2.16 `client_notes`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Client ID | `client_id` | INTEGER | No | Sí | 1 |
| 3 | User ID | `user_id` | INTEGER | No | Sí | 1 |
| 4 | Content | `content` | TEXT | No | Sí | "Cliente interesado en nuevos productos..." |
| 5 | Created at | `created_at` | TIMESTAMPTZ | No | Sí | NOW() |

**Fuente:** `ClientProfile.jsx` (quick note + timeline)

---

### 2.17 `customers`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | UUID | — | No | Sí | Sí | — |
| 2 | User ID | `user_id` | INTEGER | — | Sí | No | Sí | null |
| 3 | First name | `first_name` | VARCHAR | 100 | No | Sí | No | "Julianne" |
| 4 | Last name | `last_name` | VARCHAR | 100 | No | Sí | No | "Moore" |
| 5 | Email | `email` | VARCHAR | 255 | No | Sí | Sí | "julianne@alpacart.com" |
| 6 | Password | `password` | VARCHAR | 255 | No | Sí | No | hash |
| 7 | Teléfono | `phone` | VARCHAR | 50 | Sí | No | No | "+1 (555) 000-0000" |
| 8 | Idioma | `language` | VARCHAR | 5 | No | Sí | No | 'es' |
| 9 | Moneda | `currency` | VARCHAR | 5 | No | Sí | No | 'PEN' |
| 10 | Marketing comms | `comms` | BOOLEAN | — | No | Sí | No | true |
| 11 | Loyalty tier | `loyalty_tier` | VARCHAR | 50 | Sí | No | No | "Heritage" |
| 12 | Loyalty points | `loyalty_points` | INTEGER | — | Sí | No | No | 1240 |
| 13 | Email verified at | `email_verified_at` | TIMESTAMPTZ | — | Sí | No | No | NULL |
| 14 | Created at | `created_at` | TIMESTAMPTZ | — | No | Sí | No | NOW() |

**Fuente:** `Account.jsx`, `ProfileSettings.jsx`, `Login.jsx`

---

### 2.18 `customer_addresses`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | 1 |
| 2 | Customer ID | `customer_id` | INTEGER | — | No | Sí | 1 |
| 3 | Nombre | `name` | VARCHAR | 255 | No | Sí | "Julianne Moore" |
| 4 | Calle | `street` | VARCHAR | 255 | No | Sí | "Av. Principal 123" |
| 5 | Ciudad | `city` | VARCHAR | 100 | No | Sí | "Lima" |
| 6 | Estado | `state` | VARCHAR | 100 | Sí | No | "Lima" |
| 7 | Código postal | `zip` | VARCHAR | 20 | Sí | No | "15001" |
| 8 | País | `country` | VARCHAR | 100 | No | Sí | "Perú" |
| 9 | Teléfono | `phone` | VARCHAR | 50 | Sí | No | "+51 999 888 777" |
| 10 | Default | `is_default` | BOOLEAN | — | No | Sí | true |

**Fuente:** `Addresses.jsx` (2 registros), `Checkout.jsx` (AddressForm)

---

### 2.19 `wishlist_items`

| # | Campo | Columna | PostgreSQL | Nul | Req | FK |
|---|-------|---------|-----------|-----|-----|----|
| 1 | ID | `id` | INTEGER | No | Sí | — |
| 2 | Customer ID | `customer_id` | INTEGER | No | Sí | → customers.id |
| 3 | Product ID | `product_id` | INTEGER | No | Sí | → products.id |
| 4 | Variant ID | `variant_id` | INTEGER | Sí | No | → product_variants.id |
| 5 | Created at | `created_at` | TIMESTAMPTZ | No | Sí | — |

**Fuente:** `WishlistGrid.jsx`, `wishlistStore.js`

---

### 2.20 `orders`

| # | Campo | Columna | Tipo frontend | PostgreSQL | Nul | Req | UQ | Ejemplo |
|---|-------|---------|--------------|-----------|------|-----|-----|---------|
| 1 | ID | `id` | — | UUID | — | No | Sí | Sí | — |
| 2 | Order number | `order_number` | string | VARCHAR | 30 | No | Sí | Sí | "ORD-2024-0892" |
| 3 | Customer ID | `customer_id` | — | INTEGER | — | Sí | No | No | null |
| 4 | Client ID | `client_id` | — | INTEGER | — | Sí | No | No | 1 |
| 5 | User ID (creator) | `user_id` | — | INTEGER | — | Sí | No | No | 1 |
| 6 | Status | `status` | string (enum) | VARCHAR | 30 | No | Sí | No | "pending" |
| 7 | Canal | `channel` | string | VARCHAR | 50 | Sí | No | No | "Showroom" |
| 8 | Agente | `agent` | string | VARCHAR | 100 | Sí | No | No | "Elena Rodriguez" |
| 9 | Subtotal | `subtotal` | number | NUMERIC(12,2) | No | Sí | No | 0.00 |
| 10 | Tax | `tax` | number | NUMERIC(12,2) | No | Sí | No | 0.00 |
| 11 | Shipping fee | `shipping_fee` | number | NUMERIC(12,2) | No | Sí | No | 0.00 |
| 12 | Descuento | `discount` | number | NUMERIC(12,2) | No | Sí | No | 0.00 |
| 13 | Total | `total` | number | NUMERIC(12,2) | No | Sí | No | 0.00 |
| 14 | Paid | `paid` | boolean | BOOLEAN | — | No | Sí | No | false |
| 15 | Paid at | `paid_at` | — | TIMESTAMPTZ | — | Sí | No | No | NULL |
| 16 | Notes | `notes` | string | TEXT | — | Sí | No | No | "Cliente solicitó empaque especial" |
| 17 | Placed at | `placed_at` | — | TIMESTAMPTZ | — | Sí | No | No | NOW() |
| 18 | Created at | `created_at` | — | TIMESTAMPTZ | — | No | Sí | No | NOW() |

**Status válidos:** `'pending','confirmed','paid','preparing','shipped','delivered','cancelled'`
**Fuente:** `OrderList.jsx` (6 registros), `OrderDetail.jsx`, `OrderDashboard.jsx`, `OrderHistory.jsx` (Tienda)

---

### 2.21 `order_items`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Order ID | `order_id` | INTEGER | No | Sí | 1 |
| 3 | Product ID | `product_id` | INTEGER | Sí | No | 1 |
| 4 | Variant ID | `variant_id` | INTEGER | Sí | No | 1 |
| 5 | Nombre | `name` | VARCHAR(255) | No | Sí | "Chunky Alpaca Sweater" |
| 6 | SKU | `sku` | VARCHAR(50) | No | Sí | "ALP-SWT-SND-M" |
| 7 | Variante | `variant` | VARCHAR(255) | Sí | No | "Color: Sand \| Size: M" |
| 8 | Cantidad | `qty` | INTEGER | No | Sí | 2 |
| 9 | Precio unitario | `unit_price` | NUMERIC(12,2) | No | Sí | 420.00 |
| 10 | Total | `total` | NUMERIC(12,2) | No | Sí | 840.00 |

**Fuente:** `OrderDetail.jsx` (2 items), `Thanks.jsx` (Tienda)

---

### 2.22 `order_events`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Order ID | `order_id` | INTEGER | No | Sí | 1 |
| 3 | Tipo | `type` | VARCHAR(30) | No | Sí | "created" |
| 4 | Título | `title` | VARCHAR(255) | No | Sí | "Pedido Creado" |
| 5 | Descripción | `description` | TEXT | Sí | No | "Pedido registrado por Elena Rodriguez" |
| 6 | Actor ID | `actor_id` | INTEGER | Sí | No | 1 |
| 7 | Metadatos | `metadata` | JSONB | Sí | No | {"signature": "..."} |
| 8 | Created at | `created_at` | TIMESTAMPTZ | No | Sí | "2024-10-24T10:24:00Z" |

**Tipos válidos:** `'created','confirmed','paid','preparing','shipped','transit','delivered','returned','cancelled'`
**Fuente:** `OrderTimeline.jsx` (9 eventos), `OrderDetail.jsx`

---

### 2.23 `order_documents`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Order ID | `order_id` | INTEGER | No | Sí | 1 |
| 3 | Tipo | `type` | VARCHAR(30) | No | Sí | "invoice" |
| 4 | Nombre | `name` | VARCHAR(255) | No | Sí | "Factura_ORD-2024-0892.pdf" |
| 5 | URL | `url` | VARCHAR(500) | No | Sí | "/docs/invoices/..." |
| 6 | Created at | `created_at` | TIMESTAMPTZ | No | Sí | NOW() |

**Tipos:** `'invoice','packing_list','label','other'`
**Fuente:** `OrderDetail.jsx`

---

### 2.24 `transactions`

| # | Campo | Columna | Tipo frontend | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|--------------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | — | UUID | — | No | Sí | Sí | — |
| 2 | Transaction ID | `transaction_id` | string | VARCHAR | 50 | No | Sí | Sí | "PAY-9921" |
| 3 | Order ID | `order_id` | string | INTEGER | — | No | Sí | No | 1 |
| 4 | Client/Customer | `payable_id` | — | INTEGER | — | Sí | No | No | 1 |
| 5 | Payable type | `payable_type` | — | VARCHAR | 30 | — | No | Sí | No | "client" |
| 6 | Stripe ID | `stripe_id` | string | VARCHAR | 100 | Sí | No | No | "pi_3N9xJ2L9e1Wz" |
| 7 | Método | `method` | string | VARCHAR | 30 | No | Sí | No | "visa" |
| 8 | Monto | `amount` | string | NUMERIC(12,2) | — | No | Sí | No | 12450.00 |
| 9 | Moneda | `currency` | string | VARCHAR | 5 | No | Sí | No | "USD" |
| 10 | Status | `status` | string (enum) | VARCHAR | 30 | No | Sí | No | "succeeded" |
| 11 | Metadatos | `metadata` | — | JSONB | — | Sí | No | No | {"stripe_response": ...} |
| 12 | Created at | `created_at` | date string | TIMESTAMPTZ | — | No | Sí | No | "Today, 10:45 AM" |

**Métodos válidos:** `'visa','mastercard','amex','paypal','bank_transfer','cash'`
**Status válidos:** `'pending','succeeded','failed','refunded'`
**Fuente:** `TransactionList.jsx` (10 registros), `PaymentDashboard.jsx`

---

### 2.25 `transaction_refunds`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Transaction ID | `transaction_id` | INTEGER | No | Sí | 1 |
| 3 | Monto | `amount` | NUMERIC(12,2) | No | Sí | 12450.00 |
| 4 | Razón | `reason` | VARCHAR(500) | Sí | No | "Cliente solicitó cancelación" |
| 5 | Created by | `created_by` | INTEGER | No | Sí | 1 |
| 6 | Created at | `created_at` | TIMESTAMPTZ | No | Sí | NOW() |

**Fuente:** `TransactionList.jsx` (refund action)

---

### 2.26 `warehouses`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR | 255 | No | Sí | No | "Lima (Sede Central)" |
| 3 | Código | `code` | VARCHAR | 20 | No | Sí | Sí | "LIM" |
| 4 | Dirección | `address` | TEXT | — | Sí | No | No | "Av. Principal 123" |
| 5 | Ciudad | `city` | VARCHAR | 100 | Sí | No | No | "Lima" |
| 6 | Tipo | `type` | VARCHAR | 30 | No | Sí | No | "principal" |

**Valores:** `'Lima (Sede Central)','Cusco (Hilados)','Arequipa (Tintorería)','Puno (Acopio)'`
**Fuente:** `InventoryDashboard.jsx`, `StockList.jsx`

---

### 2.27 `stock_items`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Product ID | `product_id` | INTEGER | Sí | No | 1 |
| 3 | Variant ID | `variant_id` | INTEGER | Sí | No | 1 |
| 4 | Warehouse ID | `warehouse_id` | INTEGER | No | Sí | 1 |
| 5 | Cantidad | `quantity` | INTEGER | No | Sí | 42 |
| 6 | Reservado | `reserved` | INTEGER | No | Sí | 15 |
| 7 | Stock mínimo | `min_stock` | INTEGER | Sí | No | 50 |
| 8 | Stock máximo | `max_stock` | INTEGER | Sí | No | 200 |
| 9 | Last movement at | `last_movement_at` | TIMESTAMPTZ | Sí | No | "2 mins ago" |

**Fuente:** `StockList.jsx` (6 registros)

---

### 2.28 `stock_movements`

| # | Campo | Columna | Tipo frontend | PostgreSQL | Long | Nul | Req | Ejemplo |
|---|-------|---------|--------------|-----------|------|-----|-----|---------|
| 1 | ID | `id` | number | INTEGER | — | No | Sí | 1 |
| 2 | Movement number | `movement_number` | string | VARCHAR | 30 | No | Sí | "MOV-2024-0891" |
| 3 | Product ID | `product_id` | — | INTEGER | Sí | No | 1 |
| 4 | Variant ID | `variant_id` | — | INTEGER | Sí | No | null |
| 5 | Warehouse ID | `warehouse_id` | — | INTEGER | Sí | No | 1 |
| 6 | Tipo | `type` | string | VARCHAR | 30 | No | Sí | "Entrada" |
| 7 | Cantidad | `quantity` | number | NUMERIC(12,2) | No | Sí | 120.00 |
| 8 | Saldo | `balance` | number | NUMERIC(12,2) | No | Sí | 850.50 |
| 9 | Referencia | `reference` | string | VARCHAR | 100 | Sí | No | "OC-99281" |
| 10 | Razón | `reason` | string | TEXT | — | Sí | No | "Ingreso por producción lote #44" |
| 11 | Persona ID | `person_id` | — | INTEGER | Sí | No | 1 |
| 12 | Metadatos | `metadata` | — | JSONB | Sí | No | {"route": "Origen→Destino"} |
| 13 | Created at | `created_at` | date string | TIMESTAMPTZ | — | No | Sí | "24 Oct, 2023" |

**Tipos válidos:** `'ingreso','salida','ajuste','transferencia','reserva'`
**Fuente:** `KardexPage.jsx` (5), `MovementList.jsx` (5)

---

### 2.29 `warehouse_transfers`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Transfer number | `transfer_number` | VARCHAR(30) | No | Sí | "TR-2024-0892" |
| 3 | Origin warehouse ID | `origin_warehouse_id` | INTEGER | No | Sí | 1 |
| 4 | Dest warehouse ID | `destination_warehouse_id` | INTEGER | No | Sí | 2 |
| 5 | Status | `status` | VARCHAR(30) | No | Sí | "requested" |
| 6 | Responsible ID | `responsible_id` | INTEGER | Sí | No | 1 |
| 7 | Notas | `notes` | TEXT | Sí | No | "Transferencia urgente" |
| 8 | Created at | `created_at` | TIMESTAMPTZ | No | Sí | "24/05/2024 09:15" |

**Status válidos:** `'requested','authorized','transit','received','completed','cancelled','archived'`
**Fuente:** `TransferList.jsx` (8 registros)

---

### 2.30 `shipments`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | UUID | — | No | Sí | Sí | — |
| 2 | Waybill | `waybill` | VARCHAR | 50 | No | Sí | Sí | "ALPC-TR-88294" |
| 3 | Order ID | `order_id` | INTEGER | — | No | Sí | No | 1 |
| 4 | Transportista | `carrier` | VARCHAR | 100 | No | Sí | No | "DHL Express" |
| 5 | Carrier account | `carrier_account` | VARCHAR | 100 | Sí | No | No | "ACC-12345" |
| 6 | Status | `status` | VARCHAR | 30 | No | Sí | No | "transit" |
| 7 | Origen | `origin_city` | VARCHAR | 100 | Sí | No | No | "Lima, PE" |
| 8 | Destino | `destination_city` | VARCHAR | 100 | Sí | No | No | "New York, US" |
| 9 | Despachado at | `dispatched_at` | TIMESTAMPTZ | — | Sí | No | No | "Oct 12, 2023" |
| 10 | Estimado at | `estimated_at` | TIMESTAMPTZ | — | Sí | No | No | "Oct 15, 2023" |
| 11 | Entregado at | `delivered_at` | TIMESTAMPTZ | — | Sí | No | No | NULL |
| 12 | Tracking data | `tracking_data` | JSONB | — | Sí | No | No | {"events": [...]} |

**Status válidos:** `'pending','transit','delayed','ready','delivered','returned'`
**Fuente:** `ShipmentList.jsx` (6 registros)

---

### 2.31 `shipment_events`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Shipment ID | `shipment_id` | INTEGER | No | Sí | 1 |
| 3 | Status | `status` | VARCHAR(30) | No | Sí | "in_transit" |
| 4 | Ubicación | `location` | VARCHAR(255) | Sí | No | "Hub Miami" |
| 5 | Descripción | `description` | TEXT | Sí | No | "Paquete en centro de distribución" |
| 6 | Timestamp | `timestamp` | TIMESTAMPTZ | No | Sí | "2024-10-14T10:30:00Z" |

**Fuente:** `LogisticsDashboard.jsx` (activity feed)

---

### 2.32 `carriers`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR | 100 | No | Sí | Sí | "DHL Express" |
| 3 | Código | `code` | VARCHAR | 20 | No | Sí | Sí | "DHL" |
| 4 | Active | `active` | BOOLEAN | — | No | Sí | No | true |

**Fuente:** `ShipmentList.jsx`, `LogisticsDashboard.jsx`

---

### 2.33 `campaigns`

| # | Campo | Columna | Tipo frontend | PostgreSQL | Long | Nul | Req | Ejemplo |
|---|-------|---------|--------------|-----------|------|-----|-----|---------|
| 1 | ID | `id` | — | UUID | — | No | Sí | — |
| 2 | Nombre | `name` | string | VARCHAR | 255 | No | Sí | "Lanzamiento Invierno '24" |
| 3 | Tipo | `type` | string | VARCHAR | 50 | No | Sí | "seasonal" |
| 4 | Canal | `channel` | string | VARCHAR | 50 | Sí | No | "EMAIL + WEB" |
| 5 | Presupuesto | `budget` | string | NUMERIC(12,2) | — | Sí | No | 12400.00 |
| 6 | Gastado | `spent` | string | NUMERIC(12,2) | — | Sí | No | 8400.00 |
| 7 | ROI | `roi` | string | VARCHAR | 20 | Sí | No | "4.2x" |
| 8 | Conversiones | `conversions` | — | INTEGER | — | Sí | No | 248 |
| 9 | Status | `status` | string (enum) | VARCHAR | 30 | No | Sí | "active" |
| 10 | Imagen | `image` | string | VARCHAR | 500 | Sí | No | "https://..." |
| 11 | Start date | `start_date` | — | DATE | — | Sí | No | "2024-10-01" |
| 12 | End date | `end_date` | — | DATE | — | Sí | No | "2024-11-15" |
| 13 | Created by | `created_by` | — | INTEGER | No | Sí | — | 1 |

**Status válidos:** `'draft','scheduled','active','paused','finished'`
**Fuente:** `CampaignList.jsx` (5 registros), `MarketingDashboard.jsx`

---

### 2.34 `coupons`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | Sí | 1 |
| 2 | Código | `code` | VARCHAR | 50 | No | Sí | Sí | "ALPA10" |
| 3 | Tipo | `type` | VARCHAR | 20 | No | Sí | No | "percentage" |
| 4 | Valor | `value` | NUMERIC(8,2) | — | No | Sí | No | 10.00 |
| 5 | Min purchase | `min_purchase` | NUMERIC(12,2) | — | Sí | No | No | 100.00 |
| 6 | Max uses | `max_uses` | INTEGER | — | Sí | No | No | 100 |
| 7 | Used count | `used_count` | INTEGER | — | No | Sí | No | 0 |
| 8 | Active | `active` | BOOLEAN | — | No | Sí | No | true |
| 9 | Expires at | `expires_at` | TIMESTAMPTZ | — | Sí | No | No | "2024-12-31" |

**Fuente:** `MarketingDashboard.jsx`, `Cart.jsx` (CouponBox)

---

### 2.35 `promotions`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR(255) | No | Sí | "Campaña Invierno 2024" |
| 3 | Tipo | `type` | VARCHAR(50) | Sí | No | "seasonal" |
| 4 | Discount type | `discount_type` | VARCHAR(20) | No | Sí | "percentage" |
| 5 | Discount value | `discount_value` | NUMERIC(8,2) | No | Sí | 15.00 |
| 6 | Product IDs | `product_ids` | JSONB | Sí | No | [1,2,3] |
| 7 | Starts at | `starts_at` | TIMESTAMPTZ | No | Sí | "2024-10-01" |
| 8 | Ends at | `ends_at` | TIMESTAMPTZ | No | Sí | "2024-11-30" |
| 9 | Active | `active` | BOOLEAN | No | Sí | true |

**Fuente:** `MarketingDashboard.jsx`, `CampaignList.jsx`

---

### 2.36 `contents`

| # | Campo | Columna | Tipo frontend | PostgreSQL | Long | Nul | Req | UQ | Ejemplo |
|---|-------|---------|--------------|-----------|------|-----|-----|-----|---------|
| 1 | ID | `id` | — | UUID | — | No | Sí | Sí | — |
| 2 | Título | `title` | string | VARCHAR | 255 | No | Sí | No | "Winter Alpaca Essentials 2024" |
| 3 | Slug | `slug` | string | VARCHAR | 255 | No | Sí | Sí | "/collections/winter-24" |
| 4 | Tipo | `type` | string | VARCHAR | 30 | No | Sí | No | "collection" |
| 5 | Body | `body` | string | TEXT | — | Sí | No | No | "Contenido HTML..." |
| 6 | Imagen | `image` | boolean (mock) | VARCHAR(500) | — | Sí | No | No | "https://..." |
| 7 | Author ID | `author_id` | — | INTEGER | No | Sí | No | 1 |
| 8 | Status | `status` | string (enum) | VARCHAR | 30 | No | Sí | No | "published" |
| 9 | Published at | `published_at` | — | TIMESTAMPTZ | — | Sí | No | No | "Oct 12, 2023" |
| 10 | Created at | `created_at` | date string | TIMESTAMPTZ | — | No | Sí | No | NOW() |

**Tipos válidos:** `'page','blog','banner','collection','promo','faq'`
**Status válidos:** `'published','draft','scheduled','review'`
**Fuente:** `ContentList.jsx` (7 registros), `CmsDashboard.jsx`

---

### 2.37 `fiber_materials`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR(100) | No | Sí | "Baby Alpaca" |
| 3 | Categoría | `category` | VARCHAR(50) | Sí | No | "Natural" |
| 4 | Micron rating | `micron_rating` | VARCHAR(20) | Sí | No | "16.5" |
| 5 | Origen | `origin` | VARCHAR(100) | Sí | No | "Puno, Perú" |
| 6 | Certificación | `certification` | VARCHAR(100) | Sí | No | "WPA 100%" |
| 7 | Descripción | `description` | TEXT | Sí | No | "Fibra premium de..." |
| 8 | Active | `active` | BOOLEAN | No | Sí | true |

**Fuente:** `TextileDashboard.jsx`, `CatalogFilters.jsx` (Institucional)

---

### 2.38 `textile_colors`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR(100) | No | Sí | "Dorado Inca" |
| 3 | Hex | `hex` | VARCHAR(7) | No | Sí | "#D4AF37" |
| 4 | Pantone | `pantone` | VARCHAR(30) | Sí | No | "PMS-871C" |
| 5 | Active | `active` | BOOLEAN | No | Sí | true |

**Fuente:** `TextileDashboard.jsx`, `VariantCreate.jsx`

---

### 2.39 `textile_sizes`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR(20) | No | Sí | "M" |
| 3 | Categoría | `category` | VARCHAR(30) | Sí | No | "adult" |
| 4 | Orden | `order` | INTEGER | No | Sí | 3 |

**Fuente:** `TextileDashboard.jsx`, `ProductDetail.jsx`, `VariantCreate.jsx`

---

### 2.40 `seasons`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR(100) | No | Sí | "Winter 2024" |
| 3 | Start month | `start_month` | INTEGER | Sí | No | 3 |
| 4 | End month | `end_month` | INTEGER | Sí | No | 6 |
| 5 | Active | `active` | BOOLEAN | No | Sí | true |

**Fuente:** `TextileDashboard.jsx`, `VariantCreate.jsx`

---

### 2.41 `audit_logs`

| # | Campo | Columna | Tipo frontend | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|--------------|-----------|-----|-----|---------|
| 1 | ID | `id` | — | BIGINT | No | Sí | 1 |
| 2 | User ID | `user_id` | — | INTEGER | Sí | No | 1 |
| 3 | Acción | `action` | string | VARCHAR | 100 | No | Sí | "Actualizó stock Alpaca Gold #22" |
| 4 | Módulo | `module` | string | VARCHAR | 50 | No | Sí | "Inventario" |
| 5 | Severidad | `severity` | string | VARCHAR | 20 | No | Sí | "info" |
| 6 | IP address | `ip_address` | string | VARCHAR | 45 | Sí | No | "192.168.1.45" |
| 7 | Dispositivo | `device` | string | VARCHAR | 100 | Sí | No | "Chrome / macOS" |
| 8 | Metadatos | `metadata` | — | JSONB | Sí | No | {"previous_value": ..., "new_value": ...} |
| 9 | Created at | `created_at` | date string | TIMESTAMPTZ | No | Sí | "24 Oct, 14:32:10" |

**Severidad:** `'exitosa','fallo','advertencia','info','critico'`
**Módulos:** `'Inventario','Ventas','IAM','Finanzas','Catálogos'`
**Fuente:** `AuditLog.jsx` (6 registros)

---

### 2.42 `company_settings`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | 1 |
| 2 | Logo | `logo` | VARCHAR | 500 | Sí | No | "/logo.png" |
| 3 | Legal name | `legal_name` | VARCHAR | 255 | No | Sí | "Alpacart Textiles S.A.C." |
| 4 | Tax ID | `tax_id` | VARCHAR | 30 | No | Sí | "20123456789" |
| 5 | Industria | `industry` | VARCHAR | 100 | Sí | No | "Textil" |
| 6 | Website | `website` | VARCHAR | 500 | Sí | No | "https://alpacart.com" |
| 7 | Email | `email` | VARCHAR | 255 | No | Sí | "info@alpacart.com" |
| 8 | Teléfono | `phone` | VARCHAR | 50 | Sí | No | "+51 84 123 456" |
| 9 | Dirección | `address` | TEXT | Sí | No | "Av. El Sol 123, Cusco" |
| 10 | Moneda | `primary_currency` | VARCHAR | 5 | No | Sí | "PEN" |
| 11 | Zona horaria | `default_timezone` | VARCHAR | 50 | No | Sí | "America/Lima" |
| 12 | Idioma | `system_language` | VARCHAR | 5 | No | Sí | "es" |

**Fuente:** `Settings.jsx`

---

### 2.43 `contact_inquiries`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR | 255 | No | Sí | "Juan Pérez" |
| 3 | Email | `email` | VARCHAR | 255 | No | Sí | "juan@example.com" |
| 4 | Asunto | `subject` | VARCHAR | 255 | No | Sí | "Consulta sobre productos" |
| 5 | Mensaje | `message` | TEXT | — | No | Sí | "Me gustaría recibir..." |
| 6 | Status | `status` | VARCHAR | 30 | No | Sí | "pending" |
| 7 | Created at | `created_at` | TIMESTAMPTZ | — | No | Sí | NOW() |

**Fuente:** `Contact.jsx` (Institucional), `ContactForm.jsx`

---

### 2.44 `newsletter_subscribers`

| # | Campo | Columna | PostgreSQL | Nul | Req | UQ | Ejemplo |
|---|-------|---------|-----------|-----|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | Sí | 1 |
| 2 | Email | `email` | VARCHAR(255) | No | Sí | Sí | "suscritor@email.com" |
| 3 | Fuente | `source` | VARCHAR(100) | Sí | No | No | "Home page" |
| 4 | Active | `active` | BOOLEAN | No | Sí | No | true |
| 5 | Subscribed at | `subscribed_at` | TIMESTAMPTZ | No | Sí | No | NOW() |

**Fuente:** `NewsletterForm.jsx` (Institucional), `Newsletter.jsx` (Tienda)

---

### 2.45 `faq_categories`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR(255) | No | Sí | "Productos" |
| 3 | Slug | `slug` | VARCHAR(100) | No | Sí | "productos" |
| 4 | Icono | `icon` | VARCHAR(50) | Sí | No | "checkroom" |
| 5 | Orden | `order` | INTEGER | No | Sí | 1 |

**Fuente:** `FAQ.jsx` (4 categorías: productos, materiales, envíos, cambios)

---

### 2.46 `faq_items`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Category ID | `category_id` | INTEGER | No | Sí | 1 |
| 3 | Pregunta | `question` | TEXT | No | Sí | "¿Cómo debo lavar mi prenda Alpacart?" |
| 4 | Respuesta | `answer` | TEXT | No | Sí | "Se recomienda lavado a mano..." |
| 5 | Orden | `order` | INTEGER | No | Sí | 1 |

**Fuente:** `FAQ.jsx` (~15 items en 4 categorías), `ContactFAQ.jsx`

---

### 2.47 `reviews`

| # | Campo | Columna | PostgreSQL | Long | Nul | Req | Ejemplo |
|---|-------|---------|-----------|------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | — | No | Sí | 1 |
| 2 | Product ID | `product_id` | INTEGER | — | No | Sí | 1 |
| 3 | Customer ID | `customer_id` | INTEGER | — | Sí | No | null |
| 4 | Autor | `author` | VARCHAR | 255 | No | Sí | "Julian V., Ginebra" |
| 5 | Rating | `rating` | INTEGER | — | No | Sí | 5 |
| 6 | Texto | `text` | TEXT | — | No | Sí | "The Heirloom is more than a coat..." |
| 7 | Tag | `tag` | VARCHAR | 100 | Sí | No | "Compra verificada" |
| 8 | Created at | `created_at` | TIMESTAMPTZ | — | No | Sí | "Oct 15, 2024" |

**Rating:** 1-5
**Fuente:** `ProductReviews.jsx` (2 reseñas)

---

### 2.48 `master_entity_types`

| # | Campo | Columna | PostgreSQL | Nul | Req | Ejemplo |
|---|-------|---------|-----------|-----|-----|---------|
| 1 | ID | `id` | INTEGER | No | Sí | 1 |
| 2 | Nombre | `name` | VARCHAR(100) | No | Sí | "Categorías" |
| 3 | Slug | `slug` | VARCHAR(50) | No | Sí | "categories" |
| 4 | Descripción | `description` | VARCHAR(255) | Sí | No | "Categorías de producto" |
| 5 | Record count (mock) | `record_count` | INTEGER | Sí | No | 1240 |

**Fuente:** `MasterData.jsx` (10 tipos)

---

## 3. Resumen de Tipos por Tabla

| Tipo PostgreSQL | Uso |
|----------------|-----|
| UUID | IDs primarios (users, products, orders, transactions, shipments, contents) |
| INTEGER | IDs secundarios, cantidades, FK simples |
| VARCHAR(n) | Strings con límite de longitud |
| TEXT | Strings largos (descripciones, notas, body) |
| NUMERIC(12,2) | Montos en moneda local |
| NUMERIC(8,2) | Porcentajes, pesos |
| BOOLEAN | Flags (isDefault, visible, active, paid, comms) |
| TIMESTAMPTZ | Fechas con zona horaria (created_at, updated_at, fechas de negocio) |
| DATE | Fechas sin hora (start_date, end_date) |
| JSONB | Metadatos, tags, tracking_data |
| ENUM | Via CHECK constraint o VARCHAR con validación |

**Regla de precisión monetaria:** NUMERIC(12,2) permite hasta $99,999,999.99.
**Regla de timestamps:** Siempre TIMESTAMPTZ (con zona horaria), nunca TIMESTAMP sin zona.

---

## 4. Resumen General

| Métrica | Valor |
|---------|-------|
| Tablas | 48 |
| Campos totales | ~420 |
| FK relationships | ~60 |
| JSONB fields | 8 |
| BOOLEAN flags | ~25 |
| Status enums | ~18 |
| Montos (NUMERIC) | ~20 |

---

*Documento generado el 2026-07-10. 48 tablas, ~420 campos documentados.*
