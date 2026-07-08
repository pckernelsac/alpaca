import styles from './HeroBase.module.css';

export default function HeroBase({ image, overlay = true, height = '921px', justify = 'center', children, className = '' }) {
  return (
    <section className={[styles.hero, className].filter(Boolean).join(' ')} style={{ height }}>
      <div className={styles.bg} style={{ backgroundImage: 'url(' + image + ')' }} />
      {overlay && <div className={styles.overlay} />}
      <div className={[styles.content, styles[justify]].filter(Boolean).join(' ')}>{children}</div>
    </section>
  );
}
