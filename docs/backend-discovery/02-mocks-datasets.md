# Mocks y Datasets — ALPACART

## 1. Resumen

| Frontend | Datasets encontrados | ENTIDAD | CATÁLOGO | ENUM | EVENTO | MÉTRICA | CONFIG | Seedables |
|----------|---------------------|---------|----------|------|--------|---------|--------|-----------|
| Dashboard | 95 | 31 | 7 | 10 | 13 | 36 | 19 | ~85 |
| Tienda | 31 | 14 | 8 | 1 | 7 | 0 | 7 | ~22 |
| Institucional | 21 | 6 | 6 | 3 | 1 | 1 | 8 | ~13 |
| **Total** | **147** | **51** | **21** | **14** | **21** | **37** | **34** | **~120** |

## 2. Matriz Completa de Datasets

### 2.1 Dashboard

| # | Dataset | Archivo | Dominio | Registros | Campos | Clasif | Seed |
|---|---------|---------|---------|-----------|--------|--------|------|
| D01 | `kpiData` | `Dashboard/dashboardData.js` | Dashboard | 8 | id, icon, label, value, trend?, subtitle?, color | MÉTRICA | ✓ |
| D02 | `alerts` | `Dashboard/dashboardData.js` | Dashboard | 3 | id, icon, title, description, color | EVENTO | ✓ |
| D03 | `chartDays` | `Dashboard/dashboardData.js` | Dashboard | 7 | string[] | CATÁLOGO | ✓ |
| D04 | `chartBarHeights` | `Dashboard/dashboardData.js` | Dashboard | 7 | number[] | MÉTRICA | ✓ |
| D05 | `categories` | `Dashboard/dashboardData.js` | Dashboard | 3 | name, percent, color | MÉTRICA | ✓ |
| D06 | `paymentMethods` | `Dashboard/dashboardData.js` | Dashboard | 2 | name, percent, icon | MÉTRICA | ✓ |
| D07 | `recentOrders` | `Dashboard/dashboardData.js` | Dashboard | 5 | id, client, amount, status, initials | ENTIDAD | ✓ |
| D08 | `activities` | `Dashboard/dashboardData.js` | Dashboard | 5 | icon, title, highlight, time, color | EVENTO | ✓ |
| D09 | `quickActions` | `Dashboard/dashboardData.js` | Dashboard | 4 | icon, label, desc, link | CONFIG | ✓ |
| D10 | `kpiCards` | `MasterData/MasterData.jsx` | MasterData | 3 | id, label, value, subtitle, accent | MÉTRICA | ✓ |
| D11 | `entities` | `MasterData/MasterData.jsx` | MasterData | 10 | icon, name, count, desc | CATÁLOGO | ✓ |
| D12 | `activities` | `MasterData/MasterData.jsx` | MasterData | 3 | dot, title, highlight, desc, sub?, time | EVENTO | ✓ |
| D13 | `kpis` | `AuditLog/AuditLog.jsx` | Auditoría | 4 | id, label, value, trend?, note?, color | MÉTRICA | ✓ |
| D14 | `logs` | `AuditLog/AuditLog.jsx` | Auditoría | 6 | fecha, icon, iconColor, user, initials, avatarBg, module, moduleBg, moduleText, accion, ip, device, severity, severityLabel, severityBg, severityText, severityIcon | ENTIDAD | ✓ |
| D15 | `severityConfig` | `AuditLog/AuditLog.jsx` | Auditoría | 5 | {bg, text, icon} | CONFIG | ✗ |
| D16 | `kpis` | `AnalyticsPage/AnalyticsPage.jsx` | Analítica | 4 | id, label, value, trend | MÉTRICA | ✓ |
| D17 | `categories` | `AnalyticsPage/AnalyticsPage.jsx` | Analítica | 3 | name, value, pct | MÉTRICA | ✓ |
| D18 | `marketingROI` | `AnalyticsPage/AnalyticsPage.jsx` | Analítica | 3 | name, roi | MÉTRICA | ✓ |
| D19 | `geography` | `AnalyticsPage/AnalyticsPage.jsx` | Analítica | 4 | city, pct | MÉTRICA | ✓ |
| D20 | `donutSegments` | `AnalyticsPage/AnalyticsPage.jsx` | Analítica | 4 | label, pct, color | MÉTRICA | ✓ |
| D21 | `tabs` | `CampaignList/CampaignList.jsx` | Marketing | 6 | icon, label, active | CONFIG | ✓ |
| D22 | `campaigns` | `CampaignList/CampaignList.jsx` | Marketing | 5 | name, meta, type, channel, channelIcon, budget, roi, conv, status, statusClass, img? | ENTIDAD | ✓ |
| D23 | `calendarDays` | `CampaignList/CampaignList.jsx` | Marketing | 31 | number[]/null[] | CATÁLOGO | ✓ |
| D24 | `scheduleItems` | `CampaignList/CampaignList.jsx` | Marketing | 3 | time, title, status, icon, color | EVENTO | ✓ |
| D25 | `kpiCards` | `MarketingDashboard/MarketingDashboard.jsx` | Marketing | 6 | label, value, trend?, icon, up? | MÉTRICA | ✓ |
| D26 | `months` | `MarketingDashboard/MarketingDashboard.jsx` | Marketing | 8 | string[] | CATÁLOGO | ✓ |
| D27 | `channels` | `MarketingDashboard/MarketingDashboard.jsx` | Marketing | 4 | label, color | MÉTRICA | ✓ |
| D28 | `campaigns` | `MarketingDashboard/MarketingDashboard.jsx` | Marketing | 4 | name, start, status, statusClass, spend, conv, trend? | ENTIDAD | ✓ |
| D29 | `roiItems` | `MarketingDashboard/MarketingDashboard.jsx` | Marketing | 4 | label, value, width | MÉTRICA | ✓ |
| D30 | `tableData` | `ContentList/ContentList.jsx` | CMS | 7 | title, slug, type, author, initials, avatarBg, status, statusClass, date, image | ENTIDAD | ✓ |
| D31 | `kpiCards` | `CmsDashboard/CmsDashboard.jsx` | CMS | 6 | label, value, icon, accent, subtitle/trend? | MÉTRICA | ✓ |
| D32 | `barData` | `CmsDashboard/CmsDashboard.jsx` | CMS | 16 | h | MÉTRICA | ✓ |
| D33 | `activityData` | `CmsDashboard/CmsDashboard.jsx` | CMS | 5 | title, type, author, initials, avatarBg, status, statusColor, time | EVENTO | ✓ |
| D34 | `variants` | `TextileVariantList/TextileVariantList.jsx` | Textil | 6 | id, sku, product, category, material, color, colorHex, size, season, status, statusClass, date, img | ENTIDAD | ✓ |
| D35 | `kpiData` | `TextileDashboard/TextileDashboard.jsx` | Textil | 5 | id, label, value, subtitle | MÉTRICA | ✓ |
| D36 | `fiberData` | `TextileDashboard/TextileDashboard.jsx` | Textil | 4 | name, percent, color | MÉTRICA | ✓ |
| D37 | `sizes` | `TextileDashboard/TextileDashboard.jsx` | Textil | 6 | label, height, title | CATÁLOGO | ✓ |
| D38 | `seasons` | `TextileDashboard/TextileDashboard.jsx` | Textil | 4 | name, products, width | MÉTRICA | ✓ |
| D39 | `garmentTypes` | `TextileDashboard/TextileDashboard.jsx` | Textil | 4 | string[] | CATÁLOGO | ✓ |
| D40 | `careSteps` | `TextileDashboard/TextileDashboard.jsx` | Textil | 3 | icon, title, desc | CATÁLOGO | ✓ |
| D41 | `kpiData` | `TransferList/TransferList.jsx` | Logística | 3 | id, label, value, badge, badgeIcon, accent | MÉTRICA | ✓ |
| D42 | `transfers` | `TransferList/TransferList.jsx` | Logística | 8 | id, date, origin, destination, items, responsible, initials, avatarBg, status, statusClass | ENTIDAD | ✓ |
| D43 | `timelineSteps` | `TransferList/TransferList.jsx` | Logística | 5 | label, time, by?, done, active, pending | EVENTO | ✓ |
| D44 | `kpis` | `ShipmentList/ShipmentList.jsx` | Logística | 4 | label, value, trend, trendClass | MÉTRICA | ✓ |
| D45 | `shipments` | `ShipmentList/ShipmentList.jsx` | Logística | 6 | waybill, order, client, carrier, carrierColor, status, statusClass, city, despatch, estimated | ENTIDAD | ✓ |
| D46 | `carrierPerformance` | `ShipmentList/ShipmentList.jsx` | Logística | 3 | name, pct, color | MÉTRICA | ✓ |
| D47 | `kpiCards` | `LogisticsDashboard/LogisticsDashboard.jsx` | Logística | 6 | label, value, trend/note/icon?, accent | MÉTRICA | ✓ |
| D48 | `barData` | `LogisticsDashboard/LogisticsDashboard.jsx` | Logística | 12 | h, value, label | MÉTRICA | ✓ |
| D49 | `activityFeed` | `LogisticsDashboard/LogisticsDashboard.jsx` | Logística | 4 | carrier, carrierClass, time, msg, detail, detailClass | EVENTO | ✓ |
| D50 | `carrierMix` | `LogisticsDashboard/LogisticsDashboard.jsx` | Logística | 3 | label, pct, color | MÉTRICA | ✓ |
| D51 | `kpiCards` | `TransactionList/TransactionList.jsx` | Pagos | 4 | label, value, trend, trendUp? | MÉTRICA | ✓ |
| D52 | `transactions` | `TransactionList/TransactionList.jsx` | Pagos | 10 | payId, order, initials, client, bgColor, stripeId, method, methodIcon, status, statusClass, statusColors, date, amount, currency | ENTIDAD | ✓ |
| D53 | `kpiCards` | `PaymentDashboard/PaymentDashboard.jsx` | Pagos | 3 | label, value, trend, trendUp?, subtitle | MÉTRICA | ✓ |
| D54 | `volumeData` | `PaymentDashboard/PaymentDashboard.jsx` | Pagos | 4 | label, value, color | MÉTRICA | ✓ |
| D55 | `barData` | `PaymentDashboard/PaymentDashboard.jsx` | Pagos | 12 | h, label | MÉTRICA | ✓ |
| D56 | `paymentMethods` | `PaymentDashboard/PaymentDashboard.jsx` | Pagos | 3 | label, pct, color | MÉTRICA | ✓ |
| D57 | `alerts` | `PaymentDashboard/PaymentDashboard.jsx` | Pagos | 3 | icon, iconColor, bgClass, title, desc, btnText, btnClass | EVENTO | ✓ |
| D58 | `recentTx` | `PaymentDashboard/PaymentDashboard.jsx` | Pagos | 5 | id, client, amount, status, statusClass, date | ENTIDAD | ✓ |
| D59 | `events` | `OrderTimeline/OrderTimeline.jsx` | Pedidos | 9 | title, date, actor, note, icon, colorClass, active, signature? | EVENTO | ✓ |
| D60 | `order` | `OrderDetail/OrderDetail.jsx` | Pedidos | 1 | id, status, placedAt, date, channel, agent, paymentStatus, paymentPercent, shippingStatus, shippingPercent | ENTIDAD | ✓ |
| D61 | `customer` | `OrderDetail/OrderDetail.jsx` | Pedidos | 1 | name, email, avatar, address, shippingMethod | ENTIDAD | ✓ |
| D62 | `financials` | `OrderDetail/OrderDetail.jsx` | Pedidos | 1 | subtotal, tax, shippingFee, total, paid | MÉTRICA | ✓ |
| D63 | `items` | `OrderDetail/OrderDetail.jsx` | Pedidos | 2 | name, variant, sku, qty, unitPrice, total, img | ENTIDAD | ✓ |
| D64 | `timeline` | `OrderDetail/OrderDetail.jsx` | Pedidos | 4 | title, date, note, done | EVENTO | ✓ |
| D65 | `documents` | `OrderDetail/OrderDetail.jsx` | Pedidos | 2 | name, icon | CATÁLOGO | ✓ |
| D66 | `kpiCards` | `OrderList/OrderList.jsx` | Pedidos | 4 | label, value, trend, icon, trendColor, trendIcon | MÉTRICA | ✓ |
| D67 | `orders` | `OrderList/OrderList.jsx` | Pedidos | 6 | id, customer, avatar, initials, date, status, statusClass, payment, paymentClass, shipping, shippingSub, total, channel, agent | ENTIDAD | ✓ |
| D68 | `kpiCards` | `OrderDashboard/OrderDashboard.jsx` | Pedidos | 7 | label, value, trend, icon, accent, trendUp? | MÉTRICA | ✓ |
| D69 | `barData` | `OrderDashboard/OrderDashboard.jsx` | Pedidos | 13 | h, label | MÉTRICA | ✓ |
| D70 | `progressData` | `OrderDashboard/OrderDashboard.jsx` | Pedidos | 3 | label, pct, color | MÉTRICA | ✓ |
| D71 | `recentOrders` | `OrderDashboard/OrderDashboard.jsx` | Pedidos | 3 | id, initials, client, date, product, total, status, statusClass | ENTIDAD | ✓ |
| D72 | `kpiData` | `MovementList/MovementList.jsx` | Inventario | 5 | id, label, value, badge, badgeColor, icon, subtitle, accent | MÉTRICA | ✓ |
| D73 | `movements` | `MovementList/MovementList.jsx` | Inventario | 5 | id, date, type, product, sku, qty, route, person, status, statusColor | ENTIDAD | ✓ |
| D74 | `movements` | `KardexPage/KardexPage.jsx` | Inventario | 5 | id, date, time, product, sku, type, qty, balance, doc, reason, img | ENTIDAD | ✓ |
| D75 | `timelineData` | `KardexPage/KardexPage.jsx` | Inventario | 5 keys | {time, title, desc, type, person?, note?}[] | EVENTO | ✓ |
| D76 | `kpiData` | `StockList/StockList.jsx` | Inventario | 4 | id, label, value, subtitle, accent | MÉTRICA | ✓ |
| D77 | `products` | `StockList/StockList.jsx` | Inventario | 6 | id, name, sku, category, units, reserved, min, max, warehouse, lastSync, status, img | ENTIDAD | ✓ |
| D78 | `statusConfig` | `StockList/StockList.jsx` | Inventario | 3 | {label, bg, text, dot, pulse} | CONFIG | ✗ |
| D79 | `kpiCards` | `InventoryDashboard/InventoryDashboard.jsx` | Inventario | 6 | id, label, value, subtitle/trend?, accent, icon | MÉTRICA | ✓ |
| D80 | `warehouses` | `InventoryDashboard/InventoryDashboard.jsx` | Inventario | 4 | name, units, width | MÉTRICA | ✓ |
| D81 | `alerts` | `InventoryDashboard/InventoryDashboard.jsx` | Inventario | 3 | id, label, product, color, icon, action | EVENTO | ✓ |
| D82 | `monthData` | `InventoryDashboard/InventoryDashboard.jsx` | Inventario | 12 | label, in, out | MÉTRICA | ✓ |
| D83 | `kpis` | `ClientProfile/ClientProfile.jsx` | CRM | 3 | label, value, icon, trend/note?, color | MÉTRICA | ✓ |
| D84 | `orders` | `ClientProfile/ClientProfile.jsx` | CRM | 3 | id, date, status, total, statusClass | ENTIDAD | ✓ |
| D85 | `products` | `ClientProfile/ClientProfile.jsx` | CRM | 3 | name, line, orders | MÉTRICA | ✓ |
| D86 | `timeline` | `ClientProfile/ClientProfile.jsx` | CRM | 3 | date, title, desc, active | EVENTO | ✓ |
| D87 | `clients` | `ClientList/ClientList.jsx` | CRM | 5 | id, name, company, email, phone, type, orders, totalSpent, lastPurchase, status | ENTIDAD | ✓ |
| D88 | `kpis` | `CrmDashboard/CrmDashboard.jsx` | CRM | 5 | id, label, value, icon, trend, trendColor | MÉTRICA | ✓ |
| D89 | `chartHeights` | `CrmDashboard/CrmDashboard.jsx` | CRM | 8 | number[] | MÉTRICA | ✓ |
| D90 | `categories` | `CrmDashboard/CrmDashboard.jsx` | CRM | 4 | name, percent, color | MÉTRICA | ✓ |
| D91 | `recentClients` | `CrmDashboard/CrmDashboard.jsx` | CRM | 4 | name, date, category, catClass, status, statusColor | ENTIDAD | ✓ |
| D92 | `activities` | `CrmDashboard/CrmDashboard.jsx` | CRM | 3 | icon, iconBg, iconColor, text, time | EVENTO | ✓ |
| D93 | `cities` | `CrmDashboard/CrmDashboard.jsx` | CRM | 4 | name, percent | MÉTRICA | ✓ |
| D94 | `variants` | `VariantList/VariantList.jsx` | Catálogo | 6 | id, color, colorName, talla, material, sku, code, price, stock, status | ENTIDAD | ✓ |
| D95 | `initialAssets` | `ProductMedia/ProductMedia.jsx` | Catálogo | 4 | id, name, size, optimizedSize?, type, dimensions?, isPrincipal, optimized, altText, description, visible, src | ENTIDAD | ✓ |
| D96 | `products` | `ProductList/ProductList.jsx` | Catálogo | 8 | id, sku, name, material, collection, category, status, stock, maxStock, price, updated | ENTIDAD | ✓ |
| D97 | `kpiItems` | `CatalogDashboard/CatalogDashboard.jsx` | Catálogo | 6 | icon, label, value, accent, trend? | MÉTRICA | ✓ |
| D98 | `categoryData` | `CatalogDashboard/CatalogDashboard.jsx` | Catálogo | 4 | label, percent, color | MÉTRICA | ✓ |
| D99 | `collectionData` | `CatalogDashboard/CatalogDashboard.jsx` | Catálogo | 3 | name, count, percent | MÉTRICA | ✓ |
| D100 | `topProducts` | `CatalogDashboard/CatalogDashboard.jsx` | Catálogo | 5 | name, collection, orders, stock, stockClass | MÉTRICA | ✓ |
| D101 | `roles` | `PermissionMatrix/PermissionMatrix.jsx` | IAM | 5 | id, name, subtitle, initials, avatarBg | ENTIDAD | ✓ |
| D102 | `modules` | `PermissionMatrix/PermissionMatrix.jsx` | IAM | 4 | name, icon, permissions[] | CONFIG | ✓ |
| D103 | `roles` | `RoleList/RoleList.jsx` | IAM | 4 | id, name, category, categoryClass, barColor, description, users, permissions, status, statusClass | ENTIDAD | ✓ |
| D104 | `users` | `UserList/UserList.jsx` | IAM | 5 | id, name, email, role, department, status, lastAccess, avatar/initials, avatarClass | ENTIDAD | ✓ |
| D105 | `sections` | `Sidebar/Sidebar.jsx` | Layout | 13 grupos | label, items[] | CONFIG | ✓ |

