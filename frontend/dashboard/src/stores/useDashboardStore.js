import { create } from 'zustand';
import { analyticsRepository } from '../repositories/api';

const useDashboardStore = create((set) => ({
  kpis: null, recentOrders: [], alerts: [], loading: false,
  fetchKpis: async () => {
    set({ loading: true });
    const kpis = await analyticsRepository.getKpis();
    set({ kpis, loading: false });
  },
}));
export default useDashboardStore;
