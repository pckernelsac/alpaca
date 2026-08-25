# Dashboard Integration — Settings

> **Módulo Configuración: Empresa, Ajustes**

---

## Endpoints

| Método | Endpoint | Repository | Service | Hook |
|--------|----------|------------|---------|------|
| GET | /settings/company | `settingsRepository.getCompany()` | `SettingsService.getCompany()` | `useSettings()` |
| PUT | /settings/company | `settingsRepository.updateCompany(d)` | `SettingsService.updateCompany(d)` | — |

## Estado

| Página | Mock | Hook Disponible | Migrado |
|--------|------|----------------|---------|
| Settings | inline localization data | `useSettings()` | ❌ |
