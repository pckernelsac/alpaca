import styles from './RelatedProducts.module.css';

const related = [
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBf38mHudzB1g_Yhhj0FqCZvz8ycNZq2QMZdxOdbh6mPw-qUjcxo3yFbJcTzq9NrEZ0FRIhwKtvm9f_wRhTcH3KLell6MvXcYVUQzj928I57dy9uN6-kPPVtY0lkh0Qz1O5_BG12QG4PcwWchCXxILmuT6xQO52HaVm3j0ghP2aXG_7M-QDLOr1Zvg_NH25crNPcGNF3c6HSF9KDXCQcGcGwh-yr1gwztvtbRoDdbbOataQX7IduoyX99tWfXAQdnXsIBa_SJqaOZw', title: 'Chompa de Seda y Alpaca', price: '$650.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM9QUeT1CeQ8bekM9lfNcO-dQoWHFVup-pIckJ5drsAUbD8x85Ma6vV7xFbReh6BEfhah6mzEX1AebPaPMy0fFOg-ffgn4NBdnfCEFuE_b6R-ePRS3RA3jA8M7vh46lDHyIkNYxxVZ2ZYFetQ9jL0r29QwPuokZJnSlzMJY-7I24Mj10EW8BO2Nk0pspXWZJAuJ-CSssiyHYx2ZOlH0M9SYNeEicvHhP6Gv-BpDPtFHVv7gFKC9zhnUSTMfYmh1xA-glxu01jyBFky', title: 'Pantalón Andino de Lana', price: '$890.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc2B_MejvvQ-_cfxLYjB2dt0_ooDsenr1r87ADtcEqXD5_fd-LKcAwcUGvtZvAOSF2quMmSkvEnwQ5WVSZ9Ri3hX8LYzr5uuYgRzQfKrVOrMC_KqXZbLkTZ248fHn_mKXggVQgDiioTr8s8IEtHAa6qnyVp6uOq3kb2laEhhHqXgBab7KRTOKzIx3-5iGW1e6N96Ki6YIAGzC4C6LkFk0XWisPv7Jb2x1g1_YYkrYyUbJBmPrBEs20JSNlNCqMs4sAEvnWrKUL2GjR', title: 'Botines Chelsea de Alpaca', price: '$1,200.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7Ir5A-hO9fsDjwZjMdmOhUDO8ztZqQAS2VjnbJAt8NaHftXP79Ebtklm0QUgR9ayJpDDZ14o5YdlcwMRfylWokx49ZH6xNPOsC_6n6WhZoWVTeBtMGPChwacPrk0Xpr3TALcKh3A8_FwVQIhqvItsM9g-IgCyQ6RRM1-r2OE9aj-LUraJpx5niI2IQxkXDrtksnEAamda1qtxc_yuhHQA2PvtTjcXxegv3aVYNXZvB9u6Lp71zKxIvKqprGZV2XRUhZcBMNDsJQ_x', title: 'Bufanda Signature', price: '$1,450.00' },
];

export default function RelatedProducts() {
  return (
    <section className={styles.section}>
        <h2 className={styles.title}>Combínalo con</h2>
      <div className={styles.grid}>
        {related.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardImg}>
              <img src={item.img} alt={item.title} className={styles.cardImgEl} loading="lazy" />
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardPrice}>{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}