# Inventario Maestro — ALPACART Backend Discovery

## 1. Resumen Ejecutivo

**Fecha:** 2026-07-10  
**Propósito:** Extraer requisitos de backend a partir del análisis de tres frontends React independientes.  
**Frontends analizados:** Dashboard (ERP), Tienda (Ecommerce), Página Institucional (Corporativo)  
**Total de páginas:** 71 (40 Dashboard + 19 Tienda + 12 Institucional)  
**Total de rutas:** 73 (41 Dashboard + 19 Tienda + 13 Institucional)  
**Entidades candidatas:** ~42  
**Endpoints API estimados:** ~180  

El sistema ALPACART requiere un backend que cubra: autenticación unificada, catálogo de productos con variantes textiles, inventario con kardex, pedidos con timeline, pagos, logística, CRM, CMS, marketing, analítica, IAM (roles/permisos), y contenidos institucionales.

---

## 2. Inventario de los Tres Frontends

| # | Frontend | Páginas | Rutas | Layouts | Estado |
|---|----------|---------|-------|---------|--------|
| 1 | Dashboard (ERP) | 41 | 41 | 3 (auth/admin/main) | Completo |
| 2 | Tienda (Ecommerce) | 19 | 19 | 1 (StoreLayout) | Completo |
| 3 | Página Institucional | 12 | 13 | 2 (PublicLayout, AdminLayout) | Completo |
| | **Total** | **72** | **73** | | |

### Dashboard — 40 páginas funcionales + 1 NotFound

| Módulo | Páginas |
|--------|---------|
| Auth | Login |
| Ejecutivo | Dashboard |
| Catálogo | CatalogDashboard, ProductList, ProductCreate, ProductMedia, VariantList, VariantCreate |
| Pedidos | OrderDashboard, OrderList, OrderDetail, OrderTimeline |
| CRM | CrmDashboard, ClientList, ClientCreate, ClientProfile |
| Pagos | PaymentDashboard, TransactionList |
| Inventario | InventoryDashboard, StockList, KardexPage, MovementList |
| Logística | LogisticsDashboard, ShipmentList |
| Marketing | MarketingDashboard, CampaignList |
| CMS | CmsDashboard, ContentList |
| Textil | TextileDashboard, TransferList, TextileVariantList |
| Usuarios/IAM | UserList, UserCreate, RoleList, PermissionMatrix, MyProfile |
| Analítica | AnalyticsPage, AuditLog |
| Configuración | SettingsPage, MasterData |

### Tienda — 19 páginas

| Categoría | Páginas |
|-----------|---------|
| Home | Home |
| Producto | ProductDetail, ProductView, VariantSelector, ProductReviews, RelatedProducts, ProductTabs |
| Catálogo | Collection, Category, SearchResults |
| Carrito/Checkout | Cart, Checkout, Payment |
| Órdenes | Thanks, OrderConfirmed, OrderTracking, OrderHistory |
| Cuenta | Account, Addresses, Wishlist, ProfileSettings |
| Auth | Login, Register |
| Búsqueda | Search |

### Institucional — 12 páginas

| Categoría | Páginas |
|-----------|---------|
| Home | Home |
| Institucional | About, Services, Blog |
| Catálogo | Catalog |
| Promociones | Promotions |
| FAQ | FAQ |
| Legal | Terms, Policies |
| Contacto | Contact |
| Error | NotFound |

---

## 3. Módulos Funcionales Detectados

