import { create } from 'zustand';
import { paymentsRepository } from '../repositories/api';

const usePaymentsStore = create((set) => ({
  transactions: [],
  meta: { total: 0, page: 1, perPage: 25, totalPages: 1 },
  loading: false,
  error: null,
  fetchAll: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await paymentsRepository.getAll(params);
      const data = res?.data || (Array.isArray(res) ? res : []);
      const meta = res?.meta || { total: data.length, page: 1, perPage: 25, totalPages: 1 };
      set({ transactions: data, meta, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Error al cargar transacciones de pago', loading: false });
    }
  },
}));
export default usePaymentsStore;

