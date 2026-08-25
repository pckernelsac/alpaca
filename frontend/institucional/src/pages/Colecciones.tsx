import { Figura } from '../components/site/Figura';
import { PageHero } from '../components/site/PageHero';
import { SectionHeading } from '../components/site/SectionHeading';
import { IconArrowRight } from '../components/ui/Icon';
import { Alert, LoadingBlock } from '../components/ui/Primitives';
import { useCollections, useMaterials } from '../hooks/useCms';
import { usePageTitle } from '../hooks/usePageTitle';
import { useReveal } from '../hooks/useReveal';
import { TIENDA_URL } from '../lib/api';
import { FOTOS } from '../lib/fotos';
import styles from './Colecciones.module.css';
import pagina from './Pagina.module.css';

/** El catálogo textil nombra las familias en clave; acá se leen en castellano. */
const FAMILIAS: Record<string, string> = {
  alpaca: 'Alpaca',
  vicuna: 'Vicuña',
  lana: 'Lana',
  algodon: 'Algodón',
};

export function Colecciones() {
  usePageTitle('Colecciones');
  useReveal();

  const { data: colecciones, loading, error } = useCollections();
  const { data: fibras } = useMaterials();

  return (
    <>
      <PageHero
        eyebrow="Colecciones"
        title="Lo que sale del telar cada temporada"
        lead="Agrupamos las piezas por el origen de la fibra y por el momento del año en que se tejen. Comprar es en la tienda; acá se mira."
        image={FOTOS.colecciones}
      />

      <section className={pagina.seccion}>
        <div className="container">
          {error && (
            <Alert tone="danger" className={pagina.estado}>
              {error}
            </Alert>
          )}

          {loading ? (
            <LoadingBlock label="Cargando colecciones" />
          ) : (
            <div className={styles.lista}>
              {colecciones.map((coleccion) => (
                <article key={coleccion.id} className={styles.item} data-reveal>
                  <a
                    className={styles.itemMedia}
                    href={`${TIENDA_URL}/catalogo?collection_id=${coleccion.id}`}
                  >
                    <Figura
                      src={coleccion.image}
                      alt={coleccion.name}
                      className={styles.itemImg}
                    />
                  </a>

                  <div className={styles.itemCopy}>
                    <p className={styles.itemCodigo}>{coleccion.id}</p>
                    <h2 className={`display ${styles.itemTitulo}`}>{coleccion.name}</h2>
                    {coleccion.description && (
                      <p className={styles.itemTexto}>{coleccion.description}</p>
                    )}
                    {coleccion.piece_count !== null && (
                      <p className={styles.itemPiezas}>{coleccion.piece_count} piezas</p>
                    )}
                    <a
                      className={styles.itemEnlace}
                      href={`${TIENDA_URL}/catalogo?collection_id=${coleccion.id}`}
                    >
                      Ver la colección en la tienda
                      <IconArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="fibras" className={`${pagina.seccion} ${pagina.suave} ${styles.anclaFibras}`}>
        <div className="container">
          <SectionHeading
            eyebrow="Nuestras fibras"
            title="Cuatro familias, seis finuras"
            description="El micronaje es lo que decide si una prenda pica o no: por debajo de 22 micrones la fibra no roza la piel."
          />

          <div className={styles.fibras}>
            {fibras.map((fibra) => (
              <article key={fibra.id} className={styles.fibra} data-reveal>
                <header className={styles.fibraCabecera}>
                  <h3 className={styles.fibraNombre}>{fibra.name}</h3>
                  {fibra.category && (
                    <span className={styles.fibraFamilia}>
                      {FAMILIAS[fibra.category] ?? fibra.category}
                    </span>
                  )}
                </header>

                <dl className={styles.fibraDatos}>
                  <div>
                    <dt>Finura</dt>
                    <dd>{fibra.micronRating && fibra.micronRating !== '-' ? `${fibra.micronRating} µm` : '—'}</dd>
                  </div>
                  <div>
                    <dt>Origen</dt>
                    <dd>{fibra.origin ?? '—'}</dd>
                  </div>
                  {fibra.certification && (
                    <div>
                      <dt>Certificación</dt>
                      <dd>{fibra.certification}</dd>
                    </div>
                  )}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
