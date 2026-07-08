import styles from './ContactFAQ.module.css';

const faqs = [
  {
    q: 'Hacen envios internacionales?',
    a: 'Si, llevamos la excelencia de nuestra alpaca a cualquier rincon del mundo con trazabilidad garantizada.',
  },
  {
    q: 'Puedo visitar el taller?',
    a: 'Las visitas al taller de Cusco se realizan bajo cita previa para garantizar una experiencia personalizada.',
  },
  {
    q: 'Tienen venta al por mayor?',
    a: 'Colaboramos con boutiques selectas. Contactenos para recibir nuestro catalogo de wholesale.',
  },
];

export default function ContactFAQ() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h3 className={styles.heading}>PREGUNTAS FRECUENTES</h3>
        <div className={styles.grid}>
          {faqs.map((faq, i) => (
            <div key={i} className={styles.card}>
              <h4 className={styles.question}>{faq.q}</h4>
              <p className={styles.answer}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
