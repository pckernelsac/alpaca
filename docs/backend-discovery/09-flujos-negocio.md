# Flujos de Negocio End-to-End — ALPACART

## 1. Convenciones

| Notación | Significado |
|----------|-------------|
| `→` | Transición entre pasos |
| `[D]` | Dashboard (frontend) |
| `[T]` | Tienda (frontend) |
| `[I]` | Institucional (frontend) |
| `S` | Sistema/Backend |
| `A` | Actor externo |
| `FK` | Falla conocida |

---

## 2. Flujo 01 — Autenticación y Sesión

### 2.1 Login (Dashboard)

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Empleado (Admin, Editor, Logística, Ventas) |
| **Precondición** | Usuario existe en BD, status = active |
| **Frontends** | [D], [T], [I] |
| **Entidades** | User, Session |
| **Estados** | Sesión: active |

**Secuencia:**
```
1. [D] Usuario ingresa email + password + "Recordarme" opcional
2. [D] → POST /auth/login { email, password }
3. S → Busca User WHERE email
4. S → Verifica password hash con bcrypt
5. S → Verifica status = 'active' (si no → error "Usuario inactivo")
6. S → Crea Session (JWT token, device, IP, expiresAt)
7. S → Si "Recordarme": expiresAt = 30 días. Si no: expiresAt = 24h
8. S → Actualiza User.lastAccessAt
9. S → Crea AuditLog (severity=success, action=login)
10. S → Retorna { token, user: {id, name, email, role, permissions} }
11. [D] → Almacena token en localStorage
12. [D] → Redirige a /
```

**Errores posibles:**
| Error | HTTP | Mensaje |
|-------|------|---------|
| Email no existe | 401 | Credenciales incorrectas |
| Password incorrecto | 401 | Credenciales incorrectas |
| Usuario inactivo/suspendido | 403 | Cuenta desactivada. Contacte a soporte |
| Demasiados intentos | 429 | Demasiados intentos. Intente en 15 minutos |

**Frontends:** Los 3 frontends usan el mismo endpoint. Dashboard redirige a `/`, Tienda redirige a `/account`.

---

### 2.2 Logout

```
1. [D] Usuario hace clic en "Cerrar sesión"
2. [D] → POST /auth/logout { token }
3. S → Invalida Session
4. S → Crea AuditLog (action=logout)
5. S → Retorna 200
6. [D] → Elimina token de localStorage
7. [D] → Redirige a /login
```

---

## 3. Flujo 02 — Gestión de Perfil

### 3.1 Actualizar Perfil (Dashboard)

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Empleado autenticado |
| **Precondición** | Sesión activa |
| **Entidades** | User, Session |

**Secuencia:**
```
1. [D] Usuario navega a /mi-perfil
2. [D] → GET /auth/profile → User (name, email, phone, position, avatar)
3. [D] → GET /profile/sessions → Session[] (2 activas)
4. [D] Usuario edita: name, position, email, phone
5. [D] → PUT /auth/profile { name, position, email, phone }
6. S → Valida email único (si cambió)
7. S → Actualiza User
8. S → Crea AuditLog (action=update, module=iam)
9. [D] → Muestra toast "Perfil actualizado"

10. [D] Usuario cambia contraseña
11. [D] → PUT /auth/password { currentPassword, newPassword }
12. S → Verifica currentPassword
13. S → Hash newPassword
14. S → Actualiza User.password
15. S → Invalida otras sesiones (excepto actual)

16. [D] Usuario sube avatar
17. [D] → POST /auth/avatar (multipart)
18. S → Guarda archivo → URL
19. S → Actualiza User.avatar
```

---

## 4. Flujo 03 — Gestión de Usuarios (IAM)

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (super_admin) |
| **Entidades** | User, Role, Department, AuditLog |

**Secuencia — Crear usuario:**
```
1. [D] Admin navega a /usuarios/nuevo
2. [D] → GET /roles → Role[] (para select)
3. [D] → GET /departments → Department[]
4. [D] Admin completa formulario (6 secciones)
5. [D] → POST /users { name, email, roleId, departmentId, permissions[], forcePasswordChange, ... }
6. S → Valida email único
7. S → Genera password temporal (si auto-generate)
8. S → Hash password
9. S → Crea User
10. S → Asigna Role + permissions
11. S → Envía email con credenciales (si aplica)
12. S → Crea AuditLog (action=create, module=iam)
13. [D] → Redirige a /usuarios con toast "Usuario creado"
```

