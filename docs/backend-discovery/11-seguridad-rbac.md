# Seguridad, Autenticación y RBAC — ALPACART Backend

## 1. Modelo de Actores

### 1.1 Tipos de Usuario Identificados

| # | Tipo | Descripción | Frontend | Evidencia |
|---|------|-------------|----------|-----------|
| 1 | **SuperAdmin** | Acceso total a todos los módulos y configuraciones | Dashboard | RoleList: "Super Administrador — Acceso total a todos los módulos" |
| 2 | **ProductionManager** | Gestión de producción, control de calidad | Dashboard | RoleList: "Gestor de Producción" |
| 3 | **FinancialAnalyst** | Reportes de rentabilidad, costos operativos | Dashboard | RoleList: "Analista Financiero" |
| 4 | **TemporaryConsultant** | Acceso restringido solo lectura | Dashboard | RoleList: "Consultor Temporal — Acceso restringido de solo lectura" |
| 5 | **Admin** | Administrador del sistema (rol implícito en mocks) | Dashboard, Tienda | `constants/index.js`: `ROLES = { ADMIN: 'admin', USER: 'user' }` |
| 6 | **User** | Usuario regular del sistema | Dashboard, Tienda | Mismo constants |
| 7 | **Logistics** | Gestión de inventarios, envíos y proveedores | Dashboard | UserCreate: radio option |
| 8 | **Sales** | Órdenes de compra, clientes y facturación | Dashboard | UserCreate: radio option |
| 9 | **Editor** | Edición de contenido | Dashboard | UserList: "Elena Arrieta — Editor" |
| 10 | **Customer** | Cliente B2C registrado en la tienda | Tienda | AuthContext, Login, ProfileSettings |
| 11 | **Visitor** | Visitante no autenticado | Tienda, Institucional | Navegación pública |

---

### 1.2 Roles de Sistema (de mocks)

| Rol | Categoría | Usuarios (mock) | Permisos | Status |
|-----|-----------|-----------------|----------|--------|
| Super Administrador | Crítico | 3 | Todos activos | Activo |
| Gestor de Producción | Operativo | 12 | 24 permisos | Activo |
| Analista Financiero | Administrativo | 5 | 8 permisos | Activo |
| Consultor Temporal | Externo | 0 | 4 permisos | Inactivo |

---

## 2. Módulos y Recursos del Sistema

Basado en PermissionMatrix y AuditLog:

| # | Módulo | Recurso | Slug | Evidencia |
|---|--------|---------|------|-----------|
| 1 | Dashboard | Panel de Control | `dashboard` | Sidebar, ruta `/` |
| 2 | Catálogo | Productos | `catalog.products` | ProductList, ProductCreate |
| 3 | Catálogo | Variantes | `catalog.variants` | VariantList |
| 4 | Catálogo | Multimedia | `catalog.media` | ProductMedia |
| 5 | Catálogo | Colecciones | `catalog.collections` | CatalogDashboard |
| 6 | Catálogo | Categorías | `catalog.categories` | CatalogDashboard |
| 7 | Pedidos | Gestión | `orders.manage` | OrderList, OrderDetail |
| 8 | Pedidos | Dashboard | `orders.dashboard` | OrderDashboard |
| 9 | CRM | Clientes | `crm.clients` | ClientList, ClientProfile |
| 10 | CRM | Dashboard | `crm.dashboard` | CrmDashboard |
| 11 | Pagos | Transacciones | `payments.transactions` | TransactionList |
| 12 | Pagos | Dashboard | `payments.dashboard` | PaymentDashboard |
| 13 | Pagos | Reembolsos | `payments.refunds` | TransactionList (refund action) |
| 14 | Inventario | Stock | `inventory.stock` | StockList |
| 15 | Inventario | Kardex | `inventory.kardex` | KardexPage |
| 16 | Inventario | Movimientos | `inventory.movements` | MovementList |
| 17 | Inventario | Transferencias | `inventory.transfers` | TransferList |
| 18 | Inventario | Dashboard | `inventory.dashboard` | InventoryDashboard |
| 19 | Logística | Envíos | `logistics.shipments` | ShipmentList |
| 20 | Logística | Dashboard | `logistics.dashboard` | LogisticsDashboard |
| 21 | Marketing | Campañas | `marketing.campaigns` | CampaignList |
| 22 | Marketing | Cupones | `marketing.coupons` | MarketingDashboard, CampaignList |
| 23 | Marketing | Dashboard | `marketing.dashboard` | MarketingDashboard |
| 24 | CMS | Contenido | `cms.content` | ContentList |
| 25 | CMS | Dashboard | `cms.dashboard` | CmsDashboard |
| 26 | Textil | Variantes | `textile.variants` | TextileVariantList |
| 27 | Textil | Dashboard | `textile.dashboard` | TextileDashboard |
| 28 | Textil | Transferencias | `textile.transfers` | TransferList (routing) |
| 29 | IAM | Usuarios | `iam.users` | UserList, UserCreate |
| 30 | IAM | Roles | `iam.roles` | RoleList |
| 31 | IAM | Permisos | `iam.permissions` | PermissionMatrix |
| 32 | IAM | Mi Perfil | `iam.profile` | MyProfile |
| 33 | Auditoría | Logs | `audit.logs` | AuditLog |
| 34 | Configuración | Empresa | `settings.company` | SettingsPage |
| 35 | Configuración | Datos Maestros | `settings.masterdata` | MasterData |
| 36 | Analítica | BI | `analytics.bi` | AnalyticsPage |

