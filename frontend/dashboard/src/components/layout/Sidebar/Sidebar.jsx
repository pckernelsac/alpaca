import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UIContext } from '@/context/UIContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { FiHome, FiGrid, FiPackage, FiShoppingCart, FiUsers, FiDollarSign, FiTruck, FiLayers, FiBarChart2, FiShield, FiSettings, FiDatabase, FiBookOpen, FiMonitor, FiCamera, FiUserCheck, FiChevronDown, FiX, FiSend, FiImage, FiPlus } from 'react-icons/fi';
import styles from './Sidebar.module.css';

const sections = [
  {
    label: 'General',
    items: [
      { to: '/', icon: FiHome, label: 'Panel de Control' },
    ],
  },
  {
    label: 'Catálogo',
    items: [
      { to: '/catalog', icon: FiGrid, label: 'Dashboard' },
      { to: '/catalog/productos', icon: FiPackage, label: 'Productos' },
      { to: '/catalog/variantes', icon: FiLayers, label: 'Variantes' },
    ],
  },
  {
    label: 'Pedidos',
    items: [
      { to: '/orders', icon: FiShoppingCart, label: 'Dashboard' },
      { to: '/orders/list', icon: FiBookOpen, label: 'Pedidos' },
    ],
  },
  {
    label: 'CRM',
    items: [
      { to: '/crm', icon: FiUsers, label: 'Dashboard' },
      { to: '/crm/clientes', icon: FiUserCheck, label: 'Clientes' },
    ],
  },
  {
    label: 'Pagos',
    items: [
      { to: '/payments', icon: FiDollarSign, label: 'Dashboard' },
      { to: '/payments/transactions', icon: FiSend, label: 'Transacciones' },
    ],
  },
  {
    label: 'Inventario',
    items: [
      { to: '/inventory', icon: FiLayers, label: 'Dashboard' },
      { to: '/inventory/stock', icon: FiPackage, label: 'Stock' },
      { to: '/inventory/kardex', icon: FiBookOpen, label: 'Kardex' },
    ],
  },
  {
    label: 'Logística',
    items: [
      { to: '/logistics', icon: FiTruck, label: 'Dashboard' },
      { to: '/logistics/envios', icon: FiSend, label: 'Envíos' },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { to: '/marketing', icon: FiMonitor, label: 'Dashboard' },
      { to: '/marketing/campanas', icon: FiCamera, label: 'Campañas' },
    ],
  },
  {
    label: 'CMS',
    items: [
      { to: '/cms', icon: FiBookOpen, label: 'Dashboard' },
      { to: '/cms/contenido', icon: FiImage, label: 'Contenido' },
    ],
  },
  {
    label: 'Textil',
    items: [
      { to: '/textile', icon: FiGrid, label: 'Dashboard' },
      { to: '/textile/transferencias', icon: FiSend, label: 'Transferencias' },
      { to: '/textil/variantes', icon: FiLayers, label: 'Variantes' },
    ],
  },
  {
    label: 'Usuarios',
    items: [
      { to: '/usuarios', icon: FiUsers, label: 'Usuarios' },
      { to: '/usuarios/roles', icon: FiUserCheck, label: 'Roles' },
      { to: '/usuarios/permisos', icon: FiShield, label: 'Permisos' },
      { to: '/mi-perfil', icon: FiUserCheck, label: 'Mi Perfil' },
    ],
  },
  {
    label: 'Analítica',
    items: [
      { to: '/analytics', icon: FiBarChart2, label: 'Dashboard' },
      { to: '/audit', icon: FiShield, label: 'Auditoría' },
    ],
  },
  {
    label: 'Configuración',
    items: [
      { to: '/settings', icon: FiSettings, label: 'Configuración' },
      { to: '/datos-maestros', icon: FiDatabase, label: 'Datos Maestros' },
    ],
  },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, collapsedSections, toggleSection } = useContext(UIContext);
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
          {sections.map((section) => {
            const isCollapsed = collapsedSections[section.label] ?? false;
            return (
              <div key={section.label} className={styles.group}>
                <button
                  className={styles.groupHeader}
                  onClick={() => toggleSection(section.label)}
                >
                  <span className={styles.groupLabel}>{section.label}</span>
                  <FiChevronDown
                    size={14}
                    className={`${styles.chevron} ${!isCollapsed ? styles.chevronOpen : ''}`}
                  />
                </button>
                {!isCollapsed && section.items.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.active : ''}`
                    }
                    onClick={() => { if (sidebarOpen) toggleSidebar(); }}
                  >
                    <link.icon size={18} />
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
