import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.png';
import styles from './StoreFooter.module.css';

const columns = [
  {
    title: 'Tienda', links: [
      { label: 'Colecciones', to: '/collection' },
      { label: 'Catalogo', to: '/category/all' },
      { label: 'Accesorios', to: '/category/accesorios' },
      { label: 'Ofertas', to: '/category/ofertas' },
    ],
  },
  {
    title: 'Legado', links: [
      { label: 'Nosotros', to: '/about' },
      { label: 'Sostenibilidad', to: '/sustainability' },
      { label: 'Contacto', to: '/contact' },
    ],
  },
  {
    title: 'Ayuda', links: [
      { label: 'Envios', to: '/shipping' },
      { label: 'Devoluciones', to: '/care' },
      { label: 'Politicas', to: '/politicas' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
];

export default function StoreFooter({ className = '' }) {
  const year = new Date().getFullYear();
  return (
    <footer className={[styles.footer, className].filter(Boolean).join(' ')}>
      <div className={styles.grid}>
        <div className={styles.brandCol}>
          <Link to="/" className={styles.logo}><img src={logo} alt="ALPACART" className={styles.logoImg} /></Link>
          <p className={styles.est}>EST. 2024 &bull; PERÚ</p>
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="Sitio web"><span className="material-symbols-outlined">public</span></a>
            <a href="#" className={styles.socialLink} aria-label="Instagram"><span className="material-symbols-outlined">camera</span></a>
            <a href="#" className={styles.socialLink} aria-label="Chat"><span className="material-symbols-outlined">chat</span></a>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title} className={styles.linkCol}>
            <h4 className={styles.colTitle}>{col.title}</h4>
            <ul className={styles.linkList}>
              {col.links.map((link) => (
                <li key={link.label}><Link to={link.to} className={styles.link}>{link.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <p className={styles.copy}>&copy; {year} ALPACART TEXTILES. TODOS LOS DERECHOS RESERVADOS.</p>
        <div className={styles.selectors}>
          <span className={styles.selector}>PEN (S/)</span>
          <span className={styles.selector}>Español</span>
        </div>
      </div>
    </footer>
  );
}