**Secuencia — Desactivar usuario:**
```
1. [D] → PATCH /users/:id/status { status: 'suspended' }
2. S → Actualiza User.status
3. S → Invalida todas las Session del usuario
4. S → AuditLog
```

---

## 5. Flujo 04 — Catálogo (Creación de Producto)

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (catalog manager) |
| **Entidades** | Product, ProductVariant, ProductMedia, Category, Collection, Tag |
| **Duración** | Multi-paso (4 steps) |

**Secuencia:**
```
=== STEP 1: Información Básica ===
1. [D] → GET /categories → Category[]
2. [D] → GET /collections → Collection[]
3. [D] Admin ingresa: name, sku, categoryId, collectionId, tags, description
4. [D] → POST /products { name, sku, ..., status: 'draft' }
5. S → Valida SKU único
6. S → Crea Product
7. S → Asocia Category, Collection
8. S → Crea Tags (si no existen)
9. S → Retorna { productId }

=== STEP 2: Multimedia ===
10. [D] Admin sube imágenes (drag & drop)
11. [D] → POST /products/:id/media (multipart, x N)
12. S → Guarda archivos → URLs
13. S → Crea ProductMedia records
14. [D] Admin marca una como principal

=== STEP 3: Variantes ===
15. [D] Admin define colores, tallas, precios, stocks
16. [D] → POST /variants/generate { productId, options, prices }
17. S → Genera combinaciones → Crea ProductVariant[]
18. [D] Admin edita inline stock/precios

=== STEP 4: SEO ===
19. [D] Admin ingresa: seoTitle, seoKeywords, seoDescription
20. [D] → PUT /products/:id { ...seo, status: 'active' }
21. S → Actualiza Product
22. S → Crea AuditLog

23. [D] → Producto público visible en [T]
```

---

## 6. Flujo 05 — Compra Ecommerce (B2C)

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Cliente B2C (Customer) |
| **Frontends** | [T] exclusivamente |
| **Entidades** | Customer, Product, ProductVariant, Cart, Order, OrderItem, Transaction, Shipment |
| **Duración** | 8 pasos (navegación → entrega) |

**Secuencia:**
```
=== FASE 1: NAVEGACIÓN Y WISHLIST ===
1. [T] Cliente navega / → Home
2. [T] → GET /products/featured (hero, best sellers)
3. [T] → GET /categories (bento)
4. [T] → GET /collections
5. [T] Cliente navega a /category/:slug → GET /products?category=:slug
6. [T] Cliente navega a /product/:id → GET /products/:id (full DTO)
7. [T] Cliente agrega a wishlist → POST /wishlist/items { productId, variantId }

=== FASE 2: CARRITO ===
8. [T] Cliente hace clic "Agregar al Carrito"
9. [T] → POST /cart/items { productId, variantId, quantity }
10. S → Crea/actualiza CartItem en carrito activo
11. [T] Cliente actualiza cantidad
12. [T] → PATCH /cart/items/:id { quantity }
13. [T] Cliente aplica cupón
14. [T] → POST /cart/coupon { code }
15. S → Valida Coupon (activo, no expirado, minPurchase)
16. S → Retorna descuento aplicado

=== FASE 3: CHECKOUT ===
17. [T] Cliente → /checkout
18. [T] → PATCH /checkout/contact { email, phone }
19. [T] → PATCH /checkout/address { name, street, city, country }
20. [T] Cliente revisa resumen
21. [T] → POST /checkout/place
22. S → Crea Order (status='pending')
23. S → Crea OrderItem[] desde Cart
24. S → Crea OrderEvent (type='created')
25. S → Reserva stock (decrementa temporalmente)
26. S → Limpia Cart
27. S → Retorna { orderId }

=== FASE 4: PAGO ===
28. [T] → /order/payment
29. [T] → POST /checkout/payment { orderId, cardNumber, expiry, cvc, name }
30. S → Procesa con pasarela (Stripe)
31. S → Si éxito: Crea Transaction (status='succeeded')
32. S → Actualiza Order (status='paid', paidAt=now)
33. S → Crea OrderEvent (type='paid')
34. S → Si falla: Transaction (status='failed'), Order permanece 'pending'
35. [T] → Redirige a /order/thanks

=== FASE 5: POST-COMPRA ===
36. [T] → GET /orders/:id → Thanks DTO
37. [T] Cliente ve "Pedido Confirmado" con ref y fecha estimada
38. [T] Cliente hace clic "Rastrear mi pedido" → /order/tracking/:id
39. [T] → GET /orders/:id/tracking → Order + Timeline + Shipment

=== FASE 6: ADMIN PROCESA ===
40. [D] Admin ve pedido en OrderList
41. [D] Admin confirma → PATCH /orders/:id/status { status: 'confirmed' }
42. S → Crea OrderEvent (type='confirmed')
43. S → Si pago OK: status → 'paid'

44. [D] Admin prepara → status → 'preparing'
45. [D] Admin crea Shipment → POST /shipments { orderId, carrier, ... }
46. S → Crea Shipment (status='pending')
47. S → Crea ShipmentEvent

48. [D] Admin envía → status → 'shipped'
49. S → Crea OrderEvent (type='shipped')

50. [D] Transportista actualiza tracking
51. S → Crea ShipmentEvents (in_transit, delayed, delivered)
52. S → Cuando 'delivered': Actualiza Order.status = 'delivered'
53. S → Crea OrderEvent (type='delivered')
```