| ID | Módulo | Frontends | Prioridad |
|----|--------|-----------|-----------|
| M01 | Autenticación y Cuenta | Dashboard, Tienda, Institucional | Crítica |
| M02 | Gestión de Usuarios (IAM) | Dashboard | Crítica |
| M03 | Roles y Permisos | Dashboard | Crítica |
| M04 | Catálogo de Productos | Dashboard, Tienda, Institucional | Crítica |
| M05 | Variantes de Producto | Dashboard, Tienda | Alta |
| M06 | Multimedia / Assets | Dashboard, Tienda | Alta |
| M07 | Inventario y Stock | Dashboard, Tienda | Alta |
| M08 | Kardex / Movimientos | Dashboard | Alta |
| M09 | Pedidos | Dashboard, Tienda | Alta |
| M10 | Pagos y Transacciones | Dashboard, Tienda | Alta |
| M11 | Logística y Envíos | Dashboard | Alta |
| M12 | CRM / Clientes | Dashboard | Alta |
| M13 | Direcciones | Tienda | Alta |
| M14 | Wishlist / Lista de Deseos | Tienda | Media |
| M15 | Carrito de Compras | Tienda | Alta |
| M16 | Marketing / Campañas | Dashboard | Media |
| M17 | CMS / Contenido | Dashboard | Media |
| M18 | Textil / Fibras | Dashboard | Media |
| M19 | Analítica / BI | Dashboard | Media |
| M20 | Auditoría | Dashboard | Media |
| M21 | Configuración | Dashboard | Media |
| M22 | Datos Maestros | Dashboard | Media |
| M23 | Reseñas / Reviews | Tienda | Media |
| M24 | Cupones / Descuentos | Tienda | Baja |
| M25 | Newsletter / Suscripciones | Institucional, Tienda | Baja |
| M26 | Contacto / Leads | Institucional | Baja |
| M27 | FAQ / Preguntas Frecuentes | Institucional | Baja |
| M28 | Institucional / Marca | Institucional | Baja |

---

## 4. Páginas y Rutas

### Dashboard (ERP)

| Ruta | Página | Layout | Protegida |
|------|--------|--------|-----------|
| `/login` | LoginPage | Auth | No |
| `/` | DashboardPage | Admin | Sí |
| `/catalog` | CatalogDashboard | Admin | Sí |
| `/catalog/productos` | ProductList | Admin | Sí |
| `/catalog/productos/nuevo` | ProductCreate | Admin | Sí |
| `/catalog/productos/multimedia` | ProductMedia | Admin | Sí |
| `/catalog/variantes` | VariantList | Admin | Sí |
| `/catalog/variantes/nueva` | VariantCreate | Admin | Sí |
| `/orders` | OrderDashboard | Admin | Sí |
| `/orders/list` | OrderList | Admin | Sí |
| `/pedidos/detalle` | OrderDetail | Admin | Sí |
| `/pedidos/seguimiento` | OrderTimeline | Admin | Sí |
| `/crm` | CrmDashboard | Admin | Sí |
| `/crm/clientes` | ClientList | Admin | Sí |
| `/crm/clientes/nuevo` | ClientCreate | Admin | Sí |
| `/crm/clientes/perfil` | ClientProfile | Admin | Sí |
| `/payments` | PaymentDashboard | Admin | Sí |
| `/payments/transactions` | TransactionList | Admin | Sí |
| `/inventory` | InventoryDashboard | Admin | Sí |
| `/inventory/stock` | StockList | Admin | Sí |
| `/inventory/kardex` | KardexPage | Admin | Sí |
| `/inventory/movements` | MovementList | Admin | Sí |
| `/logistics` | LogisticsDashboard | Admin | Sí |
| `/logistics/envios` | ShipmentList | Admin | Sí |
| `/marketing` | MarketingDashboard | Admin | Sí |
| `/marketing/campanas` | CampaignList | Admin | Sí |
| `/cms` | CmsDashboard | Admin | Sí |
| `/cms/contenido` | ContentList | Admin | Sí |
| `/textile` | TextileDashboard | Admin | Sí |
| `/textile/transferencias` | TransferList | Admin | Sí |
| `/textil/variantes` | TextileVariantList | Admin | Sí |
| `/usuarios` | UserList | Admin | Sí |
| `/usuarios/nuevo` | UserCreate | Admin | Sí |
| `/usuarios/roles` | RoleList | Admin | Sí |
| `/usuarios/permisos` | PermissionMatrix | Admin | Sí |
| `/mi-perfil` | MyProfile | Admin | Sí |
| `/analytics` | AnalyticsPage | Admin | Sí |
| `/audit` | AuditLog | Admin | Sí |
| `/settings` | SettingsPage | Admin | Sí |
| `/datos-maestros` | MasterData | Admin | Sí |
| `*` | NotFound | Main | No |

### Tienda (Ecommerce)

