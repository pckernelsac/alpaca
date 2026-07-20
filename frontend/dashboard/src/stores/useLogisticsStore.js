import { create } from 'zustand';
import { logisticsRepository } from '../repositories/api';

const useLogisticsStore = create((set) => ({
  shipments: [], carriers: [], loading: false,
  fetchAll: async () => { set({ loading: true }); const data = await logisticsRepository.getShipments(); const c = await logisticsRepository.getCarriers(); set({ shipments: data || [], carriers: c || [], loading: false }); },
}));
export default useLogisticsStore;
