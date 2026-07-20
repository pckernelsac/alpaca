import { create } from 'zustand';
import { settingsRepository } from '../repositories/api';

const useSettingsStore = create((set) => ({
  settings: null, loading: false,
  fetch: async () => { set({ loading: true }); const data = await settingsRepository.getCompany(); set({ settings: data, loading: false }); },
  update: async (d) => { const u = await settingsRepository.updateCompany(d); set({ settings: u }); },
}));
export default useSettingsStore;
