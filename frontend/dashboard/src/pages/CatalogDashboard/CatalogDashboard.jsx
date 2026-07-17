import { Link } from 'react-router-dom';
import styles from './CatalogDashboard.module.css';

const kpiItems = [
  { icon: 'inventory_2', label: 'Total Productos', value: '1,240', accent: 'primary', trend: { icon: 'trending_up', text: '+4% mes ant.', color: 'var(--color-primary)' } },
  { icon: 'check_circle', label: 'Productos Activos', value: '1,150', accent: 'success', trend: { icon: 'check_circle', text: '92.7% ratio', color: 'var(--color-success)' } },
  { icon: 'visibility_off', label: 'Productos Ocultos', value: '45', accent: 'outline', trend: { icon: 'visibility_off', text: 'Archivo temp.', color: 'var(--color-on-surface-variant)' } },
  { icon: 'warning', label: 'Productos Agotados', value: '12', accent: 'error', trend: { icon: 'warning', text: 'Acción requerida', color: 'var(--color-error)' } },
  { icon: 'layers', label: 'Variantes SKU', value: '3,500', accent: 'primary', trend: { icon: 'layers', text: 'Colores y Tallas', color: 'var(--color-on-surface-variant)' } },
  { icon: 'label', label: 'Categorías', value: '18', accent: 'primary', trend: { icon: 'label', text: 'Estructuradas', color: 'var(--color-on-surface-variant)' } },
];

const categoryData = [
  { label: 'Alpaca Baby', percent: 40, color: 'var(--color-primary)' },
  { label: 'Alpaca Royal', percent: 30, color: 'var(--color-secondary-container)' },
  { label: 'Mezclas Premium', percent: 15, color: 'var(--color-outline-variant)' },
  { label: 'Accesorios', percent: 15, color: 'var(--color-outline)' },
];

const collectionData = [
  { name: 'Colección Invierno 2024', count: '540 Prods', percent: 75 },
  { name: 'Otoño 2024', count: '312 Prods', percent: 45 },
  { name: 'Colección Imperial (Exclusiva)', count: '180 Prods', percent: 25 },
];

const topProducts = [
  { name: 'Manta Imperial "Salkantay"', collection: 'Colección Imperial', orders: 245, stock: '42 unid', stockClass: 'high' },
  { name: 'Chal Royal "Nube"', collection: 'Alpaca Royal', orders: 189, stock: '15 unid', stockClass: 'high' },
  { name: 'Alfombra Artisanal 2x3', collection: 'Accesorios', orders: 112, stock: '4 unid', stockClass: 'medium' },
  { name: 'Bufanda Baby Ochre', collection: 'Alpaca Baby', orders: 98, stock: '88 unid', stockClass: 'high' },
  { name: 'Cojín Silk-Blend', collection: 'Mezclas Premium', orders: 76, stock: '0 unid', stockClass: 'low' },
];

const activities = [
  { icon: 'sync', title: 'Stock actualizado para ', highlight: 'Manta Imperial Salkantay', time: 'Hace 15 minutos • Por: María González', bgVar: 'var(--color-secondary-container)', iconVar: 'var(--color-on-secondary-container)' },
  { icon: 'add_box', title: 'Nuevo producto registrado: ', highlight: 'Guantes Glaciar Alpaca', time: 'Hace 2 horas • Por: Sistema (Automático)', bgVar: 'var(--color-primary-container)', iconVar: 'var(--color-on-primary-container)' },
];

