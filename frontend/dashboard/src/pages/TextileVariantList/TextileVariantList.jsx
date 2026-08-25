import { useEffect, useState } from 'react';
import { textileRepository } from '@/repositories/api';
import styles from './TextileVariantList.module.css';

export default function TextileVariantList() {
  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');
      try {
        const matRes = await textileRepository.getMaterials();
        const colRes = await textileRepository.getColors();
        setMaterials(matRes?.data || (Array.isArray(matRes) ? matRes : []));
        setColors(colRes?.data || (Array.isArray(colRes) ? colRes : []));
      } catch (err) {
        setError(err?.message || 'Error al cargar maestras textiles desde backend');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <div className={styles.headerLeft}>
          <h2 className={styles.pageTitle}>Especificaciones y Variantes Textiles</h2>
          <p className={styles.tdCategory}>Catálogo maestro de fibras (Baby Alpaca, Suri, Vicuña) y paletas de color — API REST NestJS.</p>
        </div>
      </div>

      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando maestros textiles desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar maestros textiles del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 20 }}>
          <div className={styles.tableWrap}>
            <h3 style={{ padding: '16px 20px', margin: 0, borderBottom: '1px solid var(--color-outline-variant)' }}>Tipos de Fibra / Materiales</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre de Material</th>
                  <th>Composición</th>
                </tr>
              </thead>
              <tbody>
                {materials.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: 20, color: 'var(--color-on-surface-variant)' }}>
                      No existen materiales textiles registrados en PostgreSQL.
                    </td>
                  </tr>
                ) : (
                  materials.map((m) => (
                    <tr key={m.id} className={styles.tableRow}>
                      <td className={styles.tdSku}>#MAT-{m.id}</td>
                      <td className={styles.tdProduct}>{m.name || m.label || 'Baby Alpaca Premium'}</td>
                      <td className={styles.tdMaterial}>{m.composition || '100% Alpaca'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.tableWrap}>
            <h3 style={{ padding: '16px 20px', margin: 0, borderBottom: '1px solid var(--color-outline-variant)' }}>Maestro de Colores Textiles</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Muestra</th>
                  <th>Nombre del Color</th>
                  <th>Código Hex</th>
                </tr>
              </thead>
              <tbody>
                {colors.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: 20, color: 'var(--color-on-surface-variant)' }}>
                      No existen colores textiles registrados en PostgreSQL.
                    </td>
                  </tr>
                ) : (
                  colors.map((c) => (
                    <tr key={c.id} className={styles.tableRow}>
                      <td className={styles.tdSku}>#CLR-{c.id}</td>
                      <td>
                        <span className={styles.colorDot} style={{ backgroundColor: c.hex || '#D4AF37' }} />
                      </td>
                      <td className={styles.tdProduct}>{c.name || 'Vicuña Gold'}</td>
                      <td className={styles.tdMaterial}>{c.hex || '#D4AF37'}</td>
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
