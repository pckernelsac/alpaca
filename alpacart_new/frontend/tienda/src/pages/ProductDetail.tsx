import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ProductCard } from '../components/shop/ProductCard';
import { Button } from '../components/ui/Button';
import { IconChevronDown, IconHeart, IconMinus, IconPlus } from '../components/ui/Icon';
import { Alert, Badge, LoadingBlock, Price, Rating } from '../components/ui/Primitives';
import { useProduct, useProducts, useReviews } from '../hooks/useCatalog';
import { usePageTitle } from '../hooks/usePageTitle';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../providers/CartProvider';
import page from './Page.module.css';
import styles from './ProductDetail.module.css';

const CARE = `Lavado a mano en agua fría con jabón neutro. No retorcer: presionar
para quitar el agua y secar en plano a la sombra. Guardar doblada, nunca colgada.`;

export function ProductDetail() {
  // Puede ser el slug (URLs nuevas) o un UUID (links viejos): la API resuelve
  // las dos formas y devuelve el mismo producto.
  const { slug } = useParams<{ slug: string }>();
  const { product, loading, error } = useProduct(slug);
  const reviews = useReviews(product?.id);
  const { addItem, busy } = useCart();
  const { isFavourite, toggle } = useWishlist();

  const [variantId, setVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [openPanel, setOpenPanel] = useState<string | null>('detalles');

  usePageTitle(product?.name);

  // Relacionados: misma categoría, excluyendo el producto actual.
  const { products: related } = useProducts({
    limit: 5,
    category_id: product?.category?.id,
  });

  const activeVariants = useMemo(
    () => product?.variants.filter((variant) => variant.status === 'active') ?? [],
    [product],
  );

  const selected = useMemo(
    () =>
      activeVariants.find((variant) => variant.id === variantId) ??
      activeVariants.find((variant) => variant.stock > 0) ??
      activeVariants[0] ??
      null,
    [activeVariants, variantId],
  );

  if (loading) return <LoadingBlock label="Cargando producto" />;

  if (error || !product) {
    return (
      <div className="container" style={{ paddingBlock: 'var(--space-20)' }}>
        <Alert tone="danger">{error ?? 'No encontramos este producto'}</Alert>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <Button variant="secondary" onClick={() => window.history.back()}>
            Volver
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : product.image ? [product.image] : [];
  const stock = selected?.stock ?? product.stock;
  const soldOut = stock === 0;
  const favourite = isFavourite(product.id);

  const panels = [
    {
      id: 'detalles',
      title: 'Detalles y composición',
      content: (
        <div className={styles.specList}>
          <div className={styles.specRow}>
            <span className={styles.specKey}>Material</span>
            <span>{product.material ?? '—'}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specKey}>SKU</span>
            <span>{selected?.sku ?? product.sku}</span>
          </div>
          {product.category && (
            <div className={styles.specRow}>
              <span className={styles.specKey}>Categoría</span>
              <span>{product.category.name}</span>
            </div>
          )}
          {product.collection && (
            <div className={styles.specRow}>
              <span className={styles.specKey}>Colección</span>
              <span>{product.collection.name}</span>
            </div>
          )}
          <div className={styles.specRow}>
            <span className={styles.specKey}>Origen</span>
            <span>Perú</span>
          </div>
        </div>
      ),
    },
    { id: 'cuidado', title: 'Cuidado de la prenda', content: <p>{CARE}</p> },
    {
      id: 'envio',
      title: 'Envíos y devoluciones',
      content: (
        <p>
          Envío gratis en compras superiores a S/500. Lima entre 1 y 2 días hábiles, provincias
          entre 3 y 5. Tenés 30 días para cambiar talla o color sin costo.
        </p>
      ),
    },
  ];

  return (
    <>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.gallery}>
            {images.length > 0 ? (
              <>
                <img
                  src={images[imageIndex]}
                  alt={product.name}
                  className={styles.mainImage}
                  width={900}
                  height={1200}
                />
                {images.length > 1 && (
                  <div className={styles.thumbs}>
                    {images.map((url, index) => (
                      <img
                        key={url}
                        src={url}
                        alt=""
                        className={`${styles.thumb} ${
                          index === imageIndex ? styles.thumbActive : ''
                        }`}
                        onClick={() => setImageIndex(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') setImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className={styles.mainImage} />
            )}
          </div>

          <div className={styles.info}>
            <nav className={page.breadcrumb} aria-label="Ruta">
              <Link to="/">Inicio</Link>
              <span>/</span>
              <Link to="/tienda">Catálogo</Link>
              {product.category && (
                <>
                  <span>/</span>
                  <Link to={`/tienda?category_id=${product.category.id}`}>
                    {product.category.name}
                  </Link>
                </>
              )}
            </nav>

            {product.material && <p className={styles.material}>{product.material}</p>}
            <h1 className={styles.name}>{product.name}</h1>

            <div className={styles.priceRow}>
              <Price value={selected ? selected.price : product.price} size="lg" />
              {reviews.count > 0 && <Rating value={reviews.average} count={reviews.count} />}
              {product.collection?.id === 'VC-2025' && <Badge tone="gold">Edición limitada</Badge>}
            </div>

            {product.description && <p className={styles.description}>{product.description}</p>}

            {activeVariants.length > 1 && (
              <div className={styles.optionGroup}>
                <div className={styles.optionLabel}>
                  <span>Color y talla</span>
                  {selected && <span className={styles.optionValue}>{selected.label}</span>}
                </div>
                <div className={styles.variants}>
                  {activeVariants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      className={[
                        styles.variant,
                        selected?.id === variant.id && styles.variantActive,
                        variant.stock === 0 && styles.variantDisabled,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => {
                        setVariantId(variant.id);
                        setQuantity(1);
                      }}
                      disabled={variant.stock === 0}
                      aria-pressed={selected?.id === variant.id}
                    >
                      {variant.color_hex && (
                        <span
                          className={styles.variantSwatch}
                          style={{ backgroundColor: variant.color_hex }}
                        />
                      )}
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.buyRow}>
              <div className={styles.stepper}>
                <button
                  type="button"
                  className={styles.stepperButton}
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  disabled={quantity <= 1}
                  aria-label="Quitar una unidad"
                >
                  <IconMinus size={16} />
                </button>
                <span className={styles.stepperValue}>{quantity}</span>
                <button
                  type="button"
                  className={styles.stepperButton}
                  onClick={() => setQuantity((value) => Math.min(stock, value + 1))}
                  disabled={quantity >= stock}
                  aria-label="Agregar una unidad"
                >
                  <IconPlus size={16} />
                </button>
              </div>

              <Button
                size="lg"
                fullWidth
                disabled={soldOut || busy}
                onClick={() => void addItem(product.id, quantity, selected?.id)}
              >
                {soldOut ? 'Agotado' : 'Agregar al carrito'}
              </Button>

              <Button
                size="lg"
                variant="secondary"
                iconOnly
                onClick={() => void toggle(product.id)}
                aria-label={favourite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                aria-pressed={favourite}
              >
                <IconHeart filled={favourite} />
              </Button>
            </div>

            <p className={styles.stockNote}>
              <span
                className={[
                  styles.stockDot,
                  stock === 0 && styles.stockOut,
                  stock > 0 && stock <= 5 && styles.stockLow,
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
              {stock === 0
                ? 'Sin stock por ahora'
                : stock <= 5
                  ? `Quedan ${stock} unidades`
                  : 'Disponible · listo para enviar'}
            </p>

            <div className={styles.accordion}>
              {panels.map((panel) => {
                const open = openPanel === panel.id;
                return (
                  <div
                    key={panel.id}
                    className={`${styles.accordionItem} ${open ? styles.accordionOpen : ''}`}
                  >
                    <button
                      type="button"
                      className={styles.accordionTrigger}
                      onClick={() => setOpenPanel(open ? null : panel.id)}
                      aria-expanded={open}
                    >
                      {panel.title}
                      <IconChevronDown size={18} className={styles.accordionIcon} />
                    </button>
                    {open && <div className={styles.accordionPanel}>{panel.content}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {reviews.items.length > 0 && (
        <section className={styles.reviews}>
          <div className="container">
            <div className={styles.reviewsHead}>
              <h2 className={styles.reviewsTitle}>Reseñas</h2>
              <Rating value={reviews.average} count={reviews.count} size={18} />
            </div>
            <div className={styles.reviewGrid}>
              {reviews.items.map((review) => (
                <article key={review.id} className={styles.review}>
                  <Rating value={review.rating} />
                  <p className={styles.reviewText}>{review.text}</p>
                  <p className={styles.reviewAuthor}>{review.author}</p>
                  <p className={styles.reviewDate}>
                    {new Date(review.createdAt).toLocaleDateString('es-PE', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.filter((item) => item.id !== product.id).length > 0 && (
        <section className="section" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <h2 className={page.titleSm} style={{ marginBottom: 'var(--space-10)' }}>
              También te puede gustar
            </h2>
            <div className={page.productGrid}>
              {related
                .filter((item) => item.id !== product.id)
                .slice(0, 4)
                .map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
