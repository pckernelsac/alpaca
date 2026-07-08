import styles from './StoreHero.module.css';

export default function StoreHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <img className={styles.bgImg} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhHOHXlVYSeQtCIXqa26QbAPam7NGfbaTHO5WIMtdglOUDxcelk7Wn41Igguwnd0zaieCTpeoZy5hyMoSbazMZVzNwKzqT3z2W-RXOBi-7D49Yg53ZTqzXxWLHXTF5_5CbIGrE3hsk7-MeT9GZdfw0n26GIiVoMLrlnDAoB0vkzZmo1hJh1Qyfxpl8yEk5sw_0iKUlQNh9QIcgxIdFW9mNo61hreHO7cMgIkqUjwTUbuEMOiGSfFEvWljKowENttENlAPDVTmMj2OC" alt="" />
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <span className={styles.eyebrow}>Legado de Excelencia</span>
        <h1 className={styles.title}>Colección <br />Dorada de los Andes</h1>
        <p className={styles.subtitle}>La suavidad más pura de los Andes, envuelta en una artesanía peruana que trasciende generaciones.</p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary}>Explorar Colección</button>
        </div>
      </div>
    </section>
  );
}