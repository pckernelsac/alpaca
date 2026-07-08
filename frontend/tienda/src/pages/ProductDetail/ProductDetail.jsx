import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import ProductView from './sections/ProductView/ProductView';
import RelatedProducts from './sections/RelatedProducts/RelatedProducts';
import ProductReviews from './sections/ProductReviews/ProductReviews';
import styles from './ProductDetail.module.css';

const sampleProduct = {
  title: 'Abrigo Heritage',
  subtitle: '100% Vicuña — El Oro de los Andes',
  price: 8450,
  badge: 'Edición Limitada — Quedan 5 piezas',
  description: 'Tejido a mano en los Andes peruanos, este abrigo representa la cumbre del arte textil. La vicuña, antes reservada para la realeza inca, ofrece una ligereza y calidez que ninguna otra fibra natural puede igualar. Una inversión de por vida en elegancia serena y calidad ancestral.',
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBlnw-7sdF7x1Y8IHL2BJQoHeXwn4887s7BRZ9s07m2xvmhGUdXAZncCPMHitGJJQnyZThFisM-2TBSq23oVHvxNKfz-oDfbtBMyrYKsvwwegq6eQqKTsygoElm-wam3Ou3PoSRPAwiWkiPeo0c0kzV1EJ0hKKn5O2qBuMctnEJHasQvyCtD2K2AWse8WdtuTRgJ-W7oZu8lJgqA5gytIzilvx2FqTpphfIAzpw_7a73KPSnFPeK4DOhusup5sqGpZYbOflA4rUGNX3',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCIUUa_fLV7KfgmciUgwuoPIx4dlZ3hkg8ExLcszWhaeifnTi4sEvK3yy9JYW-7SP5l_oMKXMee6xZNQ4FRW1LhHwgeG7VPWtwgEyzRSktaPW0Tec-Y5i0dmdLAdQdWPMdKSSjwbbkbDXrXFYyfRA0X1HOah8lrKEFprA8WACf71XfRosLeR6hU0uWX8MotOw8-PX6CBf4Z7XRHwT5GlqQpJGEtxmx3rjNmYig8fUHKcfDcWYqWqQFjeofzqZOAL7KCl2CRWXgafx9f',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB6atifML8z3-nlHancofxIuyFx_7zW0IrxtZ9IIiBhAF8sMK6RdyAomIyCzXzW1Oi_H2InjA_agY60o9k0ZcbXCX2XowyPwI1AVcV5mq1g1oPYgfkYoPYWYtZXnw51ZE1PsFrUPjGMIdfmQR0tnzZfGzXi4CKsUAGC1UieHVBKaJSRaV1DClyMnzsASujV3Lv-1mxK9pb_3Tt8EILW5M1FJZX9SyrWCG6w8wen365JdMpW66bKPn_bbk1WhfyDGZv0o6Xt9Nrd58KO',
  ],
  colors: ['#C79A4B', '#2F2A25', '#d4d1cc'],
  sizes: [{ label: 'XS', disabled: true }, { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }],
  tabs: [
    {
      title: 'Composición y Beneficios',
      content: 'La fibra más exclusiva del mundo. Las vicuñas se esquilan una vez cada tres años y producen una hebra más fina que el cachemir. Regulación térmica excepcional, hipoalergénica y de suavidad incomparable, con propiedades naturalmente hidrófugas.',
    },
    {
      title: 'Guía de Cuidado',
      content: 'Para preservar los aceites naturales y la estructura de la fibra, recomendamos limpieza en seco profesional. Guarda la prenda en un lugar fresco y seco, acompañada de bloques de cedro natural. Utiliza la bolsa de algodón transpirable incluida para su almacenamiento fuera de temporada.',
    },
    {
      title: 'Envíos y Devoluciones',
      content: 'Envío gratuito con entrega premium en empaque de lujo discreto. Todos nuestros envíos son carbono-neutrales a cualquier destino del mundo. Aceptamos cambios y devoluciones dentro de los 30 días posteriores a la recepción.',
    },
  ],
};

const crumbs = [
  { label: 'Inicio', path: '/' },
  { label: 'Colección', path: '/collection' },
  { label: 'Hombre', path: '/category/men' },
  { label: 'Abrigo Heritage', path: '' },
];

export default function ProductDetail() {
  return (
    <>
      <Breadcrumb items={crumbs} />
      <div className={styles.wrapper}>
        <ProductView product={sampleProduct} />
      </div>
      <div className={styles.reviewsWrap}>
        <ProductReviews />
      </div>
      <div className={styles.wrapper}>
        <RelatedProducts />
      </div>
      <div className={styles.wrapper}>
        <section className={styles.faq}>
          <h2 className={styles.faqTitle}>Procedencia y Cuidado</h2>
          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h4 className={styles.faqQ}>¿Cómo se obtiene la fibra de forma sostenible?</h4>
              <p className={styles.faqA}>Trabajamos con comunidades altoandinas a través del Chaccu, un ritual ancestral de esquila comunitaria. Las vicuñas son capturadas temporalmente, esquiladas con respeto y liberadas sin ningún daño. Un ciclo que protege al animal y a la tradición.</p>
            </div>
            <div className={styles.faqItem}>
              <h4 className={styles.faqQ}>¿Qué hace que la vicuña sea tan exclusiva?</h4>
              <p className={styles.faqA}>Las vicuñas habitan las alturas extremas de los Andes. Cada animal produce apenas 500 gramos de fibra cada tres años. Esta escasez, sumada a la dificultad de cosechar una hebra tan fina, la convierte en el textil más preciado del planeta.</p>
            </div>
            <div className={styles.faqItem}>
              <h4 className={styles.faqQ}>¿Tiene garantía esta inversión?</h4>
              <p className={styles.faqA}>Cada Abrigo Heritage incluye garantía de reparación de por vida. Si la prenda necesita ajustes o reparaciones menores por el uso, nuestros artesanos en Perú la restaurarán sin costo de mano de obra. El lujo que perdura.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
