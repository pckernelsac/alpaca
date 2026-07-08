import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import TrackingTimeline from '@/components/ecommerce/TrackingTimeline/TrackingTimeline';
import styles from './OrderTracking.module.css';

const crumbs = [
  { label: 'Mi Cuenta', path: '/account' },
  { label: 'Pedidos', path: '/order/history' },
  { label: '#APC-98234102', path: '' },
];

export default function OrderTracking() {
  return (
    <div className={styles.wrapper}>
      <Breadcrumb items={crumbs} />
      <h1 className={styles.title}>Seguimiento del pedido</h1>
      <div className={styles.headerRow}>
        <p className={styles.orderRef}>Pedido #APC-98234102</p>
        <span className={styles.statusBadge}>En tránsito — Llega el 24 de octubre</span>
      </div>
      <TrackingTimeline />
      <div className={styles.details}>
        <div><p className={styles.detailLabel}>Transportista</p><p className={styles.detailValue}>Andes Express</p></div>
        <div><p className={styles.detailLabel}>Número de seguimiento</p><p className={styles.detailValue} style={{ textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: 'var(--color-primary-dim)' }}>AX-902834112</p></div>
        <div><p className={styles.detailLabel}>Dirección de entrega</p><p className={styles.detailValue}>Av. Principal 123,<br />Lima, Perú</p></div>
      </div>
      <div className={styles.paymentStatus}>
        <span className="material-symbols-outlined" style={{ color: 'var(--color-success)', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        <span className={styles.paidText}>Pagado</span>
        <a className={styles.downloadLink} href="#">Descargar factura <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span></a>
      </div>
    </div>
  );
}