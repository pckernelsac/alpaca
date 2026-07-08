# Enterprise Data Dictionary (EDD)

> Proyecto: Alpacart ERP
>
> Versión: 1.0
>
> Documento de Arquitectura Empresarial

---

# 1. Objetivo

Este documento define el significado funcional de cada entidad del sistema.

No describe tablas SQL.

No describe tipos de datos.

No describe endpoints.

Describe el negocio.

Cada entidad representa un concepto empresarial.

Este documento será utilizado para:

- Diseño del ERP
- Backend
- PostgreSQL
- API REST
- Dashboard
- QA
- Machine Learning
- Documentación

---

# 2. Convenciones

Cada entidad será documentada utilizando la siguiente estructura.

- Nombre
- Dominio
- Aggregate Root
- Descripción
- Propósito
- Propietario
- Responsabilidades
- Estados
- Relaciones
- Eventos
- Reglas
- Futuras Expansiones

---

# 3. Dominio CRM

---

## Entidad: Cliente

### Dominio

CRM

### Aggregate Root

Sí

### Descripción

Representa a una persona o empresa que realiza compras dentro de la plataforma.

No representa un usuario del ERP.

### Propósito

Centralizar toda la información comercial relacionada con un comprador.

### Propietario

CRM

### Responsabilidades

- Mantener información personal.
- Registrar historial de compras.
- Gestionar direcciones.
- Gestionar favoritos.
- Recibir promociones.
- Generar pedidos.

### Estados

Activo

Inactivo

Bloqueado

Eliminado (lógico)

### Relaciones

Cliente

↓

Pedidos

Direcciones

Favoritos

Notificaciones

Tickets

Segmentos

### Eventos que Produce

ClienteRegistrado

ClienteActualizado

ClienteEliminado

ClienteSegmentado

### Eventos que Consume

PedidoCreado

PagoConfirmado

PromociónAsignada

### Reglas

Nunca puede eliminarse físicamente.

Siempre deberá conservar el historial comercial.

### Futuras Expansiones

Programa de Fidelización.

IA de Segmentación.

Scoring del Cliente.

Recomendaciones.

---

## Entidad: Dirección

### Dominio

CRM

### Aggregate Root

No

### Descripción

Representa una dirección física asociada a un cliente.

### Responsabilidades

- Dirección principal.
- Dirección secundaria.
- Dirección de envío.
- Dirección de facturación.

### Estados

Activa

Inactiva

Principal

### Relaciones

Cliente

↓

Direcciones

### Eventos

DirecciónCreada

DirecciónActualizada

DirecciónEliminada

### Reglas

Un Cliente puede tener múltiples direcciones.

Solo una puede ser Principal.

---

# 4. Dominio Catálogo

---

## Entidad: Producto

### Dominio

CAT

### Aggregate Root

Sí

### Descripción

Representa una referencia comercial.

No representa inventario.

No representa stock.

### Propósito

Definir un artículo comercial que será ofrecido al cliente.

### Responsabilidades

- Nombre
- Descripción
- Historia
- Materiales
- Colección
- Categoría

### Estados

Borrador

Publicado

Archivado

Descontinuado

### Relaciones

Producto

↓

Variantes

Galería

SEO

Colección

Categoría

Ficha Técnica

### Eventos

ProductoCreado

ProductoPublicado

ProductoActualizado

ProductoArchivado

### Reglas

Nunca almacena stock.

Nunca almacena cantidades.

Nunca almacena movimientos.

### Futuras Expansiones

Versionado.

Productos Digitales.

Bundles.

---

## Entidad: SKU

### Dominio

CAT

### Aggregate Root

No

### Descripción

Unidad comercial vendible.

Representa una combinación única de variantes.

### Ejemplo

Cardigan Heritage

↓

Azul

↓

XL

↓

SKU-000123

### Responsabilidades

- Precio
- Código
- Barcode
- Stock
- Estado

### Estados

Activo

Inactivo

Sin Stock

Reservado

### Relaciones

Producto

↓

SKU

↓

Inventario

↓

