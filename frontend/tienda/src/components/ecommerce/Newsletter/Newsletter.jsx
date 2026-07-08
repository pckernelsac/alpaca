import { useState } from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter({ title = 'Newsletter', description = 'Suscribete para recibir ofertas exclusivas.', className = '' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try { setStatus('success'); setEmail(''); } catch { setStatus('error'); }
  };
  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')}>
      <div className={styles.inner}>
        <div><h2 className={styles.title}>{title}</h2><p className={styles.desc}>{description}</p></div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Tu correo electronico" type="email" required disabled={status === 'loading'} />
          <button className={styles.btn} type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Enviando...' : 'Suscribirse'}</button>
        </form>
        {status === 'success' && <p className={styles.success}>Gracias por suscribirte</p>}
        {status === 'error' && <p className={styles.error}>Ocurrio un error</p>}
      </div>
    </section>
  );
}