### 2.2 Tienda

| # | Dataset | Archivo | Dominio | Registros | Campos | Clasif | Seed |
|---|---------|---------|---------|-----------|--------|--------|------|
| T01 | `items` | `Benefits/Benefits.jsx` | Home | 4 | icon, title, desc | ENTIDAD | ✓ |
| T02 | `products` | `NewArrivals/NewArrivals.jsx` | Home | 4 | img, title, price | ENTIDAD | ✓ |
| T03 | `products` | `BestSellers/BestSellers.jsx` | Home | 4 | img, title, price | ENTIDAD | ✓ |
| T04 | `categories` | `CategoryBento/CategoryBento.jsx` | Home | 4 | img, title, link, to, span | CATÁLOGO | ✓ |
| T05 | `related` | `RelatedProducts/RelatedProducts.jsx` | Producto | 4 | img, title, price | ENTIDAD | ✓ |
| T06 | `reviews` | `ProductReviews/ProductReviews.jsx` | Producto | 2 | quote, author, tag | EVENTO | ✓ |
| T07 | `sampleProduct` | `ProductDetail/ProductDetail.jsx` | Producto | 1 | title, subtitle, price, badge, description, images[], colors[], sizes[], tabs[] | ENTIDAD | ✓ |
| T08 | `collections` | `CollectionGrid/CollectionGrid.jsx` | Colecciones | 4 | image, title, pieceCount, description, catalogId, to, offset? | CATÁLOGO | ✓ |
| T09 | `products` | `CategoryGrid/CategoryGrid.jsx` | Catálogo | 6 | id, image, title, subtitle, price | CATÁLOGO | ✓ |
| T10 | `items` | `RecentlyViewed/RecentlyViewed.jsx` | Catálogo | 4 | img, title, price | EVENTO | ✓ |
| T11 | `categoryNames` | `Category/Category.jsx` | Catálogo | 12 | {slug -> name} | CATÁLOGO | ✓ |
| T12 | `items` | `InspiredBy/InspiredBy.jsx` | Wishlist | 4 | img, title, price | ENTIDAD | ✓ |
| T13 | `defaultItems` | `WishlistGrid/WishlistGrid.jsx` | Wishlist | 4 | id, img, title, sub, price, badge?, badgeVariant? | ENTIDAD | ✓ |
| T14 | `sampleItems` | `Checkout/Checkout.jsx` | Carrito | 2 | image, title, quantity, price | ENTIDAD | ✓ |
| T15 | `sampleAddresses` | `Addresses/Addresses.jsx` | Direcciones | 2 | id, name, street, city, state, zip, country, phone, isDefault | ENTIDAD | ✓ |
| T16 | `sampleOrders` | `Account/Account.jsx` | Pedidos | 2 | id, date, status, total, items[] | EVENTO | ✓ |
| T17 | `orders` | `OrderHistory/OrderHistory.jsx` | Pedidos | 3 | id, date, status, total, items[] | EVENTO | ✓ |
| T18 | `products` | `SearchResults/SearchResults.jsx` | Búsqueda | 3 | id, image, title, subtitle, price | CATÁLOGO | ✓ |
| T19 | `items` | `Thanks/Thanks.jsx` | Post-compra | 2 | image, title, variant, qty, price | ENTIDAD | ✓ |
| T20 | `sampleItems` | `Payment/Payment.jsx` | Pago | 2 | image, title, quantity, price | ENTIDAD | ✓ |
| T21 | `defaultSteps` | `TrackingTimeline/TrackingTimeline.jsx` | Seguimiento | 4 | label, date, completed, active | EVENTO | ✓ |
| T22 | `slides` | `HeroSlider/HeroSlider.jsx` | Home | 3 | id, image, title, subtitle, cta, link | CATÁLOGO | ✓ |
| T23 | `categories` | `StoreNavbar/StoreNavbar.jsx` | Nav | 6 | to, label | CONFIG | ✓ |
| T24 | `defaultSections` | `Filters/Filters.jsx` | Filtros | 5 | id, label, type, options[] | CONFIG | ✗ |
| T25 | `products` (3) | `ArtisanSeries/ArtisanSeries.jsx` | Home | 0 | (text content only) | — | ✗ |

