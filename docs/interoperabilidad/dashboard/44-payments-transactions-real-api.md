# INTEGRACIÓN DE TRANSACCIONES DE PAGO — REAL API

## Migración del Módulo de Pagos (`/payments/transactions`)

Se migró `TransactionList.jsx` para consumir el endpoint real NestJS `GET /api/v1/payments/transactions`.

---

## Cambios Realizados

1. **Eliminación de Transacciones Ficticias**:
   - Se descartaron las transacciones de prueba hardcodeadas (`#PAY-9921`, etc.).

2. **Integración con Zustand Store (`usePaymentsStore`)**:
   - Conectado a `usePaymentsStore` (`transactions`, `meta`, `loading`, `error`, `fetchAll`).

3. **Auditoría Financiera Real**:
   - Muestra ID de pago, pedido asociado, método de cobro (Visa, Mastercard, Transferencia), monto, moneda y estado de la transacción.
