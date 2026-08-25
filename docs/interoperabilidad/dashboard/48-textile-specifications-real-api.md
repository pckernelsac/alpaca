# INTEGRACIÓN DE MAESTROS Y TRANSFERENCIAS TEXTILES — REAL API

## Migración de Transferencias (`/textile/transferencias`) y Variantes (`/textil/variantes`)

Se conectaron las vistas de especificaciones técnicas textiles a las APIs NestJS correspondientes.

---

## Cambios Realizados

1. **Transferencias entre Almacenes (`TransferList.jsx`)**:
   - Conectado a `inventoryRepository.getTransfers` ➔ `GET /api/v1/inventory/transfers`.
   - Carga guías de traslado y movimientos entre sedes.

2. **Maestros de Fibras y Colores (`TextileVariantList.jsx`)**:
   - Conectado a `textileRepository.getMaterials` y `getColors` ➔ `GET /api/v1/textile/materials` y `GET /api/v1/textile/colors`.
   - Visualiza fibras textiles (Baby Alpaca, Suri, Vicuña) y muestras de paleta de color reales.
