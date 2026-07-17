import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ClientProfile.module.css';

const kpis = [
  { label: 'Lifetime Value (LTV)', value: '$42,850.00', icon: 'trending_up', trend: '+12.5% vs año ant.', color: 'var(--color-primary)' },
  { label: 'Ticket Promedio', value: '$1,240.00', icon: 'receipt_long', note: 'Segmento Premium', color: 'var(--color-on-surface-variant)' },
  { label: 'Frecuencia de Pedido', value: '1.4 / mes', icon: 'calendar_today', note: 'Último pedido: hace 12 días', color: 'var(--color-tertiary)' },
];

const orders = [
  { id: '#ORD-2024-812', date: '14 Oct, 2024', status: 'Enviado', total: '$2,450.00', statusClass: 'sent' },
  { id: '#ORD-2024-789', date: '28 Sep, 2024', status: 'Entregado', total: '$1,120.00', statusClass: 'delivered' },
  { id: '#ORD-2024-740', date: '12 Sep, 2024', status: 'Entregado', total: '$980.50', statusClass: 'delivered' },
];

const products = [
  { name: 'Manta Royal Alpaca Gris', line: 'Colección Imperial', orders: 12 },
  { name: 'Chal Baby Alpaca Crema', line: 'Línea Soft Touch', orders: 8 },
  { name: 'Tapiz Ancestral Earth', line: 'Serie Edición Limitada', orders: 5 },
];

const timeline = [
  { date: 'HOY - 14:20 PM', title: 'Pedido Entregado #ORD-2024-812', desc: 'Confirmado por transportista DHL Express en Almacén Cusco.', active: true },
  { date: '12 OCT, 2024', title: 'Soporte: Consulta de Stock', desc: 'Conversación finalizada vía WhatsApp. Interés en hilados de vicuña.', active: false },
  { date: '01 OCT, 2024', title: 'Actualización de Perfil', desc: 'Cambio de dirección fiscal realizado por el cliente en el portal.', active: false },
];

