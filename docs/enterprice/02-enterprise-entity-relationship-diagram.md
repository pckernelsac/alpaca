# Enterprise Entity Relationship Diagram (EERD)

> Proyecto: Alpacart ERP
>
> Versión: 1.0
>
> Documento de Arquitectura Empresarial

---

# 1. Objetivo

Este documento define todas las entidades principales del ERP, sus relaciones, cardinalidades y reglas de negocio.

Este documento será utilizado para:

- Modelo PostgreSQL
- Backend Node.js
- API REST
- Dashboard ERP
- Reportes
- Integraciones
- Machine Learning

No representa todavía tablas físicas.

Representa el modelo conceptual empresarial.

---

# 2. Convenciones

Cardinalidades

1 = Uno

N = Muchos

0..1 = Opcional

0..N = Muchos opcionales

---

# 3. Agregados (DDD)

Cada dominio posee un Aggregate Root.

| Dominio | Aggregate Root |
|----------|----------------|
| IAM | Usuario |
| CRM | Cliente |
| CAT | Producto |
| INV | Stock |
| OMS | Pedido |
| PAY | Pago |
| SHP | Envío |
| CMS | Página |
| MKT | Campaña |
| ANA | Dashboard |
| CFG | Empresa |
| AUD | EventoAuditoría |
| TXT | Fibra |

---

# 4. Dominio CRM

## Aggregate Root

Cliente

---

Cliente

Gestiona toda la relación comercial.

No administra autenticación.

---

Entidades

Cliente

Dirección

Favorito

Notificación

Ticket

HistorialCliente

EtiquetaCliente

SegmentoCliente

---

## Relaciones

```mermaid
erDiagram

CLIENTE ||--o{ DIRECCION : posee

CLIENTE ||--o{ PEDIDO : realiza

CLIENTE ||--o{ FAVORITO : guarda

CLIENTE ||--o{ NOTIFICACION : recibe

CLIENTE ||--o{ TICKET : genera

CLIENTE ||--o{ HISTORIAL_CLIENTE : registra

CLIENTE }o--o{ SEGMENTO_CLIENTE : pertenece
```

---

Reglas

Un Cliente puede tener múltiples direcciones.

Un Cliente puede realizar múltiples pedidos.

Los Favoritos pertenecen al Cliente.

El Historial nunca debe eliminarse.

---

# 5. Dominio IAM

Aggregate Root

Usuario

---

Entidades

Usuario

Rol

Permiso

Módulo

Sesión

Token

---

Relaciones

```mermaid
erDiagram

ROL ||--o{ USUARIO : asigna

ROL }o--o{ PERMISO : contiene

USUARIO ||--o{ SESION : inicia

USUARIO ||--o{ TOKEN : posee
```

---

Reglas

Todo Usuario pertenece a un Rol.

Todo Rol posee múltiples Permisos.

---

# 6. Dominio Catálogo

Aggregate Root

Producto

---

Entidades

Producto

SKU

Variante

Categoría

Subcategoría

Colección

Temporada

Etiqueta

Galería

ImagenProducto

SEOProducto

---

Relaciones

```mermaid
erDiagram

CATEGORIA ||--o{ SUBCATEGORIA : contiene

SUBCATEGORIA ||--o{ PRODUCTO : clasifica

COLECCION ||--o{ PRODUCTO : agrupa

TEMPORADA ||--o{ COLECCION : organiza

PRODUCTO ||--o{ VARIANTE : posee

VARIANTE ||--o{ SKU : genera

PRODUCTO ||--o{ GALERIA : contiene

PRODUCTO ||--|| SEO_PRODUCTO : configura
```

---

Reglas

Todo Producto pertenece a una Categoría.

Todo Producto puede pertenecer a una Colección.

Todo SKU pertenece exactamente a una Variante.

Todo Producto posee una Ficha SEO.

---

# 7. Dominio Textil

Aggregate Root

Fibra

---

Entidades

Fibra

Composición

Proceso

FichaTécnica

Cuidados

Certificación

Proveedor

---

Relaciones

```mermaid
erDiagram

PRODUCTO ||--|| FICHA_TECNICA : posee

FICHA_TECNICA ||--o{ COMPOSICION : contiene

COMPOSICION }o--|| FIBRA : utiliza

PRODUCTO ||--o{ PROCESO : requiere

PRODUCTO ||--o{ CUIDADO : necesita

PRODUCTO ||--o{ CERTIFICACION : posee
```

