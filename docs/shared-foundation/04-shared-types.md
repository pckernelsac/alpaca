# shared-types — Interfaces Compartidas

## Contenido

`packages/shared-types/src/index.ts` exporta **20 interfaces TypeScript** que modelan las entidades del backend. Se encuentran en `packages/shared-types/src/index.ts`.

### Listado completo

| # | Interfaz | Campos |
|---|---|---|
| 1 | **User** | `id: string`, `name: string`, `email: string`, `role: string`, `phone?: string`, `status: string` |
| 2 | **Role** | `id: number`, `name: string`, `category: string`, `status: string` |
| 3 | **Customer** | `id: string`, `firstName: string`, `lastName: string`, `email: string`, `phone?: string`, `language: string`, `currency: string` |
| 4 | **Product** | `id: string`, `sku: string`, `name: string`, `description?: string`, `categoryId?: number`, `price?: number`, `status: string` |
| 5 | **ProductVariant** | `id: string`, `productId: string`, `sku: string`, `price: number`, `stock: number`, `colorName?: string`, `sizeId?: number`, `status: string` |
| 6 | **Category** | `id: number`, `name: string`, `slug: string`, `parentId?: number` |
| 7 | **Collection** | `id: string`, `name: string`, `active: boolean`, `seasonId?: number` |
| 8 | **Order** | `id: string`, `orderNumber: string`, `customerId?: string`, `status: string`, `subtotal: number`, `total: number`, `paid: boolean` |
| 9 | **OrderItem** | `id: number`, `orderId: string`, `productId?: string`, `productName: string`, `sku: string`, `unitPrice: number`, `quantity: number`, `total: number` |
| 10 | **Address** | `id?: number`, `street: string`, `city: string`, `state?: string`, `zip?: string`, `country: string`, `isDefault?: boolean` |
| 11 | **Coupon** | `id?: number`, `code: string`, `type: string`, `value: number`, `minPurchase?: number`, `maxUses?: number`, `usedCount: number`, `active: boolean` |
| 12 | **Campaign** | `id: string`, `name: string`, `type: string`, `status: string`, `budget: number` |
| 13 | **Client** | `id: string`, `name: string`, `company?: string`, `email: string`, `type: string`, `status: string` |
| 14 | **StockItem** | `id: number`, `productId?: string`, `variantId?: string`, `warehouseId: number`, `quantity: number`, `reserved: number` |
| 15 | **Warehouse** | `id: number`, `name: string`, `code: string`, `city: string`, `type: string` |
| 16 | **Shipment** | `id: string`, `waybill: string`, `orderId: string`, `carrier: string`, `status: string` |
| 17 | **Content** | `id: string`, `title: string`, `slug: string`, `type: string`, `status: string`, `publishedAt?: string` |
| 18 | **HeroSlide** | `id: number`, `title: string`, `subtitle?: string`, `image?: string`, `ctaText?: string`, `order: number`, `active: boolean` |
| 19 | **Testimonial** | `id: number`, `author: string`, `text: string`, `rating?: number`, `featured: boolean` |
| 20 | **Notification** | `id: number`, `title: string`, `message: string`, `type: string`, `read: boolean`, `createdAt: string` |
| — | **PaginatedResponse\<T\>** | Genérico: `data: T[]`, `count: number`, `page: number`, `perPage: number`, `totalPages: number` |

### Detalles adicionales

- **20 interfaces + 1 genérico** (`PaginatedResponse<T>`)
- **Campos opcionales** marcados con `?` (ej. `phone?`, `description?`)
- **Tipos base**: `string`, `number`, `boolean` — sin enums ni tipos complejos
- **Correspondencia directa** con las entidades del backend documentadas en `docs/backend-discovery/`
- Uso: `import type { Product, Order } from '@alpacart/shared-types'`

### Próximos pasos

- Migrar a `enum` o `union types` para campos como `status`, `type`, `role`
- Agregar interfaces para request/response DTOs si el backend los expone
- Evaluar `zod` schemas para validación runtime compartida

## Score: 85/100

Pérdida de 15 puntos por: (i) ausencia de enums/unions para campos de estado, (ii) sin schemas de validación, (iii) algunos campos podrían ser más específicos (ej. `type` en Campaign y Client es `string` genérico).
