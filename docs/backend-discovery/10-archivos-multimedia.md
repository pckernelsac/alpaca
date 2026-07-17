# Archivos y Multimedia — ALPACART Backend

## 1. Estrategia de Storage

| Tipo | Motor recomendado | Backup | URLs |
|------|-------------------|--------|------|
| **Imágenes de producto** | Cloudinary / S3 | Sí | CDN transformable |
| **Avatares** | Cloudinary / S3 | Sí | CDN transformable |
| **Documentos PDF** | S3 / MinIO | Sí | Pre-signed URLs |
| **Videos** | Cloudinary / S3 | Sí | Streaming |
| **Logos** | S3 / MinIO | Sí | CDN |
| **CMS images** | Cloudinary / S3 | Sí | CDN |
| **Hero / banners** | Cloudinary / S3 | Sí | CDN |
| **Galería institucional** | Cloudinary / S3 | Sí | CDN |

**Regla:** Nunca almacenar binarios en PostgreSQL. La base de datos guarda solo la URL y metadatos.

**Convención de URLs:**
```
https://cdn.alpacart.com/{env}/{entity}/{id}/{filename}.{ext}
Ej: https://cdn.alpacart.com/prod/products/abc123/producto-principal.jpg
```

---

## 2. Matriz Completa de Archivos

### 2.1 Product Media (Galería de Producto)

| Aspecto | Detalle |
|---------|---------|
| **Entidad propietaria** | Product (opcional: Variant) |
| **Tabla** | `product_media` |
| **Cardinalidad** | 1:N (1 producto → N imágenes/videos) |
| **Evidencia** | ProductMedia (4 assets), ProductCreate (upload zone), ProductDetail (3 imágenes) |
| **Requerido** | No (producto puede no tener imágenes) |

**Especificaciones técnicas:**

| Campo | Valor |
|-------|-------|
| Formatos permitidos | JPG, PNG, WEBP, MP4 |
| Tamaño máximo | 50 MB (según ProductCreate: "JPG, PNG, MP4 hasta 50MB") |
| Dimensiones referencia | 2400×1600 px (mock "manta_gold_frontal.jpg") |
| Imagen principal | 1 por producto (isPrincipal = true) |
| Orden | Explícito (order field) |
| Alt text | Requerido para SEO |
| Descripción | Opcional |
| Visible | BOOLEAN (default: true) |
| Optimizado | BOOLEAN (flag post-procesamiento) |

**Ciclo de vida:**
```
Upload (POST /media) → Pendiente → Optimizado (POST /media/:id/optimize) → Visible
                                                                                ↓
                                                                          Eliminado (DELETE /media/:id)
```

**Vistas requeridas:**
- Thumbnail (150×150) — listados, tablas
- Medium (400×400) — galerías, cards
- Large (800×800) — detalle de producto
- Original — zoom, descarga

**Transformaciones esperadas (Cloudinary):**
| Viewport | Transformación | Uso |
|----------|---------------|-----|
| thumbnail | `w_150,h_150,c_fill` | Tablas, cards |
| small | `w_400,h_400,c_fit` | Galerías |
| medium | `w_800` | ProductDetail |
| large | `w_1200` | Hero / zoom |

**Ejemplos mock de nombres:**
```
manta_gold_frontal.jpg (4.2 MB, JPG, 2400×1600 px, principal)
manta_gold_detalle.jpg (3.8 MB, JPG, 2200×1400 px)
manta_gold_lifestyle.mp4 (18.5 MB, MP4)
manta_gold_packaging.jpg (5.1 MB, JPG, 2800×1800 px)
```

---

### 2.2 Avatares

| Aspecto | Detalle |
|---------|---------|
| **Entidad propietaria** | User, Customer, Client |
| **Tabla** | Campo `avatar` VARCHAR(500) en users/customers/clients |
| **Cardinalidad** | 1:1 (1 entidad → 1 avatar) |
| **Evidencia** | UserCreate (avatar upload), MyProfile (camera overlay), ClientCreate (upload) |
| **Requerido** | No |

**Especificaciones:**

| Campo | Valor |
|-------|-------|
| Formatos | JPG, PNG, WEBP |
| Tamaño máximo | 2 MB (según UserCreate: "JPG, PNG, WEBP max 2MB") |
| Dimensiones esperadas | ~200×200 px (se renderiza como w-8 ≈ 32px hasta w-32 ≈ 128px) |
| Fallback | Iniciales del nombre (2 letras) |
| Background | Basado en contexto (role, departamento, aleatorio) |

