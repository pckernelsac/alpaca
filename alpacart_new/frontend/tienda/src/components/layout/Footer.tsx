import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo-compact.png';

import { ApiRequestError, cmsApi } from '../../lib/api';
import { useToast } from '../../providers/ToastProvider';
import { Button } from '../ui/Button';
import { Input } from '../ui/Field';
import styles from './Footer.module.css';

const COLUMNS = [
  {
    title: 'Tienda',
    links: [
      { to: '/tienda', label: 'Todo el catálogo' },
      { to: '/colecciones', label: 'Colecciones' },
      { to: '/tienda?sort=recent', label: 'Novedades' },
      { to: '/favoritos', label: 'Mis favoritos' },
    ],
  },
  {
    title: 'La marca',
    links: [
      { to: '/nosotros', label: 'Nosotros' },
      { to: '/sostenibilidad', label: 'Sostenibilidad' },
      { to: '/contacto', label: 'Contacto' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { to: '/preguntas', label: 'Preguntas frecuentes' },
      { to: '/envios', label: 'Envíos' },
      { to: '/devoluciones', label: 'Devoluciones' },
      { to: '/terminos', label: 'Términos' },
      { to: '/privacidad', label: 'Privacidad' },
    ],
  },
];

export function Footer() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  async function subscribe(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;

    setSending(true);
    try {
      const result = await cmsApi.subscribe(email.trim());
      toast.success(
        result.alreadyRegistered ? 'Ya estabas suscrito, gracias' : 'Listo, quedaste suscrito',
      );
      setEmail('');
    } catch (error) {
      toast.error(
        error instanceof ApiRequestError ? error.message : 'No pudimos completar la suscripción',
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <footer className={styles.footer}>
      <section className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <div className={styles.newsletterCopy}>
              <h2>Del altiplano a tu puerta</h2>
              <p>
                Historias del taller, nuevas colecciones y acceso anticipado a las ediciones
                limitadas. Sin ruido.
              </p>
            </div>
            <form className={styles.newsletterForm} onSubmit={subscribe}>
              <Input
                type="email"
                className={styles.newsletterField}
                placeholder="tu@correo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                aria-label="Correo electrónico"
              />
              <Button type="submit" loading={sending}>
                Suscribirme
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.body}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo} aria-label="Alpacart, ir al inicio">
              <img src={logo} alt="Alpacart Textiles" className={`${styles.logoImg} brand-logo`} />
            </Link>
            <p className={styles.tagline}>
              Fibra de alpaca peruana trabajada por 140 familias de tejedores en Puno, Cusco y
              Arequipa. Comercio justo, esquila responsable, empaque sin plástico.
            </p>
            <p className={styles.est}>Est. 2018 · Arequipa, Perú</p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className={styles.columnTitle}>{column.title}</h3>
              <div className={styles.links}>
                {column.links.map((link) => (
                  <Link key={link.to + link.label} to={link.to} className={styles.link}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Alpacart Textiles S.A.C.
          </p>
          <div className={styles.meta}>
            <span>Perú</span>
            <span>PEN S/</span>
            <span>Español</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
