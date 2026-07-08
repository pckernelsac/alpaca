# Arquitectura del Software

# Volumen IV

# Parte V

# Frontend Dashboard ERP (React)

> Proyecto: Alpacart ERP

---

# 1. Objetivo

Este documento define la arquitectura del Dashboard ERP del sistema Alpacart ERP.

El Dashboard ERP será la aplicación utilizada por el personal autorizado para administrar completamente la operación del negocio.

Toda la lógica del negocio permanecerá implementada en el Backend.

El Dashboard únicamente consumirá la API REST.

---

# 2. Objetivos

El Dashboard deberá cumplir los siguientes principios:

- Alta productividad
- Interfaz consistente
- Bajo tiempo de respuesta
- Reutilización de componentes
- Escalabilidad
- Seguridad
- Accesibilidad

---

# 3. Stack Tecnológico

Framework

React

Lenguaje

TypeScript

Build

Vite

Ruteo

React Router

HTTP

Axios

Estado del Servidor

TanStack Query

Estado Global

Zustand

Formularios

React Hook Form

Validaciones

Zod

Estilos

Tailwind CSS

Gráficos

Recharts

Tablas

TanStack Table

Calendario

React Day Picker

Editor

TipTap

---

# 4. Arquitectura

```text
dashboard/

src/

assets/

components/

features/

hooks/

layouts/

pages/

routes/

services/

store/

types/

utils/
```

---

# 5. Organización

```text
src/

assets/

components/

features/

hooks/

layouts/

pages/

routes/

services/

store/

types/

utils/

App.tsx

main.tsx
```

---

# 6. Layouts

DashboardLayout

AuthLayout

ErrorLayout

DashboardLayout contendrá

Header

Sidebar

Breadcrumb

Área de trabajo

Footer

---

# 7. Módulos del Dashboard

Dashboard

IAM

CRM

Catálogo

Textile

Inventario

Pedidos

Pagos

Envíos

CMS

Marketing

Analytics

Configuración

Auditoría

Storage

Master Data

---

# 8. Páginas

Dashboard

Perfil

Configuración

Usuarios

Roles

Permisos

Clientes

Productos

Categorías

Colecciones

Fibras

Inventario

Almacenes

Movimientos

Pedidos

Pagos

Envíos

CMS

Marketing

Analytics

Auditoría

Storage

Master Data

404

403

---

# 9. Componentes Globales

Header

Sidebar

Breadcrumb

DataTable

SearchBar

Filters

Pagination

Modal

Drawer

Tabs

Card

StatCard

Widget

Chart

Calendar

Editor

Upload

Gallery

ConfirmDialog

Notification

Toast

Loader

EmptyState

ErrorState

---

# 10. Organización por Features

```text
features/

dashboard/

iam/

crm/

catalog/

textile/

inventory/

orders/

payments/

shipping/

cms/

marketing/

analytics/

configuration/

audit/

storage/

master-data/
```

Cada Feature será independiente.

---

# 11. Estado Global

Zustand administrará

Usuario autenticado

Permisos

Sidebar

Preferencias

Tema

Filtros persistentes

Toda la información remota será administrada mediante TanStack Query.

---

# 12. Rutas

```text
/dashboard

/dashboard/usuarios

/dashboard/roles

/dashboard/permisos

/dashboard/clientes

/dashboard/productos

/dashboard/categorias

/dashboard/colecciones

/dashboard/fibras

/dashboard/inventario

/dashboard/almacenes

/dashboard/movimientos

/dashboard/pedidos

/dashboard/pagos

/dashboard/envios

/dashboard/cms

/dashboard/marketing

/dashboard/reportes

/dashboard/analytics

/dashboard/storage

/dashboard/auditoria

/dashboard/configuracion
```

---

# 13. Consumo de API

IAM

Usuarios

Roles

Permisos

CRM

Clientes

Catalog

Productos

Textile

Fibras

Inventory

Stock

OMS

Pedidos

Payments

Pagos

Shipping

Envíos

CMS

Contenido

Marketing

Campañas

Analytics

Indicadores

Configuration

Configuración

Storage

Archivos

Audit

Bitácora

Master Data

Catálogos

---

# 14. CRUD Empresarial

Todos los módulos utilizarán la misma estructura visual.

Listado

↓

Filtros

↓

Crear

↓

Editar

↓

Eliminar (lógico)

↓

Detalle

↓

Historial

Esto garantizará consistencia en toda la aplicación.

---

# 15. Tablas

Todas las tablas compartirán:

Búsqueda

Filtros

Ordenamiento

Paginación

Columnas configurables

Exportación

Acciones rápidas

Selección múltiple

---

# 16. Formularios

Todos los formularios deberán:

Validar en tiempo real.

Validar antes del envío.

Mostrar errores de Backend.

Permitir guardar borradores cuando aplique.

---

# 17. Gestión de Archivos

Todos los uploads utilizarán el módulo Storage.

No se enviarán archivos directamente a otros módulos.

---

# 18. Dashboard Ejecutivo

El Dashboard inicial mostrará:

Ventas del día

Pedidos pendientes

Pedidos entregados

Ventas mensuales

Clientes nuevos

Productos más vendidos

Productos sin stock

Campañas activas

Ingresos

Últimos pedidos

Actividad reciente

---

# 19. Responsive

Desktop

Laptop

Tablet

El uso en dispositivos móviles será limitado a consultas y tareas básicas.

---

# 20. Seguridad

Autenticación JWT.

Control de acceso mediante Roles y Permisos.

Menú dinámico según permisos.

Protección de rutas.

Renovación automática del token.

Cierre automático por expiración de sesión.

---

# 21. Convenciones

Componentes

PascalCase

Hooks

camelCase

Servicios

camelCase

Rutas

kebab-case

---

# 22. Dependencias

Consume todos los módulos del Backend.

IAM

Storage

Master Data

Configuration

Audit

CRM

Catalog

Textile

Inventory

OMS

Payments

Shipping

CMS

Marketing

Analytics

---

# 23. Resumen

Framework

React

Build

Vite

Lenguaje

TypeScript

Estado Global

Zustand

Estado Servidor

TanStack Query

Tablas

TanStack Table

Gráficos

Recharts

Autenticación

JWT

Responsive

Desktop / Tablet

---

# 24. Próximo Documento

El siguiente documento corresponde a la comunicación entre Frontends y Backend, donde se definirán los contratos de la API, autenticación, manejo de errores, respuestas estándar, versionado, consumo de archivos y convenciones de integración.