Pedido

### Eventos

SKUCreado

StockActualizado

PrecioActualizado

### Reglas

Todo Stock pertenece al SKU.

Nunca al Producto.

---

# 5. Dominio Inventario

---

## Entidad: Stock

### Aggregate Root

Sí

### Descripción

Representa la disponibilidad física de un SKU.

### Responsabilidades

- Existencia
- Disponible
- Reservado
- Comprometido

### Relaciones

SKU

↓

Stock

↓

Movimientos

↓

Kardex

### Eventos

StockIncrementado

StockReducido

StockReservado

StockLiberado

### Reglas

Todo movimiento debe registrarse.

Nunca modificar stock directamente.

---

# 6. Dominio OMS

---

## Entidad: Pedido

### Aggregate Root

Sí

### Descripción

Representa una compra realizada por un cliente.

### Responsabilidades

- Productos
- Estado
- Pago
- Envío

### Estados

Pendiente

Confirmado

Preparación

Empacado

Enviado

Entregado

Cancelado

Devuelto

### Relaciones

Cliente

↓

Pedido

↓

Detalle

↓

Pago

↓

Envío

### Eventos

PedidoCreado

PedidoPagado

PedidoEmpacado

PedidoEnviado

PedidoEntregado

### Reglas

Siempre posee al menos un Detalle.

Nunca puede existir sin Cliente.

---

# 7. Dominio Payments

---

## Entidad: Pago

### Aggregate Root

Sí

### Descripción

Representa una transacción económica.

### Estados

Pendiente

Procesando

Pagado

Fallido

Reembolsado

### Relaciones

Pedido

↓

Pago

↓

Stripe

### Eventos

PagoConfirmado

PagoRechazado

PagoReembolsado

### Reglas

Nunca modificar un pago manualmente.

Toda modificación genera auditoría.

---

# 8. Dominio Shipping

---

## Entidad: Envío

### Aggregate Root

Sí

### Descripción

Representa el proceso logístico posterior a la compra.

### Estados

Pendiente

Preparación

Despachado

En Tránsito

Entregado

Devuelto

### Relaciones

Pedido

↓

Envío

↓

Courier

↓

Tracking

### Eventos

EnvíoCreado

GuíaGenerada

PedidoDespachado

EntregaConfirmada

---

# 9. Dominio CMS

---

## Entidad: Página

### Aggregate Root

Sí

### Descripción

Representa una página administrable del sitio web.

### Responsabilidades

- Hero
- Banner
- Componentes
- Secciones
- SEO

### Estados

Borrador

Publicado

Archivado

---

# 10. Dominio Marketing

---

## Entidad: Campaña

### Aggregate Root

Sí

### Descripción

Representa una estrategia promocional.

Puede generar:

- Cupones
- Banners
- Promociones
- Landing Pages

### Estados

Borrador

Programada

Activa

Finalizada

Cancelada

---

# 11. Dominio Textil

---

## Entidad: Fibra

### Aggregate Root

Sí

### Descripción

Representa el tipo de fibra utilizada para fabricar un producto.

### Ejemplos

- Alpaca
- Baby Alpaca
- Alpaca Bouclé
- Vicuña
- Merino

### Responsabilidades

- Nombre
- Origen
- Calidad
- Certificaciones

### Relaciones

Fibra

↓

Composición

↓

Ficha Técnica

↓

Producto

### Reglas

Una composición puede contener múltiples fibras.

Los porcentajes siempre deben sumar 100%.

---

# 12. Convenciones Empresariales

Toda entidad debe:

- Tener auditoría.
- Tener estado.
- Tener fecha de creación.
- Tener fecha de actualización.
- Tener usuario creador.
- Tener usuario modificador.
- Permitir eliminación lógica cuando aplique.

---

# 13. Próximo Documento

El siguiente volumen corresponde al **PostgreSQL Physical Data Model**, donde cada una de estas entidades será transformada en tablas físicas, columnas, claves primarias, claves foráneas, índices, restricciones y convenciones de nombres siguiendo estándares empresariales.