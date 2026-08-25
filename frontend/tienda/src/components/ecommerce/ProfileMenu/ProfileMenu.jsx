import { NavLink, useNavigate } from 'react-router-dom';
import { FiUser, FiPackage, FiHeart, FiMapPin, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import styles from './ProfileMenu.module.css';

const links = [
  { to: '/account', icon: FiUser, label: 'Mi cuenta' },
  { to: '/order/history', icon: FiPackage, label: 'Mis pedidos' },
  { to: '/wishlist', icon: FiHeart, label: 'Lista de deseos' },
  { to: '/addresses', icon: FiMapPin, label: 'Direcciones' },
  { to: '/settings', icon: FiSettings, label: 'Configuración' },
];

export default function ProfileMenu({ userName = 'Usuario', className = '' }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        <button onClick={handleLogout} className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: '0.85rem', color: '#c00', marginTop: 16 }}>
          <FiLogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </nav>
  );
}
