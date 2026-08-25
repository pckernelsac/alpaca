import { create } from 'zustand';
import { iamRepository } from '../repositories/api';

const useUsersStore = create((set) => ({
  users: [],
  meta: { total: 0, page: 1, perPage: 25, totalPages: 1 },
  loading: false,
  error: null,
  fetchAll: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await iamRepository.getUsers(params);
      const data = res?.data || (Array.isArray(res) ? res : []);
      const meta = res?.meta || { total: data.length, page: 1, perPage: 25, totalPages: 1 };
      set({ users: data, meta, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Error al cargar listado de usuarios IAM', loading: false });
    }
  },
  createUser: async (d) => { const c = await iamRepository.createUser(d); set((s) => ({ users: [...s.users, c] })); },
  updateUser: async (id, d) => { const u = await iamRepository.updateUser(id, d); set((s) => ({ users: s.users.map(u2 => u2.id === id ? u : u2) })); },
  deleteUser: async (id) => { await iamRepository.deleteUser(id); set((s) => ({ users: s.users.filter(u => u.id !== id) })); },
}));
export default useUsersStore;

