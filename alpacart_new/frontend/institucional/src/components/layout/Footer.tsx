import { Link } from 'react-router-dom';

import logo from '../../assets/logo-compact.png';

import { TIENDA_URL } from '../../lib/api';
import { EMPRESA, REDES } from '../../lib/empresa';
import { Newsletter } from '../site/Newsletter';
import styles from './Footer.module.css';

const COLUMNAS = [
  {
    title: 'La casa',
    links: [
      { to: '/nosotros', label: 'Nosotros' },
      { to: '/proceso', label: 'El proceso' },
      { to: '/sostenibilidad', label: 'Sostenibilidad' },
      { to: '/diario', label: 'Diario' },
    ],
  },
  {
    title: 'Colecciones',
    links: [
      { to: '/colecciones', label: 'Todas las colecciones' },
      { to: '/colecciones#fibras', label: 'Nuestras fibras' },
      { to: '/servicios', label: 'Servicios' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { to: '/preguntas', label: 'Preguntas frecuentes' },
      { to: '/envios', label: 'Envíos' },
      { to: '/devoluciones', label: 'Devoluciones' },
      { to: '/contacto', label: 'Contacto' },
      { to: '/terminos', label: 'Términos' },
      { to: '/privacidad', label: 'Privacidad' },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Newsletter />

      <div className="container">
        <div className={styles.body}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo} aria-label="Alpacart, ir al inicio">
              <img src={logo} alt="Alpacart Textiles" className={`${styles.logoImg} brand-logo`} />
            </Link>
            <p className={styles.tagline}>
              Fibra de alpaca peruana trabajada por {EMPRESA.familias} familias de tejedores en{' '}
              {EMPRESA.talleres.join(', ')}. Comercio justo, esquila responsable y empaque sin
              plástico.
            </p>
            <a className={styles.shop} href={TIENDA_URL}>
              Ir a la tienda en línea
            </a>
          </div>

          {COLUMNAS.map((columna) => (
            <nav key={columna.title} aria-label={columna.title}>
              <h3 className={styles.columnTitle}>{columna.title}</h3>
              <div className={styles.links}>
                {columna.links.map((link) => (
                  <Link key={link.to + link.label} to={link.to} className={styles.link}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          ))}

          <div>
            <h3 className={styles.columnTitle}>Contacto</h3>
            <address className={styles.address}>
              {EMPRESA.direccion}
              <br />
              {EMPRESA.ciudad}
              <br />
              <a className={styles.link} href={`mailto:${EMPRESA.correo}`}>
                {EMPRESA.correo}
              </a>
              <br />
              <a className={styles.link} href={`tel:${EMPRESA.telefono.replace(/\s/g, '')}`}>
                {EMPRESA.telefono}
              </a>
            </address>
            <div className={styles.social}>
              {REDES.map((red) => (
                <a
                  key={red.label}
                  className={styles.link}
                  href={red.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {red.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {EMPRESA.nombre} · RUC {EMPRESA.ruc}
          </p>
          <p>
            Est. {EMPRESA.desde} · {EMPRESA.ciudad}
          </p>
        </div>
      </div>
    </footer>
  );
}
