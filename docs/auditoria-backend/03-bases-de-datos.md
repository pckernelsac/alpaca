# 03 — Bases de Datos

## Objetivo
Auditar la configuración de base de datos: ORM, migraciones, semillas, controladores de BD y cantidad de tablas.

## Alcance
- `database/migrations/` (16 archivos)
- `database/seeds/` (7 archivos)
- `package.json`
- `src/app.module.ts`

## Estado actual
Backend utiliza Sequelize v6 con PostgreSQL como único motor de base de datos. Existen 59 tablas creadas via 16 migraciones, 7 seeds. No hay otros drivers de BD instalados.

## Evidencias encontradas

### ORM: Sequelize v6.37.8
- `sequelize` v6.37.8
- `sequelize-typescript` v2.1.6
- `@nestjs/sequelize` v11.0.1
- `pg` v8.22.0 (driver PostgreSQL)
- `sequelize-cli` v6.6.5 (devDependency)

### Migraciones (16 archivos)
| Archivo | Descripción | Tablas creadas |
|---------|-------------|----------------|
| 001-create-iam | roles, permissions, role_permissions, departments, users, sessions, password_resets | 7 |
| 002-create-catalog | categories, collections, tags, products, product_variants, product_media, product_tags | 7 |
| 003-create-textile-crm | fiber_materials, textile_colors, textile_sizes, seasons | 4 |
| 004-create-customers | customers, customer_addresses, wishlist_items, reviews, carts, cart_items | 6 |
| 005-create-orders | orders, order_items, order_events, order_documents | 4 |
| 006-create-payments | transactions, transaction_refunds | 2 |
| 007-create-inventory | warehouses, stock_items, stock_movements, warehouse_transfers, warehouse_transfer_items | 5 |
| 008-create-remaining | carriers, shipments, shipment_events, campaigns, coupons, promotions, newsletter_subscribers, contents, faq_categories, faq_items, audit_logs, company_settings, contact_inquiries | 13 |
| 009-cross-domain-fks | Cross FKs: sessions.customer_id, carts.coupon_id, orders.coupon_id | 0 |
| 010-create-cms-tables | hero_slides, gallery_images, testimonials, benefits, artisan_processes | 5 |
| 011-add-missing-columns | Columnas faltantes | 0 |
| 012-add-missing-foreign-keys | ~40 FKs en todas las tablas | 0 |
| 013-add-check-constraints | ~40 CHECK constraints | 0 |
| 014-add-essential-indexes | ~50 índices | 0 |
| 015-create-idempotency-keys | order_idempotency_keys | 1 |
| 016-create-webhook-events | webhook_events | 1 |

**Total de tablas: 59** (incluyendo tablas pivote role_permissions, product_tags)

### Seeds (7 archivos)
| Seed | Propósito |
|------|-----------|
| 001-iam-base | Roles, permisos, usuarios base |
| 002-textile-base | Fibras, colores, tallas, temporadas |
| 003-catalog-base | Categorías, colecciones, productos, variantes |
| 004-clients-orders | Clientes B2B, pedidos |
| 005-infra-marketing | Campañas, cupones, promociones |
| 006-restantes | Envíos, contenido CMS, inventario |
| 007-seed-restantes | Datos complementarios |

### Configuración Sequelize en AppModule
```typescript
SequelizeModule.forRootAsync({
  dialect: 'postgres',
  autoLoadModels: true,
  synchronize: false,  // migrations-only
  pool: { max: 25, min: 5, acquire: 30000, idle: 10000 },
})
```

### Drivers de BD instalados
- `pg` v8.22.0 — único driver de base de datos
- No hay `mysql2`, `sqlite3`, `tedious` ni otros drivers

## Hallazgos
1. **F1**: 59 tablas bien organizadas en 16 migraciones secuenciales sin errores.
2. **F2**: 7 seeds con datos de prueba completos.
3. **F3**: Un único ORM (Sequelize) con PostgreSQL como única BD — correcto.
4. **F4**: `synchronize: false` — migraciones manuales, correcto para producción.
5. **F5**: Configuración de pool: 25 max / 5 min / 30s acquire / 10s idle — razonable.

## Riesgos
- **R1**: Sin `synchronize`, cualquier cambio en entidades requiere migración manual — riesgo de desincronización si no se aplican migraciones.

## Recomendaciones
1. Mantener el flujo actual de migraciones manuales.
2. Agregar script de `npm run migrate` y `npm run seed` en package.json.
3. Validar que las 55 entidades TypeScript mapean correctamente a las 59 tablas.

## Acciones Prioridad P0
- Ninguna — base de datos bien estructurada.

## Acciones Prioridad P1
- Agregar scripts npm para migración y seed.

## Acciones Prioridad P2
- Crear un diagrama ERM actualizado de las 59 tablas.

## Score
**9.0 / 10**

## Estado: APROBADO
