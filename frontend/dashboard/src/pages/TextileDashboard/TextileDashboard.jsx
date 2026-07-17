import { useState } from 'react';
import styles from './TextileDashboard.module.css';

const kpiData = [
  { id: 1, label: 'Total de Variantes', value: '3,500', subtitle: 'Activas' },
  { id: 2, label: 'Materiales Registrados', value: '24', subtitle: 'Tipos' },
  { id: 3, label: 'Colores Disponibles', value: '156', subtitle: 'Tonos' },
  { id: 4, label: 'Tallas Disponibles', value: '12', subtitle: 'Standards' },
  { id: 5, label: 'Colecciones Activas', value: '8', subtitle: 'Ciclos' },
];

const fiberData = [
  { name: 'Alpaca Baby', percent: 45, color: 'var(--color-primary)' },
  { name: 'Royal Mix', percent: 30, color: 'var(--color-secondary-container)' },
  { name: 'Surí Extra Fine', percent: 15, color: 'var(--color-secondary)' },
  { name: 'Otros', percent: 10, color: 'var(--color-secondary-fixed-dim)' },
];

const sizes = [
  { label: 'S', height: 60, title: 'Standard: 840' },
  { label: 'M', height: 85, title: 'King: 1200' },
  { label: 'L', height: 100, title: 'L: 1500' },
  { label: 'XL', height: 70, title: 'XL: 1000' },
  { label: 'XXL', height: 40, title: 'XXL: 450' },
  { label: 'KIDS', height: 25, title: 'Kids: 200' },
];

const seasons = [
  { name: 'Winter 2024', products: '1,200', width: 85 },
  { name: 'Imperial Spring', products: '850', width: 60 },
  { name: 'High Summer', products: '450', width: 35 },
  { name: 'Andean Autumn', products: '920', width: 70 },
];

const garmentTypes = ['Mantones', 'Chalecos', 'Bufandas', 'Ruanas'];

const careSteps = [
  { icon: 'wash', title: 'Lavar a Mano', desc: 'Agua fría (máx 30°C) con jabón neutro.' },
  { icon: 'dry_cleaning', title: 'Secado Plano', desc: 'No retorcer. Secar a la sombra sobre superficie plana.' },
  { icon: 'iron', title: 'Planchado Suave', desc: 'Plancha tibia con vapor, sin contacto directo.' },
];

const donutStyle = {
  borderRightColor: 'var(--color-secondary-container)',
  borderBottomColor: 'var(--color-secondary)',
  borderLeftColor: 'var(--color-secondary-fixed-dim)',
};

