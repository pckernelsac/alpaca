import styles from './CollectionHero.module.css';

export default function CollectionHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>Legado de los Andes</span>
        <h1 className={styles.title}>Nuestras Colecciones</h1>
        <p className={styles.subtitle}>Un diálogo entre la sabiduría ancestral y las siluetas contemporáneas. Cada pieza de nuestra curaduría es un testimonio del calor de los Andes. Tejidas a mano para el conocedor que busca autenticidad y belleza atemporal.</p>
      </div>
    </section>
  );
}