**Errores posibles (checkout):**
| Error | Causa |
|-------|-------|
| Stock insuficiente | Producto agotado durante el proceso |
| Cupón inválido/expirado | Coupon no aplicable |
| Pago rechazado | Fondos insuficientes, fraude |
| Timeout de pasarela | Error de conexión |
| Dirección inválida | País no soportado para envío |

---

## 7. Flujo 06 — Pedido B2B (Dashboard)

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (sales agent) + Cliente B2B |
| **Frontends** | [D] primariamente |
| **Entidades** | Client, Order, OrderItem, Transaction, Shipment |

**Secuencia:**
```
1. [D] Admin navega a /orders o /crm/clientes/:id
2. [D] → POST /orders { clientId, items, channel:'wholesale', agent }
3. S → Crea Order (status='pending')
4. S → Crea OrderItem[]
5. S → Crea OrderEvent (type='created')

6. [D] Admin registra pago (transferencia bancaria)
7. [D] → POST /transactions { orderId, method:'bank_transfer', amount, ... }
8. S → Crea Transaction (status='pending')
9. S → Admin confirma pago → PATCH /transactions/:id { status:'succeeded' }
10. S → Actualiza Order.status = 'paid'

11. [D] → PATCH /orders/:id/status { status:'preparing' }
12. [D] → POST /shipments { orderId, carrier, ... }
13. [D] → PATCH /orders/:id/status { status:'shipped' }

14. [D] → PATCH /orders/:id/status { status:'delivered' }
```

**Diferencia clave con B2C:** El admin crea el pedido en nombre del cliente. El pago puede ser por transferencia (no en línea). El cliente B2B no interactúa directamente con el sistema de pedidos.

---

## 8. Flujo 07 — Gestión de Inventario

### 8.1 Ajuste de Stock

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (warehouse) |
| **Entidades** | StockItem, StockMovement |

```
1. [D] Admin navega a /inventory/stock
2. [D] → GET /stock?search=&warehouse=&status=
3. [D] Admin selecciona producto → clic "Ajustar"
4. [D] Ingresa: nueva cantidad, motivo
5. [D] → POST /stock/:id/adjust { quantity, reason }
6. S → Calcula diferencia = newQuantity - currentQuantity
7. S → Crea StockMovement { type:'adjustment', quantity: diferencia }
8. S → Actualiza StockItem.quantity
9. S → Crea AuditLog
```

---

### 8.2 Transferencia entre Almacenes

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (logistics) |
| **Entidades** | WarehouseTransfer, StockItem, StockMovement (×2) |

