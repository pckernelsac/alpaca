import { useState } from 'react';
import Button from '@components/common/Button/Button';
import styles from './NewsletterForm.module.css';

export default function NewsletterForm({
  placeholder = 'Tu correo electrónico',
  buttonText = 'Suscribirse',
  onSubmit,
  className = '',
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      if (onSubmit) await onSubmit(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className={`${styles.form} ${className}`} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
          required
          disabled={status === 'loading'}
        />
        <Button type="submit" loading={status === 'loading'} disabled={status === 'loading'}>
          {buttonText}
        </Button>
      </div>
      {status === 'success' && <p className={styles.success}>¡Gracias por suscribirte!</p>}
      {status === 'error' && <p className={styles.error}>Ocurrió un error. Intenta de nuevo.</p>}
    </form>
  );
}