import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Field';
import { Alert } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';
import { ApiRequestError } from '../lib/api';
import { useAuth } from '../providers/AuthProvider';
import styles from './Page.module.css';

interface FieldErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export function Register() {
  usePageTitle('Crear cuenta');

  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  }

  /** Validación local antes de gastar un viaje al servidor. */
  function validate(): boolean {
    const errors: FieldErrors = {};
    if (form.first_name.trim().length < 2) errors.first_name = 'Ingresá tu nombre';
    if (form.last_name.trim().length < 2) errors.last_name = 'Ingresá tu apellido';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = 'Correo inválido';
    if (form.password.length < 8) errors.password = 'Mínimo 8 caracteres';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await register({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim() || undefined,
      });
      navigate('/cuenta', { replace: true });
    } catch (caught) {
      if (caught instanceof ApiRequestError && caught.details?.length) {
        const mapped: FieldErrors = {};
        caught.details.forEach((detail) => {
          mapped[detail.field as keyof FieldErrors] = detail.message;
        });
        setFieldErrors(mapped);
      }
      setError(caught instanceof ApiRequestError ? caught.message : 'No pudimos crear tu cuenta');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <div className={styles.authWrap}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>Creá tu cuenta</h1>
          <p className={styles.authSubtitle}>
            Guardá tus favoritos y seguí tus pedidos en un solo lugar.
          </p>

          <form className={styles.form} onSubmit={submit} noValidate>
            {error && <Alert tone="danger">{error}</Alert>}

            <div className={styles.formRow}>
              <Input
                label="Nombre"
                autoComplete="given-name"
                value={form.first_name}
                onChange={(event) => update('first_name', event.target.value)}
                error={fieldErrors.first_name}
                required
              />
              <Input
                label="Apellido"
                autoComplete="family-name"
                value={form.last_name}
                onChange={(event) => update('last_name', event.target.value)}
                error={fieldErrors.last_name}
                required
              />
            </div>

            <Input
              type="email"
              label="Correo electrónico"
              autoComplete="email"
              value={form.email}
              onChange={(event) => update('email', event.target.value)}
              error={fieldErrors.email}
              required
            />

            <Input
              type="password"
              label="Contraseña"
              autoComplete="new-password"
              value={form.password}
              onChange={(event) => update('password', event.target.value)}
              error={fieldErrors.password}
              hint="Al menos 8 caracteres"
              required
            />

            <Input
              type="tel"
              label="Teléfono (opcional)"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => update('phone', event.target.value)}
            />

            <Button type="submit" size="lg" fullWidth loading={submitting}>
              Crear cuenta
            </Button>
          </form>

          <p className={styles.authFoot}>
            ¿Ya tenés cuenta? <Link to="/ingresar">Ingresá</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
