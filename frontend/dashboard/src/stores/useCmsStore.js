import { create } from 'zustand';
import { cmsRepository } from '../repositories/api';

const useCmsStore = create((set) => ({
  contents: [], loading: false,
  fetchAll: async () => { set({ loading: true }); const data = await cmsRepository.getContents(); set({ contents: data || [], loading: false }); },
}));
export default useCmsStore;
