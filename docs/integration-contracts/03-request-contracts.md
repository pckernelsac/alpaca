# ICC-01 — Integration Contract Certification
# Request Contracts — ALPACART

> **Análisis:** Payload Frontend vs DTO Backend para endpoints con body

---

## 1. Contratos con DTO Válido y Conectado

### POST /auth/login
| Campo | Frontend Espera | LoginDto | Coincide |
|-------|----------------|----------|----------|
| email | string (email) | @IsEmail() string | ✅ |
| password | string (min 6) | @IsString() @MinLength(6) | ✅ |
| remember | boolean (opcional) | @IsOptional() @IsBoolean() | ✅ |

**Veredicto:** ✅ PASS — Contrato completo

### POST /auth/customer-login
| Campo | Frontend Espera | LoginDto | Coincide |
|-------|----------------|----------|----------|
| email | string (email) | @IsEmail() string | ✅ |
| password | string (min 6) | @IsString() @MinLength(6) | ✅ |

**Veredicto:** ✅ PASS — Contrato completo

---

## 2. Contratos con DTO Existente pero NO Conectado

### POST /auth/register (RegisterDto existe, controller usa `b: any`)
| Campo | Frontend Espera | RegisterDto | Coincide |
|-------|----------------|-------------|----------|
| email | string | @IsEmail() | ✅ |
| firstName | string | @IsString() @MinLength(2) | ✅ |
| lastName | string | @IsString() @MinLength(2) | ✅ |
| password | string | @IsString() @MinLength(6) | ✅ |

**Veredicto:** ⚠️ PARTIAL — DTO correcto, no conectado. P1 para Tienda R7.2.

### POST /cart/items (AddCartItemDto existe, controller usa `b: any`)
| Campo | Frontend Espera | AddCartItemDto | Coincide |
|-------|----------------|---------------|----------|
| productId | UUID string | @IsUUID() | ✅ |
| variantId | UUID string (opcional) | @IsOptional() @IsUUID() | ✅ |
| quantity | number (min 1) | @IsInt() @Min(1) | ✅ |

**Veredicto:** ⚠️ PARTIAL — DTO correcto, no conectado. P1 para Tienda R7.2.

### POST /checkout (CheckoutDto existe, controller usa `b: any`)
| Campo | Frontend Espera | CheckoutDto | Coincide |
|-------|----------------|-------------|----------|
| couponCode | string (opcional) | @IsOptional() @IsString() | ✅ |
| idempotencyKey | string (header) | @IsOptional() @IsString() | ⚠️ (header vs body) |

**Veredicto:** ⚠️ PARTIAL — DTO aceptable, no conectado. P1 para Tienda R7.2.

### POST /coupons/validate (ValidateCouponDto existe, controller usa `b: any`)
| Campo | Frontend Espera | ValidateCouponDto | Coincide |
|-------|----------------|-------------------|----------|
| code | string | @IsString() | ✅ |
| cartSubtotal | number (opcional) | @IsOptional() @IsNumber() @Min(0) | ✅ |

**Veredicto:** ⚠️ PARTIAL — DTO correcto, no conectado. P1 para Tienda R7.2.

### POST /contact (ContactDto existe, controller usa `b: any`)
| Campo | Frontend Espera | ContactDto | Coincide |
|-------|----------------|------------|----------|
| name | string | @IsString() @MinLength(2) | ✅ |
| email | string | @IsEmail() | ✅ |
| subject | string | @IsString() @MinLength(2) | ✅ |
| message | string | @IsString() @MinLength(2) | ✅ |

**Veredicto:** ⚠️ PARTIAL — DTO correcto, no conectado. P1 para Institucional R7.1.

---

## 3. Contratos SIN DTO (body: any)

### POST /account/profile (Customers)
| Campo | Frontend Espera | DTO | Estado |
|-------|----------------|-----|--------|
| firstName | string | — | ❌ NO EXISTE |
| lastName | string | — | ❌ NO EXISTE |
| phone | string (opcional) | — | ❌ NO EXISTE |
| language | string (opcional) | — | ❌ NO EXISTE |

