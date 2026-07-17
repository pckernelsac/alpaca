# Estados, Enums y Transiciones — ALPACART Backend

## 1. Convenciones

| Convención | Regla |
|------------|-------|
| **Persistencia** | VARCHAR(30) + CHECK constraint para todos los status (portable, legible, sin dependency hell) |
| **Valor canónico** | En inglés, snake_case (ej: `in_transit`, `out_of_stock`) |
| **Traducción** | Mapa frontend: status → etiqueta en español |
| **Timestamps** | Todo cambio de estado debe registrar `updated_at`. Para auditoría, usar `order_events`/`audit_logs` |

---

## 2. Estados de Pedido (Order)

### Valores encontrados

| Fuente | Valor | Contexto |
|--------|-------|----------|
| OrderDashboard | Pendientes, Confirmados, Pagados, Preparados, Enviados, Entregados, Cancelados | 7 KPIs |
| OrderList | `delivered`, `shipped`, `pending`, `processing`, `cancelled` | StatusBadge classes |
| OrderDetail | `"In Progress"` | Status display |
| OrderTimeline | Creado, Confirmado, Pagado, Preparación, Despachado, Tránsito, Entregado, Devuelto, Cancelado | 9 eventos |
| Tienda Order | `shipped`, `delivered`, `cancelled` | Account + OrderHistory |
| OrderEvent types | `created`, `confirmed`, `paid`, `preparing`, `shipped`, `transit`, `delivered`, `returned`, `cancelled` | Timeline |

### Valor canónico sugerido

```
pending → confirmed → paid → preparing → shipped → in_transit → delivered
  │          │          │        │                     │
  └──────────┴──────────┴────────┴─────────────────────┴──→ cancelled
                                                              │
                                                              └→ returned
```

### Tabla de valores

| # | Canónico | Traducción | Color badge | Fuente principal |
|---|----------|------------|-------------|------------------|
| 1 | `pending` | Pendiente | warning | OrderList, OrderDashboard |
| 2 | `confirmed` | Confirmado | info | OrderDashboard |
| 3 | `paid` | Pagado | success | OrderDashboard |
| 4 | `preparing` | En Preparación | info | OrderDetail, OrderDashboard |
| 5 | `shipped` | Enviado | primary | OrderDashboard, OrderList |
| 6 | `in_transit` | En Tránsito | info | OrderTimeline |
| 7 | `delivered` | Entregado | success | OrderDashboard, OrderList |
| 8 | `cancelled` | Cancelado | error | OrderDashboard, OrderList |
| 9 | `returned` | Devuelto | error | OrderTimeline, OrderDashboard |

**Inconsistencias:**
- Dashboard usa español (Entregado), OrderList usa inglés (delivered) → normalizar a canónico inglés
- `in_transit` solo existe en OrderTimeline, no en OrderList → agregar al mapa completo
- Tienda usa EN `shipped/delivered/cancelled` → coincide con propuesta

**Persistencia:** VARCHAR(30) con CHECK constraint
**Tabla de transiciones:** `order_events`

---

## 3. Estados de Pago (Transaction)

### Valores encontrados

| Fuente | Valores | Notas |
|--------|---------|-------|
| TransactionList | `succeeded`, `pending`, `failed`, `refunded` | statusClass |
| PaymentDashboard | `completed`, `processing`, `failed`, `refunded` | statusBadgeMap |
| OrderDetail | `"Authorized"`, `"Pagado"`, `"Pendiente"`, `"Fallido"` | paymentStatus |
| OrderList | `paid`, `pending`, `failed` | paymentClass |

### Valor canónico sugerido

| # | Canónico | Traducción | Color | Fuente |
|---|----------|------------|-------|--------|
| 1 | `pending` | Pendiente | warning | TransactionList, OrderList |
| 2 | `processing` | Procesando | info | PaymentDashboard |
| 3 | `succeeded` | Completado | success | TransactionList |
| 4 | `failed` | Fallido | error | TransactionList, OrderList |
| 5 | `refunded` | Reembolsado | error | TransactionList, PaymentDashboard |

