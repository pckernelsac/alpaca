import { useState } from 'react';
import styles from './StockList.module.css';

const kpiData = [
  { id: 1, label: 'Total SKU Items', value: '1,284', subtitle: '+12 this week', accent: 'primary' },
  { id: 2, label: 'Out of Stock', value: '18', subtitle: 'Action required', accent: 'error' },
  { id: 3, label: 'Total Inventory Value', value: '$248.5k', subtitle: 'USD Estimate', accent: 'secondary' },
  { id: 4, label: 'Incoming Shipments', value: '5', subtitle: 'Due 48h', accent: 'tertiary' },
];

const products = [
  { id: 1, name: 'Camel Vicuña Blend', sku: 'ALP-VIC-CAM-001', category: 'Fiber Category A1', units: 42, reserved: 15, min: 50, max: 200, warehouse: 'Almacén Cusco Central', lastSync: '2 mins ago', status: 'low', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoJqCpFnzvWLOjUxfUYjF5Ggb71169zPvKrKKlGN6GGwThe5Ejnnz3a7ja9vWGNnBA7p0Reo5Z5Zw1t0D3vhM5gwcAPZmJ9xj7tWptlel5q0GVykq0QT1NF0J8P65n3TQRubwYIP61JolqEpVgLGFY-27qWmRaRvGqOtlFJTcru7ixBBKsjmOS1uZX4gII5Pp1ZpHOAauA-o5_P4SYEaB-JZvY4Lnif7ygO7lKBgYqUznhERM3Dl2X9HqNiTW3PguiulFtFdiMu1ra' },
  { id: 2, name: 'Royal Blue Baby Alpaca', sku: 'ALP-BBY-BLU-902', category: 'Fiber Category B2', units: 850, reserved: 120, min: 100, max: 1000, warehouse: 'Sede Lima (Callao)', lastSync: '1 hour ago', status: 'in', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS9xxznPZ5tN_HwGgMxD2cu56mIDuB8zUu1o5iCGXMJ5pKalLAiY8UQ6NFOpiH40Sy94w1FkIumet1elyH7zHShwbbHI2UDn_T8zQuOYU1IQzeYuAzCyFKTYgItd6a6rpHW36PxxnA18-M81_f029hqiS_1HL2u34984fY1FhdWOFWApRTDFg3EgQOjHyAxUGdV8fwxu51R9q56yLA8P-Kuvut4OoncBqhAsTNSzqjMDY13LwpWLbOU_9Ts-_0oRKAc1rr1jjGzaTH' },
  { id: 3, name: 'Pure Suri White', sku: 'ALP-SURI-WHT-012', category: 'Specialist Blend S1', units: 0, reserved: 45, min: 25, max: 150, warehouse: 'Almacén Cusco Central', lastSync: '15 mins ago', status: 'out', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH3YDtwVm31NS-qYvT5ba3fVHoqIH4O0uwt3KoyCDbNxoiUONM16c7jvk6JGqfv07MWy8jFTaIarZbiR4GzEGSzzsH9ft9ZnMJVYU7I-tYzSFHolJbcMdclh_frREhJSMJd4vJLkd2hRZheAaTqTWsCjn47paXqJ1yJd2W8GqBs0ZV1OIXKCRY4a-708At4Adk9dC4adaTiYkS4iHvz5k3yetLI0wCb7ujpxT88DdwekuAO7Opx6gKNjFC9pXcGsdwZfO1tZq_YNUL' },
  { id: 4, name: 'Charcoal Merino Mix', sku: 'ALP-MIX-CHR-443', category: 'Hybrid Blend H3', units: 320, reserved: 8, min: 40, max: 500, warehouse: 'Sede Arequipa', lastSync: '6 hours ago', status: 'in', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwwM688CHa6DNOVh4itKvqijenV7cp7rTD71mR422WMyEcaxXhGiUVjTWhG0h7lvHLgW12D-_RT5yXBBq677XLn0NXCoLYw4FajwPk5ZL4NRuKk3dIh_jtaxGPO1QZk_WjmgjFVG3WegLMoTRx6s2zDUAmtPKOikhRdC_6J2xJj4uCpS0_7pZOUVil82Zue6xYZ87PlUxx3O6Lh2kRQGCXbDhp-1RPja1nGf_qsCxXnTPsck1hjNS0Mcq5aXFUew9OUZ6o2WtA6KgT' },
  { id: 5, name: 'Sunset Dyed Alpaca', sku: 'ALP-DYE-SUN-221', category: 'Artisan Dye D1', units: 15, reserved: 3, min: 30, max: 120, warehouse: 'Sede Arequipa', lastSync: '3 hours ago', status: 'low', img: '' },
  { id: 6, name: 'Eco Cotton Blend', sku: 'ECO-COT-BLD-017', category: 'Sustainable S2', units: 670, reserved: 55, min: 80, max: 600, warehouse: 'Sede Lima (Callao)', lastSync: '30 mins ago', status: 'in', img: '' },
];

const statusConfig = {
  low: { label: 'Low Stock', bg: 'var(--color-error-container)', text: 'var(--color-on-error-container)', dot: 'var(--color-error)', pulse: true },
  in: { label: 'In Stock', bg: 'var(--color-secondary-container)', text: 'var(--color-on-secondary-container)', dot: 'var(--color-secondary)', pulse: false },
  out: { label: 'Out of Stock', bg: 'var(--color-error)', text: 'var(--color-on-primary)', dot: null, pulse: false },
};

export default function StockList() {
  const [view, setView] = useState('table');
  const [search, setSearch] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [category, setCategory] = useState('');
  const [stockStatus, setStockStatus] = useState('');

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.headerSection}>
        <div>
          <div className={styles.breadcrumbs}>
            <span>Inventory Management</span>
            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Live Stock</span>
          </div>
          <h2 className={styles.pageTitle}>Gestión de Stock</h2>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${view === 'table' ? styles.viewActive : ''}`}
              onClick={() => setView('table')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>table_rows</span>
              Table
            </button>
            <button
              className={`${styles.viewBtn} ${view === 'cards' ? styles.viewActive : ''}`}
              onClick={() => setView('cards')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>grid_view</span>
              Cards
            </button>
          </div>
          <button className={styles.filterBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>filter_list</span>
            Advanced Filters
          </button>
          <div className={styles.actionGroup}>
            <button className={styles.actionBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>upload</span>
              Import
            </button>
            <button className={styles.actionBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
              Export
            </button>
          </div>
          <button className={styles.adjustBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Ajustar Stock
          </button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className={styles.kpiGrid}>
        {kpiData.map((kpi) => (
          <div key={kpi.id} className={styles.kpiCard} style={{ borderLeftColor: `var(--color-${kpi.accent})` }}>
            <p className={styles.kpiLabel}>{kpi.label}</p>
            <div className={styles.kpiRow}>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              <span className={styles.kpiSubtitle} style={{ color: kpi.accent === 'error' ? 'var(--color-error)' : 'var(--color-on-surface-variant)' }}>
                {kpi.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-on-surface-variant)' }}>search</span>
          <input
            className={styles.searchInput}
            placeholder="Search SKU, Product or Batch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filterSelects}>
          <select className={styles.filterSelect} value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
            <option value="">All Warehouses</option>
            <option>Lima (Sede Central)</option>
            <option>Cusco (Hilados)</option>
            <option>Arequipa (Tintorería)</option>
            <option>Puno (Acopio)</option>
          </select>
          <select className={styles.filterSelect} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option>Fiber Category A1</option>
            <option>Fiber Category B2</option>
            <option>Specialist Blend S1</option>
            <option>Hybrid Blend H3</option>
          </select>
          <select className={styles.filterSelect} value={stockStatus} onChange={(e) => setStockStatus(e.target.value)}>
            <option value="">All Stock Status</option>
            <option>Stock Crítico</option>
            <option>Stock Bajo</option>
            <option>Stock Óptimo</option>
            <option>Sobrestock</option>
          </select>
        </div>
      </div>

      {/* Table View */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thCheck}><input type="checkbox" className={styles.checkbox} /></th>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Warehouse</th>
                <th className={styles.thRight}>Unidades</th>
                <th className={styles.thRight}>Valor</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th>Último Movimiento</th>
                <th className={styles.thCenter}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const status = statusConfig[p.status];
                const percent = p.max > 0 ? Math.round((p.units / p.max) * 100) : 0;
                return (
                  <tr key={p.id} className={`${styles.tableRow} ${p.status === 'out' ? styles.rowOut : ''}`}>
                    <td className={styles.tdCheck}><input type="checkbox" className={styles.checkbox} /></td>
                    <td>
                      <div className={styles.productCell}>
                        <div className={styles.productImg}>
                          {p.img ? (
                            <img src={p.img} alt={p.name} className={styles.productImgSrc} />
                          ) : (
                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-on-surface-variant)' }}>inventory_2</span>
                          )}
                        </div>
                        <div>
                          <p className={styles.productName}>{p.name}</p>
                          <p className={styles.productCategory}>{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className={styles.cellMono}>{p.sku}</td>
                    <td className={styles.cellMuted}>{p.category}</td>
                    <td className={styles.cellMuted}>{p.warehouse}</td>
                    <td className={styles.tdRight}>
                      <span className={styles.unitsValue} style={{ color: percent < 20 ? 'var(--color-error)' : percent < 50 ? 'var(--color-warning)' : 'var(--color-success)' }}>
                        {p.units}
                      </span>
                      <div className={styles.stockBar}>
                        <div
                          className={styles.stockFill}
                          style={{
                            width: `${Math.min(percent, 100)}%`,
                            backgroundColor: percent < 20 ? 'var(--color-error)' : percent < 50 ? 'var(--color-warning)' : 'var(--color-success)',
                          }}
                        />
                      </div>
                    </td>
                    <td className={styles.tdRight}>
                      <span className={styles.valueText}>${(p.units * 12.5).toFixed(1)}k</span>
                    </td>
                    <td className={styles.cellMuted}>{p.warehouse}</td>
                    <td>
                      <span className={styles.statusBadge} style={{ backgroundColor: status.bg, color: status.text }}>
                        {status.dot && <span className={`${styles.statusDot} ${status.pulse ? styles.statusPulse : ''}`} style={{ backgroundColor: status.dot }} />}
                        {status.label}
                      </span>
                    </td>
                    <td className={styles.cellMuted}>{p.lastSync}</td>
                    <td className={styles.tdCenter}>
                      <div className={styles.actionCell}>
                        <button className={styles.iconBtn} title="Edit"><span className="material-symbols-outlined">edit</span></button>
                        <button className={styles.iconBtn} title="Adjust"><span className="material-symbols-outlined">tune</span></button>
                        <button className={styles.iconBtn} title="History"><span className="material-symbols-outlined">history</span></button>
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
          <div className={styles.paginationInfo}>
            <span>Showing <strong>1-{products.length}</strong> of <strong>1,284</strong> products</span>
            <select className={styles.perPage}>
              <option>10 per page</option>
              <option selected>25 per page</option>
              <option>50 per page</option>
            </select>
          </div>
          <div className={styles.paginationBtns}>
            <button className={styles.pageBtn} disabled>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
            </button>
            <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageEllipsis}>...</span>
            <button className={styles.pageBtn}>52</button>
            <button className={styles.pageBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Command Palette Hint */}
      <div className={styles.cmdHint}>
        <div className={styles.cmdHintContent}>
          <div>
            <p className={styles.cmdHintLabel}>Quick Command</p>
            <p className={styles.cmdHintText}>
              Press <kbd className={styles.cmdKbd}>⌘ K</kbd> to find SKU
            </p>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-primary-fixed)' }}>terminal</span>
        </div>
      </div>
    </div>
  );
}
