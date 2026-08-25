import { useParams } from 'react-router-dom';
import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import CategoryHero from './sections/CategoryHero/CategoryHero';
import CategoryGrid from './sections/CategoryGrid/CategoryGrid';
import RecentlyViewed from './sections/RecentlyViewed/RecentlyViewed';

const categoryMap = {
  ponchos: { id: 1, name: 'Ponchos' },
  chompas: { id: 2, name: 'Chompas' },
  bufandas: { id: 3, name: 'Bufandas' },
  accesorios: { id: 4, name: 'Accesorios' },
  abrigos: { id: 5, name: 'Abrigos' },
  mantas: { id: 6, name: 'Mantas' },
  chalinas: { id: 7, name: 'Chalinas' },
  materials: { id: 8, name: 'Materiales' },
  nuevos: { id: 9, name: 'Nuevos Ingresos' },
  ofertas: { id: 10, name: 'Ofertas' },
  women: { id: 11, name: 'Mujer' },
  men: { id: 12, name: 'Hombre' },
};

export default function Category() {
  const { slug } = useParams();
  const cat = categoryMap[slug] || { id: null, name: slug || 'Categoría' };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 var(--spacing-lg)' }}>
      <Breadcrumb items={[
        { label: 'Inicio', path: '/' },
        { label: cat.name, path: '' },
      ]} />
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <CategoryHero
          title={cat.name + ' de Alpaca'}
          description={'Explora nuestra colección de ' + cat.name.toLowerCase() + ' elaborados con la mejor fibra de alpaca peruana.'}
        />
      </div>
      <CategoryGrid categoryId={cat.id} categoryName={cat.name} />
      <RecentlyViewed />
    </div>
  );
}
