# Especificación Funcional

# Volumen V

# Parte X

# Inventory

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

Administrar la existencia física de cada variante textil disponible para la venta.

Inventory controla el ciclo completo del stock desde su ingreso hasta su salida, garantizando la trazabilidad de todos los movimientos.

---

# 2. Alcance

Administra

- Almacenes
- Stock
- Kardex
- Ingresos
- Salidas
- Ajustes
- Reservas
- Transferencias
- Inventarios físicos

---

# 3. Actores

Administrador.

Almacén.

Ventas.

Gerencia.

---

# 4. Interfaces

Dashboard Inventario

Kardex

Movimientos

Transferencias

Conteo físico

---

# 5. Funcionalidades

Registrar ingreso.

Registrar salida.

Registrar ajuste.

Consultar stock.

Consultar kardex.

Transferir stock.

Reservar stock.

---

# 6. Reglas de Negocio

RN-INV-001

El stock nunca podrá ser negativo.

RN-INV-002

Todo movimiento deberá quedar registrado.

RN-INV-003

Toda salida deberá disminuir el stock disponible.

RN-INV-004

Toda reserva disminuirá únicamente el stock disponible.

RN-INV-005

Todo movimiento deberá indicar su motivo.

---

# 7. Validaciones

Almacén válido.

Producto existente.

Variante existente.

Cantidad mayor que cero.

Motivo obligatorio.

---

# 8. Estados

Disponible

Reservado

Agotado

Bloqueado

---

# 9. Flujo General

Ingreso

↓

Stock

↓

Reserva

↓

Venta

↓

Salida

↓

Kardex

---

# 10. Casos de Uso

Registrar ingreso.

Registrar salida.

Registrar ajuste.

Consultar stock.

Consultar kardex.

Transferir inventario.

---

# 11. APIs

/api/v1/inventory

/api/v1/inventory/stock

/api/v1/inventory/movements

/api/v1/inventory/kardex

/api/v1/inventory/transfers

---

# 12. Tablas

inventory_warehouse

inventory_stock

inventory_movement

inventory_transfer

inventory_kardex

inventory_reservation

---

# 13. Permisos

INVENTORY.READ

INVENTORY.CREATE

INVENTORY.UPDATE

INVENTORY.ADJUST

---

# 14. Mensajes

Stock actualizado.

Ingreso registrado.

Salida registrada.

Stock insuficiente.

---

# 15. Criterios de Aceptación

Todo movimiento deberá reflejarse inmediatamente en el stock.

---

# 16. Casos de Prueba

Registrar ingreso.

Registrar salida.

Intentar salida superior al stock.

Consultar Kardex.

Realizar transferencia.

---

# 17. Dependencias

Consume

Catalog

Textile

Master Data

Produce

Order Management

Analytics

---

# 18. Observaciones

Inventory administra cantidades físicas.

No administra pedidos ni pagos.