import HeroBase from '@/components/layout/HeroBase/HeroBase';
import heroBg from '@/assets/images/hero/catalog-hero.svg';
import styles from './CatalogHero.module.css';

export default function CatalogHero() {
  return (
    <HeroBase image={heroBg} height="819px">
      <h1 className={styles.title}>Colecciones de Origen</h1>
      <p className={styles.subtitle}>Un tributo a la nobleza de las fibras andinas. Cada prenda es el resultado de siglos de sabiduria textil y el respeto absoluto por el ecosistema de las tierras altas.</p>
    </HeroBase>
  );
}
