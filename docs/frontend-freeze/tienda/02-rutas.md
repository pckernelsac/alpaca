# Auditoría de Rutas — ALPACART Tienda

## Archivos de rutas

- `src/routes/routes.jsx` — definición de rutas (20 registradas + catch-all)
- `src/routes/AppRouter.jsx` — renderiza `<Routes>` con soporte para `ProtectedRoute` y layout anidado

## Rutas registradas (20 + 1 catch-all)

| Path | Página | Layout | Protegida |
|------|--------|--------|-----------|
| `/` | Home | main | no |
| `/cart` | Cart | main | no |
| `/checkout` | Checkout | main | no |
| `/product/:id` | ProductDetail | main | no |
| `/collection` | Collection | main | no |
| `/category/:slug` | Category | main | no |
| `/account` | Account | main | **sí** |
| `/addresses` | Addresses | main | **sí** |
| `/wishlist` | Wishlist | main | **sí** |
| `/search/:query` | SearchResults | main | no |
| `/order/thanks` | Thanks | main | no |
| `/order/payment` | Payment | main | no |
| `/order/tracking/:id` | OrderTracking | main | no |
| `/order/confirmed` | OrderConfirmed | main | no |
| `/order/history` | OrderHistory | main | **sí** |
| `/settings` | ProfileSettings | main | **sí** |
| `/login` | Login | standalone (sin layout) | no |
| `/register` | Register | standalone (sin layout) | no |
| `/search` | Search | standalone (sin layout) | no |
| `*` | NotFound | main | no |

## Páginas que existen como directorio pero NO están registradas en rutas (9 orphan pages)

| Directorio | Ruta esperada | Posible uso |
|------------|--------------|-------------|
| `About/` | `/about` | Footer link "Nosotros" |
| `Artisans/` | `/artisans` | Footer/Header (sin link actual) |
| `Care/` | `/care` | Footer link "Devoluciones" |
| `Contact/` | `/contact` | Footer link "Contacto" |
| `Politicas/` | `/politicas` | Footer link "Políticas" |
| `Profile/` | `/profile` | Sin link externo |
| `Shipping/` | `/shipping` | Footer link "Envíos" |
| `Shop/` | `/shop` | Sin link externo |
| `Sustainability/` | `/sustainability` | Footer link "Sostenibilidad" |

> **Nota:** `Blog/` existe como directorio vacío (sin componente), no se cuenta como orphan.

## Guardias

- **`ProtectedRoute`** — usado en: `/account`, `/addresses`, `/wishlist`, `/order/history`, `/settings`. Redirige a `/login` si no autenticado.
- **`GuestRoute`** — existe en `src/guards/GuestRoute.jsx` pero **NO se usa** en `/login` ni `/register`.
- **Layout `false`** — `/login`, `/register`, `/search` se renderizan fuera de `StoreLayout`.
