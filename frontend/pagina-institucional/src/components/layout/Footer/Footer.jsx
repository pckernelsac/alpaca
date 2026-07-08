import { Link } from 'react-router-dom';
import NewsletterForm from '@/components/forms/NewsletterForm/NewsletterForm';
import logo from '@/assets/images/logo.png';
import styles from './Footer.module.css';

const defaultBrand = {
  name: 'ALPACART',
  tagline:
    'Preservando el legado textil andino a través del lujo sostenible y la maestría artesanal.',
};

const defaultColumns = [
  {
    title: 'Explorar',
    links: [
      { label: 'Nosotros', to: '/about' },
      { label: 'Catálogo', to: '/catalogo' },
      { label: 'Promociones', to: '/promociones' },
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
];

const defaultSocial = [
  { icon: 'public', label: 'Sitio web' },
  { icon: 'camera', label: 'Instagram' },
  { icon: 'share', label: 'Compartir' },
];

export default function Footer({
  brand = defaultBrand,
  columns = defaultColumns,
  social = defaultSocial,
  showNewsletter = false,
  copyright = '© 2024 ALPACART TEXTILES. DISENADO EN LOS ANDES, APRECIADO EN EL MUNDO.',
  className = '',
}) {
  const year = new Date().getFullYear();
  const updatedCopyright = copyright.replace('2024', String(year));

  return (
    <footer className={[styles.footer, className].filter(Boolean).join(' ')}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <span className={styles.logo}><img src={logo} alt={brand.name} className={styles.logoImg} /></span>
            {brand.tagline && <p className={styles.tagline}>{brand.tagline}</p>}
            {social && social.length > 0 && (
              <div className={styles.social}>
                {social.map((item, i) => (
                  <button key={i} className={styles.socialBtn} aria-label={item.label}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className={styles.linksGrid}>
            {columns.map((col, i) => (
              <div key={i} className={styles.linkCol}>
                {col.title && <h5 className={styles.colTitle}>{col.title}</h5>}
                {col.links && (
                  <ul className={styles.linkList}>
                    {col.links.map((link, j) => (
                      <li key={j}>
                        {link.external ? (
                          <a
                            href={link.to}
                            className={styles.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
              <div className={styles.linkCol}>
                <h5 className={styles.colTitle}>Newsletter</h5>
                <p className={styles.newsletterText}>Recibe ofertas exclusivas y novedades.</p>
                <NewsletterForm />
              </div>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>{updatedCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
