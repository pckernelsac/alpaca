import { create } from 'zustand';
import repo from '../repositories/marketing.js';
const useMarketingStore = create((set) => ({ campaigns: [], loading: false, fetchAll: async () => { set({ loading: true }); const data = await repo.getAll(); set({ campaigns: data, loading: false }); } }));
export default useMarketingStore;