---

Reglas

Una Ficha Técnica pertenece a un Producto.

Una Composición puede utilizar varias Fibras.

Los Cuidados nunca pertenecen al SKU.

Pertenecen al Producto.

---

# 8. Dominio Inventario

Aggregate Root

Stock

---

Entidades

Stock

Movimiento

Kardex

Reserva

Almacén

Ajuste

---

Relaciones

```mermaid
erDiagram

SKU ||--|| STOCK : posee

STOCK ||--o{ MOVIMIENTO : registra

MOVIMIENTO ||--|| KARDEX : genera

STOCK ||--o{ RESERVA : reserva

ALMACEN ||--o{ STOCK : almacena
```

---

Reglas

Nunca existe Stock para Producto.

Todo Stock pertenece al SKU.

Todo Movimiento genera Kardex.

---

# 9. Dominio OMS

Aggregate Root

Pedido

---

Entidades

Pedido

DetallePedido

EstadoPedido

TimelinePedido

Carrito

Wishlist

---

Relaciones

```mermaid
erDiagram

CLIENTE ||--o{ PEDIDO : realiza

PEDIDO ||--|{ DETALLE_PEDIDO : contiene

DETALLE_PEDIDO }o--|| SKU : referencia

PEDIDO ||--o{ ESTADO_PEDIDO : cambia

PEDIDO ||--o{ TIMELINE_PEDIDO : registra

CLIENTE ||--|| CARRITO : posee

CLIENTE ||--|| WISHLIST : posee
```

---

Reglas

Todo Pedido posee al menos un Detalle.

Todo Detalle referencia un SKU.

Nunca referencia un Producto.

---

# 10. Dominio PAY

Aggregate Root

Pago

---

Entidades

Pago

MétodoPago

StripeTransaction

Reembolso

---

Relaciones

```mermaid
erDiagram

PEDIDO ||--|| PAGO : genera

PAGO ||--|| STRIPE_TRANSACTION : procesa

PAGO ||--o{ REEMBOLSO : devuelve
```

---

Reglas

Un Pedido genera un Pago.

El Pago puede tener múltiples Reembolsos.

---

# 11. Dominio Shipping

Aggregate Root

Envío

---

Entidades

Envío

Courier

Tracking

Guía

Devolución

CambioProducto

---

Relaciones

```mermaid
erDiagram

PEDIDO ||--|| ENVIO : genera

ENVIO ||--|| GUIA : posee

GUIA ||--o{ TRACKING : registra

ENVIO ||--|| COURIER : utiliza

ENVIO ||--o{ DEVOLUCION : genera
```

---

# 12. Dominio CMS

Aggregate Root

Página

---

Entidades

Página

Sección

Componente

Banner

Hero

FAQ

Footer

Menú

Landing

---

Relaciones

```mermaid
erDiagram

PAGINA ||--o{ SECCION : contiene

SECCION ||--o{ COMPONENTE : usa

PAGINA ||--o{ HERO : posee

PAGINA ||--o{ BANNER : muestra

PAGINA ||--o{ FAQ : incluye
```

---

# 13. Dominio Marketing

Aggregate Root

Campaña

---

Entidades

Campaña

Promoción

Cupón

Newsletter

Suscriptor

Lookbook

---

Relaciones

```mermaid
erDiagram

CAMPAÑA ||--o{ PROMOCION : crea

PROMOCION ||--o{ CUPON : genera

NEWSLETTER ||--o{ SUSCRIPTOR : envía

CAMPAÑA ||--o{ LOOKBOOK : utiliza
```

---

# 14. Relaciones Globales

```mermaid
flowchart TD

CRM --> OMS

OMS --> PAY

OMS --> SHP

OMS --> INV

CAT --> TXT

CAT --> INV

CMS --> CAT

MKT --> CRM

ANA --> OMS

ANA --> CRM

CFG --> ALL

AUD --> ALL
```

---

# 15. Próximo Documento

El siguiente volumen corresponde al **Modelo Físico PostgreSQL**, donde cada entidad será transformada en tablas, columnas, claves primarias, claves foráneas, índices, restricciones y convenciones de nombres siguiendo las mejores prácticas para PostgreSQL.