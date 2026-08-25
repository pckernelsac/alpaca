import { useEffect, useState } from 'react';
import { inventoryRepository } from '@/repositories/api';
import styles from './TransferList.module.css';

export default function TransferList() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');
      try {
        const res = await inventoryRepository.getTransfers({ q: search || undefined });
        const list = res?.data || (Array.isArray(res) ? res : []);
        setTransfers(list);
      } catch (err) {
        setError(err?.message || 'Error al cargar transferencias desde backend');
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
          <h2 className={styles.pageTitle}>Transferencias entre Almacenes</h2>
          <p className={styles.pageDesc}>Gestión de movimientos de inventario — Conectado a Backend NestJS API.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionBtn} onClick={() => setSearch('')}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span>
            Refrescar
          </button>
        </div>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.filterSearch}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-on-surface-variant)' }}>search</span>
          <input
            className={styles.filterInput}
            placeholder="Buscar por ID o Guía..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando transferencias textiles desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar transferencias del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && transfers.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>swap_horiz</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No existen transferencias de almacén</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>No hay traslados cargados en la base de datos PostgreSQL.</p>
        </div>
      )}

      {!loading && !error && transfers.length > 0 && (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID Transferencia</th>
                  <th>Fecha</th>
                  <th>Origen ➔ Destino</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((t) => (
                  <tr key={t.id} className={styles.tableRow}>
                    <td className={styles.tdId}>#TRF-{t.id}</td>
                    <td className={styles.tdDate}>{t.createdAt ? new Date(t.createdAt).toLocaleString() : 'N/A'}</td>
                    <td>
                      <div className={styles.routeCell}>
                        <span className={styles.routeOrigin}>{t.originWarehouse || 'Almacén Central'}</span>
                        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-outline)' }}>arrow_forward</span>
                        <span className={styles.routeDest}>{t.destinationWarehouse || 'Almacén Destino'}</span>
                      </div>
                    </td>
                    <td className={styles.tdDate}>{t.quantity || t.qty || 0} und.</td>
                    <td className={styles.thCenter}>
                      <span className={styles.statusBadge} style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>
                        {t.status || 'Completada'}
                      </span>
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
