# Credenciales de Acceso — AlpacaRT

---

## Dashboard Administrativo (Staff)

| Email | Contraseña | Rol |
|-------|-----------|-----|
| `mateo.q@alpacart.com` | `Admin123!` | Super Administrador |
| `sofia.m@alpacart.com` | `Admin123!` | Super Administrador |
| `r.paredes@alpacart.com` | `Admin123!` | Analista Financiero |

URL: `http://localhost:5173` (Dashboard)

---

## Tienda (Customer B2C)

| Email | Contraseña |
|-------|-----------|
| `camila.g@email.com` | `Cliente2024!` |
| `james.m@email.com` | `Cliente2024!` |
| `marie.d@email.fr` | `Cliente2024!` |
| `hans.s@email.de` | `Cliente2024!` |
| `aiko.t@email.jp` | `Cliente2024!` |

URL: `http://localhost:3102` (Tienda)

---

## Frontend Institucional

No requiere autenticación. URL: `http://localhost:3101`

---

## Backend API

| Endpoint | URL |
|----------|-----|
| API Base | `http://localhost:8000/api/v1` |
| Swagger | `http://localhost:8000/api/v1/docs` |
| Health | `http://localhost:8000/api/v1/health` |

---

> **Nota:** Estas credenciales se crean al ejecutar `npm run db:seed` en `backend/`.
