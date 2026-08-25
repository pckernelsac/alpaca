import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import logo from '../../assets/logo-compact.png';

import { TIENDA_URL } from '../../lib/api';
import { useTheme } from '../../providers/ThemeProvider';
import { IconArrowRight, IconClose, IconMenu, IconMoon, IconSun } from '../ui/Icon';
import styles from './Header.module.css';

const NAV = [
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/colecciones', label: 'Colecciones' },
  { to: '/proceso', label: 'El proceso' },
  { to: '/sostenibilidad', label: 'Sostenibilidad' },
  { to: '/diario', label: 'Diario' },
  { to: '/contacto', label: 'Contacto' },
];

export function Header() {
  const { pathname } = useLocation();
  const { resolved, toggle } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navegar cierra el menú: en móvil el panel tapa la página entera y quedaría
  // sobre el destino recién cargado.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className={styles.announce}>
        Tejido a mano en Puno, Cusco y Arequipa · Comercio justo desde 2018
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.inner}>
            <Link to="/" className={styles.logo} aria-label="Alpacart, ir al inicio">
              <img src={logo} alt="Alpacart Textiles" className={`${styles.logoImg} brand-logo`} />
            </Link>

            <nav className={styles.nav} aria-label="Principal">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.iconButton}
                onClick={toggle}
                aria-label={resolved === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              >
                {resolved === 'dark' ? <IconSun /> : <IconMoon />}
              </button>

              {/* La tienda es otra aplicación, en otro origen: <a>, no <Link>. */}
              <a className={styles.shopLink} href={TIENDA_URL}>
                Comprar
                <IconArrowRight size={16} />
              </a>

              <button
                type="button"
                className={`${styles.iconButton} ${styles.burger}`}
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menú"
                aria-expanded={menuOpen}
              >
                <IconMenu />
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.mobilePanel}>
          <div className="container">
            <div className={styles.mobileHead}>
              <Link to="/" className={styles.logo} aria-label="Alpacart, ir al inicio">
                <img
                  src={logo}
                  alt="Alpacart Textiles"
                  className={`${styles.logoImg} brand-logo`}
                />
              </Link>
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <IconClose />
              </button>
            </div>

            <nav className={styles.mobileNav} aria-label="Menú móvil">
              {NAV.map((item) => (
                <Link key={item.to} to={item.to} className={styles.mobileLink}>
                  {item.label}
                </Link>
              ))}
              <a className={styles.mobileShop} href={TIENDA_URL}>
                Ir a la tienda
                <IconArrowRight size={18} />
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
