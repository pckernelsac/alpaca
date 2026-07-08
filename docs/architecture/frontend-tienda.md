# Arquitectura del Software

# Volumen IV

# Parte IV

# Frontend Tienda Online (React)

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la arquitectura del Frontend de la Tienda Online del sistema Alpacart ERP.

La Tienda Online representa el canal principal de ventas de la empresa y permitirá a los clientes explorar productos, administrar su cuenta, realizar compras y hacer seguimiento de sus pedidos.

Toda la lógica de negocio será ejecutada por el Backend.

El Frontend únicamente administrará la experiencia del usuario.

---

# 2. Objetivos

La Tienda Online deberá cumplir los siguientes principios:

- Alto rendimiento
- Diseño Responsive
- Excelente experiencia de usuario (UX)
- Accesibilidad
- Optimización SEO
- Bajo tiempo de carga
- Escalabilidad

---

# 3. Stack Tecnológico

Framework

React

Lenguaje

TypeScript

Build

Vite

Ruteo

React Router

HTTP

Axios

Estado Servidor

TanStack Query

Estado Cliente

Zustand

Formularios

React Hook Form

Validaciones

Zod

Estilos

Tailwind CSS

Animaciones

Framer Motion

Stripe

Stripe React SDK

---

# 4. Arquitectura

```text
store/

src/

assets/

components/

features/

hooks/

layouts/

pages/

routes/

services/

store/

types/

utils/
```

---

# 5. Organización

```text
src/

assets/

components/

features/

hooks/

layouts/

pages/

routes/

services/

store/

types/

utils/

App.tsx

main.tsx
```

---

# 6. Layouts

El proyecto tendrá cuatro layouts.

```text
MainLayout

AccountLayout

CheckoutLayout

AuthLayout
```

MainLayout

Página pública.

AccountLayout

Zona privada del cliente.

CheckoutLayout

Proceso de compra.

AuthLayout

Login y Registro.

---

# 7. Páginas

```text
/

Catalogo

Categorias

Colecciones

Producto

Buscar

Carrito

Wishlist

Checkout

Login

Registro

Recuperar Contraseña

Mi Cuenta

Mis Pedidos

Detalle Pedido

Perfil

Direcciones

404
```

---

# 8. Componentes Globales

Navbar

Footer

Hero

ProductCard

ProductGrid

ProductCarousel

CategoryCard

WishlistButton

CartButton

SearchBar

Breadcrumb

Pagination

Filters

PriceFilter

RatingFilter

ColorSelector

SizeSelector

Gallery

QuantitySelector

MiniCart

CheckoutStepper

OrderSummary

StripePayment

Loader

Modal

Toast

---

# 9. Organización por Features

```text
features/

auth/

catalog/

product/

cart/

wishlist/

checkout/

orders/

account/

profile/

address/

search/
```

Cada Feature será independiente.

---

# 10. Servicios

```text
services/

auth.service.ts

catalog.service.ts

cart.service.ts

wishlist.service.ts

order.service.ts

payment.service.ts

shipping.service.ts

customer.service.ts
```

---

# 11. Estado Global

Se utilizará Zustand para administrar:

Cliente autenticado

Carrito

Wishlist

Preferencias

Tema

Toda la información remota será administrada mediante TanStack Query.

---

# 12. Rutas

```text
/

/catalogo

/categoria/:slug

/coleccion/:slug

/producto/:slug

/buscar

/carrito

/wishlist

/checkout

/login

/registro

/recuperar-password

/mi-cuenta

/mi-cuenta/perfil

/mi-cuenta/direcciones

/mi-cuenta/pedidos

/mi-cuenta/pedidos/:id
```

---

# 13. Consumo de API

Catalog

Productos

Categorías

Colecciones

CRM

Perfil

Direcciones

Wishlist

OMS

Carrito

Pedidos

Checkout

Payments

Stripe

Shipping

Seguimiento

CMS

Contenido

Marketing

Cupones

Promociones

CFG

Empresa

---

# 14. Flujo de Compra

Cliente

↓

Catálogo

↓

Producto

↓

Carrito

↓

Checkout

↓

Stripe

↓

Pago Confirmado

↓

Pedido

↓

Seguimiento

---

# 15. Autenticación

Clientes autenticados mediante JWT.

El Frontend almacenará únicamente:

Access Token

Refresh Token

Información básica del usuario

No almacenará información financiera.

---

# 16. Integración Stripe

Proceso

Checkout

↓

Crear Pedido

↓

Backend crea Payment Intent

↓

Frontend recibe Client Secret

↓

Stripe Elements

↓

Confirmar Pago

↓

Webhook

↓

Pedido Confirmado

Toda la lógica financiera será responsabilidad del Backend.

---

# 17. Responsive

Desktop

Laptop

Tablet

Mobile

---

# 18. Optimización

Lazy Loading

Infinite Scroll

Prefetch de Productos

Compresión de imágenes

Cache mediante TanStack Query

Optimización de búsquedas

---

# 19. Seguridad

No almacenar tarjetas.

No almacenar información bancaria.

Toda la autenticación mediante JWT.

Protección de rutas privadas.

Validación de formularios.

Sanitización de entradas.

---

# 20. Convenciones

Componentes

PascalCase

Hooks

camelCase

Servicios

camelCase

Rutas

kebab-case

---

# 21. Dependencias

Consume

- IAM
- CRM
- Catalog
- Inventory
- OMS
- Payments
- Shipping
- CMS
- Marketing
- Configuration

---

# 22. Resumen

Framework

React

Build

Vite

Lenguaje

TypeScript

Estado Global

Zustand

Estado Servidor

TanStack Query

API

REST

Pago

Stripe

Autenticación

JWT

Responsive

Sí

SEO

Sí

---

# 23. Próximo Documento

El siguiente documento corresponde al Frontend Dashboard ERP, donde se definirá la arquitectura completa del panel administrativo que permitirá gestionar todos los módulos del sistema, incluyendo CRM, Catálogo, Inventario, Pedidos, Pagos, Envíos, CMS, Marketing y Analytics.