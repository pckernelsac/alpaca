import { useState } from 'react';
import styles from './LogisticsDashboard.module.css';

const kpiCards = [
  { label: 'Prepared Orders', value: '142', trend: '+8%', accent: 'primary' },
  { label: 'Dispatched', value: '56', note: 'Today', accent: 'primary' },
  { label: 'In Transit', value: '318', icon: 'local_shipping', accent: 'primary' },
  { label: 'Delivered', value: '1,024', note: '98% Target', accent: 'primary' },
  { label: 'Delayed', value: '12', icon: 'warning', accent: 'error' },
  { label: 'Returned', value: '4', note: 'Reverse Log.', accent: 'primary' },
];

const accentMap = {
  primary: 'var(--color-primary)',
  error: 'var(--color-error)',
};

const barData = [
  { h: 40, value: 42, label: '12 Oct' },
  { h: 60, value: 65, label: '13 Oct' },
  { h: 85, value: 88, label: '14 Oct' },
  { h: 55, value: 55, label: '15 Oct' },
  { h: 70, value: 70, label: '16 Oct' },
  { h: 95, value: 95, label: '17 Oct' },
  { h: 80, value: 88, label: '18 Oct' },
  { h: 65, value: 65, label: '19 Oct' },
  { h: 45, value: 45, label: '20 Oct' },
  { h: 50, value: 50, label: '21 Oct' },
  { h: 75, value: 75, label: '22 Oct' },
  { h: 100, value: 102, label: '23 Oct' },
];

const barHighlights = [2, 6, 11];

const activityFeed = [
  { carrier: 'DHL Express', carrierClass: 'dhl', time: '2 mins ago', msg: 'Out for delivery: #WAY-44912', detail: 'Destination: Tokyo, Japan', detailClass: '' },
  { carrier: 'FEDEX', carrierClass: 'fedex', time: '14 mins ago', msg: 'Delayed at sorting: #WAY-77210', detail: 'Weather Delay (Chicago Hub)', detailClass: 'error' },
  { carrier: 'Local Carrier', carrierClass: 'local', time: '1 hr ago', msg: 'Delivered: #WAY-00213', detail: 'Signed by: A. Tapia', detailClass: 'secondary' },
  { carrier: 'DHL Express', carrierClass: 'dhl', time: '3 hrs ago', msg: 'Customs Cleared: #WAY-99182', detail: 'Location: Frankfurt Airport', detailClass: '' },
];

const carrierMix = [
  { label: 'DHL', pct: 45, color: 'var(--color-primary)' },
  { label: 'FedEx', pct: 30, color: 'var(--color-secondary)' },
  { label: 'Local', pct: 25, color: 'var(--color-outline-variant)' },
];

const donutSegments = [
  { dash: '45, 100', offset: '0', color: 'var(--color-primary)' },
  { dash: '30, 100', offset: '-45', color: 'var(--color-secondary)' },
  { dash: '25, 100', offset: '-75', color: 'var(--color-outline-variant)' },
];

