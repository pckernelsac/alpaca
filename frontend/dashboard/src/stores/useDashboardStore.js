import { create } from 'zustand';
import { analyticsRepository } from '../repositories/api';

const useDashboardStore = create((set) => ({
  kpis: null,
  loading: false,
  error: null,
  fetchKpis: async () => {
    set({ loading: true, error: null });
    try {
      const kpis = await analyticsRepository.getKpis();
      set({ kpis, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Error al cargar KPIs del backend', loading: false });
    }
  },
}));
export default useDashboardStore;