```
1. [D] Admin navega a /textile/transferencias
2. [D] → POST /transfers { originWarehouseId, destWarehouseId, items, responsibleId }
3. S → Crea Transfer (status='requested')
4. S → Crea eventos de timeline

5. [D] Admin autoriza → PATCH /transfers/:id/status { status:'authorized' }

6. [D] Admin envía físicamente → status:'in_transit'
7. S → Crea StockMovement (type='issue') en origen
8. S → Decrementa StockItem.origen

9. [D] Destino recibe → status:'received'
10. S → Crea StockMovement (type='receipt') en destino
11. S → Incrementa StockItem.destino

12. [D] → status:'completed'

13. Si se cancela en cualquier paso:
    [D] → PATCH /transfers/:id/status { status:'cancelled' }
    S → No hay movimientos de stock
```

---

### 8.3 Kardex (Consulta)

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (auditor/warehouse) |

```
1. [D] → GET /kardex?productId=&dateFrom=&dateTo=&warehouseId=&type=
2. S → Consulta StockMovement con JOIN a Product
3. S → Pagina resultados (1,482 registros)
4. [D] Admin hace clic en fila
5. [D] → GET /kardex/:productId/timeline
6. S → Retorna movimientos cronológicos del producto
```

---

## 9. Flujo 08 — CRM (Ciclo de Vida del Cliente B2B)

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (sales) |
| **Entidades** | Client, ClientAddress, ClientPaymentMethod, ClientNote, Order |

**Secuencia:**
```
=== CREACIÓN ===
1. [D] Admin navega a /crm/clientes/nuevo
2. [D] → POST /clients { name, documentType, documentNumber, email, type, ... }
3. S → Crea Client (status='active')
4. S → Crea ClientAddress si se proporcionó
5. [D] → Redirige a /crm/clientes/perfil

=== GESTIÓN CONTÍNUA ===
6. [D] → GET /crm/clientes/:id → Full profile DTO
7. [D] Admin agrega nota: → POST /clients/:id/notes { content }
8. [D] Admin registra pedido: → POST /orders { clientId, items, ... }
9. [D] Admin cambia estado: → PATCH /clients/:id/status { status: 'vip' }

=== ACTIVIDAD ===
10. [D] → GET /clients/:id/activity → Timeline (notes + orders + events)
11. [D] → GET /clients/:id/orders → Order history

=== PROMOCIONES ===
12. [D] Admin asigna promoción: POST /promotions { clientId, ... }
```

---

## 10. Flujo 09 — Gestión de Pagos y Reembolsos

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (finance) |
| **Entidades** | Transaction, TransactionRefund, Order |

**Secuencia — Reembolso:**
```
1. [D] Admin navega a /payments/transactions
2. [D] → GET /transactions?status=failed
3. [D] Admin selecciona transacción → clic "Refund"
4. [D] → POST /transactions/:id/refund { amount, reason }
5. S → Verifica Transaction.status = 'succeeded'
6. S → Verifica monto ≤ transaction.amount - refunds previos
7. S → Procesa refund en pasarela (Stripe)
8. S → Si éxito: Crea TransactionRefund
9. S → Actualiza Transaction.status = 'refunded' (si refund total)
10. S → Actualiza Order.status = 'cancelled' (si refund total)
11. S → Crea OrderEvent (type='cancelled')
12. S → Crea AuditLog
```

---

## 11. Flujo 10 — Publicación de Contenido CMS

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (content editor) |
| **Entidades** | Content |

```
1. [D] → GET /cms/contenido?status=draft
2. [D] → POST /contents { title, type, body, ... }
3. S → Crea Content (status='draft')

4. [D] Editor edita → PUT /contents/:id
5. [D] Editor envía a revisión → PATCH /contents/:id/status { status:'review' }

6. [D] Admin (publisher) revisa
7. [D] → PATCH /contents/:id/status { status:'published' }
8. S → Actualiza Content.publishedAt = now

9. O: → PATCH /contents/:id/status { status:'scheduled', publishAt: '2024-11-01' }

10. [I] Contenido visible en página institucional (/catalogo, /promociones, etc.)
```

---

## 12. Flujo 11 — Campaña de Marketing

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (marketing) |
| **Entidades** | Campaign, Coupon, Promotion, Content |

