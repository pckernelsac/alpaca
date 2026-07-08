import VariantSelector from '@/pages/ProductDetail/sections/VariantSelector/VariantSelector';
import ProductTabs from '@/pages/ProductDetail/sections/ProductTabs/ProductTabs';
import styles from './ProductView.module.css';

export default function ProductView({ product }) {
  return (
    <div className={styles.grid}>
      <div className={styles.gallery}>
        <div className={styles.mainImg}>
          <img src={product.images?.[0]} alt={product.title} className={styles.img} />
          {product.badge && <span className={styles.badge}>{product.badge}</span>}
        </div>
        {product.images?.slice(1, 3).map((src, i) => (
          <div key={i} className={styles.thumbImg}>
            <img src={src} alt="" className={styles.img} loading="lazy" />
          </div>
        ))}
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.subtitle}>{product.subtitle}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price?.toLocaleString()}.00</span>
          {product.badge && <span className={styles.stockBadge}>{product.badge}</span>}
        </div>
        <p className={styles.desc}>{product.description}</p>
        <VariantSelector colors={product.colors} sizes={product.sizes} />
        <div className={styles.actions}>
          <button className={styles.buyBtn}>Comprar Ahora &mdash; Pago 100% Seguro</button>
          <button className={styles.addBtn}>Añadir a mi Colección</button>
        </div>
        <ProductTabs tabs={product.tabs} />
      </div>
    </div>
  );
}