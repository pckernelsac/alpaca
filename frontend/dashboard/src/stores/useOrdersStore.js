import { create } from 'zustand';
import { ordersRepository } from '../repositories/api';

const useOrdersStore = create((set) => ({
  orders: [], loading: false,
  fetchAll: async () => { set({ loading: true }); const data = await ordersRepository.getAll(); set({ orders: data || [], loading: false }); },
}));
export default useOrdersStore;
