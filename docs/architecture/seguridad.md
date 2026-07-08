# Arquitectura del Software

# Volumen IV

# Parte VII

# Arquitectura de Seguridad

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la arquitectura de seguridad del sistema Alpacart ERP.

Su propósito es proteger la información del negocio, garantizar el acceso únicamente a usuarios autorizados y establecer políticas uniformes para autenticación, autorización, protección de datos y comunicaciones.

Todas las aplicaciones deberán cumplir estas políticas.

---

# 2. Objetivos de Seguridad

El sistema deberá garantizar:

- Confidencialidad
- Integridad
- Disponibilidad
- Autenticidad
- Trazabilidad

---

# 3. Arquitectura General

```text
                Usuarios

                     │

             HTTPS (TLS)

                     │

         React Applications

     ┌────────┬─────────┬────────┐

     │        │         │

 Institucional Tienda Dashboard

     └────────┴─────────┘

              │

          JWT Access

              │

            NestJS

              │

         PostgreSQL
```

---

# 4. Autenticación

El sistema utilizará:

JWT

Access Token

Refresh Token

Contraseñas cifradas mediante:

Argon2id

---

# 5. Tipos de Usuarios

Clientes

Acceso a la Tienda Online.

Usuarios ERP

Acceso al Dashboard.

No compartirán autenticación.

Cada tipo tendrá permisos independientes.

---

# 6. Autorización

La autorización será implementada mediante Roles y Permisos.

Ejemplo

Administrador

Ventas

Marketing

Inventario

Logística

Gerencia

Cada endpoint validará los permisos necesarios.

---

# 7. Control de Acceso

Todo endpoint protegido deberá validar:

- Token válido
- Usuario activo
- Rol activo
- Permiso requerido

---

# 8. Gestión de Contraseñas

Las contraseñas deberán cumplir:

Longitud mínima

12 caracteres

Debe contener

- Mayúsculas
- Minúsculas
- Número
- Carácter especial

Nunca almacenar contraseñas en texto plano.

Siempre Argon2id.

---

# 9. Gestión de Sesiones

El sistema registrará:

Fecha de inicio

Fecha de cierre

Dirección IP

Dispositivo

Navegador

Última actividad

---

# 10. Expiración

Access Token

15 minutos

Refresh Token

30 días

Sesiones inactivas

Expiración automática.

---

# 11. Protección de API

Todas las peticiones utilizarán:

HTTPS

JWT

Rate Limiting

CORS

Helmet

Validaciones DTO

Sanitización

---

# 12. Protección de Datos

Nunca exponer:

- Contraseñas
- Hashes
- API Keys
- Client Secret de Stripe
- Tokens internos

Las respuestas únicamente devolverán la información necesaria.

---

# 13. Gestión de Archivos

Todos los archivos serán validados antes de almacenarse.

Validaciones:

- Tamaño máximo
- MIME Type
- Extensión
- Nombre del archivo

Los archivos privados requerirán autenticación.

---

# 14. Seguridad en Stripe

El Frontend nunca almacenará:

- Tarjetas
- CVV
- Datos bancarios

El procesamiento será realizado mediante Stripe Elements.

Los Webhooks deberán validar la firma enviada por Stripe.

---

# 15. Auditoría

Todas las acciones críticas generarán registros en el módulo Audit.

Ejemplos

Inicio de sesión

Cambio de contraseña

Creación de usuarios

Cambios de configuración

Pagos

Reembolsos

Eliminaciones

Exportaciones

---

# 16. Validaciones

Toda entrada deberá validarse mediante DTO.

Nunca confiar en datos enviados desde el Frontend.

Toda validación crítica será realizada por el Backend.

---

# 17. CORS

Solo se permitirán dominios autorizados.

Ejemplo

Página Institucional

Tienda

Dashboard

No permitir origen "*".

---

# 18. Headers de Seguridad

El Backend enviará:

- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Strict-Transport-Security

---

# 19. Rate Limiting

Login

5 intentos por minuto.

Registro

10 solicitudes por minuto.

API Pública

100 solicitudes por minuto.

API Privada

300 solicitudes por minuto.

---

# 20. Respaldo de Credenciales

Las variables sensibles se almacenarán únicamente mediante variables de entorno.

Ejemplos

JWT_SECRET

DATABASE_URL

STRIPE_SECRET_KEY

SMTP_PASSWORD

Nunca incluir secretos en el código fuente.

---

# 21. Registro de Incidentes

Todo incidente de seguridad registrará:

- Fecha
- Usuario
- IP
- Acción
- Resultado
- Descripción

La información será enviada al módulo Audit.

---

# 22. Buenas Prácticas

- No exponer información sensible en mensajes de error.
- No reutilizar contraseñas.
- Utilizar HTTPS en todos los entornos.
- Mantener dependencias actualizadas.
- Registrar todos los eventos críticos.

---

# 23. Resumen

Autenticación

JWT

Hash

Argon2id

Transporte

HTTPS

Autorización

Roles y Permisos

Protección API

Helmet + CORS + Rate Limiting

Auditoría

Obligatoria

---

# 24. Próximo Documento

El siguiente documento corresponde a la Infraestructura del sistema, donde se definirá la organización del VPS, Nginx, PostgreSQL, Backend, Frontends, almacenamiento y configuración de producción.