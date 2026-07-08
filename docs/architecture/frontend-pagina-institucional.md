# Arquitectura del Software

# Volumen IV

# Parte III

# Frontend Institucional (React)

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la arquitectura del Frontend Institucional del sistema Alpacart ERP.

La aplicación representa la presencia digital de la empresa y tiene como objetivo mostrar información institucional, fortalecer la identidad de marca y dirigir a los visitantes hacia la tienda online.

No realiza operaciones administrativas.

No gestiona pedidos.

No realiza pagos.

Toda la información será consumida desde la API REST del Backend.

---

# 2. Objetivos

El Frontend Institucional deberá cumplir los siguientes principios:

- Alto rendimiento.
- Diseño responsive.
- Optimización SEO.
- Accesibilidad.
- Reutilización de componentes.
- Consumo exclusivo de la API REST.

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

Consultas HTTP

Axios

Estado del Servidor

TanStack Query

Formularios

React Hook Form

Validaciones

Zod

Estilos

Tailwind CSS

Iconografía

Lucide React

Animaciones

Framer Motion

---

# 4. Arquitectura

```text
web/

src/

assets/

components/

features/

hooks/

layouts/

pages/

routes/

services/

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

styles/

types/

utils/

App.tsx

main.tsx
```

---

# 6. Layouts

El sistema tendrá dos layouts principales.

```text
layouts/

PublicLayout

LegalLayout
```

PublicLayout

- Header
- Navegación
- Footer

LegalLayout

- Navegación mínima
- Contenido legal

---

# 7. Páginas

Las páginas iniciales serán:

```text
/

Nosotros

Catálogo

Promociones

Contacto

Preguntas Frecuentes

Términos y Condiciones

Política de Privacidad

404
```

---

# 8. Componentes Globales

Header

Footer

Navbar

Hero

Banner

SectionTitle

Card

Button

Breadcrumb

Carousel

Gallery

FAQ

ContactForm

Newsletter

SocialLinks

FloatingWhatsApp

ScrollToTop

Loader

---

# 9. Organización por Features

```text
features/

home/

about/

catalog/

promotions/

contact/

faq/

legal/
```

Cada Feature será completamente independiente.

---

# 10. Servicios

Todos los servicios consumirán la API REST.

```text
services/

cms.service.ts

catalog.service.ts

marketing.service.ts

configuration.service.ts
```

---

# 11. Manejo de Estado

La aplicación utilizará:

TanStack Query

Para información remota.

Estado local

Para interacción de componentes.

No se utilizará estado global.

---

# 12. Rutas

```text
/

/nosotros

/catalogo

/promociones

/contacto

/preguntas-frecuentes

/terminos-condiciones

/politica-privacidad
```

---

# 13. Consumo de API

Información obtenida desde:

CMS

- Páginas
- Hero
- Banner
- FAQ
- Footer

Catalog

- Productos destacados
- Categorías

Marketing

- Promociones

Configuration

- Redes sociales
- Empresa

---

# 14. SEO

Todas las páginas deberán definir:

- Title
- Description
- Open Graph
- Canonical
- Robots

La información provendrá del CMS.

---

# 15. Responsive

La aplicación deberá soportar:

Desktop

Laptop

Tablet

Mobile

---

# 16. Optimización

Lazy Loading

Code Splitting

Image Optimization

Memoización de Componentes

Prefetch de Datos

---

# 17. Seguridad

No almacenar tokens.

No almacenar información sensible.

Validar formularios antes del envío.

Sanitizar contenido HTML proveniente del CMS.

---

# 18. Flujo

Usuario

↓

Página Web

↓

React

↓

API REST

↓

NestJS

↓

PostgreSQL

---

# 19. Convenciones

Componentes

PascalCase

Hooks

camelCase

Archivos CSS

kebab-case

Rutas

kebab-case

---

# 20. Dependencias

Consume:

- CMS
- Catalog
- Marketing
- Configuration

No produce información para otros módulos.

---

# 21. Resumen

Framework

React

Build

Vite

Lenguaje

TypeScript

API

REST

Autenticación

No requerida

SEO

Sí

Responsive

Sí

---

# 22. Próximo Documento

El siguiente documento corresponde al Frontend de la Tienda Online, donde se definirán la arquitectura, autenticación de clientes, catálogo, carrito de compras, checkout, pagos con Stripe, perfil del cliente e historial de pedidos.