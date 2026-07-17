import { useState } from 'react';
import styles from './KardexPage.module.css';

const movements = [
  {
    id: 1,
    date: '24 Oct, 2023',
    time: '09:45 AM',
    product: 'Fibra Alpaca Baby Gold',
    sku: 'ALP-BG-022',
    type: 'Entrada',
    qty: 120.00,
    balance: 850.50,
    doc: 'OC-99281',
    reason: 'Ingreso por producción lote #44',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdDWaDYqRfdLHmvtV3vhKI3WD3X_PgtGMnnlUWxeY3PQlqqWTzW8rEZpApQ_9p5sXGHDJT7AN96XzsMhAiZDZyM9WCNtmCwI5U65J-DLZSsc5FovVd2CbR_YWWPTj3yBGb_Fl0V8aCrFEfTMa0jT8n9XSrfvcuSHmaef3RBb06QF3tJZEO5iDBon-Xva3U6qeuKKqFZGR_0soj-_UeFsISQgCjO2MUMlH5sjL6arI6NtzYlPB7X7BI4dI8yOETW057jnCMOpo3NX1Z',
  },
  {
    id: 2,
    date: '24 Oct, 2023',
    time: '08:12 AM',
    product: 'Manta Alpaca Charcoal',
    sku: 'MNT-CH-881',
    type: 'Salida',
    qty: -45.00,
    balance: 112.00,
    doc: 'FAC-10229',
    reason: 'Pedido Mayorista - Exportación',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRleqIOWrAjIx33EKx_1A5q2WrTabzs6ZEHXlwYiYhCaNx81j-jSRH_MgmxZEIYOQuw4935fq4ikcCbf6D5NxDmD-KKK7NpI7CZ6PY5JdyrvtZC9tL-nrf4lebxz6fYOachT-Dg2Enf8CbfmFQx7eD318MVuTjjhwUuE9FFxiD_aGfQ4xKMllvI99pOQHL1tYC4MV3SyN2LwvPFYzkqLKimulIeRvBbMEWb6tX2dug-dmBgLy0SyEpj0GWNxNNau-ufqTjfq-ev1aj',
  },
  {
    id: 3,
    date: '23 Oct, 2023',
    time: '16:30 PM',
    product: 'Lana Cruda Premium',
    sku: 'RAW-PR-001',
    type: 'Transferencia',
    qty: 300.00,
    balance: 2400.00,
    doc: 'GUIA-449',
    reason: 'Traslado a Planta Teñido',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxxcm5J7kNdBHU7mEPIvaxSpyUqAsvGsXBuzGCQ0oS-YB1b13v6df-DykYRDLfRqgyk4E0etuyS_r2kUsZgjOEwfCUVtA-V4amS5yax15xTOJ3YvOPfnu-SlJnTXHm7FCt0eLZGbo3A8sBWvhcvwWrxB_UqaD27uSVsODPeZCqSBuamT8Gz5Gkrc3fCPj3WSH0OWaqFOoKpEltYOOupG9jVlA5dwAXHOIYIx6v14st9LtHZWqjocDYERjqoy6LLiTSt30khNN4tInB',
  },
  {
    id: 4,
    date: '23 Oct, 2023',
    time: '11:15 AM',
    product: 'Tinte Industrial Onyx',
    sku: 'DYE-ONX-12',
    type: 'Ajuste',
    qty: -2.50,
    balance: 18.00,
    doc: 'AJ-0044',
    reason: 'Merma detectada en pesaje',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzToxap9iccISxaxI0nqMguJ7DUU7hmN3MIcCrkcSYOGEwgnNMVB38lT1KvxtGMDkUkafSZlf0jJF-6Ngyg54hA22sGskil015b8EAzAETAH7Ln6Kq7GVknA8tNoQrTCNcWGT0VH3bC86MSyji9rNeqXFGkEw5VARmmsH8KW61FbAfNesrMCJ8kamhd9qpDMHSqagqpv2JqFuw3dJ1WhH58JQrca8j9AX2SNye1G3E37MfWGKbDoe84h-Fja6pM_vPwyLthMKyL-aC',
  },
  {
    id: 5,
    date: '22 Oct, 2023',
    time: '15:55 PM',
    product: 'Hilo Alpaca Navy Cone',
    sku: 'HL-NVY-05',
    type: 'Entrada',
    qty: 50.00,
    balance: 320.00,
    doc: 'OC-99270',
    reason: 'Reposición stock seguridad',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQqVROMiR5D_XAr4bAgT2yH35CNyf2gGrDMIYwRUddIzjxobFqR8Rz9WGLDlMJQ883jtqwkYqv_MjW0yQb4hJh_-OUVCsIXjfKRS58u3uViCUhW1udGC6S8vOGvS_AKjQ8BedxCE4T_oRiCXV6xBgKb9TU9J7zCmA_VLgrAwz5Knib78J4OXDMjI-Dh2z84Ubv7N3sE_nKNV1FJkPCeVwJ3yVVvpWhAERv98lkHOA9oXg6M0F9LAQsrhGMpb02wdMrAWQsdR1yFWxu',
  },
];

