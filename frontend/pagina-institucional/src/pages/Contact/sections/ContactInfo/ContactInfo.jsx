import styles from './ContactInfo.module.css';

const infoItems = [
  { icon: 'location_on', label: 'DIRECCION', value: 'Av. El Sol 123, Cusco, Peru.' },
  { icon: 'call', label: 'TELEFONO', value: '+51 84 123 456' },
  { icon: 'mail', label: 'CORREO', value: 'contacto@alpacart.com' },
  { icon: 'schedule', label: 'HORARIOS', value: 'Lun - Vie: 9:00 - 18:00' },
];

export default function ContactInfo() {
  return (
    <div>
      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>Nuestra Casa</h2>
        <div className={styles.infoList}>
          {infoItems.map((item, i) => (
            <div key={i} className={styles.infoItem}>
              <span className={[styles.infoIcon, 'material-symbols-outlined'].join(' ')}>
                {item.icon}
              </span>
              <div>
                <p className={styles.infoLabel}>{item.label}</p>
                <p className={styles.infoValue}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <a className={styles.whatsapp} href="https://wa.me/5184123456">
          <span className={[styles.whatsappIcon, 'material-symbols-outlined'].join(' ')}>
            chat_bubble
          </span>
          <span className={styles.whatsappLabel}>INICIAR CONVERSACION</span>
        </a>
      </div>
      <div className={styles.socialSection}>
        <p className={styles.socialLabel}>SIGUE NUESTRA HUELLA</p>
        <div className={styles.socialLinks}>
          <a className={styles.socialLink} href="#">
            Instagram
          </a>
          <a className={styles.socialLink} href="#">
            LinkedIn
          </a>
          <a className={styles.socialLink} href="#">
            Pinterest
          </a>
        </div>
      </div>
    </div>
  );
}
