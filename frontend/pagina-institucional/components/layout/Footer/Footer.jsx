import { Link } from 'react-router-dom';
import NewsletterForm from '@components/forms/NewsletterForm/NewsletterForm';
import styles from './Footer.module.css';

export default function Footer({
  columns = [
    {
      title: 'Alpacart',
      links: [
        { label: 'Inicio', to: '/' },
        { label: 'Nosotros', to: '/about' },
        { label: 'Catálogo', to: '/catalogo' },
        { label: 'Contacto', to: '/contacto' },
      ],
    },
    {
      title: 'Ayuda',
      links: [
        { label: 'Preguntas Frecuentes', to: '/preguntas' },
        { label: 'Términos y Condiciones', to: '/terminos' },
        { label: 'Políticas de Privacidad', to: '/politicas' },
      ],
    },
    {
      title: 'Contacto',
      links: [
        { label: 'info@alpacart.com', to: 'mailto:info@alpacart.com', external: true },
        { label: '+51 999 888 777', to: 'tel:+51999888777', external: true },
      ],
    },
  ],
  showNewsletter = true,
  className = '',
}) {
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${className}`}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {columns.map((col, i) => (
            <div key={i} className={styles.column}>
              {col.title && <h4 className={styles.colTitle}>{col.title}</h4>}
              {col.links && (
                <ul className={styles.links}>
                  {col.links.map((link, j) => (
                    <li key={j}>
                      {link.external ? (
                        <a href={link.to} className={styles.link}>
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.to} className={styles.link}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {showNewsletter && (
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Newsletter</h4>
              <p className={styles.newsletterText}>
                Suscríbete para recibir ofertas exclusivas.
              </p>
              <NewsletterForm />
            </div>
          )}
        </div>
        <div className={styles.bottom}>
          <p className={styles.copy}>&copy; {year} Alpacart. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}