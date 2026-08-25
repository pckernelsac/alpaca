import { useAuth } from '@/hooks/useAuth';
import { useCart, useWishlist } from '@/hooks';
import ProductTabs from '@/pages/ProductDetail/sections/ProductTabs/ProductTabs';
import styles from './ProductView.module.css';

export default function ProductView({ product }) {
  const { id, title, subtitle, price, imageUrl, description, colors, sizes, badge, tabs } = product;
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { toggle } = useWishlist();

  const handleAddToCart = async () => {
    await addItem({ productId: id, title, price, image: imageUrl, quantity: 1 });
  };

  const handleToggleWishlist = () => {
    toggle(product.id);
  };

  return (
    <div className={styles.grid}>
      <div className={styles.gallery}>
        <div className={styles.mainImg}>
          {imageUrl ? (
            <img src={imageUrl} alt={title} className={styles.img} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#bbb', fontSize: 14 }}>Sin imagen</div>
          )}
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.priceRow}>
          <span className={styles.price}>S/ {price.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <p className={styles.desc}>{description}</p>
        {colors.length > 0 && (
          <div>
            <p className={styles.label}>Colores</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {colors.map((c, i) => (
                <span key={i} style={{ display: 'inline-block', width: 28, height: 28, borderRadius: '50%', background: c, border: '1px solid #ddd' }} />
              ))}
            </div>
          </div>
        )}
        {sizes.length > 0 && (
          <div>
            <p className={styles.label}>Tallas</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {sizes.map((s, i) => (
                <span key={i} style={{ padding: '4px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: '0.85rem' }}>{s.label}</span>
              ))}
            </div>
          </div>
        )}
        <div className={styles.actions}>
          <button className={styles.buyBtn} onClick={handleAddToCart}>Añadir al Carrito</button>
          {isAuthenticated && (
            <button className={styles.addBtn} onClick={handleToggleWishlist}>Añadir a mi Colección</button>
          )}
        </div>
        {tabs && <ProductTabs tabs={tabs} />}
      </div>
    </div>
  );
}
