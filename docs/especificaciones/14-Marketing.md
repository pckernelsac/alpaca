# Especificación Funcional

# Volumen V

# Parte XV

# Marketing

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

El módulo Marketing administra todas las estrategias comerciales utilizadas para incrementar las ventas, fidelizar clientes y promocionar los productos de la tienda.

Centraliza la gestión de campañas, promociones, cupones, descuentos y comunicaciones comerciales.

---

# 2. Alcance

Administra

- Campañas.
- Promociones.
- Cupones.
- Descuentos.
- Landing Pages.
- Newsletters.
- Segmentación.
- Remarketing.
- Popups.
- Banners promocionales.

---

# 3. Actores

Administrador.

Marketing.

Gerencia.

---

# 4. Interfaces Funcionales

Campañas.

Promociones.

Cupones.

Landing Pages.

Newsletters.

Segmentación.

---

# 5. Funcionalidades

Crear campaña.

Editar campaña.

Publicar campaña.

Crear promoción.

Administrar cupones.

Programar descuentos.

Enviar Newsletter.

Administrar Landing Pages.

Segmentar clientes.

Consultar resultados.

---

# 6. Reglas de Negocio

RN-MKT-001

Toda campaña tendrá fecha de inicio y fin.

---

RN-MKT-002

Los cupones podrán tener límite de uso.

---

RN-MKT-003

Los descuentos no podrán generar precios negativos.

---

RN-MKT-004

Las promociones deberán indicar claramente su vigencia.

---

RN-MKT-005

Toda campaña deberá quedar registrada en Audit.

---

RN-MKT-006

Los descuentos se aplicarán antes del cálculo final del pago y conforme a las reglas comerciales definidas.

---

# 7. Validaciones

Nombre obligatorio.

Fechas válidas.

Descuento válido.

Cupón único.

Productos válidos.

Segmento válido.

---

# 8. Estados

Borrador.

Programada.

Activa.

Finalizada.

Cancelada.

---

# 9. Flujo General

Campaña

↓

Configuración

↓

Programación

↓

Publicación

↓

Ejecución

↓

Resultados

---

# 10. Casos de Uso

Crear campaña.

Editar campaña.

Crear cupón.

Crear promoción.

Enviar Newsletter.

Consultar resultados.

---

# 11. APIs

/api/v1/marketing/campaigns

/api/v1/marketing/promotions

/api/v1/marketing/coupons

/api/v1/marketing/newsletters

/api/v1/marketing/landing-pages

---

# 12. Tablas

marketing_campaign

marketing_coupon

marketing_promotion

marketing_discount

marketing_newsletter

marketing_segment

marketing_landing_page

---

# 13. Permisos

MARKETING.READ

MARKETING.CREATE

MARKETING.UPDATE

MARKETING.PUBLISH

MARKETING.DELETE

---

# 14. Mensajes

Campaña creada.

Promoción publicada.

Cupón generado.

Newsletter enviada.

Campaña finalizada.

---

# 15. Criterios de Aceptación

Toda promoción activa deberá reflejarse automáticamente en la Tienda Online conforme a su configuración.

---

# 16. Casos de Prueba

Crear campaña.

Crear cupón.

Aplicar descuento.

Programar promoción.

Enviar Newsletter.

---

# 17. Dependencias

Consume

CRM

Catalog

CMS

Configuration

Audit

Produce

Store

Analytics

---

# 18. Observaciones

Marketing administra únicamente acciones comerciales.

No modifica directamente productos, inventario, pedidos ni contenido institucional.