const typeStyles = {
  Entrada: { bg: '#dcfce7', color: '#166534' },
  Salida: { bg: '#fee2e2', color: '#991b1b' },
  Transferencia: { bg: '#dbeafe', color: '#1e40af' },
  Ajuste: { bg: '#ffedd5', color: '#9a3412' },
};

const timelineData = {
  1: [
    { time: 'Hace 2 horas', title: 'Entrada de Producción', desc: 'Se agregaron +120 unidades tras auditoría de calidad.', type: 'Entrada', person: 'R. Gonzales' },
    { time: 'Ayer, 10:20 AM', title: 'Traslado Interno', desc: 'Movimiento de 50 und. al área de Hilandería.', type: 'Transferencia' },
    { time: '21 Oct, 2023', title: 'Ajuste Manual', desc: 'Corrección por saldo negativo en sistema.', type: 'Ajuste', note: '"Verificado por Supervisor"' },
    { time: '18 Oct, 2023', title: 'Salida por Venta', desc: 'Despacho Orden #V-882 (Europa).', type: 'Salida' },
  ],
  2: [
    { time: 'Hace 3 horas', title: 'Salida de Venta', desc: 'Se despacharon -45 unidades para exportación.', type: 'Salida', person: 'M. Torres' },
    { time: '22 Oct, 2023', title: 'Entrada de Producción', desc: 'Ingreso de 200 unidades desde taller.', type: 'Entrada' },
    { time: '20 Oct, 2023', title: 'Transferencia Interna', desc: 'Movimiento desde almacén principal.', type: 'Transferencia' },
  ],
  3: [
    { time: '23 Oct, 2023', title: 'Salida por Traslado', desc: '300 unidades enviadas a Planta Teñido.', type: 'Salida', person: 'L. Huamán' },
    { time: '20 Oct, 2023', title: 'Entrada de Compra', desc: 'Ingreso de 500kg desde proveedor Puno.', type: 'Entrada' },
    { time: '15 Oct, 2023', title: 'Ajuste por Conteo', desc: 'Diferencia de +12kg encontrada en inventario.', type: 'Ajuste' },
  ],
  4: [
    { time: '23 Oct, 2023', title: 'Ajuste por Merma', desc: '-2.50kg detectados en pesaje de control.', type: 'Ajuste', person: 'C. Vargas' },
    { time: '18 Oct, 2023', title: 'Salida a Producción', desc: '15kg usados en lote de teñido experimental.', type: 'Salida' },
    { time: '10 Oct, 2023', title: 'Entrada de Compra', desc: 'Ingreso de 25kg desde proveedor químico.', type: 'Entrada' },
  ],
  5: [
    { time: '22 Oct, 2023', title: 'Entrada por Reposición', desc: '+50 unidades para stock de seguridad.', type: 'Entrada', person: 'P. Rojas' },
    { time: '19 Oct, 2023', title: 'Salida a Pedido', desc: '30 unidades para pedido mayorista.', type: 'Salida' },
    { time: '15 Oct, 2023', title: 'Transferencia', desc: '20 unidades a tienda Miraflores.', type: 'Transferencia' },
  ],
};

