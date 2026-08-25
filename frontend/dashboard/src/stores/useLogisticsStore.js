import { create } from 'zustand';
import { logisticsRepository } from '../repositories/api';

const useLogisticsStore = create((set) => ({
  shipments: [],
  carriers: [],
  meta: { total: 0, page: 1, perPage: 25, totalPages: 1 },
  loading: false,
  error: null,
  fetchAll: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await logisticsRepository.getShipments(params);
      const c = await logisticsRepository.getCarriers().catch(() => []);
      const data = res?.data || (Array.isArray(res) ? res : []);
      const meta = res?.meta || { total: data.length, page: 1, perPage: 25, totalPages: 1 };
      set({ shipments: data, carriers: c || [], meta, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Error al cargar listado de envíos logísticos', loading: false });
    }
  },
}));
export default useLogisticsStore;

