import styles from './CatalogGallery.module.css';

const items = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG8Q7AEwxB6YfsA1950D05YhkQuf5DWagEYoYhDuBgGCQAk84_H8mMb_yOJ7gs4efpg4F-z6qFmEzZLYJOzy2S1Mi93NmuTXeIoimHBYGZEaqRQ8JkN0KSpnu4kEUwv-LXL5gBEphX7ltzqGUQuj3ecbcvfftjKxh6TimWp18U3rJYLV2i2soLdZ1jJHJKVbnhYI4IYqyEp6McSttIKxvrFX6wsMDVFz_1bvKG8SBnku0JYK6sW5gN139Rq1DHrZwXGhmJ8Te1egw',
    season: 'Invierno 2024',
    title: 'Ocaso Obsidiana',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJlQ0YOMsbxBKxWqrSRr9MNDrhw0O_PGjHvKgi0lC29pJMIpkVQhNhzqImSZFkouuPo5eW7Lx9OEq1iFysHdho6ST0tXaX0WRMRPGhxSpUoMrWkBvAX6H2Qg_3wUBNycCoW5Kog9afrsPjveIdYidt4bRGwRKGNmrCvsjW5xqQ0pn-ZSLmwSU3glv4CCHsNPgyhQyAcGfQ04SUzz5_eTpzT5esNGR4usIQGOGV4qPuq_-leza4Kowyaz7WBQSkX02ZDaSVaoUh13Q',
    season: 'Linea Artesanal',
    title: 'Cobre Bruanido',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-6xc03RNEW4PUSCGotO5jDZksplzzcg1ZJtXTTQq_guKsVe6V9GtKozlRoynM5qi6TRyXuq2Fk6aWTrosZq-WBQIA9ASlUEwebgld2BlTnhTFUA38R6HDV4_oOreq4UW_MeRmmviZWyRUZ5p9HrqhFUObz7qmDoDXDopGEKlTZ-XW16t8tkM5h5gVS9gR2BCLFFl78ahchT6O7Saj1L0Mnn0QY1DTZJzwcK8REVaKQgjS08KByNThfF76EtMxk8bwC-ddPM1HzQU',
    season: 'Edicion Limitada',
    title: 'Bruma del Altiplano',
  },
];

export default function CatalogGallery() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Muestras de Temporada</h2>
      </div>
      <div className={styles.track}>
        {items.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardBg} style={{ backgroundImage: 'url(' + item.img + ')' }} />
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <p className={styles.cardSeason}>{item.season}</p>
              <h5 className={styles.cardTitle}>{item.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
