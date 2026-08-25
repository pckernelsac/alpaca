import { Link, useParams } from 'react-router-dom';

import { Figura } from '../components/site/Figura';
import { PageHero } from '../components/site/PageHero';
import { Prose } from '../components/site/Prose';
import { ButtonLink } from '../components/ui/Button';
import { IconArrowRight } from '../components/ui/Icon';
import { EmptyState, LoadingBlock } from '../components/ui/Primitives';
import { useContent, usePosts } from '../hooks/useCms';
import { usePageTitle } from '../hooks/usePageTitle';
import { useReveal } from '../hooks/useReveal';
import { FOTOS } from '../lib/fotos';
import styles from './Diario.module.css';
import pagina from './Pagina.module.css';

/** Fecha larga en castellano; sin fecha no se muestra nada, no "Invalid Date". */
function fechaLarga(iso: string | null): string | null {
  if (!iso) return null;
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return null;
  return fecha.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function Diario() {
  usePageTitle('Diario');
  useReveal();

  const { data: notas, loading } = usePosts();

  return (
    <>
      <PageHero
        eyebrow="Diario"
        title="Historias del altiplano"
        lead="Lo que pasa en el taller, cómo se cuida una prenda y de dónde sale cada fibra."
        image={FOTOS.diario}
      />

      <section className={pagina.seccion}>
        <div className="container">
          {loading ? (
            <LoadingBlock label="Cargando el diario" />
          ) : notas.length === 0 ? (
            <EmptyState
              title="Todavía no hay notas publicadas"
              description="Suscribite al newsletter y te avisamos cuando salga la primera."
            />
          ) : (
            <div className={styles.notas}>
              {notas.map((nota) => {
                const fecha = fechaLarga(nota.publishedAt);
                return (
                  <article key={nota.id} className={styles.nota} data-reveal>
                    <Link to={`/diario/${nota.slug}`} className={styles.notaMedia}>
                      <Figura src={nota.image} alt={nota.title} className={styles.notaImg} />
                    </Link>

                    <div>
                      {fecha && <time className={styles.notaFecha}>{fecha}</time>}
                      <h2 className={`display ${styles.notaTitulo}`}>
                        <Link to={`/diario/${nota.slug}`}>{nota.title}</Link>
                      </h2>
                      <Link to={`/diario/${nota.slug}`} className={styles.notaEnlace}>
                        Leer la nota
                        <IconArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function DiarioNota() {
  const { slug = '' } = useParams();
  const { data: nota, loading, error } = useContent(slug);

  usePageTitle(nota?.title);
  useReveal();

  if (loading) {
    return (
      <div className={`container ${pagina.estado}`}>
        <LoadingBlock label="Cargando la nota" />
      </div>
    );
  }

  if (error || !nota) {
    return (
      <div className={`container ${pagina.estado}`}>
        <EmptyState
          title="No encontramos esta nota"
          description="Puede que haya cambiado de dirección o que ya no esté publicada."
          actions={<ButtonLink to="/diario">Volver al diario</ButtonLink>}
        />
      </div>
    );
  }

  const fecha = fechaLarga(nota.publishedAt);

  return (
    <article className={pagina.seccion}>
      <div className="container-narrow">
        <p className="eyebrow">Diario</p>
        <h1 className={`display ${styles.detalleTitulo}`}>{nota.title}</h1>
        {fecha && <time className={styles.notaFecha}>{fecha}</time>}

        {nota.image && (
          <Figura src={nota.image} alt={nota.title} className={styles.detalleFoto} loading="eager" />
        )}

        <Prose body={nota.body} className={styles.detalleCuerpo} />

        <Link to="/diario" className={styles.volver}>
          Volver al diario
        </Link>
      </div>
    </article>
  );
}
