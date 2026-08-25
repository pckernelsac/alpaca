# ICC-01 — Integration Contract Certification
# Response Contracts — ALPACART

> **Análisis:** Response Backend vs Shared Types vs Modelo Esperado Frontend

---

## 1. Formato de Respuesta Estándar

### Backend (TransformInterceptor)
```typescript
// Éxito simple
{ "success": true, "data": { ... } }

// Lista paginada (PaginationInterceptor)
{
  "success": true,
  "data": [ ... ],
  "meta": { "page": 1, "perPage": 25, "total": 100, "totalPages": 4 }
}

// Error (HttpExceptionFilter)
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request",
  "timestamp": "2026-07-16T...",
  "path": "/api/v1/products"
}
```

### Esperado por Frontend
```typescript
// Tienda useFetch - espera response.data directamente
const { data } = await api.get(url)
// data = el objeto o arreglo directamente (sin envoltura)

// Institucional ContactForm - usa fetch(), solo checkea res.ok
const res = await fetch(url, { method: 'POST', body: ... })
if (!res.ok) throw new Error(...)
```

### Gap Detectado
| Aspecto | Backend | Frontend Espera | Gap |
|---------|---------|-----------------|-----|
| Éxito | `{ success: true, data }` | `data` directo | ⚠️ Frontend no usa `success` envelope |
| Lista paginada | `{ data[], meta }` | `data[]` directo | ⚠️ Frontend no procesa `meta` |
| Error | `{ statusCode, message, error }` | `res.ok` check | ✅ Compatible |

**Veredicto:** ⚠️ PARTIAL — Backend envuelve en `success`, frontend ignora la envoltura. Funcional (el `data` está presente), pero no aprovecha los metadatos.

---

## 2. Response Shapes por Dominio

### Auth — GET /auth/me (Staff)
| Campo | Backend Response | Shared Type | Coincide |
|-------|-----------------|-------------|----------|
| id | UUID | string | ✅ |
| name | string | string | ✅ |
| email | string | string | ✅ |
| role | Role object | string (solo nombre) | ⚠️ PARTIAL |
| status | string | string | ✅ |
| phone | string (nullable) | string? | ✅ |

**Veredicto:** ⚠️ PARTIAL — Shared Type simplifica `role` a string, backend devuelve objeto Role.

### Auth — GET /auth/me (Customer)
| Campo | Backend Response | Shared Type | Coincide |
|-------|-----------------|-------------|----------|
| id | UUID | string | ✅ |
| firstName | string | string | ✅ |
| lastName | string | string | ✅ |
| email | string | string | ✅ |
| phone | string (nullable) | string? | ✅ |
| language | string | string | ✅ |
| currency | string | string | ✅ |

**Veredicto:** ✅ PASS — Compatible.

### Catalog — GET /products
| Campo | Backend Response (Sequelize) | Shared Type | Coincide |
|-------|------------------------------|-------------|----------|
| id | UUID | string | ✅ |
| sku | string | string | ✅ |
| name | string | string | ✅ |
| description | TEXT (nullable) | string? | ✅ |
| categoryId | INTEGER (nullable) | number? | ✅ |
| category | Category object | — | ⚠️ No en shared |
| status | string | string | ✅ |
| createdAt | Date | — | ⚠️ No en shared |
| updatedAt | Date | — | ⚠️ No en shared |

**Veredicto:** ⚠️ PARTIAL — Shared Type omite `category` embebido y timestamps.

### CMS — GET /hero-slides
| Campo | Backend Response | Shared Type | Coincide |
|-------|-----------------|-------------|----------|
| id | INTEGER | number | ✅ |
| title | string | string | ✅ |
| subtitle | string (nullable) | string? | ✅ |
| image | string (nullable) | string? | ✅ |
| ctaText | string (nullable) | string? | ✅ |
| order | INTEGER | number | ✅ |
| active | BOOLEAN | boolean | ✅ |

**Veredicto:** ✅ PASS — Compatible completo.

### CMS — GET /testimonials
| Campo | Backend Response | Shared Type | Coincide |
|-------|-----------------|-------------|----------|
| id | INTEGER | number | ✅ |
| author | string | string | ✅ |
| text | TEXT | string | ✅ |
| rating | INTEGER (nullable) | number? | ✅ |
| featured | BOOLEAN | boolean | ✅ |

**Veredicto:** ✅ PASS — Compatible completo.

### Orders — GET /orders
| Campo | Backend Response | Shared Type | Coincide |
|-------|-----------------|-------------|----------|
| id | UUID | string | ✅ |
| orderNumber | string | string | ✅ |
| customerId | UUID (nullable) | string? | ✅ |
| status | string | string | ✅ |
| subtotal | DECIMAL | number | ✅ |
| total | DECIMAL | number | ✅ |
| paid | BOOLEAN | boolean | ✅ |
| items | OrderItem[] | — | ⚠️ No en shared |

**Veredicto:** ⚠️ PARTIAL — Shared Type omite `items`, `channel`, `shippingFee`, `discount`, timestamps.

### Catalog — GET /categories
| Campo | Backend Response | Shared Type | Coincide |
|-------|-----------------|-------------|----------|
| id | INTEGER | number | ✅ |
| name | string | string | ✅ |
| slug | string | string | ✅ |
| parentId | INTEGER (nullable) | number? | ✅ |

**Veredicto:** ✅ PASS — Compatible completo.

---

## 3. Response Format Gaps

| Dominio | Backend Response | Shared Type Coverage | Veredicto |
|---------|-----------------|---------------------|-----------|
| Auth (staff) | Objeto User + Role | Parcial | ⚠️ PARTIAL |
| Auth (customer) | Customer | Completo | ✅ PASS |
| Products | Product + Category | Parcial | ⚠️ PARTIAL |
| Categories | Category | Completo | ✅ PASS |
| Collections | Collection | Completo | ✅ PASS |
| HeroSlides | HeroSlide | Completo | ✅ PASS |
| Testimonials | Testimonial | Completo | ✅ PASS |
| Orders | Order + Items | Parcial (sin items) | ⚠️ PARTIAL |
| Coupons | Coupon | Completo | ✅ PASS |
| Campaigns | Campaign | Completo | ✅ PASS |
| Clients | Client | Completo | ✅ PASS |
| StockItems | StockItem | Completo | ✅ PASS |
| Warehouses | Warehouse | Completo | ✅ PASS |
| Shipments | Shipment | Completo | ✅ PASS |
| Contents | Content | Completo | ✅ PASS |
| Cart | Cart + Items | Sin shared type | ❌ FAIL |
| Checkout | Order | Sin shared type | ❌ FAIL |
| Payments | Transaction | Sin shared type | ❌ FAIL |
| Contact | ContactInquiry | Sin shared type | ❌ FAIL |
| Newsletter | NewsletterSubscriber | Sin shared type | ❌ FAIL |

## Resumen Response Contracts

| Categoría | Cantidad |
|-----------|----------|
| ✅ PASS (compatible) | 9 |
| ⚠️ PARTIAL (gaps menores) | 5 |
| ❌ FAIL (sin shared type) | 6 |
| **Total** | **20** |

**Score Response Contracts:** 9/20 = **45/100**
