import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import { cartStore } from '@/stores/cartStore';
import CartItem from '@/components/ecommerce/CartItem/CartItem';
import Price from '@/components/ecommerce/Price/Price';
import styles from './MiniCart.module.css';

export default function MiniCart({ isOpen, onClose }) {
  const [items, setItems] = useState(cartStore.getItems());
  useEffect(() => cartStore.subscribe(() => setItems(cartStore.getItems())), []);
  const total = cartStore.getTotal();
  const count = cartStore.getCount();

  if (!isOpen) return null;
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h3 className={styles.title}>Carrito ({count})</h3>
          <button className={styles.close} onClick={onClose}><FiX size={20} /></button>
        </div>
        {items.length === 0 ? (
          <div className={styles.empty}>
            <FiShoppingBag size={40} />
            <p>Tu carrito esta vacio</p>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <CartItem key={item.id} item={item} onUpdateQty={cartStore.updateQuantity} onRemove={cartStore.removeItem} />
              ))}
            </div>
            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Total</span>
                <Price value={total} size="lg" />
              </div>
              <Link to="/cart" className={styles.checkoutBtn} onClick={onClose}>Ir al Carrito</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}