import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Alpacart
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>Inicio</Link>
          <Link to="/about" className={styles.link}>Nosotros</Link>
          <Link to="/services" className={styles.link}>Servicios</Link>
          <Link to="/contact" className={styles.link}>Contacto</Link>
        </nav>
      </div>
    </header>
  );
}