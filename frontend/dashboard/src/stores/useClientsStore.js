import { create } from 'zustand';
import repo from '../repositories/clients.js';
const useClientsStore = create((set) => ({ clients: [], loading: false, fetchAll: async () => { set({ loading: true }); const data = await repo.getAll(); set({ clients: data, loading: false }); }, create: async (d) => { const c = await repo.create(d); set((s) => ({ clients: [...s.clients, c] })); }, update: async (id, d) => { const u = await repo.update(id, d); set((s) => ({ clients: s.clients.map(x => x.id === id ? u : x) })); }, delete: async (id) => { await repo.delete(id); set((s) => ({ clients: s.clients.filter(x => x.id !== id) })); } }));
export default useClientsStore;
