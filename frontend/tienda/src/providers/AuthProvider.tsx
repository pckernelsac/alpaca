import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { UNAUTHORIZED_EVENT, authApi, tokenStore } from '../lib/api';
import type { CustomerProfile } from '../lib/types';

interface AuthContextValue {
  user: CustomerProfile | null;
  isAuthenticated: boolean;
  /** true mientras se resuelve la sesión inicial; evita parpadeos de guardas. */
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    if (!tokenStore.get()) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      setUser(await authApi.me());
    } catch {
      tokenStore.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  // El cliente HTTP avisa cuando el backend rechaza el token.
  useEffect(() => {
    const onUnauthorized = () => setUser(null);
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const payload = await authApi.login(email, password);
    tokenStore.set(payload.accessToken);
    setUser(await authApi.me());
  }, []);

  const register = useCallback(
    async (input: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      phone?: string;
    }) => {
      const payload = await authApi.register(input);
      tokenStore.set(payload.accessToken);
      setUser(await authApi.me());
    },
    [],
  );

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      loading,
      login,
      register,
      logout,
      refresh: loadProfile,
    }),
    [user, loading, login, register, logout, loadProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}
