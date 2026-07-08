import HeroBase from '@/components/layout/HeroBase/HeroBase';
import styles from './AboutHero.module.css';

const heroBg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj2nVv7K3IJKLrvlEQUjda0zAHVjQ36KXS88n4ea6BhR29neZ1yLhV5eJwdPdzxPed6my3L3771RohPZCDVwUKyaZx5kWtLq3k1lGt6tcJ_A78vYzpA6ZOzpT5mjeO2S6QwSCfvMHA1niTBA63wxI2LKS4JWx0FMC5WHpL9oTzTuTebhzRwBWQvvv-53ymseN7huH9UR8r065nlwS-oySu2Ot7xrR3HvZtrjxgbN1LiwWVcPWmJ4FaKD_LkSLIjRldj5o9PTrC5Qw';

export default function AboutHero() {
  return (
    <HeroBase image={heroBg} height="921px">
      <div className={styles.textBox}>
        <span className={styles.eyebrow}>Espiritu Ancestral</span>
        <h1 className={styles.title}>El Alma de los Andes tejida en cada hebra.</h1>
        <p className={styles.subtitle}>Honramos la nobleza de las fibras mas finas del mundo, transformando la tradicion milenaria de Peru en lujo contemporaneo.</p>
      </div>
    </HeroBase>
  );
}
