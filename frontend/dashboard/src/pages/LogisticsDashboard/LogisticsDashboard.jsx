import { useEffect } from 'react';
import useLogisticsStore from '@/stores/useLogisticsStore';
import styles from './LogisticsDashboard.module.css';

export default function LogisticsDashboard() {
  const { shipments, meta, loading, fetchAll } = useLogisticsStore();

  useEffect(() => {
    fetchAll({ perPage: 5 });
  }, [fetchAll]);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard Logístico</h2>
          <p className={styles.pageDesc}>Resumen de guías de despacho y couriers — Conectado a Backend NestJS API.</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => fetchAll({ perPage: 5 })}>
          <span className="material-symbols-outlined">refresh</span>
          Refrescar
        </button>
      </section>

      {loading ? (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando despachos logísticos desde la API REST...</p>
        </div>
      ) : (
        <div className={styles.card} style={{ marginTop: 20 }}>
          <h3 className={styles.cardTitle}>Despachos Recientes ({meta.total || shipments.length})</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Waybill / Guía</th>
                  <th>Transportista</th>
                  <th>Ruta</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {shipments.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>No hay guías logísticas en PostgreSQL.</td>
                  </tr>
                ) : (
                  shipments.map((s) => (
                    <tr key={s.id} className={styles.tableRow}>
                      <td>{s.waybill || `#GUI-${s.id}`}</td>
                      <td>{s.carrier || 'DHL Express'}</td>
                      <td>{s.originCity || 'Lima'} ➔ {s.destinationCity || 'Destino'}</td>
                      <td>{s.status || 'EN TRÁNSITO'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
