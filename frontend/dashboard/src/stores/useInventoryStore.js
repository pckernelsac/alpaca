import { create } from 'zustand';
import repo from '../repositories/inventory.js';
const useInventoryStore = create((set) => ({ items: [], kpis: null, loading: false, fetchAll: async () => { set({ loading: true }); const data = await repo.getAll(); const k = await repo.getKpis(); set({ items: data, kpis: k, loading: false }); } }));
export default useInventoryStore;
