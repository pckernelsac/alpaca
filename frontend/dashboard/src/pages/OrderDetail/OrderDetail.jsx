import { useState } from 'react';
import styles from './OrderDetail.module.css';

const order = {
  id: '#ORD-2024-0892',
  status: 'In Progress',
  placedAt: 'Placed on August 24, 2024 at 14:32 PM via Showroom Terminal',
  date: 'Aug 24, 2024',
  channel: 'Cusco Showroom',
  agent: 'Elena Rodriguez',
  paymentStatus: 'Authorized',
  paymentPercent: 80,
  shippingStatus: 'Preparing',
  shippingPercent: 33,
};

const customer = {
  name: 'Mateo de la Riva',
  email: 'm.rivas@luxurytextiles.pe',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfi-P13Ht13maw3P6mB4eshON5UNCaMv1ZO_7kwXf3uhNvPLdjg7Wevcwit6ALpPU056ar_WzrwlC2xQtaqP0de_bviWPkXIXISxrg1e8Nc0eP9PcokqLe8HbY-BzU2ZjE9UWEe_vH28uOBzn2rFjAe54FVL19KPiSMkpFpH7tE_ME96tg5cIkVKRERhuuvGG29AkIzYhqa2qvvX-Y8nj4_arPhAGdbrMahuIGqeuguQs8QPNT0wPgksCDeoWKAVa7ecqThGRYt8fR',
  address: 'Av. El Sol 452, Interior 301\nCusco, 08002, Peru',
  shippingMethod: 'DHL Express International',
};

const financials = {
  subtotal: 1240.00,
  tax: 223.20,
  shippingFee: 45.00,
  total: 1508.20,
  paid: true,
};

