# Dashboard — Mappers

> **Transformación DTO → Domain Model**

---

## Ubicación: `src/mappers/index.js`

| Mapper | Función | Origen |
|--------|---------|--------|
| `mapUsers(r)` | `(r.data || r || []).map(createUser)` | GET /users |
| `mapRoles(r)` | `(r.data || r || []).map(createRole)` | GET /roles |
| `mapPermissions(r)` | `(r.data || r || []).map(createPermission)` | GET /permissions |
| `mapProducts(r)` | `(r.data || r || []).map(createProduct)` | GET /products |
| `mapOrders(r)` | `(r.data || r || []).map(createOrder)` | GET /orders |
| `mapClients(r)` | `(r.data || r || []).map(createClient)` | GET /crm/clients |
| `mapCampaigns(r)` | `(r.data || r || []).map(createCampaign)` | GET /campaigns |
| `mapContents(r)` | `(r.data || r || []).map(createContent)` | GET /contents |
| `mapStock(r)` | `(r.data || r || []).map(createStockItem)` | GET /stock |
| `mapTransactions(r)` | `(r.data || r || []).map(createTransaction)` | GET /transactions |
| `mapShipments(r)` | `(r.data || r || []).map(createShipment)` | GET /shipments |
| `mapAuditLogs(r)` | `(r.data || r || []).map(createAuditLog)` | GET /audit/logs |
| `mapCompany(r)` | `createCompanySetting(r.data || r)` | GET /settings/company |

## Flujo

```
Backend JSON { success, data }
  → ApiClient extrae data
  → Repository retorna raw
  → Store llama mapper
  → Mapper → Domain Model
  → Componente React consume Domain Model
```
