import SearchInput from '../SearchInput/SearchInput';
import styles from './TableToolbar.module.css';

export default function TableToolbar({ searchValue, onSearchChange, placeholder, className = '', children }) {
  return (
    <div className={`${styles.toolbar} ${className}`}>
      <div className={styles.left}>
        <SearchInput value={searchValue} onChange={onSearchChange} placeholder={placeholder} />
      </div>
      <div className={styles.right}>
        {children}
      </div>
    </div>
  );
}