| Ruta | Página | Protegida |
|------|--------|-----------|
| `/` | HomePage | No |
| `/cart` | CartPage | No |
| `/checkout` | CheckoutPage | No |
| `/product/:id` | ProductDetail | No |
| `/collection` | CollectionPage | No |
| `/category/:slug` | CategoryPage | No |
| `/search` | SearchPage | No |
| `/search/:query` | SearchResults | No |
| `/order/thanks` | ThanksPage | No |
| `/order/payment` | PaymentPage | No |
| `/order/tracking/:id` | OrderTracking | No |
| `/order/confirmed` | OrderConfirmed | No |
| `/account` | AccountPage | Sí |
| `/addresses` | AddressesPage | Sí |
| `/wishlist` | WishlistPage | Sí |
| `/order/history` | OrderHistory | Sí |
| `/settings` | ProfileSettings | Sí |
| `/login` | LoginPage | No |
| `/register` | RegisterPage | No |

### Página Institucional

| Ruta | Página |
|------|--------|
| `/` | HomePage |
| `/about` | AboutPage |
| `/catalogo` | CatalogPage |
| `/promociones` | PromotionsPage |
| `/preguntas` | FAQPage |
| `/terminos` | TermsPage |
| `/politicas` | PoliciesPage |
| `/contacto` | ContactPage |
| `/services` | ServicesPage |
| `/blog` | BlogPage |
| `*` | NotFoundPage |

---

## 5. Formularios Detectados

| ID | Formulario | Frontend | Campos | Tipo |
|----|------------|----------|--------|------|
| F01 | Login | Todos | email, password, remember | Auth |
| F02 | Registro | Tienda | email, password, confirm | Auth |
| F03 | Crear Usuario | Dashboard | nombre, email, teléfono, employeeId, departamento, cargo, sede, rol, permisos, contraseña | IAM |
| F04 | Crear Producto | Dashboard | nombre, SKU, peso, colección, categoría, tags, descripción, imágenes, variantes, SEO | Catálogo |
| F05 | Crear Variante | Dashboard | producto, SKU, color, talla, material, precio, stock, peso, composición, instrucciones | Catálogo |
| F06 | Crear Cliente | Dashboard | nombre, tipo doc, nro doc, email, teléfono, web, dirección, tipo cliente, vendedor, notas | CRM |
| F07 | Editar Perfil | Todos | nombre, email, teléfono, idioma, moneda | Perfil |
| F08 | Cambio Contraseña | Todos | actual, nueva, confirmar | Seguridad |
| F09 | Dirección | Tienda | nombre, calle, ciudad, región, zip, país, teléfono | Envío |
| F10 | Checkout (paso 1) | Tienda | email, teléfono | Contacto |
| F11 | Pago | Tienda | número tarjeta, vencimiento, CVC, titular, guardar | Pago |
| F12 | Cupón | Tienda | código | Descuento |
| F13 | Multimedia | Dashboard | archivo, alt text, descripción, visible | Assets |
| F14 | Configuración | Dashboard | logo, nombre legal, RUC, rubro, email, teléfono, dirección, moneda, zona horaria, idioma | Admin |
| F15 | Contacto | Institucional | nombre, email, asunto, mensaje | Leads |
| F16 | Newsletter | Institucional, Tienda | email | Marketing |

---

## 6. Tablas Detectadas

