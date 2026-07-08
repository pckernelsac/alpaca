import { FiX } from 'react-icons/fi';
import Badge from '@/components/common/Badge/Badge';
import styles from './WishlistGrid.module.css';

const defaultItems = [
  { id: 1, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqMkuOm_LUBKaHgtcXGI-64BSeFqwHCkwQWLfgtHxLGHzH8PX0OFw0AOtEoW7Kf9FIus2gjkRSwpMozmHc5tzjaXV04QvvjRT4e2YjgfElRjYZJZUh7ygdJtwDHJryjvL3wMqyi8mY3KjywCOEnZNQlWLe9d8tHdo-d_bjPwb1hDDul0cZk1Omy9_YfzOM6RYJ8z3jMRxth9MMd0PWrjXvSdYf2peTPeY0-ldS7w0DpCHxnZC-PCd7y7nxF45rJrqzNgs0F20Bp0DT', title: 'Poncho Andino Bruma', sub: '100% Alpaca Real', price: '$540.00', badge: 'Stock bajo', badgeVariant: 'warning' },
  { id: 2, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-rUq2ri35MTaLp6bCF1iiVu7J6A1cSC79Hhm93_La_mA5iqOMkLphG7FnTqo9rTSgarQabiBWeUqAZUaImc7hsu3zsoHNKcFpWbip3D7IsyuZ1zdpNjK8OoSOZGNmAidnnr6pTi9EC9_oDe7Vm2u7SlwZ_Dr58-FoqfCPvXNRo-ouvIwymfKk4fklgto3E1B007caz236tqWf07KeuDsBzzcQs9vCJQSQMLVjwk6AdYaqKCBy8oDFpBdbABjqLqsiovpgGA6KApsq', title: 'Manta Luminosa', sub: 'Baby Alpaca y Seda', price: '$320.00' },
  { id: 3, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd_roGYdFZidqIQ7BKh8cwrexF-B3b36UqnAToMwMgPQXrEi141sniUJ5v08bz6ylKBtJOid5XaifsVV7qKL68rhSpons1gwue_rQRGgxDFSz0_uAkfrQzNNVXxO2MTQAKgEQuSI9fZ_R5O0zZewRk0BvUnbd2J3J5NqjSrtNFdykoV6g31Q1pMbvAnv24OfYHvLFAtHp9LZK9m26GxiQfTFzIcWAienHRUy3x2ytWjf48bYxN-PUSBvwFAgguZb1KAiLn0vhkf5GC', title: 'Mitones Heritage', sub: '100% Alpaca Fina', price: '$85.00' },
  { id: 4, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBntXNHxtAYQAtG5e0S4PnY8LIPsta2SJYS5XPoQL26pfLp1lwS7-fg6SCKsPT1ctsNiEJVzWzPxVmRsRcd_6LYzpaagwR2PgAOwq2DAhJji02Nugj9Emxibpu5uxyPPC8YZfIYqqwtj9zSQgtNxI9sGJqKHOWKMvNSh87ipRowoBUWTMEEOz0J9nML16bPQdpl-6qKxC_D5bsxj0WrYp3L-P8u93ObPwtNFnLTCQ-ow0NbTSPffolftY6nYFFgnNTP_elKITpmHAMV', title: 'Abrigo Highland', sub: 'Mezcla de Alpaca Real', price: '$1,250.00' },
];

export default function WishlistGrid({ items = defaultItems, onRemove, onMoveToBag, className = '' }) {
  if (!items.length) {
    return (
      <div className={styles.empty}>
        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--color-text-light)' }}>favorite</span>
        <h3 className={styles.emptyTitle}>Tu lista esta vacia</h3>
        <p className={styles.emptyDesc}>Agrega productos a tu lista de favoritos para guardarlos para despues.</p>
      </div>
    );
  }
  return (
    <div className={[styles.grid, className].filter(Boolean).join(' ')}>
      {items.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.imageWrap}>
            <img src={item.img} alt={item.title} className={styles.image} loading="lazy" />
            <button className={styles.removeBtn} onClick={() => onRemove?.(item.id)} aria-label="Eliminar"><FiX size={18} /></button>
            {item.badge && <div className={styles.badge}><Badge variant={item.badgeVariant || 'warning'} size="sm">{item.badge}</Badge></div>}
            <div className={styles.moveWrap}>
              <button className={styles.moveBtn} onClick={() => onMoveToBag?.(item)}>Mover al carrito</button>
            </div>
          </div>
          <div className={styles.info}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.sub}>{item.sub}</p>
            <p className={styles.price}>{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}