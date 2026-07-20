import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrders } from '@/hooks';
import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import TrackingTimeline from '@/components/ecommerce/TrackingTimeline/TrackingTimeline';
import styles from './OrderTracking.module.css';

const sizeMap = { 1: 'XS', 2: 'S', 3: 'M', 4: 'L', 5: 'XL', 6: 'XXL', 7: 'Único', 8: 'KING' };

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { orders, fetch } = useOrders();

  useEffect(() => { fetch(); }, []);

  useEffect(() => {
    if (orders?.length > 0 && id) {
      setOrder(orders.find(o => o.orderNumber === id || o.id === id) || null);
    }
  }, [orders, id]);

  const crumbs = [
    { label: 'Mi Cuenta', path: '/account' },
    { label: 'Pedidos', path: '/order/history' },
    { label: id ? id.substring(0, 8) + '...' : '', path: '' },
  ];

  const steps = [
    { label: 'Pedido Realizado', date: order?.createdAt || '—', completed: !!order },
    { label: 'Preparado', date: '—', completed: order?.status !== 'pending' && !!order },
    { label: 'En Tránsito', date: '—', active: order?.status === 'shipped' },
    { label: 'Entregado', date: '—', completed: order?.status === 'delivered' },
  ];

  return (
    <div className={styles.wrapper}>
      <Breadcrumb items={crumbs} />
      <h1 className={styles.title}>Seguimiento del pedido</h1>
      <div className={styles.headerRow}>
        <p className={styles.orderRef}>Pedido #{id ? id.substring(0, 8) : ''}</p>
        <span className={styles.statusBadge}>{order?.status || 'Cargando...'}</span>
      </div>
      <TrackingTimeline steps={steps} />
      <div className={styles.details}>
        <div><p className={styles.detailLabel}>Estado</p><p className={styles.detailValue}>{order?.status || '—'}</p></div>
        {order && <div><p className={styles.detailLabel}>Total</p><p className={styles.detailValue}>S/ {Number(order.total).toFixed(2)}</p></div>}
      </div>
    </div>
  );
}
