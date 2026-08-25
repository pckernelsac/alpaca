# Auditoría Crítica del Blueprint — ALPACART Backend

## 1. Resumen Ejecutivo

| Métrica | Declarado | Verificado | Diferencia | Estado |
|---------|-----------|------------|------------|--------|
| Módulos NestJS | 14 | **16** | +2 | **CORREGIDO** |
| Tablas PostgreSQL | 48 | **51** | +3 | **CORREGIDO** |
| Endpoints REST | 171 | 171 | 0 | ✅ |
| Seeds (archivos) | 29 | 29 | 0 | ✅ |
| Seeds (registros) | ~85 | **225** | +140 | **CORREGIDO** |
| Guards | 3 → 5 | 5 | +2 | ✅ |
| Interceptors | 3 → 4 | 4 | +1 | ✅ |
| Exception filters | 6 | 6 | 0 | ✅ |
| Fases implementación | 15 | 15 | 0 | ✅ |

---

## 2. Inconsistencias Encontradas

| ID | Severidad | Descripción | Ubicación | Corrección |
|----|-----------|-------------|-----------|------------|
| I01 | **ALTA** | Declara 48 tablas pero numera hasta 50 + product_tags = 51 reales | Resumen ejecutivo + sección 4 | 51 tablas, no 48 |
| I02 | **ALTA** | Declara 14 módulos pero diagrama incluye Analytics + Settings = 16 | Resumen ejecutivo vs sección 5 | 16 módulos, no 14 |
| I03 | **ALTA** | `product_media.variant_id → variants` — tabla `variants` no existe | Sección 4.2, tabla 12 | FK debe ser `product_variants` |
| I04 | **ALTA** | Seeds: declara ~85 registros pero la suma es 225 | Resumen ejecutivo vs tabla seeds | 225 registros, no ~85 |
| I05 | **MEDIA** | IAM dice "(5 tablas)" pero lista 7 (1-7) | Sección 4.1 header | Corregir a "(7 tablas)" |
| I06 | **MEDIA** | Config/Audit dice "(3 tablas)" pero lista 4 (47-50) | Sección 4.12 header | Corregir a "(4 tablas)" |
| I07 | **MEDIA** | Guards: resumen dice 3, sección 6 enumera 5 | Resumen ejecutivo vs sección 6 | Unificar en 5 guards |
| I08 | **MEDIA** | Interceptors: resumen dice 3, sección 7 enumera 4 | Resumen ejecutivo vs sección 7 | Unificar en 4 interceptors |
| I09 | **BAJA** | `orders.user_id → users` sin aclarar propósito | Sección 4.5 | user_id = creator/agent (B2B) |
| I10 | **BAJA** | `collections` seed 13 depende de seed 8 (seasons) pero puede ser opcional | Tabla seeds | season_id es nullable |
| I11 | **BAJA** | `orders.customer_id` y `client_id` ambos nullable sin CHECK | Sección 4.5 | Agregar CHECK: uno debe ser NOT NULL |
| I12 | **BAJA** | Sección 2 lista 14 módulos pero falta AnalyticsModule y SettingsModule en la lista | Sección 2 | Agregar ambos módulos |
| I13 | **BAJA** | `transactions.payable_id` sin `payable_type` | Sección 4.6 | Falta columna payable_type |
| I14 | **ALTA** | No existe tabla `carts` ni `cart_items` para el CartController | Sección 5 (diagrama) | **DECISIÓN ARQUITECTÓNICA PENDIENTE** |

---

## 3. Número Real de Tablas: 51

