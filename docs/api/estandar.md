# API Contract

# Volumen VI

# Parte I

# Estándares de la API

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

Este documento define los estándares de diseño que deberán cumplir todas las APIs REST del sistema Alpacart ERP.

El propósito es garantizar uniformidad, mantenibilidad y consistencia entre todos los módulos del Backend.

Todas las APIs implementadas en NestJS deberán respetar estas convenciones.

---

# 2. Arquitectura

Cliente

↓

React

↓

HTTPS

↓

REST API

↓

NestJS

↓

PostgreSQL

---

# 3. Base URL

Producción

```
https://api.empresa.pe/api/v1
```

Desarrollo

```
http://localhost:3000/api/v1
```

---

# 4. Versionado

Todas las APIs deberán incluir versión.

Ejemplo

```
/api/v1

/api/v2
```

Nunca existirán endpoints sin versión.

---

# 5. Formato JSON

Toda respuesta deberá utilizar JSON.

---

Respuesta Exitosa

```json
{
    "success": true,
    "message": "Operación realizada correctamente.",
    "data": {},
    "timestamp": "2026-01-01T00:00:00Z"
}
```

---

Respuesta con Paginación

```json
{
  "success": true,
  "message": "Consulta realizada correctamente.",
  "data": [],
  "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
  }
}
```

---

Respuesta de Error

```json
{
  "success": false,
  "message": "La operación no pudo completarse.",
  "errors": []
}
```

---

# 6. Métodos HTTP

GET

Consultar.

POST

Crear.

PATCH

Actualizar parcialmente.

PUT

Actualizar completamente.

DELETE

Eliminación lógica.

---

# 7. Convenciones REST

Plural

```
/products
```

Nunca

```
/createProduct
```

Siempre

```
POST /products
```

---

# 8. Paginación

Parámetros

page

limit

Ejemplo

```
?page=1&limit=20
```

---

# 9. Ordenamiento

```
sort=name

order=asc
```

---

# 10. Búsquedas

```
search=camisa
```

---

# 11. Filtros

```
status=ACTIVE

category=5

brand=2
```

---

# 12. Autenticación

Bearer Token

```
Authorization

Bearer JWT
```

---

# 13. Códigos HTTP

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error

---

# 14. Errores

Todos los errores deberán seguir la misma estructura.

```json
{
    "success": false,
    "statusCode": 422,
    "message": "Validation Error",
    "errors": [
        {
            "field":"email",
            "message":"Correo inválido"
        }
    ]
}
```

---

# 15. Auditoría

Toda operación crítica deberá registrar:

Usuario

IP

Endpoint

Fecha

Resultado

---

# 16. Swagger

Todas las APIs deberán documentarse mediante Swagger OpenAPI 3.

La documentación deberá generarse automáticamente desde NestJS.

No se mantendrán documentos duplicados de Swagger.

---

# 17. Seguridad

JWT

HTTPS

Helmet

Rate Limit

CORS

DTO Validation

---

# 18. Convenciones de DTO

Todos los DTO deberán terminar con:

CreateXXXXDto

UpdateXXXXDto

ResponseXXXXDto

SearchXXXXDto

---

# 19. Convenciones de Controller

Ejemplo

ProductController

OrderController

CustomerController

Nunca

ControllerProduct

---

# 20. Convenciones de Service

ProductService

OrderService

CustomerService

---

# 21. Convenciones Repository

ProductRepository

OrderRepository

CustomerRepository

---

# 22. Convenciones Module

ProductModule

OrderModule

CustomerModule

---

# 23. Convenciones Entity

ProductEntity

CustomerEntity

OrderEntity

---

# 24. Próximo Documento

El siguiente documento define el contrato API del módulo IAM.