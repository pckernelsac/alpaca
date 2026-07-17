import styles from './PaymentDashboard.module.css';

const kpiCards = [
  { label: 'Ventas del Día', value: '$12,480.00', trend: '+14.2%', trendUp: true, subtitle: 'vs ayer' },
  { label: 'Ventas del Mes', value: '$342,910.50', trend: '+8.4%', trendUp: true, subtitle: 'vs mes anterior' },
  { label: 'Ingresos Totales (YTD)', value: '$2.4M', trend: '+22%', trendUp: true, subtitle: 'vs 2023' },
];

const volumeData = [
  { label: 'Exitosos', value: '1,240', color: 'var(--color-primary)' },
  { label: 'Fallidos', value: '12', color: 'var(--color-error)' },
  { label: 'Pendientes', value: '45', color: 'var(--color-on-surface-variant)' },
  { label: 'Reembolsos', value: '8', color: 'var(--color-tertiary)' },
];

const barData = [
  { h: 40, label: 'ENE' },
  { h: 55, label: 'FEB' },
  { h: 45, label: 'MAR' },
  { h: 70, label: 'ABR' },
  { h: 65, label: 'MAY' },
  { h: 85, label: 'JUN' },
  { h: 95, label: 'JUL' },
  { h: 80, label: 'AGO' },
  { h: 100, label: 'SEP' },
  { h: 85, label: 'OCT' },
  { h: 60, label: 'NOV' },
  { h: 40, label: 'DIC' },
];

const paymentMethods = [
  { label: 'Stripe', pct: 65, color: 'var(--color-primary)' },
  { label: 'Transferencias', pct: 20, color: 'var(--color-on-surface-variant)' },
  { label: 'Otros', pct: 15, color: 'var(--color-surface-container-high)' },
];

const alerts = [
  { icon: 'error', iconColor: 'var(--color-error)', bgClass: styles.alertError, title: 'Pago Rechazado #ST_9210', desc: 'Tarjeta bloqueada por el emisor. Cliente: Alpacas del Sur.', btnText: 'Contactar Cliente', btnClass: styles.alertBtnError },
  { icon: 'undo', iconColor: 'var(--color-tertiary)', bgClass: styles.alertTertiary, title: 'Reembolso Pendiente', desc: 'Solicitud #4459 requiere aprobación del gerente.', btnText: 'Aprobar ahora', btnClass: styles.alertBtnTertiary },
  { icon: 'visibility', iconColor: 'var(--color-on-surface-variant)', bgClass: styles.alertSecondary, title: 'Validación Manual', desc: 'Transferencia de $15,000 sin referencia clara.', btnText: 'Verificar Depósito', btnClass: styles.alertBtnSecondary },
];

const recentTx = [
  { id: 'pi_3O9x...wA1', client: 'Textiles Cusco S.A.C', amount: '$2,450.00', status: 'Completado', statusClass: 'completed', date: 'Hoy, 10:45 AM' },
  { id: 'pi_3P2q...rL9', client: 'Andean Luxury Fibers', amount: '$12,100.00', status: 'Procesando', statusClass: 'processing', date: 'Hoy, 09:12 AM' },
  { id: 'pi_3M88...kJ2', client: 'Global Wool Imports', amount: '$850.25', status: 'Fallido', statusClass: 'failed', date: 'Ayer, 18:30 PM' },
  { id: 'pi_3L1z...qP0', client: 'Inca Design House', amount: '$4,200.00', status: 'Completado', statusClass: 'completed', date: 'Ayer, 14:15 PM' },
  { id: 'pi_3X9a...mT5', client: 'Altiplano Fabrics', amount: '$1,120.00', status: 'Reembolsado', statusClass: 'refunded', date: '05 Oct, 2023' },
];

const statusBadgeMap = {
  completed: { bg: 'var(--color-primary-fixed)', fg: 'var(--color-primary)' },
  processing: { bg: 'var(--color-surface-container-high)', fg: 'var(--color-on-surface-variant)' },
  failed: { bg: '#fee2e2', fg: 'var(--color-error)' },
  refunded: { bg: 'var(--color-tertiary-fixed)', fg: 'var(--color-tertiary)' },
};

