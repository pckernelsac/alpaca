# ERRORES DEL BACKEND — TIENDA

## Monitoreo de Logs en Servidor NestJS

### 1. Logs Registrados por Flujo de Tienda

| Flujo / Acción | Endpoint Backend | Log Servidor NestJS | Resultado Backend |
|----------------|------------------|---------------------|-------------------|
| Login Customer | `POST /api/v1/auth/customer/login` | `POST /api/v1/auth/customer/login 200 OK` | **PASS** |
| Registro Customer | `POST /api/v1/auth/register` | `POST /api/v1/auth/register 201 Created` | **PASS** |
| Detalle de Producto | `GET /api/v1/products/:id` | `GET /api/v1/products/ALP-001 200 OK` | **PASS** |
| Carrito Sync | `POST /api/v1/account/cart/items` | `POST /api/v1/account/cart/items 200 OK` | **PASS** |
| Validar Cupón | `POST /api/v1/coupons/validate` | `POST /api/v1/coupons/validate 200 OK` | **PASS** |
| Intent de Pago | `POST /api/v1/create-payment-intent` | `POST /api/v1/create-payment-intent 200 OK` | **PASS** |
| Checkout Orden | `POST /api/v1/checkout` | `POST /api/v1/checkout 200 OK` | **PASS** |
| Historial Pedidos | `GET /api/v1/orders` | `GET /api/v1/orders 200 OK` | **PASS** |

---

## 2. Excepciones o Fallos Registrados
- **Sin Excepciones 500 de Servidor**: NestJS procesó correctamente las solicitudes validadas con `class-validator` y `class-transformer`.
- **Base de Datos y Redis**: Las transacciones PostgreSQL Sequelize se ejecutaron sin violaciones de integridad ni deadlocks.
- **Fail-Open de Redis**: Sin afectación ante indisponibilidad del servicio de caché.
