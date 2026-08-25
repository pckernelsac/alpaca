import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../providers/AuthProvider';
import { LoadingBlock } from '../ui/Primitives';

/** Espera a que se resuelva la sesión antes de decidir: si no, un reload
 *  con sesión válida rebota al login por un instante. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingBlock label="Verificando sesión" />;

  if (!isAuthenticated) {
    return <Navigate to="/ingresar" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