| ID | Tabla | Frontend | Columnas |
|----|-------|----------|----------|
| T01 | Productos | Dashboard | Checkbox, Imagen, SKU, Producto, Colección, Categoría, Estado, Stock, Precio, Actualizado, Acciones |
| T02 | Variantes | Dashboard | Checkbox, Color, Talla, Material, SKU, Precio, Stock, Estado, Acciones |
| T03 | Pedidos | Dashboard | Checkbox, ID, Cliente, Fecha, Productos, Total, Estado, Pago, Envío, Acciones |
| T04 | Clientes | Dashboard | Cliente, Contacto, Tipo, Pedidos, Gasto, Última Compra, Estado, Acciones |
| T05 | Transacciones | Dashboard | ID, Pedido, Cliente, Método, Monto, Moneda, Estado, Fecha, Acciones |
| T06 | Stock | Dashboard | Checkbox, Producto, SKU, Categoría, Almacén, Unidades, Valor, Ubicación, Estado, Acciones |
| T07 | Kardex | Dashboard | Fecha, Producto, SKU, Tipo, Cantidad, Saldo, Documento, Motivo |
| T08 | Movimientos | Dashboard | ID, Fecha, Tipo, Producto/SKU, Cantidad, Origen/Destino, Responsable, Estado, Acciones |
| T09 | Envíos | Dashboard | Guía, Pedido, Cliente, Transportista, Estado, Ciudad, Despacho, Estimada, Acciones |
| T10 | Transferencias | Dashboard | ID, Fecha, Origen, Destino, Items, Responsable, Estado, Acciones |
| T11 | Campañas | Dashboard | Campaña, Tipo/Canal, Presupuesto, ROI, Estado, Acciones |
| T12 | Contenido CMS | Dashboard | Título, Tipo, Estado, Autor, Fecha, Acciones |
| T13 | Variantes Textiles | Dashboard | Checkbox, SKU, Producto, Material, Color, Talla, Temporada, Estado, Fecha, Acciones |
| T14 | Usuarios | Dashboard | Usuario, Rol, Departamento, Estado, Último Acceso, Acciones |
| T15 | Roles | Dashboard | Rol, Descripción, Usuarios, Permisos, Estado, Acciones |
| T16 | Auditoría | Dashboard | Fecha, Usuario, Módulo, Acción, Detalles, Resultado |
| T17 | Órdenes (tienda) | Tienda | ID, Fecha, Estado, Total, Items |
| T18 | Direcciones | Tienda | Nombre, Dirección, Ciudad, País, Teléfono, Default |

---

## 7. Dashboards (KPIs y Métricas)

| ID | Dashboard | Frontend | KPIs | Gráficos |
|----|-----------|----------|------|----------|
| D01 | Ejecutivo | Dashboard | 8 KPIs (Daily Sales, Monthly Sales, New Customers, Units Sold, Pending Orders, Completed Orders, Critical Items, Revenue YTD) | Barras, Donut |
| D02 | Catálogo | Dashboard | 6 KPIs (Total Products, Active SKUs, Categories, Low Stock, Avg Margin, Top Collection) | Donut, Progress bars |
| D03 | Pedidos | Dashboard | 7 KPIs (Total, Pendientes, Procesando, Enviados, Entregados, Cancelados, Devueltos) | Barras, Progress bars |
| D04 | CRM | Dashboard | 5 KPIs (Total Clients, Active, Growth, Avg Order, Retention) | Barras, Donut |
| D05 | Pagos | Dashboard | 4 KPIs (Total Recaudado, Transacciones, Comisiones, Tasa de Éxito) | Barras, Donut, Funnel |
| D06 | Inventario | Dashboard | 6 KPIs (Total Items, Total Value, Low Stock, Incoming, Turnover, Utilization) | Barras, Stacked bars |
| D07 | Logística | Dashboard | 6 KPIs (Envíos Hoy, En Tránsito, Entregados, Pendientes, Tasa, Tiempo Promedio) | Barras, Donut, Gauge |
| D08 | Marketing | Dashboard | 6 KPIs (Campañas, Reach, Conversion, ROI, Subscriptores, Seguidores) | Líneas, Donut |
| D09 | CMS | Dashboard | 6 KPIs (Total Pages, Published, Drafts, Scheduled, Visitors, Engagement) | Barras, Donut |
| D10 | Textil | Dashboard | 5 KPIs (Total Fibras, Premium, Producción, Lotes, Rendimiento) | Donut, Barras |
| D11 | Analítica | Dashboard | 4 KPIs (Ventas, Ingresos, Pedidos, Conversión) | Líneas, Donut, Progress bars |

---

## 8. Mocks Encontrados

| Tipo | Dashboard | Tienda | Institucional |
|------|-----------|--------|---------------|
| Productos | ~20 productos en listas, 8 en tabla | ~15 en various secciones | ~6 showcase |
| Clientes | ~10 (Peruanos e internacionales) | — | — |
| Pedidos | ~15 órdenes | ~5 en historial | — |
| Usuarios | ~8 empleados | — | — |
| Roles | 4 roles | — | — |
| Movimientos | ~10 en kardex, 6 en movimientos | — | — |
| Envíos | ~8 shipments | — | — |
| Transacciones | ~10 payments | — | — |
| Campañas | ~6 marketing campaigns | — | — |
| Contenido CMS | ~8 content items | — | — |
| Variantes Textiles | ~6 variantes | — | — |
| Auditoría | ~6 eventos | — | — |
| Productos mock | — | 8 en CategoryGrid, 4 en BestSellers, 4 en RecentlyViewed, 4 en RelatedProducts, 4 en InspiredBy, 4 en NewArrivals | — |
| Colecciones mock | 4 colecciones | 4 colecciones | — |
| Testimonios | — | 2 | 3 |
| Direcciones | 2 peruanas | 2 (antes internacionales) | — |
| Direcciones/Otros Datos Master | 10 entidades | — | — |
| Artesanos/Fibras | — | — | 4 materiales, 3 artesanos |

