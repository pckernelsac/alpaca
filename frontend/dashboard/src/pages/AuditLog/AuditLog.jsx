import { useState } from 'react';
import styles from './AuditLog.module.css';

const kpis = [
  { id: 1, label: 'Total Eventos (24h)', value: '14,282', trend: '+12%', color: 'var(--color-primary)' },
  { id: 2, label: 'Alertas Críticas', value: '03', note: 'Revisión req.', color: 'var(--color-error)' },
  { id: 3, label: 'Usuarios Activos', value: '24', note: 'En vivo', color: 'var(--color-info)' },
  { id: 4, label: 'Última Actividad', value: 'Ahora', note: 'hace 2 min', color: 'var(--color-primary)' },
];

const logs = [
  { fecha: '24 Oct, 14:32:10', icon: 'history', iconColor: 'var(--color-tertiary)', user: 'Javier Delgado', initials: 'JD', avatarBg: 'var(--color-secondary-fixed)', module: 'Inventario', moduleBg: 'var(--color-tertiary-fixed)', moduleText: 'var(--color-on-tertiary-fixed-variant)', accion: 'Actualizó stock Alpaca Gold #22', ip: '192.168.1.45', device: 'Chrome / macOS', severity: 'exitosa', severityLabel: 'ÉXITO', severityBg: '#E6F4EA', severityText: '#137333', severityIcon: 'check_circle' },
  { fecha: '24 Oct, 13:15:04', icon: 'lock_reset', iconColor: 'var(--color-error)', user: 'Elena Vásquez', initials: 'EV', avatarBg: '', module: 'IAM', moduleBg: 'var(--color-secondary-fixed)', moduleText: 'var(--color-on-secondary-fixed-variant)', accion: 'Intento fallido de login', ip: '201.240.15.3', device: 'Mobile App / Android', severity: 'fallo', severityLabel: 'FALLO', severityBg: 'var(--color-error-container)', severityText: 'var(--color-on-error-container)', severityIcon: 'cancel' },
  { fecha: '24 Oct, 12:45:55', icon: 'edit', iconColor: 'var(--color-primary)', user: 'Roberto Castro', initials: 'RC', avatarBg: 'var(--color-primary-fixed)', module: 'Ventas', moduleBg: 'var(--color-surface-container-highest)', moduleText: 'var(--color-on-surface-variant)', accion: 'Eliminación de línea en Pedido #9021', ip: '192.168.1.102', device: 'Firefox / Windows', severity: 'advertencia', severityLabel: 'ADVERTENCIA', severityBg: '#FFF4E5', severityText: '#B76E00', severityIcon: 'error' },
  { fecha: '24 Oct, 11:20:18', icon: 'add_circle', iconColor: 'var(--color-tertiary)', user: 'Miguel Arana', initials: 'MA', avatarBg: 'var(--color-outline-variant)', module: 'Finanzas', moduleBg: 'var(--color-tertiary-fixed)', moduleText: 'var(--color-on-tertiary-fixed-variant)', accion: 'Aprobación de factura de exportación', ip: '192.168.1.22', device: 'Safari / iPadOS', severity: 'exitosa', severityLabel: 'ÉXITO', severityBg: '#E6F4EA', severityText: '#137333', severityIcon: 'check_circle' },
  { fecha: '24 Oct, 10:05:30', icon: 'description', iconColor: 'var(--color-primary)', user: 'Carmen Tapia', initials: 'CT', avatarBg: 'var(--color-outline-variant)', module: 'Catalogos', moduleBg: 'var(--color-surface-container-highest)', moduleText: 'var(--color-on-surface-variant)', accion: 'Exportó catálogo de productos', ip: '192.168.1.67', device: 'Chrome / Windows', severity: 'info', severityLabel: 'INFO', severityBg: '#E8EFF9', severityText: '#1A5A9C', severityIcon: 'info' },
  { fecha: '24 Oct, 09:12:44', icon: 'delete_forever', iconColor: 'var(--color-error)', user: 'Luis Huamán', initials: 'LH', avatarBg: 'var(--color-secondary-fixed)', module: 'IAM', moduleBg: 'var(--color-error-container)', moduleText: 'var(--color-on-error-container)', accion: 'Eliminó usuario inactivo #342', ip: '192.168.1.88', device: 'Edge / Windows', severity: 'critico', severityLabel: 'CRÍTICO', severityBg: 'var(--color-error)', severityText: 'var(--color-on-primary)', severityIcon: 'warning' },
];

