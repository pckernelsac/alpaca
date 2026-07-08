import { storage } from '../storage';
import { TOKEN_KEY, USER_KEY } from '@/constants';

export function getToken() {
  return storage.get(TOKEN_KEY);
}

export function setToken(token) {
  storage.set(TOKEN_KEY, token);
}

export function removeToken() {
  storage.remove(TOKEN_KEY);
}

export function getUser() {
  return storage.get(USER_KEY);
}

export function setUser(user) {
  storage.set(USER_KEY, user);
}

export function removeUser() {
  storage.remove(USER_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}

export function logout() {
  removeToken();
  removeUser();
}
