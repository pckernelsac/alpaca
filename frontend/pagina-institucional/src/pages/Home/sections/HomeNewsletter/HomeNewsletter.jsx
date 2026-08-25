import { useState } from 'react';
import { useNewsletter } from '@/hooks/useNewsletter';
import styles from './HomeNewsletter.module.css';

export default function HomeNewsletter() {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const { subscribe, loading, success, error: apiError, reset } = useNewsletter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    if (!email.trim()) {
      setValidationError('Ingrese su correo electrónico.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setValidationError('Ingrese un correo electrónico válido.');
      return;
    }
    const ok = await subscribe(email.trim(), 'home_footer');
    if (ok) {
      setEmail('');
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <h2 className={styles.title}>El Diario</h2>
          <p className={styles.desc}>
            Mantente conectado con las historias de los Andes, los lanzamientos de nuevas colecciones
            y nuestras iniciativas de sostenibilidad.
          </p>
        </div>

        {success ? (
          <div style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
            <p>¡Gracias por suscribirte a El Diario!</p>
            <button
              onClick={() => reset()}
              style={{
                background: 'transparent',
                border: 'none',
                textDecoration: 'underline',
                cursor: 'pointer',
                marginTop: 8,
                color: 'inherit',
                fontSize: '0.85rem',
              }}
              type="button"
            >
              Suscribir otro correo
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <input
                  className={styles.input}
                  placeholder="TU CORREO ELECTRONICO"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  disabled={loading}
                />
                <button className={styles.btn} type="submit" disabled={loading}>
                  {loading ? 'ENVIANDO...' : 'SUSCRIBIRSE'}
                </button>
              </div>
              {validationError && (
                <span style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: 4 }}>
                  {validationError}
                </span>
              )}
              {apiError && (
                <span style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: 4 }}>
                  {apiError?.message || 'Error al suscribir correo. Intente nuevamente.'}
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
