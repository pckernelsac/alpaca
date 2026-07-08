import { NavLink } from 'react-router-dom';
import { FiUser, FiPackage, FiHeart, FiMapPin, FiSettings } from 'react-icons/fi';
import styles from './ProfileMenu.module.css';

const links = [
  { to: '/account', icon: FiUser, label: 'Mi cuenta' },
  { to: '/order/history', icon: FiPackage, label: 'Mis pedidos' },
  { to: '/wishlist', icon: FiHeart, label: 'Lista de deseos' },
  { to: '/addresses', icon: FiMapPin, label: 'Direcciones' },
  { to: '/settings', icon: FiSettings, label: 'Configuración' },
];

export default function ProfileMenu({ userName = 'Usuario', className = '' }) {
  return (
    <nav className={[styles.sidebar, className].filter(Boolean).join(' ')}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>{userName.charAt(0).toUpperCase()}</div>
        <span className={styles.userName}>{userName}</span>
      </div>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/account'} className={({ isActive }) => [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')}>
            <link.icon size={18} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}