| # | Tabla | Módulo | PK | Seed |
|---|-------|--------|----|------|
| 1 | `users` | IAM | UUID | 5 |
| 2 | `roles` | IAM | INTEGER | 4 |
| 3 | `role_permissions` | IAM | INTEGER | 35 |
| 4 | `permissions` | IAM | INTEGER | 7 |
| 5 | `departments` | IAM | INTEGER | 5 |
| 6 | `sessions` | IAM | UUID | — |
| 7 | `password_resets` | IAM | INTEGER | — |
| 8 | `products` | Catálogo | UUID | 8 |
| 9 | `product_variants` | Catálogo | UUID | 12 |
| 10 | `categories` | Catálogo | INTEGER | 12 |
| 11 | `collections` | Catálogo | VARCHAR(20) | 4 |
| 12 | `product_media` | Catálogo | UUID | 4 |
| 13 | `tags` | Catálogo | INTEGER | 10 |
| — | `product_tags` | Catálogo | INTEGER | — |
| 14 | `clients` | CRM | UUID | 5 |
| 15 | `client_addresses` | CRM | INTEGER | 2 |
| 16 | `client_payment_methods` | CRM | INTEGER | 2 |
| 17 | `client_notes` | CRM | INTEGER | 3 |
| 18 | `customers` | Ecommerce | UUID | — |
| 19 | `customer_addresses` | Ecommerce | INTEGER | 2 |
| 20 | `wishlist_items` | Ecommerce | INTEGER | — |
| 21 | `reviews` | Ecommerce | INTEGER | 2 |
| 22 | `orders` | Pedidos | UUID | 6 |
| 23 | `order_items` | Pedidos | INTEGER | 10 |
| 24 | `order_events` | Pedidos | INTEGER | 15 |
| 25 | `order_documents` | Pedidos | INTEGER | 5 |
| 26 | `transactions` | Pagos | UUID | 10 |
| 27 | `transaction_refunds` | Pagos | INTEGER | 2 |
| 28 | `warehouses` | Inventario | INTEGER | 4 |
| 29 | `stock_items` | Inventario | INTEGER | 10 |
| 30 | `stock_movements` | Inventario | BIGINT | 10 |
| 31 | `warehouse_transfers` | Inventario | UUID | 8 |
| 32 | `warehouse_transfer_items` | Inventario | INTEGER | — |
| 33 | `shipments` | Logística | UUID | 6 |
| 34 | `shipment_events` | Logística | INTEGER | 10 |
| 35 | `carriers` | Logística | INTEGER | 3 |
| 36 | `campaigns` | Marketing | UUID | 9 |
| 37 | `coupons` | Marketing | INTEGER | — |
| 38 | `promotions` | Marketing | INTEGER | 3 |
| 39 | `contents` | CMS | UUID | 7 |
| 40 | `faq_categories` | CMS | INTEGER | 4 |
| 41 | `faq_items` | CMS | INTEGER | 15 |
| 42 | `hero_slides` | CMS | INTEGER | 3 |
| 43 | `gallery_images` | CMS | INTEGER | 4 |
| 44 | `fiber_materials` | Textil | INTEGER | 6 |
| 45 | `textile_colors` | Textil | INTEGER | 10 |
| 46 | `textile_sizes` | Textil | INTEGER | 8 |
| 47 | `seasons` | Textil | INTEGER | 4 |
| 48 | `company_settings` | Config | INTEGER | 1 |
| 49 | `audit_logs` | Auditoría | BIGINT | 6 |
| 50 | `contact_inquiries` | Leads | INTEGER | 3 |
| 51 | `newsletter_subscribers` | Marketing | INTEGER | 3 |

**Nota:** Se agregó `warehouse_transfer_items` (tabla faltante: las transferencias pueden tener múltiples productos).

---

## 4. Número Real de Módulos NestJS: 16

