# FASE III: AUDITORÍA DE BEST SELLERS & LIMITACIÓN BACKEND

## Evaluación del Módulo `BestSellers.jsx`

---

## 1. OBJETIVO
Inspeccionar si el backend NestJS soporta un endpoint o parámetro de ordenación por ventas/bestsellers para la sección `BestSellers.jsx`.

## 2. RESULTADO DE INSPECCIÓN BACKEND
- **Servicio Inspeccionado**: `backend/src/modules/catalog/catalog.service.ts`
- **Controlador**: `CatalogController` (`GET /api/v1/products`)
- **Parámetros de Ordenación Permitidos**:
  ```typescript
  const allowedSort = ['createdAt', 'name', 'updatedAt', 'weight'];
  ```
- **Conclusión**: El servidor NestJS **NO provee actualmente un endpoint ni parámetro para calcular o retornar el ranking de productos más vendidos (`bestsellers`)**.

## 3. ACCIÓN APLICADA SEGÚN REGLAS DE INTEGRACIÓN
- **Regla Cumplida**: *"Si NO existe: NO inventar endpoint. NO inventar query parameter. NO crear datos falsos. Documentar la limitación y detener esta fase hasta determinar el contrato correcto."*
- **Estado de Fase III**: **DETENIDA (LIMITACIÓN BACKEND DOCUMENTADA)**.

## 4. PRÓXIMOS PASOS
Cuando el equipo de Backend extienda `CatalogService` con el campo o filtro `bestsellers`, se conectará la sección en el frontend de forma transparente.