### 2.3 Institucional

| # | Dataset | Archivo | Dominio | Registros | Campos | Clasif | Seed |
|---|---------|---------|---------|-----------|--------|--------|------|
| I01 | `items` | `HomeFeatures/HomeFeatures.jsx` | Home | 3 | icon, title, desc | ENTIDAD | ✓ |
| I02 | `items` | `HomeCategories/HomeCategories.jsx` | Home | 2 | img, title, subtitle | CATÁLOGO | ✓ |
| I03 | `images` | `HomeGallery/HomeGallery.jsx` | Home | 4 | url | CATÁLOGO | ✗ |
| I04 | `items` | `AboutTimeline/AboutTimeline.jsx` | About | 4 | year, title, desc | EVENTO | ✓ |
| I05 | `artisans` | `AboutArtisans/AboutArtisans.jsx` | About | 3 | img, title, sub | ENTIDAD | ✓ |
| I06 | `products` | `CatalogProducts/CatalogProducts.jsx` | Catálogo | 3 | img, title, sub, tag | ENTIDAD | ✓ |
| I07 | `items` | `CatalogGallery/CatalogGallery.jsx` | Catálogo | 3 | img, season, title | CATÁLOGO | ✓ |
| I08 | `specs` | `CatalogTechSpecs/CatalogTechSpecs.jsx` | Catálogo | 3 | title, desc | MÉTRICA | ✓ |
| I09 | `products` | `PromoProducts/PromoProducts.jsx` | Promociones | 3 | img, badge, title, desc | ENTIDAD | ✓ |
| I10 | `items` | `PromoBenefits/PromoBenefits.jsx` | Promociones | 3 | icon, title, desc | ENTIDAD | ✓ |
| I11 | `faqs` | `ContactFAQ/ContactFAQ.jsx` | Contacto | 3 | q, a | ENUM | ✓ |
| I12 | `categories` | `FAQ/FAQ.jsx` | FAQ | 4 | id, title, items[] | ENUM | ✓ |
| I13 | `sections` | `Terms/Terms.jsx` | Legal | 6 | id, title, content[], list[]? | CONFIG | ✗ |
| I14 | `sections` | `Policies/Policies.jsx` | Legal | 5 | id, title, content[], list[]?, tags[]?, note? | CONFIG | ✗ |
| I15 | `slides` | `HeroSlider/slides.js` | Home | 5 | id, image (svg), title, subtitle, primaryCta, secondaryCta? | CATÁLOGO | ✓ |