---

## 9. Entidades Candidatas Iniciales

### Núcleo del Sistema

| Entidad | Descripción | Atributos clave | Fuente |
|---------|-------------|-----------------|--------|
| `User` | Usuario del sistema (empleado) | id, name, email, password, role, department, status, phone, employeeId, position, location, avatar, lastAccess | Dashboard UserList/Create |
| `Role` | Rol de acceso | id, name, category, description, status | Dashboard RoleList |
| `Permission` | Permiso granular | id, module, action, description | Dashboard PermissionMatrix |
| `AuditLog` | Evento de auditoría | id, userId, module, action, details, ip, device, severity, createdAt | Dashboard AuditLog |
| `CompanySettings` | Configuración de empresa | id, logo, legalName, taxId, industry, email, phone, address, currency, timezone, language | Dashboard Settings |

### Catálogo

| Entidad | Descripción | Atributos clave | Fuente |
|---------|-------------|-----------------|--------|
| `Product` | Producto del catálogo | id, name, sku, description, categoryId, collectionId, material, price, weight, status, tags | Dashboard/Tienda ProductList/Detail |
| `Category` | Categoría de producto | id, name, slug, description, image | Dashboard/Tienda Category |
| `Collection` | Colección comercial | id, name, description, image, pieceCount, catalogId, active | Dashboard/Tienda Collection |
| `Variant` | Variante de producto (SKU) | id, productId, sku, color, size, material, price, stock, status | Dashboard VariantList/Create |
| `ProductMedia` | Asset multimedia | id, productId/variantId, url, type, altText, description, isPrincipal, visible, fileSize, dimensions, optimized | Dashboard ProductMedia |

### Inventario

| Entidad | Descripción | Atributos clave | Fuente |
|---------|-------------|-----------------|--------|
| `Warehouse` | Almacén / ubicación | id, name, code, location, type | Dashboard Inventory/Stock |
| `StockItem` | Ítem de inventario | id, productId, variantId, warehouseId, quantity, reserved, min, max, status | Dashboard StockList |
| `Movement` | Movimiento de kardex | id, productId, variantId, warehouseId, type, quantity, balance, documentRef, reason, userId, createdAt | Dashboard Kardex/Movement |
| `Transfer` | Transferencia entre almacenes | id, originWarehouseId, destWarehouseId, status, responsible, items, createdAt | Dashboard TransferList |

### Pedidos y Pagos

| Entidad | Descripción | Atributos clave | Fuente |
|---------|-------------|-----------------|--------|
| `Order` | Pedido (B2B) | id, clientId, status, channel, agent, subtotal, tax, shipping, total, paid, notes, createdAt | Dashboard OrderList/Detail |
| `OrderItem` | Línea de pedido | id, orderId, productId, variantId, name, sku, qty, unitPrice, total | Dashboard OrderDetail |
| `Payment` | Pago / transacción | id, orderId, clientId, method, amount, currency, status, stripeId, createdAt | Dashboard Payment/Transactions |
| `Shipment` | Envío | id, orderId, carrier, waybill, status, origin, destination, dispatchedAt, estimatedAt, trackingData | Dashboard Logistics/Shipment |

### Ecommerce (Tienda)

| Entidad | Descripción | Atributos clave | Fuente |
|---------|-------------|-----------------|--------|
| `Customer` | Cliente (B2C) | id, userId, firstName, lastName, email, phone, language, currency, loyaltyTier, loyaltyPoints, comms | Tienda Account/ProfileSettings |
| `Address` | Dirección de envío/facturación | id, customerId, name, street, city, state, zip, country, phone, email, isDefault | Tienda Addresses/Checkout |
| `Cart` | Carrito de compras | id, customerId, items, couponCode, subtotal, shipping, tax, total | Tienda Cart |
| `CartItem` | Ítem del carrito | id, cartId, productId, variantId, title, image, price, quantity, variant | Tienda Cart |
| `WishlistItem` | Ítem de lista de deseos | id, customerId, productId, variantId | Tienda Wishlist |
| `Review` | Reseña de producto | id, productId, customerId, author, rating, text, tag, createdAt | Tienda ProductReviews |
| `Coupon` | Cupón de descuento | id, code, type, value, minPurchase, maxUses, usedCount, expiresAt, active | Tienda Cart (CouponBox) |

