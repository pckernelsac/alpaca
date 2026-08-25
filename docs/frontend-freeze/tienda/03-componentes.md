# Componentes — ALPACART Tienda

## Common (`src/components/common/`)
- **Avatar** — imagen de avatar redonda
- **Badge** — etiqueta/badge con variantes (primary, warning, success, error, info)
- **Button** — botón con variantes (primary, outline, ghost, sizes)
- **Card** — contenedor card genérico
- **Checkbox** — checkbox input
- **Input** — input field genérico
- **Modal** — modal overlay con close
- **Radio** — radio button
- **Select** — select dropdown
- **Textarea** — textarea field
- **ThemeToggle** — toggle para dark/light mode

## Ecommerce (`src/components/ecommerce/` — 35 componentes)
- **AddressCard** — card de dirección con acciones edit/delete/default
- **AddressForm** — formulario de dirección/envío
- **AnnouncementBar** — barra superior de anuncios
- **Banner** — banner promocional
- **CartItem** — item de carrito con qty controls y remove
- **CategoryCard** — card de categoría con imagen overlay
- **CheckoutStepper** — stepper de 3 pasos (Info → Envío → Pago)
- **CouponBox** — input para código de cupón
- **EmptyState** — estado vacío genérico
- **Filters** — panel de filtros con secciones colapsables (categoría, material, color, talla, precio)
- **HeroSlider** — slider hero
- **MiniCart** — drawer lateral del carrito
- **Newsletter** — suscripción newsletter
- **OrderCard** — card de orden con status badge e imágenes de items
- **OrderSummary** — resumen de orden con items y totales
- **Pagination** — paginación con elipsis y botón "Siguiente" (**no usado en páginas**)
- **PaymentMethod** — selección de método de pago
- **Price** — formateo de precio
- **ProductCard** — card de producto con badge, wishlist, quick add
- **ProductGallery** — galería de imágenes de producto
- **ProductGrid** — grid de productos genérico
- **ProductImage** — imagen de producto con lazy loading
- **ProfileMenu** — menú lateral de perfil (usado en Account, Addresses, OrderHistory, ProfileSettings, Wishlist)
- **QuantitySelector** — selector de cantidad
- **Rating** — estrellas de rating
- **ReviewCard** — card de review
- **SearchBar** — barra de búsqueda
- **SearchOverlay** — overlay de búsqueda a página completa
- **Sort** — selector de ordenamiento
- **StoreFooter** — footer completo con columnas de links, social, selectores moneda/idioma
- **StoreHeader** — header con logo, nav, search, cart badge, theme toggle, menú móvil
- **StoreNavbar** — navbar secundaria con categorías
- **SuccessMessage** — mensaje de éxito post-compra
- **TrackingTimeline** — timeline de seguimiento de envío
- **WishlistItem** — item de lista de deseos

## Feedback (`src/components/feedback/`)
- **Alert** — alerta contextual
- **ErrorBoundary** — React error boundary con botón reintentar/recargar (usado en `StoreLayout`)
- **Loader** — spinner con variante fullPage (usado en `AppRouter` como fallback de `Suspense`)
- **NotFound** — componente 404
- **Spinner** — spinner simple
- **Toast** — contenedor de toasts con tipos success/error/warning/info

## Layout (`src/components/layout/`)
- **Footer** — footer simple (usado fuera de StoreLayout?)
- **Header** — header simple (parece anterior/reemplazado por StoreHeader)
- **Navbar** — navbar simple
- **Sidebar** — sidebar genérico

## Navigation (`src/components/navigation/`)
- **Breadcrumb** — migas de pan con icono separador — **existe pero solo se usa en 4 páginas** (Category, OrderTracking, ProductDetail, SearchResults)

## UI (`src/components/ui/`)
- **Divider** — línea divisoria
- **Skeleton** — placeholder de carga esquelético — **no se usa en ninguna página**
- **Tooltip** — tooltip

## Forms (`src/components/forms/`)
- **FormGroup** — grupo de formulario con label
- **FormWrapper** — wrapper de formulario

## Observaciones

- **Breadcrumb** se usa en 4 páginas (Category, OrderTracking, ProductDetail, SearchResults) pero no en Collection, Cart, Checkout, etc.
- **Pagination** existe pero **ninguna página lo usa** — todas las listas son hardcodeadas sin paginación real.
- **Skeleton** existe pero **ninguna página lo usa** — todos los datos están hardcodeados, no hay estado de carga.
- **Loader** solo se usa en el `Suspense` fallback del router para lazy loading.
- **ProfileMenu** se reutiliza en 5 páginas de perfil (Account, Addresses, OrderHistory, ProfileSettings, Wishlist).
