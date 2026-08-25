import { Link } from 'react-router-dom';

import { productPath } from '../../lib/routes';

import type { Product } from '../../lib/types';
import { useCart } from '../../providers/CartProvider';
import { useWishlist } from '../../hooks/useWishlist';
import { Button } from '../ui/Button';
import { ProductImage } from './ProductImage';
import { IconHeart } from '../ui/Icon';
import { Badge, Price, Skeleton } from '../ui/Primitives';
import styles from './ProductCard.module.css';

/** Colores únicos de las variantes, para las muestras bajo el nombre. */
function swatches(product: Product) {
  const seen = new Map<string, string>();
  product.variants.forEach((variant) => {
    if (variant.color_hex && !seen.has(variant.color_hex)) {
      seen.set(variant.color_hex, variant.color_name ?? '');
    }
  });
  return Array.from(seen.entries()).slice(0, 5);
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem, busy } = useCart();
  const { isFavourite, toggle } = useWishlist();

  const colors = swatches(product);
  const soldOut = product.stock === 0;
  const isNew =
    product.created_at !== null &&
    Date.now() - new Date(product.created_at).getTime() < 1000 * 60 * 60 * 24 * 30;
  const favourite = isFavourite(product.id);

  return (
    <article className={styles.card}>
      {/* Todo lo que flota (insignias, favorito, compra rápida) se ancla a
          este contenedor y no a la tarjeta: si no, el botón cae sobre el
          nombre y el precio en vez de quedarse sobre la foto. */}
      <div className={styles.media}>
        <Link
          to={productPath(product.slug, product.id)}
          className={styles.imageLink}
          aria-label={product.name}
          tabIndex={-1}
        >
          <ProductImage
            src={product.image}
            alt={product.name}
            tint={colors[0]?.[0]}
            className={styles.image}
            width={600}
            height={800}
          />
          {soldOut && <div className={styles.soldOut}>Agotado</div>}
        </Link>

        <div className={styles.badges}>
          {isNew && <Badge tone="solid">Nuevo</Badge>}
          {product.collection?.id === 'VC-2025' && <Badge tone="gold">Edición limitada</Badge>}
          {!soldOut && product.stock <= 5 && <Badge tone="warning">Últimas unidades</Badge>}
        </div>

        <button
          type="button"
          className={`${styles.wishlist} ${favourite ? styles.wishlistActive : ''}`}
          onClick={() => void toggle(product.id)}
          aria-label={
            favourite
              ? `Quitar ${product.name} de favoritos`
              : `Agregar ${product.name} a favoritos`
          }
          aria-pressed={favourite}
        >
          <IconHeart size={18} filled={favourite} />
        </button>

        {!soldOut && (
          <div className={styles.quickAdd}>
            <Button
              variant="primary"
              size="sm"
              fullWidth
              disabled={busy}
              onClick={() => void addItem(product.id, 1)}
            >
              Agregar al carrito
            </Button>
          </div>
        )}
      </div>

      <div className={styles.info}>
        {product.material && <span className={styles.material}>{product.material}</span>}
        <h3 className={styles.name}>
          <Link to={productPath(product.slug, product.id)}>{product.name}</Link>
        </h3>
        <div className={styles.meta}>
          <Price value={product.price} showFrom={product.variants.length > 1} size="sm" />
          {colors.length > 0 && (
            <span className={styles.colors}>
              {colors.map(([hex, name]) => (
                <span
                  key={hex}
                  className={styles.swatch}
                  style={{ backgroundColor: hex }}
                  title={name}
                />
              ))}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton className={styles.skeletonImage} />
      <div className={styles.info}>
        <Skeleton height="0.7rem" width="40%" />
        <Skeleton height="1.1rem" width="80%" />
        <Skeleton height="0.9rem" width="30%" />
      </div>
    </div>
  );
}
