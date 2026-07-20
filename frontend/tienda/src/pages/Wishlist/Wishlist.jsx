import { useEffect } from 'react';
import { useWishlist, useProfile } from '@/hooks';
import ProfileMenu from '@/components/ecommerce/ProfileMenu/ProfileMenu';
import styles from './Wishlist.module.css';

export default function Wishlist() {
  const { items, fetch, toggle } = useWishlist();
  const { profile } = useProfile();

  useEffect(() => { fetch(); }, []);

  const userName = profile?.firstName || profile?.name || 'Cliente';

  return (
    <div className={styles.layout}>
      <ProfileMenu userName={userName} />
      <div className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Mi lista de deseos</h1>
            <p className={styles.count}>{items.length} artículos guardados</p>
          </div>
        </header>
        {items.length === 0 ? (
          <p style={{ textAlign: 'center', padding: 40, color: '#888' }}>Tu lista de deseos está vacía</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 24 }}>
            {items.map((item) => (
              <div key={item.id} style={{ border: '1px solid #e0d5c1', borderRadius: 8, padding: 16 }}>
                <img src={item.image || item.imageUrl} alt={item.name || item.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 4 }} />
                <h3 style={{ margin: '8px 0 4px' }}>{item.name || item.title}</h3>
                <p style={{ color: '#8B4513', fontWeight: 600 }}>S/ {(item.price || 0).toFixed(2)}</p>
                <button onClick={async () => { await toggle(item.productId || item.id); fetch(); }} style={{ background: '#8B4513', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px', cursor: 'pointer', marginTop: 8 }}>Eliminar</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
