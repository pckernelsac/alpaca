import { useState } from 'react';
import { Link } from 'react-router-dom';
import { kpiData, alerts, chartDays, chartBarHeights, categories, paymentMethods, recentOrders, activities, quickActions } from './dashboardData';
import styles from './Dashboard.module.css';

const periodOptions = ['Hoy', 'Semana', 'Mes'];

const colorMap = {
  primary: { bg: 'var(--color-primary)', container: 'var(--color-primary-fixed)', text: 'var(--color-primary)' },
  secondary: { bg: 'var(--color-secondary)', container: 'var(--color-secondary-container)', text: 'var(--color-secondary)' },
  tertiary: { bg: 'var(--color-tertiary)', container: 'var(--color-tertiary-container)', text: 'var(--color-tertiary)' },
  error: { bg: 'var(--color-error)', container: 'var(--color-error-container)', text: 'var(--color-error)' },
};

const statusColor = {
  shipped: { bg: '#e3f2fd', text: '#1565c0' },
  processing: { bg: '#fff3e0', text: '#e65100' },
  delivered: { bg: '#e8f5e9', text: '#2e7d32' },
};

const activityColor = {
  primary: { bg: 'rgba(124,84,0,0.1)', text: 'var(--color-primary)' },
  tertiary: { bg: 'rgba(33,95,146,0.1)', text: 'var(--color-tertiary)' },
  secondary: { bg: 'rgba(112,90,70,0.1)', text: 'var(--color-secondary)' },
  muted: { bg: 'rgba(80,69,55,0.1)', text: 'var(--color-on-surface-variant)' },
};

export default function Dashboard() {
  const [period, setPeriod] = useState('Hoy');

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Panel de Control Ejecutivo</h2>
          <p className={styles.pageDesc}>Resumen operativo en tiempo real de la cadena de producción y comercialización de textiles Alpacart.</p>
        </div>
        <div className={styles.periodToggle}>
          {periodOptions.map((opt) => (
            <button
              key={opt}
              className={`${styles.periodBtn} ${period === opt ? styles.periodActive : ''}`}
              onClick={() => setPeriod(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </section>

      {/* Alert Banners */}
      <section className={styles.alertGrid}>
        {alerts.map((a) => (
          <div key={a.id} className={styles.alertCard} style={{ borderColor: `${colorMap[a.color].bg}33` }}>
            <div className={styles.alertIcon} style={{ backgroundColor: `${colorMap[a.color].text}1a`, color: colorMap[a.color].text }}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{a.icon}</span>
            </div>
            <div>
              <p className={styles.alertTitle} style={{ color: colorMap[a.color].text }}>{a.title}</p>
              <p className={styles.alertDesc}>{a.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* KPI Grid */}
      <section className={styles.kpiGrid}>
        {kpiData.map((kpi) => (
          <div key={kpi.id} className={styles.kpiCard}>
            <div className={styles.kpiAccent} style={{ backgroundColor: colorMap[kpi.color]?.bg || 'var(--color-primary)' }} />
            <div className={styles.kpiContent}>
              <div className={styles.kpiHeader}>
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-primary-container)' }}>{kpi.icon}</span>
              </div>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              <div className={styles.kpiFooter}>
                {kpi.trend ? (
                  <span className={styles.kpiTrend} style={{ color: 'var(--color-tertiary)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_up</span>
                    {kpi.trend.value} {kpi.trend.label}
                  </span>
                ) : (
                  <span className={styles.kpiSubtitle} style={kpi.color === 'error' ? { color: 'var(--color-error)' } : {}}>
                    {kpi.subtitle}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Charts & Categories */}
      <section className={styles.chartSection}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div>
              <h4 className={styles.chartTitle}>Histórico de Ventas</h4>
              <p className={styles.chartDesc}>Comparativa diaria de facturación</p>
            </div>
            <div className={styles.chartLegend}>
              <span className="flex items-center gap-2" style={{ fontSize: 'var(--font-size-xs)' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
                Ventas
              </span>
              <span className="flex items-center gap-2" style={{ fontSize: 'var(--font-size-xs)' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-tertiary)' }} />
                Proyectado
              </span>
            </div>
          </div>
          <div className={styles.barChart}>
            {chartDays.map((day, i) => (
              <div key={day} className={styles.barCol}>
                <div
                  className={`${styles.bar} ${i === 4 ? styles.barActive : ''}`}
                  style={{ height: `${chartBarHeights[i]}%` }}
                />
                <span className={styles.barLabel}>{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartSidebar}>
          <div className={styles.categoryCard}>
            <h4 className={styles.categoryTitle}>Categorías Top</h4>
            {categories.map((cat) => (
              <div key={cat.name} className={styles.categoryRow}>
                <div className={styles.categoryInfo}>
                  <span>{cat.name}</span>
                  <span className={styles.categoryPercent}>{cat.percent}%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${cat.percent}%`, backgroundColor: colorMap[cat.color].bg }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.paymentCard}>
            <h4 className={styles.paymentLabel}>Métodos de Pago</h4>
            <div className={styles.paymentRow}>
              {paymentMethods.map((pm) => (
                <div key={pm.name} className={styles.paymentItem}>
                  <span className="material-symbols-outlined" style={{ display: 'block', marginBottom: 4 }}>{pm.icon}</span>
                  <p className={styles.paymentName}>{pm.name}</p>
                  <p className={styles.paymentPercent}>{pm.percent}%</p>
                </div>
              ))}
            </div>
            <div className={styles.paymentBgIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: 120 }}>payments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Orders Table + Activity */}
      <section className={styles.bottomSection}>
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h4 className={styles.tableTitle}>Últimos Pedidos</h4>
            <Link to="/orders/list" className={styles.tableLink}>Ver todo</Link>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th style={{ textAlign: 'right' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className={styles.tableRow}>
                    <td className={styles.cellId}>{order.id}</td>
                    <td>
                      <div className={styles.clientCell}>
                        <div className={styles.clientAvatar}>{order.initials}</div>
                        <span>{order.client}</span>
                      </div>
                    </td>
                    <td className={styles.cellAmount}>{order.amount}</td>
                    <td>
                      <span
                        className={styles.statusTag}
                        style={{
                          backgroundColor: statusColor[order.status]?.bg || '#f5f5f5',
                          color: statusColor[order.status]?.text || '#666',
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className={styles.moreBtn}>
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.activityCard}>
          <h4 className={styles.activityTitle}>Actividad Reciente</h4>
          <div className={styles.activityFeed}>
            {activities.map((act, i) => (
              <div key={i} className={`${styles.activityItem} ${act.color === 'muted' ? styles.activityMuted : ''}`}>
                <div
                  className={styles.activityIcon}
                  style={{
                    backgroundColor: activityColor[act.color]?.bg || activityColor.muted.bg,
                    color: activityColor[act.color]?.text || activityColor.muted.text,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{act.icon}</span>
                </div>
                <div>
                  <p className={styles.activityText}>
                    {act.title} {act.highlight && <strong>{act.highlight}</strong>}
                  </p>
                  <p className={styles.activityTime}>{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className={styles.quickSection}>
        <h4 className={styles.quickSectionLabel}>Accesos Rápidos</h4>
        <div className={styles.quickGrid}>
          {quickActions.map((qa) => (
            <Link key={qa.label} to={qa.link} className={styles.quickCard}>
              <div className={styles.quickIcon}>
                <span className="material-symbols-outlined">{qa.icon}</span>
              </div>
              <div>
                <p className={styles.quickLabel}>{qa.label}</p>
                <p className={styles.quickDesc}>{qa.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
