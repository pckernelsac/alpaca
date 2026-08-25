# ICC-01 — Integration Contract Certification
# Contract Matrix — ALPACART

> **Clasificación:** PASS / PARTIAL / FAIL / NOT VERIFIED

---

## Matriz Contractual Completa

| Frontend → Repository → Shared Type → Endpoint → DTO → Entity → PostgreSQL | Clasificación |
|-----------------------------------------------------------------------------|---------------|
| **Auth** | |
| Institucional/Tienda/Dashboard → authService → User → POST /auth/login → LoginDto → User → users | ✅ PASS |
| Institucional/Tienda/Dashboard → authService → User → POST /auth/customer-login → LoginDto → Customer → customers | ✅ PASS |
| Institucional/Tienda/Dashboard → authService → User → GET /auth/me → none → User/Customer → users/customers | ⚠️ PARTIAL |
| Tienda → authService → Customer → POST /auth/register → RegisterDto (exists, **unwired**) → Customer → customers | ⚠️ PARTIAL |
| **IAM — Dashboard** | |
| Dashboard → usersRepo → User → GET /users → none → User → users | ⚠️ PARTIAL |
| Dashboard → usersRepo → User → POST /users → none → User → users | ❌ FAIL |
| Dashboard → usersRepo → User → PUT /users/:id → none → User → users | ❌ FAIL |
| Dashboard → usersRepo → Role → GET /roles → none → Role → roles | ⚠️ PARTIAL |
| Dashboard → usersRepo → Role → POST /roles → none → Role → roles | ❌ FAIL |
| Dashboard → usersRepo → Permission → GET /permissions → none → Permission → permissions | ⚠️ PARTIAL |
| **Catalog — Tienda + Dashboard** | |
| Tienda → useFetch → Product → GET /products → none → Product → products | ⚠️ PARTIAL |
| Tienda → useFetch → Product → GET /products/:id → none → Product → products | ⚠️ PARTIAL |
| Dashboard → catalogRepo → Product → POST /products → none → Product → products | ❌ FAIL |
| Dashboard → catalogRepo → Product → PUT /products/:id → none → Product → products | ❌ FAIL |
| Tienda/Dashboard → none → Category → GET /categories → none → Category → categories | ✅ PASS |
| Tienda/Dashboard → none → Collection → GET /collections → none → Collection → collections | ✅ PASS |
| **Customers — Tienda** | |
| Tienda → authService → Customer → POST /auth/register → none → Customer → customers | ❌ FAIL |
| Tienda → authService → Customer → GET /account/profile → none → Customer → customers | ⚠️ PARTIAL |
| Tienda → authService → Customer → PUT /account/profile → none → Customer → customers | ❌ FAIL |
| Tienda → authService → Address → GET /account/addresses → none → CustomerAddress → customer_addresses | ⚠️ PARTIAL |
| Tienda → authService → Address → POST /account/addresses → none → CustomerAddress → customer_addresses | ❌ FAIL |
| **Cart — Tienda** | |
| Tienda → cartStore (no API) → none → GET /cart → none → Cart → carts | ❌ NOT VERIFIED |
| Tienda → cartStore (no API) → none → POST /cart/items → AddCartItemDto (unwired) → CartItem → cart_items | ❌ FAIL |
| **Checkout — Tienda** | |
| Tienda → none → none → POST /checkout → CheckoutDto (unwired) → Order/OrderItem → orders | ❌ FAIL |
| **Orders — Dashboard + Tienda** | |
| Dashboard → ordersRepo → Order → GET /orders → none → Order → orders | ⚠️ PARTIAL |
| Dashboard → ordersRepo → Order → GET /orders/:id → none → Order → orders | ⚠️ PARTIAL |
| Dashboard → ordersRepo → none → POST /orders → none → Order → orders | ❌ FAIL |
| Dashboard → ordersRepo → Order → PUT /orders/:id/status → none → Order → orders | ❌ FAIL |
| Dashboard → ordersRepo → Order → GET /orders/:id/events → none → OrderEvent → order_events | ✅ PASS |
| **Payments — Dashboard** | |
| Dashboard → paymentsRepo → none → GET /transactions → none → Transaction → transactions | ⚠️ PARTIAL |
| Dashboard → paymentsRepo → none → POST /create-payment-intent → none → Transaction → transactions | ❌ FAIL |
| Dashboard/Tienda → none → none → POST /stripe/webhook → none → WebhookEvent → webhook_events | ✅ PASS (backend) |
| **Inventory — Dashboard** | |
| Dashboard → inventoryRepo → StockItem → GET /stock → none → StockItem → stock_items | ⚠️ PARTIAL |
| Dashboard → inventoryRepo → StockItem → POST /stock/:id/adjust → none → StockItem → stock_items | ❌ FAIL |
| Dashboard → inventoryRepo → Warehouse → GET /movements → none → StockMovement → stock_movements | ⚠️ PARTIAL |
| Dashboard → inventoryRepo → Warehouse → GET /transfers → none → WarehouseTransfer → warehouse_transfers | ⚠️ PARTIAL |
| **Logistics — Dashboard** | |
| Dashboard → logisticsRepo → Shipment → GET /shipments → none → Shipment → shipments | ⚠️ PARTIAL |
| Dashboard → logisticsRepo → Shipment → POST /shipments → none → Shipment → shipments | ❌ FAIL |
| Dashboard → logisticsRepo → Carrier → GET /carriers → none → Carrier → carriers | ✅ PASS |
| **Marketing — Dashboard** | |
| Dashboard → marketingRepo → Campaign → GET /campaigns → none → Campaign → campaigns | ⚠️ PARTIAL |
| Dashboard → marketingRepo → Campaign → POST /campaigns → none → Campaign → campaigns | ❌ FAIL |
| Dashboard → marketingRepo → Coupon → GET /coupons → none → Coupon → coupons | ⚠️ PARTIAL |
| Tienda → none → Coupon → POST /coupons/validate → ValidateCouponDto (unwired) → Coupon → coupons | ❌ FAIL |
| **CMS — Institucional + Dashboard** | |
| Institucional → none → Content → GET /contents → none → Content → contents | ✅ PASS |
| Institucional → none → HeroSlide → GET /hero-slides → none → HeroSlide → hero_slides | ✅ PASS |
| Institucional → none → Testimonial → GET /testimonials → none → Testimonial → testimonials | ✅ PASS |
| Institucional → none → none → GET /faq → none → FaqCategory/FaqItem → faq_categories/faq_items | ✅ PASS |
| Institucional → none → none → GET /gallery → none → GalleryImage → gallery_images | ✅ PASS |
| Institucional → none → none → GET /benefits → none → Benefit → benefits | ✅ PASS |
| Institucional → none → none → GET /artisan-processes → none → ArtisanProcess → artisan_processes | ✅ PASS |
| Dashboard → cmsRepo → Content → POST /contents → none → Content → contents | ❌ FAIL |
| Dashboard → cmsRepo → HeroSlide → POST /admin/hero-slides → none → HeroSlide → hero_slides | ❌ FAIL |
| **Analytics — Dashboard** | |
| Dashboard → dashboardRepo → none → GET /analytics/kpis → none → (query) → N/A | ⚠️ PARTIAL |
| **Audit — Dashboard** | |
| Dashboard → auditRepo → none → GET /audit/logs → none → AuditLog → audit_logs | ⚠️ PARTIAL |
| **Settings — Dashboard + Institucional + Tienda** | |
| Todos → none → none → GET /settings/company → none → CompanySetting → company_settings | ✅ PASS |
| Dashboard → settingsRepo → none → PUT /settings/company → UpdateCompanyDto (unwired) → CompanySetting → company_settings | ❌ FAIL |
| Institucional → fetch() → none → POST /contact → ContactDto (unwired) → ContactInquiry → contact_inquiries | ❌ FAIL (DTO unwired) |
| **Newsletter — Institucional/Tienda** | |
| Institucional → none → none → POST /newsletter/subscribe → none → NewsletterSubscriber → newsletter_subscribers | ❌ FAIL (no DTO) |
| **Storage — Dashboard** | |
| Dashboard → none → none → POST /upload → none → (S3/MinIO) → N/A | ⚠️ PARTIAL |

## Resumen de Clasificaciones

| Categoría | Cantidad | % |
|-----------|----------|---|
| ✅ PASS | 14 | 17% |
| ⚠️ PARTIAL | 22 | 27% |
| ❌ FAIL | 28 | 34% |
| ❌ NOT VERIFIED | 1 | 1% |
| Sin contrato frontend (backend-only) | 17 | 21% |
| **Total** | **82** | **100%** |
