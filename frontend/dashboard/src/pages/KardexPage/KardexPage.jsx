import { useEffect, useState } from 'react';
import { inventoryRepository } from '@/repositories/api';
import styles from './KardexPage.module.css';

export default function KardexPage() {
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
        setError(err?.message || 'Error al cargar kardex de transferencias textiles desde backend');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search]);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <nav className={styles.breadcrumbs}>
            <span>Inicio</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
            <span>Inventario</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Kardex</span>
          </nav>
          <h2 className={styles.pageTitle}>Kardex de Inventario Textil</h2>
          <p className={styles.pageDesc}>Trazabilidad de transferencias y movimientos de lotes — Conectado a Backend NestJS API.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionBtn} onClick={() => setSearch('')}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span>
            Refrescar
          </button>
        </div>
      </section>

      <section className={styles.filterGrid}>
        <div className={styles.filterItem}>
          <label className={styles.filterLabel}>Buscar Lote / Producto</label>
          <input
            className={styles.filterInput}
            placeholder="Filtrar por SKU o transferencia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando kardex de transferencias desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar kardex del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && transfers.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>receipt_long</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No existen transferencias en kardex</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>No se registran transferencias entre almacenes en PostgreSQL.</p>
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
                  <th>Ítem / Lote</th>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th className={styles.thRight}>Cantidad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((t) => (
                  <tr key={t.id} className={styles.tableRow}>
                    <td className={styles.cellMono}>#TRF-{t.id}</td>
                    <td>{t.createdAt ? new Date(t.createdAt).toLocaleString() : 'N/A'}</td>
                    <td>Ítem #{t.stockItemId || t.productId || 'N/A'}</td>
                    <td className={styles.reasonCell}>{t.originWarehouse || 'Almacén Central'}</td>
                    <td className={styles.reasonCell}>{t.destinationWarehouse || 'Almacén Destino'}</td>
                    <td className={styles.thRight}>
                      <strong>{t.quantity || t.qty || 0} und.</strong>
                    </td>
                    <td>
                      <span className={styles.typeBadge} style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>
                        {t.status || 'Completado'}
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
