import { create } from 'zustand';
import repo from '../repositories/textile.js';
const useTextileStore = create((set) => ({ variants: [], warehouses: [], loading: false, fetchAll: async () => { set({ loading: true }); const data = await repo.getAll(); const w = await repo.getWarehouses(); set({ variants: data, warehouses: w, loading: false }); } }));
export default useTextileStore;
