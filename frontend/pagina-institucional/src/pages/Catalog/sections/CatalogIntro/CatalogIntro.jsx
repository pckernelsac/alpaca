import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import styles from './CatalogIntro.module.css';

export default function CatalogIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.labelCol}>
          <Eyebrow>El Legado de la Fibra</Eyebrow>
          <h2 className={styles.title}>Curaduria de Excelencia</h2>
        </div>
        <div className={styles.descCol}>
          <p className={styles.desc}>
            Nuestra seleccion institucional representa la cumspide de la artesania peruana. Desde el
            brillo etereo de la Vicuna hasta la calidez estructural del Baby Alpaca, presentamos
            prendas disenadas para trascender generaciones. No es solo moda; es una herencia tactil
            que preserva la trazabilidad y el bienestar animal en cada hebra.
          </p>
        </div>
      </div>
    </section>
  );
}