export default function PaymentDashboard() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Dashboard de Pagos</h2>
          <p className={styles.pageDesc}>Real-time settlement data from your global textile distribution channels.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">download</span>
            Exportar Datos
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">assessment</span>
            Generar Reporte
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined">search_check</span>
            Buscar Pago
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className={styles.kpiGrid}>
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className={styles.kpiCard}>
            <div className={styles.kpiAccent} />
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>{kpi.label}</p>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              <div className={styles.kpiTrend}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, marginRight: 2 }}>
                  {kpi.trendUp ? 'trending_up' : 'trending_down'}
                </span>
                {kpi.trend}
                <span className={styles.kpiTrendSub}>{kpi.subtitle}</span>
              </div>
            </div>
          </div>
        ))}
        {/* Volume card */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiAccent} />
          <div className={styles.kpiContent}>
            <p className={styles.kpiLabel}>Volumen Operativo</p>
            <div className={styles.volumeGrid}>
              {volumeData.map((v) => (
                <div key={v.label} className={styles.volumeItem}>
                  <span className={styles.volumeLabel}>{v.label}</span>
                  <span className={styles.volumeValue} style={{ color: v.color }}>{v.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className={styles.analyticsRow}>
        {/* Bar Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartCardHeader}>
            <h4 className={styles.chartTitle}>Flujo de Caja Mensual</h4>
            <div className={styles.chartLegend}>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-primary)' }} />
                Revenue
              </span>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-on-surface-variant)', opacity: 0.4 }} />
                Proyectado
              </span>
            </div>
          </div>
          <div className={styles.barChart}>
            {barData.map((b, i) => (
              <div key={i} className={styles.barWrapper}>
                <div
                  className={styles.barDefault}
                  style={{
                    height: `${b.h}%`,
                    opacity: 0.3 + (b.h / 100) * 0.7,
                  }}
                />
              </div>
            ))}
          </div>
          <div className={styles.barLabels}>
            {barData.map((b) => (
              <span key={b.label}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.chartsRight}>
          {/* Donut Card */}
          <div className={styles.donutCard}>
            <h4 className={styles.chartTitle}>Métodos de Pago</h4>
            <div className={styles.donutBody}>
              <div className={styles.donutWrapper}>
                <div className={styles.donut}>
                  <div className={styles.donutSegment} style={{ borderColor: 'transparent transparent transparent var(--color-primary)', transform: 'rotate(-45deg)' }} />
                  <span className={styles.donutCenter}>65%</span>
                </div>
              </div>
              <div className={styles.donutLegend}>
                {paymentMethods.map((m) => (
                  <div key={m.label} className={styles.donutLegendItem}>
                    <span className={styles.donutLegendDot} style={{ backgroundColor: m.color }} />
                    <span className={styles.donutLegendLabel}>{m.label} ({m.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className={styles.funnelCard}>
            <h4 className={styles.chartTitle}>Conversión de Pagos</h4>
            <div className={styles.funnelList}>
              <div className={styles.funnelItem}>
                <div className={styles.funnelLabelRow}>
                  <span>Success Rate</span>
                  <span className={styles.funnelPct} style={{ color: 'var(--color-primary)' }}>98.4%</span>
                </div>
                <div className={styles.funnelTrack}>
                  <div className={styles.funnelFill} style={{ width: '98.4%', backgroundColor: 'var(--color-primary)' }} />
                </div>
              </div>
              <div className={styles.funnelItem}>
                <div className={styles.funnelLabelRow}>
                  <span>Abandono de Checkout</span>
                  <span className={styles.funnelPct} style={{ color: 'var(--color-error)' }}>1.2%</span>
                </div>
                <div className={styles.funnelTrack}>
                  <div className={styles.funnelFill} style={{ width: '1.2%', backgroundColor: 'var(--color-error)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts & Transactions */}
      <div className={styles.bottomRow}>
        {/* Alerts */}
        <div className={styles.alertsSection}>
          <h4 className={styles.alertsTitle}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-error)', fontSize: 20 }}>warning</span>
            Alertas Críticas
          </h4>
          <div className={styles.alertsList}>
            {alerts.map((a, i) => (
              <div key={i} className={`${styles.alertCard} ${a.bgClass}`}>
                <span className="material-symbols-outlined" style={{ color: a.iconColor, fontSize: 20 }}>{a.icon}</span>
                <div className={styles.alertContent}>
                  <p className={styles.alertTitle}>{a.title}</p>
                  <p className={styles.alertDesc}>{a.desc}</p>
                  <button className={a.btnClass}>{a.btnText}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h4 className={styles.chartTitle}>Transacciones Recientes</h4>
            <button className={styles.tableHeaderLink}>Ver todas</button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID Stripe</th>
                  <th>Cliente</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {recentTx.map((tx) => (
                  <tr key={tx.id} className={styles.tableRow}>
                    <td className={styles.tdId}>{tx.id}</td>
                    <td className={styles.tdClient}>{tx.client}</td>
                    <td className={styles.tdAmount}>{tx.amount}</td>
                    <td>
                      <span
                        className={styles.badge}
                        style={{
                          backgroundColor: statusBadgeMap[tx.statusClass].bg,
                          color: statusBadgeMap[tx.statusClass].fg,
                        }}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className={styles.tdDate}>{tx.date}</td>
                    <td>
                      <button className={styles.actionBtn}>
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
