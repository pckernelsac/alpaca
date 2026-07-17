import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MarketingDashboard.module.css';

const kpiCards = [
  { label: 'Campañas Activas', value: '12', trend: '+2', icon: 'campaign', up: true },
  { label: 'Alcance Total', value: '48.2k', trend: '8%', icon: 'visibility', up: true },
  { label: 'Tasa de Conv.', value: '4.8%', trend: '1.2%', icon: 'trending_up', up: true },
  { label: 'CTR Promedio', value: '2.4%', trend: '0.3%', icon: 'ads_click', up: false },
  { label: 'Cupones Activos', value: '156', trend: null, icon: 'confirmation_number', up: null },
  { label: 'Promociones', value: '8', trend: '+1', icon: 'sell', up: true },
];

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];

const channels = [
  { label: 'Email (45%)', color: '#7c5400' },
  { label: 'Social (25%)', color: '#3f78ad' },
  { label: 'Directo (15%)', color: '#705a46' },
  { label: 'SMS (15%)', color: '#9acbff' },
];

const campaigns = [
  { name: 'Lanzamiento Verano Alpaca 2024', start: '12 May, 2024', status: 'Activa', statusClass: 'active', spend: '$12,450.00', conv: '5.2%', trend: 'up' },
  { name: 'Liquidación Tejidos Finos', start: 'Finaliza en 3 días', status: 'Cerrando', statusClass: 'closing', spend: '$4,200.00', conv: '3.8%', trend: 'flat' },
  { name: 'Retargeting Accesorios Invierno', start: 'Programado para Jun 01', status: 'Pausa', statusClass: 'paused', spend: '$0.00', conv: '--', trend: null },
  { name: 'Colaboración Artisanal Collective', start: '05 May, 2024', status: 'Activa', statusClass: 'active', spend: '$28,900.00', conv: '8.1%', trend: 'up' },
];

const roiItems = [
  { label: 'Artisanal Collective', value: '12.4x', width: 90 },
  { label: "Summer Launch '24", value: '8.2x', width: 65 },
  { label: 'Email Automations', value: '5.5x', width: 45 },
  { label: 'Instagram Reels Ads', value: '4.1x', width: 35 },
];

