import { create } from 'zustand';
import { catalogRepository } from '../repositories/api';

const useCatalogStore = create((set) => ({
  products: [],
  meta: { total: 0, page: 1, perPage: 25, totalPages: 1 },
  loading: false,
  error: null,
  fetchAll: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await catalogRepository.getProducts(params);
      const data = res?.data || (Array.isArray(res) ? res : []);
      const meta = res?.meta || { total: data.length, page: 1, perPage: 25, totalPages: 1 };
      set({ products: data, meta, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Error al cargar catálogo de productos', loading: false });
    }
  },
  createProduct: async (d) => { const c = await catalogRepository.createProduct(d); set((s) => ({ products: [...s.products, c] })); },
  updateProduct: async (id, d) => { const u = await catalogRepository.updateProduct(id, d); set((s) => ({ products: s.products.map(p => p.id === id ? u : p) })); },
  deleteProduct: async (id) => { await catalogRepository.deleteProduct(id); set((s) => ({ products: s.products.filter(p => p.id !== id) })); },
}));
export default useCatalogStore;

