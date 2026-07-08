import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UIContext } from '@/context/UIContext';
import { useAuth } from '@/hooks/useAuth';
import { FiMenu, FiLogOut, FiUser } from 'react-icons/fi';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { toggleSidebar } = useContext(UIContext);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar}>
          <FiMenu size={20} />
        </button>
        <Link to="/" className={styles.brand}>
          Alpacart
        </Link>
      </div>
      <div className={styles.right}>
        {isAuthenticated ? (
          <>
            <span className={styles.userName}>{user?.name}</span>
            <button className={styles.iconBtn}>
              <FiUser size={18} />
            </button>
            <button className={styles.iconBtn} onClick={logout}>
              <FiLogOut size={18} />
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.loginBtn}>
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