export default function MarketingDashboard() {
  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <h1 className={styles.pageTitle}>Resumen de Marketing</h1>
          <p className={styles.pageDesc}>Gestione sus campañas textiles y promociones de temporada.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">confirmation_number</span>
            Nuevo cupón
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">sell</span>
            Nueva promoción
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined">add</span>
            Nueva campaña
          </button>
        </div>
      </section>

      <section className={styles.kpiGrid}>
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className={styles.kpiCard}>
            <div className={styles.kpiAccent} />
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiRow}>
              <span className={styles.kpiValue}>{kpi.value}</span>
              {kpi.trend !== null && (
                <span className={`${styles.kpiTrend} ${kpi.up ? styles.trendUp : styles.trendDown}`}>
                  {kpi.up ? (
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_up</span>
                  ) : (
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_down</span>
                  )}
                  {kpi.trend}
                </span>
              )}
              {kpi.trend === null && (
                <span className={styles.kpiNeutral}>Sin cambios</span>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.chartSection}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div>
              <h3 className={styles.cardTitle}>Rendimiento de Conversión y Ventas</h3>
              <p className={styles.cardDesc}>Tendencias semanales de los últimos 3 meses.</p>
            </div>
            <div className={styles.chartLegend}>
              <span className={styles.legendItem}>
                <span className={styles.dot} style={{ backgroundColor: '#7c5400' }} />
                Ventas
              </span>
              <span className={styles.legendItem}>
                <span className={styles.dot} style={{ backgroundColor: '#3f78ad' }} />
                Conversiones
              </span>
            </div>
          </div>
          <div className={styles.svgWrap}>
            <svg viewBox="0 0 800 200" className={styles.chartSvg}>
              <line x1="0" y1="0" x2="800" y2="0" stroke="#E5D8C7" strokeDasharray="4" strokeWidth="1" />
              <line x1="0" y1="50" x2="800" y2="50" stroke="#E5D8C7" strokeDasharray="4" strokeWidth="1" />
              <line x1="0" y1="100" x2="800" y2="100" stroke="#E5D8C7" strokeDasharray="4" strokeWidth="1" />
              <line x1="0" y1="150" x2="800" y2="150" stroke="#E5D8C7" strokeDasharray="4" strokeWidth="1" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="#E5D8C7" strokeWidth="1" />
              <path d="M0 180 Q 50 140, 100 160 T 200 100 T 300 130 T 400 60 T 500 80 T 600 40 T 700 70 T 800 30" fill="none" stroke="#7c5400" strokeWidth="3" />
              <path d="M0 190 Q 50 170, 100 180 T 200 140 T 300 160 T 400 120 T 500 130 T 600 100 T 700 110 T 800 80" fill="none" stroke="#3f78ad" strokeWidth="2" />
            </svg>
            <div className={styles.monthLabels}>
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.channelCard}>
          <h3 className={styles.cardTitle}>Distribución de Canales</h3>
          <p className={styles.cardDesc}>Origen del tráfico de campaña.</p>
          <div className={styles.donutWrap}>
            <div className={styles.donut}>
              <svg viewBox="0 0 36 36" className={styles.donutSvg}>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ece0d9" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#7c5400" strokeDasharray="45 55" strokeDashoffset="0" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3f78ad" strokeDasharray="25 75" strokeDashoffset="-45" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#705a46" strokeDasharray="15 85" strokeDashoffset="-70" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#9acbff" strokeDasharray="15 85" strokeDashoffset="-85" strokeWidth="4" />
              </svg>
              <div className={styles.donutCenter}>
                <span className={styles.donutValue}>48.2k</span>
                <span className={styles.donutLabel}>Total Reach</span>
              </div>
            </div>
            <div className={styles.channelGrid}>
              {channels.map((ch) => (
                <div key={ch.label} className={styles.channelItem}>
                  <span className={styles.channelDot} style={{ backgroundColor: ch.color }} />
                  <span className={styles.channelName}>{ch.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bottomSection}>
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3 className={styles.cardTitle}>Actividad Reciente de Campañas</h3>
            <button className={styles.viewAll}>Ver todas</button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Campaña</th>
                  <th>Estado</th>
                  <th>Gasto</th>
                  <th>Conversión</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.name} className={styles.tableRow}>
                    <td>
                      <div className={styles.campaignCell}>
                        <span className={styles.campaignName}>{c.name}</span>
                        <span className={styles.campaignMeta}>{c.start}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[c.statusClass]}`}>{c.status}</span>
                    </td>
                    <td className={styles.cellMono}>{c.spend}</td>
                    <td>
                      <div className={styles.convCell}>
                        <span>{c.conv}</span>
                        {c.trend === 'up' && <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-tertiary)' }}>trending_up</span>}
                        {c.trend === 'flat' && <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-on-surface-variant)' }}>trending_flat</span>}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className={styles.moreBtn}><span className="material-symbols-outlined">more_vert</span></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.roiCard}>
          <h3 className={styles.cardTitle}>ROI por Campaña</h3>
          <p className={styles.cardDesc}>Top esfuerzos de marketing.</p>
          <div className={styles.roiList}>
            {roiItems.map((item) => (
              <div key={item.label} className={styles.roiItem}>
                <div className={styles.roiRow}>
                  <span className={styles.roiLabel}>{item.label}</span>
                  <span className={styles.roiValue}>{item.value}</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${item.width}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.aiSuggestion}>
            <div className={styles.aiIcon}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>lightbulb</span>
            </div>
            <div>
              <span className={styles.aiTitle}>Sugerencia de IA</span>
              <p className={styles.aiText}>Incremente el presupuesto en 'Artisanal Collective' un 20%; el ROI proyectado es de 14x para el próximo mes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
