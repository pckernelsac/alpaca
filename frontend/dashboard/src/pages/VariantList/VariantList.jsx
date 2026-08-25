import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './VariantList.module.css';

const parentProduct = {
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCojKZHvcE-fr8KL5yXAyWXQIXzkVXlQBChPtvMNwT1Owg7t7KkfxX23t8RNJkufLjjB_IVLthli9pPhFYwFOJ2B98JsYWVtCiWdxYqvRs7l9gTB614SBdW6xOIlaftATrP7zMBnYuc4EiJWty36LYyyer7n3P0NmKr0AGjM0cZRJIGMzhUycJqq0eeoKRiGN-ZbvOVeoxfnDfm9DKwmSWjzFNPjpPZit3EK0V5fs3XN0jLHNoh8xnhBoA4OjBg4LTCwROUhRozAWh',
  name: 'Manta Imperial Gold',
  rootSku: 'ALP-MIG-000',
  totalVariants: '12 activas / 15 total',
  consolidatedStock: 482,
};

const variants = [
  { id: 1, color: '#D4AF37', colorName: 'Dorado Inca', talla: 'ESTÁNDAR', material: 'Baby Alpaca 100%', sku: 'ALP-MIG-GOLD-ST', code: '784-001', price: 145.00, stock: 45, status: 'Activo' },
  { id: 2, color: '#F5F5F5', colorName: 'Blanco Alpaca', talla: 'ESTÁNDAR', material: 'Baby Alpaca 100%', sku: 'ALP-MIG-WHTE-ST', code: '784-002', price: 145.00, stock: 12, status: 'Activo' },
  { id: 3, color: '#4A4A4A', colorName: 'Gris Nevado', talla: 'KING', material: 'Alpaca / Seda Mix', sku: 'ALP-MIG-GRAY-KG', code: '784-003', price: 185.00, stock: 0, status: 'Agotado' },
  { id: 4, color: '#8B4513', colorName: 'Cobre Andino', talla: 'ESTÁNDAR', material: 'Baby Alpaca 100%', sku: 'ALP-MIG-COBR-ST', code: '784-004', price: 155.00, stock: 78, status: 'Activo' },
  { id: 5, color: '#2F4F4F', colorName: 'Verde Musgo', talla: 'KING', material: 'Alpaca / Seda Mix', sku: 'ALP-MIG-GRN-KG', code: '784-005', price: 195.00, stock: 23, status: 'Activo' },
  { id: 6, color: '#800020', colorName: 'Burdeos Real', talla: 'ESTÁNDAR', material: 'Baby Alpaca 100%', sku: 'ALP-MIG-BUR-ST', code: '784-006', price: 155.00, stock: 3, status: 'Activo' },
];

const statusOptions = ['Activo', 'Oculto', 'Agotado'];

function getStockColor(stock) {
  if (stock === 0) return 'var(--color-error)';
  if (stock <= 20) return 'var(--color-error)';
  if (stock <= 50) return 'var(--color-warning)';
  return 'var(--color-primary)';
}

