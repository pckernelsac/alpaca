# Arquitectura del Software

# Volumen IV

# Parte VI

# Comunicación Frontend ↔ Backend

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define el modelo de comunicación entre las aplicaciones Frontend y el Backend del sistema Alpacart ERP.

El propósito es establecer un contrato único para todas las aplicaciones, garantizando consistencia en las peticiones, respuestas, autenticación y manejo de errores.

Todas las aplicaciones consumirán exactamente la misma API REST.

---

# 2. Arquitectura de Comunicación

```text
                INTERNET

                     │

    ┌────────────────┼────────────────┐

    │                │                │

 Página Web      Tienda Online     Dashboard ERP

    │                │                │

    └────────────────┼────────────────┘

                 HTTPS

                   │

             REST API v1

                NestJS

                   │

             PostgreSQL
```

---

# 3. API Base

Todas las aplicaciones consumirán:

```
/api/v1
```

Ejemplos

```
GET /api/v1/catalog/products

POST /api/v1/orders

GET /api/v1/customers/profile
```

---

# 4. Versionado

Toda la API será versionada.

Ejemplo

```
/api/v1/

/api/v2/
```

Nunca existirán endpoints sin versión.

---

# 5. Formato de Respuesta

Toda respuesta exitosa utilizará el mismo formato.

```json
{
    "success": true,
    "message": "Operación realizada correctamente.",
    "data": {},
    "timestamp": "2026-07-03T10:00:00Z"
}
```

---

# 6. Respuesta con Paginación

```json
{
    "success": true,
    "message": "Consulta realizada correctamente.",
    "data": [],
    "pagination": {
        "page": 1,
        "limit": 20,
        "total": 560,
        "totalPages": 28
    },
    "timestamp": "2026-07-03T10:00:00Z"
}
```

---

# 7. Respuesta de Error

```json
{
    "success": false,
    "statusCode": 400,
    "message": "La solicitud contiene errores.",
    "errors": [
        {
            "field": "correo",
            "message": "El correo ya existe."
        }
    ],
    "timestamp": "2026-07-03T10:00:00Z"
}
```

---

# 8. Métodos HTTP

GET

Consultar recursos.

POST

Crear recursos.

PUT

Actualizar completamente.

PATCH

Actualizar parcialmente.

DELETE

Eliminación lógica.

---

# 9. Parámetros de Consulta

Filtros

```
?search=alpaca
```

Ordenamiento

```
?sort=nombre
```

Orden descendente

```
?order=desc
```

Paginación

```
?page=1

&limit=20
```

Filtros múltiples

```
?estado=ACTIVO

&categoria=3

&coleccion=5
```

---

# 10. Autenticación

Header

```
Authorization

Bearer JWT
```

Ejemplo

```
Authorization: Bearer eyJhbG...
```

---

# 11. Refresh Token

Cuando el Access Token expire:

↓

Frontend solicita Refresh.

↓

Backend valida.

↓

Nuevo Access Token.

↓

Continuar sesión.

---

# 12. Códigos HTTP

200

OK

201

Created

204

No Content

400

Bad Request

401

Unauthorized

403

Forbidden

404

Not Found

409

Conflict

422

Validation Error

500

Internal Server Error

---

# 13. Subida de Archivos

Todos los archivos serán enviados mediante:

```
multipart/form-data
```

Nunca Base64.

---

Ejemplo

```
POST

/api/v1/storage/upload
```

Respuesta

```
asset_id
```

Los demás módulos utilizarán únicamente el asset_id.

---

# 14. Descarga de Archivos

Siempre mediante Storage.

Ejemplo

```
GET

/api/v1/storage/assets/{id}
```

---

# 15. Convenciones REST

Plural

```
/products

/orders

/customers
```

Nunca verbos.

Incorrecto

```
/createProduct

/deleteOrder
```

Correcto

```
POST /products

DELETE /orders/{id}
```

---

# 16. Timeouts

Lecturas

30 segundos

Uploads

120 segundos

Exportaciones

300 segundos

---

# 17. Cache

Catálogo

Cache permitido.

CMS

Cache permitido.

Configuración

Cache permitido.

Pedidos

No cache.

Pagos

No cache.

Usuarios

No cache.

---

# 18. Idempotencia

Las operaciones críticas deberán soportar idempotencia.

Ejemplos

Pagos

Reembolsos

Creación de pedidos

Webhooks Stripe

---

# 19. Rate Limiting

Endpoints públicos

100 solicitudes/minuto

Endpoints autenticados

300 solicitudes/minuto

Login

5 intentos/minuto

---

# 20. Logging

Toda petición registrará:

- Usuario
- Método HTTP
- Endpoint
- Tiempo de respuesta
- Código HTTP
- Dirección IP

---

# 21. Integración por Frontend

Página Institucional

Consume

- CMS
- Catalog
- Marketing
- Configuration

---

Tienda

Consume

- Catalog
- CRM
- OMS
- Payments
- Shipping
- CMS
- Marketing

---

Dashboard ERP

Consume

Todos los módulos.

---

# 22. Reglas

- Toda comunicación será HTTPS.
- Nunca acceder directamente a PostgreSQL.
- Nunca exponer información sensible.
- Toda respuesta seguirá el formato estándar.
- Toda API deberá documentarse en Swagger.

---

# 23. Resumen

Comunicación

HTTPS

Protocolo

REST

Formato

JSON

Autenticación

JWT

Uploads

multipart/form-data

Versión

/api/v1

Documentación

Swagger

---

# 24. Próximo Documento

El siguiente documento corresponde al modelo de Seguridad del sistema, donde se definirán autenticación, autorización, protección de datos, control de acceso, políticas de contraseñas, sesiones, cifrado y medidas de seguridad para toda la plataforma.