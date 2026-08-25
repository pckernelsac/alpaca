import { create } from 'zustand';
import { crmRepository } from '../repositories/api';

const useClientsStore = create((set) => ({
  clients: [],
  meta: { total: 0, page: 1, perPage: 25, totalPages: 1 },
  loading: false,
  error: null,
  fetchAll: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await crmRepository.getClients(params);
      const data = res?.data || (Array.isArray(res) ? res : []);
      const meta = res?.meta || { total: data.length, page: 1, perPage: 25, totalPages: 1 };
      set({ clients: data, meta, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Error al cargar listado de clientes', loading: false });
    }
  },
  create: async (d) => { const c = await crmRepository.createClient(d); set((s) => ({ clients: [...s.clients, c] })); },
  update: async (id, d) => { const u = await crmRepository.updateClient(id, d); set((s) => ({ clients: s.clients.map(x => x.id === id ? u : x) })); },
  delete: async (id) => { await crmRepository.deleteClient(id); set((s) => ({ clients: s.clients.filter(x => x.id !== id) })); },
}));
export default useClientsStore;

