import SuccessMessage from '@/components/ecommerce/SuccessMessage/SuccessMessage';
import styles from './Thanks.module.css';

const items = [
  { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-raKaETQMX_9Gz8yPTCcLuTlQ8OcWfNuiOJ3w3c8lD6dmMCIhvQH6YdRr8-Vpbd1mDQfseWhd3xGNBHQzXqMHjCql4kVxqRjX7Gz-LpHrzg0Cr89JLXuzdW_ix22a5YtYQj0oq5ISlAgEsD6xNxmMCGCEEkT6vEMhSSAgYpq5OHWuBmWeCqrP6QtlPo9lZQp91pWU00UK6XxFree2Ua65IjCaLYfb0sprNP2K8exfqRa2iTlAkt0oLMU9Wq7-JapmMPzPpjApKzoJ', title: 'El Abrigo Heritage', variant: 'Talla: M | Color: Gris Carbón', qty: 1, price: 1250 },
  { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlPTmIcEExDUhtdH_vUTgTspihmFYRVsRKAXKQFRqKAzZvj3IInElWPVGWZD5cFjfssKQDWGc3cZjDlrJ107C43Un_ZKrtAhCB14pE9_utg1A4q4WFCBSCL_jrmDf3JcxTpHOYrbRti1ULK0S9-efRD1XO5BRWM8-mS3rBl9fZq7UyJU9BzCOlcyreWY9uOWacC9uzd4R_8eV92p4-D9aPe7HCZ3zym-pq0PU-TsSmGZi-5aHJBnH58bKoBZ0zFZ3NHPPpXGX4zsXr', title: 'Bufanda Signature', variant: 'Color: Crema Natural', qty: 1, price: 320 },
];
const subtotal = items.reduce((s, i) => s + i.price, 0);

export default function Thanks() {
  return (
    <div className={styles.wrapper}>
      <SuccessMessage />
      <div className={styles.grid}>
        <div className={styles.itemsCol}>
          <h3 className={styles.sectionLabel}>Tu pedido</h3>
          {items.map((item, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemImg}><img src={item.image} alt={item.title} className={styles.itemImgEl} /></div>
              <div className={styles.itemInfo}>
                <div className={styles.itemTitleRow}><h4 className={styles.itemTitle}>{item.title}</h4><p className={styles.itemPrice}>${item.price}</p></div>
                <p className={styles.itemVariant}>{item.variant}</p>
                <p className={styles.itemQty}>Cantidad: {item.qty}</p>
              </div>
            </div>
          ))}
          <div className={styles.totals}>
            <div className={styles.totalRow}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className={styles.totalRow}><span>Envío</span><span>Gratis</span></div>
            <div className={[styles.totalRow, styles.totalFinal].filter(Boolean).join(' ')}><span>TOTAL</span><span>${subtotal.toFixed(2)}</span></div>
          </div>
        </div>
        <div className={styles.sideCol}>
          <div className={styles.nextSteps}>
            <h3 className={styles.nextTitle}>¿Qué sigue?</h3>
            <ul className={styles.nextList}>
              <li className={styles.nextItem}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>mail</span>
                <div><p className={styles.nextItemTitle}>Correo de confirmación</p><p className={styles.nextItemDesc}>Te enviamos un recibo detallado a tu correo electrónico.</p></div>
              </li>
              <li className={styles.nextItem}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>precision_manufacturing</span>
                <div><p className={styles.nextItemTitle}>Preparación artesanal</p><p className={styles.nextItemDesc}>Tus prendas están siendo inspeccionadas y empacadas a mano en Cusco.</p></div>
              </li>
              <li className={styles.nextItem}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>local_shipping</span>
                <div><p className={styles.nextItemTitle}>Despacho courier</p><p className={styles.nextItemDesc}>Recibirás tu número de seguimiento por correo en las próximas 24 a 48 horas.</p></div>
              </li>
            </ul>
            <button className={styles.trackBtn}>Rastrear mi pedido</button>
            <button className={styles.shopBtn}>Seguir comprando</button>
          </div>
        </div>
      </div>
    </div>
  );
}