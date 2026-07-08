import { FiSearch } from 'react-icons/fi';
import styles from './EmptyState.module.css';

export default function EmptyState({ icon: Icon = FiSearch, title = 'No se encontraron resultados', description = 'Intenta con otros terminos de busqueda.', action, className = '' }) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <Icon className={styles.icon} size={48} />
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}