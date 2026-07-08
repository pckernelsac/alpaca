import ContactHero from './sections/ContactHero/ContactHero';
import ContactInfo from './sections/ContactInfo/ContactInfo';
import ContactForm from './sections/ContactForm/ContactForm';
import ContactMap from './sections/ContactMap/ContactMap';
import ContactFAQ from './sections/ContactFAQ/ContactFAQ';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <>
      <ContactHero />
      <section className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.infoCol}>
            <ContactInfo />
          </div>
          <div className={styles.formCol}>
            <ContactForm />
          </div>
        </div>
      </section>
      <ContactMap />
      <ContactFAQ />
    </>
  );
}