export default function KardexPage() {
  const [selectedId, setSelectedId] = useState(null);

  const selected = movements.find((m) => m.id === selectedId);
  const timeline = selectedId ? timelineData[selectedId] || [] : [];

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div>
          <nav className={styles.breadcrumbs}>
            <span>Inicio</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
            <span>Inventario</span>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
            <span className={styles.breadcrumbActive}>Kardex</span>
          </nav>
          <h2 className={styles.pageTitle}>Kardex de Inventario</h2>
          <p className={styles.pageDesc}>Historial detallado de movimientos de stock y trazabilidad de productos.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span>
            Refrescar
          </button>
          <button className={styles.actionPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
            Exportar PDF/Excel
          </button>
        </div>
      </section>

      <section className={styles.filterGrid}>
        <div className={styles.filterItem}>
          <label className={styles.filterLabel}>Rango de Fechas</label>
          <div className={styles.filterInputWrap}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-outline)' }}>calendar_today</span>
            <input className={styles.filterInput} type="text" defaultValue="01/10/23 - 31/10/23" />
          </div>
        </div>
        <div className={styles.filterItem}>
          <label className={styles.filterLabel}>Almacén</label>
          <select className={styles.filterSelect}>
            <option>Todos los Almacenes</option>
            <option>Planta Principal - Lima</option>
            <option>Centro Logístico Callao</option>
            <option>Materia Prima Puno</option>
          </select>
        </div>
        <div className={styles.filterItem}>
          <label className={styles.filterLabel}>Tipo de Movimiento</label>
          <select className={styles.filterSelect}>
            <option>Todos</option>
            <option>Entrada (Compra/Producción)</option>
            <option>Salida (Venta/Desperdicio)</option>
            <option>Transferencia</option>
            <option>Ajuste de Inventario</option>
          </select>
        </div>
        <div className={styles.filterItem}>
          <label className={styles.filterLabel}>Usuario / Responsable</label>
          <input className={styles.filterInput} placeholder="Filtrar por nombre..." type="text" />
        </div>
        <div className={styles.filterItem}>
          <label className={styles.filterLabel}>Producto / SKU</label>
          <div className={styles.filterInputWrap}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-outline)' }}>inventory</span>
            <input className={styles.filterInput} placeholder="Buscar SKU..." type="text" />
          </div>
        </div>
      </section>

      <div className={styles.mainContent}>
        <div className={styles.tableCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Producto</th>
                  <th>SKU</th>
                  <th>Tipo</th>
                  <th className={styles.thRight}>Cant.</th>
                  <th className={styles.thRight}>Saldo</th>
                  <th>Documento</th>
                  <th>Motivo</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((m) => {
                  const ts = typeStyles[m.type] || {};
                  const isSelected = selectedId === m.id;
                  return (
                    <tr
                      key={m.id}
                      className={`${styles.tableRow} ${isSelected ? styles.rowSelected : ''}`}
                      onClick={() => setSelectedId(isSelected ? null : m.id)}
                    >
                      <td>
                        <p className={styles.cellDate}>{m.date}</p>
                        <p className={styles.cellTime}>{m.time}</p>
                      </td>
                      <td>
                        <div className={styles.productCell}>
                          <div className={styles.productImg}>
                            <img src={m.img} alt={m.product} className={styles.productImgSrc} />
                          </div>
                          <span className={styles.productName}>{m.product}</span>
                        </div>
                      </td>
                      <td className={styles.cellMono}>{m.sku}</td>
                      <td>
                        <span className={styles.typeBadge} style={{ backgroundColor: ts.bg, color: ts.color }}>
                          {m.type === 'Transferencia' ? 'Transf.' : m.type}
                        </span>
                      </td>
                      <td className={styles.thRight}>
                        <span className={styles.qtyValue} style={{ color: m.qty > 0 ? '#22c55e' : m.qty < 0 ? '#ef4444' : 'inherit' }}>
                          {m.qty > 0 ? '+' : ''}{m.qty.toFixed(2)}
                        </span>
                      </td>
                      <td className={styles.thRight}>
                        <span className={styles.balanceValue}>{m.balance.toFixed(2)}</span>
                      </td>
                      <td>
                        <span className={styles.docLink}>{m.doc}</span>
                      </td>
                      <td>
                        <span className={styles.reasonCell}>{m.reason}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>Mostrando 1-5 de 1,482 registros</span>
            <div className={styles.paginationBtns}>
              <button className={styles.pageBtn} disabled>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>first_page</span>
              </button>
              <button className={styles.pageBtn} disabled>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
              </button>
              <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
              <button className={styles.pageBtn}>2</button>
              <button className={styles.pageBtn}>3</button>
              <span className={styles.pageEllipsis}>...</span>
              <button className={styles.pageBtn}>60</button>
              <button className={styles.pageBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
              <button className={styles.pageBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>last_page</span>
              </button>
            </div>
          </div>
        </div>

        {selected && (
          <aside className={styles.timelinePanel}>
            <div className={styles.timelineHeader}>
              <h3 className={styles.timelineTitle}>Timeline Reciente</h3>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>history</span>
            </div>
            <div className={styles.timelineBody}>
              <div className={styles.timelineFocus}>
                <p className={styles.focusLabel}>ENFOQUE ACTUAL</p>
                <p className={styles.focusProduct}>{selected.product}</p>
                <p className={styles.focusSku}>SKU: {selected.sku}</p>
              </div>
              <div className={styles.timelineItems}>
                {timeline.map((item, i) => {
                  const tColor = typeStyles[item.type]?.color || '#3b82f6';
                  const tBg = typeStyles[item.type]?.bg || '#dbeafe';
                  return (
                    <div key={i} className={styles.timelineItem} style={{ borderLeftColor: tColor }}>
                      <div className={styles.timelineDot} style={{ backgroundColor: tColor }} />
                      <p className={styles.timelineTime}>{item.time}</p>
                      <p className={styles.timelineTitle}>{item.title}</p>
                      <p className={styles.timelineDesc}>{item.desc}</p>
                      {item.person && (
                        <div className={styles.timelinePerson}>
                          <div className={styles.timelineAvatar} style={{ backgroundColor: tBg }}>
                            <span style={{ color: tColor, fontSize: 10, fontWeight: 700 }}>
                              {item.person.split(' ').map((s) => s[0]).join('')}
                            </span>
                          </div>
                          <span className={styles.timelinePersonName}>{item.person}</span>
                        </div>
                      )}
                      {item.note && <p className={styles.timelineNote}>{item.note}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.timelineFooter}>
              <button className={styles.timelineFooterBtn}>Ver Historial Completo</button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
