import { useEffect, useState } from 'react';
import { auditRepository } from '@/repositories/api';
import styles from './AuditLog.module.css';

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');
      try {
        const res = await auditRepository.getLogs({ q: search || undefined });
        const list = res?.data || (Array.isArray(res) ? res : []);
        setLogs(list);
      } catch (err) {
        setError(err?.message || 'Error al cargar logs de auditoría desde el backend');
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
          <h2 className={styles.pageTitle}>Logs de Auditoría del Sistema</h2>
          <p className={styles.pageDesc}>Registro trazable de eventos y acciones — Conectado a Backend NestJS API.</p>
        </div>
        <button className={styles.exportBtn} onClick={() => setSearch('')}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span>
          Refrescar
        </button>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-outline)' }}>search</span>
          <input
            className={styles.searchInput}
            placeholder="Filtrar por usuario, acción o IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 36, animation: 'spin 1s linear infinite' }}>sync</span>
          <p style={{ marginTop: 12, fontWeight: 500 }}>Cargando logs de auditoría desde la API REST...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ margin: '20px 0', padding: 20, backgroundColor: 'var(--color-error-container)', borderRadius: 12, border: '1px solid var(--color-error)' }}>
          <h4 style={{ color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <span className="material-symbols-outlined">error</span>
            Error al consultar logs de auditoría del backend
          </h4>
          <p style={{ margin: '8px 0 0', color: 'var(--color-on-surface)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && logs.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: 12, margin: '20px 0', border: '1px solid var(--color-outline-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-outline)' }}>manage_search</span>
          <h3 style={{ margin: '16px 0 8px', color: 'var(--color-on-surface)' }}>No existen logs de auditoría</h3>
          <p style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>No hay eventos registrados en PostgreSQL actualmente.</p>
        </div>
      )}

      {!loading && !error && logs.length > 0 && (
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Usuario</th>
                  <th>Módulo</th>
                  <th>Acción</th>
                  <th>IP / Dispositivo</th>
                  <th>Severidad</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className={styles.tableRow}>
                    <td className={styles.tdFecha}>{log.createdAt ? new Date(log.createdAt).toLocaleString() : 'N/A'}</td>
                    <td>
                      <span className={styles.userName}>{log.userName || log.userEmail || `User #${log.userId || 'N/A'}`}</span>
                    </td>
                    <td>
                      <span className={styles.moduleBadge} style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>
                        {log.module || 'ERP Core'}
                      </span>
                    </td>
                    <td><span className={styles.actionText}>{log.action || log.event || 'Evento de Sistema'}</span></td>
                    <td>
                      <span className={styles.ipText}>{log.ip || '192.168.1.1'}</span>
                    </td>
                    <td>
                      <span className={styles.severityBadge} style={{ backgroundColor: '#E6F4EA', color: '#137333' }}>
                        {log.severity || 'ÉXITO'}
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
