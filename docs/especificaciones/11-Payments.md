# Especificación Funcional

# Volumen V

# Parte XII

# Payments

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

Administrar el procesamiento de pagos del comercio electrónico mediante la integración con Stripe.

El módulo Payments será responsable de validar, registrar y controlar el estado financiero de cada pedido.

No almacenará información sensible de tarjetas bancarias.

---

# 2. Alcance

Administra

- Intenciones de pago (Payment Intent).
- Confirmación de pagos.
- Reembolsos.
- Estados de pago.
- Métodos de pago.
- Historial de transacciones.
- Webhooks de Stripe.

---

# 3. Actores

Cliente.

Administrador.

Ventas.

Sistema (Stripe).

---

# 4. Interfaces Funcionales

Checkout.

Detalle de Pago.

Historial.

Reembolsos.

Configuración Stripe.

---

# 5. Funcionalidades

Crear Payment Intent.

Confirmar pago.

Registrar Webhooks.

Consultar pagos.

Procesar reembolso.

Consultar historial.

---

# 6. Reglas de Negocio

RN-PAY-001

Todo pago deberá pertenecer a un pedido.

RN-PAY-002

Un pedido únicamente podrá marcarse como pagado cuando Stripe confirme la transacción.

RN-PAY-003

Los datos de tarjetas nunca serán almacenados.

RN-PAY-004

Todo pago deberá registrar su identificador de Stripe.

RN-PAY-005

Los Webhooks deberán validarse mediante firma digital.

RN-PAY-006

Los reembolsos deberán registrarse en Audit.

---

# 7. Validaciones

Pedido existente.

Monto válido.

Pedido pendiente de pago.

Webhook válido.

Firma válida.

---

# 8. Estados

Pendiente.

Procesando.

Pagado.

Fallido.

Reembolsado.

Parcialmente Reembolsado.

Cancelado.

---

# 9. Flujo General

Pedido

↓

Payment Intent

↓

Stripe

↓

Webhook

↓

Confirmación

↓

OMS

---

# 10. Casos de Uso

Crear pago.

Confirmar pago.

Consultar pago.

Procesar reembolso.

Consultar historial.

---

# 11. APIs

POST /api/v1/payments/intents

POST /api/v1/payments/webhook

GET /api/v1/payments

GET /api/v1/payments/{id}

POST /api/v1/payments/{id}/refund

---

# 12. Tablas

payment

payment_method

payment_transaction

payment_refund

payment_webhook

---

# 13. Permisos

PAYMENTS.READ

PAYMENTS.REFUND

PAYMENTS.EXPORT

---

# 14. Mensajes

Pago iniciado.

Pago confirmado.

Pago rechazado.

Reembolso procesado.

---

# 15. Criterios de Aceptación

Todo pago confirmado deberá actualizar automáticamente el estado del pedido.

---

# 16. Casos de Prueba

Pago exitoso.

Pago rechazado.

Webhook válido.

Webhook inválido.

Reembolso.

---

# 17. Dependencias

Consume

OMS

Configuration

Audit

Stripe

Produce

Shipping

Analytics

---

# 18. Observaciones

Payments administra únicamente las transacciones financieras.

Toda la lógica bancaria será delegada a Stripe.