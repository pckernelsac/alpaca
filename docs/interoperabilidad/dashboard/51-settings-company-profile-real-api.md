# INTEGRACIÓN DE CONFIGURACIÓN Y PERFIL DE USUARIO — REAL API

## Migración de Empresa (`/settings`) y Mi Perfil (`/mi-perfil`)

Se conectaron los ajustes globales de la organización y el perfil de sesión a las APIs backend.

---

## Cambios Realizados

1. **Configuración de Empresa (`Settings.jsx`)**:
   - Conectado a `settingsRepository.getCompany` y `updateCompany` ➔ `GET/PUT /api/v1/settings/company`.
   - Carga y edita la Razón Social, RUC, moneda principal y datos de contacto.

2. **Mi Perfil de Usuario (`MyProfile.jsx`)**:
   - Conectado a `authRepository.getProfile` ➔ `GET /api/v1/auth/me`.
   - Renderiza la información del usuario Staff autenticado mediante JWT.
