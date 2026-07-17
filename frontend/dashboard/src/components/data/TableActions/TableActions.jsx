import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import styles from './TableActions.module.css';

export default function TableActions({ onEdit, onDelete, onView, className = '' }) {
  return (
    <div className={`${styles.actions} ${className}`}>
      {onView && (
        <button className={styles.btn} onClick={onView} title="Ver">
          <FiEye size={16} />
        </button>
      )}
      {onEdit && (
        <button className={styles.btn} onClick={onEdit} title="Editar">
          <FiEdit2 size={16} />
        </button>
      )}
      {onDelete && (
        <button className={`${styles.btn} ${styles.danger}`} onClick={onDelete} title="Eliminar">
          <FiTrash2 size={16} />
        </button>
      )}
    </div>
  );
}
