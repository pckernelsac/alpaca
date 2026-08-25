import { TIENDA_URL } from '../../lib/api';
import type { Product } from '../../lib/types';
import { formatPrice } from '../ui/Primitives';
import { Figura } from './Figura';
import styles from './PiezaCard.module.css';

/**
 * Ficha de una pieza en la vitrina.
 *
 * No lleva a una ficha interna: la web institucional no vende. El enlace sale
 * a la tienda, que es otra aplicación en otro origen, así que es un <a> y no
 * un <Link>.
 */
export function PiezaCard({ pieza }: { pieza: Product }) {
  return (
    <a className={styles.card} href={`${TIENDA_URL}/producto/${pieza.slug}`}>
      <div className={styles.media}>
        <Figura src={pieza.image} alt={pieza.name} className={styles.image} />
      </div>

      <div className={styles.body}>
        {pieza.material && <p className={styles.material}>{pieza.material}</p>}
        <h3 className={styles.name}>{pieza.name}</h3>
        <p className={styles.price}>
          <span className={styles.from}>desde</span> {formatPrice(pieza.price)}
        </p>
      </div>
    </a>
  );
}
