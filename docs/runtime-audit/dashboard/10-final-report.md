# INFORME FINAL DE AUDITORÍA — DASHBOARD FRONTEND

## ALPACART — DASHBOARD RUNTIME AUDIT COMPLETE

---

## 1. RESUMEN EJECUTIVO

Se completó la auditoría técnica de integración en tiempo de ejecución del **Frontend Dashboard** (`frontend/dashboard`) contra el **Backend REST API** (`backend`).

La auditoría determinó que, aunque la arquitectura base (API Client, Endpoints, Repositorios, Zustand Stores y Domain Mappers) existe en la estructura de archivos, **los componentes React de las pantallas no están conectados a los stores ni a la API backend**. Todas las pantallas (a excepción del login) consumen arreglos y objetos hardcodeados en memoria.

---

## 2. MATRIZ DE AUDITORÍA DE PANTALLAS

| Pantalla | API Real | Mock | Console | Backend | HTTP | Estado |
| -------- | -------- | ---- | ------- | ------- | ---- | ------ |
| `/login` (Login Staff) | Sí | No | Clean | Log Auth 200/401 | 200 / 401 | **PASS** |
| `/` (Panel Ejecutivo) | No | Sí (`dashboardData.js`) | Warning Preview | No Requests | N/A | **FAIL (MOCK)** |
| `/catalog` (Catalog Dashboard) | No | Sí (Estático) | Warning Preview | No Requests | N/A | **FAIL (MOCK)** |
| `/catalog/productos` (Lista Productos) | No | Sí (8 ítems inline) | Warning Preview | No Requests | N/A | **FAIL (MOCK)** |
| `/catalog/productos/nuevo` (Crear Producto) | No | Sí (Form local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/catalog/productos/multimedia` (Product Media) | No | Sí (Form local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/catalog/variantes` (Lista Variantes) | No | Sí (Datos local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/catalog/variantes/nueva` (Crear Variante) | No | Sí (Form local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/orders` (Orders Dashboard) | No | Sí (Estático) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/orders/list` (Lista Pedidos) | No | Sí (8 pedidos inline) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/pedidos/detalle` (Detalle Pedido) | No | Sí (Datos local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/pedidos/seguimiento` (Timeline Pedido) | No | Sí (Datos local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/crm` (CRM Dashboard) | No | Sí (Estático) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/crm/clientes` (Lista Clientes) | No | Sí (Clientes inline) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/crm/clientes/nuevo` (Nuevo Cliente) | No | Sí (Form local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/crm/clientes/perfil` (Perfil Cliente) | No | Sí (Perfil local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/payments` (Payment Dashboard) | No | Sí (Estático) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/payments/transactions` (Transacciones) | No | Sí (Trans. inline) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/inventory` (Inventory Dashboard) | No | Sí (Estático) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/inventory/stock` (Lista Stock) | No | Sí (Stock inline) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/inventory/kardex` (Kardex) | No | Sí (Kardex local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/inventory/movements` (Movimientos) | No | Sí (Movs. local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/logistics` (Logistics Dashboard) | No | Sí (Estático) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/logistics/envios` (Lista Envíos) | No | Sí (Envíos inline) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/marketing` (Marketing Dashboard) | No | Sí (Estático) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/marketing/campanas` (Lista Campañas) | No | Sí (Campañas inline) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/cms` (CMS Dashboard) | No | Sí (Estático) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/cms/contenido` (Contenido CMS) | No | Sí (Contenido inline) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/textile` (Textile Dashboard) | No | Sí (Estático) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/textile/transferencias` (Transferencias) | No | Sí (Transf. local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/textil/variantes` (Variantes Textiles) | No | Sí (Variantes inline) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/usuarios` (Lista Usuarios) | No | Sí (Usuarios inline) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/usuarios/nuevo` (Nuevo Usuario) | No | Sí (Form local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/usuarios/roles` (Lista Roles) | No | Sí (Roles local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/usuarios/permisos` (Matriz Permisos) | No | Sí (Matriz local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/mi-perfil` (Mi Perfil Staff) | No | Sí (Perfil local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/analytics` (Analytics Executive) | No | Sí (Charts mock) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/audit` (Audit Log) | No | Sí (Logs inline) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/settings` (Configuración Empresa) | No | Sí (Config local) | Clean | No Requests | N/A | **FAIL (MOCK)** |
| `/datos-maestros` (Master Data) | No | Sí (Tablas local) | Clean | No Requests | N/A | **FAIL (MOCK)** |

---

## 3. MÉTRICAS FINALES DE AUDITORÍA

- **Total de rutas auditadas**: 42
- **Total de requests evaluados**: 1
- **Requests PASS**: 1 (`POST /api/v1/auth/login`)
- **Requests FAIL**: 0 (Las pantallas no emiten peticiones HTTP)
- **Errores Console**: 1 warning recurrente (`PreviewProvider` auto-login mock en dev)
- **Errores Backend**: 0 (Sin tráfico incidente en NestJS)
- **Mocks encontrados**: 14 (1 en Auth Preview + 1 en Dashboard executive + 12 arreglos inline en páginas)
- **Stores mock / sin utilizar**: 13 de 13 stores de Zustand en `src/stores/` no son consumidos por la UI.
- **Endpoints sin comunicación**: 35+ (Todos los endpoints de lectura/escritura salvo `/auth/login`)
- **Problemas P0**: 2 (Pistas protegidas desconectadas de APIs + Preview Mode auto-login activo en `.env.development`)
- **Problemas P1**: 2 (Repositorios omiten mappers de dominio + Formularios de escritura no emiten peticiones POST/PUT)
- **Problemas P2**: 1 (Dependencia CDN de fuentes de iconos)

---

## 4. ESTADO FINAL

**DASHBOARD RUNTIME AUDIT COMPLETE**

> **Nota de Cumplimiento de Regla Crítica**: No se aplicó ninguna corrección de código, endpoint ni refactorización durante esta auditoría.
