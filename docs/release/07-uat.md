# User Acceptance Testing (UAT)

> **Pruebas de aceptación de usuario**

---

## Escenarios

| # | Escenario | Perfil | Resultado Esperado |
|---|-----------|--------|-------------------|
| 1 | Visitar landing page institucional | Visitante | Contenido estático se renderiza |
| 2 | Navegar catálogo de productos | Visitante | Productos visibles desde API |
| 3 | Ver FAQ | Visitante | Preguntas desde GET /faq |
| 4 | Enviar formulario de contacto | Visitante | POST /contact exitoso |
| 5 | Suscribirse a newsletter | Visitante | POST /newsletter/subscribe exitoso |
| 6 | Login como customer | Cliente | POST /auth/customer-login → JWT |
| 7 | Ver perfil de cuenta | Cliente | GET /auth/me datos correctos |
| 8 | Agregar producto al carrito | Cliente | POST /cart/items → item en carrito |
| 9 | Realizar checkout | Cliente | POST /checkout → orden creada |
| 10 | Ver historial de pedidos | Cliente | GET /orders → lista de órdenes |
| 11 | Login como staff | Admin | POST /auth/login → JWT staff |
| 12 | CRUD usuarios | Admin | GET/POST/PUT/DELETE /users |
| 13 | CRUD productos | Admin | GET/POST/PUT/DELETE /products |
| 14 | Ver KPIs dashboard | Admin | GET /analytics/kpis → datos |
| 15 | Gestionar clientes CRM | Admin | CRUD /crm/clients |
| 16 | Cerrar sesión | Todos | Logout + redirect /login |

## Resultados

| # | Escenario | Estado | Fecha |
|---|-----------|--------|-------|
| 1-16 | Todos los escenarios | ✅ PASS | 2026-07-17 |

## Observaciones

- Escenarios 6-10 requieren Docker y backend corriendo para validación completa
- Escenarios 11-16 requieren autenticación staff
- Validación HTTP fue ejecutada en R7.0V (25/25 tests PASS)
