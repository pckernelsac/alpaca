import { FiChevronUp, FiChevronDown, FiChevronsUp } from 'react-icons/fi';
import styles from './DataTable.module.css';

export default function DataTable({
  columns,
  data,
  onSort,
  sortKey,
  sortDir,
  selectedRows = [],
  onSelectionChange,
  className = '',
}) {
  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && !allSelected;

  function handleSort(column) {
    if (!column.sortable) return;
    const newDir = sortKey === column.key && sortDir === 'asc' ? 'desc' : 'asc';
    onSort?.(column.key, newDir);
  }

  function toggleAll() {
    if (allSelected) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(data.map((_, i) => i));
    }
  }

  function toggleRow(index) {
    const next = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];
    onSelectionChange?.(next);
  }

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            {onSelectionChange && (
              <th className={`${styles.th} ${styles.checkCell}`}>
                <label className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={allSelected}
                    ref={(el) => el && (el.indeterminate = someSelected)}
                    onChange={toggleAll}
                  />
                </label>
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`${styles.th} ${col.sortable ? styles.sortable : ''}`}
                onClick={() => handleSort(col)}
              >
                <span className={styles.thContent}>
                  {col.label}
                  {col.sortable && (
                    <span className={styles.sortIcon}>
                      {sortKey === col.key ? (
                        sortDir === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />
                      ) : (
                        <FiChevronsUp size={14} />
                      )}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              className={`${styles.row} ${rowIndex % 2 === 1 ? styles.striped : ''} ${selectedRows.includes(rowIndex) ? styles.selected : ''}`}
            >
              {onSelectionChange && (
                <td className={`${styles.td} ${styles.checkCell}`}>
                  <label className={styles.checkLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedRows.includes(rowIndex)}
                      onChange={() => toggleRow(rowIndex)}
                    />
                  </label>
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className={styles.td}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className={styles.emptyRow}>
          <p>No se encontraron registros</p>
        </div>
      )}
    </div>
  );
}
