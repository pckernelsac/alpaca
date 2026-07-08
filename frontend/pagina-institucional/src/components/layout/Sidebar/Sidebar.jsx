import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UIContext } from '@/context/UIContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import {
  FiHome,
  FiPackage,
  FiFolder,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiX,
} from 'react-icons/fi';
import styles from './Sidebar.module.css';

const links = [
  { to: '/', icon: FiHome, label: 'Inicio' },
  { to: '/products', icon: FiPackage, label: 'Productos' },
  { to: '/categories', icon: FiFolder, label: 'Categorías' },
  { to: '/orders', icon: FiShoppingCart, label: 'Pedidos' },
  { to: '/customers', icon: FiUsers, label: 'Clientes' },
  { to: '/reports', icon: FiBarChart2, label: 'Reportes' },
  { to: '/settings', icon: FiSettings, label: 'Configuración' },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useContext(UIContext);
  const ref = useClickOutside(() => {
    if (sidebarOpen) toggleSidebar();
  });

  return (
    <>
      {sidebarOpen && <div className={styles.overlay} onClick={toggleSidebar} />}
      <aside ref={ref} className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <span className={styles.logo}>Alpacart</span>
          <button className={styles.closeBtn} onClick={toggleSidebar}>
            <FiX size={20} />
          </button>
        </div>
        <nav className={styles.nav}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              onClick={toggleSidebar}
            >
              <link.icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
