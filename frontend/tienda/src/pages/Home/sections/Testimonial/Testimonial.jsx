import styles from './Testimonial.module.css';

export default function Testimonial() {
  return (
    <section className={styles.section}>
      <span className={[styles.quoteIcon, 'material-symbols-outlined'].join(' ')}>format_quote</span>
      <blockquote className={styles.quote}>
        &ldquo;Alpacart captura la esencia del lujo silencioso. La textura de su Alpaca Real es incomparable; no había sentido nada igual en veinte años de edición de moda.&rdquo;
      </blockquote>
      <cite className={styles.cite}>&mdash; Elena V., Directora de Moda, L'Élégance</cite>
    </section>
  );
}