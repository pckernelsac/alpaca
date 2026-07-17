import { Link } from 'react-router-dom';
import { products as allProducts, categoryNames } from '@/mocks';
import { cartStore } from '@/stores/cartStore';
import Styles from './CategoryGrid.module.css';

export default function CategoryGrid({ slug = 'all' }) {
    const products = slug === 'all' ? allProducts : allProducts.filter(p => p.category === slug);

  const handleAddToCart = (product) => {
    cartStore.addItem({ ...product, quantity: 1 });
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.sidebar}>
        <div className={Styles.filterSection}>
          <h3 className={Styles.filterTitle}>Categoria</h3>
          {Object.entries(categoryNames).map(([key, cat]) => (
            <Link key={key} to={`/category/${key}`} className={Styles.filterOpt}>{cat.name}</Link>
          ))}
        </div>
      </div>
      <div className={Styles.grid}>
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className={Styles.card}>
            <div className={Styles.imgWrap}>
              <img src={p.image} alt={p.title} className={Styles.img} loading="lazy" />
            </div>
            <div className={Styles.info}>
              <p className={Styles.subtitle}>{p.subtitle}</p>
              <h3 className={Styles.title}>{p.title}</h3>
              <p className={Styles.price}>${p.price}</p>
            </div>
            <button className={Styles.addBtn} onClick={(e) => { e.preventDefault(); handleAddToCart(p); }}>Agregar al Carrito</button>
          </Link>
        ))}
      </div>
    </div>
  );
}

