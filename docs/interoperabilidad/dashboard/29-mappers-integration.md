# INTEGRACIÓN DE MAPPERS Y MODELOS DE DOMINIO — DASHBOARD

## Flujo Enforzado de Transformación de Datos

```
Backend DTO ➔ Repository (src/repositories/api.js) ➔ Mapper (src/mappers/index.js) ➔ Domain Model (src/domain/index.js) ➔ Zustand Store ➔ React UI
```

---

## Mappers Conectados en Repositorios

| Repositorio | Método | Mapper Aplicado | Modelo de Dominio Retornado |
|-------------|--------|-----------------|-----------------------------|
| `analyticsRepository` | `getKpis()` | `mapKpis` | `createAnalyticsKpi` |
| `catalogRepository` | `getProducts(q)` | `mapProducts` | `createProduct[]` + `meta` |
| `iamRepository` | `getUsers(q)` | `mapUsers` | `createUser[]` |
| `ordersRepository` | `getAll(q)` | `mapOrders` | `createOrder[]` |
| `crmRepository` | `getClients(q)` | `mapClients` | `createClient[]` |

---

## Beneficios
1. **Sanitización de Datos**: Se garantizan valores por defecto (`0` en precios/cantidades, cadenas vacías en opcionales) evitando errores `TypeError` o `undefined` en componentes React.
2. **Desacople de Backend**: Si la estructura de la base de datos o el DTO NestJS cambia, solo se actualiza el Mapper en `src/mappers/index.js`, manteniendo los componentes de la interfaz de usuario intactos.
