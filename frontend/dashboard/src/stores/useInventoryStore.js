import { create } from 'zustand';
import { inventoryRepository } from '../repositories/api';

const useInventoryStore = create((set) => ({
  items: [], kpis: null, loading: false,
  fetchAll: async () => { set({ loading: true }); const data = await inventoryRepository.getStock(); set({ items: data || [], loading: false }); },
}));
export default useInventoryStore;
