import styles from './PromoCampaigns.module.css';

export default function PromoCampaigns() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.main}>
          <div
            className={styles.mainBg}
            style={{
              backgroundImage:
                'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDK82rqWsTtWAqV-MrdzCw-SspS2iR2My-T1Vm1Z0IMAqsnEybNBNTclGTCmmAvyL7tCTheKtTupEep_fPIoVyAlBMXPUxXoNhVjPYd7SvCzLy7e4Gh_t2REJ3cEygJrIYbh1utOCAQeQvnl8JmFoR3iiC5r-X46sEsDRWN6MmiRy0RK3X-BPLU6Tfi7Y7NTSQx3YhqYc4ivw8AQO9lmpB9dyjkcoxYJ3suMn3TE4yoozKz2e-ys5DsiNPRXotAEY_bb_JVb9iMnXE)',
            }}
          />
          <div className={styles.mainOverlay} />
          <div className={styles.mainContent}>
            <span className={styles.mainEyebrow}>Campanas Activas</span>
            <h2 className={styles.mainTitle}>Coleccion Equinoccio</h2>
            <p className={styles.mainDesc}>
              Una transicion armonica entre estaciones capturada en fibras nobles.
            </p>
          </div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.sideCard}>
            <div
              className={styles.sideBg}
              style={{
                backgroundImage:
                  'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDey_-c0-aTW_bKcTRkbfmLV4X12Co-VjMXPpSCen5bUPNPEF0IfdxmFFipC0-YUDa4wMWQUl3qzZO9RpN34kkzhZbj4aVUVqKrXotN5dgSe2DfXIvU4G7dO6tG6Qub1nT5JV99pYEIALtZd59r6VjYImKr4i4v778FUm1tHtCPgRvlaJtOKJQQ0fSlf3CC2Z4dLc7jjBbBR1WHb124CvVTTKSgycuQLTcHdyTwdJbRh6x01eW9msAyO26KhcL0xfT21uvsfTnkCDs)',
              }}
            />
            <div className={styles.sideOverlay} />
            <div className={styles.sideContent}>
              <h3 className={styles.sideTitle}>Semana del Legado</h3>
              <p className={styles.sideSub}>Honrando el Origen</p>
            </div>
          </div>
          <div className={styles.sideCardAlt}>
            <span className={[styles.altIcon, 'material-symbols-outlined'].join(' ')}>
              auto_awesome
            </span>
            <h4 className={styles.altTitle}>Acceso Privado</h4>
            <p className={styles.altDesc}>
              Nuestros suscriptores reciben acceso anticipado a piezas de archivo y ediciones de
              produccion limitada.
            </p>
            <a className={styles.altLink} href="#">
              Unirse al Gremio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
