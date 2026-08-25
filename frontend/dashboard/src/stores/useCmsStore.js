import { create } from 'zustand';
import { cmsRepository } from '../repositories/api';

const useCmsStore = create((set) => ({
  contents: [],
  meta: { total: 0, page: 1, perPage: 25, totalPages: 1 },
  loading: false,
  error: null,
  fetchAll: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await cmsRepository.getContents(params);
      const data = res?.data || (Array.isArray(res) ? res : []);
      const meta = res?.meta || { total: data.length, page: 1, perPage: 25, totalPages: 1 };
      set({ contents: data, meta, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Error al cargar contenidos CMS', loading: false });
    }
  },
}));
export default useCmsStore;

