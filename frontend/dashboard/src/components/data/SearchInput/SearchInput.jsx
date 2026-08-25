import { FiSearch, FiX } from 'react-icons/fi';
import styles from './SearchInput.module.css';

export default function SearchInput({ value, onChange, placeholder = 'Buscar...', className = '' }) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <FiSearch className={styles.icon} size={16} />
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange?.({ target: { value: '' } })}>
          <FiX size={14} />
        </button>
      )}
    </div>
  );
}