### CRM y Marketing

| Entidad | Descripción | Atributos clave | Fuente |
|---------|-------------|-----------------|--------|
| `Client` | Cliente corporativo (B2B) | id, name, company, email, phone, type, status, documentType, documentNumber, website, assignedSeller, creditLimit, LTV, avgTicket, internalNotes | Dashboard ClientList/Create/Profile |
| `ClientAddress` | Dirección de cliente B2B | id, clientId, type, street, city, country, postalCode | Dashboard ClientProfile |
| `ClientPaymentMethod` | Método de pago de cliente | id, clientId, brand, last4, expMonth, expYear | Dashboard ClientProfile |
| `ClientNote` | Nota interna de CRM | id, clientId, userId, content, createdAt | Dashboard ClientProfile |
| `Campaign` | Campaña de marketing | id, name, type, channel, budget, spent, roi, conversions, status, startDate, endDate | Dashboard CampaignList |

### CMS y Contenido

| Entidad | Descripción | Atributos clave | Fuente |
|---------|-------------|-----------------|--------|
| `Content` | Contenido CMS | id, title, slug, type, authorId, status, body, image, publishedAt, createdAt | Dashboard ContentList |
| `FaqCategory` | Categoría de FAQ | id, name, icon, order | Institucional FAQ |
| `FaqItem` | Pregunta frecuente | id, categoryId, question, answer, order | Institucional FAQ |

### Contacto y Leads

| Entidad | Descripción | Atributos clave | Fuente |
|---------|-------------|-----------------|--------|
| `ContactInquiry` | Consulta de contacto | id, name, email, subject, message, status, createdAt | Institucional Contact |
| `NewsletterSubscriber` | Suscriptor newsletter | id, email, source, active, subscribedAt | Institucional/Tienda Newsletter |

### Institucional

| Entidad | Descripción | Atributos clave | Fuente |
|---------|-------------|-----------------|--------|
| `BrandInfo` | Información de marca | id, name, mission, vision, foundingYear, artisanCount, location, atelier, socialLinks | Institucional About |
| `ArtisanProcess` | Proceso artesanal | id, title, subtitle, description, image, order | Institucional About |
| `GalleryImage` | Imagen de galería | id, url, title, season, tags | Institucional Gallery |
| `Promotion` | Promoción institucional | id, title, description, image, type, ctaText, ctaLink, active, startDate, endDate | Institucional Promotions |
| `Material` | Fibra / material textil | id, name, micronRating, origin, certification, description, image | Institucional Catalog/About |

### Textil

| Entidad | Descripción | Atributos clave | Fuente |
|---------|-------------|-----------------|--------|
| `TextileVariant` | Variante textil (materia prima) | id, sku, product, materialId, colorId, sizeId, seasonId, weight, composition, status | Dashboard TextileVariantList |
| `FiberMaterial` | Tipo de fibra | id, name, category, composition, origin, certifications | Dashboard Textile/Variants |
| `CareInstruction` | Instrucción de cuidado | id, name, icon, active | Dashboard Textile/Variants |

---

## 10. Riesgos y Contradicciones

