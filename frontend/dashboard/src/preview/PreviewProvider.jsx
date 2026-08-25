import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

const isPreview = import.meta.env.VITE_DASHBOARD_PREVIEW === 'true';

export default function PreviewProvider({ children }) {
  const { login } = useAuth();

  useEffect(() => {
    if (isPreview) {
      login('preview_token', {
        name: 'Admin Preview',
        email: 'preview@alpacart.com',
        role: 'Super Administrador',
      });
    }
  }, []);

  return children;
}