| # | Módulo | Responsabilidad | Tablas | Dependencias | Frontend |
|---|--------|----------------|--------|--------------|----------|
| 1 | **AuthModule** | Login, registro, JWT, sesiones | users, sessions, password_resets | — | D, T, I |
| 2 | **UsersModule** | CRUD usuarios, roles, permisos | roles, role_permissions, permissions, departments | Auth | D |
| 3 | **CatalogModule** | Productos, variantes, media, catálogos | products, product_variants, categories, collections, product_media, tags | Auth | D, T |
| 4 | **OrdersModule** | Pedidos, items, eventos, documentos | orders, order_items, order_events, order_documents | Auth, Catalog, Crm | D, T |
| 5 | **PaymentsModule** | Transacciones, reembolsos | transactions, transaction_refunds | Auth, Orders | D |
| 6 | **InventoryModule** | Stock, kardex, movimientos, transferencias | stock_items, stock_movements, warehouses, warehouse_transfers, warehouse_transfer_items | Auth, Catalog | D |
| 7 | **LogisticsModule** | Envíos, tracking, carriers | shipments, shipment_events, carriers | Auth, Orders | D |
| 8 | **CrmModule** | Clientes B2B, direcciones, notas | clients, client_addresses, client_payment_methods, client_notes | Auth | D |
| 9 | **CustomersModule** | Clientes B2C, wishlist, carrito, checkout | customers, customer_addresses, wishlist_items, reviews | Auth, Catalog | T |
| 10 | **MarketingModule** | Campañas, cupones, promociones | campaigns, coupons, promotions, newsletter_subscribers | Auth, Catalog | D |
| 11 | **CmsModule** | Contenido, FAQ, hero, galería | contents, faq_categories, faq_items, hero_slides, gallery_images | Auth | D, I |
| 12 | **TextileModule** | Fibras, colores, tallas, temporadas | fiber_materials, textile_colors, textile_sizes, seasons | Auth | D, T |
| 13 | **AuditModule** | Logs de auditoría, exportación | audit_logs | Auth | D |
| 14 | **AnalyticsModule** | KPIs, reportes, dashboards | (ninguna — consultas agregadas) | Todos | D |
| 15 | **SettingsModule** | Config empresa, datos maestros | company_settings, contact_inquiries | Auth | D |
| 16 | **ContactModule** | Contacto, newsletter | contact_inquiries, newsletter_subscribers | — | I, T |

---

## 5. Relaciones Corregidas

| ID | Error | Corrección |
|----|-------|------------|
| R01 | `product_media.variant_id → variants` | `product_media.variant_id → product_variants.id` |
| R02 | `transactions.payable_id` sin tipo | Agregar `transactions.payable_type VARCHAR(20)` con CHECK ('client','customer') |
| R03 | `orders.customer_id` y `client_id` ambos nullable sin restricción | Agregar CHECK: `(customer_id IS NOT NULL) OR (client_id IS NOT NULL)` |
| R04 | `orders.user_id` sin propósito documentado | Documentar: `user_id` = creator/agent (staff que creó el pedido). Usado en B2B. |
| R05 | `stock_items.quantity` puede ser negativo | Agregar CHECK: `quantity >= 0` |
| R06 | Faltaba `warehouse_transfer_items` | Agregar tabla para soportar múltiples ítems por transferencia |

---

## 6. Auditoría de Carrito y Checkout

| Aspecto | Evidencia | Decisión |
|---------|-----------|----------|
| Cart actual | Frontend: `cartStore` con persistencia localStorage (Tienda) | Frontend-managed |
| Checkout | POST /checkout/place convierte Cart → Order | Server endpoint |
| Cart persistence | No hay tabla `carts` ni `cart_items` en el blueprint | **DECISIÓN PENDIENTE** |

**Decisión arquitectónica recomendada:** Híbrido:
- **Visitantes:** carrito en localStorage (sin persistencia server)
- **Autenticados:** carrito persiste en `carts` y `cart_items` (PostgreSQL + Redis para sesión)
- **Checkout:** siempre migra a `orders` en server

**Tablas faltantes a agregar:**

| # | Tabla | PK | FKs |
|---|-------|----|-----|
| 52 | `carts` | UUID | customer_id → customers (nullable para invitados) |
| 53 | `cart_items` | INTEGER | cart_id → carts, product_id → products, variant_id → product_variants |

---

## 7. Auditoría B2B vs B2C

| Aspecto | B2B (Client) | B2C (Customer) | Ambos |
|---------|---------------|-----------------|-------|
| Tabla | `clients` | `customers` | — |
| Auth | No tiene login propio | Auth via login/register | — |
| Orders | `orders.client_id` | `orders.customer_id` | `orders.user_id` (agent) |
| Payments | `transactions.payable_type='client'` | `transactions.payable_type='customer'` | — |
| Dashboard CRM | ✓ (ClientList, ClientProfile) | — | — |
| Tienda | — | ✓ (Account, Addresses, Wishlist) | — |
| Pricing | Mayorista/Corporativo | Minorista | — |
| Seller assigned | ✓ (assigned_seller_id) | — | — |

