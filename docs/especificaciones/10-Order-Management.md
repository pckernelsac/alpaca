# Especificación Funcional

# Volumen V

# Parte XI

# Order Management System (OMS)

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

Administrar el ciclo completo de los pedidos desde la selección de productos por parte del cliente hasta la entrega final.

OMS constituye el núcleo operativo del comercio electrónico.

---

# 2. Alcance

Administra

- Carrito
- Checkout
- Pedidos
- Estados
- Confirmaciones
- Reservas
- Historial
- Cancelaciones

---

# 3. Actores

Cliente.

Ventas.

Logística.

Administrador.

---

# 4. Interfaces

Carrito.

Checkout.

Pedidos.

Detalle.

Historial.

---

# 5. Funcionalidades

Administrar carrito.

Crear pedido.

Actualizar estado.

Cancelar pedido.

Consultar historial.

Confirmar pedido.

---

# 6. Reglas de Negocio

RN-OMS-001

No podrá confirmarse un pedido sin stock disponible.

RN-OMS-002

El precio del pedido quedará congelado al momento de la confirmación.

RN-OMS-003

Toda modificación de estado será auditada.

RN-OMS-004

La reserva de stock se realizará antes del pago.

RN-OMS-005

Un pedido confirmado no podrá modificarse.

RN-OMS-006

Un pedido cancelado liberará automáticamente la reserva de inventario cuando aún no haya sido despachado.

---

# 7. Validaciones

Cliente válido.

Dirección válida.

Productos válidos.

Stock disponible.

---

# 8. Estados

Carrito

Pendiente

Confirmado

Pagado

Preparación

Despachado

Entregado

Cancelado

Devuelto

---

# 9. Flujo General

Carrito

↓

Checkout

↓

Reserva Inventario

↓

Pago

↓

Confirmación

↓

Preparación

↓

Despacho

↓

Entrega

---

# 10. Casos de Uso

Administrar carrito.

Crear pedido.

Consultar pedido.

Cancelar pedido.

Actualizar estado.

---

# 11. APIs

/api/v1/orders

/api/v1/cart

/api/v1/checkout

/api/v1/orders/{id}

---

# 12. Tablas

oms_cart

oms_cart_item

oms_order

oms_order_item

oms_order_status

oms_order_history

---

# 13. Permisos

OMS.READ

OMS.CREATE

OMS.UPDATE

OMS.CANCEL

---

# 14. Mensajes

Pedido creado.

Pedido confirmado.

Pedido cancelado.

Stock insuficiente.

---

# 15. Criterios de Aceptación

Todo pedido deberá mantener trazabilidad completa desde su creación hasta su cierre.

---

# 16. Casos de Prueba

Crear pedido.

Cancelar pedido.

Checkout correcto.

Checkout sin stock.

Cambio de estado.

---

# 17. Dependencias

Consume

CRM

Catalog

Textile

Inventory

Payments

Shipping

Produce

Analytics

---

# 18. Observaciones

OMS es el orquestador del proceso comercial.

No procesa pagos ni realiza envíos directamente; coordina esos procesos mediante los módulos Payments y Shipping.