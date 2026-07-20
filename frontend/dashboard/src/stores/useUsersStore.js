import { create } from 'zustand';
import { iamRepository } from '../repositories/api';

const useUsersStore = create((set) => ({
  users: [], loading: false,
  fetchAll: async () => { set({ loading: true }); const data = await iamRepository.getUsers(); set({ users: data || [], loading: false }); },
  createUser: async (d) => { const c = await iamRepository.createUser(d); set((s) => ({ users: [...s.users, c] })); },
  updateUser: async (id, d) => { const u = await iamRepository.updateUser(id, d); set((s) => ({ users: s.users.map(u2 => u2.id === id ? u : u2) })); },
  deleteUser: async (id) => { await iamRepository.deleteUser(id); set((s) => ({ users: s.users.filter(u => u.id !== id) })); },
}));
export default useUsersStore;
