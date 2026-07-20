import { create } from 'zustand';
import { marketingRepository } from '../repositories/api';

const useMarketingStore = create((set) => ({
  campaigns: [], loading: false,
  fetchAll: async () => { set({ loading: true }); const data = await marketingRepository.getCampaigns(); set({ campaigns: data || [], loading: false }); },
}));
export default useMarketingStore;
