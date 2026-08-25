import { create } from 'zustand';
import { auditRepository } from '../repositories/api';

const useAuditStore = create((set) => ({
  logs: [], loading: false,
  fetchAll: async () => { set({ loading: true }); const data = await auditRepository.getLogs(); set({ logs: data || [], loading: false }); },
}));
export default useAuditStore;
