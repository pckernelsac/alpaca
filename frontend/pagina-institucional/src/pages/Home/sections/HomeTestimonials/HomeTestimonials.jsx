import styles from './HomeTestimonials.module.css';

export default function HomeTestimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={[styles.quoteIcon, 'material-symbols-outlined'].join(' ')}>
          format_quote
        </span>
        <blockquote className={styles.quote}>
          &ldquo;Cada prenda tiene una presencia que abraza como la tierra misma. ALPACART no es solo
          moda; es alma.&rdquo;
        </blockquote>
        <cite className={styles.cite}>&mdash; ELENA V., MILAN</cite>
      </div>
    </section>
  );
}
