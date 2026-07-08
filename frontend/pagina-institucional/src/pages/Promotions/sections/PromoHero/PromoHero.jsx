import HeroBase from '@/components/layout/HeroBase/HeroBase';
import heroBg from '@/assets/images/hero/promo-hero.svg';
import styles from './PromoHero.module.css';

export default function PromoHero() {
  return (
    <HeroBase image={heroBg} height="921px">
      <h1 className={styles.title}>Oportunidades de Legado</h1>
      <p className={styles.subtitle}>Una seleccion curada de piezas atemporales con condiciones exclusivas para nuestra comunidad internacional.</p>
      <button className={styles.btn}>Descubrir Seleccion</button>
    </HeroBase>
  );
}
