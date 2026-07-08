import { createContext, useState, useCallback } from 'react';
import { isAuthenticated as checkAuth, setToken, setUser, removeToken, removeUser, getUser } from '@/services/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

  const login = useCallback((token, userData) => {
    setToken(token);
    setUser(userData);
    setUserState(userData);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    removeUser();
    setUserState(null);
    setIsAuthenticated(false);
  }, []);

  const value = { user, isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}