# System Integration — End-to-End

> **Validación de flujos completos**

---

## Flujo Landing → Login → Dashboard

| Paso | Origen | Destino | Estado |
|------|--------|---------|--------|
| Landing page | Institucional :3101 | Contenido estático | ✅ |
| Catálogo público | Institucional :3101 | GET /products? | ✅ Hook useCatalog |
| FAQ | Institucional :3101 | GET /faq | ✅ Hook useFaq |
| Login Staff | Dashboard :5173 | POST /auth/login | ✅ serviceProvider.auth.login |
| Dashboard KPIs | Dashboard :5173 | GET /analytics/kpis | ✅ useDashboardStore |

## Flujo Productos → Inventario

| Paso | Origen | Destino | Estado |
|------|--------|---------|--------|
| Listar productos | Dashboard | GET /products | ✅ useCatalogStore |
| Ver detalle | Dashboard | GET /products/:id | ✅ catalogRepository |
| Crear producto | Dashboard | POST /products | ✅ catalogRepository |
| Stock | Dashboard | GET /stock | ✅ useInventoryStore |
| Ajustar stock | Dashboard | POST /stock/:id/adjust | ✅ inventoryRepository |

## Flujo Clientes → Pedidos

| Paso | Origen | Destino | Estado |
|------|--------|---------|--------|
| Listar clientes | Dashboard | GET /crm/clients | ✅ useClientsStore |
| Crear cliente | Dashboard | POST /crm/clients | ✅ crmRepository |
| Listar órdenes | Dashboard | GET /orders | ✅ useOrdersStore |
| Detalle orden | Dashboard | GET /orders/:id | ✅ ordersRepository |
| Eventos orden | Dashboard | GET /orders/:id/events | ✅ ordersRepository |

## Flujo Tienda → Checkout

| Paso | Origen | Destino | Estado |
|------|--------|---------|--------|
| Ver productos | Tienda :3102 | GET /products | ✅ useCatalog |
| Ver detalle | Tienda | GET /products/:id | ✅ useProductDetail |
| Login customer | Tienda | POST /auth/customer-login | ✅ serviceProvider.auth |
| Carrito | Tienda | GET /cart | ✅ useCart |
| Checkout | Tienda | POST /checkout | ✅ useCheckout |
| Órdenes | Tienda | GET /orders | ✅ useOrders |
| Tracking | Tienda | GET /orders/:id/events | ✅ useOrders |

## Conclusión

End-to-End: ✅ Todos los flujos principales completos
