# ICC-01 FIX — Contract Remediation Report

> **Fecha:** 2026-07-16 | **Fase:** PRE-R7.1

---

## Problemas Corregidos

### ICC-P0-01: VITE_API_URL unificado ✅

| Frontend | Antes | Después |
|----------|-------|---------|
| Institucional (.env.development) | `http://localhost:8000/api` | `http://localhost:8000/api/v1` |
| Institucional (.env.production) | `http://localhost:8000/api` | `http://localhost:8000/api/v1` |
| Tienda (.env.development) | `http://localhost:8000/api/tienda` | `http://localhost:8000/api/v1` |
| Tienda (.env.production) | `http://localhost:8000/api/tienda` | `http://localhost:8000/api/v1` |
| Dashboard (.env.development) | `http://localhost:8000/api/dashboard` | `http://localhost:8000/api/v1` |
| Dashboard (.env.production) | `http://localhost:8000/api/dashboard` | `http://localhost:8000/api/v1` |

**Archivos modificados:** 6

---

### ICC-P1-08: Pagination Contract alineado ✅

| Aspecto | Antes | Después |
|---------|-------|---------|
| PaginatedResponse<T> | `count: number` | `total: number` |
| Compatibilidad | — | Se agregó `PaginatedResponseDeprecated` como alias |

**Archivo modificado:** `packages/shared-types/src/index.ts`

---

### ICC-P1-05: ContactDto conectado ✅

| Aspecto | Antes | Después |
|---------|-------|---------|
| SettingsController.contact() | `@Body() b: any` | `@Body() dto: ContactDto` |
| Validación | Ninguna | @IsString, @MinLength(2), @IsEmail |

**Archivo modificado:** `backend/src/modules/settings/settings.controller.ts`

---

### ICC-P1-09: NewsletterSubscribeDto creado ✅

| Aspecto | Antes | Después |
|---------|-------|---------|
| MarketingController.subscribe() | `@Body() b: any` | `@Body() dto: NewsletterSubscribeDto` |
| DTO | No existía | `newsletter-subscribe.dto.ts` con @IsEmail + @IsOptional source |

**Archivos:** `backend/src/modules/marketing/dto/newsletter-subscribe.dto.ts` (creado) + `marketing.controller.ts` (modificado)

---

### ICC-P1-06: Shared Types CMS creados ✅

| Shared Type | Propiedades |
|-------------|------------|
| GalleryImage | id, url, altText?, caption?, category?, order, visible |
| FaqItem | id, question, answer, order |
| FaqCategory | id, name, slug, icon?, order, items: FaqItem[] |
| Benefit | id, title, description?, icon?, image?, order, active |
| ArtisanProcess | id, title, description?, icon?, image?, stepOrder, active |

**Archivo modificado:** `packages/shared-types/src/index.ts`

---

## Build Verification

| Componente | Módulos | Resultado |
|-----------|---------|-----------|
| Backend (NestJS) | — | ✅ BUILD PASS |
| Institucional | 233 | ✅ BUILD PASS |
| Tienda | 201 | ✅ BUILD PASS |
| Dashboard | 157 | ✅ BUILD PASS |

---

## Problemas Pendientes

| ID | Dominio | Severidad | Fase Objetivo |
|----|---------|-----------|---------------|
| ICC-P1-01 | RegisterDto conectar | P1 | R7.2 Tienda |
| ICC-P1-02 | AddCartItemDto conectar | P1 | R7.2 Tienda |
| ICC-P1-03 | CheckoutDto conectar | P1 | R7.2 Tienda |
| ICC-P1-04 | ValidateCouponDto conectar | P1 | R7.2 Tienda |
| ICC-P1-07 | Shared types Cart/Checkout | P1 | R7.2 Tienda |
| ICC-P1-10 | UpdateCompanyDto conectar | P1 | R7.3 Dashboard |
| ICC-P2-* | 18 gaps no bloqueantes | P2 | Post-integración |
