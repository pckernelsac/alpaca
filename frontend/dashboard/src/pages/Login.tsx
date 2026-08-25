import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import logo from '../assets/logo-compact.png';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Field';
import { IconAlert } from '../components/ui/Icon';
import { Alert } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { ApiRequestError } from '../lib/api';
import { useAuth } from '../providers/AuthProvider';
import { useTheme } from '../providers/ThemeProvider';
import styles from './Login.module.css';

export function Login() {
  usePageTitle('Ingresar');
  const { login, isAuthenticated, loading: sessionLoading } = useAuth();
  const { resolved } = useTheme();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!sessionLoading && isAuthenticated) {
    const from = (location.state as { from?: string } | null)?.from;
    return <Navigate to={from ?? '/'} replace />;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (caught) {
      // Un 403 acá significa cuenta desactivada, no contraseña errada: vale la
      // pena distinguirlo o el usuario prueba la clave diez veces.
      setError(
        caught instanceof ApiRequestError ? caught.message : 'No pudimos iniciar tu sesión',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page} data-theme-hint={resolved}>
      <div className={styles.panel}>
        <div className={styles.brand}>
          <img src={logo} alt="Alpacart Textiles" className={`${styles.brandLogo} brand-logo`} />
          <p className={styles.brandSub}>Panel interno</p>
        </div>

        <h1 className={styles.title}>Ingresá a tu cuenta</h1>
        <p className={styles.subtitle}>
          Acceso exclusivo para el personal de Alpacart.
        </p>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          {error && (
            <Alert tone="danger" icon={<IconAlert size={16} />}>
              {error}
            </Alert>
          )}

          <Input
            label="Correo"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nombre@alpacart.com"
          />

          <Input
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
          />

          <Button type="submit" fullWidth loading={submitting}>
            Ingresar
          </Button>
        </form>

        <p className={styles.footer}>
          ¿Problemas para entrar? Escribí a sistemas@alpacart.com
        </p>
      </div>
    </div>
  );
}
