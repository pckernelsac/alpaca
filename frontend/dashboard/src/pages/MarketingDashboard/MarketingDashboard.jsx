import { useEffect } from 'react';
import useMarketingStore from '@/stores/useMarketingStore';
import styles from './MarketingDashboard.module.css';

export default function MarketingDashboard() {
  const { campaigns, meta, loading, fetchAll } = useMarketingStore();

  useEffect(() => {
    fetchAll({ perPage: 5 });
  }, [fetchAll]);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard de Marketing</h2>
          <p className={styles.pageDesc}>Resumen de estrategias comerciales — Conectado a Backend NestJS API.</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => fetchAll({ perPage: 5 })}>
          <span className="material-symbols-outlined">refresh</span>
          Refrescar
        </button>
      </section>

      {loading ? (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando campañas de marketing desde la API REST...</p>
        </div>
      ) : (
        <div className={styles.card} style={{ marginTop: 20 }}>
          <h3 className={styles.cardTitle}>Campañas Promocionales ({meta.total || campaigns.length})</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Campaña</th>
                  <th>Canal</th>
                  <th>Presupuesto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>No hay campañas de marketing en PostgreSQL.</td>
                  </tr>
                ) : (
                  campaigns.map((c) => (
                    <tr key={c.id} className={styles.tableRow}>
                      <td>{c.name}</td>
                      <td>{c.channel || 'E-commerce'}</td>
                      <td>$ {Number(c.budget || 0).toFixed(2)}</td>
                      <td>{c.status || 'ACTIVA'}</td>
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
