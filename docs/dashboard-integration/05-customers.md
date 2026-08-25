# Dashboard Integration — Customers

> **Módulo CRM: Clientes, Notas**

---

## Endpoints

| Método | Endpoint | Repository | Service | Hook |
|--------|----------|------------|---------|------|
| GET | /crm/clients | `crmRepository.getClients(q)` | `CrmService.getClients(q)` | `useClients(q)` |
| GET | /crm/clients/:id | `crmRepository.getClient(id)` | `CrmService.getClient(id)` | — |
| POST | /crm/clients | `crmRepository.createClient(d)` | `CrmService.createClient(d)` | — |
| PUT | /crm/clients/:id | `crmRepository.updateClient(id,d)` | `CrmService.updateClient(id,d)` | — |

## Estado

| Página | Mock | Hook Disponible | Migrado |
|--------|------|----------------|---------|
| CrmDashboard | inline KPIs | `useClients()` | ❌ |
| ClientList | inline clients | `useClients()` | ❌ |
| ClientCreate | inline form | — | ❌ |
| ClientProfile | inline profile | — | ❌ |
