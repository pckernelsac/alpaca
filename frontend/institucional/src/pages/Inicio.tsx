import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Figura } from '../components/site/Figura';
import { iconoDe } from '../components/site/iconos';
import { PiezaCard } from '../components/site/PiezaCard';
import { SectionHeading } from '../components/site/SectionHeading';
import { ButtonLink } from '../components/ui/Button';
import { IconArrowRight, IconQuote } from '../components/ui/Icon';
import { Rating, Skeleton } from '../components/ui/Primitives';
import {
  useBenefits,
  useCollections,
  useGallery,
  useHero,
  useProcesses,
  useShowcase,
  useTestimonials,
} from '../hooks/useCms';
import { usePageTitle } from '../hooks/usePageTitle';
import { useReveal } from '../hooks/useReveal';
import { TIENDA_URL } from '../lib/api';
import { EMPRESA } from '../lib/empresa';
import styles from './Inicio.module.css';

const INTERVALO = 7000;

/** Los enlaces del hero apuntan a rutas de la tienda (`/tienda?...`). */
function enlaceTienda(link: string | null): string {
  if (!link) return TIENDA_URL;
  return link.startsWith('http') ? link : `${TIENDA_URL}${link}`;
}

function Hero() {
  const { data: slides, loading } = useHero();
  const [actual, setActual] = useState(0);

  // El carrusel avanza solo mientras haya más de un slide. El temporizador se
  // reinicia al cambiar de slide a mano: si no, el salto siguiente llegaría
  // recortado y se sentiría un tirón.
  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setTimeout(() => setActual((i) => (i + 1) % slides.length), INTERVALO);
    return () => clearTimeout(timer);
  }, [actual, slides.length]);

  if (loading) return <div className={styles.heroSkeleton} />;
  if (slides.length === 0) return null;

  const slide = slides[Math.min(actual, slides.length - 1)];

  return (
    <section className={styles.hero} aria-roledescription="carrusel" aria-label="Destacados">
      {slides.map((item, indice) => (
        <div
          key={item.id}
          className={`${styles.heroMedia} ${indice === actual ? styles.heroMediaActive : ''}`}
          aria-hidden="true"
        >
          <Figura
            src={item.image}
            alt=""
            loading={indice === 0 ? 'eager' : 'lazy'}
            className={styles.heroImage}
          />
        </div>
      ))}
      <span className={styles.heroScrim} aria-hidden="true" />

      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy} key={slide.id}>
          <p className={styles.heroEyebrow}>Alpacart Textiles · desde {EMPRESA.desde}</p>
          <h1 className={`display ${styles.heroTitle}`}>{slide.title}</h1>
          {slide.subtitle && <p className={styles.heroLead}>{slide.subtitle}</p>}

          <div className={styles.heroActions}>
            <a className={styles.heroCta} href={enlaceTienda(slide.ctaLink)}>
              {slide.ctaText ?? 'Ver la colección'}
              <IconArrowRight size={18} />
            </a>
            <Link className={styles.heroLink} to="/proceso">
              Cómo se hace
            </Link>
          </div>
        </div>

        {slides.length > 1 && (
          <div className={styles.dots}>
            {slides.map((item, indice) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.dot} ${indice === actual ? styles.dotActive : ''}`}
                onClick={() => setActual(indice)}
                aria-label={`Ver ${item.title}`}
                aria-current={indice === actual}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Beneficios() {
  const { data: beneficios } = useBenefits();
  if (beneficios.length === 0) return null;

  return (
    <section className={styles.beneficios} aria-label="Lo que incluye cada compra">
      <div className="container">
        <ul className={styles.beneficiosLista}>
          {beneficios.map((beneficio) => {
            const Icono = iconoDe(beneficio.icon);
            return (
              <li key={beneficio.id} className={styles.beneficio}>
                <Icono size={26} className={styles.beneficioIcono} />
                <div>
                  <h3 className={styles.beneficioTitulo}>{beneficio.title}</h3>
                  {beneficio.description && (
                    <p className={styles.beneficioTexto}>{beneficio.description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Manifiesto() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.manifiesto} data-reveal>
          <div>
            <p className="eyebrow">La casa</p>
            <h2 className={`display ${styles.manifiestoTitulo}`}>
              Del vellón al telar, sin intermediarios que diluyan el oficio
            </h2>
          </div>
          <div className={styles.manifiestoTexto}>
            <p>
              Compramos la fibra en el altiplano, la clasificamos a mano y la tejemos en talleres
              propios en {EMPRESA.talleres.join(', ')}. Ninguna etapa se terceriza fuera del país.
            </p>
            <p>
              Son {EMPRESA.familias} familias de tejedores trabajando bajo contratos de comercio
              justo, con esquila anual y no invasiva.
            </p>
            <ButtonLink to="/nosotros" variant="secondary">
              Conocer la casa
            </ButtonLink>
          </div>
        </div>

        <dl className={styles.cifras} data-reveal>
          <div>
            <dt>{new Date().getFullYear() - EMPRESA.desde} años</dt>
            <dd>tejiendo desde Arequipa</dd>
          </div>
          <div>
            <dt>{EMPRESA.familias}</dt>
            <dd>familias de tejedores</dd>
          </div>
          <div>
            <dt>{EMPRESA.talleres.length}</dt>
            <dd>talleres propios en los Andes</dd>
          </div>
          {/* La cifra va sola: Cormorant no trae la «µ» y el glifo cae en una
              tipografía prestada que desentona con el resto de la fila. */}
          <div>
            <dt>12</dt>
            <dd>micrones de la vicuña, la fibra más fina del mundo</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Colecciones() {
  const { data: colecciones } = useCollections();
  if (colecciones.length === 0) return null;

  return (
    <section className={`section ${styles.fondoSuave}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Colecciones"
          title="Cada temporada, una historia del altiplano"
          description="Las piezas se agrupan por el origen de la fibra y por el momento del año en que se tejen."
          actions={
            <ButtonLink to="/colecciones" variant="ghost">
              Ver todas
            </ButtonLink>
          }
        />

        <div className={styles.coleccionesGrid}>
          {colecciones.slice(0, 4).map((coleccion) => (
            <a
              key={coleccion.id}
              className={styles.coleccion}
              href={`${TIENDA_URL}/tienda?collection_id=${coleccion.id}`}
              data-reveal
            >
              <Figura src={coleccion.image} alt={coleccion.name} className={styles.coleccionImg} />
              <div className={styles.coleccionCapa}>
                <h3 className={`display ${styles.coleccionTitulo}`}>{coleccion.name}</h3>
                {coleccion.piece_count !== null && (
                  <p className={styles.coleccionPiezas}>{coleccion.piece_count} piezas</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vitrina() {
  const { data: piezas, loading } = useShowcase(6);

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Vitrina"
          title="Piezas recién salidas del telar"
          actions={
            <a className={styles.enlaceTienda} href={`${TIENDA_URL}/tienda`}>
              Ir a la tienda
              <IconArrowRight size={16} />
            </a>
          }
        />

        <div className={styles.vitrina}>
          {loading
            ? Array.from({ length: 6 }).map((_, indice) => (
                <Skeleton key={indice} className={styles.vitrinaSkeleton} />
              ))
            : piezas.map((pieza) => (
                <div key={pieza.id} data-reveal>
                  <PiezaCard pieza={pieza} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

function Proceso() {
  const { data: pasos } = useProcesses();
  if (pasos.length === 0) return null;

  return (
    <section className={`section ${styles.fondoOscuro}`}>
      <div className="container">
        <SectionHeading
          eyebrow="El oficio"
          title="Ocho pasos entre la montaña y tu casa"
          description="Ninguno se apura y ninguno se terceriza."
          actions={
            <ButtonLink to="/proceso" variant="gold">
              Ver el proceso completo
            </ButtonLink>
          }
        />

        <ol className={styles.pasos}>
          {pasos.slice(0, 4).map((paso) => {
            const Icono = iconoDe(paso.icon);
            return (
              <li key={paso.id} className={styles.paso} data-reveal>
                <span className={styles.pasoNumero}>{String(paso.stepOrder).padStart(2, '0')}</span>
                <Icono size={28} className={styles.pasoIcono} />
                <h3 className={styles.pasoTitulo}>{paso.title}</h3>
                {paso.description && <p className={styles.pasoTexto}>{paso.description}</p>}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Galeria() {
  const { data: imagenes } = useGallery();
  if (imagenes.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="El taller" title="Lo que pasa cuando nadie mira" align="center" />

        <div className={styles.galeria}>
          {imagenes.slice(0, 5).map((imagen) => (
            <figure key={imagen.id} className={styles.galeriaItem} data-reveal>
              <Figura
                src={imagen.url}
                alt={imagen.altText ?? imagen.caption ?? 'Taller de Alpacart'}
                className={styles.galeriaImg}
              />
              {imagen.caption && <figcaption>{imagen.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonios() {
  const { data: testimonios } = useTestimonials();
  if (testimonios.length === 0) return null;

  return (
    <section className={`section ${styles.fondoSuave}`}>
      <div className="container">
        <SectionHeading eyebrow="Quienes ya las usan" title="Lo que dicen de las piezas" />

        <div className={styles.testimonios}>
          {testimonios.slice(0, 3).map((testimonio) => (
            <blockquote key={testimonio.id} className={styles.testimonio} data-reveal>
              <IconQuote size={36} className={styles.comilla} />
              <p className={styles.testimonioTexto}>{testimonio.text}</p>
              <footer>
                {testimonio.rating !== null && (
                  <Rating value={testimonio.rating} className={styles.testimonioEstrellas} />
                )}
                <cite className={styles.testimonioAutor}>{testimonio.author}</cite>
                <span className={styles.testimonioRol}>
                  {[testimonio.role, testimonio.company].filter(Boolean).join(' · ')}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Inicio() {
  usePageTitle();
  useReveal();

  return (
    <>
      <Hero />
      <Beneficios />
      <Manifiesto />
      <Colecciones />
      <Vitrina />
      <Proceso />
      <Galeria />
      <Testimonios />
    </>
  );
}
