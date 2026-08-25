# IRA-01 — Módulos

## Inventario de módulos Frontend vs Backend

| Módulo | Dashboard | Tienda | Institucional | Backend | Backend Endpoints | Compatibilidad |
|--------|-----------|--------|---------------|---------|-------------------|----------------|
| Auth | ✅ Login | ✅ Login/Register | — | ✅ AuthModule | POST login, register, GET me | ✅ Completa |
| IAM/Users | ✅ CRUD | — | — | ✅ IamModule | CRUD users, roles, permissions | ✅ Completa |
| Catalog | ✅ CRUD | ✅ Lectura | ✅ Lectura | ✅ CatalogModule | CRUD products, variants, media | ✅ Completa |
| Textile | ✅ Dashboard | — | — | ✅ TextileModule | GET materials, colors, sizes | ✅ Completa |
| Cart | — | ✅ CRUD (local) | — | ✅ CustomersModule | CRUD cart/items (R3) | ⚠ Parcial (sin customer login) |
| Checkout | — | ✅ Mock | — | ✅ CustomersModule | POST /checkout (R6-B) | ⚠ Parcial (sin customer login) |
| Orders | ✅ CRUD | ✅ Lectura | — | ✅ OrdersModule | CRUD orders, status, events | ✅ Completa |
| Payments | ✅ Dashboard | ✅ Mock | — | ✅ PaymentsModule | GET transactions, webhook | ✅ Completa |
| Customers | — | ✅ Mock | — | ✅ CustomersModule | register, profile, addresses | ⚠ Parcial |
| CRM | ✅ CRUD | — | — | ✅ CrmModule | CRUD clients, notes | ✅ Completa |
| Inventory | ✅ Dashboard | — | — | ✅ InventoryModule | CRUD stock, movements, transfers | ✅ Completa |
| Logistics | ✅ Dashboard | ✅ Tracking | — | ✅ LogisticsModule | CRUD shipments, carriers | ✅ Completa |
| Marketing | ✅ Dashboard | ✅ Coupons | — | ✅ MarketingModule | CRUD campaigns, coupons | ✅ Completa |
| CMS | ✅ Dashboard | — | ✅ Lectura | ✅ CmsModule | CRUD contents, faq, hero, gallery | ✅ Completa |
| Analytics | ✅ Dashboard | — | — | ✅ AnalyticsModule | GET /analytics/kpis | ✅ Completa |
| Audit | ✅ Dashboard | — | — | ✅ AuditModule | GET /audit/logs | ✅ Completa |
| Settings | ✅ Dashboard | — | — | ✅ SettingsModule | GET/PUT company, POST contact | ✅ Completa |
| Contact | — | — | ✅ Form | ✅ SettingsModule | POST /contact | ✅ Completa |
| Newsletter | — | ✅ Form | ✅ Form | ✅ MarketingModule | POST /newsletter/subscribe | ✅ Completa |
| FAQ | — | — | ✅ Lectura | ✅ CmsModule | GET /faq | ✅ Completa |
| Hero Slides | — | — | ✅ Lectura | ✅ CmsModule | GET/POST/PUT/DELETE hero-slides | ✅ Completa |
