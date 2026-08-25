# Dashboard Integration — Marketing

> **Módulo Marketing: Campañas, Cupones, Promociones**

---

## Endpoints

| Método | Endpoint | Repository | Service | Hook |
|--------|----------|------------|---------|------|
| GET | /campaigns | `marketingRepository.getCampaigns(q)` | `MarketingService.getCampaigns(q)` | `useCampaigns(q)` |
| POST | /campaigns | `marketingRepository.createCampaign(d)` | `MarketingService.createCampaign(d)` | — |
| GET | /coupons | `marketingRepository.getCoupons()` | `MarketingService.getCoupons()` | `useCoupons()` |
| POST | /coupons | `marketingRepository.createCoupon(d)` | `MarketingService.createCoupon(d)` | — |
| GET | /promotions | `marketingRepository.getPromotions()` | `MarketingService.getPromotions()` | `usePromotions()` |

## Estado

| Página | Mock | Hook Disponible | Migrado |
|--------|------|----------------|---------|
| MarketingDashboard | inline KPIs | `useCampaigns()` | ❌ |
| CampaignList | inline campaigns | `useCampaigns()` | ❌ |