```
1. [D] → POST /campaigns { name, type, channel, budget, startDate, endDate }
2. S → Crea Campaign (status='draft')

3. [D] → POST /coupons { code, type, value, maxUses, expiresAt }
4. [D] → POST /promotions { name, discountType, discountValue, productIds }

5. [D] → PATCH /campaigns/:id/status { status:'active' }
6. S → Activa coupons + promotions asociados

7. [D] → PATCH /campaigns/:id/status { status:'paused' }
8. S → Desactiva temporalmente

9. [D] → PATCH /campaigns/:id/status { status:'finished' }
10. S → Desactiva coupons + promotions

11. [D] → GET /campaigns/:id/analytics → { reach, conversions, roi }
12. S → Calcula de orders + transactions vinculados al campaign
```

---

## 13. Flujo 12 — Logística y Envíos

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (logistics) + Carrier |
| **Entidades** | Shipment, ShipmentEvent, Order |

```
1. [D] → POST /shipments { orderId, carrier, origin, destination }
2. S → Crea Shipment (status='pending')

3. [D] → despacho físico
4. [D] → PATCH /shipments/:id/status { status:'transit' }
5. S → Crea ShipmentEvent (status='transit')

6. [A] Carrier actualiza tracking (API externa o manual)
7. [S] → POST /shipments/:id/events { status, location, timestamp }
8. [S] → Si status = 'delivered': Actualiza Order.status = 'delivered'

9. [D] → GET /logistics/summary → KPIs de logística
10. [T] → GET /orders/:id/tracking → Último estado visible al cliente
```

---

## 14. Flujo 13 — Consulta y Reportes

| Aspecto | Detalle |
|---------|---------|
| **Actor** | Admin (gerencia) |
| **Frontends** | [D] |

```
1. [D] → GET /analytics?period=month → KPIs + charts
2. S → Calcula múltiples agregaciones en paralelo
3. S → Retorna DTO compuesto:
   - Ventas totales, ingresos, pedidos, conversión
   - Serie temporal (ventas vs ingresos)
   - Distribución por canal
   - Top categorías
   - Marketing ROI
   - Salud inventario
   - Geografía de clientes

4. [D] → GET /audit/logs?severity=critical&dateRange=
5. S → Consulta AuditLog con filtros
6. S → Pagina resultados

7. [D] → GET /audit/export → CSV/PDF
```

---

## 15. Mapa de Flujos por Actor

| Actor | Flujos | Frontend principal |
|-------|--------|-------------------|
| **Cliente B2C** | Navegación, Wishlist, Carrito, Checkout, Pago, Seguimiento | [T] |
| **Cliente B2B** | Consulta de catálogo (no tiene flujo directo) | [I] |
| **Admin — Catálogo** | Creación de producto, variantes, media | [D] |
| **Admin — Pedidos** | Gestión de pedidos, cambios de estado, envíos | [D] |
| **Admin — CRM** | Ciclo de vida del cliente B2B | [D] |
| **Admin — Inventario** | Stock, ajustes, transferencias, kardex | [D] |
| **Admin — Logística** | Envíos, tracking, carriers | [D] |
| **Admin — Marketing** | Campañas, cupones, promociones | [D] |
| **Admin — CMS** | Contenido, FAQ, páginas | [D] |
| **Admin — IAM** | Usuarios, roles, permisos | [D] |
| **Admin — Finanzas** | Transacciones, reembolsos | [D] |
| **Admin — Auditoría** | Logs, reportes | [D] |
| **Admin — Configuración** | Settings, master data | [D] |
| **Visitante** | Navegación institucional, contacto, newsletter | [I] |

---

## 16. Resumen

| Métrica | Valor |
|---------|-------|
| Flujos E2E documentados | 13 |
| Frontends involucrados por flujo | 1-2 (mayoría solo [D]) |
| Entidades por flujo | 2-8 |
| Escrituras por flujo | 3-15 |
| Lecturas por flujo | 2-10 |
| Flujo cross-frontend | 1 (Catálogo: [D] crea, [T] consume) |
| Flujo más complejo | Checkout B2C (53 pasos) |

---

*Documento generado el 2026-07-10. 13 flujos end-to-end documentados, cubriendo todos los dominios.*
