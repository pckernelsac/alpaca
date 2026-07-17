import { useState } from 'react';
import styles from './TransferList.module.css';

const kpiData = [
  { id: 1, label: 'Pendientes de Envío', value: '14', badge: 'Prioridad', badgeIcon: 'priority_high', accent: 'var(--color-primary)' },
  { id: 2, label: 'En Tránsito', value: '32', badge: '8 Críticos', badgeIcon: 'local_shipping', accent: 'var(--color-tertiary)' },
  { id: 3, label: 'Recibidos Hoy', value: '09', badge: '100% Ok', badgeIcon: 'check_circle', accent: 'var(--color-secondary)' },
];

const transfers = [
  { id: 'TR-2024-0892', date: '24/05/2024 09:15', origin: 'Arequipa HQ', destination: 'Cusco Planta', items: '45 Items', responsible: 'R. Mendoza', initials: 'RM', avatarBg: 'var(--color-primary-fixed)', status: 'En Tránsito', statusClass: 'transit' },
  { id: 'TR-2024-0891', date: '24/05/2024 08:30', origin: 'Lima Dist.', destination: 'Ica Almacén', items: '12 Items', responsible: 'L. Castro', initials: 'LC', avatarBg: 'var(--color-secondary-fixed)', status: 'Solicitada', statusClass: 'requested' },
  { id: 'TR-2024-0889', date: '23/05/2024 16:45', origin: 'Arequipa HQ', destination: 'Puno Planta 2', items: '128 Items', responsible: 'A. Vargas', initials: 'AV', avatarBg: 'var(--color-error-container)', status: 'Recibida', statusClass: 'received' },
  { id: 'TR-2024-0888', date: '23/05/2024 14:20', origin: 'Cusco HQ', destination: 'Lima Dist.', items: '56 Items', responsible: 'J. Salazar', initials: 'JS', avatarBg: 'var(--color-tertiary-fixed)', status: 'En Tránsito', statusClass: 'transit' },
  { id: 'TR-2024-0887', date: '22/05/2024 10:00', origin: 'Central', destination: 'Almacén B', items: '22 Items', responsible: 'O. Pérez', initials: 'OP', avatarBg: 'var(--color-outline-variant)', status: 'Archivado', statusClass: 'archived' },
  { id: 'TR-2024-0886', date: '21/05/2024 15:30', origin: 'Arequipa HQ', destination: 'Lima Dist.', items: '78 Items', responsible: 'M. Huamán', initials: 'MH', avatarBg: 'var(--color-primary-fixed)', status: 'En Tránsito', statusClass: 'transit' },
  { id: 'TR-2024-0885', date: '21/05/2024 09:00', origin: 'Cusco HQ', destination: 'Arequipa HQ', items: '34 Items', responsible: 'R. Mendoza', initials: 'RM', avatarBg: 'var(--color-primary-fixed)', status: 'Completada', statusClass: 'completed' },
  { id: 'TR-2024-0884', date: '20/05/2024 11:45', origin: 'Puno Planta 2', destination: 'Cusco HQ', items: '15 Items', responsible: 'L. Castro', initials: 'LC', avatarBg: 'var(--color-secondary-fixed)', status: 'Cancelada', statusClass: 'cancelled' },
];

const statusStyles = {
  transit: { bg: 'var(--color-tertiary-fixed)', fg: 'var(--color-on-tertiary-fixed-variant)' },
  requested: { bg: 'var(--color-primary-fixed)', fg: 'var(--color-on-primary-fixed-variant)' },
  received: { bg: 'var(--color-secondary-fixed)', fg: 'var(--color-on-secondary-fixed-variant)' },
  archived: { bg: 'var(--color-secondary-container)', fg: 'var(--color-on-secondary-container)' },
  completed: { bg: 'var(--color-success-container)', fg: 'var(--color-success)' },
  cancelled: { bg: 'var(--color-error-container)', fg: 'var(--color-error)' },
};

const timelineSteps = [
  { label: 'Solicitada', time: '24/05/2024 \u2022 09:15 AM', by: 'Por: R. Mendoza', done: true },
  { label: 'Autorizada', time: '24/05/2024 \u2022 10:45 AM', by: 'Por: Gerencia Almacén', done: true },
  { label: 'En Tránsito', time: '24/05/2024 \u2022 11:30 AM', by: 'Unidad: AB-234 (Externo)', active: true },
  { label: 'Llegada a Destino', time: 'Pendiente de registro', by: '', pending: true },
  { label: 'Recibida y Validada', time: 'Pendiente', by: '', pending: true },
];

