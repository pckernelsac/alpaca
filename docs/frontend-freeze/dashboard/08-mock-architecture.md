# Dashboard — Mock Architecture

## Arquitectura Implementada

Se implementó una arquitectura de datos en capas:

```
Página
  ↓
Hook (useCatalog, useUsers, etc.)
  ↓
Store (Zustand: useCatalogStore, useUsersStore, etc.)
  ↓
Repository (catalog.js, users.js, etc.)
  ↓
Mock Data (data.js - centralizado)
```

## Capas Creadas

| Capa | Archivos | Propósito |
|------|----------|-----------|
| Mocks | `mocks/data.js` | Datos mock centralizados (products, users, orders, etc.) |
| Repositories | `repositories/base.js` + 9 repos | Abstracción de acceso a datos |
| Stores | `stores/` (4 creadas) | Estado compartido con Zustand |
| Hooks | `hooks/` (4 creados) | Consumo desde componentes |

## Repositorios Creados (10)
- `base.js` — Factory genérico (CRUD + query)
- `dashboard.js` — KPIs, orders recientes, alertas
- `catalog.js` — CRUD productos
- `users.js` — CRUD usuarios
- `orders.js` — CRUD pedidos
- `clients.js` — CRUD clientes
- `payments.js` — Transacciones + summary
- `inventory.js` — Stock + KPIs
- `marketing.js` — Campañas
- `cms.js` — Contenido
- `audit.js` — Logs de auditoría

## Dependencias Nuevas
- `zustand` — Estado global liviano
