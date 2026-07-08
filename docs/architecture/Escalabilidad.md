# Arquitectura del Software

# Volumen IV

# Parte XIV

# Estrategia de Escalabilidad

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la estrategia de escalabilidad del sistema Alpacart ERP.

El propósito es garantizar que la arquitectura pueda soportar el crecimiento del negocio sin modificar la lógica del software ni la estructura general del sistema.

La primera etapa del proyecto será ejecutada sobre un único VPS de Contabo.

---

# 2. Objetivos

La estrategia deberá permitir:

- Incrementar usuarios.
- Incrementar productos.
- Incrementar pedidos.
- Incrementar tráfico.
- Mantener disponibilidad.
- Reducir tiempos de respuesta.

---

# 3. Estrategia Inicial

Infraestructura

Un VPS Contabo.

Todos los servicios se ejecutarán mediante Docker Compose.

Todos los componentes compartirán el mismo servidor.

---

# 4. Escalabilidad Vertical

La primera estrategia será aumentar los recursos del VPS.

Ejemplos

Incrementar

CPU

RAM

Disco SSD

Esta operación no requiere modificar el software.

---

# 5. Crecimiento Esperado

Etapa 1

Empresa iniciando operaciones.

Hasta

10 000 productos.

5 000 clientes.

300 pedidos diarios.

---

Etapa 2

Empresa consolidada.

Hasta

50 000 productos.

30 000 clientes.

1 000 pedidos diarios.

Requerirá únicamente ampliar recursos del VPS.

---

Etapa 3

Empresa en expansión.

Más de

100 000 productos.

100 000 clientes.

3 000 pedidos diarios.

Podrá evaluarse separar algunos servicios sin modificar la arquitectura lógica.

---

# 6. Backend

El Backend fue diseñado para ser completamente desacoplado.

Cada módulo podrá evolucionar independientemente.

No será necesario modificar la API REST.

---

# 7. PostgreSQL

La Base de Datos podrá crecer mediante:

Mayor almacenamiento.

Mayor memoria.

Optimización de índices.

Optimización de consultas.

Vacuum periódico.

Reindexación.

---

# 8. Frontends

Los tres Frontends son independientes.

Página Institucional.

Tienda.

Dashboard ERP.

Cada uno podrá compilarse y desplegarse sin afectar a los demás.

---

# 9. Docker

Docker Compose permitirá:

Actualizar un contenedor.

Reiniciar un servicio.

Agregar nuevos servicios internos.

Sin detener toda la plataforma.

---

# 10. Código

El sistema seguirá principios de:

SOLID

DDD

Clean Architecture

Repository Pattern

Dependency Injection

Esto facilitará la incorporación de nuevas funcionalidades.

---

# 11. Base de Datos

Las migraciones permitirán:

Agregar tablas.

Agregar columnas.

Agregar índices.

Sin perder información existente.

---

# 12. Catálogo

El crecimiento del catálogo no requerirá cambios estructurales.

Será posible agregar:

Nuevas categorías.

Nuevas colecciones.

Nuevos productos.

Nuevas variantes.

Nuevos SKU.

Sin modificar la arquitectura.

---

# 13. CMS

El CMS permitirá crear nuevas páginas y contenido sin modificar el código fuente.

---

# 14. Analytics

Los nuevos indicadores podrán agregarse mediante nuevas consultas y reportes sin modificar el resto de módulos.

---

# 15. Seguridad

La arquitectura permitirá incorporar:

Nuevos roles.

Nuevos permisos.

Nuevas políticas.

Sin afectar el resto del sistema.

---

# 16. Mantenimiento

Las actualizaciones podrán realizarse por módulo.

Ejemplo

Actualizar únicamente:

Backend.

Dashboard.

CMS.

Marketing.

Sin reinstalar toda la plataforma.

---

# 17. Limitaciones Iniciales

La primera etapa dependerá de:

Un único VPS.

Una única Base de Datos.

Un único servidor.

Estas limitaciones son aceptables para el volumen esperado del proyecto.

---

# 18. Evolución Futura

En caso de crecimiento del negocio podrá evaluarse:

Separar PostgreSQL.

Separar Backend.

Separar Frontends.

Agregar servicios especializados.

Estas decisiones no requerirán rediseñar el software.

---

# 19. Buenas Prácticas

- Mantener actualizado el sistema operativo.
- Supervisar el consumo de recursos.
- Optimizar consultas SQL.
- Revisar índices periódicamente.
- Realizar mantenimiento preventivo.

---

# 20. Resumen

Infraestructura Inicial

1 VPS Contabo

Escalabilidad

Vertical

Backend

Modular

Base de Datos

PostgreSQL

Frontends

3 Aplicaciones React

Arquitectura

Preparada para crecer

---

# 21. Próximo Documento

El siguiente documento corresponde al Roadmap Técnico del proyecto, donde se definirá el orden recomendado para el desarrollo, integración, pruebas, despliegue y puesta en producción de Alpacart ERP.