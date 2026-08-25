import { Figura } from '../components/site/Figura';
import { PageHero } from '../components/site/PageHero';
import { Prose } from '../components/site/Prose';
import { SectionHeading } from '../components/site/SectionHeading';
import { ButtonLink } from '../components/ui/Button';
import { IconHeartHands, IconLeaf, IconVerified } from '../components/ui/Icon';
import { LoadingBlock } from '../components/ui/Primitives';
import { useContent, useGallery } from '../hooks/useCms';
import { usePageTitle } from '../hooks/usePageTitle';
import { useReveal } from '../hooks/useReveal';
import { EMPRESA } from '../lib/empresa';
import styles from './Pagina.module.css';

const PRINCIPIOS = [
  {
    icono: IconHeartHands,
    titulo: 'Precio justo, primero',
    texto:
      'Pagamos el vellón por encima del precio de mercado y firmamos por temporada completa, no por entrega. El tejedor sabe cuánto va a cobrar antes de empezar.',
  },
  {
    icono: IconVerified,
    titulo: 'Trazabilidad de origen',
    texto:
      'Cada pieza indica de qué taller salió y con qué fibra se tejió. La vicuña, además, lleva el registro de esquila que exige la norma peruana.',
  },
  {
    icono: IconLeaf,
    titulo: 'Nada se terceriza fuera',
    texto:
      'Del altiplano al empaque, toda la cadena ocurre en el Perú. Es más lento y cuesta más, y es exactamente el punto.',
  },
];

export function Nosotros() {
  usePageTitle('Nosotros');
  useReveal();

  const { data: contenido, loading } = useContent('nosotros');
  const { data: galeria } = useGallery();

  return (
    <>
      <PageHero
        eyebrow="La casa"
        title="Tejemos donde crece la fibra"
        lead={`Alpacart nació en ${EMPRESA.desde} en ${EMPRESA.ciudad.split(',')[0]} con una idea simple: que la alpaca peruana llegue al mundo sin que el camino le quite ni precio al artesano ni calidad a quien la compra.`}
      />

      <section className={styles.seccion}>
        <div className="container">
          <div className={styles.dosColumnas}>
            {loading ? (
              <LoadingBlock label="Cargando la historia" />
            ) : (
              <Prose body={contenido?.body} />
            )}

            <dl className={styles.apuntes}>
              <div className={styles.apunte}>
                <dt>Casa matriz</dt>
                <dd>{EMPRESA.ciudad}</dd>
              </div>
              <div className={styles.apunte}>
                <dt>Talleres propios</dt>
                <dd>{EMPRESA.talleres.join(' · ')}</dd>
              </div>
              <div className={styles.apunte}>
                <dt>Familias tejedoras</dt>
                <dd>{EMPRESA.familias}</dd>
              </div>
              <div className={styles.apunte}>
                <dt>Desde</dt>
                <dd>{EMPRESA.desde}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className={`${styles.seccion} ${styles.suave}`}>
        <div className="container">
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Tres compromisos que no se negocian"
          />

          <div className={styles.tarjetas}>
            {PRINCIPIOS.map((principio) => {
              const Icono = principio.icono;
              return (
                <article key={principio.titulo} className={styles.tarjeta} data-reveal>
                  <Icono size={28} className={styles.tarjetaIcono} />
                  <h3 className={styles.tarjetaTitulo}>{principio.titulo}</h3>
                  <p className={styles.tarjetaTexto}>{principio.texto}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {galeria.length > 0 && (
        <section className={styles.seccion}>
          <div className="container">
            <SectionHeading
              eyebrow="El taller"
              title="Los lugares donde ocurre"
              actions={<ButtonLink to="/proceso" variant="ghost">Ver el proceso</ButtonLink>}
            />

            <div className={styles.tarjetas}>
              {galeria.map((imagen) => (
                <figure key={imagen.id} data-reveal>
                  <Figura
                    src={imagen.url}
                    alt={imagen.altText ?? imagen.caption ?? 'Taller de Alpacart'}
                    className={styles.tarjetaFoto}
                  />
                  {imagen.caption && (
                    <figcaption className={styles.tarjetaTexto}>{imagen.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
