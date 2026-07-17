import SEO from '@/components/seo/SEO';
import CTA from '@/components/common/CTA/CTA';
import styles from './Services.module.css';

export default function Services() {
  return (
    <><SEO title="Servicios" description="Servicios premium de Alpacart: asesoría personalizada, envíos globales,包装 personalizado y atención exclusiva." />
      <section className={styles.container}>
        <h1 className={styles.title}>Servicios</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className="material-symbols-outlined">concierge</span>
            <h3>Asesoría Personalizada</h3>
            <p>Nuestros expertos te ayudarán a elegir la prenda perfecta según tus necesidades.</p>
          </div>
          <div className={styles.card}>
            <span className="material-symbols-outlined">local_shipping</span>
            <h3>Envíos Globales</h3>
            <p>Entregamos a más de 50 países con DHL Express y FedEx, con tracking en tiempo real.</p>
          </div>
          <div className={styles.card}>
            <span className="material-symbols-outlined">redeem</span>
            <h3>Empaque de Lujo</h3>
            <p>Cada prenda se empaca cuidadosamente en materiales sostenibles certificados FSC.</p>
          </div>
          <div className={styles.card}>
            <span className="material-symbols-outlined">verified</span>
            <h3>Garantía de Calidad</h3>
            <p>Todos nuestros productos pasan por rigurosos controles de calidad. Satisfacción garantizada.</p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

