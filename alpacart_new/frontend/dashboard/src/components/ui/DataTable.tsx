import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { IconArrowDown, IconArrowUp, IconChevronLeft, IconChevronRight } from './Icon';
import { EmptyState, Skeleton } from './Primitives';
import styles from './DataTable.module.css';

export interface Column<T> {
  key: string;
  header: string;
  /** Contenido de la celda. Sin esto se imprime `sortValue` o vacío. */
  render?: (row: T) => ReactNode;
  /** Valor de orden. Si falta, la columna no se puede ordenar. */
  sortValue?: (row: T) => string | number | null;
  align?: 'left' | 'right' | 'center';
  width?: string;
  /** Se oculta en pantallas angostas: la tabla mantiene lo esencial. */
  secondary?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  loading?: boolean;
  error?: string | null;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: T) => void;
  /** Columnas de la fila esqueleto mientras carga. */
  skeletonRows?: number;
}

type SortState = { key: string; direction: 'asc' | 'desc' } | null;

/**
 * Tabla de datos con orden en cliente.
 *
 * El orden es local a propósito: la API pagina del lado del servidor y solo
 * `/products` acepta `sort`, así que ordenar la página visible es honesto y
 * no promete un orden global que el backend no da.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  loading,
  error,
  emptyTitle = 'Sin resultados',
  emptyDescription,
  onRowClick,
  skeletonRows = 6,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState>(null);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((item) => item.key === sort.key);
    if (!column?.sortValue) return rows;

    const factor = sort.direction === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const left = column.sortValue!(a);
      const right = column.sortValue!(b);
      if (left === null || left === undefined) return 1;
      if (right === null || right === undefined) return -1;
      if (typeof left === 'number' && typeof right === 'number') return (left - right) * factor;
      return String(left).localeCompare(String(right), 'es') * factor;
    });
  }, [rows, sort, columns]);

  function toggleSort(key: string) {
    setSort((current) => {
      if (current?.key !== key) return { key, direction: 'asc' };
      if (current.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });
  }

  if (error) {
    return (
      <div className={styles.state}>
        <EmptyState title="No pudimos cargar la información" description={error} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => {
              const sortable = Boolean(column.sortValue);
              const active = sort?.key === column.key;
              return (
                <th
                  key={column.key}
                  scope="col"
                  style={{ width: column.width, textAlign: column.align ?? 'left' }}
                  className={column.secondary ? styles.secondary : undefined}
                  aria-sort={active ? (sort!.direction === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  {sortable ? (
                    <button
                      type="button"
                      className={[styles.sortButton, active && styles.sortActive]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => toggleSort(column.key)}
                    >
                      {column.header}
                      {active &&
                        (sort!.direction === 'asc' ? (
                          <IconArrowUp size={13} />
                        ) : (
                          <IconArrowDown size={13} />
                        ))}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {loading
            ? Array.from({ length: skeletonRows }).map((_, index) => (
                <tr key={`skeleton-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key} className={column.secondary ? styles.secondary : undefined}>
                      <Skeleton height="0.9rem" width={column.align === 'right' ? '3.5rem' : '70%'} />
                    </td>
                  ))}
                </tr>
              ))
            : sorted.map((row) => (
                <tr
                  key={rowKey(row)}
                  className={onRowClick ? styles.clickable : undefined}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={
                    onRowClick
                      ? (event) => {
                          if (event.key === 'Enter') onRowClick(row);
                        }
                      : undefined
                  }
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      style={{ textAlign: column.align ?? 'left' }}
                      className={column.secondary ? styles.secondary : undefined}
                    >
                      {column.render ? column.render(row) : (column.sortValue?.(row) ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>

      {!loading && sorted.length === 0 && (
        <div className={styles.state}>
          <EmptyState title={emptyTitle} description={emptyDescription} />
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Paginación                                                                 */
/* -------------------------------------------------------------------------- */
export function Pagination({
  page,
  totalPages,
  total,
  onChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  onChange: (next: number) => void;
}) {
  if (totalPages <= 1) {
    return (
      <div className={styles.pagination}>
        <span className={styles.count}>{total} registros</span>
      </div>
    );
  }

  return (
    <div className={styles.pagination}>
      <span className={styles.count}>
        {total} registros · página {page} de {totalPages}
      </span>
      <div className={styles.pageButtons}>
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          aria-label="Página anterior"
        >
          <IconChevronLeft size={16} />
        </button>
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Página siguiente"
        >
          <IconChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
