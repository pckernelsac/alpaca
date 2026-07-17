# shared-constants — Constantes Compartidas

## Contenido

`packages/shared-constants/src/index.ts` exporta todas las constantes del sistema: rutas, claves de almacenamiento, tema, breakpoints, roles y estados de orden.

### ROUTES (3 secciones)

#### Dashboard (14 rutas)
```
LOGIN:     /login
HOME:      /
CATALOG:   /catalog
ORDERS:    /orders
CRM:       /crm
PAYMENTS:  /payments
INVENTORY: /inventory
LOGISTICS: /logistics
MARKETING: /marketing
CMS:       /cms
TEXTILE:   /textile
USERS:     /usuarios
ANALYTICS: /analytics
AUDIT:     /audit
SETTINGS:  /settings
```

#### Tienda (8 rutas)
```
HOME:     /
CART:     /cart
CHECKOUT: /checkout
PRODUCT:  /product/:id
CATEGORY: /category/:slug
SEARCH:   /search
ACCOUNT:  /account
WISHLIST: /wishlist
```

#### Institucional (6 rutas)
```
HOME:    /
ABOUT:   /about
CATALOG: /catalogo
CONTACT: /contacto
FAQ:     /preguntas
TERMS:   /terminos
```

### STORAGE_KEYS

| Clave | Valor | Uso |
|---|---|---|
| `TOKEN` | `auth_token` | JWT en localStorage |
| `USER` | `auth_user` | Datos del usuario autenticado |
| `THEME` | `app_theme` | Preferencia de tema claro/oscuro |
| `CART` | `tienda_cart` | Carrito de compras (tienda) |
| `WISHLIST` | `tienda_wishlist` | Lista de deseos (tienda) |

### THEME

```typescript
THEME = { LIGHT: 'light', DARK: 'dark' }
```

### BREAKPOINTS

| Breakpoint | Valor (px) |
|---|---|
| `MOBILE` | 768 |
| `TABLET` | 1024 |
| `DESKTOP` | 1366 |
| `WIDE` | 1920 |

### ROLES (8 roles)

```typescript
SUPER_ADMIN: 'super_admin'        # Acceso total
PRODUCTION:  'production_manager' # Gestión de producción
INVENTORY:   'inventory_op'       # Operaciones de inventario
SALES:       'sales_agent'        # Ventas y CRM
ANALYST:     'analyst'            # Reportes y analítica
LOGISTICS:   'logistics'          # Envíos y logística
EDITOR:      'editor'             # CMS y contenido
CUSTOMER:    'customer'           # Usuario final (tienda)
```

### ORDER_STATUS (9 estados)

```
pending → confirmed → paid → preparing → shipped → in_transit → delivered
                                                                  → cancelled
                                                                  → returned
```

Arreglo completo:
```typescript
['pending','confirmed','paid','preparing','shipped','in_transit','delivered','cancelled','returned']
```

### API

```typescript
export const API_PREFIX = '/api/v1';
```

## Score: 75/100

Pérdida de 25 puntos por: (i) `ORDER_STATUS` es un array plano sin tipado fuerte (debería ser `as const` o `enum`), (ii) faltan constantes de negocio (tasa de impuesto, países, monedas), (iii) `ROUTES` no usa `as const` para inferir tipos literales, (iv) `ROLES` podría beneficiarse de un tipo derivado (`type Role = (typeof ROLES)[keyof typeof ROLES]`).
