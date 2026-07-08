# Especificación Funcional

# Volumen V

# Parte I

# Especificación Funcional General del Sistema

> Proyecto: Alpacart ERP

Versión: 1.0

Estado: Aprobado

---

# 1. Objetivo

Este documento establece las especificaciones funcionales generales que regirán el comportamiento del sistema Alpacart ERP.

Su finalidad es definir los principios, reglas funcionales, actores, convenciones y criterios comunes que deberán cumplir todos los módulos del sistema durante su desarrollo e implementación.

Las especificaciones particulares de cada módulo se documentarán en las partes siguientes del Volumen V.

---

# 2. Alcance

Las reglas definidas en este documento serán obligatorias para los siguientes módulos:

- IAM
- Storage
- Master Data
- Configuration
- Audit
- CRM
- Catalog
- Textile
- Inventory
- Order Management
- Payments
- Shipping
- CMS
- Marketing
- Analytics

Asimismo, aplicarán a:

- Backend NestJS
- Dashboard ERP
- Tienda Online
- Página Institucional

---

# 3. Objetivos Funcionales

El sistema deberá permitir:

- Administrar la información del negocio.
- Gestionar el catálogo de productos.
- Controlar el inventario.
- Gestionar clientes.
- Procesar pedidos.
- Procesar pagos mediante Stripe.
- Gestionar envíos.
- Administrar contenido institucional.
- Ejecutar campañas comerciales.
- Generar indicadores para la toma de decisiones.

---

# 4. Actores del Sistema

## Visitante

No requiere autenticación.

Puede:

- Navegar por la página institucional.
- Consultar el catálogo público.
- Visualizar promociones.
- Contactar con la empresa.

---

## Cliente

Puede:

- Registrarse.
- Iniciar sesión.
- Recuperar contraseña.
- Gestionar su perfil.
- Administrar direcciones.
- Gestionar favoritos.
- Agregar productos al carrito.
- Realizar pedidos.
- Pagar mediante Stripe.
- Consultar pedidos.
- Consultar el estado de sus envíos.

---

## Usuario ERP

Usuario autenticado del Dashboard.

Dependiendo de sus permisos podrá administrar uno o varios módulos del sistema.

---

## Administrador

Tiene acceso completo al sistema.

Puede administrar usuarios, configuraciones y todos los módulos del ERP.

---

# 5. Principios Funcionales

Todos los módulos deberán cumplir los siguientes principios:

- Consistencia.
- Integridad de la información.
- Trazabilidad.
- Seguridad.
- Auditoría.
- Modularidad.
- Reutilización.

---

# 6. Convenciones Funcionales

Todos los módulos deberán implementar:

- Operaciones CRUD cuando corresponda.
- Eliminación lógica.
- Auditoría de acciones críticas.
- Validación de datos.
- Control de permisos.
- Mensajes consistentes.
- Manejo uniforme de errores.

---

# 7. Ciclo de Vida de la Información

Toda entidad del sistema seguirá el siguiente ciclo:

```text
Crear

↓

Validar

↓

Guardar

↓

Consultar

↓

Actualizar

↓

Desactivar

↓

Archivar (cuando aplique)
```

La eliminación física solo estará permitida para información temporal o técnica.

---

# 8. Reglas Generales de Negocio

RGN-001

Toda entidad deberá poseer un identificador único.

---

RGN-002

Toda modificación deberá registrar usuario, fecha y hora.

---

RGN-003

Las eliminaciones serán lógicas salvo que la naturaleza de la entidad indique lo contrario.

---

RGN-004

Toda acción crítica deberá registrarse en Audit.

---

RGN-005

Toda operación deberá validar permisos antes de ejecutarse.

---

RGN-006

Toda operación deberá validar las reglas del negocio antes de persistir cambios.

---

RGN-007

Ningún módulo accederá directamente a la información privada de otro módulo sin utilizar los servicios definidos para ello.

---

# 9. Estados Generales