| ID | Riesgo | Descripción | Severidad |
|----|--------|-------------|-----------|
| R01 | Nomenclatura inconsistente | "Cliente" en Dashboard (B2B) vs "Customer" en Tienda (B2C). Misma entidad conceptual pero diferentes atributos. | Alta |
| R02 | IDs solapados | Dashboard usa formato `APC-982341` para órdenes. Tienda usa `#ORD-4921`. Sin consistencia. | Media |
| R03 | Status enums divergentes | Dashboard: `Entregado/Enviado/Pendiente/Procesando/Cancelado`. Tienda: `shipped/delivered/cancelled/processing/pending`. Mapeo necesario. | Alta |
| R04 | Sin endpoints reales | Todos los datos son mock. No existe un contrato API real. | Alta |
| R05 | Sin manejo de errores real | Los formularios simulan errores pero no hay manejo de http status codes consistente. | Media |
| R06 | Autenticación duplicada | Cada frontend tiene su propio AuthContext y manejo de tokens. Debería ser unificado. | Media |
| R07 | Variantes duplicadas | `ProductVariant` (Dashboard Catálogo) y `TextileVariant` (Dashboard Textil) son dominios diferentes pero comparten atributos. | Media |
| R08 | Sin paginación real en mocks | Los totales (154 usuarios, 4200 productos, etc.) son ficticios. | Baja |
| R09 | Sin i18n en datos | Dashboard en español, Tienda localizada, pero datos mock sin considerar multi-idioma. | Baja |
| R10 | Imágenes externas | Todas las imágenes referencian un bucket público de Google (`lh3.googleusercontent.com`). Sin control. | Media |

---

## 11. Vacíos de Información

| ID | Vacío | Impacto |
|----|-------|---------|
| V01 | Sin definición de talleres / producción | El dashboard menciona "Production" en sidebar pero no hay páginas de producción real. |
| V02 | Sin RRHH / asistencias | No hay páginas para empleados fuera de IAM. |
| V03 | Sin proveedores | No hay módulo de proveedores/abastecimiento. |
| V04 | Sin contratos | No hay gestión de contratos comerciales. |
| V05 | Sin fleet management | Logística usa transportistas externos sin gestión de flota propia. |
| V06 | Sin ecommerce completo | Faltan páginas de pago real, catálogo completo con búsqueda avanzada, etc. |
| V07 | Sin notificaciones reales | Los emails de confirmación y notificaciones son simulados. |
| V08 | Sin reporting real | Los reportes y gráficos son mock estáticos sin datos reales. |
| V09 | Sin autenticación social | Solo login por email/contraseña. |

---

## 12. Matriz de Trazabilidad

| Entidad | Dashboard | Tienda | Institucional | Endpoints estimados |
|---------|-----------|--------|---------------|---------------------|
| User | ✓ | ✓ | ✓ | 8 |
| Role | ✓ | — | — | 5 |
| Permission | ✓ | — | — | 2 |
| AuditLog | ✓ | — | — | 4 |
| CompanySettings | ✓ | — | — | 3 |
| Product | ✓ | ✓ | ✓ | 10 |
| Category | ✓ | ✓ | — | 4 |
| Collection | ✓ | ✓ | — | 4 |
| Variant | ✓ | ✓ | — | 10 |
| ProductMedia | ✓ | ✓ | — | 8 |
| Warehouse | ✓ | — | — | 4 |
| StockItem | ✓ | ✓ | — | 6 |
| Movement | ✓ | — | — | 6 |
| Transfer | ✓ | — | — | 5 |
| Order | ✓ | ✓ | — | 10 |
| OrderItem | ✓ | ✓ | — | 2 |
| Payment | ✓ | ✓ | — | 6 |
| Shipment | ✓ | — | — | 7 |
| Customer | — | ✓ | — | 6 |
| Address | — | ✓ | — | 6 |
| Cart | — | ✓ | — | 6 |
| CartItem | — | ✓ | — | 3 |
| WishlistItem | — | ✓ | — | 4 |
| Review | — | ✓ | — | 3 |
| Coupon | — | ✓ | — | 2 |
| Client | ✓ | — | — | 10 |
| Campaign | ✓ | — | — | 6 |
| Content | ✓ | — | — | 6 |
| FaqItem | — | — | ✓ | 3 |
| ContactInquiry | — | — | ✓ | 1 |
| NewsletterSubscriber | — | ✓ | ✓ | 2 |
| BrandInfo | — | — | ✓ | 2 |
| Promotion | — | — | ✓ | 3 |
| Material | ✓ | — | ✓ | 4 |
| TextileVariant | ✓ | — | — | 5 |
| CareInstruction | ✓ | — | — | 2 |
| GalleryImage | — | — | ✓ | 2 |
| Auth (login/register) | ✓ | ✓ | ✓ | 5 |
| **Total** | **30** | **18** | **12** | **~180** |

---

*Documento generado el 2026-07-10. Próximo paso: diseñar modelo de datos PostgreSQL.*
