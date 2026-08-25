import { FiFilter, FiX } from 'react-icons/fi';
import styles from './FiltersBar.module.css';

export default function FiltersBar({ children, filters, onFilterChange, activeFilters, className = '' }) {
  const hasActiveFilters = activeFilters && Object.values(activeFilters).some(Boolean);

  return (
    <div className={`${styles.bar} ${className}`}>
      <FiFilter className={styles.filterIcon} size={16} />
      {filters?.map((f) => (
        <select
          key={f.id}
          className={styles.select}
          value={activeFilters?.[f.id] || ''}
          onChange={(e) => onFilterChange?.(f.id, e.target.value)}
        >
          <option value="">{f.label}</option>
          {f.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ))}
      {children}
      {hasActiveFilters && (
        <button className={styles.clearBtn} onClick={() => onFilterChange?.('__clear__')}>
          <FiX size={14} />
          Limpiar
        </button>
      )}
    </div>
  );
}
