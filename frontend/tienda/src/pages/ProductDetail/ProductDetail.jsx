import { useParams } from 'react-router-dom';
import { products } from '@/mocks';
import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import ProductView from './sections/ProductView/ProductView';
import RelatedProducts from './sections/RelatedProducts/RelatedProducts';
import ProductReviews from './sections/ProductReviews/ProductReviews';
import styles from './ProductDetail.module.css';

const crumbs = [{ label: 'Inicio', to: '/' }, { label: 'Producto' }];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[0];

  const sampleProduct = {
    ...product,
    badge: product.badge || undefined,
    images: [product.image],
    tabs: [
      { title: 'Composición y Beneficios', content: product.description },
      { title: 'Cuidado y Lavado', content: 'Lavar a mano con agua fría y jabón neutro. No retorcer. Secar en superficie plana a la sombra.' },
      { title: 'Envíos y Devoluciones', content: 'Envíos internacionales a más de 50 países. Devoluciones dentro de los 30 días.' },
    ],
  };

  return (
    <div className={styles.page}>
      <Breadcrumb crumbs={crumbs} />
      <ProductView product={sampleProduct} />
      <ProductReviews />
      <RelatedProducts />
    </div>
  );
}
