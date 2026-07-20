import { useState, useCallback, useEffect } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';

function createHook(fetchFn) {
  return () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetch = useCallback(async (...args) => {
      setLoading(true); setError(null);
      try { const r = await fetchFn(...args); setData(r); return r; }
      catch (e) { setError(e); return null; }
      finally { setLoading(false); }
    }, []);
    return { data, loading, error, fetch };
  };
}

export const useDashboard = createHook(() => serviceProvider.analytics.getKpis());
export const useUsers = createHook((q) => serviceProvider.iam.getUsers(q));
export const useRoles = createHook(() => serviceProvider.iam.getRoles());
export const useProducts = createHook((q) => serviceProvider.catalog.getProducts(q));
export const useOrders = createHook((q) => serviceProvider.orders.getAll(q));
export const useClients = createHook((q) => serviceProvider.crm.getClients(q));
export const usePayments = createHook((q) => serviceProvider.payments.getAll(q));
export const useInventory = createHook((q) => serviceProvider.inventory.getStock(q));
export const useCampaigns = createHook((q) => serviceProvider.marketing.getCampaigns(q));
export const useContents = createHook((q) => serviceProvider.cms.getContents(q));
export const useAuditLogs = createHook((q) => serviceProvider.audit.getLogs(q));
export const useShipments = createHook((q) => serviceProvider.logistics.getShipments(q));
export const useSettings = createHook(() => serviceProvider.settings.getCompany());
export const usePermissions = createHook(() => serviceProvider.iam.getPermissions());
export const useCoupons = createHook(() => serviceProvider.marketing.getCoupons());
export const usePromotions = createHook(() => serviceProvider.marketing.getPromotions());
export const useCarriers = createHook(() => serviceProvider.logistics.getCarriers());
