import { Link } from 'react-router-dom';
import Badge from '@/components/common/Badge/Badge';
import Price from '@/components/ecommerce/Price/Price';
import styles from './OrderCard.module.css';

const statusMap = {
  pending: { label: 'Pendiente', variant: 'warning' },
  processing: { label: 'Procesando', variant: 'info' },
  shipped: { label: 'Enviado', variant: 'primary' },
  delivered: { label: 'Entregado', variant: 'success' },
  cancelled: { label: 'Cancelado', variant: 'error' },
};

export default function OrderCard({ order, className = '' }) {
  const status = statusMap[order.status] || statusMap.pending;
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <div><span className={styles.idLabel}>Pedido </span><span className={styles.id}>#{order.id}</span></div>
        <Badge variant={status.variant} size="sm">{status.label}</Badge>
      </div>
      <div className={styles.date}>{order.date}</div>
      <div className={styles.items}>
        {order.items.slice(0, 3).map((item, i) => (
          <img key={i} src={item.image} alt={item.title} className={styles.itemImg} />
        ))}
        {order.items.length > 3 && <span className={styles.more}>+{order.items.length - 3}</span>}
      </div>
      <div className={styles.footer}>
        <Price value={order.total} size="md" />
        <Link to={'/order/tracking/' + order.id} className={styles.trackBtn}>Ver detalle</Link>
      </div>
    </div>
  );
}