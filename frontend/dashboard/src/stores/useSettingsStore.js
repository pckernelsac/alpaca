import { create } from 'zustand';
import repo from '../repositories/settings.js';
const useSettingsStore = create((set) => ({ settings: null, loading: false, fetch: async () => { set({ loading: true }); const data = await repo.get(); set({ settings: data, loading: false }); }, update: async (d) => { const u = await repo.update(d); set({ settings: u }); } }));
export default useSettingsStore;