## 3. Catálogos Comunes

| Catálogo | Dashboard | Tienda | Institucional | Uso |
|----------|-----------|--------|---------------|-----|
| Categorías de producto | 4 (catData) | 9 (categoryNames) | — | Filtrado de productos |
| Colecciones | 3 (colData) | 4 (collections) | — | Agrupación de productos |
| Categorías de FAQ | — | — | 4 (FAQ) | FAQ sections |
| Canales de marketing | 4 (channels) | — | — | Distribución |
| Almacenes | 4 (warehouses) | — | — | Inventario |
| Transportistas | 3 (carriers) | — | — | Logística |
| Temporadas | 4 (seasons) | — | — | Textil |
| Tallas | 6 (sizes) | 5 (sizes PD) | — | Variantes |
| Países | — | 12 (AddressForm) | — | Direcciones |
| Roles | 5 (PermissionMatrix) | 2 (ROLES) | — | IAM |
| Métodos de pago | 3-6 (multiple) | — | — | Pagos |
| Tipos de contenido CMS | 5 (ContentList) | — | — | CMS |

## 4. Enumeraciones (Enums) Transversales

| Enum | Valores | Dashboard | Tienda | Institucional |
|------|---------|-----------|--------|---------------|
| Order Status | `shipped, delivered, cancelled, pending, processing` | ✓ | ✓ | — |
| Payment Status | `paid, pending, failed, refunded, succeeded` | ✓ | ✓ | — |
| Shipment Status | `transit, delayed, ready, delivered` | ✓ | — | — |
| Product Status | `Activo, Oculto, Descontinuado, Agotado` | ✓ | ✓ | — |
| Stock Status | `low, in, out` | ✓ | — | — |
| Movement Type | `Entrada, Salida, Ajuste, Transferencia, Reserva` | ✓ | — | — |
| Content Status | `Published, Draft, Scheduled, Review` | ✓ | — | — |
| Campaign Status | `ACTIVA, PROGRAMADA, BORRADOR, FINALIZADA, PAUSA` | ✓ | — | — |
| Severity | `exitosa, fallo, advertencia, info, critico` | ✓ | — | — |
| Transfer Status | `requested, authorized, transit, received, completed, cancelled, archived` | ✓ | — | — |
| Client Type | `Mayorista, Minorista, Corporativo` | ✓ | — | — |
| Client Status | `Activo, Inactivo, VIP` | ✓ | — | — |
| User Status | `Activo, Inactivo, Suspendido` | ✓ | — | — |
| Document Type | `RUC, DNI, Pasaporte, Carné de Extranjería` | ✓ | — | — |
| Asset Type | `JPG, PNG, VIDEO` | ✓ | — | — |
| Currency | `USD, PEN, EUR` | ✓ | ✓ | — |
| Language | `es, en` | ✓ | ✓ | — |
| Size | `XS, S, M, L, XL, XXL, OS, KIDS` | ✓ | ✓ | — |
| Role | `Admin, Logistica, Ventas, Editor` | ✓ | ✓ | — |

