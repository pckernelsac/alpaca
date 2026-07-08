import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import styles from './CatalogTechSpecs.module.css';

const specs = [
  {
    title: '16.5 Micrones',
    desc: 'Nuestra fibra de Baby Alpaca alcanza niveles de finura comparables al cachemir mas selecto, garantizando una suavidad absoluta sin irritacion.',
  },
  {
    title: 'Trazabilidad Total',
    desc: 'Cada lote de fibra esta certificado mediante tecnologia blockchain, desde la comunidad de origen en Puno hasta el telar final en Arequipa.',
  },
  {
    title: 'Termorregulacion Inteligente',
    desc: 'La estructura medular hueca de la fibra de alpaca permite el aislamiento termico en climas frios y la transpirabilidad en climas calidos.',
  },
];

export default function CatalogTechSpecs() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.textCol}>
            <Eyebrow>Excelencia Tecnica</Eyebrow>
            <h2 className={styles.title}>La Ciencia Detras de la Ternura</h2>
            <div className={styles.specsList}>
              {specs.map((s, i) => (
                <div key={i} className={styles.specItem}>
                  <h4 className={styles.specTitle}>{s.title}</h4>
                  <p className={styles.specDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.imageCol}>
            <div className={styles.imageBox}>
              <img
                className={styles.image}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoXR0MOkrkKk68sSprNZwxV6UKbcICuKH3OslCV6rdmv-rM5SzVEDnt4JuB_1UsnDB8bYS4otxRzygqFtoUzcVznAX1_-OUETi24VfxiFtg_okopXZ6rrnfWrRnjdktb7WAyKGWne3UO_W9AzRJeE3cf-sV4YBzvOjpcIT2ZgqEgEJLczB2r2REhOOwlzyNDrHO-P_wqf83mhmShouzJih1wbSk3yS2RXIjpjq8RmGqz5J74FMrAl69Mb_BDx_ADH2Q8bFIO3DMw0"
                alt=""
                loading="lazy"
              />
            </div>
            <div className={styles.floatingBadge}>
              <p className={styles.badgeSmall}>Certificado de Origen</p>
              <p className={styles.badgeLarge}>WPA 100%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
