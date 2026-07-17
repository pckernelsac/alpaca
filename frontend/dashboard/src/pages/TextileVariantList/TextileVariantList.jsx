import { useState } from 'react';
import styles from './TextileVariantList.module.css';

const variants = [
  { id: 1, sku: 'ALP-VC-JK-001-S', product: 'Vicuña Heritage Jacket', category: 'Outerwear Collection', material: '100% Baby Alpaca', color: 'Vicuña Gold', colorHex: '#D4AF37', size: 'Small', season: 'Winter 2024', status: 'Active', statusClass: 'active', date: 'Oct 24, 2023', img: '' },
  { id: 2, sku: 'ALP-NV-SW-042-M', product: 'Royal Knit Sweater', category: 'Winter Essentials', material: '80% Alpaca, 20% Silk', color: 'Deep Navy', colorHex: '#1B263B', size: 'Medium', season: 'Winter 2024', status: 'Out of Stock', statusClass: 'out', date: 'Nov 02, 2023', img: '' },
  { id: 3, sku: 'ALP-CH-BL-900-K', product: 'Andean Mist Blanket', category: 'Home Textile Line', material: '100% Superfine Alpaca', color: 'Charcoal Mist', colorHex: '#36454F', size: 'King', season: 'Seasonless', status: 'Active', statusClass: 'active', date: 'Nov 15, 2023', img: '' },
  { id: 4, sku: 'ALP-CR-SC-112-U', product: 'Highland Scarf', category: 'Accessories', material: '100% Baby Alpaca', color: 'Cream Alpaca', colorHex: '#F5F5DC', size: 'OS', season: 'Spring 2024', status: 'Discontinued', statusClass: 'discontinued', date: 'Aug 12, 2023', img: '' },
  { id: 5, sku: 'ALP-SU-PN-023-L', product: 'Suri Summer Poncho', category: 'Beach Collection', material: '100% Suri Alpaca', color: 'Sand Dune', colorHex: '#C2B280', size: 'Large', season: 'Summer 2024', status: 'Active', statusClass: 'active', date: 'Dec 01, 2023', img: '' },
  { id: 6, sku: 'ALP-BB-HO-008-XS', product: 'Baby Alpaca Hoodie', category: 'Casual Line', material: '100% Baby Alpaca', color: 'Ivory White', colorHex: '#FFFFF0', size: 'XS', season: 'Fall 2024', status: 'Coming Soon', statusClass: 'coming', date: 'Jan 10, 2024', img: '' },
];

const statusStyles = {
  active: { bg: '#e8f5e9', fg: '#2e7d32' },
  out: { bg: 'var(--color-error-container)', fg: 'var(--color-error)' },
  discontinued: { bg: 'var(--color-surface-variant)', fg: 'var(--color-on-surface-variant)' },
  coming: { bg: 'var(--color-tertiary-fixed)', fg: 'var(--color-on-tertiary-fixed-variant)' },
};

export default function TextileVariantList() {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState('');

  const handleSelectAll = () => {
    if (selectAll) {
      setSelected(new Set());
    } else {
      setSelected(new Set(variants.map((_, i) => i)));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (idx) => {
    const next = new Set(selected);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    setSelected(next);
    setSelectAll(next.size === variants.length);
  };

  const someChecked = selected.size > 0 && selected.size < variants.length;
  const bulkDisabled = selected.size === 0;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div className={styles.headerLeft}>
          <h2 className={styles.pageTitle}>Variantes Textiles</h2>
          <div className={styles.searchWrap}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-on-surface-variant)' }}>search</span>
            <input
              className={styles.searchInput}
              placeholder="Global search for SKU/Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn}>
            <span className="material-symbols-outlined">notifications</span>
            <span className={styles.notifDot} />
          </button>
          <button className={styles.iconBtn}>
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <p className={styles.userName}>Admin Alpacart</p>
              <p className={styles.userRole}>Operations Manager</p>
            </div>
            <div className={styles.userAvatar} />
          </div>
        </div>
      </div>

      {/* Table Actions Bar */}
      <div className={styles.actionsBar}>
        <div className={styles.actionsLeft}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>filter_list</span>
            Advanced Filters
          </button>
          <div className={styles.actionsDivider} />
          <button className={`${styles.btnOutline} ${bulkDisabled ? styles.btnDisabled : ''}`} disabled={bulkDisabled}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>checklist</span>
            Bulk Actions
          </button>
        </div>
        <div className={styles.actionsRight}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>upload</span>
            Import
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
            Export
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add_circle</span>
            Crear Variante
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thCheck}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectAll}
                  ref={(el) => { if (el) el.indeterminate = someChecked; }}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Image</th>
              <th>SKU</th>
              <th>Product</th>
              <th>Material</th>
              <th>Color</th>
              <th>Size</th>
              <th>Season</th>
              <th>Status</th>
              <th>Update Date</th>
              <th className={styles.thRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v, idx) => {
              const s = statusStyles[v.statusClass] || {};
              const isSelected = selected.has(idx);
              return (
                <tr key={v.id} className={`${styles.tableRow} ${isSelected ? styles.tableRowSelected : ''}`}>
                  <td className={styles.thCheck}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={isSelected}
                      onChange={() => handleSelect(idx)}
                    />
                  </td>
                  <td>
                    <div className={styles.imgPlaceholder} />
                  </td>
                  <td className={styles.tdSku}>{v.sku}</td>
                  <td>
                    <p className={styles.tdProduct}>{v.product}</p>
                    <p className={styles.tdCategory}>{v.category}</p>
                  </td>
                  <td className={styles.tdMaterial}>{v.material}</td>
                  <td>
                    <div className={styles.colorCell}>
                      <span className={styles.colorDot} style={{ backgroundColor: v.colorHex }} />
                      <span>{v.color}</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.sizeBadge}>{v.size}</span>
                  </td>
                  <td className={styles.tdDate}>{v.season}</td>
                  <td>
                    <span className={styles.statusBadge} style={{ backgroundColor: s.bg, color: s.fg }}>
                      {v.status}
                    </span>
                  </td>
                  <td className={styles.tdDate}>{v.date}</td>
                  <td className={styles.thRight}>
                    <div className={styles.actionGroup}>
                      <button className={styles.actionBtn} title="Edit">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                      </button>
                      <button className={styles.actionBtn} title="Duplicate">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>content_copy</span>
                      </button>
                      <button className={styles.actionBtn} title="Delete">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
                      </button>
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
        <div className={styles.paginationLeft}>
          <span className={styles.paginationInfo}>Showing 1-25 of 1,248 variants</span>
          <select className={styles.perPageSelect}>
            <option>25 per page</option>
            <option>50 per page</option>
            <option>100 per page</option>
          </select>
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn} disabled>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>first_page</span>
          </button>
          <button className={styles.pageBtn} disabled>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
          </button>
          <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <span className={styles.pageEllipsis}>...</span>
          <button className={styles.pageBtn}>50</button>
          <button className={styles.pageBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
          </button>
          <button className={styles.pageBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>last_page</span>
          </button>
        </div>
      </div>
    </div>
  );
}
