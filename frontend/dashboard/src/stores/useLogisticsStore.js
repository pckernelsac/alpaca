import { create } from 'zustand';
import repo from '../repositories/logistics.js';
const useLogisticsStore = create((set) => ({ shipments: [], carriers: [], loading: false, fetchAll: async () => { set({ loading: true }); const data = await repo.getAll(); const c = await repo.getCarriers(); set({ shipments: data, carriers: c, loading: false }); } }));
export default useLogisticsStore;
