import { create } from 'zustand';
import { ordersRepository } from '../repositories/api';

const useOrdersStore = create((set) => ({
  orders: [],
  meta: { total: 0, page: 1, perPage: 25, totalPages: 1 },
  loading: false,
  error: null,
  fetchAll: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await ordersRepository.getAll(params);
      const data = res?.data || (Array.isArray(res) ? res : []);
      const meta = res?.meta || { total: data.length, page: 1, perPage: 25, totalPages: 1 };
      set({ orders: data, meta, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Error al cargar listado de pedidos', loading: false });
    }
  },
}));
export default useOrdersStore;

