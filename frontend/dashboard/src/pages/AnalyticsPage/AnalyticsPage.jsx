import { useState } from 'react';
import styles from './AnalyticsPage.module.css';

const kpis = [
  { id: 1, label: 'Ventas Totales', value: '$245.8k', trend: '+12% vs last month' },
  { id: 2, label: 'Ingresos Netos', value: '$182.4k', trend: '+8.5%' },
  { id: 3, label: 'Pedidos Totales', value: '1,452', trend: '+5%' },
  { id: 4, label: 'Tasa de Conversión', value: '4.2%', trend: '+0.5%' },
];

const categories = [
  { name: 'Vicuña Premium', value: '$112.5k', pct: 85 },
  { name: 'Baby Alpaca Royal', value: '$88.2k', pct: 65 },
  { name: 'Alpaca Blends', value: '$45.1k', pct: 40 },
];

const marketingROI = [
  { name: 'Social Campaign Q4', roi: '5.2x' },
  { name: 'Email Retargeting', roi: '8.4x' },
  { name: 'Influencer Collabs', roi: '3.1x' },
];

const geography = [
  { city: 'Lima, PE', pct: 42 },
  { city: 'Arequipa, PE', pct: 18 },
  { city: 'Cusco, PE', pct: 12 },
  { city: 'United States', pct: 15 },
];

const donutColors = ['#7c5400', '#705a46', '#9a6c14', '#d4c4b1'];
const donutSegments = [
  { label: 'Web (45%)', pct: 45, color: '#7c5400' },
  { label: 'B2B (25%)', pct: 25, color: '#705a46' },
  { label: 'Stores (15%)', pct: 15, color: '#9a6c14' },
  { label: 'Intl (15%)', pct: 15, color: '#d4c4b1' },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('Oct 01, 2023 - Oct 31, 2023');

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <div className={styles.breadcrumbs}>
            <span>Admin</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Analytics</span>
          </div>
          <h2 className={styles.pageTitle}>Inteligencia de Negocios</h2>
          <p className={styles.pageDesc}>Métricas clave y análisis de rendimiento del negocio.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.periodPicker}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-on-surface-variant)' }}>calendar_today</span>
            <span className={styles.periodText}>{period}</span>
          </div>
          <button className={styles.filterBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>filter_list</span>
            Filtros
          </button>
          <button className={styles.exportBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
            Export Data
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <div key={kpi.id} className={styles.kpiCard}>
            <div className={styles.kpiAccent} />
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>{kpi.label}</p>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              <span className={styles.kpiTrend}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>trending_up</span>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className={styles.chartsGrid}>
        {/* Line Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h4 className={styles.chartTitle}>Tendencia de Ventas vs. Ingresos</h4>
            <div className={styles.chartLegend}>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: '#7c5400' }} />
                Ventas
              </span>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: '#705a46' }} />
                Ingresos
              </span>
            </div>
          </div>
          <svg className={styles.lineSvg} viewBox="0 0 800 200">
            {[40, 80, 120, 160].map((y) => (
              <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#f8ece4" strokeWidth="1" />
            ))}
            <path d="M0,170 L100,150 L200,120 L300,135 L400,90 L500,70 L600,85 L700,50 L800,35" fill="none" stroke="#7c5400" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0,190 L100,180 L200,160 L300,175 L400,140 L500,125 L600,135 L700,100 L800,90" fill="none" stroke="#705a46" strokeWidth="3" strokeDasharray="6,4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className={styles.lineLabels}>
            <span>01 Oct</span><span>08 Oct</span><span>15 Oct</span><span>22 Oct</span><span>31 Oct</span>
          </div>
        </div>

        {/* Donut Chart */}
        <div className={styles.chartCard}>
          <h4 className={styles.chartTitle} style={{ marginBottom: '1.5rem' }}>Distribución por Canal</h4>
          <div className={styles.donutWrap}>
            <div className={styles.donutContainer}>
              <svg viewBox="0 0 36 36" className={styles.donutSvg}>
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f8ece4" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#7c5400" strokeWidth="4" strokeDasharray="45 55" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#705a46" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-45" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#9a6c14" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-70" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#d4c4b1" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-85" />
              </svg>
              <div className={styles.donutCenter}>
                <span className={styles.donutCenterLabel}>Total</span>
                <span className={styles.donutCenterValue}>100%</span>
              </div>
            </div>
            <div className={styles.donutLegend}>
              {donutSegments.map((seg) => (
                <div key={seg.label} className={styles.donutLegendItem}>
                  <span className={styles.donutDot} style={{ backgroundColor: seg.color }} />
                  <span className={styles.donutLegendLabel}>{seg.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className={styles.bottomGrid}>
        {/* Categories Progress */}
        <div className={styles.chartCard}>
          <h4 className={styles.chartTitle} style={{ marginBottom: '1.5rem' }}>Top Categorías de Productos</h4>
          <div className={styles.progressList}>
            {categories.map((cat) => (
              <div key={cat.name} className={styles.progressItem}>
                <div className={styles.progressHeader}>
                  <span className={styles.progressName}>{cat.name}</span>
                  <span className={styles.progressValue}>{cat.value}</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing + Inventory */}
        <div className={styles.middleCol}>
          <div className={styles.chartCard}>
            <div className={styles.marketingHeader}>
              <h4 className={styles.chartTitle}>Marketing Performance</h4>
              <span className={styles.roiBadge}>HIGH ROI</span>
            </div>
            <div className={styles.roiList}>
              {marketingROI.map((m) => (
                <div key={m.name} className={styles.roiRow}>
                  <span className={styles.roiName}>{m.name}</span>
                  <span className={styles.roiValue}>{m.roi} ROI</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.inventoryHeader}>
              <h4 className={styles.chartTitle}>Salud del Inventario</h4>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-error)' }}>report</span>
            </div>
            <div className={styles.inventoryGrid}>
              <div>
                <p className={styles.invLabel}>Turnover</p>
                <p className={styles.invValue}>4.2x</p>
              </div>
              <div>
                <p className={styles.invLabel}>Low Stock</p>
                <p className={styles.invValueError}>12 SKU</p>
              </div>
            </div>
            <button className={styles.stockAlertBtn}>Revisar Alertas de Stock</button>
          </div>
        </div>

        {/* Geography */}
        <div className={styles.chartCard}>
          <h4 className={styles.chartTitle} style={{ marginBottom: '1rem' }}>Geografía de Clientes</h4>
          <div className={styles.geoPlaceholder}>
            <div className={styles.geoOverlay}>
              {geography.map((g) => (
                <div key={g.city} className={styles.geoRow}>
                  <span className={styles.geoCity}>{g.city}</span>
                  <span className={styles.geoPct}>{g.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <span className={styles.footerText}>© 2023 Alpacart Textiles ERP - Sistema de Inteligencia de Negocios v2.4</span>
        <div className={styles.footerRight}>
          <span className={styles.syncBadge}>
            <span className={styles.syncDot} />
            Sincronizado en tiempo real
          </span>
          <span className={styles.footerText}>Última actualización: hace 5 min</span>
        </div>
      </footer>
    </div>
  );
}
