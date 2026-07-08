import Container from '@components/layout/Container/Container';
import styles from './HeroSection.module.css';

export default function HeroSection({
  image,
  overlay = true,
  height = 'full',
  children,
  className = '',
}) {
  return (
    <section className={`${styles.hero} ${styles[height]} ${className}`}>
      {image && <img src={image} alt="" className={styles.bg} />}
      {overlay && <div className={styles.overlay} />}
      <Container className={styles.content}>
        {children}
      </Container>
    </section>
  );
}