const items = [
  { name: 'Chunky Alpaca Sweater', variant: 'Color: Sand | Size: M', sku: 'ALP-SWT-SND-M', qty: 2, unitPrice: 420.00, total: 840.00, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1ooOoFQ64hw_P_J0JvgrGdkYOQK7Lt6Ze2Scshighd3jvfJiCBAbgr3hdbdqYCNXFNGy9dfc_imRP3EopaF65tZW5Q7QHSjL9_nYXAf65w3wzeg-FkPx4LAwQW1-PmrBniFHZ_FQhsfeS7KNnhP-LPTMYlIIrVtsApvN8GtZeYVdtq8VecC5zar50xrSeKg7u698CDQXpFhs47H8_zHpdJ35BX8xjaUb3buxDNL8eQ1sghQEtSeRrNzHACnQkr7gq9E56M4GEQQd1' },
  { name: 'Luxury Baby Alpaca Throw', variant: 'Color: Charcoal | Size: Standard', sku: 'ALP-THR-CHR-OS', qty: 1, unitPrice: 400.00, total: 400.00, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm3qWMz4urbfz0FEspzparigOmPNFQeHtOqHNh4EqNuv1sf1nrzd-vigu2uJlydmlwt1km50vD-5VFuNl0gWFkUNH3ZYf6B3mlqCMahRwc58djercThPbT-Fme6mpQPKyYB3GHqA7Ki256pCfylvQF-L_Ywb1zrjZYIsX9OQ0GtlrmvaB8iRPkQkjaAt4IQLSAOp37WxOWD7-V0TAeTBAVw6nRg5TD9x2-aT6rwv7g7gGOSvsucxma5sskfmOL1Fl-5zv0xtHCn1_i' },
];

const timeline = [
  { title: 'Awaiting Warehouse', date: 'Aug 25, 2024 • 09:15 AM', note: 'Responsible: Warehouse Team A', done: true },
  { title: 'Payment Confirmed', date: 'Aug 24, 2024 • 14:45 PM', note: 'Via Stripe Checkout', done: true },
  { title: 'Order Placed', date: 'Aug 24, 2024 • 14:32 PM', note: 'Responsible: Elena Rodriguez', done: true },
  { title: 'Shipped', date: 'Pending...', note: '', done: false },
];

const documents = [
  { name: 'Invoice_ORD-2024.pdf', icon: 'picture_as_pdf' },
  { name: 'Packing_List.pdf', icon: 'inventory' },
];

export default function OrderDetail() {
  const [notes, setNotes] = useState('');

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <a href="/">Inicio</a>
        <span className="material-symbols-outlined">chevron_right</span>
        <a href="/orders/list">Pedidos</a>
        <span className="material-symbols-outlined">chevron_right</span>
        <span>Detalle del Pedido</span>
      </nav>

      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <div className={styles.headerTop}>
            <h2 className={styles.pageTitle}>{order.id}</h2>
            <span className={styles.statusBadge}>{order.status}</span>
          </div>
          <p className={styles.pageDesc}>{order.placedAt}</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">contact_support</span>
            Contact Customer
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">print</span>
            Print Invoice
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">download</span>
            Export PDF
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined">edit</span>
            Change Status
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {/* Main Column */}
        <div className={styles.mainCol}>
          {/* Top Row: Info & Status */}
          <div className={styles.twoColGrid}>
            <div className={styles.card}>
              <div className={styles.cardAccent} />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>Order Information</h3>
                <div className={styles.infoRows}>
                  <div className={styles.infoRow}>
                    <span>Order Date</span>
                    <span className={styles.infoValue}>{order.date}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Sales Channel</span>
                    <span className={styles.infoValue}>{order.channel}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Assigned Agent</span>
                    <span className={styles.infoValue}>{order.agent}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Fulfillment Health</h3>
              <div className={styles.healthBars}>
                <div>
                  <div className={styles.healthHeader}>
                    <span className={styles.healthLabel}>Payment Status</span>
                    <span className={styles.healthStatus}>{order.paymentStatus}</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: `${order.paymentPercent}%` }} />
                  </div>
                </div>
                <div>
                  <div className={styles.healthHeader}>
                    <span className={styles.healthLabel}>Shipping Status</span>
                    <span className={styles.healthStatusMuted}>{order.shippingStatus}</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressMuted} style={{ width: `${order.shippingPercent}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Customer & Financials */}
          <div className={styles.twoColGrid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Customer & Delivery</h3>
              <div className={styles.customerHeader}>
                <div className={styles.customerAvatar}>
                  <img src={customer.avatar} alt={customer.name} />
                </div>
                <div>
                  <p className={styles.customerName}>{customer.name}</p>
                  <p className={styles.customerEmail}>{customer.email}</p>
                </div>
              </div>
              <div className={styles.customerDetails}>
                <div>
                  <p className={styles.detailLabel}>Shipping Address</p>
                  <p className={styles.detailText}>{customer.address}</p>
                </div>
                <div className={styles.shippingMethodRow}>
                  <div>
                    <p className={styles.detailLabel}>Method</p>
                    <p className={styles.detailTextBold}>{customer.shippingMethod}</p>
                  </div>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: 24 }}>local_shipping</span>
                </div>
              </div>
            </div>

            <div className={`${styles.card} ${styles.financialCard}`}>
              <h3 className={styles.cardTitle}>Financial Summary</h3>
              <div className={styles.financialRows}>
                <div className={styles.financialRow}>
                  <span>Subtotal</span>
                  <span>${financials.subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.financialRow}>
                  <span>Tax (18% IGV)</span>
                  <span>${financials.tax.toFixed(2)}</span>
                </div>
                <div className={`${styles.financialRow} ${styles.financialRowBorder}`}>
                  <span>Shipping Fee</span>
                  <span>${financials.shippingFee.toFixed(2)}</span>
                </div>
                <div className={styles.totalRow}>
                  <div>
                    <span className={styles.totalLabel}>Total Amount</span>
                    <p className={styles.totalValue}>${financials.total.toFixed(2)}</p>
                  </div>
                  <span className={financials.paid ? styles.paidBadge : styles.unpaidBadge}>
                    {financials.paid ? 'PAID' : 'UNPAID'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <h3 className={styles.cardTitle}>Order Items ({items.length})</h3>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th className={styles.thCenter}>Qty</th>
                    <th className={styles.thRight}>Unit Price</th>
                    <th className={styles.thRight}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} className={styles.tableRow}>
                      <td>
                        <div className={styles.productCell}>
                          <div className={styles.productImg}>
                            <img src={item.img} alt={item.name} />
                          </div>
                          <div>
                            <p className={styles.productName}>{item.name}</p>
                            <p className={styles.productVariant}>{item.variant}</p>
                          </div>
                        </div>
                      </td>
                      <td className={styles.skuCell}>{item.sku}</td>
                      <td className={styles.tdCenter}>{item.qty}</td>
                      <td className={styles.tdRight}>${item.unitPrice.toFixed(2)}</td>
                      <td className={styles.tdRightBold}>${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className={styles.sideCol}>
          {/* Timeline */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Order Timeline</h3>
            <div className={styles.timelineWrap}>
              <div className={styles.timelineLine} />
              {timeline.map((evt, i) => (
                <div key={i} className={`${styles.timelineItem} ${evt.done ? '' : styles.timelineInactive}`}>
                  <div className={`${styles.timelineDot} ${evt.done ? styles.timelineDotDone : styles.timelineDotPending}`}>
                    <div className={styles.timelineDotInner} />
                  </div>
                  <div className={styles.timelineContent}>
                    <p className={styles.timelineTitle}>{evt.title}</p>
                    <p className={styles.timelineDate}>{evt.date}</p>
                    {evt.note && <p className={styles.timelineNote}>{evt.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Documents</h3>
            <div className={styles.docList}>
              {documents.map((doc, i) => (
                <div key={i} className={styles.docItem}>
                  <div className={styles.docLeft}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>{doc.icon}</span>
                    <span className={styles.docName}>{doc.name}</span>
                  </div>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-on-surface-variant)', fontSize: 18 }}>download</span>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Notes */}
          <div className={styles.card}>
            <div className={styles.notesHeader}>
              <h3 className={styles.cardTitle}>Internal Notes</h3>
              <button className={styles.addNoteBtn}>Add Note</button>
            </div>
            <div className={styles.noteBubble}>
              <p className={styles.noteText}>&ldquo;Customer requested extra protective packaging for the throw blanket. Noted for warehouse.&rdquo;</p>
              <p className={styles.noteAuthor}>&mdash; Elena R., Aug 24</p>
            </div>
            <textarea
              className={styles.noteInput}
              placeholder="Write a note..."
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
