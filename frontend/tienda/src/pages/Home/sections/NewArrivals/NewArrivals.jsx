import { useRef } from 'react';
import styles from './NewArrivals.module.css';

const products = [
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8xKZ25IbmRvnndlic46Sv55um_18yy3OAj-0WBPnBobpY_QvkjWHQkGHhdVyUdR86GoWQjLpn98mzP24vHp8IX0HCsCFes81lLIILsVtuqvWzE0vidnL5zzgAscaenULO1t64BMkVzgrYP3JTXp0WqkmMwUq4XB3ZJHrFX9XYYCXh1GNJas34HxQ2wQUqz28HsdnpfwZeiSdjcgROB1ukhiYjOKbn27El8gTPWqzKyGInyX_aaoi3p6nQtkkE1Za2VmYaHEXiqnbq', title: 'Bufanda Mezcla de Vicuña', price: '$850.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBep66_LonJLxi9OUdYADUz0BkuhdB3qiwj_a6bFRtYUbAr62_ktn6I1dtCKIxDizum-e3VcaoSRcnAkYFkLDEMR4oJX53uKjhwzC7iXUl5SgCbY1QzMEHniVFYfmunmnwaVbusdfV2C0cNIdDGwYzl37kTE9KNyVGxPpfMJS3VEnzj6Fn56RexCYUPSIlzHJAt3iRLGvyVfL6eCpNbilqOfM4jhq73hEJDzLUAqqrYNAtoOXswsGxu9MQLBnaE_jLiYhdZqOd3dTBi', title: 'Chompa de Alpaca Real', price: '$1,200.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGWRAQg0dIvkKR_mkjC-CCiAvU1m0bK6-0UGr0sQjYyBFyky0gomy3qNFwW_xLbwEnfnarU_P_zHzNvS-lQ5hxhAbu2LBgO8dSMVGynWQJ87afn7yPeVDOng71pM1ugiIvHufYnnZ5Yq488IOkdppSy3yksUHlN0rU8XuqEcwJnfsam4Dl1Z5SWIM8nU-KY_wn-s5H_FvMEiMsOiff6TZcvmbMaceYoe9jxVW8PvP_OS9imPar4gVCz2FeJy79oXguA2OaOQH35RTV', title: 'Manta de Baby Alpaca', price: '$450.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeLfjQci8ya2DET5LGwC1Z1Ppp4Cyb2Rj9FmaTaRnxT0FtzSqA13V2X91EXBcpJbuLF9Zac9kW1dL2HLb7Qpb6ArNW1BA8SMTnCdPC7azHr-78Z34dC7RTfo2vNAQvvmLHz49twLFWi7k6loz1a6O6oBYgcka2tNf5gq1TPgKZjA-R4OVtFiIyaLY_8_CdZWgehX33RnaU1O2GIb0XXPXm6VimgFKbs1isYxjhjoVpxgDcmnJlpm8YyXSOWS9ms4I4Gee6ID8pGkIM', title: 'Chompa Cuello Alto Heritage', price: '$620.00' },
];

export default function NewArrivals() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Lo Mejor de la Temporada</span>
          <h2 className={styles.title}>Nuevos Lanzamientos</h2>
        </div>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={() => scroll(-1)}><span className="material-symbols-outlined">arrow_back</span></button>
          <button className={styles.arrow} onClick={() => scroll(1)}><span className="material-symbols-outlined">arrow_forward</span></button>
        </div>
      </div>
      <div className={styles.track} ref={scrollRef}>
        {products.map((p, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardImg}>
              <img src={p.img} alt={p.title} className={styles.cardImgEl} loading="lazy" />
              <span className={styles.badge}>NUEVO</span>
            </div>
            <h4 className={styles.cardTitle}>{p.title}</h4>
            <p className={styles.cardPrice}>{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}