Las entidades podrán utilizar uno o varios de los siguientes estados según su naturaleza:

- Activo
- Inactivo
- Borrador
- Publicado
- Pendiente
- Confirmado
- Cancelado
- Finalizado
- Archivado

Cada módulo definirá cuáles aplican.

---

# 10. Flujo General del Sistema

```text
Visitante

↓

Página Web

↓

Tienda

↓

Cliente

↓

Pedido

↓

Pago

↓

Preparación

↓

Envío

↓

Entrega

↓

Postventa

↓

Analytics
```

---

# 11. Convenciones de Validación

Todas las validaciones deberán realizarse en el Backend.

El Frontend implementará validaciones únicamente para mejorar la experiencia del usuario.

Las reglas de negocio nunca dependerán del Frontend.

---

# 12. Convenciones de Mensajes

Todos los módulos utilizarán mensajes consistentes.

Ejemplo:

Éxito

"La operación se realizó correctamente."

Advertencia

"Existen datos pendientes de completar."

Error

"No fue posible completar la operación."

Los mensajes específicos serán definidos por cada módulo.

---

# 13. Criterios Generales de Aceptación

Toda funcionalidad deberá cumplir:

- Reglas de negocio.
- Validaciones.
- Permisos.
- Auditoría.
- Integridad de datos.
- Respuesta correcta de la API.
- Funcionamiento esperado en el Frontend.

Una funcionalidad no podrá considerarse terminada si alguno de estos criterios no se cumple.

---

# 14. Casos de Prueba Generales

Se validará como mínimo:

- Creación de registros.
- Consulta de registros.
- Actualización de registros.
- Eliminación lógica.
- Validaciones obligatorias.
- Control de permisos.
- Auditoría.
- Manejo de errores.

Cada módulo incorporará posteriormente sus propios casos de prueba.

---

# 15. Trazabilidad

Cada funcionalidad deberá mantener la siguiente trazabilidad:

```text
Requisito Funcional

↓

Regla de Negocio

↓

Caso de Uso

↓

API

↓

Base de Datos

↓

Frontend

↓

Caso de Prueba

↓

Resultado
```

Esto permitirá identificar el impacto de cualquier cambio funcional durante el ciclo de vida del proyecto.

---

# 16. Definición de "Funcionalidad Terminada"

Una funcionalidad será considerada terminada únicamente cuando:

- Se encuentre implementada.
- Cumpla las reglas de negocio.
- Pase las pruebas funcionales.
- Pase las pruebas de integración.
- Se encuentre documentada.
- Esté integrada con los demás módulos cuando corresponda.
- Sea aprobada por el responsable funcional.

---

# 17. Entregables del Volumen V

Cada uno de los módulos siguientes deberá documentar:

- Objetivo.
- Alcance.
- Actores.
- Interfaces funcionales.
- Funcionalidades.
- Reglas de negocio.
- Validaciones.
- Estados.
- Flujo general.
- Casos de uso (resumen).
- APIs relacionadas.
- Tablas involucradas.
- Permisos.
- Mensajes.
- Criterios de aceptación.
- Casos generales de prueba.

Todos los módulos seguirán exactamente esta misma estructura para mantener uniformidad en la documentación.

---

# 18. Módulos del Volumen V

Parte II

IAM

Parte III

Storage

Parte IV

Master Data

Parte V

Configuration

Parte VI

Audit

Parte VII

CRM

Parte VIII

Catalog

Parte IX

Textile

Parte X

Inventory

Parte XI

Order Management

Parte XII

Payments

Parte XIII

Shipping

Parte XIV

CMS

Parte XV

Marketing

Parte XVI

Analytics

---

# 19. Cierre del Documento

Este documento establece las reglas funcionales generales del sistema Alpacart ERP.

Las partes siguientes del Volumen V desarrollarán las especificaciones funcionales particulares de cada módulo siguiendo las convenciones aquí definidas, garantizando consistencia entre la documentación, la implementación del Backend, los Frontends y las pruebas funcionales.