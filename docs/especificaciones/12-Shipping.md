# Especificación Funcional

# Volumen V

# Parte XIII

# Shipping

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

Administrar el despacho, seguimiento y entrega de pedidos.

Shipping controla la operación logística posterior al pago confirmado.

---

# 2. Alcance

Administra

- Métodos de envío.
- Despachos.
- Guías.
- Seguimiento.
- Estados logísticos.
- Entregas.

---

# 3. Actores

Logística.

Administrador.

Cliente.

Ventas.

---

# 4. Interfaces Funcionales

Despachos.

Seguimiento.

Transportistas.

Estados.

---

# 5. Funcionalidades

Crear despacho.

Actualizar seguimiento.

Registrar guía.

Consultar estado.

Registrar entrega.

---

# 6. Reglas de Negocio

RN-SHP-001

Solo podrán despacharse pedidos pagados.

RN-SHP-002

Todo envío deberá tener una guía.

RN-SHP-003

Todo cambio de estado deberá registrarse.

RN-SHP-004

La entrega cerrará el ciclo logístico.

RN-SHP-005

Los estados deberán seguir la secuencia definida.

---

# 7. Validaciones

Pedido válido.

Pago confirmado.

Dirección válida.

Transportista válido.

---

# 8. Estados

Pendiente.

Preparación.

Despachado.

En tránsito.

Entregado.

Devuelto.

Cancelado.

---

# 9. Flujo General

Pedido

↓

Preparación

↓

Despacho

↓

Transporte

↓

Entrega

---

# 10. Casos de Uso

Registrar despacho.

Actualizar seguimiento.

Registrar entrega.

Consultar envío.

---

# 11. APIs

/api/v1/shipping

/api/v1/shipping/{id}

/api/v1/shipping/tracking

/api/v1/shipping/carriers

---

# 12. Tablas

shipping

shipping_status

shipping_tracking

shipping_carrier

shipping_delivery

---

# 13. Permisos

SHIPPING.READ

SHIPPING.CREATE

SHIPPING.UPDATE

---

# 14. Mensajes

Despacho registrado.

Seguimiento actualizado.

Pedido entregado.

---

# 15. Criterios de Aceptación

Todo envío deberá mantener trazabilidad completa.

---

# 16. Casos de Prueba

Crear envío.

Actualizar estado.

Registrar entrega.

Consultar seguimiento.

---

# 17. Dependencias

Consume

OMS

CRM

Master Data

Produce

Analytics

---

# 18. Observaciones

Shipping administra exclusivamente la operación logística.

No modifica pagos ni inventario.