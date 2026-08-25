import { useEffect } from 'react';
import { useOrders } from '@/hooks';
import ProfileMenu from '@/components/ecommerce/ProfileMenu/ProfileMenu';
import OrderCard from '@/components/ecommerce/OrderCard/OrderCard';
import styles from './OrderHistory.module.css';

export default function OrderHistory() {
  const { orders, fetch } = useOrders();

  useEffect(() => { fetch(); }, []);

  return (
    <div className={styles.layout}>
      <ProfileMenu userName="Cliente" />
      <div className={styles.main}>
        <h1 className={styles.title}>Mis Pedidos</h1>
        {orders.length === 0 ? (
          <p style={{ textAlign: 'center', padding: 40, color: '#888' }}>No tienes pedidos aún.</p>
        ) : (
          <div className={styles.grid}>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
