import SEO from '@/components/seo/SEO';
import CTA from '@/components/common/CTA/CTA';
import styles from './Blog.module.css';

export default function Blog() {
  return (
    <><SEO title="Blog" description="Blog de Alpacart: historias de artesanos, guías de cuidado de alpaca y tendencias de moda sostenible." />
      <section className={styles.container}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>Historias, guías y tendencias del mundo de la alpaca</p>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.imagePlaceholder}></div>
            <h3>La Tradición del Tejido Andino</h3>
            <p>Descubre cómo las técnicas ancestrales de tejido se mantienen vivas en los Andes peruanos.</p>
            <span className={styles.date}>Próximamente</span>
          </article>
          <article className={styles.card}>
            <div className={styles.imagePlaceholder}></div>
            <h3>Guía de Cuidado de Prendas de Alpaca</h3>
            <p>Aprende a mantener tus prendas Alpacart en perfectas condiciones por años.</p>
            <span className={styles.date}>Próximamente</span>
          </article>
          <article className={styles.card}>
            <div className={styles.imagePlaceholder}></div>
            <h3>Baby Alpaca vs Alpaca Real</h3>
            <p>Conoce las diferencias entre nuestros tipos de fibra y elige la mejor para ti.</p>
            <span className={styles.date}>Próximamente</span>
          </article>
        </div>
      </section>
      <CTA />
    </>
  );
}

