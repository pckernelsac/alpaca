import styles from './Banner.module.css';

export default function Banner({ image, title, subtitle, cta, ctaLink = '#', variant = 'dark', className = '' }) {
  return (
    <section className={[styles.banner, styles[variant], className].filter(Boolean).join(' ')} style={image ? { backgroundImage: 'url(' + image + ')' } : undefined}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {cta && <a href={ctaLink} className={styles.cta}>{cta}</a>}
      </div>
    </section>
  );
}