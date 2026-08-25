import { useEffect, useState } from 'react';
import { inventoryRepository } from '@/repositories/api';
import styles from './MovementList.module.css';

export default function MovementList() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');
      try {
        const res = await inventoryRepository.getMovements({ q: search || undefined });
        const list = res?.data || (Array.isArray(res) ? res : []);
        setMovements(list);
      } catch (err) {
        setError(err?.message || 'Error al cargar movimientos de inventario desde el backend');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search]);

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Movimientos de Inventario</h2>
          <p className={styles.pageDesc}>Historial de entradas, salidas y transferencias — Conectado a Backend NestJS API.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionPrimary} onClick={() => setSearch('')}>
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
            placeholder="Filtrar por movimiento o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando movimientos de inventario desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar movimientos del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && movements.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>swap_horiz</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No existen movimientos registrados</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>No hay transferencias ni ajustes en la base de datos PostgreSQL.</p>
        </div>
      )}

      {!loading && !error && movements.length > 0 && (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID Movimiento</th>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Producto / Ítem</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((m) => (
                  <tr key={m.id} className={styles.tableRow}>
                    <td className={styles.cellId}>#MOV-{m.id}</td>
                    <td className={styles.cellMuted}>{m.createdAt ? new Date(m.createdAt).toLocaleString() : 'N/A'}</td>
                    <td>
                      <span className={styles.typeBadge} style={{ backgroundColor: 'rgba(124, 84, 0, 0.1)', color: 'var(--color-primary)' }}>
                        {m.type || 'Transferencia'}
                      </span>
                    </td>
                    <td>Producto #{m.productId || m.stockItemId || 'N/A'}</td>
                    <td className={styles.cellQty}>{m.quantity || m.qty || 0} und.</td>
                    <td>
                      <span className={styles.statusLabel}>{m.status || 'Completado'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
