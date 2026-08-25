# CREACIÓN DE PRODUCTOS (POST) — REAL API

## Integración del Formulario de Productos (`/catalog/productos/nuevo`)

Se migró `ProductCreate.jsx` para procesar altas reales de productos contra `POST /api/v1/products`.

---

## Cambios Realizados

1. **Captura de Campos del Formulario**:
   - `name`, `sku`, `price`, `stock`, `categoryId`, `description`.

2. **Invocación al Repositorio**:
   - `catalogRepository.createProduct(payload)` envía el DTO sanitizado a la API REST NestJS.

3. **Respuesta y Redirección**:
   - Al recibir la confirmación HTTP 201 Created de PostgreSQL, el sistema redirige automáticamente a la lista `/catalog/productos`.
