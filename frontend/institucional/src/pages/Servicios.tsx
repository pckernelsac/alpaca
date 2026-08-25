import { PageHero } from '../components/site/PageHero';
import { SectionHeading } from '../components/site/SectionHeading';
import { ButtonLink } from '../components/ui/Button';
import {
  IconChat,
  IconHand,
  IconPackage,
  IconThread,
  IconTruck,
  IconVerified,
} from '../components/ui/Icon';
import { usePageTitle } from '../hooks/usePageTitle';
import { useReveal } from '../hooks/useReveal';
import { EMPRESA } from '../lib/empresa';
import pagina from './Pagina.module.css';
import styles from './Servicios.module.css';

const SERVICIOS = [
  {
    icono: IconChat,
    titulo: 'Asesoría personalizada',
    texto:
      'Te decimos qué fibra conviene según el clima donde vas a usar la prenda, y qué talla pedir cuando estás entre dos.',
  },
  {
    icono: IconTruck,
    titulo: 'Envíos a todo el mundo',
    texto:
      'DHL Express con seguimiento incluido. Lima en 1 o 2 días hábiles, provincias en 3 a 5, internacional entre 7 y 14.',
  },
  {
    icono: IconPackage,
    titulo: 'Empaque de regalo',
    texto:
      'Caja de cartón reciclado, cinta de algodón y tarjeta escrita a mano si nos pasás el mensaje. Sin plástico y sin costo.',
  },
  {
    icono: IconVerified,
    titulo: 'Garantía de la pieza',
    texto:
      'Revisión pieza por pieza antes del despacho. Si algo llega con una falla de tejido, la reponemos.',
  },
];

const MAYORISTAS = [
  {
    icono: IconThread,
    titulo: 'Venta mayorista',
    texto:
      'Precios por volumen desde 20 piezas, con ficha técnica de fibra y micronaje para cada modelo.',
  },
  {
    icono: IconHand,
    titulo: 'Producción a medida',
    texto:
      'Desarrollamos tu diseño en nuestros talleres: color, punto y etiqueta propios. El mínimo depende de la fibra.',
  },
];

export function Servicios() {
  usePageTitle('Servicios');
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Lo que hacemos además de tejer"
        lead="Para quien compra una pieza y para quien compra doscientas."
      />

      <section className={pagina.seccion}>
        <div className="container">
          <SectionHeading eyebrow="Para vos" title="Con cada compra" />

          <div className={pagina.tarjetas}>
            {SERVICIOS.map((servicio) => {
              const Icono = servicio.icono;
              return (
                <article key={servicio.titulo} className={pagina.tarjeta} data-reveal>
                  <Icono size={28} className={pagina.tarjetaIcono} />
                  <h3 className={pagina.tarjetaTitulo}>{servicio.titulo}</h3>
                  <p className={pagina.tarjetaTexto}>{servicio.texto}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${pagina.seccion} ${pagina.suave}`}>
        <div className="container">
          <SectionHeading
            eyebrow="Para tu marca"
            title="Mayoreo y producción a medida"
            description="Trabajamos con tiendas, hoteles y marcas que quieren fibra peruana con trazabilidad."
          />

          <div className={pagina.tarjetas}>
            {MAYORISTAS.map((servicio) => {
              const Icono = servicio.icono;
              return (
                <article key={servicio.titulo} className={pagina.tarjeta} data-reveal>
                  <Icono size={28} className={pagina.tarjetaIcono} />
                  <h3 className={pagina.tarjetaTitulo}>{servicio.titulo}</h3>
                  <p className={pagina.tarjetaTexto}>{servicio.texto}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${pagina.seccion} ${pagina.oscuro}`}>
        <div className="container">
          <div className={styles.cierre} data-reveal>
            <div>
              <p className="eyebrow">Hablemos</p>
              <h2 className={`display ${styles.cierreTitulo}`}>
                Contanos qué necesitás y armamos la propuesta
              </h2>
              <p className={styles.cierreTexto}>
                Respondemos {EMPRESA.horario.toLowerCase()} desde {EMPRESA.ciudad}.
              </p>
            </div>
            <ButtonLink to="/contacto" variant="gold" size="lg">
              Escribirnos
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
