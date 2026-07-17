import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CrmDashboard.module.css';

const kpis = [
  { id: 1, label: 'Total Clientes', value: '1,284', icon: 'groups', trend: '+4.2%', trendColor: 'success' },
  { id: 2, label: 'Nuevos (Mes)', value: '48', icon: 'person_add', trend: '+12%', trendColor: 'success' },
  { id: 3, label: 'Activos', value: '956', icon: 'check_circle', trend: '~0.0%', trendColor: 'muted' },
  { id: 4, label: 'Inactivos', value: '212', icon: 'pause_circle', trend: '-2.1%', trendColor: 'error' },
  { id: 5, label: 'Recurrentes', value: '68%', icon: 'autorenew', trend: '+1.5%', trendColor: 'success' },
];

const chartMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];
const chartHeights = [40, 55, 45, 70, 60, 85, 75, 90];

const categories = [
  { name: 'Exportación', percent: 40, color: 'primary' },
  { name: 'Mayorista', percent: 25, color: 'primary-fixed' },
  { name: 'Boutique', percent: 20, color: 'secondary-fixed-dim' },
  { name: 'Retail', percent: 15, color: 'secondary' },
];

const recentClients = [
  { name: 'Andean Textiles Ltd.', date: '12 Oct, 2024', category: 'Exportación', catClass: 'export', status: 'Activo', statusColor: 'success' },
  { name: 'Boutique Cusco Real', date: '10 Oct, 2024', category: 'Boutique', catClass: 'boutique', status: 'Activo', statusColor: 'success' },
  { name: 'Mercado Central Lima', date: '08 Oct, 2024', category: 'Mayorista', catClass: 'wholesale', status: 'Pendiente', statusColor: 'warning' },
  { name: 'Puno Alpaca Threads', date: '05 Oct, 2024', category: 'Retail', catClass: 'retail', status: 'Inactivo', statusColor: 'error' },
];

const activities = [
  { icon: 'edit', iconBg: 'primary-fixed', iconColor: 'on-primary-fixed', text: 'Carlos H. actualizó datos de contacto en Textiles Arequipa.', time: 'Hace 15 min' },
  { icon: 'person_add', iconBg: 'secondary-container', iconColor: 'on-secondary-container', text: 'Nuevo cliente Alpaca Luxury Boutique registrado.', time: 'Hace 2 horas' },
  { icon: 'description', iconBg: 'tertiary-container', iconColor: 'white', text: 'Maria V. exportó reporte de ventas trimestral.', time: 'Hoy, 10:30 AM' },
];

const cities = [
  { name: 'Lima', percent: 45 },
  { name: 'Arequipa', percent: 30 },
  { name: 'Cusco', percent: 15 },
  { name: 'Puno', percent: 10 },
];

const quickLinks = [
  { icon: 'person_add_alt', label: 'Agregar Cliente', link: '/crm/clientes/nuevo' },
  { icon: 'analytics', label: 'Exportar Reporte CRM', link: '#' },
  { icon: 'category', label: 'Gestionar Categorías', link: '#' },
];

const colorMap = {
  'primary': { bg: 'var(--color-primary)', text: 'var(--color-primary)' },
  'primary-fixed': { bg: 'var(--color-primary-fixed)', text: 'var(--color-on-primary-fixed)' },
  'secondary-fixed-dim': { bg: 'var(--color-secondary-fixed-dim)', text: 'var(--color-on-secondary-fixed-variant)' },
  'secondary': { bg: 'var(--color-secondary)', text: 'var(--color-on-secondary)' },
  'success': '#22c55e',
  'error': '#ef4444',
  'warning': '#eab308',
  'muted': 'var(--color-on-surface-variant)',
};

const categoryBadgeStyles = {
  export: { bg: '#dbeafe', text: '#1e40af' },
  boutique: { bg: '#f3e8ff', text: '#7c3aed' },
  wholesale: { bg: '#ffedd5', text: '#c2410c' },
  retail: { bg: '#dcfce7', text: '#16a34a' },
};

