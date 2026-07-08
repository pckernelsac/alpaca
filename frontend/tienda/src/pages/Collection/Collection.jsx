import CollectionHero from './sections/CollectionHero/CollectionHero';
import CollectionGrid from './sections/CollectionGrid/CollectionGrid';
import styles from './Collection.module.css';

export default function Collection() {
  return (
    <>
      <CollectionHero />
      <CollectionGrid />
      <section className={styles.quote}>
        <span className={[styles.quoteIcon, 'material-symbols-outlined'].join(' ')}>eco</span>
        <blockquote className={styles.quoteText}>
          &ldquo;El lujo verdadero no está en la etiqueta del precio, sino en el hilo invisible que teje la ética con la herencia de una prenda.&rdquo;
        </blockquote>
        <p className={styles.quoteLabel}>&mdash; Nuestro Compromiso con la Sostenibilidad</p>
      </section>
    </>
  );
}
