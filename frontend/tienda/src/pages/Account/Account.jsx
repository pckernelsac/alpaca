import { useEffect } from 'react';
import { useOrders, useProfile } from '@/hooks';
import { useAuth } from '@/hooks/useAuth';
import ProfileMenu from '@/components/ecommerce/ProfileMenu/ProfileMenu';
import OrderCard from '@/components/ecommerce/OrderCard/OrderCard';
import styles from './Account.module.css';

export default function Account() {
  const { orders, fetch } = useOrders();
  const { profile, fetch: fetchProfile } = useProfile();
  const { user } = useAuth();

  useEffect(() => { fetch(); fetchProfile(); }, []);

  const userName = profile?.firstName || user?.firstName || user?.name || 'Cliente';

  return (
    <div className={styles.layout}>
      <ProfileMenu userName={userName} />
      <div className={styles.main}>
        <section className={styles.welcome}>
          <h1 className={styles.greeting}>Bienvenido de nuevo, {userName}</h1>
        </section>
        <section>
          <h2 className={styles.sectionTitle}>Tus últimos pedidos</h2>
          <div className={styles.orderGrid}>
            {orders.length === 0 && <p style={{ color: '#888' }}>No tienes pedidos aún.</p>}
            {orders.slice(0, 3).map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
        <section className={styles.quickLinks}>
          <h2 className={styles.sectionTitle}>Administración de cuenta</h2>
          <div className={styles.cardGrid}>
            <div className={styles.quickCard} onClick={() => window.location.href = '/addresses'} style={{ cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>map</span>
              <h3>Direcciones</h3><p>Gestiona tus direcciones de envio</p>
            </div>
            <div className={styles.quickCard} onClick={() => window.location.href = '/wishlist'} style={{ cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>favorite</span>
              <h3>Lista de deseos</h3><p>Productos guardados</p>
            </div>
            <div className={styles.quickCard} onClick={() => window.location.href = '/settings'} style={{ cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>settings</span>
              <h3>Configuración</h3><p>Configuracion de cuenta</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