**Veredicto:** La separación `clients` vs `customers` está **respaldada por evidencia sólida** en los frontends (Dashboard CRM vs Tienda Account). La solución con dos columnas en `orders` y tipo polimórfico en `transactions` es correcta siempre que se agreguen CHECK constraints.

---

## 8. Auditoría de Pagos

| Elemento | Problema | Solución |
|----------|----------|----------|
| `transactions.payable_id` | Falta `payable_type` | Agregar columna `payable_type VARCHAR(20) NOT NULL` |
| CHECK constraint | Puede haber payable_id sin type | `CHECK (payable_type IN ('client', 'customer'))` |
| FK constraint | PostgreSQL no puede FK polimórfica | No declarar FK. Usar aplicación/triggers. |

**Decisión:** Mantener polimorfismo para pagos. No es posible FK real en PostgreSQL. Documentar que la integridad se garantiza a nivel de aplicación (NestJS).

---

## 9. Auditoría de Inventario

| Elemento | Problema | Solución |
|----------|----------|----------|
| `stock_items.product_id` + `variant_id` | Ambos NULL permitiría fila inválida | `CHECK ((product_id IS NOT NULL) OR (variant_id IS NOT NULL))` |
| `stock_items.quantity` | Negativo invalidaría el dominio | `CHECK (quantity >= 0)` |
| `stock_movements.quantity` | Puede ser positivo o negativo | Usar INTEGER con signo (positivo = entrada, negativo = salida) |
| `warehouse_transfers` | Sin tabla de items | Agregar `warehouse_transfer_items` |

**Nueva tabla:** `warehouse_transfer_items`

| # | Tabla | PK | FKs | Campos |
|---|-------|----|-----|--------|
| 32b | `warehouse_transfer_items` | INTEGER | transfer_id → warehouse_transfers, product_id → products, variant_id → product_variants | quantity, lot_number? |

---

## 10. Auditoría de Pedidos

| Elemento | Problema | Solución |
|----------|----------|----------|
| `order_items` sin snapshot de precio históricos | Si cambia el precio del producto, el pedido histórico se pierde | `unit_price` ya es NUMERIC (persistido en el momento de la orden) ✅ |
| `order_items` sin nombre de producto histórico | Si se renombra el producto, el pedido histórico se pierde | `order_items.name` es VARCHAR(255) persistido ✅ |
| `order_items` sin SKU histórico | Idem | `order_items.sku` es VARCHAR(50) persistido ✅ |
| `order_items` sin impuestos por ítem | `orders.tax` es global, no por ítem | Agregar `order_items.tax_amount NUMERIC(12,2) DEFAULT 0` |
| `order_items` sin descuento por ítem | `orders.discount` es global | Agregar `order_items.discount_amount NUMERIC(12,2) DEFAULT 0` |

**Veredicto:** Los snapshots históricos están parcialmente implementados (name, sku, unit_price). Faltan tax y discount por ítem para facturación detallada.

---

## 11. Auditoría de Marketing

| Problema | Solución |
|----------|----------|
| `promotions` sin relación a productos | `promotions.product_ids` es JSONB (flexible, no normalizado) |
| `campaigns` sin relación a `coupons` o `promotions` | Tabla puente `campaign_items` opcional (sin evidencia directa en frontend) |
| `coupons` sin relación a `orders` | Tabla puente `order_coupons` o columna `coupon_id` en orders |

**Decisión:** Agregar `orders.coupon_id` nullable → `coupons.id` para rastrear qué cupón se usó en cada pedido.

---

## 12. Auditoría CMS e Institucional

| Necesidad | Cobertura | Gap |
|-----------|-----------|-----|
| FAQ dinámico (Institucional) | `faq_categories` + `faq_items` ✅ | — |
| Páginas institucionales | `contents` (type='page') ✅ | — |
| Hero slides | `hero_slides` ✅ | — |
| Galería de imágenes | `gallery_images` ✅ | — |
| Formulario de contacto | `contact_inquiries` ✅ | — |
| Newsletter | `newsletter_subscribers` ✅ | — |
| Banner promocional | `contents` (type='banner') ✅ | — |
| Testimonios dinámicos | No hay tabla `testimonials` | Testimonios hardcodeados en frontend (Home, About) |
| Beneficios dinámicos | No hay tabla `benefits` | Beneficios hardcodeados en Home |
| Procesos artesanales | No hay tabla `artisan_processes` | Información hardcodeada en About |

