import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.css';

const products = [
  { id: 1, sku: 'ALP-INV-24-001', name: 'Manta Imperial Gold', material: '100% Baby Alpaca', collection: 'Invierno 2024', category: 'Manta', status: 'Activo', stock: 428, maxStock: 570, price: 285.00, updated: '12 Oct, 2023' },
  { id: 2, sku: 'ALP-ANC-23-084', name: 'Chal Ancestral Mist', material: 'Mix Alpaca/Silk', collection: 'Ancestral', category: 'Chal', status: 'Oculto', stock: 12, maxStock: 120, price: 145.50, updated: '08 Oct, 2023' },
  { id: 3, sku: 'ALP-BUF-24-112', name: 'Bufanda Ribbed Storm', material: '100% FS Alpaca', collection: 'Invierno 2024', category: 'Bufanda', status: 'Descontinuado', stock: 0, maxStock: 200, price: 92.00, updated: '05 Oct, 2023' },
  { id: 4, sku: 'ALP-ROY-24-045', name: 'Poncho Real Tawantinsuyo', material: 'Alpaca Real', collection: 'Imperial', category: 'Poncho', status: 'Activo', stock: 89, maxStock: 150, price: 420.00, updated: '28 Sep, 2023' },
  { id: 5, sku: 'ALP-BAB-24-203', name: 'Suéter Baby Alpaca Soft', material: '100% Baby Alpaca', collection: 'Ancestral', category: 'Suéter', status: 'Activo', stock: 234, maxStock: 300, price: 178.00, updated: '25 Sep, 2023' },
  { id: 6, sku: 'ALP-PRE-24-078', name: 'Cobija Premium King', material: 'Mix Alpaca/Silk', collection: 'Invierno 2024', category: 'Manta', status: 'Activo', stock: 56, maxStock: 80, price: 350.00, updated: '20 Sep, 2023' },
  { id: 7, sku: 'ALP-VIC-23-156', name: 'Chal Vicuña Exclusive', material: '100% Vicuña', collection: 'Imperial', category: 'Chal', status: 'Oculto', stock: 5, maxStock: 40, price: 890.00, updated: '15 Sep, 2023' },
  { id: 8, sku: 'ALP-ACC-24-312', name: 'Guantes Glaciar Alpaca', material: '100% FS Alpaca', collection: 'Invierno 2024', category: 'Accesorios', status: 'Activo', stock: 0, maxStock: 500, price: 45.00, updated: '10 Sep, 2023' },
];

const statusStyles = {
  Activo: { bg: '#e8f5e9', text: '#2e7d32' },
  Oculto: { bg: '#fbddc3', text: '#705a46' },
  Descontinuado: { bg: '#ffdad6', text: '#ba1a1a' },
};

function getStockPercent(stock, max) {
  if (max === 0) return 0;
  return Math.round((stock / max) * 100);
}

function getStockColor(stock, max) {
  if (max === 0) return 'var(--color-outline-variant)';
  const pct = (stock / max) * 100;
  if (pct <= 20) return 'var(--color-error)';
  if (pct <= 50) return 'var(--color-warning)';
  return 'var(--color-primary)';
}

function getStockLabel(stock, max) {
  if (stock === 0) return { text: 'Stock Out', class: 'out' };
  const pct = (stock / max) * 100;
  if (pct <= 20) return { text: 'Critico', class: 'critical' };
  if (pct <= 50) return { text: 'Bajo', class: 'low' };
  return { text: 'In Stock', class: 'normal' };
}

