import * as S from '@/services/api';
import * as R from '@/repositories/api';

export const serviceProvider = {
  iam:       new S.IamService(R.iamRepository),
  catalog:   new S.CatalogService(R.catalogRepository),
  orders:    new S.OrdersService(R.ordersRepository),
  payments:  new S.PaymentsService(R.paymentsRepository),
  inventory: new S.InventoryService(R.inventoryRepository),
  logistics: new S.LogisticsService(R.logisticsRepository),
  marketing: new S.MarketingService(R.marketingRepository),
  cms:       new S.CmsService(R.cmsRepository),
  settings:  new S.SettingsService(R.settingsRepository),
  analytics: new S.AnalyticsService(R.analyticsRepository),
  audit:     new S.AuditService(R.auditRepository),
  crm:       new S.CrmService(R.crmRepository),
  auth:      new S.AuthService(R.authRepository),
};