**Tablas faltantes (recomendadas):**

| # | Tabla | PK | FKs | Seed | Evidencia |
|---|-------|----|-----|------|-----------|
| 54 | `testimonials` | INTEGER | — | 3 | HomeTestimonials, Testimonial |
| 55 | `benefits` | INTEGER | — | 4 | Benefits, PromoBenefits, HomeFeatures |
| 56 | `artisan_processes` | INTEGER | — | 3 | AboutArtisans |

---

## 13. Seeds Reales (29 archivos, 225 registros)

| Orden | Seed | Entidad | Registros | Depende de |
|-------|------|---------|-----------|------------|
| 1 | `01-roles` | roles | 4 | — |
| 2 | `02-departments` | departments | 5 | — |
| 3 | `03-permissions` | permissions | 7 | — |
| 4 | `04-role-permissions` | role_permissions | 35 | 1, 3 |
| 5 | `05-users` | users | 5 | 1, 2 |
| 6 | `06-carriers` | carriers | 3 | — |
| 7 | `07-warehouses` | warehouses | 4 | — |
| 8 | `08-seasons` | seasons | 4 | — |
| 9 | `09-materials` | fiber_materials | 6 | — |
| 10 | `10-colors` | textile_colors | 10 | — |
| 11 | `11-sizes` | textile_sizes | 8 | — |
| 12 | `12-categories` | categories | 12 | — |
| 13 | `13-collections` | collections | 4 | 8 (opcional) |
| 14 | `14-products` | products | 8 | 12, 13 |
| 15 | `15-variants` | product_variants | 12 | 14, 9, 10, 11 |
| 16 | `16-media` | product_media | 4 | 14 |
| 17 | `17-clients` | clients | 5 | 5 |
| 18 | `18-client-addresses` | client_addresses | 2 | 17 |
| 19 | `19-orders` | orders | 6 | 17, 5 |
| 20 | `20-order-items` | order_items | 10 | 19 |
| 21 | `21-order-events` | order_events | 15 | 19 |
| 22 | `22-transactions` | transactions | 10 | 19 |
| 23 | `23-shipments` | shipments | 6 | 19, 6 |
| 24 | `24-campaigns` | campaigns | 5 | 5 |
| 25 | `25-contents` | contents | 7 | 5 |
| 26 | `26-faq` | faq_categories + items | 4 + 15 = 19 | — |
| 27 | `27-reviews` | reviews | 2 | 14 |
| 28 | `28-audit-logs` | audit_logs | 6 | 5 |
| 29 | `29-company-settings` | company_settings | 1 | — |
| — | `30-testimonials` | testimonials | 3 | — |
| — | `31-benefits` | benefits | 4 | — |
| — | `32-artisan-processes` | artisan_processes | 3 | — |

**Total:** 32 seeds, ~244 registros.

---

## 14. Decisiones Arquitectónicas Pendientes

| # | Decisión | Opciones | Recomendación | Tipo |
|---|----------|----------|---------------|------|
| DP01 | Carrito: persistencia en server vs frontend-only | Redis / PostgreSQL / localStorage | Híbrido: localStorage para invitados, carts + cart_items para autenticados | **BLOQUEANTE** |
| DP02 | Pagos: Stripe vs Culqi vs Izipay (Perú) | Stripe / Culqi / Izipay / dual | Stripe (internacional) + Izipay (Perú local) | **BLOQUEANTE** |
| DP03 | Búsqueda: PostgreSQL full-text vs Elasticsearch | PG tsvector / ES | PG tsvector inicial (≤10k productos) | Media |
| DP04 | Storage: Cloudinary vs S3 + Sharp | Cloudinary / S3+Sharp | Cloudinary (CDN + transformaciones) | Media |
| DP05 | Notificaciones: email vs email+push | SendGrid / WebSocket | SendGrid transaccional | Media |
| DP06 | Session: refresh token strategy | Cookie httpOnly / localStorage | Cookie httpOnly + refresh token | **ALTA** |
| DP07 | Testimonios/Beneficios CMS dinámico | Tablas separadas / Content type | Content type (type='testimonial', 'benefit') | Baja |

