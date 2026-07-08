import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '@/components/common/ThemeToggle/ThemeToggle';
import logo from '@/assets/images/logo.png';
import styles from './Header.module.css';

const defaultLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/about', label: 'Nosotros' },
  { to: '/catalogo', label: 'Catalogo' },
  { to: '/promociones', label: 'Promociones' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Header({ links = defaultLinks, variant = 'sticky' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const headerClass = [styles.header, styles[variant], scrolled ? styles.scrolled : '']
    .filter(Boolean)
    .join(' ');

  const navClass = [styles.nav, menuOpen ? styles.navOpen : ''].filter(Boolean).join(' ');

  return (
    <header className={headerClass}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="ALPACART" className={styles.logoImg} />
        </Link>
        <nav className={navClass}>
          {links.map((link) => {
            const linkClass = [styles.link, location.pathname === link.to ? styles.active : '']
              .filter(Boolean)
              .join(' ');
            return (
              <Link key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className={styles.actions}>
          <ThemeToggle />
          <button className={styles.iconBtn} aria-label="Buscar">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className={styles.iconBtn} aria-label="Carrito">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
          <button
            className={[styles.hamburger, menuOpen ? styles.hamburgerOpen : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
