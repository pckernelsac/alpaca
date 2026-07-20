import { create } from 'zustand';
import { paymentsRepository } from '../repositories/api';

const usePaymentsStore = create((set) => ({
  transactions: [], summary: null, loading: false,
  fetchAll: async () => { set({ loading: true }); const data = await paymentsRepository.getAll(); set({ transactions: data || [], loading: false }); },
}));
export default usePaymentsStore;