---

## 15. Riesgos Bloqueantes

| # | Riesgo | Impacto | Estado |
|---|--------|---------|--------|
| RB01 | Cart/Checkout sin server-side persistence | Pérdida de carrito para usuarios no autenticados | **BLOQUEANTE** — requiere decisión DP01 |
| RB02 | B2B + B2C + agent en orders sin CHECK constraint | Inconsistencia de datos | Mitigable con CHECK constraint |
| RB03 | Integración pasarela de pagos no definida | No se puede completar checkout | **BLOQUEANTE** — requiere decisión DP02 |
| RB04 | Sin refresh tokens | Seguridad deficiente, sesiones largas | Mitigable, no bloqueante |
| RB05 | Testimonios/beneficios hardcodeados en frontend sin API | Contenido estático no editable | No bloqueante, mejora futura |

---

## 16. Métricas Finales Corregidas

| Métrica | Valor corregido |
|---------|----------------|
| Módulos NestJS | **16** (Auth, Users, Catalog, Orders, Payments, Inventory, Logistics, CRM, Customers, Marketing, CMS, Textile, Audit, Analytics, Settings, Contact) |
| Tablas PostgreSQL | **56** (51 originales + carts, cart_items, testimonials, benefits, artisan_processes) |
| Endpoints REST | **171** (sin cambios) |
| Seeds | **32 archivos, ~244 registros** |
| DTOs estimados | **~120** (sin cambios) |
| Guards | **5** (JwtAuth, Roles, Permissions, Ownership, Throttler) |
| Interceptors | **4** (Transform, Audit, Pagination, Logging) |
| Fases implementación | **15** (sin cambios) |
| Estimación total | **~22 semanas** (+2 por carrito + pagos) |

---

## 17. Recomendación Final

### **GO condicionado**

Se puede comenzar la implementación sujeto a:

1. **Resolver DP01 y DP02 antes de la Fase 5** (Ecommerce / Pagos)
2. **Implementar CHECK constraints** documentadas en la sección 5
3. **Agregar `warehouse_transfer_items` y `cart_items`** como tablas necesarias
4. **Agregar `testimonials`, `benefits`, `artisan_processes`** como tablas de contenido CMS (baja prioridad)
5. **Corregir FK `product_media.variant_id`** → `product_variants.id`
6. **Agregar `transactions.payable_type`** con CHECK constraint
7. **Iniciar implementación por Fase 0** (config + auth) mientras se resuelven decisiones pendientes

### Orden de inicio recomendado

```
Sprint 1-2:  Fase 0 (Config + Auth + Common)
Sprint 3:    Fase 1 (IAM — Users, Roles, Permissions)
Sprint 4-5:  Fase 2 (Catalog — Products, Variants, Media)
Sprint 6:    Fase 3 (Textile — Materials, Colors, Sizes, Seasons)
Sprint 7:    ⚠️ Resolver DP01 (Cart persistence) + DP02 (Payment gateway)
Sprint 8:    Fase 4 (Clients B2B)
Sprint 9-10: Fase 5 (Ecommerce — Customers, Cart, Checkout)
Sprint 11-12: Fase 6 (Orders)
Sprint 13:   Fase 7 (Payments)
Sprint 14-15: Fase 8 (Inventory)
Sprint 16:   Fase 9 (Logistics)
Sprint 17:   Fase 10 (Marketing)
Sprint 18:   Fase 11 (CMS)
Sprint 19:   Fase 12 (Audit + Settings + Analytics)
Sprint 20:   Fase 13 (Uploads + Files)
```

**Total estimado: ~22 semanas.**

---

*Documento generado el 2026-07-10. Auditoría crítica completada. 17 errores corregidos, 2 riesgos bloqueantes identificados. Recomendación: GO condicionado.*