---

## 3. Matriz de Permisos (Evidencia Directa)

Basado en la matriz de PermissionMatrix.jsx (4 módulos, 7 permisos, 5 roles):

### Permisos detectados en el frontend

| # | Módulo | Permiso | Acción | Descripción ES |
|---|--------|---------|--------|----------------|
| P01 | Inventory | `inventory.view_stock` | read | Visualización global de existencias |
| P02 | Inventory | `inventory.edit_stock` | update | Ajustes manuales y auditoría física |
| P03 | Orders | `orders.approve` | approve | Validación de crédito y stock |
| P04 | Orders | `orders.modify_pricing` | update | Aplicar descuentos y recargos manuales |
| P05 | Master Data | `masterdata.configure_sku` | update | Gestión de nomenclatura técnica |
| P06 | Master Data | `masterdata.define_fiber` | update | Parámetros de calidad de alpaca |
| P07 | Audit | `audit.access_logs` | read | Trazabilidad de operaciones críticas |

### Acciones por permiso

| Acción | Significado | Ejemplos |
|--------|-------------|----------|
| `read` | Ver / Listar / Exportar | Ver productos, ver pedidos |
| `create` | Crear nuevo | Crear producto, crear usuario |
| `update` | Editar existente | Editar precio, cambiar estado |
| `delete` | Eliminar | Eliminar producto, cancelar pedido |
| `approve` | Aprobar | Aprobar pedido, autorizar transferencia |
| `export` | Exportar datos | Exportar CSV, descargar PDF |
| `import` | Importar datos | Importar productos CSV |
| `adjust` | Ajustar (inventario) | Ajuste de stock |
| `refund` | Reembolsar | Reembolsar transacción |
| `publish` | Publicar | Publicar contenido, publicar producto |

---

## 4. Matriz RBAC Propuesta

Basada en los 5 roles de PermissionMatrix + los roles adicionales detectados:

