import styles from './ArtisanSeries.module.css';

export default function ArtisanSeries() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.imageCol}>
          <img className={styles.image} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAITKJUaDiqtmfKaiYC_EhAzoLZSKZAeyyLs27P8iuwjmlp3cq-fcbOA6yL1iKsrgHt82pSTIRg62i6nBBFRaisoE--1a_r1rrWgJU5CD8tJ9tK-Mp1TZN6TSyKSA9GXovEMkYsdQHk9pjo-xfFTtLZmkyDnolfHrVjCzGrvsUPXWt8TgZ8Pp6oOMNDLkkA4cYuRryxQbtd8PBQdm2rbUHmcSjdxv9M6X9H9geiDhOgOZ53s3TutO0xQxzpJtYU8jOTiOrOFSbPF1KB" alt="" loading="lazy" />
          <div className={styles.badge}>
            <span className={styles.badgeNum}>100%</span>
            <span className={styles.badgeLabel}>Origen Ético</span>
          </div>
        </div>
        <div className={styles.textCol}>
          <span className={styles.eyebrow}>Artesanía Ancestral</span>
          <h2 className={styles.title}>Serie Artesanal</h2>
          <p className={styles.quote}>&ldquo;Cada hilo teje una historia que nace en las montañas.&rdquo;</p>
          <p className={styles.desc}>Nuestra Serie Artesanal honra el legado de los maestros tejedores quechuas en la región del Cusco. Cada pieza se culmina a mano durante cuatro semanas, alcanzando un nivel de detalle y solidez que la producción mecánica jamás podría igualar.</p>
          <a className={styles.link} href="#">Conoce a los Artesanos</a>
        </div>
      </div>
    </section>
  );
}