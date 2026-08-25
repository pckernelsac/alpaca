# Rutas, Páginas y Acciones — ALPACART

## 1. Resumen

| Frontend | Páginas analizadas | Rutas | Acciones detectadas |
|----------|-------------------|-------|---------------------|
| Dashboard (ERP) | 41 | 41 | ~200 |
| Tienda (Ecommerce) | 19 | 19 | ~60 |
| Página Institucional | 12 | 13 | ~30 |
| **Total** | **72** | **73** | **~290** |

## 2. Matriz de Acciones por Dominio

### 2.1 Auth

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| Login (Dashboard) | `/login` | Iniciar sesión | email, password, remember | Token, User | `AuthContext.login()` |
| Login (Dashboard) | `/login` | Toggle password visibility | — | show/hide password | `togglePw` button |
| Login (Dashboard) | `/login` | Olvidó contraseña | — | link a recuperación | `<a>` tag (href=#) |
| Login (Tienda) | `/login` | Iniciar sesión | email, password | Token, User → redirect `/account` | `AuthContext.login()` |
| Login (Tienda) | `/login` | Registrarse | — | navegar a `/register` | Link component |
| Register (Tienda) | `/register` | Registrarse | email, password | Token, User | Placeholder (no implementado) |

### 2.2 Dashboard Ejecutivo

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| Dashboard | `/` | Filtrar por período | Hoy/Semana/Mes | KPIs actualizados | `period` state toggle |
| Dashboard | `/` | Ver todos los pedidos | — | navegar a `/orders/list` | Link "Ver todo" |
| Dashboard | `/` | Acceso rápido: Nuevo Producto | — | navegar a `/catalog/productos/nuevo` | Quick action card |
| Dashboard | `/` | Acceso rápido: Nuevo Pedido | — | navegar a `/orders/list` | Quick action card |
| Dashboard | `/` | Acceso rápido: Nuevo Cliente | — | navegar a `/crm/clientes/nuevo` | Quick action card |
| Dashboard | `/` | Acceso rápido: Nueva Promoción | — | navegar a `/marketing/campanas` | Quick action card |
| Dashboard | `/` | Ver detalle pedido | orderId | Modal/detalle | `more_horiz` button |

### 2.3 Catálogo

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| CatalogDashboard | `/catalog` | Nueva Categoría | — | Modal/Create | Action button |
| CatalogDashboard | `/catalog` | Nueva Colección | — | Modal/Create | Action button |
| CatalogDashboard | `/catalog` | Nuevo Producto | — | navegar a `/catalog/productos/nuevo` | Action button |
| ProductList | `/catalog/productos` | Listar productos | page, search, filters[] | Product[] | DataTable + pagination |
| ProductList | `/catalog/productos` | Buscar productos | search text (SKU/nombre/categoría) | Product[] filtrados | SearchInput |
| ProductList | `/catalog/productos` | Filtrar por colección | collectionId | Product[] filtrados | Select dropdown |
| ProductList | `/catalog/productos` | Filtrar por categoría | categoryId | Product[] filtrados | Select dropdown |
| ProductList | `/catalog/productos` | Filtrar por estado | status (Activo/Oculto/Descontinuado) | Product[] filtrados | Select dropdown |
| ProductList | `/catalog/productos` | Filtrar por nivel stock | stockLevel | Product[] filtrados | Select dropdown |
| ProductList | `/catalog/productos` | Seleccionar productos | checkbox[] | bulk action toolbar | Checkbox + master checkbox |
| ProductList | `/catalog/productos` | Bulk: Cambiar estado | productIds[], newStatus | Product[] actualizados | Bulk action button |
| ProductList | `/catalog/productos` | Bulk: Mover a colección | productIds[], collectionId | Product[] actualizados | Bulk action button |
| ProductList | `/catalog/productos` | Bulk: Eliminar | productIds[] | Product[] eliminados | Bulk action button |
| ProductList | `/catalog/productos` | Editar producto | productId | navegar a edit | Edit button per row |
| ProductList | `/catalog/productos` | Importar productos | CSV/Excel file | Product[] creados | Import button |
| ProductList | `/catalog/productos` | Exportar productos | filter params | CSV/Excel download | Export button |
| ProductCreate | `/catalog/productos/nuevo` | Crear producto (paso 1) | nombre, SKU, peso, colección, categoría, tags | Product (borrador) | Form tab 1 |
| ProductCreate | `/catalog/productos/nuevo` | Subir imágenes | images[] | Media[] | Drag & drop upload |
| ProductCreate | `/catalog/productos/nuevo` | Generar variantes | attributes | Variant[] | Generate variants button |
| ProductCreate | `/catalog/productos/nuevo` | Guardar borrador | partial product data | Product (draft) | Save draft button |
| ProductCreate | `/catalog/productos/nuevo` | Publicar producto | full product data | Product (published) | Publish button |
| ProductCreate | `/catalog/productos/nuevo` | Aplicar plantilla AI | product data | AI suggestion | AI template button |
| VariantList | `/catalog/variantes` | Listar variantes | productId | Variant[] | DataTable |
| VariantList | `/catalog/variantes` | Editar SKU inline | variantId, newSku | Variant actualizada | Inline editable cell |
| VariantList | `/catalog/variantes` | Editar precio inline | variantId, newPrice | Variant actualizada | Inline editable cell |
| VariantList | `/catalog/variantes` | Editar stock inline | variantId, newStock | Variant actualizada | Inline editable number |
| VariantList | `/catalog/variantes` | Cambiar estado variante | variantId, newStatus | Variant actualizada | Select dropdown per row |
| VariantList | `/catalog/variantes` | Duplicar variante | variantId | Variant duplicada | Copy button |
| VariantList | `/catalog/variantes` | Eliminar variante | variantId | Variant eliminada | Delete button |
| VariantList | `/catalog/variantes` | Generar variantes | product attributes | Variant[] creadas | Generate button |
| VariantList | `/catalog/variantes` | Edición masiva | variantIds[], field, value | Variant[] actualizadas | Bulk edit button |
| VariantCreate | `/catalog/variantes/nueva` | Crear variante | SKU, color, talla, material, precio, stock, peso, composición | Variant creada | Multi-tab form |
| ProductMedia | `/catalog/productos/multimedia` | Subir asset multimedia | file (JPG/PNG/MP4 hasta 50MB) | Media | Drag & drop zone |
| ProductMedia | `/catalog/productos/multimedia` | Editar metadatos asset | assetId, altText, description, visible | Media actualizada | Detail panel form |
| ProductMedia | `/catalog/productos/multimedia` | Optimizar imagen | assetId | Media optimizada | Optimize button |
| ProductMedia | `/catalog/productos/multimedia` | Eliminar asset | assetId | Media eliminada | Delete button |
| ProductMedia | `/catalog/productos/multimedia` | Cambiar vista | grid/list | view toggle | Toggle button |

### 2.4 Producto (Tienda)

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| ProductDetail | `/product/:id` | Ver detalle producto | productId | Product (images, price, description, variants) | Ruta con parámetro |
| ProductDetail | `/product/:id` | Seleccionar color | colorIndex | UI update | VariantSelector swatches |
| ProductDetail | `/product/:id` | Seleccionar talla | sizeIndex | UI update | VariantSelector buttons |
| ProductDetail | `/product/:id` | Comprar ahora | product, variant | navegar a checkout | BuyNow button |
| ProductDetail | `/product/:id` | Añadir a colección | product | Wishlist | Add to collection button |
| ProductDetail | `/product/:id` | Ver guía de tallas | — | Modal/PDF | Size Guide link |
| ProductDetail | `/product/:id` | Ver reseñas | productId | Review[] | Accordion tab |
| Category | `/category/:slug` | Filtrar categoría | categorySlug | Product[] | Sidebar filter |
| Category | `/category/:slug` | Ordenar productos | sortOption | Product[] ordenados | Sort dropdown |
| Category | `/category/:slug` | Agregar al carrito | product | CartItem | Add to cart button |
| SearchResults | `/search/:query` | Buscar productos | query term | Product[] | SearchOverlay |
| Collection | `/collection` | Explorar colección | collectionSlug | navegar a `/category/:slug` | CollectionCard CTA |

### 2.5 Carrito y Checkout (Tienda)

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| Cart | `/cart` | Ver carrito | — | CartItem[] from store | Cart page |
| Cart | `/cart` | Actualizar cantidad | itemId, newQty | CartItem actualizado | Quantity buttons |
| Cart | `/cart` | Eliminar item | itemId | CartItem eliminado | Remove button |
| Cart | `/cart` | Aplicar cupón | couponCode | Discount aplicado | CouponBox |
| Cart | `/cart` | Finalizar compra | — | navegar a `/checkout` | Checkout button |
| Cart | `/cart` | Seguir comprando | — | navegar a `/collection` | Continue link |
| Checkout | `/checkout` | Ingresar contacto | email, phone | Step complete | AddressForm step 1 |
| Checkout | `/checkout` | Ingresar dirección | name, street, city, country | Step complete | AddressForm step 2 |
| Checkout | `/checkout` | Revisar pedido | order summary | Step complete | Review step |
| Checkout | `/checkout` | Confirmar pago | order data | navegar a `/order/payment` | Place order button |
| Payment | `/order/payment` | Procesar pago | card number, expiry, cvc, name | Transaction | PaymentMethod form |
| Payment | `/order/payment` | Guardar tarjeta | saveCard boolean | Preference | Save card toggle |

### 2.6 Órdenes y Post-Compra (Tienda)

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| Thanks | `/order/thanks` | Rastrear pedido | orderId | navegar a `/order/tracking/:id` | Track button |
| Thanks | `/order/thanks` | Seguir comprando | — | navegar a `/collection` | Continue button |
| OrderTracking | `/order/tracking/:id` | Ver seguimiento | orderId | Tracking timeline | Ruta con parámetro |
| OrderTracking | `/order/tracking/:id` | Descargar factura | orderId | PDF download | Download link |
| OrderHistory | `/order/history` | Ver historial | userId | Order[] | Page data |
| OrderHistory | `/order/history` | Ver detalle pedido | orderId | navegar a `/order/tracking/:id` | OrderCard link |
| Account | `/account` | Ver datos cuenta | userId | Profile, puntos, pedidos | Account page |
| Account | `/account` | Navegar a direcciones | — | navegar a `/addresses` | Quick link card |
| Account | `/account` | Navegar a wishlist | — | navegar a `/wishlist` | Quick link card |
| Account | `/account` | Navegar a settings | — | navegar a `/settings` | Quick link card |
| Wishlist | `/wishlist` | Compartir lista | wishlistId | Share link | Share button |
| Wishlist | `/wishlist` | Eliminar item | productId | Wishlist actualizada | Remove button |
| Wishlist | `/wishlist` | Mover al carrito | product | CartItem + Wishlist actualizada | Move to bag button |
| Addresses | `/addresses` | Listar direcciones | userId | Address[] | Address page |
| Addresses | `/addresses` | Añadir dirección | address data | Address creada | Add button |
| Addresses | `/addresses` | Editar dirección | addressId, data | Address actualizada | Edit button |
| Addresses | `/addresses` | Eliminar dirección | addressId | Address eliminada | Delete button |
| Addresses | `/addresses` | Establecer predeterminada | addressId | Address actualizada | Set default button |
| ProfileSettings | `/settings` | Actualizar perfil | firstName, lastName, email, phone | User actualizado | Form submit |
| ProfileSettings | `/settings` | Cambiar contraseña | currentPw, newPw | Password actualizada | Security form |
| ProfileSettings | `/settings` | Actualizar preferencias | language, currency, comms | User actualizado | Preferences form |

### 2.7 Pedidos (Dashboard)

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| OrderDashboard | `/orders` | Exportar pedidos | filter params | CSV/PDF | Export button |
| OrderDashboard | `/orders` | Consultar pedido | orderId | navegar a detalle | Consult button |
| OrderDashboard | `/orders` | Nuevo pedido | — | navegar a create | New button |
| OrderList | `/orders/list` | Listar pedidos | page, filters[] | Order[] | DataTable + pagination |
| OrderList | `/orders/list` | Filtrar por estado | status | Order[] filtrados | Chip filter |
| OrderList | `/orders/list` | Filtrar por pago | paymentStatus | Order[] filtrados | Chip filter |
| OrderList | `/orders/list` | Filtrar por envío | shippingStatus | Order[] filtrados | Chip filter |
| OrderList | `/orders/list` | Bulk: cambiar estado | orderIds[], newStatus | Order[] actualizadas | Bulk action |
| OrderList | `/orders/list` | Bulk: imprimir etiquetas | orderIds[] | Labels PDF | Bulk action |
| OrderList | `/orders/list` | Importar pedidos | CSV/Excel | Order[] creadas | Import button |
| OrderList | `/orders/list` | Exportar pedidos | filter params | CSV/Excel | Export button |
| OrderList | `/orders/list` | Ver detalle | orderId | navegar a detalle | View button |
| OrderDetail | `/pedidos/detalle` | Ver detalle pedido | orderId | Order completo | Page data |
| OrderDetail | `/pedidos/detalle` | Contactar cliente | clientId | Email/tel | Contact button |
| OrderDetail | `/pedidos/detalle` | Imprimir factura | orderId | Invoice PDF | Print button |
| OrderDetail | `/pedidos/detalle` | Exportar PDF | orderId | PDF download | Export button |
| OrderDetail | `/pedidos/detalle` | Cambiar estado | orderId, newStatus | Order actualizada | Status change |
| OrderDetail | `/pedidos/detalle` | Agregar nota | orderId, note text | Note creada | Textarea + submit |
| OrderTimeline | `/pedidos/seguimiento` | Ver timeline | orderId | Timeline events | Page data |
| OrderTimeline | `/pedidos/seguimiento` | Imprimir acta | orderId | PDF | Print button |
| OrderTimeline | `/pedidos/seguimiento` | Notificar cliente | orderId | Notificación enviada | Notify button |
| OrderTimeline | `/pedidos/seguimiento` | Filtrar eventos | event types | Timeline filtrado | Checkbox filters |

### 2.8 CRM

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| CrmDashboard | `/crm` | Exportar reporte | filter params | CSV/PDF | Export button |
| CrmDashboard | `/crm` | Nuevo cliente | — | navegar a `/crm/clientes/nuevo` | New client button |
| CrmDashboard | `/crm` | Filtrar por período | period | KPIs actualizados | Period select |
| ClientList | `/crm/clientes` | Listar clientes | page, filters[] | Client[] | DataTable + pagination |
| ClientList | `/crm/clientes` | Buscar clientes | search text | Client[] filtrados | SearchInput |
| ClientList | `/crm/clientes` | Filtrar por estado | status (Todos/Activo/Inactivo/VIP) | Client[] filtrados | Select dropdown |
| ClientList | `/crm/clientes` | Filtrar por tipo | type (Mayorista/Minorista) | Client[] filtrados | Select dropdown |
| ClientList | `/crm/clientes` | Filtrar por ubicación | location | Client[] filtrados | Select dropdown |
| ClientList | `/crm/clientes` | Exportar clientes | filter params | CSV | Export button |
| ClientList | `/crm/clientes` | Ver perfil | clientId | navegar a perfil | Edit/view button |
| ClientCreate | `/crm/clientes/nuevo` | Crear cliente | name, doc, email, phone, address, type, seller, notes | Client creado | Multi-tab form |
| ClientCreate | `/crm/clientes/nuevo` | Subir avatar | image | Avatar | Upload zone |
| ClientCreate | `/crm/clientes/nuevo` | Alternar estado | active/inactive | Client actualizado | Toggle switch |
| ClientProfile | `/crm/clientes/perfil` | Ver perfil completo | clientId | Client (LTV, orders, contacts, timeline) | Page data |
| ClientProfile | `/crm/clientes/perfil` | Editar cliente | clientId | navegar a edit | Edit button |
| ClientProfile | `/crm/clientes/perfil` | Contactar cliente | clientId | Email/tel | Contact button |
| ClientProfile | `/crm/clientes/perfil` | Nuevo pedido | clientId | navegar a crear pedido | New order button |
| ClientProfile | `/crm/clientes/perfil` | Agregar nota rápida | clientId, note | Note creada | Quick note input |

### 2.9 Pagos (Dashboard)

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| PaymentDashboard | `/payments` | Exportar datos | filter params | CSV/PDF | Export button |
| PaymentDashboard | `/payments` | Generar reporte | filter params | Report | Generate button |
| PaymentDashboard | `/payments` | Buscar pago | search text | Payment[] | Search input |
| TransactionList | `/payments/transactions` | Listar transacciones | page, filters[] | Transaction[] | DataTable |
| TransactionList | `/payments/transactions` | Filtrar por rango fecha | dateRange | Transaction[] filtrados | Select |
| TransactionList | `/payments/transactions` | Filtrar por estado | status | Transaction[] filtrados | Select |
| TransactionList | `/payments/transactions` | Filtrar por método | method | Transaction[] filtrados | Select |
| TransactionList | `/payments/transactions` | Filtrar por moneda | currency | Transaction[] filtrados | Select |
| TransactionList | `/payments/transactions` | Exportar CSV | filter params | CSV | Export button |
| TransactionList | `/payments/transactions` | Batch approval | transactionIds[] | Transaction[] aprobadas | Batch button |
| TransactionList | `/payments/transactions` | Ver detalle | transactionId | Transaction | View button |
| TransactionList | `/payments/transactions` | Reembolsar | transactionId | Refund | Refund button |

### 2.10 Inventario

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| InventoryDashboard | `/inventory` | Filtrar por almacén | warehouseId | KPIs actualizados | Select |
| InventoryDashboard | `/inventory` | Filtrar por período | period | Charts actualizados | Select |
| InventoryDashboard | `/inventory` | Reabastecer | productId | Order de compra | Alert action button |
| InventoryDashboard | `/inventory` | Ver transferencias | — | navegar a transfers | Alert action button |
| InventoryDashboard | `/inventory` | Nueva transferencia | — | FAB modal | FAB action |
| InventoryDashboard | `/inventory` | Nuevo ajuste | — | FAB modal | FAB action |
| InventoryDashboard | `/inventory` | Nuevo ingreso | — | FAB modal | FAB action |
| StockList | `/inventory/stock` | Listar stock | page, filters[] | StockItem[] | DataTable |
| StockList | `/inventory/stock` | Buscar producto | search text | StockItem[] filtrados | SearchInput |
| StockList | `/inventory/stock` | Filtrar por almacén | warehouseId | StockItem[] filtrados | Select |
| StockList | `/inventory/stock` | Filtrar por categoría | categoryId | StockItem[] filtrados | Select |
| StockList | `/inventory/stock` | Filtrar por estado stock | stockStatus | StockItem[] filtrados | Select |
| StockList | `/inventory/stock` | Ajustar stock | productId, newQty | Stock actualizado | Adjust button |
| StockList | `/inventory/stock` | Importar stock | CSV/Excel | Stock actualizado | Import button |
| StockList | `/inventory/stock` | Exportar stock | filter params | CSV/Excel | Export button |
| StockList | `/inventory/stock` | Cambiar vista | table/cards | View toggle | Toggle |
| KardexPage | `/inventory/kardex` | Listar movimientos | page, filters[] | Movement[] | DataTable |
| KardexPage | `/inventory/kardex` | Filtrar por rango fecha | dateFrom, dateTo | Movement[] filtrados | Date inputs |
| KardexPage | `/inventory/kardex` | Filtrar por almacén | warehouseId | Movement[] filtrados | Select |
| KardexPage | `/inventory/kardex` | Filtrar por tipo | type | Movement[] filtrados | Select |
| KardexPage | `/inventory/kardex` | Exportar PDF/Excel | filter params | PDF/Excel | Export button |
| KardexPage | `/inventory/kardex` | Ver timeline | movementId | Timeline sidebar | Row click |
| MovementList | `/inventory/movements` | Listar movimientos | page, filters[] | Movement[] | DataTable |
| MovementList | `/inventory/movements` | Nuevo movimiento | movement data | Movement creado | New button |
| MovementList | `/inventory/movements` | Exportar | filter params | CSV | Export button |
| MovementList | `/inventory/movements` | Importar | CSV/Excel | Movement[] | Import button |

### 2.11 Logística

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| LogisticsDashboard | `/logistics` | Exportar datos | filter params | CSV/PDF | Export button |
| LogisticsDashboard | `/logistics` | Rastrear guía | waybill | Tracking info | Track button |
| LogisticsDashboard | `/logistics` | Nuevo envío | — | navegar a create | New shipment button |
| ShipmentList | `/logistics/envios` | Listar envíos | page, filters[] | Shipment[] | DataTable |
| ShipmentList | `/logistics/envios` | Filtrar por pestaña | All/Exceptions/Watchlist | Shipment[] filtrados | Tabs |
| ShipmentList | `/logistics/envios` | Rastrear | waybill | Tracking info | Track button |
| ShipmentList | `/logistics/envios` | Ver timeline | waybill | Timeline | Timeline button |
| ShipmentList | `/logistics/envios` | Imprimir etiqueta | waybill | Label PDF | Print button |
| ShipmentList | `/logistics/envios` | Notificar clientes | shipmentIds[] | Notificaciones | Notify button |

### 2.12 Marketing

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| MarketingDashboard | `/marketing` | Nuevo cupón | — | Modal/Create | Action button |
| MarketingDashboard | `/marketing` | Nueva promoción | — | Modal/Create | Action button |
| MarketingDashboard | `/marketing` | Nueva campaña | — | navegar a crear | Action button |
| CampaignList | `/marketing/campanas` | Listar campañas | page, filters[] | Campaign[] | DataTable |
| CampaignList | `/marketing/campanas` | Filtrar por estado | status | Campaign[] filtrados | Select |
| CampaignList | `/marketing/campanas` | Filtrar por canal | channel | Campaign[] filtrados | Select |
| CampaignList | `/marketing/campanas` | Filtrar por fecha | date | Campaign[] filtrados | Date input |
| CampaignList | `/marketing/campanas` | Preview campaña | campaignId | Preview modal | Preview button |
| CampaignList | `/marketing/campanas` | Editar campaña | campaignId | navegar a edit | Edit button |
| CampaignList | `/marketing/campanas` | Ver analytics | campaignId | Analytics modal | Analytics button |
| CampaignList | `/marketing/campanas` | Crear cupón | — | Modal/Create | Action button |
| CampaignList | `/marketing/campanas` | Nueva landing page | — | navegar a crear | Action button |

### 2.13 CMS

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| CmsDashboard | `/cms` | New Page | — | navegar a crear | Quick action button |
| CmsDashboard | `/cms` | New Banner | — | navegar a crear | Quick action button |
| CmsDashboard | `/cms` | New Campaign | — | navegar a crear | Quick action button |
| ContentList | `/cms/contenido` | Listar contenido | page, filters[] | Content[] | DataTable + card view |
| ContentList | `/cms/contenido` | Filtrar por tipo | type (Page/Blog/Banner/Collection/Promo/FAQ) | Content[] filtrados | Select |
| ContentList | `/cms/contenido` | Filtrar por estado | status (Published/Draft/Scheduled/Review) | Content[] filtrados | Select |
| ContentList | `/cms/contenido` | Filtrar por autor | authorId | Content[] filtrados | Select |
| ContentList | `/cms/contenido` | Nuevo contenido | — | navegar a crear | New button |
| ContentList | `/cms/contenido` | Editar contenido | contentId | navegar a edit | Edit button |
| ContentList | `/cms/contenido` | Preview contenido | contentId | Preview | Preview button |
| ContentList | `/cms/contenido` | Duplicar contenido | contentId | Content duplicado | Duplicate button |
| ContentList | `/cms/contenido` | Eliminar contenido | contentId | Content eliminado | Delete button |
| ContentList | `/cms/contenido` | Cambiar vista | list/card | View toggle | Toggle |

### 2.14 Textil

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| TextileDashboard | `/textile` | Nueva variante | — | navegar a crear | Action button |
| TextileDashboard | `/textile` | Nuevo material | — | Modal/Create | Action button |
| TextileDashboard | `/textile` | Nueva colección | — | Modal/Create | Action button |
| TextileVariantList | `/textil/variantes` | Listar variantes | page, filters[] | TextileVariant[] | DataTable |
| TextileVariantList | `/textil/variantes` | Crear variante | — | navegar a crear | Create button |
| TextileVariantList | `/textil/variantes` | Importar variantes | CSV/Excel | Variant[] | Import button |
| TextileVariantList | `/textil/variantes` | Exportar variantes | filter params | CSV/Excel | Export button |
| TransferList | `/textile/transferencias` | Listar transferencias | page, filters[] | Transfer[] | DataTable |
| TransferList | `/textile/transferencias` | Filtrar avanzado | filters[] | Transfer[] filtrados | Advanced filters |
| TransferList | `/textile/transferencias` | Ver detalle | transferId | Timeline sidebar | Row click |

### 2.15 Usuarios/IAM

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| UserList | `/usuarios` | Listar usuarios | page, filters[] | User[] | DataTable |
| UserList | `/usuarios` | Buscar usuario | search text | User[] filtrados | SearchInput |
| UserList | `/usuarios` | Filtrar por rol | role | User[] filtrados | Select |
| UserList | `/usuarios` | Filtrar por estado | status | User[] filtrados | Select |
| UserList | `/usuarios` | Filtrar por departamento | department | User[] filtrados | Select |
| UserList | `/usuarios` | Exportar usuarios | filter params | CSV | Export button |
| UserList | `/usuarios` | Crear usuario | — | navegar a `/usuarios/nuevo` | Create button |
| UserCreate | `/usuarios/nuevo` | Subir foto | image | Avatar | Upload zone |
| UserCreate | `/usuarios/nuevo` | Crear usuario | name, email, phone, employeeId, department, position, location, role, permissions, password | User creado | Multi-section form |
| UserCreate | `/usuarios/nuevo` | Forzar cambio clave | forceReset boolean | User config | Toggle |
| UserCreate | `/usuarios/nuevo` | Guardar y continuar | partial user data | User (draft) | Save button |
| RoleList | `/usuarios/roles` | Listar roles | page, filters[] | Role[] | DataTable |
| RoleList | `/usuarios/roles` | Buscar roles | search text | Role[] filtrados | SearchInput |
| RoleList | `/usuarios/roles` | Filtrar por estado | status | Role[] filtrados | Select |
| RoleList | `/usuarios/roles` | Filtrar por categoría | category | Role[] filtrados | Select |
| RoleList | `/usuarios/roles` | Exportar roles | filter params | CSV | Export button |
| RoleList | `/usuarios/roles` | Crear nuevo rol | — | Modal/Create | Create button |
| RoleList | `/usuarios/roles` | Duplicar rol | roleId | Role duplicado | Copy button |
| RoleList | `/usuarios/roles` | Editar rol | roleId | navegar a edit | Edit button |
| RoleList | `/usuarios/roles` | Eliminar rol | roleId | Role eliminado | Delete button |
| PermissionMatrix | `/usuarios/permisos` | Ver matriz | — | Permission[][] | Matrix table |
| PermissionMatrix | `/usuarios/permisos` | Buscar permisos | search text | Permission[][] filtrados | SearchInput |
| PermissionMatrix | `/usuarios/permisos` | Alternar permiso | roleId, permissionId, checked | Permission actualizado | Checkbox matrix |
| PermissionMatrix | `/usuarios/permisos` | Exportar matriz | — | CSV/PDF | Export button |
| PermissionMatrix | `/usuarios/permisos` | Guardar cambios | Permission[][] | Permisos actualizados | Save button |
| MyProfile | `/mi-perfil` | Actualizar perfil | name, position, email, phone | User actualizado | Form inputs |
| MyProfile | `/mi-perfil` | Cambiar contraseña | currentPw, newPw | Password actualizada | Password form |
| MyProfile | `/mi-perfil` | Subir avatar | image | Avatar actualizado | Upload overlay |
| MyProfile | `/mi-perfil` | Cerrar sesiones | — | Sessions cerradas | Close all button |
| MyProfile | `/mi-perfil` | Cerrar sesión específica | sessionId | Session cerrada | Logout button |
| MyProfile | `/mi-perfil` | Descargar datos | userId | JSON download | Download button |
| MyProfile | `/mi-perfil` | Desactivar cuenta | userId | Account desactivada | Deactivate button |
| MyProfile | `/mi-perfil` | Notificaciones push | enabled boolean | Preference actualizada | Toggle |
| MyProfile | `/mi-perfil` | Reportes semanales | enabled boolean | Preference actualizada | Toggle |

### 2.16 Analítica y Auditoría

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| AnalyticsPage | `/analytics` | Filtrar por período | dateRange | KPIs actualizados | Period picker |
| AnalyticsPage | `/analytics` | Exportar datos | filter params | CSV | Export button |
| AuditLog | `/audit` | Listar logs | page, filters[] | AuditEvent[] | DataTable |
| AuditLog | `/audit` | Buscar | search text | AuditEvent[] filtrados | SearchInput |
| AuditLog | `/audit` | Filtrar por módulo | module | AuditEvent[] filtrados | Select |
| AuditLog | `/audit` | Filtrar por acción | action | AuditEvent[] filtrados | Select |
| AuditLog | `/audit` | Exportar CSV/PDF | filter params | CSV/PDF | Export button |
| AuditLog | `/audit` | Generar reporte incidente | filter params | Report | FAB button |

### 2.17 Configuración y Datos Maestros

| Página | Ruta | Acción | Datos entrada | Datos salida | Evidencia |
|--------|------|--------|---------------|---------------|-----------|
| SettingsPage | `/settings` | Actualizar empresa | logo, legalName, taxId, industry, website, email, phone, address, currency, timezone, language | Company actualizada | Multi-section form |
| SettingsPage | `/settings` | Subir logo | image (SVG/PNG/JPG max 5MB) | Logo | Upload zone |
| MasterData | `/datos-maestros` | Sincronizar todo | — | All entities synced | Sync button |
| MasterData | `/datos-maestros` | Nueva entidad | — | Modal/Create | New button |
| MasterData | `/datos-maestros` | Gestionar entidad | entityType | navegar a gestión | Manage button |
| MasterData | `/datos-maestros` | Ejecutar diagnóstico | — | Integrity report | Diagnostic button |

## 3. Patrones de Navegación Dependientes de ID

| Desde | Hacia | Parámetro | Frontend |
|-------|-------|-----------|----------|
| ProductList | ProductEdit | `productId` | Dashboard |
| VariantList | VariantEdit | `variantId` | Dashboard |
| OrderList | OrderDetail | `orderId` | Dashboard |
| OrderList | OrderTimeline | `orderId` | Dashboard |
| ClientList | ClientProfile | `clientId` | Dashboard |
| ClientList | ClientEdit | `clientId` | Dashboard |
| UserList | UserEdit | `userId` | Dashboard |
| RoleList | RoleEdit | `roleId` | Dashboard |
| StockList | StockAdjust | `productId`/`sku` | Dashboard |
| TransferList | TransferDetail | `transferId` | Dashboard |
| ShipmentList | ShipmentTrack | `waybill` | Dashboard |
| CampaignList | CampaignEdit | `campaignId` | Dashboard |
| ContentList | ContentEdit | `contentId` | Dashboard |
| MasterData | EntityManage | `entityType` | Dashboard |
| Category | ProductDetail | `productId` | Tienda |
| SearchResults | ProductDetail | `productId` | Tienda |
| Wishlist | ProductDetail | `productId` | Tienda |
| OrderHistory | OrderTracking | `orderId` | Tienda |
| Thanks | OrderTracking | `orderId` | Tienda |
| Addresses | AddressEdit | `addressId` | Tienda |

## 4. Acciones CRUD por Entidad

| Entidad | Crear | Leer | Actualizar | Eliminar | Otras |
|---------|-------|------|------------|----------|-------|
| User | ✓ | ✓ | ✓ | ✓ | Activar/desactivar/suspender, exportar |
| Role | ✓ | ✓ | ✓ | ✓ | Duplicar, exportar |
| Permission | — | ✓ | ✓ | — | Exportar matriz |
| Product | ✓ | ✓ | ✓ | ✓ | Publicar/despublicar, importar/exportar, bulk |
| Variant | ✓ | ✓ | ✓ | ✓ | Generar, duplicar, bulk |
| Media | ✓ | ✓ | ✓ | ✓ | Optimizar, upload |
| Client | ✓ | ✓ | ✓ | — | Contactar, exportar |
| Order | ✓ | ✓ | ✓ | — | Cambiar estado, notificar, imprimir, exportar, bulk |
| Transaction | — | ✓ | — | — | Reembolsar, batch approval, exportar |
| StockItem | — | ✓ | ✓ | — | Ajustar, importar/exportar |
| Movement | ✓ | ✓ | — | — | Exportar |
| Shipment | ✓ | ✓ | ✓ | — | Rastrear, imprimir etiqueta, notificar |
| Transfer | ✓ | ✓ | ✓ | — | Imprimir guía |
| Campaign | ✓ | ✓ | ✓ | ✓ | Preview, analytics |
| Content | ✓ | ✓ | ✓ | ✓ | Duplicar, preview, bulk |
| Address | ✓ | ✓ | ✓ | ✓ | Establecer predeterminada |
| CartItem | ✓ | ✓ | ✓ | ✓ | — |
| WishlistItem | ✓ | ✓ | — | ✓ | Compartir |
| Review | — | ✓ | — | — | — |
| CompanySettings | — | ✓ | ✓ | — | Subir logo |
| MasterEntity | ✓ | ✓ | ✓ | ✓ | Sincronizar, diagnóstico |

## 5. Acciones de Estado (Transiciones)

| Entidad | Transiciones de estado |
|---------|----------------------|
| User | Activo ↔ Inactivo ↔ Suspendido |
| Product | Activo ↔ Oculto ↔ Descontinuado |
| Variant | Activo ↔ Oculto ↔ Agotado / Activa ↔ En Desarrollo ↔ Descontinuada |
| Order | Pendiente → Confirmado → Pagado → Preparado → Enviado → Entregado / Cancelado |
| Payment | Pendiente → Completado → Fallido → Reembolsado |
| Shipment | Pendiente → En Tránsito → Entregado → Devuelto |
| Transfer | Solicitada → Autorizada → En Tránsito → Recibida → Completada / Cancelada |
| Campaign | Borrador → Programada → Activa → Pausada → Finalizada |
| Content | Borrador → Revisión → Publicado → Programado |
| Client | Activo ↔ Inactivo ↔ VIP |
| CartItem | Cantidad: +1 / -1 / eliminar |
| WishlistItem | Agregar / Quitar |

---

*Documento generado el 2026-07-10. 72 páginas analizadas, ~290 acciones detectadas en 17 dominios.*
