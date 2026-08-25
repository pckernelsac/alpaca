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
  // Al carrito se llega sin cuenta; la sesión recién se pide acá, al pagar.
  // Decirlo evita que parezca que se perdió lo que ya había elegido.
  const desdeCheckout = from === '/checkout';

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
          <h1 className={styles.authTitle}>
            {desdeCheckout ? 'Último paso' : 'Bienvenido de vuelta'}
          </h1>
          <p className={styles.authSubtitle}>
            {desdeCheckout
              ? 'Ingresá para finalizar tu compra. Tu carrito te espera tal como lo armaste.'
              : 'Ingresá para ver tus pedidos y favoritos.'}
          </p>

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
            ¿Todavía no tenés cuenta?{' '}
            {/* El destino viaja con el link: si no, quien se registra desde acá
                termina en /cuenta y pierde el checkout que venía a pagar. */}
            <Link to="/registro" state={{ from }}>
              Creá una
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
