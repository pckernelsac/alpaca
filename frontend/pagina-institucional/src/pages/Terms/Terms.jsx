import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import Container from '@/components/layout/Container/Container';
import CTA from '@/components/common/CTA/CTA';
import ScrollSpySidebar from '@/components/navigation/ScrollSpySidebar/ScrollSpySidebar';
import styles from './Terms.module.css';

const sections = [
  {
    id: 'general',
    title: 'I. Terminos Generales',
    content: [
      'Bienvenido a Alpacart Textiles. Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos Terminos y Condiciones de Uso, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de cualquier ley local aplicable.',
      'Nuestra plataforma esta disenada para ofrecer textiles de alpaca de la mas alta calidad, priorizando la sostenibilidad y el pago justo a los artesanos locales. Cualquier uso indebido del portal que atente contra estos valores resultara en la revocacion inmediata del acceso.',
    ],
  },
  {
    id: 'propiedad',
    title: 'II. Propiedad Intelectual',
    content: [
      'El contenido, organizacion, graficos, diseno, compilacion y otros asuntos relacionados con el sitio estan protegidos por derechos de autor, marcas comerciales y otros derechos de propiedad. La copia, redistribucion, uso o publicacion por su parte de cualquier contenido esta estrictamente prohibida sin nuestro permiso expreso por escrito.',
      'Respetamos el patrimonio cultural inmaterial de las comunidades andinas. Los patrones y disenos tradicionales presentados son propiedad intelectual colectiva o estan licenciados especificamente para Alpacart.',
    ],
  },
  {
    id: 'responsabilidad',
    title: 'III. Responsabilidad del Usuario',
    content: [
      'Como usuario, usted se compromete a proporcionar informacion veraz durante el proceso de registro y compra. Es su responsabilidad mantener la confidencialidad de su cuenta y contrasena.',
    ],
    list: [
      'No utilizar el sitio para fines ilicitos o fraudulentos.',
      'No interferir con la seguridad o integridad de nuestra red.',
      'Respetar la integridad de la marca y sus representantes.',
    ],
  },
  {
    id: 'ventas',
    title: 'IV. Condiciones de Venta',
    content: [
      'Todos los precios se indican en la moneda local e incluyen los impuestos aplicables. Nos reservamos el derecho de modificar los precios en cualquier momento sin previo aviso.',
      'Debido a la naturaleza artesanal de nuestras piezas, los tiempos de entrega pueden variar. Cada producto es una obra unica que requiere cuidado especial en su transporte.',
    ],
  },
  {
    id: 'limitacion',
    title: 'V. Limitacion de Responsabilidad',
    content: [
      'Alpacart Textiles no sera responsable de ningun dano directo, indirecto, incidental o consecuente que surja del uso o la imposibilidad de usar nuestros servicios. Aunque nos esforzamos por la perfeccion, la naturaleza organica de la fibra de alpaca puede presentar variaciones naturales que no se consideran defectos.',
    ],
  },
  {
    id: 'ley',
    title: 'VI. Ley Aplicable',
    content: [
      'Estos terminos se rigen e interpretan de acuerdo con las leyes de la Republica del Peru, y cualquier disputa estara sujeta a la jurisdiccion exclusiva de los tribunales de la ciudad de Cusco.',
    ],
  },
];

const sidebarItems = sections.map((s) => ({ id: s.id, label: s.title }));

export default function Terms() {
  return (
    <>
      <Container>
        <header className={styles.hero}>
          <Eyebrow>Marco Legal</Eyebrow>
          <h1 className={styles.title}>Terminos y Condiciones</h1>
          <p className={styles.description}>
            Alpacart Textiles se compromete con la excelencia, la transparencia y el respeto por las
            tradiciones milenarias. El presente documento establece los terminos legales que rigen
            nuestra relacion con usted, asegurando una experiencia de lujo basada en la confianza
            mutua y la proteccion de la herencia textil andina.
          </p>
          <div className={styles.date}>
            <span className="material-symbols-outlined">schedule</span>
            <span>Ultima actualizacion: 24 de Mayo, 2024</span>
          </div>
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
                  {sec.content.map((p, i) => (
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
                </div>
              </section>
            ))}
            <div className={styles.ctaSection}>
              <CTA
                title="Tiene preguntas legales?"
                description="Nuestro equipo de asesoria esta disponible para resolver cualquier duda sobre nuestros terminos, privacidad o derechos del consumidor."
                buttonText="CONTACTAR ASESORIA"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
