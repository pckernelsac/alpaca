import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Field';
import { Alert } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { ApiRequestError } from '../lib/api';
import { useAuth } from '../providers/AuthProvider';
import styles from './Page.module.css';

export function Login() {
  usePageTitle('Iniciar sesión');

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? '/cuenta';

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (caught) {
      setError(
        caught instanceof ApiRequestError ? caught.message : 'No pudimos iniciar tu sesión',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <div className={styles.authWrap}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>Bienvenido de vuelta</h1>
          <p className={styles.authSubtitle}>Ingresá para ver tus pedidos y favoritos.</p>

          <form className={styles.form} onSubmit={submit} noValidate>
            {error && <Alert tone="danger">{error}</Alert>}

            <Input
              type="email"
              label="Correo electrónico"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <Input
              type="password"
              label="Contraseña"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <Button type="submit" size="lg" fullWidth loading={submitting}>
              Ingresar
            </Button>
          </form>

          <p className={styles.authFoot}>
            ¿Todavía no tenés cuenta? <Link to="/registro">Creá una</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