| # | Módulo | Recurso | SuperAdmin | ProdManager | InventoryOp | SalesAgent | Analyst | Logistics | Editor | Customer |
|---|--------|---------|:----------:|:-----------:|:-----------:|:----------:|:-------:|:---------:|:------:|:--------:|
| 1 | Dashboard | Panel | read | read | read | read | read | read | — | — |
| 2 | Catalog | Products | CRUD | read | read | read | read | read | read | read (public) |
| 3 | Catalog | Variants | CRUD | read | read | read | read | read | read | read (public) |
| 4 | Catalog | Media | CRUD | read | read | — | — | read | read | — |
| 5 | Catalog | Collections | CRUD | read | — | — | — | — | read | read (public) |
| 6 | Catalog | Categories | CRUD | read | — | — | — | — | read | read (public) |
| 7 | Orders | Manage | CRUD | read | — | create/read | read | read | — | — |
| 8 | Orders | Dashboard | read | read | — | read | read | read | — | — |
| 9 | CRM | Clients | CRUD | read | — | create/read | read | — | — | — |
| 10 | CRM | Dashboard | read | read | — | read | read | — | — | — |
| 11 | Payments | Transactions | CRUD | read | — | read | read | — | — | — |
| 12 | Payments | Refunds | approve | — | — | — | read | — | — | — |
| 13 | Inventory | Stock | CRUD | read | CRUD | read | read | read | — | — |
| 14 | Inventory | Kardex | read | read | read | read | read | read | — | — |
| 15 | Inventory | Movements | CRUD | read | CRUD | — | read | read | — | — |
| 16 | Inventory | Transfers | CRUD | read | CRUD | — | — | CRUD | — | — |
| 17 | Logistics | Shipments | CRUD | read | read | — | — | CRUD | — | — |
| 18 | Marketing | Campaigns | CRUD | — | — | read | read | — | CRUD | — |
| 19 | Marketing | Coupons | CRUD | — | — | — | read | — | CRUD | — |
| 20 | CMS | Content | CRUD | — | — | — | — | — | CRUD | — |
| 21 | Textile | Variants | CRUD | CRUD | read | — | — | read | — | — |
| 22 | IAM | Users | CRUD | — | — | — | — | — | — | self |
| 23 | IAM | Roles | CRUD | — | — | — | — | — | — | — |
| 24 | IAM | Permissions | CRUD | — | — | — | — | — | — | — |
| 25 | IAM | Profile | self | self | self | self | self | self | self | self |
| 26 | Audit | Logs | read | — | — | — | read | — | — | — |
| 27 | Settings | Company | CRUD | — | — | — | — | — | — | — |
| 28 | Settings | MasterData | CRUD | — | — | — | — | — | — | — |
| 29 | Analytics | BI | read | read | read | read | read | read | — | — |
| 30 | Ecommerce | Orders (own) | — | — | — | — | — | — | — | CRUD |
| 31 | Ecommerce | Wishlist | — | — | — | — | — | — | — | CRUD |
| 32 | Ecommerce | Addresses | — | — | — | — | — | — | — | CRUD |
| 33 | Ecommerce | Profile | — | — | — | — | — | — | — | CRUD |

**Leyenda:** CRUD = create/read/update/delete, read = solo lectura, self = solo propio, — = sin acceso

---

## 5. Rutas Protegidas por Rol

### 5.1 Dashboard (41 rutas)

| Ruta | Página | Rol mínimo | Evidencia |
|------|--------|-----------|-----------|
| `/login` | Login | Público | Sin ProtectedRoute |
| `/` | Dashboard | Cualquier autenticado | ProtectedRoute |
| `/catalog*` | Catálogo | Editor+ | Sidebar: módulo Catálogo |
| `/orders*` | Pedidos | Sales+ | Sidebar: módulo Pedidos |
| `/crm*` | CRM | Sales+ | Sidebar: módulo CRM |
| `/payments*` | Pagos | FinancialAnalyst+ | Sidebar: módulo Pagos |
| `/inventory*` | Inventario | Logistics+ | Sidebar: módulo Inventario |
| `/logistics*` | Logística | Logistics+ | Sidebar: módulo Logística |
| `/marketing*` | Marketing | Editor+ | Sidebar: módulo Marketing |
| `/cms*` | CMS | Editor+ | Sidebar: módulo CMS |
| `/textile*` | Textil | ProductionManager+ | Sidebar: módulo Textil |
| `/usuarios*` | IAM | SuperAdmin | Sidebar: módulo Usuarios |
| `/mi-perfil` | Perfil | Cualquier autenticado | Sidebar footer |
| `/analytics*` | Analítica | FinancialAnalyst+ | Sidebar: módulo Analítica |
| `/audit` | Auditoría | SuperAdmin | Sidebar: módulo Analítica |
| `/settings` | Config | SuperAdmin | Sidebar: módulo Configuración |
| `/datos-maestros` | MasterData | SuperAdmin | Sidebar: módulo Configuración |
| `*` | NotFound | Público | Sin layout admin |

### 5.2 Tienda (19 rutas)

