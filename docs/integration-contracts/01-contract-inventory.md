# ICC-01 — Integration Contract Certification
# Contract Inventory — ALPACART

> **Fecha:** 2026-07-16 | **Auditoría:** Frontend ↔ API ↔ Backend ↔ DB

---

## Dominios Auditados

| # | Dominio | FE Consumidor | Endpoints Backend | Shared Type | Entity | Tabla | Estado |
|---|---------|--------------|-------------------|-------------|--------|-------|--------|
| 1 | **Auth** | Todos (3) | POST login, POST customer-login, GET me, POST register | User, Customer | User, Customer, Session | users, customers, sessions | ✅ |
| 2 | **IAM** | Dashboard | CRUD users, roles, permissions, matrix | User, Role | User, Role, Permission, RolePermission | users, roles, permissions, role_permissions | ✅ |
| 3 | **Catalog** | Tienda, Dashboard | GET/POST/PUT/DELETE products, variants, media; GET categories, collections | Product, ProductVariant, Category, Collection | Product, ProductVariant, ProductMedia, Category, Collection, Tag | products, product_variants, product_media, categories, collections, tags | ✅ |
| 4 | **Textile** | Dashboard | GET materials, colors, sizes, seasons | — | FiberMaterial, TextileColor, TextileSize, Season | fiber_materials, textile_colors, textile_sizes, seasons | ⚠️ |
| 5 | **Customers** | Tienda | POST register, GET/PUT profile, addresses, wishlist, cart, checkout | Customer, Address | Customer, CustomerAddress, WishlistItem, Cart, CartItem, Review | customers, customer_addresses, wishlist_items, carts, cart_items, reviews | ✅ |
| 6 | **CRM** | Dashboard | CRUD clients, POST notes | Client | Client, ClientAddress, ClientNote, ClientPaymentMethod | clients, client_addresses, client_notes, client_payment_methods | ✅ |
| 7 | **Cart** | Tienda | GET cart, POST/PATCH/DELETE cart items | — | Cart, CartItem | carts, cart_items | ⚠️ |
| 8 | **Wishlist** | Tienda | GET wishlist, POST wishlist/items | — | WishlistItem | wishlist_items | ⚠️ |
| 9 | **Checkout** | Tienda | POST checkout | — | Order, OrderItem, OrderEvent | orders, order_items, order_events | ⚠️ |
| 10 | **Orders** | Dashboard, Tienda | GET orders, GET/:id, POST, PUT status, POST notes, GET events | Order, OrderItem | Order, OrderItem, OrderEvent, OrderDocument | orders, order_items, order_events, order_documents | ✅ |
| 11 | **Payments** | Dashboard | GET transactions, POST create-payment-intent, refund, webhook | — | Transaction, TransactionRefund | transactions, transaction_refunds, webhook_events | ⚠️ |
| 12 | **Inventory** | Dashboard | GET stock, POST adjust, GET movements, transfers | StockItem, Warehouse | StockItem, StockMovement, Warehouse, WarehouseTransfer, WarehouseTransferItem | stock_items, stock_movements, warehouses, warehouse_transfers, warehouse_transfer_items | ✅ |
| 13 | **Logistics** | Dashboard | GET/POST shipments, carriers, PUT status | Shipment | Shipment, ShipmentEvent, Carrier | shipments, shipment_events, carriers | ✅ |
| 14 | **Marketing** | Dashboard | CRUD campaigns, coupons, promotions, subscribe | Campaign, Coupon | Campaign, Coupon, Promotion, NewsletterSubscriber | campaigns, coupons, promotions, newsletter_subscribers | ✅ |
| 15 | **Coupons** | Tienda, Dashboard | CRUD coupons, POST validate | Coupon | Coupon | coupons | ✅ |
| 16 | **CMS** | Institucional, Dashboard | GET contents, faq, hero, gallery, testimonials, benefits, artisan; CRUD admin | Content, HeroSlide, Testimonial | Content, FaqCategory, FaqItem, HeroSlide, GalleryImage, Testimonial, Benefit, ArtisanProcess | contents, faq_categories, faq_items, hero_slides, gallery_images, testimonials, benefits, artisan_processes | ✅ |
| 17 | **Analytics** | Dashboard | GET /analytics/kpis | — | — | (queries sobre tablas existentes) | ⚠️ |
| 18 | **Audit** | Dashboard | GET /audit/logs | — | AuditLog | audit_logs | ⚠️ |
| 19 | **Settings** | Dashboard, Institucional, Tienda | GET/PUT company, POST contact | — | CompanySetting, ContactInquiry | company_settings, contact_inquiries | ⚠️ |
| 20 | **Contact** | Institucional | POST /contact | — | ContactInquiry | contact_inquiries | ✅ |
| 21 | **Newsletter** | Institucional, Tienda | POST /newsletter/subscribe | — | NewsletterSubscriber | newsletter_subscribers | ⚠️ |
| 22 | **Storage** | Dashboard | POST upload, DELETE | — | — | (MinIO/S3) | ⚠️ |
| 23 | **Idempotency** | Backend (transparente) | Header Idempotency-Key | — | IdempotencyKey | order_idempotency_keys | ✅ |
| 24 | **Webhooks** | Backend (transparente) | POST /stripe/webhook | — | WebhookEvent | webhook_events | ✅ |

**Leyenda:** ✅ = Contrato completo | ⚠️ = Contrato parcial o sin shared type | ❌ = Contrato faltante