### Transiciones inferidas

```
pending → processing → succeeded
  │          │            │
  └──────────┴────────────┴──→ failed
                                  │
                                  └→ refunded (solo desde succeeded)
```

**Inconsistencias:**
- `succeeded` vs `completed` (mismo significado, 2 nombres) → usar `succeeded`
- `paid` vs `succeeded` (OrderList usa `paid` para status de pago) → `succeeded` es más preciso
- PaymentDashboard usa `processing` que no aparece en TransactionList → unificar

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 4. Estados de Envío (Shipment)

### Valores encontrados

| Fuente | Valores | Notas |
|--------|---------|-------|
| ShipmentList | `transit`, `delayed`, `ready`, `delivered` | statusClass |
| LogisticsDashboard | En Tránsito, Entregados, Pendientes, Devueltos | KPIs |
| OrderDetail | `"Preparing"`, `"In Transit"`, `"Delivered"` | Shipping |
| OrderTimeline | En Tránsito, Entregado, Devuelto | Eventos |

### Valor canónico sugerido

| # | Canónico | Traducción | Color | Fuente |
|---|----------|------------|-------|--------|
| 1 | `pending` | Pendiente | warning | LogisticsDashboard |
| 2 | `preparing` | Preparando | info | OrderDetail |
| 3 | `ready` | Listo para recoger | info | ShipmentList |
| 4 | `transit` | En Tránsito | info | ShipmentList |
| 5 | `delayed` | Retrasado | error | ShipmentList |
| 6 | `delivered` | Entregado | success | ShipmentList, LogisticsDashboard |
| 7 | `returned` | Devuelto | error | LogisticsDashboard |

### Transiciones inferidas

```
pending → preparing → ready → transit → delivered
  │                                    │
  └──→ cancelled                       └──→ returned
              transit ─→ delayed ─→ transit (loop)
```

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 5. Estados de Producto

### Valores encontrados

| Fuente | Valores | Notas |
|--------|---------|-------|
| ProductList | `Activo`, `Oculto`, `Descontinuado` | Español |
| VariantList | `Activo`, `Oculto`, `Agotado` | Español |
| TextileVariantList | `Active`, `Out of Stock`, `Discontinued`, `Coming Soon` | Inglés |
| ProductCreate | `Activa`, `En Desarrollo`, `Descontinuada` | Español (variante create) |

### Valor canónico sugerido

**Product status:**

| # | Canónico | Traducción | Color |
|---|----------|------------|-------|
| 1 | `draft` | Borrador | outline |
| 2 | `active` | Activo | success |
| 3 | `hidden` | Oculto | warning |
| 4 | `discontinued` | Descontinuado | error |

**Variant status:**

| # | Canónico | Traducción | Color |
|---|----------|------------|-------|
| 1 | `active` | Activo | success |
| 2 | `hidden` | Oculto | warning |
| 3 | `out_of_stock` | Agotado | error |
| 4 | `discontinued` | Descontinuado | error |
| 5 | `coming_soon` | Próximamente | info |

### Transiciones inferidas (Product)

```
draft ─→ active ←→ hidden
  │        │
  └────────┴──→ discontinued
```

**Inconsistencias:**
- `Descontinuado` (ES) vs `Discontinued` (EN) → normalizar a `discontinued`
- `Agotado` vs `Out of Stock` → normalizar a `out_of_stock`
- `En Desarrollo` vs `Borrador` → normalizar a `draft`
- `Oculto` (ProductList) vs `Coming Soon` (Textile) → conceptos distintos: `hidden` es no visible, `coming_soon` es pre-lanzamiento

**Persistencia:** VARCHAR(30) con CHECK constraint (campo separado para product y variant)

---

## 6. Estados de Usuario (User)

### Valores encontrados

| Fuente | Valores | Notas |
|--------|---------|-------|
| UserList | `Activo`, `Suspendido`, `Inactivo` | 3 estados |
| UserCreate | Toggle: Activo/Inactivo | 2 opciones |
| MyProfile | No status | – |

