import { PageHero } from '../components/site/PageHero';
import { ButtonLink } from '../components/ui/Button';
import { IconChevronDown } from '../components/ui/Icon';
import { Alert, EmptyState, LoadingBlock } from '../components/ui/Primitives';
import { useFaq } from '../hooks/useCms';
import { usePageTitle } from '../hooks/usePageTitle';
import { useReveal } from '../hooks/useReveal';
import { EMPRESA } from '../lib/empresa';
import pagina from './Pagina.module.css';
import styles from './Preguntas.module.css';

export function Preguntas() {
  usePageTitle('Preguntas frecuentes');
  useReveal();

  const { data: categorias, loading, error } = useFaq();

  return (
    <>
      <PageHero
        eyebrow="Ayuda"
        title="Preguntas frecuentes"
        lead="Envíos, cuidado de la fibra, pagos y devoluciones. Si falta la tuya, escribinos."
      >
        <ButtonLink to="/contacto" variant="secondary">
          Hacer una consulta
        </ButtonLink>
      </PageHero>

      <section className={pagina.seccion}>
        <div className="container">
          {error && <Alert tone="danger">{error}</Alert>}

          {loading ? (
            <LoadingBlock label="Cargando preguntas" />
          ) : categorias.length === 0 ? (
            <EmptyState
              title="Todavía no hay preguntas cargadas"
              description={`Escribinos a ${EMPRESA.correo} y te respondemos.`}
            />
          ) : (
            <div className={styles.grilla}>
              {/* El índice queda fijo al costado: con cuatro bloques largos, volver
                  arriba para cambiar de tema es el movimiento más repetido. */}
              <nav className={styles.indice} aria-label="Temas">
                {categorias.map((categoria) => (
                  <a key={categoria.id} href={`#${categoria.slug}`} className={styles.indiceEnlace}>
                    {categoria.name}
                    <span className={styles.indiceCuenta}>{categoria.items.length}</span>
                  </a>
                ))}
              </nav>

              <div className={styles.bloques}>
                {categorias.map((categoria) => (
                  <section key={categoria.id} id={categoria.slug} data-reveal>
                    <h2 className={`display ${styles.categoria}`}>{categoria.name}</h2>

                    <div className={styles.preguntas}>
                      {categoria.items.map((item) => (
                        <details key={item.id} className={styles.pregunta}>
                          <summary className={styles.enunciado}>
                            {item.question}
                            <IconChevronDown size={18} className={styles.flecha} />
                          </summary>
                          <p className={styles.respuesta}>{item.answer}</p>
                        </details>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
