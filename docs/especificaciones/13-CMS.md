# Especificación Funcional

# Volumen V

# Parte XIV

# Content Management System (CMS)

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

Administrar el contenido institucional y comercial publicado en la Página Web y la Tienda Online.

El CMS permitirá actualizar contenido sin modificar el código fuente.

---

# 2. Alcance

Administra

- Páginas.
- Banners.
- Sliders.
- Secciones.
- Blogs.
- Preguntas Frecuentes.
- Políticas.
- Términos.
- Contenido institucional.

---

# 3. Actores

Administrador.

Marketing.

Editor.

---

# 4. Interfaces Funcionales

Páginas.

Banners.

Blog.

FAQ.

Contenido.

---

# 5. Funcionalidades

Crear página.

Editar página.

Publicar contenido.

Programar publicación.

Administrar banners.

Administrar FAQ.

Administrar políticas.

---

# 6. Reglas de Negocio

RN-CMS-001

Toda página deberá mantener versiones.

RN-CMS-002

Solo contenido publicado será visible.

RN-CMS-003

Toda modificación deberá auditarse.

RN-CMS-004

Las imágenes deberán gestionarse mediante Storage.

RN-CMS-005

Cada página deberá poseer una URL única.

---

# 7. Validaciones

Título obligatorio.

Slug único.

Estado válido.

Contenido obligatorio.

---

# 8. Estados

Borrador.

Publicado.

Archivado.

---

# 9. Flujo General

Crear

↓

Editar

↓

Vista previa

↓

Publicar

↓

Actualizar

---

# 10. Casos de Uso

Crear página.

Editar página.

Publicar página.

Administrar banners.

Administrar FAQ.

---

# 11. APIs

/api/v1/cms/pages

/api/v1/cms/banners

/api/v1/cms/posts

/api/v1/cms/faqs

---

# 12. Tablas

cms_page

cms_banner

cms_post

cms_faq

cms_section

cms_page_version

---

# 13. Permisos

CMS.READ

CMS.CREATE

CMS.UPDATE

CMS.PUBLISH

---

# 14. Mensajes

Página creada.

Página publicada.

Contenido actualizado.

Slug duplicado.

---

# 15. Criterios de Aceptación

Todo contenido publicado deberá visualizarse inmediatamente en el sitio web.

---

# 16. Casos de Prueba

Crear página.

Editar página.

Publicar contenido.

Actualizar banner.

---

# 17. Dependencias

Consume

Storage

IAM

Audit

Produce

Página Institucional

Tienda Online

Marketing

---

# 18. Observaciones

CMS constituye la fuente oficial del contenido institucional del sistema.

No administra productos ni promociones comerciales; únicamente contenido editorial y corporativo.