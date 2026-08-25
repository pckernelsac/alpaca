import { PageHero } from '../components/site/PageHero';
import { Prose } from '../components/site/Prose';
import { ButtonLink } from '../components/ui/Button';
import { EmptyState, LoadingBlock } from '../components/ui/Primitives';
import { useContent } from '../hooks/useCms';
import { usePageTitle } from '../hooks/usePageTitle';
import { EMPRESA } from '../lib/empresa';
import pagina from './Pagina.module.css';

/**
 * Página de contenido editable.
 *
 * Términos, privacidad, envíos y devoluciones son el mismo componente con otro
 * slug: el texto lo escribe el equipo desde el panel y no tiene sentido
 * versionarlo en el código, donde cambiarlo exigiría un despliegue.
 */
export function Contenido({ slug, eyebrow = 'Legal' }: { slug: string; eyebrow?: string }) {
  const { data: contenido, loading, error } = useContent(slug);

  usePageTitle(contenido?.title);

  if (loading) {
    return (
      <div className={`container ${pagina.estado}`}>
        <LoadingBlock label="Cargando" />
      </div>
    );
  }

  if (error || !contenido) {
    return (
      <div className={`container ${pagina.estado}`}>
        <EmptyState
          title="No pudimos cargar esta página"
          description={`Si el problema sigue, escribinos a ${EMPRESA.correo}.`}
          actions={<ButtonLink to="/">Volver al inicio</ButtonLink>}
        />
      </div>
    );
  }

  return (
    <>
      <PageHero eyebrow={eyebrow} title={contenido.title} />

      <section className={pagina.seccion}>
        <div className="container">
          <Prose body={contenido.body} />
        </div>
      </section>
    </>
  );
}

export function NoEncontrada() {
  usePageTitle('Página no encontrada');

  return (
    <div className={`container ${pagina.estado}`}>
      <EmptyState
        title="Esta página no existe"
        description="Puede que el enlace esté viejo o que la dirección tenga un error."
        actions={
          <>
            <ButtonLink to="/">Volver al inicio</ButtonLink>
            <ButtonLink to="/contacto" variant="secondary">
              Escribirnos
            </ButtonLink>
          </>
        }
      />
    </div>
  );
}