export default function TextileDashboard() {
  const [hoveredKpi, setHoveredKpi] = useState(null);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <div className={styles.breadcrumbs}>
            <span>Dashboard</span>
            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Textile</span>
          </div>
          <h2 className={styles.pageTitle}>Gestión Textil</h2>
          <p className={styles.pageDesc}>Control de fibras, variantes y colecciones de alpaca.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.searchWrap}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>search</span>
            <input className={styles.searchInput} placeholder="Buscar material o variante..." />
          </div>
          <button className={styles.iconBtn}>
            <span className="material-symbols-outlined">notifications</span>
            <span className={styles.notifDot} />
          </button>
          <button className={styles.iconBtn}>
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className={styles.iconBtn}>
            <span className="material-symbols-outlined">apps</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className={styles.kpiGrid}>
        {kpiData.map((kpi) => (
          <div
            key={kpi.id}
            className={`${styles.kpiCard} ${hoveredKpi === kpi.id ? styles.kpiCardHover : ''}`}
            onMouseEnter={() => setHoveredKpi(kpi.id)}
            onMouseLeave={() => setHoveredKpi(null)}
          >
            <div className={styles.kpiAccent} />
            <span className={styles.kpiLabel}>{kpi.label}</span>
            <div className={styles.kpiValueRow}>
              <span className={styles.kpiValue}>{kpi.value}</span>
              <span className={styles.kpiSubtitle}>{kpi.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className={styles.analyticsGrid}>
        {/* Donut Chart - Productos por Material */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h4 className={styles.chartTitle}>Productos por Material</h4>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-on-surface-variant)', cursor: 'pointer', fontSize: 20 }}>more_vert</span>
          </div>
          <div className={styles.donutWrap}>
            <div className={styles.donut} style={donutStyle}>
              <div className={styles.donutInner}>
                <span className={styles.donutValue}>24</span>
                <span className={styles.donutLabel}>Tipos</span>
              </div>
            </div>
          </div>
          <div className={styles.legendList}>
            {fiberData.map((f) => (
              <div key={f.name} className={styles.legendRow}>
                <div className={styles.legendLeft}>
                  <span className={styles.legendDot} style={{ backgroundColor: f.color }} />
                  <span className={styles.legendName}>{f.name}</span>
                </div>
                <span className={styles.legendPercent}>{f.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart - Variantes por Talla */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h4 className={styles.chartTitle}>Variantes por Talla</h4>
            <div className={styles.chartToggle}>
              <button className={styles.toggleBtn}>Mensual</button>
              <button className={`${styles.toggleBtn} ${styles.toggleActive}`}>Anual</button>
            </div>
          </div>
          <div className={styles.barChart}>
            {sizes.map((s) => (
              <div key={s.label} className={styles.barGroup}>
                <div
                  className={`${styles.bar} ${s.label === 'L' ? styles.barPrimary : styles.barSecondary}`}
                  style={{ height: `${s.height}%` }}
                  title={s.title}
                />
                <span className={styles.barLabel}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.barFooter}>
            <div className={styles.barFooterItem}>
              <span className={styles.barFooterLabel}>Promedio/Variante</span>
              <span className={styles.barFooterValue}>292</span>
            </div>
            <div className={styles.barFooterItem}>
              <span className={styles.barFooterLabel}>Talla más común</span>
              <span className={styles.barFooterValue} style={{ color: 'var(--color-primary)' }}>Large (L)</span>
            </div>
          </div>
        </div>

        {/* Seasonal Progress Bars */}
        <div className={styles.chartCard}>
          <h4 className={styles.chartTitle} style={{ marginBottom: '1.5rem' }}>Productos por Temporada</h4>
          <div className={styles.seasonList}>
            {seasons.map((s, i) => (
              <div key={s.name} className={styles.seasonItem}>
                <div className={styles.seasonHeader}>
                  <span className={styles.seasonName}>{s.name}</span>
                  <span className={styles.seasonCount}>{s.products} Productos</span>
                </div>
                <div className={styles.seasonTrack}>
                  <div
                    className={`${styles.seasonFill} ${i === 0 ? styles.seasonFillPrimary : styles.seasonFillSecondary}`}
                    style={{ width: `${s.width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specs Panel */}
        <div className={styles.chartCard}>
          <h4 className={styles.chartTitle} style={{ marginBottom: '1rem' }}>Especificaciones Técnicas</h4>
          <div className={styles.specSection}>
            <span className={styles.specLabel}>Tipos de Prenda</span>
            <div className={styles.tagList}>
              {garmentTypes.map((g) => (
                <span key={g} className={styles.tag}>{g}</span>
              ))}
            </div>
          </div>
          <div className={styles.specDivider} />
          <div className={styles.specSection}>
            <span className={styles.specLabel}>Instrucciones de Cuidado</span>
            <div className={styles.careList}>
              {careSteps.map((c) => (
                <div key={c.icon} className={styles.careItem}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>{c.icon}</span>
                  <div>
                    <p className={styles.careTitle}>{c.title}</p>
                    <p className={styles.careDesc}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.featuredFiber}>
            <div className={styles.fiberPreview} />
            <div>
              <p className={styles.fiberName}>Fibra Destacada</p>
              <p className={styles.fiberDesc}>Alpaca Baby Superfine &bull; 19.5 Micras</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      <div className={styles.fabBar}>
        <button className={styles.fabPrimary}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
          Nueva Variante
        </button>
        <div className={styles.fabDivider} />
        <button className={styles.fabBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>grid_view</span>
          Nuevo Material
        </button>
        <button className={styles.fabBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>auto_awesome_motion</span>
          Nueva Colección
        </button>
      </div>
    </div>
  );
}