export default function ClientProfile() {
  const [quickNote, setQuickNote] = useState('');

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
        <Link to="/crm" className={styles.breadcrumbLink}>CRM</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
        <Link to="/crm/clientes" className={styles.breadcrumbLink}>Clientes</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>chevron_right</span>
        <span className={styles.breadcrumbActive}>Perfil del Cliente</span>
      </nav>

      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <span className={styles.avatarInitials}>MV</span>
              <span className={styles.vipBadge}>VIP Gold</span>
            </div>
            <div>
              <div className={styles.nameRow}>
                <h1 className={styles.profileName}>Mariana Velásquez</h1>
                <span className={styles.platinumBadge}>Platinum Member</span>
              </div>
              <p className={styles.profileMeta}>Socia Comercial desde Marzo 2021 • ID: #ALP-9942</p>
            </div>
          </div>
        </div>
        <div className={styles.profileActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
            Editar
          </button>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>contact_mail</span>
            Contactar
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Nuevo Pedido
          </button>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        {kpis.map((kpi, i) => (
          <div key={i} className={styles.kpiCard}>
            <p className={styles.kpiLabel}>{kpi.label}</p>
            <h3 className={styles.kpiValue}>{kpi.value}</h3>
            <div className={styles.kpiFooter} style={{ color: kpi.color }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{kpi.icon}</span>
              <span className={styles.kpiNote}>{kpi.trend || kpi.note}</span>
            </div>
          </div>
        ))}
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>Límite de Crédito</p>
          <h3 className={styles.kpiValue}>$15,000.00</h3>
          <div className={styles.creditBar}>
            <div className={styles.creditFill} style={{ width: '65%' }} />
          </div>
          <p className={styles.creditNote}>$9,750 disponible</p>
        </div>
      </div>

      <div className={styles.bentoGrid}>
        <div className={styles.bentoLeft}>
          <section className={styles.card}>
            <h4 className={styles.cardTitle}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>person</span>
              Datos de Contacto
            </h4>
            <div className={styles.contactList}>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>m.velasquez@corporativo.pe</span>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>Teléfono</span>
                <span className={styles.contactValue}>+51 987 654 321</span>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>Región</span>
                <span className={styles.contactValue}>Cusco, Perú</span>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>Idioma</span>
                <span className={styles.contactValue}>Español</span>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardTitleRow}>
              <h4 className={styles.cardTitle}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>location_on</span>
                Direcciones
              </h4>
              <span className={styles.linkAction}>Ver Mapa</span>
            </div>
            <div className={styles.addressList}>
              <div className={styles.addressCard}>
                <div className={styles.addressHeader}>
                  <span className={styles.addressBadge}>Principal</span>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-on-surface-variant)' }}>verified</span>
                </div>
                <p className={styles.addressText}>Av. El Sol 1234, Interior 402<br />Cusco, 08002, Perú</p>
              </div>
              <div className={styles.addressCard}>
                <div className={styles.addressHeader}>
                  <span className={styles.addressBadgeSecondary}>Facturación</span>
                </div>
                <p className={styles.addressTextSecondary}>Calle Mantas 450, Almacén Central<br />Cusco, Perú</p>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <h4 className={styles.cardTitle}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>payments</span>
              Métodos de Pago
            </h4>
            <div className={styles.paymentList}>
              <div className={styles.paymentRow}>
                <div className={styles.paymentInfo}>
                  <div className={styles.paymentBrand}>VISA</div>
                  <div>
                    <p className={styles.paymentNumber}>•••• 4421</p>
                    <p className={styles.paymentExp}>Exp: 08/26</p>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div className={`${styles.paymentRow} ${styles.paymentRowMuted}`}>
                <div className={styles.paymentInfo}>
                  <div className={styles.paymentBrand}>MC</div>
                  <div>
                    <p className={styles.paymentNumber}>•••• 8829</p>
                    <p className={styles.paymentExp}>Exp: 11/24</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.termsRow}>
              <span className={styles.termsLabel}>Términos Comerciales</span>
              <span className={styles.termsValue}>Net 30</span>
            </div>
          </section>
        </div>

        <div className={styles.bentoRight}>
          <section className={styles.card}>
            <div className={styles.cardTitleRow}>
              <h4 className={styles.cardTitle}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>shopping_bag</span>
                Pedidos Recientes
              </h4>
              <button className={styles.linkAction}>Ver todo el historial</button>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID Pedido</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th className={styles.thRight}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={i} className={styles.tableRow}>
                      <td className={styles.orderId}>{o.id}</td>
                      <td className={styles.orderDate}>{o.date}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[o.statusClass]}`}>{o.status}</span>
                      </td>
                      <td className={styles.thRight}>{o.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.card}>
            <h4 className={styles.cardTitle}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>grade</span>
              Productos Más Comprados
            </h4>
            <div className={styles.productGrid}>
              {products.map((p, i) => (
                <div key={i} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <span className="material-symbols-outlined" style={{ fontSize: 28, color: 'var(--color-outline)' }}>image</span>
                    <span className={styles.productOrders}>x{p.orders} Pedidos</span>
                  </div>
                  <h5 className={styles.productName}>{p.name}</h5>
                  <p className={styles.productLine}>{p.line}</p>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.bentoTwoCol}>
            <section className={styles.card}>
              <h4 className={styles.cardTitle}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>loyalty</span>
                Beneficios &amp; Promociones
              </h4>
              <div className={styles.promoList}>
                <div className={styles.promoItem}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>percent</span>
                  <div>
                    <p className={styles.promoTitle}>15% Dscto. Corporativo</p>
                    <p className={styles.promoDesc}>Aplicado automáticamente</p>
                  </div>
                </div>
                <div className={styles.promoItemSecondary}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-on-surface-variant)' }}>local_shipping</span>
                  <div>
                    <p className={styles.promoTitle}>Envío Priority Gratuito</p>
                    <p className={styles.promoDesc}>Beneficio Platinum</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.card}>
              <h4 className={styles.cardTitle}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>note_alt</span>
                Notas Internas
              </h4>
              <div className={styles.noteBubble}>
                &ldquo;Cliente prefiere empaques biodegradables sin plástico. Interesada en la nueva línea de fibras orgánicas para Q1 2025. - Carlos M. (Ejecutivo de Cuenta)&rdquo;
              </div>
              <div className={styles.noteInputRow}>
                <input
                  className={styles.noteInput}
                  type="text"
                  placeholder="Agregar nota rápida..."
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                />
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)', cursor: 'pointer' }}>send</span>
              </div>
            </section>
          </div>

          <section className={styles.card}>
            <h4 className={styles.cardTitle}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>history</span>
              Línea de Tiempo de Actividad
            </h4>
            <div className={styles.timeline}>
              {timeline.map((item, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={`${styles.timelineDot} ${item.active ? styles.timelineDotActive : ''}`} />
                  <div className={styles.timelineContent}>
                    <p className={styles.timelineDate}>{item.date}</p>
                    <p className={styles.timelineTitle}>{item.title}</p>
                    <p className={styles.timelineDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