export default function CrmDashboard() {
  const [period, setPeriod] = useState('Últimos 12 meses');

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Gestión de Clientes</h2>
          <p className={styles.pageDesc}>Panel detallado de la base de clientes de Alpacart Textiles.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
            Exportar Reporte
          </button>
          <Link to="/crm/clientes/nuevo" className={styles.btnPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span>
            Nuevo Cliente
          </Link>
        </div>
      </section>

      {/* KPI Grid */}
      <section className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <div key={kpi.id} className={styles.kpiCard}>
            <div className={styles.kpiAccent} />
            <div className={styles.kpiContent}>
              <div className={styles.kpiHeader}>
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-primary)' }}>{kpi.icon}</span>
              </div>
              <div className={styles.kpiRow}>
                <h3 className={styles.kpiValue}>{kpi.value}</h3>
                <span className={styles.kpiTrend} style={{ color: colorMap[kpi.trendColor] }}>
                  {kpi.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Charts Row */}
      <section className={styles.chartSection}>
        {/* Bar Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h4 className={styles.chartTitle}>Crecimiento Mensual de Clientes</h4>
            <select className={styles.chartSelect} value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option>Últimos 12 meses</option>
              <option>2023</option>
            </select>
          </div>
          <div className={styles.barChart}>
            {chartMonths.map((month, i) => (
              <div key={month} className={styles.barCol}>
                <div
                  className={`${styles.bar} ${i === 5 ? styles.barActive : ''}`}
                  style={{ height: `${chartHeights[i]}%` }}
                />
                <span className={`${styles.barLabel} ${i === 5 ? styles.barLabelActive : ''}`}>{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart */}
        <div className={styles.donutCard}>
          <h4 className={styles.chartTitle}>Clientes por Categoría</h4>
          <div className={styles.donutWrapper}>
            <div className={styles.donut}>
              <div className={styles.donutCenter}>
                <span className={styles.donutValue}>1.2K</span>
                <span className={styles.donutLabel}>Total</span>
              </div>
            </div>
          </div>
          <div className={styles.legendGrid}>
            {categories.map((cat) => (
              <div key={cat.name} className={styles.legendItem}>
                <div className={styles.legendDot} style={{ backgroundColor: colorMap[cat.color].bg }} />
                <span className={styles.legendText}>{cat.name} ({cat.percent}%)</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className={styles.bottomSection}>
        {/* Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h4 className={styles.tableTitle}>Últimos Registros</h4>
            <button className={styles.tableLink}>Ver todos</button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentClients.map((c, i) => (
                  <tr key={i}>
                    <td className={styles.tdName}>{c.name}</td>
                    <td className={styles.tdMuted}>{c.date}</td>
                    <td>
                      <span className={styles.catBadge} style={{ backgroundColor: categoryBadgeStyles[c.catClass].bg, color: categoryBadgeStyles[c.catClass].text }}>
                        {c.category}
                      </span>
                    </td>
                    <td>
                      <div className={styles.statusCell}>
                        <span className={styles.statusDot} style={{ backgroundColor: colorMap[c.statusColor] }} />
                        <span>{c.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel */}
        <div className={styles.sidePanel}>
          {/* Alerts */}
          <div className={styles.alertCard}>
            <div className={styles.alertHeader}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-error)' }}>warning</span>
              <h5 className={styles.alertTitle}>Alertas Críticas</h5>
            </div>
            <p className={styles.alertDesc}>
              <strong>3 cuentas VIP</strong> no presentan actividad en los últimos 30 días. Se recomienda seguimiento inmediato.
            </p>
            <button className={styles.alertBtn}>Revisar Cuentas</button>
          </div>

          {/* Activity Feed */}
          <div className={styles.activityCard}>
            <h5 className={styles.sideTitle}>Actividad Reciente</h5>
            <div className={styles.activityFeed}>
              {activities.map((act, i) => (
                <div key={i} className={styles.activityItem}>
                  <div className={`${styles.activityIcon} ${styles[`iconBg${act.iconBg.replace(/-/g, '')}`]}`} style={{ color: act.iconColor }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{act.icon}</span>
                  </div>
                  <div>
                    <p className={styles.activityText}>{act.text}</p>
                    <span className={styles.activityTime}>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.quickCard}>
            <h5 className={styles.sideTitle}>Accesos Rápidos</h5>
            <div className={styles.quickList}>
              {quickLinks.map((ql, i) => (
                <Link key={i} to={ql.link} className={styles.quickItem}>
                  <div className={styles.quickItemLeft}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>{ql.icon}</span>
                    <span className={styles.quickItemLabel}>{ql.label}</span>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-outline)' }}>chevron_right</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Geographic Distribution */}
      <section className={styles.geoCard}>
        <h4 className={styles.chartTitle}>Distribución Geográfica (Clientes por Ciudad)</h4>
        <div className={styles.geoList}>
          {cities.map((city) => (
            <div key={city.name} className={styles.geoRow}>
              <div className={styles.geoInfo}>
                <span className={styles.geoName}>{city.name}</span>
                <span className={styles.geoPercent}>{city.percent}%</span>
              </div>
              <div className={styles.geoTrack}>
                <div className={styles.geoFill} style={{ width: `${city.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI FAB */}
      <button className={styles.fab}>
        <span className="material-symbols-outlined" style={{ fontSize: 28 }}>chat_bubble</span>
        <div className={styles.fabTooltip}>Asistente AI</div>
      </button>
    </div>
  );
}
