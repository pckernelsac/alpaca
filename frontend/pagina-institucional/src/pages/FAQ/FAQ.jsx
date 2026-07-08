import Accordion from '@/components/feedback/Accordion/Accordion';
import FAQItem from '@/components/feedback/FAQItem/FAQItem';
import CTA from '@/components/common/CTA/CTA';
import FAQHero from './sections/FAQHero/FAQHero';
import FAQCategory from './sections/FAQCategory/FAQCategory';
import styles from './FAQ.module.css';

const categories = [
  {
    id: 'productos',
    title: 'Productos',
    items: [
      {
        q: 'Como elijo mi talla ideal?',
        a: 'Nuestras prendas estan disenadas para ofrecer una caida fluida y natural. Le recomendamos consultar nuestra guia de tallas detallada, la cual incluye medidas exactas en centimetros para cada silueta. Si prefiere un ajuste mas holgado u "oversized", sugerimos seleccionar una talla superior a su habitual.',
      },
      {
        q: 'Sus colecciones son de edicion limitada?',
        a: 'Si, trabajamos bajo un modelo de produccion consciente. Debido a la naturaleza artesanal de nuestro proceso y la exclusividad de nuestras fibras de alpaca real, cada pieza se produce en cantidades limitadas para garantizar la maxima calidad y trazabilidad.',
      },
    ],
  },
  {
    id: 'materiales',
    title: 'Materiales & Cuidado',
    items: [
      {
        q: 'Cual es la diferencia entre Alpaca y Baby Alpaca?',
        a: 'La denominacion "Baby Alpaca" no se refiere a la edad del animal, sino a la finura de la fibra. Es la primera esquila de la vida de la alpaca o fibras seleccionadas por su excepcional delgadez (entre 19 y 22 micras), lo que resulta en una suavidad similar a la seda y el cachemira.',
      },
      {
        q: 'Como debo lavar mi prenda Alpacart?',
        a: 'Para preservar la integridad de la fibra, recomendamos exclusivamente el lavado a mano con agua fria y jabon neutro, o limpieza en seco profesional. Nunca use secadora; extienda la prenda horizontalmente sobre una superficie plana para secar al aire, evitando la luz solar directa.',
      },
    ],
  },
  {
    id: 'envios',
    title: 'Envios & Rastreo',
    items: [
      {
        q: 'Realizan envios internacionales?',
        a: 'Absolutamente. ALPACART realiza envios a mas de 50 paises a traves de nuestros socios logisticos premium. Los tiempos de entrega varian segun el destino, oscilando generalmente entre 5 y 12 dias habiles para destinos fuera de Sudamerica.',
      },
      {
        q: 'Como puedo rastrear mi pedido?',
        a: 'Una vez que su orden sea despachada, recibira un correo electronico de confirmacion con un numero de guia unico y un enlace directo al portal de seguimiento de nuestra transportadora de confianza.',
      },
    ],
  },
  {
    id: 'cambios',
    title: 'Cambios, Devoluciones & Garantias',
    items: [
      {
        q: 'Cual es su politica de devoluciones?',
        a: 'Aceptamos devoluciones dentro de los 30 dias posteriores a la recepcion, siempre que la prenda se encuentre en su estado original, sin usar y con todas las etiquetas intactas. El costo de envio del retorno es responsabilidad del cliente, a menos que el producto presente defectos de fabrica.',
      },
      {
        q: 'Que garantia ofrecen sus textiles?',
        a: 'Cada producto ALPACART cuenta con una garantia de 6 meses contra defectos de fabricacion o fallas en el tejido. Esta garantia no cubre el desgaste natural por el uso ni danos derivados de un cuidado o lavado inadecuado de la fibra.',
      },
    ],
  },
];

function CategorySection({ category }) {
  return (
    <div id={category.id} className={styles.category}>
      <h2 className={styles.catTitle}>{category.title}</h2>
      <Accordion>
        {category.items.map((item, i) => (
          <FAQItem key={i} index={i} title={item.q}>
            {item.a}
          </FAQItem>
        ))}
      </Accordion>
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <FAQHero />
      <FAQCategory />
      <section className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.content}>
            {categories.map((cat) => (
              <CategorySection key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>
      <div className={styles.ctaWrap}>
        <CTA
          title="Aun requiere asistencia personalizada?"
          description="Nuestro Servicio de Conciliacion esta a su disposicion para brindarle una experiencia de atencion tan excepcional como nuestras fibras."
          buttonText="CONTACTAR CONCILIACION"
          variant="dark"
        />
      </div>
    </>
  );
}
