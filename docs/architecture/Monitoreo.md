# Arquitectura del Software

# Volumen IV

# Parte XII

# Monitoreo y Observabilidad

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la estrategia de monitoreo y observabilidad del sistema Alpacart ERP desplegado sobre un único VPS de Contabo.

El objetivo es supervisar continuamente la disponibilidad, rendimiento y estado de los componentes del sistema para detectar problemas de manera temprana y facilitar su diagnóstico.

---

# 2. Objetivos

El monitoreo deberá permitir:

- Detectar fallos.
- Supervisar el rendimiento.
- Revisar el estado de los servicios.
- Analizar registros (Logs).
- Facilitar el diagnóstico.
- Verificar disponibilidad.

---

# 3. Componentes Monitoreados

Infraestructura

- VPS Contabo
- Ubuntu Server

Servicios

- Docker
- Nginx
- Backend NestJS
- PostgreSQL
- Frontend Institucional
- Frontend Tienda
- Dashboard ERP

---

# 4. Recursos del Servidor

Se supervisará

CPU

RAM

Swap

Disco

Uso de Inodos

Carga del sistema

Tiempo de actividad (Uptime)

---

# 5. Estado de Contenedores

Cada contenedor deberá monitorearse.

- nginx
- backend
- postgres
- web
- store
- dashboard

Información registrada

Estado

Tiempo activo

Reinicios

Uso de CPU

Uso de memoria

---

# 6. Monitoreo del Backend

Se registrará

Cantidad de peticiones

Tiempo promedio de respuesta

Errores HTTP

Errores internos

Excepciones

Tiempo de respuesta por endpoint

---

# 7. Monitoreo PostgreSQL

Indicadores

Conexiones activas

Consultas lentas

Uso de almacenamiento

Tamaño de Base de Datos

Tiempo promedio de consultas

Disponibilidad

---

# 8. Monitoreo Nginx

Se registrará

Peticiones

Errores

Código HTTP

Tiempo de respuesta

Direcciones IP

Archivos solicitados

---

# 9. Monitoreo de Frontends

Disponibilidad

Tiempo de carga

Errores JavaScript

Estado de compilación

Disponibilidad HTTP

---

# 10. Logs

Los registros estarán organizados por servicio.

```text
logs/

backend/

nginx/

postgres/

docker/

application/
```

Cada servicio tendrá su propio archivo de registro.

---

# 11. Health Checks

Todos los servicios expondrán un endpoint de verificación.

Backend

```
GET /api/v1/health
```

Respuesta esperada

```json
{
    "status": "UP",
    "timestamp": "2026-07-03T18:00:00Z"
}
```

---

# 12. Indicadores Clave

Backend

- Disponible
- No disponible

Base de Datos

- Disponible
- No disponible

Nginx

- Disponible
- No disponible

Docker

- Contenedores activos

Disco

- Espacio libre

---

# 13. Frecuencia de Revisión

CPU

Cada minuto

RAM

Cada minuto

Disco

Cada 5 minutos

Servicios

Cada minuto

Base de Datos

Cada minuto

---

# 14. Registro de Errores

Todo error crítico registrará

Fecha

Servicio

Nivel

Descripción

Stack Trace

Usuario (si aplica)

---

# 15. Procedimiento de Diagnóstico

1.

Verificar estado del VPS.

↓

2.

Verificar Docker.

↓

3.

Verificar Contenedores.

↓

4.

Verificar Backend.

↓

5.

Verificar PostgreSQL.

↓

6.

Revisar Logs.

↓

7.

Aplicar corrección.

---

# 16. Disponibilidad Esperada

Backend

99%

Frontend

99%

Base de Datos

99%

Nginx

99%

---

# 17. Mantenimiento

Revisar semanalmente

- Uso del disco.
- Estado de Docker.
- Logs.
- Espacio de PostgreSQL.
- Actualizaciones de seguridad.

---

# 18. Buenas Prácticas

- No eliminar logs recientes.
- Rotar archivos de registro.
- Supervisar el crecimiento de PostgreSQL.
- Monitorear el espacio disponible antes de cada despliegue.
- Verificar el estado de los contenedores después de cada actualización.

---

# 19. Resumen

Infraestructura

Contabo VPS

Servicios

6 Contenedores Docker

Base de Datos

PostgreSQL

Servidor Web

Nginx

Monitoreo

CPU, RAM, Disco, Servicios, Logs

Health Check

/api/v1/health

---

# 20. Próximo Documento

El siguiente documento corresponde a la estrategia de Backups y Recuperación, donde se definirán las políticas de respaldo de PostgreSQL, Storage, configuraciones y procedimientos de restauración del sistema.