import styles from './CategoryHero.module.css';

export default function CategoryHero({ title = 'Tejidos para Mujer', description = 'Descubre la suavidad incomparable de la fibra de alpaca. Tejidos que fusionan la tradición textil andina con el diseño contemporáneo, creados para la mujer que valora la autenticidad.' }) {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <img className={styles.bgImg} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGH-TL4miTu855fIw7CRG_HDXQbkFhYy9S7gj6KIxI2IGM7h0VLp8kcstNLclkdnTGWDafRLw2PjmGc3cOKUdhVDhZBiYtG_f6kl3yXxAYJIYK9aGojNbcLTO5T6a41SDVGGaj4jd0dNb2JJTIPll-CCvKifKeF3MqPcluw2ymbt-dGM25QagKVyKo-fmsqUhZkWls6GfaomhObsRXj9stK6B4qHJfxdoHxNr8kVXL8w3iavmhd8srXgCPbiT2ldeDQgPuAEqlOjx9" alt="" />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.desc}>{description}</p>
      </div>
    </section>
  );
}