export default function ProductList() {
  const [selected, setSelected] = useState([]);

  const handleMasterCheck = (e) => {
    if (e.target.checked) {
      setSelected(products.map((p) => p.id));
    } else {
      setSelected([]);
    }
  };

  const handleRowCheck = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allSelected = selected.length === products.length;
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <div className={styles.page}>
      {/* Breadcrumbs & Main Actions */}
      <div className={styles.headerSection}>
        <div>
          <nav className={styles.breadcrumb}>
            <Link to="/catalog" className={styles.breadcrumbLink}>Catalog</Link>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Products</span>
          </nav>
          <h2 className={styles.pageTitle}>Product Catalog</h2>
          <p className={styles.pageDesc}>Gestión centralizada del catálogo textil — 4,200 productos registrados.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>upload</span>
            Import
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
            Export
          </button>
          <Link to="/catalog/productos/nuevo" className={styles.btnPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Crear Producto
          </Link>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-on-surface-variant)', fontSize: 18 }}>search</span>
          <input className={styles.searchInput} type="text" placeholder="Buscar por SKU, nombre o categoría..." />
        </div>
        <div className={styles.filterControls}>
          <select className={styles.select}>
            <option>Collection: All</option>
            <option>Invierno 2024</option>
            <option>Imperial</option>
            <option>Ancestral</option>
          </select>
          <select className={styles.select}>
            <option>Category: All</option>
            <option>Manta</option>
            <option>Chal</option>
            <option>Bufanda</option>
          </select>
          <select className={styles.select}>
            <option>Status: All</option>
            <option>Activo</option>
            <option>Oculto</option>
            <option>Descontinuado</option>
          </select>
          <select className={styles.select}>
            <option>Stock Level</option>
            <option>Low Stock</option>
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
        <div className={styles.viewToggle}>
          <button className={`${styles.viewBtn} ${styles.viewActive}`}>
            <span className="material-symbols-outlined">table_chart</span>
          </button>
          <button className={styles.viewBtn}>
            <span className="material-symbols-outlined">grid_view</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thCheck}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected; }}
                  onChange={handleMasterCheck}
                />
              </th>
              <th className={styles.th}>Imagen</th>
              <th className={styles.th}>SKU</th>
              <th className={styles.th}>Producto</th>
              <th className={styles.th}>Colección</th>
              <th className={styles.th}>Categoría</th>
              <th className={`${styles.th} ${styles.thCenter}`}>Estado</th>
              <th className={styles.th}>Stock</th>
              <th className={styles.th}>Precio</th>
              <th className={styles.th}>Actualizado</th>
              <th className={styles.thRight}></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const stockPct = getStockPercent(product.stock, product.maxStock);
              const stockColor = getStockColor(product.stock, product.maxStock);
              const stockLabel = getStockLabel(product.stock, product.maxStock);
              const statusStyle = statusStyles[product.status] || { bg: '#f5f5f5', text: '#666' };

              return (
                <tr
                  key={product.id}
                  className={`${styles.tr} ${selected.includes(product.id) ? styles.trSelected : ''}`}
                >
                  <td className={styles.tdCheck}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selected.includes(product.id)}
                      onChange={() => handleRowCheck(product.id)}
                    />
                  </td>
                  <td className={styles.td}>
                    <div className={styles.productImage}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-outline)' }}>inventory_2</span>
                    </div>
                  </td>
                  <td className={styles.tdSku}>{product.sku}</td>
                  <td className={styles.tdProduct}>
                    <p className={styles.productName}>{product.name}</p>
                    <p className={styles.productMaterial}>{product.material}</p>
                  </td>
                  <td className={styles.td}>{product.collection}</td>
                  <td className={styles.td}>{product.category}</td>
                  <td className={`${styles.td} ${styles.tdCenter}`}>
                    <span className={styles.statusBadge} style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}>
                      {product.status}
                    </span>
                  </td>
                  <td className={styles.tdStock}>
                    <div className={styles.stockBar}>
                      <div className={styles.stockBarInfo}>
                        <span>{product.stock}</span>
                        <span className={styles.stockLabel} style={{ color: stockLabel.class === 'critical' || stockLabel.class === 'out' ? 'var(--color-error)' : 'var(--color-on-surface-variant)' }}>
                          {stockLabel.text}
                        </span>
                      </div>
                      <div className={styles.stockTrack}>
                        <div className={styles.stockFill} style={{ width: `${stockPct}%`, backgroundColor: stockColor }} />
                      </div>
                    </div>
                  </td>
                  <td className={styles.tdPrice}>$ {product.price.toFixed(2)}</td>
                  <td className={styles.tdDate}>{product.updated}</td>
                  <td className={styles.tdActions}>
                    <div className={styles.actionBtns}>
                      <button className={styles.actionBtn} style={{ color: 'var(--color-primary)' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                      </button>
                      <button className={styles.actionBtn}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <footer className={styles.pagination}>
        <div className={styles.paginationLeft}>
          <p className={styles.paginationInfo}>Mostrando <strong>1-8</strong> de <strong>4,200</strong> productos</p>
          <div className={styles.perPage}>
            <span>Items por página:</span>
            <select className={styles.perPageSelect}>
              <option>50</option>
              <option>100</option>
              <option>200</option>
            </select>
          </div>
        </div>
        <div className={styles.paginationRight}>
          <button className={styles.pageBtn} disabled>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
          </button>
          <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <span className={styles.pageDots}>...</span>
          <button className={styles.pageBtn}>84</button>
          <button className={styles.pageBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
          </button>
        </div>
      </footer>

      {/* Bulk Action Toolbar */}
      <div className={`${styles.bulkToolbar} ${selected.length > 0 ? styles.bulkVisible : ''}`}>
        <div className={styles.bulkLeft}>
          <span className={styles.bulkCount}>{selected.length}</span>
          <span className={styles.bulkLabel}>Seleccionados</span>
        </div>
        <div className={styles.bulkActions}>
          <button className={styles.bulkBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>visibility_off</span>
            Cambiar Estado
          </button>
          <button className={styles.bulkBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>folder_code</span>
            A Colección
          </button>
          <button className={`${styles.bulkBtn} ${styles.bulkDanger}`}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>delete</span>
            Eliminar
          </button>
        </div>
        <button className={styles.bulkClose} onClick={() => setSelected([])}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
        </button>
      </div>
    </div>
  );
}
