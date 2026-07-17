import { useState } from 'react';
import styles from './OrderDashboard.module.css';

const kpiCards = [
  { label: 'Pendientes', value: '124', trend: '+12%', icon: 'pending_actions', accent: 'primary', trendUp: true },
  { label: 'Confirmados', value: '86', trend: '+5%', icon: 'verified', accent: 'tertiary', trendUp: true },
  { label: 'Pagados', value: '312', trend: '+18%', icon: 'payments', accent: 'primary', trendUp: true },
  { label: 'Preparados', value: '45', trend: '0%', icon: 'inventory', accent: 'secondary', trendUp: null },
  { label: 'Enviados', value: '92', trend: '+2%', icon: 'local_shipping', accent: 'tertiary', trendUp: true },
  { label: 'Entregados', value: '1,402', trend: '+22%', icon: 'task_alt', accent: 'success', trendUp: true },
  { label: 'Cancelados', value: '12', trend: '-4%', icon: 'cancel', accent: 'error', trendUp: false },
];

const barData = [
  { h: 40, label: '1 Nov' },
  { h: 55, label: '2 Nov' },
  { h: 30, label: '3 Nov' },
  { h: 70, label: '4 Nov' },
  { h: 85, label: '5 Nov' },
  { h: 45, label: '6 Nov' },
  { h: 60, label: '7 Nov' },
  { h: 95, label: '8 Nov' },
  { h: 50, label: '9 Nov' },
  { h: 40, label: '10 Nov' },
  { h: 65, label: '11 Nov' },
  { h: 75, label: '12 Nov' },
  { h: 35, label: '13 Nov' },
];

const progressData = [
  { label: 'Completados', pct: 65, color: 'var(--color-primary)' },
  { label: 'En Logística', pct: 25, color: 'var(--color-tertiary)' },
  { label: 'Incidentes', pct: 10, color: 'var(--color-error)' },
];

const recentOrders = [
  { id: '#ALP-8921', initials: 'ML', client: 'Mariana Luna', date: '12 Nov 2023', product: 'Alpaca Blend - Gold Grade', total: '$4,250.00', status: 'Pendiente', statusClass: 'pendiente' },
  { id: '#ALP-8920', initials: 'RP', client: 'Roberto Pardo', date: '11 Nov 2023', product: 'Baby Alpaca Raw (White)', total: '$12,800.00', status: 'Entregado', statusClass: 'entregado' },
  { id: '#ALP-8919', initials: 'TX', client: 'Textil Export SAC', date: '11 Nov 2023', product: 'Lote Alpaca Suri (Grey)', total: '$8,440.50', status: 'Enviado', statusClass: 'enviado' },
];

const accentMap = {
  primary: 'var(--color-primary)',
  tertiary: 'var(--color-tertiary)',
  secondary: 'var(--color-secondary)',
  success: '#22c55e',
  error: 'var(--color-error)',
};

const trendIconUp = 'trending_up';
const trendIconDown = 'trending_down';
const trendIconFlat = 'trending_flat';

