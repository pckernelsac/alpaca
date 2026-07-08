import styles from './ProductReviews.module.css';

const reviews = [
  { quote: 'El Abrigo Heritage no es solo una prenda: es una experiencia. La ligereza y el calor que transmite son difíciles de explicar con palabras. Una obra maestra de los Andes.', author: 'Julian V., Ginebra', tag: 'Compra verificada' },
  { quote: 'Pocas veces un producto supera las expectativas que promete. Este abrigo lo hace con creces. El tono dorado de la vicuña es impresionante bajo la luz del día.', author: 'Alexander K., Nueva York', tag: 'Compra verificada' },
];

export default function ProductReviews() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Experiencias de nuestros clientes</h2>
          <div className={styles.rating}>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className={styles.ratingText}>5.0 de 5.0 (12 opiniones)</span>
          </div>
        </div>
        <div className={styles.list}>
          {reviews.map((r, i) => (
            <div key={i} className={styles.review}>
              <p className={styles.quote}>&ldquo;{r.quote}&rdquo;</p>
              <div className={styles.meta}>
                <span className={styles.author}>{r.author}</span>
                <span className={styles.tag}>{r.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}