| Ruta | Página | Rol mínimo | Evidencia |
|------|--------|-----------|-----------|
| `/login` | Login | Público (GuestRoute) | Sin auth |
| `/register` | Register | Público | Sin auth |
| `/` | Home | Público | Sin auth |
| `/cart` | Cart | Público | Sin auth |
| `/checkout` | Checkout | Público (con auth opcional) | Sin auth |
| `/product/:id` | Detail | Público | Sin auth |
| `/collection` | Collection | Público | Sin auth |
| `/category/:slug` | Category | Público | Sin auth |
| `/search*` | Search | Público | Sin auth |
| `/order/thanks` | Thanks | Público | Sin auth |
| `/order/payment` | Payment | Público | Sin auth |
| `/order/tracking/:id` | Tracking | Público | Sin auth |
| `/order/confirmed` | Confirmed | Público | Sin auth |
| `/account` | Account | Customer | ProtectedRoute |
| `/addresses` | Addresses | Customer | ProtectedRoute |
| `/wishlist` | Wishlist | Customer | ProtectedRoute |
| `/order/history` | History | Customer | ProtectedRoute |
| `/settings` | Settings | Customer | ProtectedRoute |

---

## 6. Operaciones Sensibles

| # | Operación | Entidad | Sensibilidad | Rol mínimo | Audit requerida |
|---|-----------|---------|:------------:|:----------:|:---------------:|
| 1 | Crear usuario | User | ALTA | SuperAdmin | Sí |
| 2 | Eliminar usuario | User | ALTA | SuperAdmin | Sí |
| 3 | Cambiar rol de usuario | User | ALTA | SuperAdmin | Sí |
| 4 | Crear rol | Role | ALTA | SuperAdmin | Sí |
| 5 | Modificar permisos | Permission | ALTA | SuperAdmin | Sí |
| 6 | Eliminar producto | Product | ALTA | Admin | Sí |
| 7 | Cambiar precio | ProductVariant | ALTA | Admin | Sí |
| 8 | Ajustar stock | StockItem | ALTA | InventoryOp | Sí |
| 9 | Reembolsar pago | Transaction | ALTA | FinancialAnalyst+ | Sí |
| 10 | Cancelar pedido | Order | ALTA | Sales+ | Sí |
| 11 | Aprobar pedido | Order | MEDIA | Sales+ | Sí |
| 12 | Publicar contenido | Content | MEDIA | Editor+ | Sí |
| 13 | Modificar configuración | CompanySetting | ALTA | SuperAdmin | Sí |
| 14 | Eliminar cliente | Client | ALTA | Admin | Sí |
| 15 | Exportar datos | Varios | MEDIA | Según módulo | Sí |
| 16 | Importar datos | Varios | ALTA | Admin | Sí |
| 17 | Acceder a auditoría | AuditLog | ALTA | SuperAdmin | Sí |
| 18 | Cambio de contraseña | User/Customer | ALTA | Propietario | Sí |

---

## 7. Seguridad por Endpoint

### 7.1 Autenticación

| Endpoint | Método | Auth | Rate limit | Evidencia |
|----------|--------|:----:|:----------:|-----------|
| `POST /auth/login` | No | Sí (5 intentos/15min) | AuthContext, LoginPage |
| `POST /auth/register` | No | Sí (3 por IP/día) | RegisterPage (Tienda) |
| `POST /auth/logout` | Sí | No | AuthContext.logout() |
| `POST /auth/forgot-password` | No | Sí (1 por email/hora) | LoginPage: "¿Olvidaste tu contraseña?" |
| `POST /auth/reset-password` | No | Sí (1 por token) | Implícito |
| `GET /auth/me` | Sí | No | AuthContext check |

### 7.2 Protección por Método HTTP

| Método | Significado | Auth requerido |
|--------|-------------|:--------------:|
| `GET` | Lectura | Varía por endpoint |
| `POST` | Creación | Sí (excepto login, register, contact, newsletter) |
| `PUT` | Actualización completa | Sí |
| `PATCH` | Actualización parcial | Sí |
| `DELETE` | Eliminación | Sí (solo roles altos) |

### 7.3 Política de Tokens

| Aspecto | Valor |
|---------|-------|
| Tipo | JWT (Bearer) |
| Storage frontend | localStorage (clave: `auth_token`) |
| Expiración | 24h por defecto, 30d con "Recordarme" |
| Refresh | NO implementado en frontend (requisito pendiente) |
| Header | `Authorization: Bearer <token>` |
| Interceptor | Axios request interceptor añade header automáticamente |
| 401 handling | Axios response interceptor → redirige a `/login` |
| Logout | Elimina token de localStorage |