export default function TransferList() {
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [search, setSearch] = useState('');

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Transferencias entre Almacenes</h2>
          <p className={styles.pageDesc}>Gestión de movimientos de inventario entre centros.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className={styles.kpiGrid}>
        {kpiData.map((kpi) => (
          <div key={kpi.id} className={styles.kpiCard}>
            <div className={styles.kpiAccent} style={{ backgroundColor: kpi.accent }} />
            <span className={styles.kpiLabel}>{kpi.label}</span>
            <div className={styles.kpiBottom}>
              <span className={styles.kpiValue}>{kpi.value}</span>
              <span className={styles.kpiBadge}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{kpi.badgeIcon}</span>
                {kpi.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainArea}>
        {/* Left: Table & Filters */}
        <div className={styles.tableSection}>
          {/* Filter Bar */}
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
            <select className={styles.filterSelect}>
              <option>Almacén Origen: Todos</option>
              <option>Arequipa Central</option>
              <option>Cusco Hilados</option>
              <option>Lima Distribución</option>
            </select>
            <select className={styles.filterSelect}>
              <option>Estado: Todos</option>
              <option>Solicitada</option>
              <option>Autorizada</option>
              <option>En Tránsito</option>
            </select>
            <div className={styles.filterDate}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_today</span>
              <span className={styles.filterDateText}>Últimos 7 días</span>
            </div>
            <button className={styles.filterAdvanced}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>filter_list</span>
              Filtros Avanzados
            </button>
          </div>

          {/* Table */}
          <div className={styles.tableCard}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID Transferencia</th>
                    <th>Fecha/Hora</th>
                    <th>Origen / Destino</th>
                    <th>Cant. SKUs</th>
                    <th>Responsable</th>
                    <th className={styles.thCenter}>Estado</th>
                    <th className={styles.thRight}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map((t, idx) => {
                    const s = statusStyles[t.statusClass] || {};
                    return (
                      <tr
                        key={t.id}
                        className={`${styles.tableRow} ${selectedTransfer === idx ? styles.tableRowSelected : ''}`}
                        onClick={() => setSelectedTransfer(idx === selectedTransfer ? null : idx)}
                      >
                        <td className={styles.tdId}>{t.id}</td>
                        <td className={styles.tdDate}>{t.date}</td>
                        <td>
                          <div className={styles.routeCell}>
                            <span className={styles.routeOrigin}>{t.origin}</span>
                            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-outline)' }}>arrow_forward</span>
                            <span className={styles.routeDest}>{t.destination}</span>
                          </div>
                        </td>
                        <td className={styles.tdDate}>{t.items}</td>
                        <td>
                          <div className={styles.responsibleCell}>
                            <div className={styles.responsibleAvatar} style={{ backgroundColor: t.avatarBg }}>
                              {t.initials}
                            </div>
                            <span>{t.responsible}</span>
                          </div>
                        </td>
                        <td className={styles.thCenter}>
                          <span className={styles.statusBadge} style={{ backgroundColor: s.bg, color: s.fg }}>
                            {t.status}
                          </span>
                        </td>
                        <td className={styles.thRight}>
                          <div className={styles.actionGroup}>
                            <button className={styles.actionBtn} title="Ver Detalle">
                              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</span>
                            </button>
                            <button className={styles.actionBtn} title="Imprimir Guía">
                              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>print</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className={styles.pagination}>
              <span className={styles.paginationInfo}>Mostrando 1-8 de 128 transferencias</span>
              <div className={styles.paginationControls}>
                <button className={styles.pageBtn}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
                </button>
                <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
                <button className={styles.pageBtn}>2</button>
                <button className={styles.pageBtn}>3</button>
                <button className={styles.pageBtn}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Detail Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarHeader}>
              <h4 className={styles.sidebarTitle}>Detalle de Operación</h4>
              <p className={styles.sidebarId}>
                {selectedTransfer !== null ? transfers[selectedTransfer].id : 'TR-2024-0892'}
              </p>
            </div>
            <div className={styles.sidebarBody}>
              <h5 className={styles.timelineLabel}>Línea de Tiempo</h5>
              <div className={styles.timeline}>
                <div className={styles.timelineLine} />
                {timelineSteps.map((step, i) => (
                  <div key={i} className={`${styles.timelineStep} ${step.pending ? styles.timelinePending : ''}`}>
                    <div className={`${styles.timelineDot} ${step.done ? styles.timelineDotDone : ''} ${step.active ? styles.timelineDotActive : ''} ${step.pending ? styles.timelineDotPending : ''}`}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                        {step.done ? 'check' : step.active ? 'local_shipping' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <div>
                      <p className={styles.stepLabel}>{step.label}</p>
                      <p className={styles.stepTime}>{step.time}</p>
                      {step.by && <p className={styles.stepBy}>{step.by}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini Map */}
              <div className={styles.shipDetail}>
                <h5 className={styles.timelineLabel}>Detalle del Envío</h5>
                <div className={styles.shipRow}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>pin_drop</span>
                  <div>
                    <p className={styles.shipLabel}>ORIGEN</p>
                    <p className={styles.shipText}>Almacén Central Arequipa, Av. Industrial 405</p>
                  </div>
                </div>
                <div className={styles.shipRow}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-tertiary)' }}>near_me</span>
                  <div>
                    <p className={styles.shipLabel}>DESTINO</p>
                    <p className={styles.shipText}>Planta Cusco Hilados, Sector Saylla Lote 12</p>
                  </div>
                </div>
                <div className={styles.mapPlaceholder}>
                  <div className={styles.mapOverlay}>
                    <span className="material-symbols-outlined">map</span>
                    Rastreo en Tiempo Real
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.sidebarFooter}>
              <button className={styles.sidebarBtnPrint}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>print</span>
                Imprimir Guía
              </button>
              <button className={styles.sidebarBtnMore}>
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
