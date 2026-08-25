import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UIContext } from '@/context/UIContext';
import { useAuth } from '@/hooks/useAuth';
import { FiMenu, FiSearch, FiHelpCircle, FiSettings, FiBell, FiLogOut, FiUser, FiPlus } from 'react-icons/fi';
import styles from './Navbar.module.css';

const pageActions = {
  '/catalog/productos': { label: 'Crear Producto', to: '/catalog/productos/nuevo' },
  '/catalog/variantes': { label: 'Nueva Variante', to: '/catalog/variantes/nueva' },
  '/crm/clientes': { label: 'Nuevo Cliente', to: '/crm/clientes/nuevo' },
  '/usuarios': { label: 'Nuevo Usuario', to: '/usuarios/nuevo' },
  '/orders/list': { label: 'Nuevo Pedido', to: '/orders/list' },
};

export default function Navbar() {
  const { toggleSidebar } = useContext(UIContext);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);

  const cta = Object.entries(pageActions).find(([path]) => location.pathname.startsWith(path));
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar} aria-label="Menú">
          <FiMenu size={20} />
        </button>
        <div className={`${styles.searchWrap} ${searchFocused ? styles.searchFocused : ''}`}>
          <FiSearch size={16} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Buscar en el sistema..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>
      <div className={styles.right}>
        {cta && (
          <Link to={cta[1].to} className={styles.ctaBtn}>
            <FiPlus size={16} />
            <span className={styles.ctaLabel}>{cta[1].label}</span>
          </Link>
        )}
        <button className={styles.iconBtn} aria-label="Ayuda">
          <FiHelpCircle size={18} />
        </button>
        <button className={styles.iconBtn} aria-label="Configuración">
          <FiSettings size={18} />
        </button>
        <button className={styles.iconBtn} aria-label="Notificaciones">
          <FiBell size={18} />
          <span className={styles.notifDot} />
        </button>
        <div className={styles.divider} />
        {isAuthenticated ? (
          <div className={styles.userArea}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name || 'Administrador'}</span>
              <span className={styles.userRole}>Administrador</span>
            </div>
            <button className={styles.logoutBtn} onClick={logout} aria-label="Cerrar sesión">
              <FiLogOut size={16} />
            </button>
          </div>
        ) : (
          <Link to="/login" className={styles.loginBtn}>
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