### Valor canónico sugerido

| # | Canónico | Traducción | Color |
|---|----------|------------|-------|
| 1 | `active` | Activo | success |
| 2 | `inactive` | Inactivo | outline |
| 3 | `suspended` | Suspendido | error |

**Persistencia:** VARCHAR(30) con CHECK constraint
**Inconsistencias:** `Suspendido` es distinto de `Inactivo` (UserList) pero UserCreate solo ofrece binary toggle. `Suspendido` debe ser promovible a `active` por admin.

---

## 7. Estados de Cliente (Client)

### Valores encontrados

| Fuente | Valores | Notas |
|--------|---------|-------|
| ClientList | `Activo`, `Inactivo`, `VIP` | 3 estados |
| ClientCreate | Toggle: Activo/Inactivo | 2 opciones |

### Valor canónico sugerido

| # | Canónico | Traducción | Color |
|---|----------|------------|-------|
| 1 | `active` | Activo | success |
| 2 | `inactive` | Inactivo | outline |
| 3 | `vip` | VIP | gold (#b8862f) |

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 8. Estados de Contenido CMS (Content)

### Valores encontrados

| Fuente | Valores | Notas |
|--------|---------|-------|
| ContentList | `Published`, `Draft`, `Scheduled`, `Review` | 4 estados en inglés |
| Filter | `Published`, `Draft`, `Scheduled` | Filtro sin Review |

### Valor canónico sugerido

| # | Canónico | Traducción | Color |
|---|----------|------------|-------|
| 1 | `draft` | Borrador | outline |
| 2 | `review` | En Revisión | warning |
| 3 | `scheduled` | Programado | info |
| 4 | `published` | Publicado | success |

### Transiciones inferidas

```
draft ─→ review ─→ published
  │        │          │
  └────────┴──────────┤
                      │
           scheduled ─┘ (desde draft o review)
```

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 9. Estados de Campaña (Campaign)

### Valores encontrados

| Fuente | Valores | Notas |
|--------|---------|-------|
| CampaignList | `ACTIVA`, `PROGRAMADA`, `BORRADOR`, `FINALIZADA` | Español mayúsculas |
| MarketingDashboard | `Activa`, `Cerrando`, `Pausa` | statusClass: active, closing, paused |
| Filtro | `Activa`, `Programada`, `Borrador`, `Finalizada`, `Pausada` | 5 opciones |

### Valor canónico sugerido

| # | Canónico | Traducción | Color |
|---|----------|------------|-------|
| 1 | `draft` | Borrador | outline |
| 2 | `scheduled` | Programada | info |
| 3 | `active` | Activa | success |
| 4 | `paused` | Pausada | warning |
| 5 | `closing` | Cerrando | warning |
| 6 | `finished` | Finalizada | default |

### Transiciones inferidas

```
draft ─→ scheduled ─→ active ─→ finished
                         │
                         ├──→ paused ──→ active
                         │
                         └──→ closing ──→ finished
```

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 10. Tipos de Movimiento (StockMovement)

### Valores encontrados

| Fuente | Valores | Notas |
|--------|---------|-------|
| MovementList | `Ingreso`, `Transferencia`, `Ajuste`, `Salida`, `Reserva` | 5 tipos |
| KardexPage | `Entrada`, `Salida`, `Transferencia`, `Ajuste` | 4 tipos (sin Reserva) |

### Valor canónico sugerido

| # | Canónico | Traducción | Color |
|---|----------|------------|-------|
| 1 | `receipt` | Entrada / Ingreso | success |
| 2 | `issue` | Salida | error |
| 3 | `transfer` | Transferencia | info |
| 4 | `adjustment` | Ajuste | warning |
| 5 | `reservation` | Reserva | info |

**Inconsistencia:** `Ingreso` vs `Entrada` (mismo significado) → normalizar a `receipt`
**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 11. Estados de Transferencia (WarehouseTransfer)

### Valores encontrados

| Fuente | Valores | Notas |
|--------|---------|-------|
| TransferList | `Solicitada`, `Autorizada`, `En Tránsito`, `Recibida`, `Completada`, `Cancelada`, `Archivado` | 7 estados |
| Timeline | Solicitada, Autorizada, En Tránsito, Llegada a Destino, Recibida y Validada | 5 pasos |

### Valor canónico sugerido

| # | Canónico | Traducción | Color |
|---|----------|------------|-------|
| 1 | `requested` | Solicitada | warning |
| 2 | `authorized` | Autorizada | info |
| 3 | `in_transit` | En Tránsito | info |
| 4 | `received` | Recibida | success |
| 5 | `completed` | Completada | success |
| 6 | `cancelled` | Cancelada | error |
| 7 | `archived` | Archivado | outline |

### Transiciones inferidas

```
requested → authorized → in_transit → received → completed
  │            │                          │
  └──→ cancelled                          └──→ archived
```

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 12. Tipos de Contenido CMS (ContentType)

| # | Canónico | Traducción | Color badge | Fuente |
|---|----------|------------|-------------|--------|
| 1 | `page` | Página | primary | ContentList |
| 2 | `blog` | Blog | tertiary | ContentList |
| 3 | `banner` | Banner | secondary | ContentList |
| 4 | `collection` | Colección | primary | ContentList |
| 5 | `promo` | Promoción | secondary | ContentList |
| 6 | `faq` | FAQ | info | ContentList |

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 13. Tipos de Cliente (ClientType)

| # | Canónico | Traducción | Evidencia |
|---|----------|------------|-----------|
| 1 | `wholesale` | Mayorista | ClientList, ClientCreate |
| 2 | `retail` | Minorista | ClientList, ClientCreate |
| 3 | `corporate` | Corporativo | ClientCreate |

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 14. Tipos de Documento (DocumentType)

| # | Canónico | Traducción | Evidencia |
|---|----------|------------|-----------|
| 1 | `ruc` | RUC | ClientCreate |
| 2 | `dni` | DNI | ClientCreate |
| 3 | `passport` | Pasaporte | ClientCreate |
| 4 | `foreigner_card` | Carné de Extranjería | ClientCreate |

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 15. Categorías de Rol (RoleCategory)

| # | Canónico | Traducción | Evidencia |
|---|----------|------------|-----------|
| 1 | `critical` | Crítico | RoleList |
| 2 | `operational` | Operativo | RoleList |
| 3 | `administrative` | Administrativo | RoleList |
| 4 | `external` | Externo | RoleList |

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 16. Severidad de Auditoría (AuditSeverity)

| # | Canónico | Traducción | Color | Evidencia |
|---|----------|------------|-------|-----------|
| 1 | `success` | Exitosa | success | AuditLog |
| 2 | `info` | Informativo | info | AuditLog |
| 3 | `warning` | Advertencia | warning | AuditLog |
| 4 | `error` | Fallo | error | AuditLog |
| 5 | `critical` | Crítico | critical (rojo oscuro) | AuditLog |

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 17. Módulos del Sistema (Module)

| # | Canónico | Traducción | Evidencia |
|---|----------|------------|-----------|
| 1 | `inventory` | Inventario | AuditLog, PermissionMatrix |
| 2 | `sales` | Ventas | AuditLog |
| 3 | `iam` | IAM | AuditLog, PermissionMatrix |
| 4 | `finance` | Finanzas | AuditLog |
| 5 | `catalog` | Catálogos | AuditLog, PermissionMatrix |
| 6 | `orders` | Pedidos | PermissionMatrix |
| 7 | `master_data` | Datos Maestros | PermissionMatrix |
| 8 | `audit` | Auditoría | PermissionMatrix |

**Persistencia:** Tabla catálogo `system_modules` (referenciada por permisos y auditoría)

---

## 18. Acciones de Auditoría (AuditAction)

| # | Canónico | Evidencia |
|---|----------|-----------|
| 1 | `create` | AuditLog filter |
| 2 | `update` | AuditLog filter |
| 3 | `delete` | AuditLog filter |
| 4 | `login` | AuditLog filter |

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 19. Canales de Campaña (CampaignChannel)

| # | Canónico | Evidencia |
|---|----------|-----------|
| 1 | `email` | CampaignList |
| 2 | `social` | CampaignList, MarketingDashboard |
| 3 | `ads` | CampaignList |
| 4 | `automation` | CampaignList |

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 20. Tipos de Archivo Multimedia (MediaType)

| # | Canónico | Evidencia |
|---|----------|-----------|
| 1 | `image` | ProductMedia |
| 2 | `video` | ProductMedia |

**Persistencia:** VARCHAR(10) con CHECK constraint (ampliable a `document`, `model_3d`)

---

## 21. Formatos de Archivo (MediaFormat)

| # | Canónico | Evidencia |
|---|----------|-----------|
| 1 | `jpg` | ProductMedia |
| 2 | `png` | ProductMedia |
| 3 | `mp4` | ProductMedia |

**Persistencia:** VARCHAR(10) con CHECK constraint

---

## 22. Tipos de Documento de Pedido (DocumentType)

| # | Canónico | Evidencia |
|---|----------|-----------|
| 1 | `invoice` | OrderDetail |
| 2 | `packing_list` | OrderDetail |
| 3 | `label` | ShipmentList |
| 4 | `other` | OrderDetail |

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 23. Tipos de Almacén (WarehouseType)

| # | Canónico | Evidencia |
|---|----------|-----------|
| 1 | `principal` | Principal |
| 2 | `secondary` | Secundario |
| 3 | `production` | Producción |

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 24. Tipos de Colección (CollectionType)

| # | Canónico | Evidencia |
|---|----------|-----------|
| 1 | `main` | Colección principal |
| 2 | `seasonal` | Colección de temporada |
| 3 | `capsule` | Colección cápsula |

**Persistencia:** VARCHAR(30) con CHECK constraint (baja prioridad)

---

## 25. Niveles de Stock (AlertLevel — calculado)

| # | Canónico | Regla | Color |
|---|----------|-------|-------|
| 1 | `out_of_stock` | quantity = 0 | error |
| 2 | `critical` | quantity ≤ min_stock * 0.5 | error |
| 3 | `low` | quantity ≤ min_stock | warning |
| 4 | `optimal` | min_stock < quantity < max_stock | success |
| 5 | `overstock` | quantity ≥ max_stock | info |

**Nota:** No se persiste. Se calcula en runtime a partir de `stock_items.quantity`, `min_stock`, `max_stock`.

---

## 26. Tipos de Temporada (SeasonType)

| # | Canónico | Evidencia |
|---|----------|-----------|
| 1 | `spring` | Primavera |
| 2 | `summer` | Verano |
| 3 | `autumn` | Otoño |
| 4 | `winter` | Invierno |
| 5 | `seasonless` | Atemporal |

**Persistencia:** VARCHAR(30) o derivado de fechas en `seasons`

---

## 27. Roles del Sistema (SystemRole — semilla)

| # | Canónico | Mock | Evidencia |
|---|----------|------|-----------|
| 1 | `super_admin` | Super Administrador | RoleList |
| 2 | `production_manager` | Gestor de Producción | RoleList |
| 3 | `financial_analyst` | Analista Financiero | RoleList |
| 4 | `temporary_consultant` | Consultor Temporal | RoleList |

**Persistencia:** Tabla `roles` con seed. No es ENUM porque pueden crearse roles dinámicamente.

---

## 28. Estados de Contacto (ContactStatus)

| # | Canónico | Traducción | Evidencia |
|---|----------|------------|-----------|
| 1 | `pending` | Pendiente | ContactForm (implícito) |
| 2 | `read` | Leído | — |
| 3 | `replied` | Respondido | — |
| 4 | `archived` | Archivado | — |

**Persistencia:** VARCHAR(30) con CHECK constraint (tabla `contact_inquiries`)

---

## 29. Tipos de Dirección (AddressType)

| # | Canónico | Traducción |
|---|----------|------------|
| 1 | `principal` | Principal |
| 2 | `billing` | Facturación |
| 3 | `shipping` | Envío |

**Persistencia:** VARCHAR(30) con CHECK constraint

---

## 30. Máquinas de Estado Completas

### Order FSM
```
                  ┌───────────────────────────────────────┐
                  │                                       │
  pending ──→ confirmed ──→ paid ──→ preparing ──→ shipped ──→ in_transit ──→ delivered
    │              │          │          │                                  │
    └──→ cancelled ←─────────┴──────────┴───────────────────────────────────┴──→ returned
```

### Payment FSM
```
  pending ──→ processing ──→ succeeded
    │                         │
    └──→ failed               └──→ refunded
```

### Shipment FSM
```
  pending ──→ preparing ──→ ready ──→ transit ──→ delivered
    │                                         │       │
    └──→ cancelled                            └──→ returned
                         transit ──→ delayed ──→ transit
```

### Product FSM
```
  draft ──→ active ←──→ hidden
    │        │
    └────────┴──→ discontinued
```

### Campaign FSM
```
  draft ──→ scheduled ──→ active ──→ finished
                           │  │
                           │  └──→ paused ──→ active
                           │
                           └──→ closing ──→ finished
```

### Content FSM
```
  draft ──→ review ──→ published
    │        │          │
    └────────┴──────────┤
                        │
             scheduled ─┘
```

### Transfer FSM
```
  requested ──→ authorized ──→ in_transit ──→ received ──→ completed
    │                            │              │
    └──→ cancelled               └──→ archived ──┘
```

---

## 31. Resumen

| # | Enum | Valores | Persistencia | Seed |
|---|------|---------|--------------|------|
| 1 | OrderStatus | 9 | VARCHAR + CHECK | NO |
| 2 | PaymentStatus | 5 | VARCHAR + CHECK | NO |
| 3 | ShipmentStatus | 7 | VARCHAR + CHECK | NO |
| 4 | ProductStatus | 4 | VARCHAR + CHECK | NO |
| 5 | VariantStatus | 5 | VARCHAR + CHECK | NO |
| 6 | UserStatus | 3 | VARCHAR + CHECK | NO |
| 7 | ClientStatus | 3 | VARCHAR + CHECK | NO |
| 8 | ClientType | 3 | VARCHAR + CHECK | NO |
| 9 | ContentStatus | 4 | VARCHAR + CHECK | NO |
| 10 | ContentType | 6 | VARCHAR + CHECK | NO |
| 11 | CampaignStatus | 6 | VARCHAR + CHECK | NO |
| 12 | MovementType | 5 | VARCHAR + CHECK | NO |
| 13 | TransferStatus | 7 | VARCHAR + CHECK | NO |
| 14 | RoleCategory | 4 | VARCHAR + CHECK | NO |
| 15 | AuditSeverity | 5 | VARCHAR + CHECK | NO |
| 16 | AuditAction | 4 | VARCHAR + CHECK | NO |
| 17 | DocumentType (client) | 4 | VARCHAR + CHECK | NO |
| 18 | DocumentType (order) | 4 | VARCHAR + CHECK | NO |
| 19 | MediaType | 2 | VARCHAR + CHECK | NO |
| 20 | MediaFormat | 3 | VARCHAR + CHECK | NO |
| 21 | CampaignChannel | 4 | VARCHAR + CHECK | NO |
| 22 | WarehouseType | 3 | VARCHAR + CHECK | NO |
| 23 | AddressType | 3 | VARCHAR + CHECK | NO |
| 24 | ContactStatus | 4 | VARCHAR + CHECK | NO |
| 25 | Module (system) | 8 | Tabla catálogo | ✓ |
| 26 | Role (system) | 4 | Tabla `roles` | ✓ |

**Total:** 24 VARCHAR enums + 2 tablas catálogo = 26 conjuntos de estados.
**Total de valores únicos:** ~120.

---

*Documento generado el 2026-07-10. 26 conjuntos de estados, ~120 valores, 7 máquinas de estado, 5 inconsistencias corregidas.*
