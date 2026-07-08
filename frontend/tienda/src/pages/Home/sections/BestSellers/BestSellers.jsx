import styles from './BestSellers.module.css';

const products = [
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD09LSbm6tEtX7LjTwXTVZshIS54t71roGMOJUFiDxScCjHTgDzPTIFTbyUtPdb67X4okSrfRhJpRlEEivLPy6rbOu10rbFPgzN1g4AEluUkzvC8JGr0nPfbv8_og-mNsOU7t8K-hC39EGk4XvNPMk-xzb0wYY0sQOs6OaFhGUkUnEVs3ygvsKupRqVcVZvKbnK0if4tk-j8ew3TaqoSmBCnYYgkhDHu0c0WQlNe3NVeyoljpyjCJb6gyiCtVcoqYnJCXASblhEfLmT', title: 'Chalina de Alpaca Real', price: '$380.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1ys2Ek_40Zd8MY-x7ZtiCevD-_fXYY9CiuQwc7Z7LhpHu0m98_-_UC4EUXNRp_aHOBB7GFMa2IVTIKlXEi85JBdHbh_SSX5Sn0TMGbJ5rnR9RbeH_UZvJ5dX_1s1cnLBxE1Imzim4qBSXgKoeP5MYyLcUWdVThClO5yCVg2KEhCwebkHnKl3SBaN0Knlu55HUlLD0cQRL4OvHJKtKwp4djCI_bAVc9Y3V7mZbQRcdgnOLEi3LBHTt7EjcbTDyMWhkuV0iIKOZ6VtR', title: 'Pantalón Esencial de Alpaca', price: '$420.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ4QwvrQpyUXPpgezSPm2O_T37AYRDOjilxGIziE5dR9f_6NQ-uj0IGmjNbAbNutGKE_F48-pGh-vpjBnHJR5W2u-VcGc7Gyk3tHyVyvOTCZWqctS5ssA-frBeyaNnVoifBrLHrbbty6kqYntWhPpmkGGV0cfg0CLNiU-X0GOyBiH1lD-P59D_u6DfM05Gs1sqCAi4BqlJMdWly4g7OzgZIOFmDhEeJcULwPBn_-OOVbEKQuUrJUOh_sUu4G3-pKPdNcBCpGjYBOXK', title: 'Gorro Montana de Alpaca', price: '$120.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATHPBRtRewl-bc_KIyMfoTFtY7tRY3SlwQjoMrvWkMvGYmHYrfht8mMNs_qXU-YJAeWnDDdP-8-5jXT-oztpUkyFwDJiP0BgrZ-cfGJmQFf5z48KkVemFJAijyMNtjYbpgou1o5evugNRiJ5G57viST1w1Mpx-MMwYKMrTU83fSJsOKO7G-r2E-kCfQEPMPKx1xxMd46A6fI0Jpl79UE9kyyngRoc-BnsBEkhhAcJIw9SpPFMEbVRuzpdBY8W6FJy48JaO4lmj0j-o', title: 'Poncho Andino', price: '$950.00' },
];

export default function BestSellers() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Los Más Codiciados</h2>
          <p className={styles.subtitle}>Los clásicos de Alpacart que definen el estilo de nuestra comunidad global.</p>
        </div>
        <div className={styles.grid}>
          {products.map((p, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardImg}>
                <img src={p.img} alt={p.title} className={styles.cardImgEl} loading="lazy" />
                <div className={styles.overlay}>
                  <button className={styles.addBtn}>Añadir al Carrito</button>
                </div>
              </div>
              <h4 className={styles.cardTitle}>{p.title}</h4>
              <p className={styles.cardPrice}>{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}