import { Figura } from '../components/site/Figura';
import { iconoDe } from '../components/site/iconos';
import { PageHero } from '../components/site/PageHero';
import { SectionHeading } from '../components/site/SectionHeading';
import { ButtonLink } from '../components/ui/Button';
import { Alert, LoadingBlock } from '../components/ui/Primitives';
import { useGallery, useProcesses } from '../hooks/useCms';
import { usePageTitle } from '../hooks/usePageTitle';
import { useReveal } from '../hooks/useReveal';
import pagina from './Pagina.module.css';
import styles from './Proceso.module.css';

export function Proceso() {
  usePageTitle('El proceso');
  useReveal();

  const { data: pasos, loading, error } = useProcesses();
  const { data: taller } = useGallery('taller');

  return (
    <>
      {/* Sin fotografía: la única foto de taller que hay en el CMS está caída y
          poner cualquier otra sería ilustrar el oficio con algo que no lo es. */}
      <PageHero
        eyebrow="El oficio"
        title="De la montaña al telar"
        lead="Ocho etapas entre la esquila y el empaque. Ninguna se apura y ninguna sale del país."
      />

      <section className={pagina.seccion}>
        <div className="container">
          {error && (
            <Alert tone="danger" className={pagina.estado}>
              {error}
            </Alert>
          )}

          {loading ? (
            <LoadingBlock label="Cargando el proceso" />
          ) : (
            <ol className={styles.linea}>
              {pasos.map((paso) => {
                const Icono = iconoDe(paso.icon);
                return (
                  <li key={paso.id} className={styles.paso} data-reveal>
                    <div className={styles.marca}>
                      <span className={styles.numero}>
                        {String(paso.stepOrder).padStart(2, '0')}
                      </span>
                      <span className={styles.punto} aria-hidden="true" />
                    </div>

                    <div className={styles.contenido}>
                      <Icono size={30} className={styles.icono} />
                      <h2 className={styles.titulo}>{paso.title}</h2>
                      {paso.description && <p className={styles.texto}>{paso.description}</p>}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>

      {taller.length > 0 && (
        <section className={`${pagina.seccion} ${pagina.suave}`}>
          <div className="container">
            <SectionHeading eyebrow="En el taller" title="Las manos que lo hacen" />

            <div className={pagina.tarjetas}>
              {taller.map((imagen) => (
                <figure key={imagen.id} data-reveal>
                  <Figura
                    src={imagen.url}
                    alt={imagen.altText ?? imagen.caption ?? 'Taller de Alpacart'}
                    className={pagina.tarjetaFoto}
                  />
                  {imagen.caption && (
                    <figcaption className={pagina.tarjetaTexto}>{imagen.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`${pagina.seccion} ${pagina.oscuro}`}>
        <div className="container">
          <SectionHeading
            eyebrow="Lo que sigue"
            title="La fibra también es una decisión"
            description="Alpaca, vicuña o lana cambian el abrigo, la caída y el precio de la pieza."
            actions={
              <ButtonLink to="/colecciones#fibras" variant="gold">
                Comparar las fibras
              </ButtonLink>
            }
          />
        </div>
      </section>
    </>
  );
}
