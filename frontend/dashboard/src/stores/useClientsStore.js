import { create } from 'zustand';
import { crmRepository } from '../repositories/api';

const useClientsStore = create((set) => ({
  clients: [], loading: false,
  fetchAll: async () => { set({ loading: true }); const data = await crmRepository.getClients(); set({ clients: data || [], loading: false }); },
  create: async (d) => { const c = await crmRepository.createClient(d); set((s) => ({ clients: [...s.clients, c] })); },
  update: async (id, d) => { const u = await crmRepository.updateClient(id, d); set((s) => ({ clients: s.clients.map(x => x.id === id ? u : x) })); },
  delete: async (id) => { await crmRepository.deleteClient(id); set((s) => ({ clients: s.clients.filter(x => x.id !== id) })); },
}));
export default useClientsStore;
