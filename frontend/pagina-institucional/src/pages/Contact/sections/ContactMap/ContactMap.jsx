import styles from './ContactMap.module.css';

export default function ContactMap() {
  return (
    <section className={styles.mapSection}>
      <div className={styles.mapBg}>
        <div
          className={styles.mapImage}
          style={{
            backgroundImage:
              'url(https://lh3.googleusercontent.com/aida-public/AB6AXuB20BBVRyJGeOVZp8FEPzyjaRjexTuJcqA2FK28qCkCQgayY9cl4uZiJwR7qqVWvPf8YMJZvECZtLslWI4QMWf43FwyFdPppV_CBUIdhIpwYiRq-ME4x6F920dqCcTIQu25BmBxtaC1UXyyqg4fcM-LLiOJ4SeD50cILM9ZEAjoNH13kmCxhhn4OXuUM2wvSlpHxwKz7v59QpeNYldZkhGtrzcUPApUOR5Q9WqXxjVVe4l3WYbgsBwn07xiXle10Pew4U9vWjjzXj8)',
          }}
        />
      </div>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Cusco</p>
        <p className={styles.cardDesc}>
          Visite nuestro atelier principal en el corazon de los Andes.
        </p>
      </div>
    </section>
  );
}
