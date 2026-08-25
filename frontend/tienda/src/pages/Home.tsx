import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ProductCard, ProductCardSkeleton } from '../components/shop/ProductCard';
import { ButtonLink } from '../components/ui/Button';
import {
  IconHand,
  IconHeartHands,
  IconLeaf,
  IconSwap,
  IconTruck,
} from '../components/ui/Icon';
import { Rating } from '../components/ui/Primitives';
import { useCollections, useProducts } from '../hooks/useCatalog';
import { useCms } from '../hooks/useCms';
import { usePageTitle } from '../hooks/usePageTitle';
import styles from './Home.module.css';

const BENEFIT_ICONS: Record<string, typeof IconTruck> = {
  local_shipping: IconTruck,
  swap_horiz: IconSwap,
  handyman: IconHand,
  volunteer_activism: IconHeartHands,
  eco: IconLeaf,
};

const PROCESS_STEPS = [
  { number: '01', title: 'Esquila responsable', text: 'Una vez al año, sin dañar al animal.' },
  { number: '02', title: 'Clasificación manual', text: 'Cada vellón se separa por finura y color.' },
  { number: '03', title: 'Teñido natural', text: 'Pigmentos de plantas y minerales andinos.' },
  { number: '04', title: 'Tejido a mano', text: 'Técnicas heredadas por generaciones.' },
];

export function Home() {
  usePageTitle('Lujo ancestral, diseño contemporáneo');

  const { hero, benefits, testimonials } = useCms();
  const { products, loading } = useProducts({ limit: 8, sort: 'recent' });
  const { collections } = useCollections();

  const [slide, setSlide] = useState(0);

  // Rotación del hero. Se detiene si el usuario prefiere menos movimiento.
  useEffect(() => {
    if (hero.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setInterval(() => {
      setSlide((current) => (current + 1) % hero.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [hero.length]);

  const current = hero[slide];

  return (
    <>
      <section className={styles.hero}>
        {current?.image && (
          <div className={styles.heroMedia}>
            <img
              key={current.id}
              src={current.image}
              alt=""
              className={styles.heroImage}
              fetchPriority="high"
            />
            <div className={styles.heroScrim} />
          </div>
        )}

        <div className="container">
          <div className={styles.heroContent} key={current?.id ?? 'default'}>
            <p className={styles.heroEyebrow}>Colección Otoño-Invierno</p>
            <h1 className={styles.heroTitle}>
              {current?.title ?? 'Lujo ancestral, diseño contemporáneo'}
            </h1>
            <p className={styles.heroText}>
              {current?.subtitle ??
                'Fibra de alpaca peruana tejida a mano por artesanos de los Andes.'}
            </p>
            <div className={styles.heroActions}>
              <ButtonLink
                to={current?.ctaLink ?? '/tienda'}
                size="lg"
                className={styles.heroLight}
              >
                {current?.ctaText ?? 'Explorar colección'}
              </ButtonLink>
              <ButtonLink
                to="/nosotros"
                size="lg"
                variant="secondary"
                className={styles.heroOutline}
              >
                Nuestra historia
              </ButtonLink>
            </div>
          </div>
        </div>

        {hero.length > 1 && (
          <div className={styles.heroDots}>
            {hero.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.dot} ${index === slide ? styles.dotActive : ''}`}
                onClick={() => setSlide(index)}
                aria-label={`Ver ${item.title}`}
                aria-current={index === slide}
              />
            ))}
          </div>
        )}
      </section>

      {benefits.length > 0 && (
        <section className={styles.benefits}>
          <div className="container">
            <div className={styles.benefitGrid}>
              {benefits.map((benefit) => {
                const Icon = BENEFIT_ICONS[benefit.icon ?? ''] ?? IconLeaf;
                return (
                  <div key={benefit.id} className={styles.benefit}>
                    <Icon size={26} className={styles.benefitIcon} />
                    <div>
                      <p className={styles.benefitTitle}>{benefit.title}</p>
                      {benefit.description && (
                        <p className={styles.benefitText}>{benefit.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <h2 className={styles.sectionTitle}>Recién llegado</h2>
              <p className={styles.sectionSub}>
                Las últimas piezas que salieron del taller, en series cortas.
              </p>
            </div>
            <ButtonLink to="/tienda" variant="link">
              Ver todo el catálogo
            </ButtonLink>
          </div>

          <div className={styles.grid}>
            {loading
              ? Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
              : products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {collections.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <h2 className={styles.sectionTitle}>Colecciones</h2>
                <p className={styles.sectionSub}>
                  Cada colección nace de una temporada de esquila y una paleta propia.
                </p>
              </div>
            </div>

            <div className={styles.editorial}>
              {collections.slice(0, 3).map((collection) => (
                <Link
                  key={collection.id}
                  to={`/tienda?collection_id=${collection.id}`}
                  className={styles.editorialCard}
                >
                  {collection.image ? (
                    <img
                      src={collection.image}
                      alt=""
                      className={styles.editorialImage}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.editorialImage} />
                  )}
                  <div className={styles.editorialOverlay}>
                    {collection.piece_count && (
                      <span className={styles.editorialCount}>
                        {collection.piece_count} piezas
                      </span>
                    )}
                    <h3 className={styles.editorialName}>{collection.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.process}>
        <div className="container">
          <div className={styles.processInner}>
            <div className={styles.processCopy}>
              <h2>De la fibra a la prenda</h2>
              <p>
                Ocho etapas entre el altiplano y tu puerta. Ninguna se automatiza: cada una la hace
                una persona que aprendió el oficio de la anterior.
              </p>
              <ButtonLink to="/sostenibilidad" variant="secondary" className={styles.heroOutline}>
                Conocer el proceso
              </ButtonLink>
            </div>

            <div className={styles.processSteps}>
              {PROCESS_STEPS.map((step) => (
                <div key={step.number} className={styles.processStep}>
                  <span className={styles.processNumber}>{step.number}</span>
                  <p className={styles.processStepTitle}>{step.title}</p>
                  <p className={styles.processStepText}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <h2 className={styles.sectionTitle}>Lo que dicen</h2>
              </div>
            </div>

            <div className={styles.testimonials}>
              {testimonials.slice(0, 3).map((testimonial) => (
                <figure key={testimonial.id} className={styles.testimonial}>
                  {testimonial.rating && <Rating value={testimonial.rating} />}
                  <blockquote className={styles.testimonialText}>
                    «{testimonial.text}»
                  </blockquote>
                  <figcaption>
                    <p className={styles.testimonialAuthor}>{testimonial.author}</p>
                    <p className={styles.testimonialRole}>
                      {[testimonial.role, testimonial.company].filter(Boolean).join(' · ')}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