## 5. Contradicciones Detectadas

| ID | Descripción | Fuente A | Fuente B | Impacto |
|----|-------------|----------|----------|---------|
| C01 | Order ID format: `#ORD-4921` vs `APC-982341` vs `#ORD-2024-0892` | Dashboard ProductList | Dashboard OrderList | Alto: inconsistencia en formato de ID |
| C02 | Order status: `shipped/delivered` (EN) vs `Entregado/Enviado` (ES) | Dashboard OrderList (EN) | Dashboard OrderDashboard (ES) | Alto: mezcla de idiomas |
| C03 | Product status: `Activo/Oculto/Descontinuado` (ES) vs `Active/Out of Stock/Discontinued` (EN) | Dashboard ProductList | Dashboard TextileVariantList | Alto: inconsistencia de idioma |
| C04 | Variant status: `Activo/Oculto/Agotado` vs `Activa/En Desarrollo/Descontinuada` | Dashboard VariantList | Dashboard VariantCreate | Medio: mismo concepto, nombres distintos |
| C05 | User status: 3 estados en Dashboard vs 2 en ROLES constant | Dashboard UserList | constants/index.js | Medio: contradicción de modelo |
| C06 | Client: same entity with different fields in Tienda vs Dashboard | Tienda Account/ProfileSettings | Dashboard ClientList | Alto: B2C vs B2B sin unificación |
| C07 | Address: `state` en Tienda vs no state en Dashboard | Tienda Addresses | Dashboard AddressForm | Bajo: campo faltante |
| C08 | Price: string `'$4,250.00'` en Dashboard vs number `850` en Tienda | Dashboard order.amount | Tienda SearchResults price | Medio: tipo inconsistente |
| C09 | image/img field name: `image` vs `img` | Dashboard varias | Tienda varias | Bajo: naming inconsistente |
| C10 | Carrier names: `DHL Express` vs `DHL Global` vs solo `DHL` | Dashboard ShipmentList | Dashboard LogisticsDashboard | Bajo |