**Vistas:**
| Tamaño | Clase CSS | Uso |
|--------|-----------|-----|
| Mini | w-6 (24px) | Tabla de usuarios |
| Small | w-8 (32px) | Navbar |
| Medium | w-10 (40px) | Sidebar, timeline |
| Large | w-32 (128px) | Profile page |

---

### 2.3 Imágenes de Producto (Catálogo Frontend)

| Aspecto | Detalle |
|---------|---------|
| **Entidad propietaria** | Product |
| **Cardinalidad** | 1:N (a través de ProductMedia) |
| **Evidencia** | ProductList (thumbnail en tabla), CategoryGrid (cards), SearchResults |
| **Formato inferido** | JPG (el original de Google Storage es JPG) |
| **Alt text** | Usar product.name como mínimo |

---

### 2.4 Multimedia de CMS

| Aspecto | Detalle |
|---------|---------|
| **Entidad propietaria** | Content |
| **Tabla propuesta** | `content_media` (similar a product_media) |
| **Cardinalidad** | 1:N |
| **Evidencia** | ContentList (image boolean), CmsDashboard (banners), ProductMedia (pattern reutilizable) |
| **Formatos** | JPG, PNG, WEBP |
| **Tamaño inferido** | Hasta 10 MB |
| **Uso** | Banners de páginas, imágenes de blog, hero de colecciones |

---

### 2.5 Documentos de Pedido

| Aspecto | Detalle |
|---------|---------|
| **Entidad propietaria** | Order |
| **Tabla** | `order_documents` |
| **Cardinalidad** | 1:N |
| **Evidencia** | OrderDetail (Invoice PDF + Packing List PDF) |
| **Formatos** | PDF |
| **Tamaño inferido** | 0.1-5 MB |
| **Storage** | S3/privado (no público) |

**Tipos de documentos:**
| Tipo | Descripción | Generado por |
|------|-------------|--------------|
| `invoice` | Factura / Invoice | Sistema al confirmar pedido |
| `packing_list` | Guía de remisión | Sistema al preparar envío |
| `label` | Etiqueta de envío | Sistema o carrier |
| `other` | Documento adjunto manual | Admin (upload) |

**Vida útil:** Permanente (retención legal: 7 años)

---

### 2.6 Imágenes de Colección

| Aspecto | Detalle |
|---------|---------|
| **Entidad propietaria** | Collection |
| **Tabla** | Campo `image` VARCHAR(500) en collections |
| **Cardinalidad** | 1:1 |
| **Evidencia** | CollectionGrid (4 colecciones con imagen) |
| **Formato** | JPG, PNG |
| **Tamaño inferido** | 1200×800 px |
| **Uso** | Hero de colección en tienda y dashboard |

---

### 2.7 Imágenes de Categoría

| Aspecto | Detalle |
|---------|---------|
| **Entidad propietaria** | Category |
| **Tabla** | Campo `image` VARCHAR(500) en categories |
| **Cardinalidad** | 1:1 |
| **Evidencia** | CategoryBento (4 categorías con imagen), CategoryHero (imagen de fondo) |
| **Formato** | JPG, PNG |
| **Tamaño inferido** | 1920×500 px (hero) |

---

### 2.8 Imágenes de Campaña/Banner

| Aspecto | Detalle |
|---------|---------|
| **Entidad propietaria** | Campaign, Promotion, Content (type=banner) |
| **Tabla** | Campo `image` VARCHAR(500) |
| **Cardinalidad** | 1:1 |
| **Evidencia** | CampaignList (img en cards), CampaignBanner (hero), CmsDashboard (banners) |
| **Formatos** | JPG, PNG, WEBP |

---

### 2.9 Logo de Empresa

| Aspecto | Detalle |
|---------|---------|
| **Entidad propietaria** | CompanySetting |
| **Tabla** | Campo `logo` VARCHAR(500) |
| **Cardinalidad** | 1:1 |
| **Evidencia** | Settings (logo upload SVG/PNG/JPG max 5MB) |
| **Formatos** | SVG, PNG, JPG |
| **Tamaño máximo** | 5 MB |
| **Dimensiones** | Variable (cuadrado recomendado, ~200×200 px) |

---

### 2.10 Imágenes Institucionales (Galería)

| Aspecto | Detalle |
|---------|---------|
| **Entidad propietaria** | GalleryImage (tabla propuesta) |
| **Cardinalidad** | 1:N (varias galerías) |
| **Evidencia** | AboutGallery (4 imágenes), HomeGallery (4 imágenes), CatalogGallery (3 imágenes), HomeCategories (2 imágenes) |
| **Uso** | Páginas institucionales (About, Home, Catálogo) |
| **Formatos** | JPG, PNG |
| **Propuesta** | Content (type='gallery') o tabla separada gallery_images |