export default function VariantList() {
  const [selected, setSelected] = useState([]);
  const [editStock, setEditStock] = useState(null);
  const [stockValues, setStockValues] = useState({});
  const [data, setData] = useState(variants);

  const allSelected = selected.length === data.length;
  const someSelected = selected.length > 0 && !allSelected;

  const handleMasterCheck = (e) => {
    setSelected(e.target.checked ? data.map((v) => v.id) : []);
  };

  const handleRowCheck = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleStockClick = (id, currentStock) => {
    setEditStock(id);
    setStockValues((prev) => ({ ...prev, [id]: currentStock }));
  };

  const handleStockChange = (id, value) => {
    setStockValues((prev) => ({ ...prev, [id]: Number(value) }));
  };

  const handleStockBlur = (id) => {
    setData((prev) => prev.map((v) => v.id === id ? { ...v, stock: stockValues[id] ?? v.stock } : v));
    setEditStock(null);
  };

  const handleStockKeyDown = (e, id) => {
    if (e.key === 'Enter') handleStockBlur(id);
    if (e.key === 'Escape') setEditStock(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setData((prev) => prev.map((v) => v.id === id ? { ...v, status: newStatus } : v));
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <div>
          <nav className={styles.breadcrumb}>
            <Link to="/catalog" className={styles.breadcrumbLink}>Catálogo</Link>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Variantes</span>
          </nav>
          <h2 className={styles.pageTitle}>Administración de Variantes</h2>
          <p className={styles.pageDesc}>Gestión de SKUs y disponibilidad para Manta Imperial Gold</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>file_download</span>
            Exportar
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span>
            Guardar Cambios
          </button>
        </div>
      </div>

      <div className={styles.parentCard}>
        <div className={styles.parentImage}>
          <img src={parentProduct.image} alt={parentProduct.name} className={styles.parentImg} />
        </div>
        <div className={styles.parentInfo}>
          <div className={styles.parentField}>
            <span className={styles.parentLabel}>Producto Base</span>
            <span className={styles.parentValue}>{parentProduct.name}</span>
          </div>
          <div className={styles.parentField}>
            <span className={styles.parentLabel}>SKU Raíz</span>
            <span className={styles.parentValueMono}>{parentProduct.rootSku}</span>
          </div>
          <div className={styles.parentField}>
            <span className={styles.parentLabel}>Total Variantes</span>
            <span className={styles.parentValue}>{parentProduct.totalVariants}</span>
          </div>
          <div className={styles.parentField}>
            <span className={styles.parentLabel}>Stock Consolidado</span>
            <div className={styles.parentStock}>
              <div className={styles.parentStockTrack}>
                <div className={styles.parentStockFill} style={{ width: '75%' }} />
              </div>
              <span className={styles.parentStockQty}>{parentProduct.consolidatedStock} und.</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.filterLeft}>
          <div className={styles.searchWrap}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-on-surface-variant)', fontSize: 18 }}>search</span>
            <input className={styles.searchInput} type="text" placeholder="Buscar por SKU..." />
          </div>
          <select className={styles.select}>
            <option>Talla</option>
            <option>Estándar</option>
            <option>King</option>
          </select>
          <select className={styles.select}>
            <option>Color</option>
            <option>Dorado Inca</option>
            <option>Blanco Alpaca</option>
            <option>Gris Nevado</option>
          </select>
          <select className={styles.select}>
            <option>Estado</option>
            <option>Activo</option>
            <option>Agotado</option>
          </select>
          <button className={styles.clearFilters}>Limpiar filtros</button>
        </div>
        <div className={styles.filterRight}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>auto_awesome</span>
            Generar Variantes
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>layers</span>
            Edición Masiva
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thCheck}>
                <input type="checkbox" className={styles.checkbox} checked={allSelected} ref={(el) => { if (el) el.indeterminate = someSelected; }} onChange={handleMasterCheck} />
              </th>
              <th className={styles.th}>Color</th>
              <th className={styles.th}>Talla</th>
              <th className={styles.th}>Material</th>
              <th className={styles.th}>SKU / Cód. Interno</th>
              <th className={styles.th}>Precio (USD)</th>
              <th className={styles.th}>Stock</th>
              <th className={styles.th}>Estado</th>
              <th className={styles.thRight}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((v) => {
              const isLowStock = v.stock === 0;
              return (
                <tr key={v.id} className={`${styles.tr} ${selected.includes(v.id) ? styles.trSelected : ''} ${isLowStock ? styles.trLow : ''}`}>
                  <td className={styles.tdCheck}>
                    <input type="checkbox" className={styles.checkbox} checked={selected.includes(v.id)} onChange={() => handleRowCheck(v.id)} />
                  </td>
                  <td className={styles.td}>
                    <div className={styles.colorCell}>
                      <div className={styles.colorSwatch} style={{ backgroundColor: v.color }} />
                      <span className={styles.colorName}>{v.colorName}</span>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.sizeBadge}>{v.talla}</span>
                  </td>
                  <td className={styles.tdMuted}>{v.material}</td>
                  <td className={styles.td}>
                    <div className={styles.skuGroup}>
                      <input className={styles.editableInput} type="text" defaultValue={v.sku} />
                      <input className={styles.editableInputSub} type="text" defaultValue={v.code} />
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.priceGroup}>
                      <span className={styles.dollarSign}>$</span>
                      <input className={styles.editableInputPrice} type="number" defaultValue={v.price} />
                    </div>
                  </td>
                  <td className={styles.td}>
                    {editStock === v.id ? (
                      <input
                        className={styles.stockInput}
                        type="number"
                        value={stockValues[v.id] ?? v.stock}
                        onChange={(e) => handleStockChange(v.id, e.target.value)}
                        onBlur={() => handleStockBlur(v.id)}
                        onKeyDown={(e) => handleStockKeyDown(e, v.id)}
                        autoFocus
                      />
                    ) : (
                      <div className={styles.stockCell} onClick={() => handleStockClick(v.id, v.stock)}>
                        <span className={styles.stockValue} style={{ color: getStockColor(v.stock) }}>{v.stock}</span>
                        <div className={styles.stockProgress}>
                          <div className={styles.stockTrack}>
                            <div className={styles.stockFill} style={{ width: `${Math.min((v.stock / 100) * 100, 100)}%`, backgroundColor: getStockColor(v.stock) }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className={styles.td}>
                    <select className={styles.statusSelect} value={v.status} onChange={(e) => handleStatusChange(v.id, e.target.value)} style={{ color: v.status === 'Agotado' ? 'var(--color-error)' : 'var(--color-primary)' }}>
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.tdRight}>
                    <div className={styles.actionBtns}>
                      <button className={styles.actionBtn} style={{ color: 'var(--color-primary)' }}>
                        <span className="material-symbols-outlined">content_copy</span>
                      </button>
                      <button className={styles.actionBtn} style={{ color: 'var(--color-error)' }}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className={styles.pagination}>
        <p className={styles.paginationInfo}>Mostrando {data.length} de 15 variantes encontradas</p>
        <div className={styles.paginationBtns}>
          <button className={styles.pageBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
          </button>
          <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <button className={styles.pageBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
          </button>
        </div>
      </footer>

      <div className={`${styles.bulkToolbar} ${selected.length > 0 ? styles.bulkVisible : ''}`}>
        <div className={styles.bulkLeft}>
          <span className={styles.bulkCount}>{selected.length}</span>
          <span className={styles.bulkLabel}>seleccionados</span>
          <button className={styles.clearSelection} onClick={() => setSelected([])}>Deseleccionar</button>
        </div>
        <div className={styles.bulkDivider} />
        <div className={styles.bulkActions}>
          <button className={styles.bulkBtn}>
            <span className="material-symbols-outlined">payments</span>
            Precio
          </button>
          <button className={styles.bulkBtn}>
            <span className="material-symbols-outlined">inventory</span>
            Stock
          </button>
          <button className={styles.bulkBtn}>
            <span className="material-symbols-outlined">visibility</span>
            Estado
          </button>
          <button className={`${styles.bulkBtn} ${styles.bulkDanger}`}>
            <span className="material-symbols-outlined">delete</span>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
