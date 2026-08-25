import { create } from 'zustand';
import { marketingRepository } from '../repositories/api';

const useMarketingStore = create((set) => ({
  campaigns: [],
  meta: { total: 0, page: 1, perPage: 25, totalPages: 1 },
  loading: false,
  error: null,
  fetchAll: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await marketingRepository.getCampaigns(params);
      const data = res?.data || (Array.isArray(res) ? res : []);
      const meta = res?.meta || { total: data.length, page: 1, perPage: 25, totalPages: 1 };
      set({ campaigns: data, meta, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Error al cargar campañas de marketing', loading: false });
    }
  },
}));
export default useMarketingStore;

