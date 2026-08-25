import { PageHero } from '../components/site/PageHero';
import { Prose } from '../components/site/Prose';
import { SectionHeading } from '../components/site/SectionHeading';
import { IconDrop, IconHeartHands, IconLeaf, IconPackage, IconScissors } from '../components/ui/Icon';
import { LoadingBlock } from '../components/ui/Primitives';
import { useContent } from '../hooks/useCms';
import { usePageTitle } from '../hooks/usePageTitle';
import { useReveal } from '../hooks/useReveal';
import { EMPRESA } from '../lib/empresa';
import pagina from './Pagina.module.css';

const COMPROMISOS = [
  {
    icono: IconScissors,
    titulo: 'Esquila anual y no invasiva',
    texto:
      'La fibra se obtiene una vez al año, con el animal en pie y sin sedación. En la vicuña el chaccu se hace con la comunidad y bajo registro, como manda la norma.',
  },
  {
    icono: IconDrop,
    titulo: 'Agua filtrada y reutilizada',
    texto:
      'El lavado usa jabón neutro y agua de manantial; la que sale se filtra y vuelve al circuito en vez de ir al río.',
  },
  {
    icono: IconLeaf,
    titulo: 'Tintes vegetales y minerales',
    texto:
      'Cochinilla, nogal, molle y tierras del altiplano. Los tonos naturales de la fibra —marfil, camel, gris piedra— no se tiñen: ya vienen así.',
  },
  {
    icono: IconPackage,
    titulo: 'Empaque sin plástico',
    texto:
      'Cajas de cartón reciclado, cintas de algodón y etiquetas impresas con tinta de soja. Nada de poliburbuja ni celofán.',
  },
  {
    icono: IconHeartHands,
    titulo: 'Comercio justo verificado',
    texto: `Contratos por temporada completa con ${EMPRESA.familias} familias de tejedores, a precio acordado antes de empezar.`,
  },
];

export function Sostenibilidad() {
  usePageTitle('Sostenibilidad');
  useReveal();

  const { data: contenido, loading } = useContent('sostenibilidad');

  return (
    <>
      <PageHero
        eyebrow="Sostenibilidad"
        title="Lo caro es hacerlo mal"
        lead="Una prenda de alpaca dura décadas. Todo el resto de la cadena debería estar a la altura de eso."
      />

      <section className={pagina.seccion}>
        <div className="container">
          {loading ? <LoadingBlock label="Cargando" /> : <Prose body={contenido?.body} />}
        </div>
      </section>

      <section className={`${pagina.seccion} ${pagina.suave}`}>
        <div className="container">
          <SectionHeading eyebrow="En concreto" title="Cinco compromisos con nombre propio" />

          <div className={pagina.tarjetas}>
            {COMPROMISOS.map((compromiso) => {
              const Icono = compromiso.icono;
              return (
                <article key={compromiso.titulo} className={pagina.tarjeta} data-reveal>
                  <Icono size={28} className={pagina.tarjetaIcono} />
                  <h3 className={pagina.tarjetaTitulo}>{compromiso.titulo}</h3>
                  <p className={pagina.tarjetaTexto}>{compromiso.texto}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={pagina.seccion}>
        <div className="container">
          <dl className={pagina.cifras} data-reveal>
            <div>
              <dt>{EMPRESA.familias}</dt>
              <dd>familias con contrato de comercio justo</dd>
            </div>
            <div>
              <dt>1×</dt>
              <dd>esquila por año y por animal</dd>
            </div>
            <div>
              <dt>0</dt>
              <dd>plástico en el empaque</dd>
            </div>
            <div>
              <dt>100%</dt>
              <dd>de la cadena dentro del Perú</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