---

### 2.11 Hero Images

| Aspecto | Detalle |
|---------|---------|
| **Entidad propietaria** | Slider/Slide (tabla propuesta) |
| **Cardinalidad** | 1:1 por slide |
| **Evidencia** | HeroSlider (3-5 slides con imagen), StoreHero (1 imagen), CategoryHero (1 imagen) |
| **Formatos** | JPG, PNG |
| **Dimensiones** | Full-width (1920×921 px en StoreHero, 1920×500 px en CategoryHero) |

**Propuesta de tabla `hero_slides`:**
| Campo | Tipo | Ejemplo |
|-------|------|---------|
| id | INTEGER | 1 |
| title | VARCHAR | "Colección Dorada de los Andes" |
| subtitle | TEXT | "La suavidad más pura de los Andes..." |
| cta_text | VARCHAR | "Explorar Colección" |
| cta_link | VARCHAR | "/category/ponchos" |
| image | VARCHAR | "https://cdn.alpacart.com/hero/slide1.jpg" |
| active | BOOLEAN | true |
| order | INTEGER | 1 |

---

### 2.12 Archivos de Importación/Exportación

| Aspecto | Detalle |
|---------|---------|
| **Formato** | CSV, Excel (.xlsx) |
| **Dirección** | Bidireccional (import/export) |
| **Tablas involucradas** | Products, Variants, Orders, Clients, Stock |
| **Evidencia** | ProductList (Import/Export), VariantList, ClientList, OrderList, StockList, UserList |
| **Storage** | Temporal (borrar post-procesamiento) |

---

## 3. Tabla Resumen de Archivos

| # | Tipo | Entidad | Tabla/Columna | Cardinalidad | Formatos | Tamaño máx | CDN | Privado |
|---|------|---------|---------------|--------------|----------|------------|-----|---------|
| 1 | Product image | Product | `product_media` (tabla) | 1:N | JPG, PNG, WEBP, MP4 | 50 MB | Sí | No |
| 2 | Avatar | User | `users.avatar` | 1:1 | JPG, PNG, WEBP | 2 MB | Sí | No |
| 3 | Avatar | Customer | `customers.avatar` | 1:1 | JPG, PNG, WEBP | 2 MB | Sí | No |
| 4 | Avatar | Client | `clients.avatar` | 1:1 | JPG, PNG, WEBP | 2 MB | Sí | No |
| 5 | CMS image | Content | `content_media` (tabla) | 1:N | JPG, PNG, WEBP | 10 MB | Sí | No |
| 6 | Invoice PDF | Order | `order_documents` | 1:N | PDF | 5 MB | No | Sí |
| 7 | Packing list | Order | `order_documents` | 1:N | PDF | 5 MB | No | Sí |
| 8 | Shipping label | Shipment | `order_documents` | 1:N | PDF | 5 MB | No | Sí |
| 9 | Collection image | Collection | `collections.image` | 1:1 | JPG, PNG | 10 MB | Sí | No |
| 10 | Category image | Category | `categories.image` | 1:1 | JPG, PNG | 10 MB | Sí | No |
| 11 | Campaign image | Campaign | `campaigns.image` | 1:1 | JPG, PNG, WEBP | 10 MB | Sí | No |
| 12 | Logo | CompanySetting | `company_settings.logo` | 1:1 | SVG, PNG, JPG | 5 MB | Sí | No |
| 13 | Hero slide | HeroSlide | `hero_slides.image` | 1:1 | JPG, PNG | 10 MB | Sí | No |
| 14 | Gallery image | GalleryImage | `gallery_images.image` | 1:1 | JPG, PNG | 10 MB | Sí | No |
| 15 | Import file | N/A | Temporal | 1:1 | CSV, XLSX | 50 MB | No | Sí |
| 16 | Export file | N/A | Temporal | 1:1 | CSV, XLSX, PDF | — | No | Sí |
| 17 | Audit report | N/A | Temporal | 1:1 | CSV, PDF | — | No | Sí |
| 18 | Product image (Tienda) | Product | `product_media` (misma tabla) | 1:N | JPG (Google Storage) | — | Sí | No |
| 19 | Hero institucional | HeroSlide | `hero_slides.image` | 1:1 | SVG (inline) + JPG | — | Sí | No |
| 20 | Gallery institucional | GalleryImage | `gallery_images.image` | 1:1 | JPG | — | Sí | No |

---

## 4. Endpoints de Archivos Propuestos

### Upload