export default function CatalogDashboard() {
  const donutGradient = `conic-gradient(
    ${categoryData[0].color} 0% ${categoryData[0].percent}%,
    ${categoryData[1].color} ${categoryData[0].percent}% ${categoryData[0].percent + categoryData[1].percent}%,
    ${categoryData[2].color} ${categoryData[0].percent + categoryData[1].percent}% ${categoryData[0].percent + categoryData[1].percent + categoryData[2].percent}%,
    ${categoryData[3].color} ${categoryData[0].percent + categoryData[1].percent + categoryData[2].percent}% 100%
  )`;

  return (
    <div className={styles.page}>
      {/* Page Header & Quick Actions */}
      <section className={styles.headerSection}>
        <div>
          <nav className={styles.breadcrumb}>
            <span>Dashboard</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Catálogo de Productos</span>
          </nav>
          <h2 className={styles.pageTitle}>Gestión del Catálogo</h2>
          <p className={styles.pageDesc}>Administración centralizada de productos, colecciones y categorías textiles.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>sell</span>
            Nueva Categoría
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>folder_open</span>
            Nueva Colección
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Nuevo Producto
          </button>
        </div>
      </section>

      {/* KPI Grid */}
      <section className={styles.kpiGrid}>
        {kpiItems.map((kpi) => (
          <div key={kpi.label} className={styles.kpiCard}>
            <div className={styles.kpiAccent} style={{
              backgroundColor: kpi.accent === 'success' ? 'var(--color-success)' :
                kpi.accent === 'error' ? 'var(--color-error)' :
                kpi.accent === 'outline' ? 'var(--color-outline)' : 'var(--color-primary)'
            }} />
            <div className={styles.kpiContent}>
              <div className={styles.kpiHeader}>
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-primary-container)' }}>{kpi.icon}</span>
              </div>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              <div className={styles.kpiTrend} style={{ color: kpi.trend.color }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{kpi.trend.icon}</span>
                {kpi.trend.text}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Grid */}
      <section className={styles.mainGrid}>
        {/* Left: Charts */}
        <div className={styles.leftCol}>
          {/* Products by Category */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>pie_chart</span>
                Productos por Categoría
              </h3>
              <button className={styles.exportBtn}>Exportar</button>
            </div>
            <div className={styles.donutRow}>
              <div className={styles.donutWrap}>
                <div className={styles.donut} style={{ background: donutGradient }}>
                  <div className={styles.donutCenter}>
                    <span className={styles.donutValue}>1,240</span>
                    <span className={styles.donutLabel}>Total SKU</span>
                  </div>
                </div>
              </div>
              <div className={styles.legendList}>
                {categoryData.map((cat) => (
                  <div key={cat.label} className={styles.legendItem}>
                    <div className={styles.legendLeft}>
                      <span className={styles.legendDot} style={{ backgroundColor: cat.color }} />
                      <span className={styles.legendLabel}>{cat.label}</span>
                    </div>
                    <span className={styles.legendPercent}>{cat.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Volume by Collection */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>bar_chart</span>
                Volumen por Colección
              </h3>
            </div>
            <div className={styles.collectionList}>
              {collectionData.map((col) => (
                <div key={col.name} className={styles.collectionItem}>
                  <div className={styles.collectionInfo}>
                    <span>{col.name}</span>
                    <span className={styles.collectionCount}>{col.count}</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: `${col.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Top Products */}
        <div className={styles.rightCol}>
          <div className={`${styles.card} ${styles.topProductsCard}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 20 }}>auto_graph</span>
                Productos más Vendidos
              </h3>
              <p className={styles.topProductsSub}>Basado en volumen de pedidos (Últimos 30 días)</p>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>PRODUCTO</th>
                    <th style={{ textAlign: 'right' }}>PEDIDOS</th>
                    <th style={{ textAlign: 'right' }}>STOCK</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p) => (
                    <tr key={p.name} className={styles.tableRow}>
                      <td className={styles.productCell}>
                        <div className={styles.productInfo}>
                          <div className={styles.productAvatar}>
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>inventory_2</span>
                          </div>
                          <div>
                            <p className={styles.productName}>{p.name}</p>
                            <p className={styles.productCollection}>{p.collection}</p>
                          </div>
                        </div>
                      </td>
                      <td className={styles.ordersCell}>{p.orders}</td>
                      <td className={styles.stockCell}>
                        <span className={`${styles.stockBadge} ${styles[p.stockClass]}`}>{p.stock}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.cardFooter}>
              <button className={styles.footerLink}>Ver Reporte Completo de Ventas</button>
            </div>
          </div>
        </div>
      </section>

      {/* Activity & System Status */}
      <section className={styles.bottomGrid}>
        <div className={styles.activityCard}>
          <h4 className={styles.bottomCardTitle}>Últimas Actualizaciones de Inventario</h4>
          <div className={styles.activityFeed}>
            {activities.map((act, i) => (
              <div key={i} className={styles.activityItem}>
                <div className={styles.activityIconWrap} style={{ backgroundColor: act.bgVar, color: act.iconVar }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{act.icon}</span>
                </div>
                <div>
                  <p className={styles.activityText}>{act.title}<strong>{act.highlight}</strong></p>
                  <p className={styles.activityTime}>{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.insightCard}>
          <div className={styles.insightHeader}>
            <div className={styles.insightIcon}>
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <h4 className={styles.bottomCardTitle}>Insight del Catálogo</h4>
              <p className={styles.insightText}>Tu catálogo ha crecido un <span className={styles.insightHighlight}>12%</span> respecto al trimestre anterior.</p>
            </div>
          </div>
          <button className={styles.alertConfigBtn}>Configurar alertas de stock bajo</button>
        </div>
      </section>
    </div>
  );
}
