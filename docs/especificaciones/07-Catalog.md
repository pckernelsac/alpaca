# Especificación Funcional

# Volumen V

# Parte VIII

# Catalog

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

Administrar el catálogo comercial de productos disponibles para la venta en la Tienda Online.

---

# 2. Alcance

Administra

- Productos.
- Categorías.
- Colecciones.
- Marcas.
- Variantes.
- Imágenes.
- SKU.
- SEO.

---

# 3. Actores

Administrador.

Ventas.

Marketing.

Cliente (consulta).

---

# 4. Interfaces Funcionales

Productos.

Categorías.

Colecciones.

Marcas.

Variantes.

SEO.

---

# 5. Funcionalidades

Registrar producto.

Editar producto.

Publicar producto.

Administrar categorías.

Administrar colecciones.

Administrar variantes.

Gestionar imágenes.

Gestionar SEO.

---

# 6. Reglas de Negocio

RN-CAT-001

Todo producto deberá poseer SKU único.

RN-CAT-002

Todo producto pertenecerá al menos a una categoría.

RN-CAT-003

Todo producto tendrá un estado.

RN-CAT-004

Todo producto podrá poseer múltiples imágenes.

RN-CAT-005

La publicación dependerá del estado del producto.

---

# 7. Validaciones

Nombre.

SKU.

Categoría.

Precio.

Estado.

Imagen.

---

# 8. Estados

Borrador.

Publicado.

Oculto.

Descontinuado.

---

# 9. Flujo General

Crear

↓

Completar

↓

Publicar

↓

Venta

↓

Descontinuar

---

# 10. Casos de Uso

Registrar producto.

Editar producto.

Publicar producto.

Administrar categorías.

Administrar colecciones.

Administrar imágenes.

---

# 11. APIs

/api/v1/catalog/products

/api/v1/catalog/categories

/api/v1/catalog/collections

/api/v1/catalog/brands

---

# 12. Tablas

catalog_product

catalog_category

catalog_collection

catalog_brand

catalog_variant

catalog_product_image

---

# 13. Permisos

CATALOG.READ

CATALOG.CREATE

CATALOG.UPDATE

CATALOG.DELETE

CATALOG.PUBLISH

---

# 14. Mensajes

Producto registrado.

Producto publicado.

Producto actualizado.

SKU duplicado.

Categoría inexistente.

---

# 15. Criterios de Aceptación

Todo producto publicado deberá estar disponible para la Tienda Online.

---

# 16. Casos de Prueba

Registrar producto.

Editar producto.

Publicar producto.

Agregar imágenes.

Crear categoría.

---

# 17. Dependencias

Consume

Storage

Master Data

Configuration

Textile

Produce

Inventory

Store

Marketing

Analytics

---

# 18. Observaciones

Catalog constituye la única fuente oficial de información comercial de productos.

Todo el inventario, pedidos y marketing deberán utilizar este módulo como referencia.