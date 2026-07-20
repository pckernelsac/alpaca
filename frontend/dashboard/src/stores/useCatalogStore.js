import { create } from 'zustand';
import { catalogRepository } from '../repositories/api';

const useCatalogStore = create((set) => ({
  products: [], loading: false,
  fetchAll: async () => { set({ loading: true }); const data = await catalogRepository.getProducts(); set({ products: data || [], loading: false }); },
  createProduct: async (d) => { const c = await catalogRepository.createProduct(d); set((s) => ({ products: [...s.products, c] })); },
  updateProduct: async (id, d) => { const u = await catalogRepository.updateProduct(id, d); set((s) => ({ products: s.products.map(p => p.id === id ? u : p) })); },
  deleteProduct: async (id) => { await catalogRepository.deleteProduct(id); set((s) => ({ products: s.products.filter(p => p.id !== id) })); },
}));
export default useCatalogStore;
