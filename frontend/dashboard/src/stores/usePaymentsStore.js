import { create } from 'zustand';
import repo from '../repositories/payments.js';
const usePaymentsStore = create((set) => ({ transactions: [], summary: null, loading: false, fetchAll: async () => { set({ loading: true }); const data = await repo.getAll(); const s = await repo.getSummary(); set({ transactions: data, summary: s, loading: false }); } }));
export default usePaymentsStore;
