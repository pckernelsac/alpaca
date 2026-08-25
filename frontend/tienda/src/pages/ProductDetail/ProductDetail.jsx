import { useParams } from 'react-router-dom';
import { useProductDetail } from '@/hooks';
import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import ProductView from './sections/ProductView/ProductView';
import styles from './ProductDetail.module.css';

const crumbs = [{ label: 'Inicio', to: '/' }, { label: 'Producto' }];

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProductDetail(id);

  if (loading) return <div className={styles.wrapper}><p style={{ padding: 40, textAlign: 'center', color: '#888' }}>Cargando producto...</p></div>;
  if (error) return <div className={styles.wrapper}><p style={{ padding: 40, textAlign: 'center', color: '#c00' }}>Error: {error.message}</p></div>;
  if (!product) return <div className={styles.wrapper}><p style={{ padding: 40, textAlign: 'center', color: '#888' }}>Producto no encontrado.</p></div>;

  const firstVariant = product.variants?.[0];
  const price = Number(firstVariant?.price ?? product.price ?? 0);
  const media = product.media || [];
  const images = product.images?.length ? product.images : media.map(m => m.url).filter(Boolean);
  const imageUrl = images[0] || product.image || '';
  const colors = [...new Set(product.variants?.filter(v => v.colorHex || v.colorName).map(v => v.colorHex || v.colorName) || [])];
  const sizeMap = { 1: 'XS', 2: 'S', 3: 'M', 4: 'L', 5: 'XL', 6: 'XXL', 7: 'Único', 8: 'KING' };
  const sizes = product.variants?.filter(v => v.sizeId).map(v => ({ label: sizeMap[v.sizeId] || 'Talla ' + v.sizeId })) || [];

  return (
    <div className={styles.wrapper}>
      <Breadcrumb crumbs={crumbs} />
      <ProductView product={{
        id: product.id,
        title: product.name || 'Producto',
        subtitle: product.subtitle || product.material || firstVariant?.sku || '',
        price,
        imageUrl,
        description: product.description || 'Prenda elaborada con fibra de alpaca de primera calidad.',
        colors,
        sizes,
        badge: product.status !== 'active' ? product.status : undefined,
        tabs: [
          { title: 'Composición', content: product.description || 'Fibra de alpaca seleccionada.' },
          { title: 'Cuidado', content: 'Lavar a mano con agua fría. No retorcer. Secar en superficie plana.' },
          { title: 'Envíos', content: 'Envíos internacionales. Devoluciones dentro de 30 días.' },
        ],
      }} />
    </div>
  );
}
