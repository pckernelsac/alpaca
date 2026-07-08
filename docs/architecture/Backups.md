# Arquitectura del Software

# Volumen IV

# Parte XIII

# Estrategia de Backups y Recuperación

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la estrategia de respaldo, restauración y recuperación del sistema Alpacart ERP.

El objetivo es garantizar la disponibilidad de la información del negocio ante errores humanos, fallos de software, corrupción de datos o problemas de infraestructura.

La estrategia de respaldo cubrirá toda la información crítica del sistema desplegado sobre un único VPS de Contabo.

---

# 2. Objetivos

La estrategia de Backups deberá garantizar:

- Disponibilidad de la información.
- Recuperación rápida.
- Integridad de los datos.
- Automatización de respaldos.
- Conservación de históricos.

---

# 3. Información a Respaldar

Base de Datos

- PostgreSQL

Archivos

- Productos
- Categorías
- Banners
- Documentos
- Imágenes
- CMS

Configuración

- Docker Compose
- Variables de entorno
- Configuración Nginx
- Scripts

Logs

- Backend
- Nginx
- PostgreSQL

---

# 4. Directorio

```text
/opt/alpacart/

backups/

├── database/

├── storage/

├── configs/

├── logs/

└── restore/
```

---

# 5. Base de Datos

Método

pg_dump

Formato

Custom

Compresión

gzip

Frecuencia

Diaria

Hora

02:00 AM

---

# 6. Storage

Se respaldará

products/

categories/

pages/

banners/

documents/

users/

Frecuencia

Diaria

---

# 7. Configuración

Archivos incluidos

docker-compose.yml

Dockerfiles

.env.production

nginx.conf

conf.d

scripts

Frecuencia

Diaria

---

# 8. Retención

Respaldos diarios

7 días

Respaldos semanales

4 semanas

Respaldos mensuales

12 meses

Los respaldos antiguos serán eliminados automáticamente según esta política.

---

# 9. Nomenclatura

Formato

```text
backup-AAAA-MM-DD-HHMM
```

Ejemplo

```text
backup-2026-07-03-0200
```

---

# 10. Automatización

Los respaldos serán ejecutados mediante tareas programadas (cron).

Procesos

- Backup PostgreSQL
- Backup Storage
- Backup Configuración
- Limpieza de respaldos antiguos

---

# 11. Restauración

La restauración podrá realizarse de forma independiente para:

Base de Datos

Storage

Configuración

o recuperación completa del sistema.

---

# 12. Procedimiento de Restauración

1.

Detener los servicios afectados.

↓

2.

Seleccionar el respaldo.

↓

3.

Restaurar la información.

↓

4.

Validar integridad.

↓

5.

Levantar nuevamente los servicios.

---

# 13. Verificación

Después de cada respaldo deberá verificarse:

- Archivo generado.
- Tamaño válido.
- Integridad del respaldo.
- Fecha de creación.
- Resultado del proceso.

---

# 14. Recuperación

Escenarios contemplados

- Eliminación accidental.
- Corrupción de Base de Datos.
- Daño de archivos.
- Error durante despliegue.
- Fallo del VPS.

---

# 15. Procedimientos

Base de Datos

Restauración mediante

pg_restore

Storage

Copia directa de archivos.

Configuración

Reposición desde respaldo.

---

# 16. Registro

Cada respaldo registrará

Fecha

Hora

Tipo

Duración

Resultado

Tamaño

Usuario que ejecutó (si aplica)

---

# 17. Buenas Prácticas

- Nunca sobrescribir un respaldo existente.
- Verificar periódicamente que los respaldos puedan restaurarse.
- Mantener separados los respaldos de Base de Datos y Storage.
- Registrar todas las operaciones de respaldo y restauración.
- Automatizar la limpieza de respaldos vencidos.

---

# 18. Resumen

Base de Datos

PostgreSQL

Método

pg_dump

Frecuencia

Diaria

Storage

Diario

Configuración

Diaria

Automatización

Cron

Retención

Diaria, Semanal y Mensual

---

# 19. Próximo Documento

El siguiente documento corresponde a la estrategia de Escalabilidad, donde se definirá cómo evolucionará la infraestructura del sistema a medida que aumenten el número de usuarios, productos y operaciones, manteniendo la compatibilidad con la arquitectura actual basada en un VPS de Contabo.