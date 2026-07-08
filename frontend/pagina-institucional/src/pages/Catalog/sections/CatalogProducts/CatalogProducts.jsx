import styles from './CatalogProducts.module.css';

const products = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwAilo61HRQqkF23eOTHMBcKC89VUvQ5lykDrE7osNbKVoiQo-FMZixecJ6QKbGxWpzM-SLD2Ah-URs0L0Wk6jDwEcv1ostiw798f9dGDF_Wy6KutlRW3-d7db6BT21gc_yyrbtU-aGpyatXqGQieEpvTPujSVaQGASpagOUwG5G_oDDWeA3XHg--fIuLCeSxqSM6CnFQwSqdrvxYC_W95MYIDsjSpxKK1PbH6VXHZl6odwaMGyDcFCkiTTfw44TJmEheLYb58gj0',
    title: 'Chaqueta Altitud',
    sub: 'Baby Alpaca y Seda',
    tag: 'Sastreria Contemporanea',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6pRSx-SmHjnM-o64FNvvC6JyXCMJrrN3VkIGpTqOh8t68VR5XPlthBpq8kmjf1YvQDhBIyiMWf1qSyNZmbf8sYfulBfJTpRYhZs_W5d54hB4ljoM5zCzHnvX6d3Z9FnyEn9w4Gl4HXW3bQUPw_LQ7jl_D7hp08WVY33InVvl6TIReUJVPJiB-AdniMzc0cBEa_w0YxxQouSzoiaAjoKhg3pV9zx0iTn0jnKWPEN0fSbnQxUx-Mm96lgGOwbwliH9JB_F66VnS-FA',
    title: 'Manta Vicuna Dorada',
    sub: '100% Vicuna de Esquila Silvestre',
    tag: 'Pieza de Coleccionista',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwwZKbOp9Lm9AYztPj3hKikvBY9chMe7I0PTKqlDAeRANsWBRYVQ1TLRSvZ1vFHTLcrzPLiWXt6Hocik1Y5em6OukW0-gAnV5sZtG1UWY96lnSrZ-UOnq3wrksBYjhi8m7mpMDrqAHwaprXQlmtLaZZSfD6hxD2RdJAAls_u5f4gSi7ImOyj-g73EMh68OYcDQ17aSJJgn-HDr4kfLgRiPW3k8l0jsQb8ar9hZKnofqkLnLlWbD92Qw6lzAT1L6EcBO0jFCwcEAKQ',
    title: 'Abrigo Altiplano',
    sub: 'Mezcla Real de Alpaca',
    tag: 'Estructura &amp; Calidez',
  },
];

export default function CatalogProducts() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.headerTitle}>Galeria Institucional</h2>
            <div className={styles.headerLine} />
          </div>
          <span className={styles.headerMeta}>S/S 2024 SALON DE EXPOSICION</span>
        </div>
        <div className={styles.grid}>
          {products.map((p, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardImg}>
                <img src={p.img} alt={p.title} className={styles.cardImgEl} loading="lazy" />
              </div>
              <h4 className={styles.cardTitle}>{p.title}</h4>
              <p className={styles.cardSub}>{p.sub}</p>
              <p className={styles.cardTag}>{p.tag}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