export default function LogisticsDashboard() {
  const [period, setPeriod] = useState('Last 14 Days');

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.headerSection}>
        <div>
          <nav className={styles.breadcrumb}>
            <a href="/logistics">Logistics</a>
            <span className="material-symbols-outlined">chevron_right</span>
            <span className={styles.breadcrumbCurrent}>Shipping Module</span>
          </nav>
          <h2 className={styles.pageTitle}>Shipping Logistics Dashboard</h2>
          <p className={styles.pageDesc}>Monitor global shipments, carrier performance, and delivery metrics in real time.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">file_download</span>
            Export Data
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">distance</span>
            Track Waybill
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined">add</span>
            New Shipment
          </button>
        </div>
      </section>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpiCards.map((kpi, i) => (
          <div key={i} className={`${styles.kpiCard} ${kpi.accent === 'error' ? styles.kpiError : ''}`}>
            <div className={styles.kpiAccent} style={{ backgroundColor: accentMap[kpi.accent] }} />
            <p className={styles.kpiLabel}>{kpi.label}</p>
            <div className={styles.kpiValueRow}>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              {kpi.trend && <span className={styles.kpiTrend}>{kpi.trend}</span>}
              {kpi.note && <span className={styles.kpiNote}>{kpi.note}</span>}
              {kpi.icon && <span className="material-symbols-outlined" style={{ color: accentMap[kpi.accent], fontSize: 20 }}>{kpi.icon}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Bento Grid */}
      <div className={styles.bentoGrid}>
        {/* Map Widget */}
        <div className={styles.mapWidget}>
          <div className={styles.mapHeader}>
            <div className={styles.mapHeaderLeft}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>map</span>
              <h3 className={styles.mapTitle}>Global Delivery Distribution</h3>
            </div>
            <div className={styles.mapLegend}>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-secondary)' }} />
                In Transit
              </span>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-primary)' }} />
                Delivering
              </span>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-error)' }} />
                Delayed
              </span>
            </div>
          </div>
          <div className={styles.mapBody}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapOverlay}>
                <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--color-primary-fixed-dim)' }}>map</span>
                <p className={styles.mapPlaceholderText}>Interactive Map — South America Region</p>
                <p className={styles.mapPlaceholderSub}>Lima, Peru Hub — 142 active shipments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.activityPanel}>
          <div className={styles.activityHeader}>
            <h3 className={styles.panelTitle}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>history</span>
              Carrier Activity
            </h3>
          </div>
          <div className={styles.activityList}>
            {activityFeed.map((item, i) => (
              <div key={i} className={styles.activityItem}>
                <div className={styles.activityMeta}>
                  <span className={`${styles.activityCarrier} ${styles[`carrier${item.carrierClass}`]}`}>{item.carrier}</span>
                  <span className={styles.activityTime}>{item.time}</span>
                </div>
                <p className={styles.activityMsg}>{item.msg}</p>
                <p className={`${styles.activityDetail} ${item.detailClass ? styles[`detail${item.detailClass}`] : ''}`}>{item.detail}</p>
              </div>
            ))}
          </div>
          <div className={styles.activityFooter}>
            <button className={styles.viewAllBtn}>View all carrier events</button>
          </div>
        </div>

        {/* Bar Chart */}
        <div className={styles.barChart}>
          <div className={styles.barChartHeader}>
            <h3 className={styles.panelTitle}>Deliveries per Day</h3>
            <select className={styles.periodSelect} value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option>Last 14 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className={styles.barChartBody}>
            {barData.map((bar, i) => (
              <div key={i} className={styles.barCol}>
                <div
                  className={`${styles.bar} ${barHighlights.includes(i) ? styles.barHighlight : ''}`}
                  style={{ height: `${bar.h}%` }}
                >
                  <span className={styles.barTooltip}>{bar.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.barLabels}>
            <span>12 Oct</span>
            <span>18 Oct</span>
            <span>24 Oct</span>
          </div>
        </div>

        {/* Carrier Donut */}
        <div className={styles.donutCard}>
          <h3 className={styles.panelTitle}>Carrier Mix</h3>
          <div className={styles.donutContainer}>
            <svg className={styles.donut} viewBox="0 0 36 36">
              <path className={styles.donutBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
              {donutSegments.map((seg, i) => (
                <path key={i} className={styles.donutSegment} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeDasharray={seg.dash} strokeDashoffset={seg.offset} stroke={seg.color} />
              ))}
            </svg>
            <div className={styles.donutCenter}>
              <span className={styles.donutCenterValue}>100%</span>
              <span className={styles.donutCenterLabel}>Total Vol.</span>
            </div>
          </div>
          <div className={styles.carrierLegend}>
            {carrierMix.map((c, i) => (
              <div key={i} className={styles.carrierRow}>
                <div className={styles.carrierRowLeft}>
                  <span className={styles.carrierDot} style={{ backgroundColor: c.color }} />
                  <span>{c.label}</span>
                </div>
                <span>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avg Delivery Time Gauge */}
        <div className={styles.gaugeCard}>
          <h3 className={styles.panelTitle}>Avg. Delivery Time</h3>
          <p className={styles.gaugeTarget}>Target: 3.2 Days</p>
          <div className={styles.gaugeBody}>
            <div className={styles.gaugeValueRow}>
              <span className={styles.gaugeValue}>2.8</span>
              <span className={styles.gaugeUnit}>Days</span>
            </div>
            <div className={styles.gaugeBarTrack}>
              <div className={styles.gaugeBarFill} style={{ width: '82%' }} />
            </div>
            <div className={styles.gaugeRange}>
              <span>Faster</span>
              <span>Slower</span>
            </div>
            <div className={styles.gaugeBadge}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>trending_down</span>
              12% better than LY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