## 6. Datos Duplicados

| ID | Contenido | Ubicaciones | Sugerencia |
|----|-----------|-------------|------------|
| D01 | Mismos 6 pedidos sample | OrderDashboard, OrderList | Unificar seed |
| D02 | Mismos 4 productos sample | NewArrivals, CategoryGrid?, BestSellers | Unificar seed |
| D03 | Misma estructura de FAQ | FAQ page, ContactFAQ | Unificar seed |
| D04 | Misma estructura de Artisan/Feature | Benefits, PromoBenefits, HomeFeatures | Unificar seed |

## 7. Candidatos a Seeds

### 7.1 Entidades Maestras

| Seed | Dataset | Registros | Dominio |
|------|---------|-----------|---------|
| `users` | UserList | 5 | IAM |
| `roles` | RoleList, PermissionMatrix | 4-5 | IAM |
| `permissions` | PermissionMatrix | 7 | IAM |
| `products` | ProductList | 8 | Catálogo |
| `collections` | CollectionGrid, CatalogDashboard | 4 | Catálogo |
| `categories` | Category, CatalogDashboard | 9-12 | Catálogo |
| `variants` | VariantList, TextileVariantList | 12 | Catálogo/Textil |
| `clients` | ClientList | 5 | CRM |
| `addresses` | Addresses | 2 | CRM |
| `orders` | OrderList, OrderDashboard | 6 | Pedidos |
| `orderItems` | OrderDetail | 4 | Pedidos |
| `payments` | TransactionList, PaymentDashboard | 10 | Pagos |
| `shipments` | ShipmentList | 6 | Logística |
| `transfers` | TransferList | 8 | Logística |
| `movements` | MovementList, KardexPage | 10 | Inventario |
| `warehouses` | InventoryDashboard | 4 | Inventario |
| `stockItems` | StockList | 6 | Inventario |
| `content` | ContentList | 7 | CMS |
| `campaigns` | CampaignList, MarketingDashboard | 9 | Marketing |
| `auditLogs` | AuditLog | 6 | Auditoría |
| `masterEntities` | MasterData | 10 | Master Data |

