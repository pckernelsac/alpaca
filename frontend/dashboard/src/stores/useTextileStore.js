import { create } from 'zustand';
import { textileRepository } from '../repositories/api';

const useTextileStore = create((set) => ({
  variants: [], warehouses: [], loading: false,
  fetchAll: async () => { set({ loading: true }); const data = await textileRepository.getMaterials(); set({ variants: data || [], loading: false }); },
}));
export default useTextileStore;
