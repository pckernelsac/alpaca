import { create } from 'zustand';
import { inventoryRepository } from '../repositories/api';

const useInventoryStore = create((set) => ({
  items: [],
  meta: { total: 0, page: 1, perPage: 25, totalPages: 1 },
  loading: false,
  error: null,
  fetchAll: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await inventoryRepository.getStock(params);
      const data = res?.data || (Array.isArray(res) ? res : []);
      const meta = res?.meta || { total: data.length, page: 1, perPage: 25, totalPages: 1 };
      set({ items: data, meta, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Error al cargar inventario de stock', loading: false });
    }
  },
}));
export default useInventoryStore;

