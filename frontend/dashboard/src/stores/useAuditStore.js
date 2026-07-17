import { create } from 'zustand';
import repo from '../repositories/audit.js';
const useAuditStore = create((set) => ({ logs: [], loading: false, fetchAll: async () => { set({ loading: true }); const data = await repo.getAll(); set({ logs: data, loading: false }); } }));
export default useAuditStore;
