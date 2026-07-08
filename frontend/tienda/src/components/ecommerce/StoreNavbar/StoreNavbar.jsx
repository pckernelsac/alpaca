import { NavLink } from 'react-router-dom';
import styles from './StoreNavbar.module.css';

const categories = [
  { to: '/collection', label: 'Colecciones' },
  { to: '/category/ponchos', label: 'Ponchos' },
  { to: '/category/chompas', label: 'Chompas' },
  { to: '/category/bufandas', label: 'Bufandas' },
  { to: '/category/accesorios', label: 'Accesorios' },
  { to: '/category/abrigos', label: 'Abrigos' },
];

export default function StoreNavbar({ className = '' }) {
  return (
    <nav className={[styles.navbar, className].filter(Boolean).join(' ')}>
      <div className={styles.container}>
        {categories.map((cat) => (
          <NavLink key={cat.to} to={cat.to} className={({ isActive }) => [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')}>
            {cat.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}