const severityConfig = {
  exitosa: { bg: '#E6F4EA', text: '#137333', icon: 'check_circle' },
  fallo: { bg: 'var(--color-error-container)', text: 'var(--color-on-error-container)', icon: 'cancel' },
  advertencia: { bg: '#FFF4E5', text: '#B76E00', icon: 'error' },
  info: { bg: '#E8EFF9', text: '#1A5A9C', icon: 'info' },
  critico: { bg: '#ef4444', text: '#ffffff', icon: 'warning' },
};

const modules = ['Todos', 'Inventario', 'Ventas', 'IAM', 'Finanzas', 'Catálogos'];

export default function AuditLog() {
  const [search, setSearch] = useState('');
  const [module, setModule] = useState('Todos');
  const [action, setAction] = useState('Todas');

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Logs de Auditoría</h2>
          <p className={styles.pageDesc}>
            Registro histórico de todas las acciones ejecutadas en el sistema para fines de cumplimiento y seguridad.
          </p>
        </div>
        <button className={styles.exportBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
          Exportar CSV/PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <div key={kpi.id} className={styles.kpiCard}>
            <div className={styles.kpiAccent} style={{ backgroundColor: kpi.color }} />
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>{kpi.label}</p>
              <div className={styles.kpiRow}>
                <span className={styles.kpiValue}>{kpi.value}</span>
                {kpi.trend && (
                  <span className={styles.kpiTrend}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_up</span>
                    {kpi.trend}
                  </span>
                )}
                {kpi.note && <span className={styles.kpiNote}>{kpi.note}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Toolbar */}
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
        <div className={styles.filterActions}>
          <select className={styles.filterSelect} value={module} onChange={(e) => setModule(e.target.value)}>
            <option>Módulo: Todos</option>
            {modules.filter(m => m !== 'Todos').map(m => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select className={styles.filterSelect} value={action} onChange={(e) => setAction(e.target.value)}>
            <option>Acción: Todas</option>
            <option>Crear</option>
            <option>Editar</option>
            <option>Eliminar</option>
            <option>Login</option>
          </select>
          <button className={styles.dateBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_today</span>
            01/10/23 - 31/10/23
          </button>
          <button className={styles.applyBtn}>Aplicar Filtros</button>
        </div>
      </div>

      {/* Audit Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Timeline</th>
                <th>Usuario</th>
                <th>Módulo</th>
                <th>Acción</th>
                <th>Detalles</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => {
                const sev = severityConfig[log.severity] || severityConfig.info;
                const initials = log.user.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                return (
                  <tr key={i} className={styles.tableRow}>
                    <td className={styles.tdFecha}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: log.iconColor }}>{log.icon}</span>
                      <span>{log.fecha}</span>
                    </td>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar} style={{ backgroundColor: log.avatarBg || 'var(--color-surface-container)' }}>
                          {log.user.includes('Elena') ? (
                            <span>EV</span>
                          ) : (
                            <span>{initials}</span>
                          )}
                        </div>
                        <span className={styles.userName}>{log.user}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.moduleBadge} style={{ backgroundColor: log.moduleBg, color: log.moduleText }}>
                        {log.module}
                      </span>
                    </td>
                    <td><span className={styles.actionText}>{log.accion}</span></td>
                    <td>
                      <div className={styles.detailsCol}>
                        <span className={styles.ipText}>{log.ip}</span>
                        <span className={styles.deviceText}>{log.device}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.severityBadge} style={{ backgroundColor: sev.bg, color: sev.text }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}>{sev.icon}</span>
                        {log.severityLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            <span>Mostrando <strong>1 - 25</strong> de <strong>1,402</strong> registros</span>
            <select className={styles.perPage}>
              <option>25 por página</option>
              <option>50 por página</option>
              <option>100 por página</option>
            </select>
          </div>
          <div className={styles.paginationBtns}>
            <button className={styles.pageBtn} disabled>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_left</span>
            </button>
            <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageEllipsis}>...</span>
            <button className={styles.pageBtn}>56</button>
            <button className={styles.pageBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerBadge}>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>verified_user</span>
          Certificado de Cumplimiento Alpaca-Security v4.2
        </div>
      </div>

      {/* FAB */}
      <div className={styles.fab}>
        <button className={styles.fabBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>priority_high</span>
        </button>
        <div className={styles.fabTooltip}>
          Generar Reporte de Incidente
        </div>
      </div>
    </div>
  );
}