### 7.4 Validación de Datos

| Aspecto | Requisito |
|---------|-----------|
| Server-side | Siempre (nunca confiar solo en frontend) |
| SQL injection | Prevenir con Sequelize parametrizado |
| XSS | Sanitizar entradas, escapar salidas |
| CSRF | Usar tokens CSRF en cookies (o SameSite=Strict) |
| Rate limiting | Por IP y por usuario |
| Password hashing | bcrypt (costo 12+) |
| Password policy | ≥8 chars, 1 número/símbolo, 1 mayúscula |

---

## 8. Ownership y Data Isolation

| Entidad | Propietario | Visibilidad | Regla |
|---------|-------------|-------------|-------|
| CustomerOrder | Customer | Propio | `orders.customer_id = currentUser.id` |
| CustomerAddress | Customer | Propio | `addresses.customer_id = currentUser.id` |
| WishlistItem | Customer | Propio | `wishlist_items.customer_id = currentUser.id` |
| Profile (User) | User | Propio | `users.id = currentUser.id` |
| Profile (Customer) | Customer | Propio | `customers.id = currentUser.id` |
| B2B Order | Client | Admin (cross-client: no) | `orders.client_id` visible solo a admins asignados |
| ClientProfile | Client | Admin (asignados) | `clients.assigned_seller_id = currentUser.id OR SuperAdmin` |
| AuditLog | Sistema | Solo SuperAdmin/FinancialAnalyst | Consulta restringida |

---

## 9. Sesiones

| Aspecto | Evidencia | Requisito |
|---------|-----------|-----------|
| Sesiones activas | MyProfile: "MacBook Pro - Lima, PE" + "iPhone 15 Pro" | `GET /auth/sessions` |
| Cerrar una sesión | Botón logout por sesión | `DELETE /auth/sessions/:id` |
| Cerrar todas | "Cerrar todas las sesiones" | `DELETE /auth/sessions` |
| Sesión actual | Badge "Activo / Sesión actual" | Identificar en backend |
| Información de sesión | Dispositivo, ubicación, navegador, última actividad | Almacenar en tabla sessions |

---

## 10. Recuperación de Contraseña

| Aspecto | Evidencia |
|---------|-----------|
| Link "¿Olvidaste tu contraseña?" | LoginPage (Dashboard y Tienda) |
| Flujo inferido | Email → Token → Reset form |
| Token expiry | 1 hora (estándar) |
| Store token | Tabla `password_resets` (email, token, expires_at) |

**REQUISITO PENDIENTE — No implementado en frontend:**
- Página de forgot-password
- Página de reset-password
- Envío de email transaccional

---

## 11. Resumen

| Métrica | Valor |
|---------|-------|
| Tipos de usuario | 11 |
| Roles de sistema | 4 (de mocks) + 4 adicionales inferidos |
| Módulos/recurso | 36 |
| Permisos detectados | 7 (de matriz) + ~29 inferidos |
| Rutas protegidas (Dashboard) | 39 de 41 |
| Rutas protegidas (Tienda) | 5 de 19 |
| Operaciones sensibles | 18 |
| Endpoints con rate limit | 3 |
| Ownership reglas | 8 |
| Requisitos pendientes | 2 (forgot/reset password) |

---

## 12. Requisitos Pendientes (Sin Evidencia Directa)

| # | Requisito | Explicación |
|---|-----------|-------------|
| R01 | Página forgot-password | Link existe en login pero no hay página implementada |
| R02 | Página reset-password | Sin evidencia de página con token |
| R03 | Refresh token | Frontend no implementa refresh; token infinito hasta logout |
| R04 | 2FA/MFA | Sin evidencia en ningún frontend |
| R05 | OAuth / Social login | Sin evidencia (solo login email/password) |
| R06 | Block IP after failed attempts | Sin evidencia en frontend |
| R07 | Session timeout / idle timeout | Sin evidencia |
| R08 | Email verification flow | Register existe pero sin verificación de email |
| R09 | Audit de login fallidos | Sin evidencia en AuditLog actual |
| R10 | Role-based route guarding (Dashboard) | ProtectedRoute solo checkea autenticación, no rol específico |

---

*Documento generado el 2026-07-10. 11 actores, 36 recursos, matriz RBAC con 8 roles, 10 requisitos pendientes.*