### 7.2 Catálogos de Referencia

| Seed | Dataset | Registros | Dominio |
|------|---------|-----------|---------|
| `materials` | TextileDashboard, CatalogProducts | 4-6 | Textil |
| `colors` | ProductDetail, TextileDashboard | 4-6 | Textil |
| `sizes` | ProductDetail, TextileDashboard | 6-12 | Textil |
| `seasons` | TextileDashboard | 4 | Textil |
| `garmentTypes` | TextileDashboard | 4 | Textil |
| `careInstructions` | TextileDashboard, VariantCreate | 3 | Textil |
| `carriers` | ShipmentList, LogisticsDashboard | 3-4 | Logística |
| `paymentMethods` | PaymentDashboard, TransactionList | 3-6 | Pagos |
| `currencies` | TransactionList | 3 | Pagos |
| `languages` | Settings, ProfileSettings | 2 | Config |
| `departments` | UserList | 5 | IAM |
| `documentTypes` | ClientCreate | 4 | CRM |

### 7.3 Enumeraciones

| Seed | Valores | Fuente |
|------|---------|--------|
| `order_statuses` | `pending, confirmed, paid, preparing, shipped, delivered, cancelled` | OrderDashboard + OrderTimeline |
| `payment_statuses` | `pending, processing, succeeded, failed, refunded` | TransactionList |
| `shipment_statuses` | `pending, transit, delayed, ready, delivered, returned` | ShipmentList |
| `product_statuses` | `active, hidden, discontinued, out_of_stock` | ProductList + VariantList |
| `stock_statuses` | `low, in, out` | StockList |
| `movement_types` | `ingreso, salida, ajuste, transferencia, reserva` | MovementList |
| `client_types` | `mayorista, minorista, corporativo` | ClientList + ClientCreate |
| `content_statuses` | `published, draft, scheduled, review` | ContentList |
| `campaign_statuses` | `active, scheduled, draft, finished, paused` | CampaignList |
| `severity_levels` | `exitosa, fallo, advertencia, info, critico` | AuditLog |
| `transfer_statuses` | `requested, authorized, transit, received, completed, cancelled, archived` | TransferList |

---

*Documento generado el 2026-07-10. Total: 147 datasets, ~120 candidatos a seed.*
