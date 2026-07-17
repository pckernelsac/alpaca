import { create } from 'zustand';
import repo from '../repositories/cms.js';
const useCmsStore = create((set) => ({ contents: [], loading: false, fetchAll: async () => { set({ loading: true }); const data = await repo.getAll(); set({ contents: data, loading: false }); } }));
export default useCmsStore;
