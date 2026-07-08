import styles from './HomeCategories.module.css';

const items = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJepKokAF379XQEM4YaFHk4S7HvZi_mMf2TSI_UeN-Y0Jdr8LCSEeXX46QdMG1vLOm2hKNVhxMzuiTaYqJd4vIab-lPa2oD0WKSlRr0uwNvI4KfamndQSO0FAnPX80SbITvhApXxSjCBlnLxBkXaNkWUKwua5HlBs99YAbUlh9EDwVRsG2dNJ5NkQxs1u8bdUkJmKHUdosRc2azgv45pjUXqhLcOnv8Mk5y7VHey7TREGsgoxvYnjms0zFsqSKZCuYBdVCZ0JTMkI',
    title: 'Invierno Andino',
    subtitle: 'Volumen, Textura, Resiliencia',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuxj_sB8jb2TMMrqJP4ftjoyU3UKS274TrY3W7E_cHae1iJeV59nMY9-SDrCKGbGg5oiRCbnDH7OkmwSVSBL7pLsMNrHoVu6AyUqx-prQiEOhWivtJOrz1w7DIzLNyBaiqN7flHDPFfsfwTvwvQZfIs9ARhYyhjPK6sY2YxtIn1iuP-C80f2sJ3xHwpjzl0coq_QwiHm622zdARfLFakQbyDqUDWSmG_uAUrWRLptYyhKCWmf1bvkDJqdpmnP54S_9VybjkQ2fYtA',
    title: 'Coleccion Esencia',
    subtitle: 'Mas Ligera que el Aire, Mas Fuerte que la Seda',
  },
];

export default function HomeCategories() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {items.map((item, i) => (
          <div
            key={i}
            className={[styles.card, i === 1 ? styles.cardOffset : ''].filter(Boolean).join(' ')}
          >
            <div className={styles.imageWrap}>
              <img src={item.img} alt={item.title} className={styles.image} loading="lazy" />
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardSub}>{item.subtitle}</p>
            <div className={styles.line} />
          </div>
        ))}
      </div>
    </section>
  );
}
