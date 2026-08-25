import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo-compact.png';

import { useCategories } from '../../hooks/useCatalog';
import { useAuth } from '../../providers/AuthProvider';
import { useCart } from '../../providers/CartProvider';
import { useTheme } from '../../providers/ThemeProvider';
import {
  IconBag,
  IconClose,
  IconHeart,
  IconMenu,
  IconMoon,
  IconSearch,
  IconSun,
  IconUser,
} from '../ui/Icon';
import styles from './Header.module.css';

const NAV = [
  { to: '/tienda', label: 'Tienda' },
  { to: '/colecciones', label: 'Colecciones' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/preguntas', label: 'Ayuda' },
];

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { count, openDrawer } = useCart();
  const { resolved, toggle } = useTheme();
  const { categories } = useCategories();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [term, setTerm] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Con el menú móvil abierto el fondo no debe desplazarse.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const value = term.trim();
    if (!value) return;
    navigate(`/tienda?search=${encodeURIComponent(value)}`);
    setSearchOpen(false);
    setMenuOpen(false);
    setTerm('');
  }

  return (
    <>
      <div className={styles.announce}>Envío gratis en pedidos mayores a S/500</div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.inner}>
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

            <button
              type="button"
              className={`${styles.iconButton} ${styles.burger}`}
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <IconMenu />
            </button>

            {/* El logo ya dice "Alpacart Textiles": repetir la bajada al lado
                sería decir dos veces lo mismo. */}
            <Link to="/" className={styles.logo} aria-label="Alpacart, ir al inicio">
              <img src={logo} alt="Alpacart Textiles" className={`${styles.logoImg} brand-logo`} />
            </Link>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => setSearchOpen((open) => !open)}
                aria-label="Buscar"
                aria-expanded={searchOpen}
              >
                <IconSearch />
              </button>

              <button
                type="button"
                className={styles.iconButton}
                onClick={toggle}
                aria-label={resolved === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              >
                {resolved === 'dark' ? <IconSun /> : <IconMoon />}
              </button>

              <Link to="/favoritos" className={styles.iconButton} aria-label="Favoritos">
                <IconHeart />
              </Link>

              <button
                type="button"
                className={styles.iconButton}
                onClick={openDrawer}
                aria-label={`Carrito${count > 0 ? `, ${count} productos` : ' vacío'}`}
              >
                <IconBag />
                {count > 0 && <span className={styles.count}>{count > 99 ? '99+' : count}</span>}
              </button>

              <Link
                to={isAuthenticated ? '/cuenta' : '/ingresar'}
                className={styles.iconButton}
                aria-label={isAuthenticated ? 'Mi cuenta' : 'Iniciar sesión'}
              >
                <IconUser />
              </Link>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className={styles.searchPanel}>
            <div className="container">
              <form className={styles.searchForm} onSubmit={submitSearch} role="search">
                <IconSearch size={24} />
                <input
                  ref={searchRef}
                  type="search"
                  className={styles.searchInput}
                  placeholder="Buscar prendas, colecciones…"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  aria-label="Buscar productos"
                />
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => setSearchOpen(false)}
                  aria-label="Cerrar buscador"
                >
                  <IconClose />
                </button>
              </form>
            </div>
          </div>
        )}

        {categories.length > 0 && (
          <div className={styles.categoryBar}>
            <div className="container">
              <div className={styles.categoryList}>
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.id}
                    to={`/tienda?category_id=${category.id}`}
                    className={styles.categoryLink}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className={styles.mobilePanel}>
          <div className="container">
            <div className={styles.mobileHead}>
              <Link
                to="/"
                className={styles.logo}
                onClick={() => setMenuOpen(false)}
                aria-label="Alpacart, ir al inicio"
              >
                <img src={logo} alt="Alpacart Textiles" className={`${styles.logoImg} brand-logo`} />
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
                <Link
                  key={item.to}
                  to={item.to}
                  className={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {categories.length > 0 && (
              <div className={styles.mobileSection}>
                <p className={styles.mobileSectionTitle}>Categorías</p>
                <div className={styles.mobileCategories}>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/tienda?category_id=${category.id}`}
                      className={styles.mobileCategory}
                      onClick={() => setMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
