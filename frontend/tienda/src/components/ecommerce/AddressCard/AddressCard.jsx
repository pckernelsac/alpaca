import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import styles from './AddressCard.module.css';

export default function AddressCard({ address, onEdit, onDelete, onSetDefault, className = '' }) {
  return (
    <div className={[styles.card, address.isDefault ? styles.default : '', className].filter(Boolean).join(' ')}>
      {address.isDefault && <span className={styles.defaultBadge}>Dirección predeterminada</span>}
      <div className={styles.content}>
        <p className={styles.name}>{address.name}</p>
        <p className={styles.line}>{address.street}</p>
        <p className={styles.line}>{address.city}, {address.state} {address.zip}</p>
        <p className={styles.line}>{address.country}</p>
        <p className={styles.phone}>{address.phone}</p>
      </div>
      <div className={styles.actions}>
        {!address.isDefault && onSetDefault && <button className={styles.action} onClick={() => onSetDefault(address.id)}>Establecer como predeterminada</button>}
        <button className={styles.iconBtn} onClick={() => onEdit(address)}><FiEdit2 size={16} /></button>
        <button className={styles.iconBtn} onClick={() => onDelete(address.id)}><FiTrash2 size={16} /></button>
      </div>
    </div>
  );
}