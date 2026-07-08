import ProductCard from '@/components/ecommerce/ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products = [], columns = 3, variant = 'grid', onAddToCart, onToggleWishlist, className = '' }) {
  if (!products.length) {
    return <div className={styles.empty}>No se encontraron productos.</div>;
  }
  return (
    <div className={[styles.grid, styles['cols' + columns], className].filter(Boolean).join(' ')}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} />
      ))}
    </div>
  );
}