export default function OrderDashboard() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard de Pedidos</h2>
          <p className={styles.pageDesc}>Panel operativo de transacciones y logística de fibra.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">file_download</span>
            Exportar Pedidos
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">search</span>
            Consultar Pedido
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined">add</span>
            Nuevo Pedido
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className={styles.kpiCard}>
            <div className={styles.kpiAccent} style={{ backgroundColor: accentMap[kpi.accent] }} />
            <div className={styles.kpiContent}>
              <div className={styles.kpiTop}>
                <span className="material-symbols-outlined" style={{ color: accentMap[kpi.accent], fontSize: 24 }}>{kpi.icon}</span>
                {kpi.trendUp !== null && (
                  <span className={styles.kpiTrend} style={{ color: kpi.trendUp ? '#22c55e' : 'var(--color-error)' }}>
                    {kpi.trend}
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                      {kpi.trendUp === null ? trendIconFlat : kpi.trendUp ? trendIconUp : trendIconDown}
                    </span>
                  </span>
                )}
              </div>
              <p className={styles.kpiLabel}>{kpi.label}</p>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className={styles.chartsRow}>
        {/* Bar Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartCardHeader}>
            <div>
              <h4 className={styles.chartTitle}>Ventas por Día</h4>
              <p className={styles.chartSub}>Últimos 30 días de transacciones</p>
            </div>
            <div className={styles.chartToggle}>
              <span className={styles.chartToggleActive}>Histórico</span>
              <span className={styles.chartToggleInactive}>Proyección</span>
            </div>
          </div>
          <div className={styles.barChart}>
            {barData.map((b, i) => (
              <div key={i} className={styles.barWrapper}>
                <div
                  className={i === 7 ? styles.barToday : styles.barDefault}
                  style={{ height: `${b.h}%` }}
                  title={`Día ${i + 1}`}
                />
              </div>
            ))}
          </div>
          <div className={styles.barLabels}>
            {barData.filter((_, i) => i === 0 || i === 6 || i === 11 || i === 12).map((b) => (
              <span key={b.label}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.chartsRight}>
          {/* Progress */}
          <div className={styles.progressCard}>
            <h4 className={styles.chartTitle}>Pedidos por Estado</h4>
            <div className={styles.progressList}>
              {progressData.map((p) => (
                <div key={p.label} className={styles.progressItem}>
                  <div className={styles.progressLabelRow}>
                    <span>{p.label}</span>
                    <span>{p.pct}%</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: `${p.pct}%`, backgroundColor: p.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispatch Speed */}
          <div className={styles.speedCard}>
            <div className={styles.speedBgIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: 120 }}>timer</span>
            </div>
            <p className={styles.speedLabel}>Tiempo Promedio Despacho</p>
            <div className={styles.speedValueRow}>
              <span className={styles.speedValue}>1.4</span>
              <span className={styles.speedUnit}>días</span>
            </div>
            <div className={styles.speedFooter}>
              <div className={styles.speedAvatars}>
                <span className={styles.speedAvatar}>A</span>
                <span className={styles.speedAvatar}>B</span>
              </div>
              <span className={styles.speedImprovement}>Mejora del 12% vs mes anterior</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h4 className={styles.chartTitle}>Últimos Pedidos</h4>
          <button className={styles.tableHeaderLink}>
            Ver todo el historial
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
          </button>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID PEDIDO</th>
                <th>CLIENTE</th>
                <th>FECHA</th>
                <th>PRODUCTO</th>
                <th>TOTAL</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className={styles.tableRow}>
                  <td className={styles.tdId}>{o.id}</td>
                  <td>
                    <div className={styles.clientCell}>
                      <span className={styles.clientAvatar}>{o.initials}</span>
                      <span>{o.client}</span>
                    </div>
                  </td>
                  <td className={styles.tdDate}>{o.date}</td>
                  <td className={styles.tdProduct}>{o.product}</td>
                  <td className={styles.tdTotal}>{o.total}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[`badge${o.statusClass.charAt(0).toUpperCase() + o.statusClass.slice(1)}`]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionBtn}>
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className={styles.bottomRow}>
        <div className={styles.imageCard}>
          <div className={styles.imageCardBg} />
          <div className={styles.imageCardOverlay}>
            <h5 className={styles.imageCardTitle}>Stock de Fibra Premium</h5>
            <p className={styles.imageCardDesc}>Nuevos lotes de Baby Alpaca ingresaron al almacén central esta mañana.</p>
            <button className={styles.imageCardBtn}>Revisar Stock</button>
          </div>
        </div>
        <div className={styles.efficiencyCard}>
          <h5 className={styles.efficiencyTitle}>Eficiencia Operativa</h5>
          <div className={styles.efficiencyBody}>
            <div className={styles.efficiencyBarSection}>
              <div className={styles.efficiencyLabelRow}>
                <span className={styles.efficiencyLabel}>Logística</span>
                <span className={styles.efficiencyPct}>94%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: '94%' }} />
              </div>
            </div>
            <div className={styles.efficiencyIconBox}>
              <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--color-primary)' }}>trending_up</span>
              <p className={styles.efficiencyIconLabel}>+4.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
