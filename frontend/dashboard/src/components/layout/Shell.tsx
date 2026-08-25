import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import logoMark from '../../assets/logo-mark.png';

import { useAuth } from '../../providers/AuthProvider';
import { useTheme } from '../../providers/ThemeProvider';
import {
  IconBag,
  IconBoxes,
  IconChevronDown,
  IconGrid,
  IconLayout,
  IconList,
  IconLogout,
  IconMegaphone,
  IconMenu,
  IconMoon,
  IconSearch,
  IconSettings,
  IconShield,
  IconSun,
  IconTag,
  IconTruck,
  IconUsers,
} from '../ui/Icon';
import styles from './Shell.module.css';

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
}

const NAV: { title: string; items: NavItem[] }[] = [
  {
    title: 'General',
    items: [{ to: '/', label: 'Panel', icon: <IconGrid size={18} /> }],
  },
  {
    title: 'Comercio',
    items: [
      { to: '/productos', label: 'Productos', icon: <IconTag size={18} /> },
      { to: '/pedidos', label: 'Pedidos', icon: <IconBag size={18} /> },
      { to: '/inventario', label: 'Inventario', icon: <IconBoxes size={18} /> },
      { to: '/envios', label: 'Envíos', icon: <IconTruck size={18} /> },
    ],
  },
  {
    title: 'Personas',
    items: [
      { to: '/clientes', label: 'Clientes', icon: <IconUsers size={18} /> },
      { to: '/usuarios', label: 'Personal', icon: <IconShield size={18} /> },
    ],
  },
  {
    title: 'Gestión',
    items: [
      { to: '/contenido', label: 'Contenido', icon: <IconLayout size={18} /> },
      { to: '/marketing', label: 'Marketing', icon: <IconMegaphone size={18} /> },
      { to: '/auditoria', label: 'Auditoría', icon: <IconList size={18} /> },
      { to: '/ajustes', label: 'Ajustes', icon: <IconSettings size={18} /> },
    ],
  },
];

export function Shell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Al navegar en móvil el panel debe cerrarse solo; si no, tapa el contenido
  // al que acabás de ir.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className={styles.shell}>
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className={styles.main}>
        <Topbar onOpenMenu={() => setMobileOpen(true)} />
        <main className={styles.content} id="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className={styles.backdrop} onClick={onClose} role="presentation" />}
      <aside className={[styles.sidebar, open && styles.sidebarOpen].filter(Boolean).join(' ')}>
        <div className={styles.brand}>
          <img src={logoMark} alt="" className={`${styles.brandMark} brand-logo`} />
          <span className={styles.brandText}>
            Alpacart
            <small>Panel interno</small>
          </span>
        </div>

        <nav className={styles.nav}>
          {NAV.map((group) => (
            <div key={group.title} className={styles.navGroup}>
              <p className={styles.navTitle}>{group.title}</p>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [styles.navLink, isActive && styles.navLinkActive].filter(Boolean).join(' ')
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <a
          className={styles.storeLink}
          href="http://localhost:3200"
          target="_blank"
          rel="noreferrer"
        >
          Ver la tienda ↗
        </a>
      </aside>
    </>
  );
}

function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { resolved, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [term, setTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const value = term.trim();
    if (!value) return;
    // El buscador global busca pedidos por número: es lo que se busca a diario.
    navigate(`/pedidos?buscar=${encodeURIComponent(value)}`);
  }

  const initials = (user?.name ?? '?')
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return (
    <header className={styles.topbar}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={onOpenMenu}
        aria-label="Abrir navegación"
      >
        <IconMenu size={20} />
      </button>

      <form className={styles.search} onSubmit={submitSearch} role="search">
        <IconSearch size={16} />
        <input
          type="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Buscar pedido por número…"
          aria-label="Buscar pedido por número"
        />
      </form>

      <button
        type="button"
        className={styles.iconButton}
        onClick={toggle}
        aria-label={resolved === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      >
        {resolved === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
      </button>

      <div className={styles.profile} ref={menuRef}>
        <button
          type="button"
          className={styles.profileButton}
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <span className={styles.avatar}>{initials}</span>
          <span className={styles.profileText}>
            {user?.name}
            <small>{user?.role ?? user?.position ?? 'Personal'}</small>
          </span>
          <IconChevronDown size={16} />
        </button>

        {menuOpen && (
          <div className={styles.menu} role="menu">
            <p className={styles.menuEmail}>{user?.email}</p>
            <button type="button" className={styles.menuItem} onClick={logout} role="menuitem">
              <IconLogout size={16} />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

/** Encabezado de página: título, bajada y acciones. Lo usan todas las
 *  pantallas para que el ritmo vertical sea el mismo en todas. */
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        {description && <p className={styles.pageDescription}>{description}</p>}
      </div>
      {actions && <div className={styles.pageActions}>{actions}</div>}
    </div>
  );
}
