# MIGRACIÓN DE CRM CLIENTES — REAL API

## Integración del Módulo de Clientes CRM (`/crm/clientes`)

Se migró la vista `ClientList.jsx` para consumir el endpoint real de la API NestJS `GET /api/v1/crm/clients`.

---

## Cambios Realizados

1. **Eliminación de Mocks**:
   - Se removió el arreglo estático `clients` con 5 empresas ficticias.

2. **Integración con Zustand Store (`useClientsStore`)**:
   - `ClientList.jsx` consume `clients`, `meta`, `loading`, `error` y `fetchAll` desde `useClientsStore`.
   - Soporta filtro de búsqueda en tiempo real `q` y paginación.

3. **Mappers y Modelos de Dominio**:
   - `crmRepository.getClients` ejecuta `mapClients`, transformando la respuesta en objetos `createClient`.

4. **Estados de UI Implementados**:
   - **Loading**: Animación de carga durante peticiones HTTP.
   - **Error**: Alerta de fallo en consulta API.
   - **Empty State**: Mensaje limpio cuando no hay clientes en la DB o sin coincidencias de búsqueda.
   - **Success Table**: Renderizado de nombre, empresa, email, teléfono, tipo de cliente y badge de estado.
