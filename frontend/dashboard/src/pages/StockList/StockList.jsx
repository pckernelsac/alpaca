import { useEffect, useState } from 'react';
import useInventoryStore from '@/stores/useInventoryStore';
import styles from './StockList.module.css';

export default function StockList() {
  const { items, meta, loading, error, fetchAll } = useInventoryStore();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  useEffect(() => {
    fetchAll({ page, perPage, q: search || undefined });
  }, [fetchAll, page, perPage, search]);

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <div>
          <div className={styles.breadcrumbs}>
            <span>Gestión de Inventarios</span>
            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Stock en Vivo</span>
          </div>
          <h2 className={styles.pageTitle}>Gestión de Stock</h2>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.adjustBtn} onClick={() => fetchAll({ page, perPage, q: search })}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span>
            Refrescar
          </button>
        </div>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-on-surface-variant)' }}>search</span>
          <input
            className={styles.searchInput}
            placeholder="Buscar por código de producto o ID de inventario..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando existencias de stock desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar stock del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>inventory_2</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No existen ítems en inventario</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>No hay existencias registradas en PostgreSQL.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID Ítem</th>
                  <th>ID Producto</th>
                  <th>ID Variante</th>
                  <th className={styles.thRight}>Cantidad Fís.</th>
                  <th className={styles.thRight}>Reservado</th>
                  <th className={styles.thRight}>Stock Mínimo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const qty = Number(item.quantity || 0);
                  const min = Number(item.minStock || 0);
                  const isCritical = qty <= min;

                  return (
                    <tr key={item.id} className={styles.tableRow}>
                      <td className={styles.cellMono}>#STK-{item.id}</td>
                      <td>Producto #{item.productId || 'N/A'}</td>
                      <td className={styles.cellMuted}>Variante #{item.variantId || 'Genérico'}</td>
                      <td className={styles.tdRight}>
                        <strong style={{ color: isCritical ? 'var(--color-error)' : 'var(--color-primary)' }}>{qty} und.</strong>
                      </td>
                      <td className={styles.tdRight}>{item.reserved || 0} und.</td>
                      <td className={styles.tdRight}>{min} und.</td>
                      <td>
                        <span className={styles.statusBadge} style={{ backgroundColor: isCritical ? 'var(--color-error-container)' : '#dcfce7', color: isCritical ? 'var(--color-error)' : '#166534' }}>
                          {isCritical ? 'Stock Crítico' : 'Stock Óptimo'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              <span>Mostrando <strong>{items.length}</strong> de <strong>{meta.total || items.length}</strong> productos en stock</span>
            </div>
            <div className={styles.paginationBtns}>
              <button className={styles.pageBtn} disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
              </button>
              <span style={{ fontSize: 14, fontWeight: 500, padding: '0 8px' }}>
                Página {page} de {meta.totalPages || 1}
              </span>
              <button className={styles.pageBtn} disabled={page >= (meta.totalPages || 1)} onClick={() => setPage((p) => p + 1)}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
