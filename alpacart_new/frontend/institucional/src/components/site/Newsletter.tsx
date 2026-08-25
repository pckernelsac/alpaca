import { useState } from 'react';
import type { FormEvent } from 'react';

import { ApiRequestError, contactApi } from '../../lib/api';
import { useToast } from '../../providers/ToastProvider';
import { Button } from '../ui/Button';
import { Input } from '../ui/Field';
import styles from './Newsletter.module.css';

export function Newsletter({ source = 'institucional' }: { source?: string }) {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function suscribir(event: FormEvent) {
    event.preventDefault();
    const valor = email.trim();
    if (!valor) return;

    setEnviando(true);
    try {
      const resultado = await contactApi.subscribe(valor, source);
      toast.success(
        resultado.alreadyRegistered ? 'Ya estabas suscrito, gracias' : 'Listo, quedaste suscrito',
      );
      setEmail('');
    } catch (error) {
      toast.error(
        error instanceof ApiRequestError ? error.message : 'No pudimos completar la suscripción',
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className={styles.section} aria-labelledby="newsletter-titulo">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className="eyebrow">El Diario</p>
            <h2 id="newsletter-titulo" className={`display ${styles.title}`}>
              Historias del altiplano, una vez al mes
            </h2>
            <p className={styles.text}>
              Lo que pasa en el taller, las piezas que salen del telar y las ediciones limitadas
              antes de que se publiquen. Sin ruido.
            </p>
          </div>

          <form className={styles.form} onSubmit={suscribir}>
            <Input
              type="email"
              className={styles.field}
              placeholder="tu@correo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-label="Correo electrónico"
            />
            <Button type="submit" loading={enviando}>
              Suscribirme
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