**Veredicto:** ❌ FAIL — Sin DTO. P2 para Tienda R7.2.

### PUT /account/password (Customers)
| Campo | Frontend Espera | DTO | Estado |
|-------|----------------|-----|--------|
| currentPassword | string | — | ❌ NO EXISTE |
| newPassword | string | — | ❌ NO EXISTE |

**Veredicto:** ❌ FAIL — Sin DTO. P2 para Tienda R7.2.

### POST /account/addresses (Customers)
| Campo | Frontend Espera | DTO | Estado |
|-------|----------------|-----|--------|
| name | string | — | ❌ NO EXISTE |
| street | string | — | ❌ NO EXISTE |
| city | string | — | ❌ NO EXISTE |
| country | string | — | ❌ NO EXISTE |
| phone | string (opcional) | — | ❌ NO EXISTE |
| isDefault | boolean (opcional) | — | ❌ NO EXISTE |

**Veredicto:** ❌ FAIL — Sin DTO. P2 para Tienda R7.2.

### POST /products (Catalog) — Staff
| Campo | Frontend Espera | DTO | Estado |
|-------|----------------|-----|--------|
| sku | string | — | ❌ NO EXISTE |
| name | string | — | ❌ NO EXISTE |
| description | string (opcional) | — | ❌ NO EXISTE |
| material | string (opcional) | — | ❌ NO EXISTE |
| categoryId | number (opcional) | — | ❌ NO EXISTE |
| collectionId | string (opcional) | — | ❌ NO EXISTE |
| weight | number (opcional) | — | ❌ NO EXISTE |
| status | string (opcional) | — | ❌ NO EXISTE |

**Veredicto:** ❌ FAIL — Sin DTO. P2 para Dashboard R7.3 (staff-only).

### POST /orders (Orders) — Staff
| Campo | Frontend Espera | CreateOrderDto | Estado |
|-------|----------------|---------------|--------|
| customerId | string | sin decoradores | ⚠️ DTO sin validación |
| orderNumber | string | sin decoradores | ⚠️ DTO sin validación |
| status | string | sin decoradores | ⚠️ DTO sin validación |
| subtotal | number | sin decoradores | ⚠️ DTO sin validación |
| total | number | sin decoradores | ⚠️ DTO sin validación |

**Veredicto:** ❌ FAIL — DTO existe pero sin validación. P2 para Dashboard R7.3.

### POST /newsletter/subscribe
| Campo | Frontend Espera | DTO | Estado |
|-------|----------------|-----|--------|
| email | string | — | ❌ NO EXISTE |
| source | string (opcional) | — | ❌ NO EXISTE |

**Veredicto:** ❌ FAIL — Sin DTO. P2 (bajo impacto).

---

## 4. Query Parameters (GET endpoints)

### GET /products
| Parámetro | Tipo | Backend | Frontend Espera | Coincide |
|-----------|------|---------|-----------------|----------|
| page | number (opcional) | PaginationInterceptor | ✅ | ✅ |
| perPage | number (opcional) | PaginationInterceptor | ✅ | ✅ |
| sort | string (opcional) | PaginationInterceptor | ✅ | ✅ |
| order | 'ASC'\|'DESC' | PaginationInterceptor | ✅ | ✅ |
| search | string (opcional) | CatalogService | ✅ | ✅ |
| categoryId | number (opcional) | CatalogService | ✅ | ✅ |
| collectionId | string (opcional) | CatalogService | ✅ | ✅ |

**Veredicto:** ✅ PASS — Contrato completo

## Resumen Request Contracts

| Categoría | Cantidad |
|-----------|----------|
| ✅ PASS (con DTO conectado) | 2 |
| ⚠️ PARTIAL (DTO existe, no conectado) | 6 |
| ❌ FAIL (sin DTO) | 14 |
| ❌ FAIL (DTO sin validación) | 1 |
| **Total endpoints con body** | **23** |

**Score Request Contracts:** 8/23 = **35/100**
