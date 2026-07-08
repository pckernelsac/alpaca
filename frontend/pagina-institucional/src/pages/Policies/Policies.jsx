import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import Container from '@/components/layout/Container/Container';
import CTA from '@/components/common/CTA/CTA';
import ScrollSpySidebar from '@/components/navigation/ScrollSpySidebar/ScrollSpySidebar';
import styles from './Policies.module.css';

const sections = [
  {
    id: 'introduccion',
    title: '1. Introduccion',
    content: [
      'Bienvenido a Alpacart Textiles. Su privacidad es fundamental para nuestra filosofia de artesania responsable. Esta Politica de Privacidad describe como recopilamos, utilizamos y compartimos su informacion personal cuando visita nuestro sitio o realiza una compra.',
      'Al interactuar con nuestra plataforma, usted acepta las practicas descritas en este documento, disenadas para honrar la confianza que deposita en nosotros al adquirir piezas de lujo ancestral.',
    ],
  },
  {
    id: 'datos',
    title: '2. Datos Recopilados',
    content: [
      'Recopilamos informacion necesaria para brindar una experiencia de compra fluida y personalizada:',
    ],
    list: [
      'Informacion de Contacto: Nombre, direccion de correo electronico, numero de telefono y direccion de envio.',
      'Informacion de Pago: Detalles de facturacion procesados a traves de pasarelas de pago seguras y cifradas. No almacenamos numeros de tarjetas en nuestros servidores.',
      'Datos de Navegacion: Direccion IP, tipo de navegador y comportamiento de compra para mejorar nuestra curaduria digital.',
    ],
  },
  {
    id: 'uso',
    title: '3. Uso de Informacion',
    sections: [
      {
        title: 'Gestion de Pedidos',
        desc: 'Procesar transacciones, organizar envios internacionales y gestionar devoluciones.',
      },
      {
        title: 'Comunicaciones',
        desc: 'Enviar actualizaciones de sus pedidos y, previa suscripcion, noticias sobre nuevas colecciones y herencia textil.',
      },
    ],
  },
  {
    id: 'derechos',
    title: '4. Derechos ARCO',
    content: [
      'Usted posee control total sobre su informacion. En cualquier momento puede ejercer sus derechos ARCO:',
    ],
    tags: ['Acceso', 'Rectificacion', 'Cancelacion', 'Oposicion'],
    note: 'Para solicitar cualquiera de estos derechos, envie un correo a privacy@alpacart.com adjuntando una identificacion valida.',
  },
  {
    id: 'cookies',
    title: '5. Cookies',
    content: [
      'Utilizamos cookies propias y de terceros para optimizar el rendimiento de la web y entender que secciones de nuestras colecciones despiertan mayor interes.',
      'Puede configurar su navegador para rechazar todas las cookies, aunque esto podria afectar la funcionalidad de algunas partes de nuestra boutique en linea.',
    ],
  },
];

const sidebarItems = sections.map((s) => ({ id: s.id, label: s.title }));

export default function Policies() {
  return (
    <>
      <Container>
        <header className={styles.hero}>
          <Eyebrow>Privacidad y Confianza</Eyebrow>
          <h1 className={styles.title}>Politica de Privacidad</h1>
          <p className={styles.description}>
            En Alpacart Textiles, la proteccion de su identidad es tan sagrada como el origen de
            nuestras fibras. Nos comprometemos a salvaguardar sus datos personales bajo los mas
            altos estandares de transparencia y etica digital.
          </p>
        </header>
      </Container>

      <Container>
        <div className={styles.grid}>
          <aside className={styles.sidebar}>
            <ScrollSpySidebar items={sidebarItems} />
          </aside>
          <div className={styles.content}>
            {sections.map((sec) => (
              <section key={sec.id} id={sec.id} className={styles.section}>
                <h2 className={styles.sectionTitle}>{sec.title}</h2>
                <div className={styles.sectionBody}>
                  {sec.content &&
                    sec.content.map((p, i) => (
                      <p key={i} className={styles.paragraph}>
                        {p}
                      </p>
                    ))}
                  {sec.list && (
                    <ul className={styles.list}>
                      {sec.list.map((item, i) => (
                        <li key={i} className={styles.listItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {sec.sections && (
                    <div className={styles.cardGrid}>
                      {sec.sections.map((s, i) => (
                        <div key={i} className={styles.card}>
                          <h4 className={styles.cardTitle}>{s.title}</h4>
                          <p className={styles.cardDesc}>{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {sec.tags && (
                    <div className={styles.tags}>
                      {sec.tags.map((tag, i) => (
                        <span key={i} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {sec.note && <p className={styles.note}>{sec.note}</p>}
                </div>
              </section>
            ))}
            <div className={styles.ctaSection}>
              <CTA
                title="Tiene preguntas sobre sus datos?"
                description="Nuestro equipo de atencion al cliente esta disponible para resolver cualquier inquietud sobre nuestra gestion de privacidad."
                buttonText="CONTACTAR SOPORTE"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
