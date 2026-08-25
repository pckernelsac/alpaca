import { useEffect, useState } from 'react';
import { textileRepository } from '@/repositories/api';
import styles from './TextileDashboard.module.css';

export default function TextileDashboard() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await textileRepository.getMaterials();
        setMaterials(res?.data || (Array.isArray(res) ? res : []));
      } catch (err) {
        console.warn('Error al cargar maestras textiles:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard Textile Master Data</h2>
          <p className={styles.pageDesc}>Resumen de especificaciones técnicas de fibras textiles — Conectado a Backend NestJS API.</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => setLoading(true)}>
          <span className="material-symbols-outlined">refresh</span>
          Refrescar
        </button>
      </section>

      {loading ? (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando especificaciones textiles desde la API REST...</p>
        </div>
      ) : (
        <div className={styles.card} style={{ marginTop: 20 }}>
          <h3 className={styles.cardTitle}>Catálogo de Fibras Textiles ({materials.length})</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID Material</th>
                  <th>Nombre de la Fibra</th>
                  <th>Composición</th>
                </tr>
              </thead>
              <tbody>
                {materials.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: 20 }}>No hay fibras registradas en PostgreSQL.</td>
                  </tr>
                ) : (
                  materials.map((m) => (
                    <tr key={m.id} className={styles.tableRow}>
                      <td>#MAT-{m.id}</td>
                      <td>{m.name || 'Baby Alpaca'}</td>
                      <td>{m.composition || '100% Alpaca'}</td>
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
