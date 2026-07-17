import { useEffect } from 'react';
import SEO from '@/components/seo/SEO';
import Accordion from '@/components/feedback/Accordion/Accordion';
import FAQItem from '@/components/feedback/FAQItem/FAQItem';
import CTA from '@/components/common/CTA/CTA';
import FAQHero from './sections/FAQHero/FAQHero';
import { useFaq } from '@/hooks';
import styles from './FAQ.module.css';

function CategorySection({ category }) {
  return (
    <div id={category.slug} className={styles.category}>
      <h2 className={styles.catTitle}>{category.name}</h2>
      <Accordion>
        {category.items.map((item, i) => (
          <FAQItem key={item.id || i} index={i} title={item.question}>
            {item.answer}
          </FAQItem>
        ))}
      </Accordion>
    </div>
  );
}

export default function FAQ() {
  const { categories, fetch } = useFaq();

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <><SEO title="Preguntas Frecuentes" />
      <FAQHero />
      <section className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.content}>
            {categories.map((cat) => (
              <CategorySection key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>
      <div className={styles.ctaWrap}>
        <CTA
          title="Aun requiere asistencia personalizada?"
          description="Nuestro Servicio de Conciliacion esta a su disposicion para brindarle una experiencia de atencion tan excepcional como nuestras fibras."
          buttonText="CONTACTAR CONCILIACION"
          variant="dark"
        />
      </div>
    </>
  );
}
