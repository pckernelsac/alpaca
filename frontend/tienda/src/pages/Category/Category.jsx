import { useParams } from 'react-router-dom';
import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import CategoryHero from './sections/CategoryHero/CategoryHero';
import CategoryGrid from './sections/CategoryGrid/CategoryGrid';
import RecentlyViewed from './sections/RecentlyViewed/RecentlyViewed';

const categoryNames = {
  ponchos: 'Ponchos', chompas: 'Chompas', bufandas: 'Bufandas',
  accesorios: 'Accesorios', abrigos: 'Abrigos', materials: 'Materiales',
  nuevos: 'Nuevos Ingresos', ofertas: 'Ofertas',   women: 'Mujer',
  men: 'Hombre', home: 'Hogar', all: 'Catalogo',   bestsellers: 'Los más vendidos',
};

export default function Category() {
  const { slug } = useParams();
  const name = categoryNames[slug] || slug || 'Categoria';

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 var(--spacing-lg)' }}>
      <Breadcrumb items={[
        { label: 'Inicio', path: '/' },
        { label: name, path: '' },
      ]} />
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <CategoryHero
          title={name + ' de Alpaca'}
          description={'Explora nuestra coleccion de ' + name.toLowerCase() + ' elaborados con la mejor fibra de alpaca peruana.'}
        />
      </div>
      <CategoryGrid slug={slug} />
      <RecentlyViewed />
    </div>
  );
}