| Endpoint | Propósito | Multipart | Auth |
|----------|-----------|-----------|------|
| `POST /products/:id/media` | Subir imagen/video de producto | field: `file[]` | Admin |
| `POST /variants/:id/media` | Subir imagen de variante | field: `file[]` | Admin |
| `POST /auth/avatar` | Subir avatar | field: `file` | Auth |
| `POST /clients/:id/avatar` | Subir avatar de cliente | field: `file` | Admin |
| `POST /orders/:id/documents` | Subir documento de pedido | field: `file` | Admin |
| `POST /contents/:id/media` | Subir imagen de CMS | field: `file[]` | Admin |
| `POST /settings/logo` | Subir logo empresa | field: `file` | Admin |
| `POST /hero/slides/:id/image` | Subir hero slide | field: `file` | Admin |
| `POST /gallery` | Subir imagen galería | field: `file` | Admin |
| `POST /products/import` | Importar productos (CSV) | field: `file` | Admin |
| `POST /orders/import` | Importar pedidos (CSV) | field: `file` | Admin |

### Download / Export

| Endpoint | Propósito | Auth |
|----------|-----------|------|
| `GET /products/export` | Exportar productos CSV | Admin |
| `GET /orders/:id/invoice` | Descargar factura PDF | Auth (propietario o admin) |
| `GET /orders/:id/documents/:docId` | Descargar documento | Admin |
| `GET /audit/export` | Exportar auditoría CSV | Admin |
| `GET /orders/export` | Exportar pedidos CSV | Admin |
| `GET /clients/export` | Exportar clientes CSV | Admin |

### Management

| Endpoint | Propósito | Auth |
|----------|-----------|------|
| `PUT /media/:id` | Actualizar metadatos (alt, desc, visible) | Admin |
| `DELETE /media/:id` | Eliminar archivo | Admin |
| `POST /media/:id/optimize` | Optimizar imagen | Admin |
| `PATCH /media/:id/principal` | Marcar como principal | Admin |

---

## 5. Buckets de Storage

| Bucket | Visibilidad | Contenido | TTL |
|--------|-------------|-----------|-----|
| `alpacart-public` | Público (CDN) | Product images, avatars, hero, gallery, logos, CMS images | Permanente |
| `alpacart-private` | Privado (pre-signed URLs) | Invoices, packing lists, labels, import files | 7 años (legal) |
| `alpacart-temp` | Privado | Import CSV, export temporales | 24 horas |

**Estructura de buckets:**
```
alpacart-public/
├── products/{productId}/{uuid}.{ext}
├── variants/{variantId}/{uuid}.{ext}
├── avatars/users/{userId}/{uuid}.{ext}
├── avatars/customers/{customerId}/{uuid}.{ext}
├── avatars/clients/{clientId}/{uuid}.{ext}
├── content/{contentId}/{uuid}.{ext}
├── collections/{collectionId}/{uuid}.{ext}
├── categories/{categoryId}/{uuid}.{ext}
├── campaigns/{campaignId}/{uuid}.{ext}
├── hero/{slideId}/{uuid}.{ext}
├── gallery/{imageId}/{uuid}.{ext}
├── logo/{uuid}.{ext}

alpacart-private/
├── orders/{orderId}/invoice-{uuid}.pdf
├── orders/{orderId}/packing-{uuid}.pdf
├── orders/{orderId}/label-{uuid}.pdf
├── imports/{entity}/{filename}.csv
├── exports/{entity}/{filename}.csv
```

---

## 6. Optimización de Imágenes

**Proceso post-upload (asíncrono):**
```
1. Upload → URL temporal
2. Evento: image.uploaded
3. Worker: Descarga → Redimensiona (thumb, small, medium) → Sube versiones
4. Worker: Comprime (JPEG quality 80%, WEBP)
5. Worker: Detecta dimensiones y formato
6. Actualiza ProductMedia (optimized=true, dimensions, fileSize)
```

---

## 7. Resumen

| Métrica | Valor |
|---------|-------|
| Tipos de archivo | 20 |
| Tablas necesarias | 2 nuevas (hero_slides, gallery_images) + 1 existente (product_media, order_documents, content_media) |
| Tabla puente | `product_media`, `order_documents`, `content_media` |
| Campos URL | ~10 (en users, customers, clients, collections, categories, campaigns, company_settings) |
| Buckets | 3 (public, private, temp) |
| Endpoints upload | 11 |
| Endpoints download | 6 |
| Endpoints management | 4 |
| Formatos | JPG, PNG, WEBP, SVG, MP4, PDF, CSV, XLSX |
| CDN | Sí (Cloudinary / S3 + CloudFront) |

---

*Documento generado el 2026-07-10. 20 tipos de archivo, 3 buckets, 21 endpoints de archivos.*
