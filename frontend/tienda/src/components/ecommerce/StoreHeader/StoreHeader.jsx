import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '@/components/common/ThemeToggle/ThemeToggle';
import logo from '@/assets/images/logo.png';
import styles from './StoreHeader.module.css';

const navLinks = [
  { to: '/collection', label: 'Colecciones' },
  { to: '/category/materials', label: 'Materiales' },
  { to: '/category/nuevos', label: 'Nuevos' },
  { to: '/category/ofertas', label: 'Ofertas' },
];

function getLocalCount() {
  try { return JSON.parse(localStorage.getItem('tienda_cart') || '[]').reduce((s, i) => s + (i.quantity || 1), 0); }
  catch { return 0; }
}

export default function StoreHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getLocalCount());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const update = () => setCartCount(getLocalCount());
    window.addEventListener('storage', update);
    window.addEventListener('cart-updated', update);
    const interval = setInterval(update, 2000);
    return () => { window.removeEventListener('storage', update); window.removeEventListener('cart-updated', update); clearInterval(interval); };
  }, []);

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}><img src={logo} alt="ALPACART" className={styles.logoImg} /></Link>
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className={styles.link}>{link.label}</Link>
            ))}
          </nav>
        </div>
        <div className={styles.right}>
          <Link to="/search" className={styles.iconBtn} aria-label="Buscar"><span className="material-symbols-outlined">search</span></Link>
          <ThemeToggle />
          <Link to="/cart" className={styles.iconBtn} aria-label="Carrito">
            <span className="material-symbols-outlined">shopping_bag</span>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
          <Link to="/account" className={styles.iconBtn} aria-label="Cuenta"><span className="material-symbols-outlined">person</span></Link>
          <button className={styles.hamburger} onClick={() => setMenuOpen((prev) => !prev)} aria-label="Menu">
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>{link.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
