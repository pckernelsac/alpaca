import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import styles from './AboutArtisans.module.css';

const artisans = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8UxgqjWjE7H1us0eiSXgM0QjI-NQF3wLM-2xYfjCA-uykzsyl7lQhV3vgkDQ48nvmGD2l9PvbqFUt9nYAb1SzeUqg-aiSVPPnhnEPQbLZaXZc2pDgPTpC5_ZctFRT0M7MDwiJs4X7SwmNPz_zB888xPWmwvHC0cH8VSElQdWnOuVJ1zbRzznaFupWE-Tc86i3B2TqbV-xdhlJr7Xu7o_-qq0nXNDy3pAZw7-2yK7FqnXV62HqgocWkTLstx-xksiGrzYRDKNFr8w',
    title: 'Hilado a Mano',
    sub: 'Tecnica Ancestral',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaedoEwWN0vu_JYjU5kMU9J3P7adLiZTdlmjFbV5kZIQv6LfNYTQ5vq4ujHh6yimcrTKh_amENFEKJ00Q9vXhiNSstruwW8ntFFatxVLnZgvYnl221_9kknBxLQVo7DdOatwA_KJ4gXXg2VevBXTNJ9Hq0vqyLMNSSWFT67quA9vuLCqhvAFYUVZmiBq3BF__3hFYMAzvwGKjS5RNFkMsCr8OH32STGVb0ZqUSC8JPiEH2iXbxVhSgyDQY7Q4CFM2nDCelaHzqgPg',
    title: 'Tejido de Punto',
    sub: 'Acabado Invisible',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgXJqAutD90jLTe_hXwW60Ong1FpVqG9XQkjNflyBC-AcTnPIyOzEsaY2jK9LnWV62Jc-2u4NpUDAbv845KmPaYoDbQzD-sO_WNISiP7zOh7YdhDx7tPeBQkhsQqqTNRTc_0UoDP9r00P0pXdsPR_WY8AOlPqVWRMDiypb4Inxo7IrpeSdtDl2CVRyLcceFQMGtgz8CquAgI9ZwoFzXkU-giHn03xGsyp8aETojaaVJoIBgdyVwcvpysIh62oUGmHowTyTUBRfwjg',
    title: 'Control de Calidad',
    sub: 'Excelencia Editorial',
  },
];

export default function AboutArtisans() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Eyebrow>Maestria</Eyebrow>
          <h2 className={styles.title}>Manos que narran legados.</h2>
          <p className={styles.desc}>
            Cada pieza de Alpacart es el resultado de semanas de dedicacion. Colaboramos
            directamente con comunidades de tejedores, asegurando que su arte sea valorado y su
            cultura, protegida.
          </p>
        </div>
        <div className={styles.grid}>
          {artisans.map((a, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardImg}>
                <img src={a.img} alt={a.title} className={styles.cardImgEl} loading="lazy" />
              </div>
              <h3 className={styles.cardTitle}>{a.title}</h3>
              <p className={styles.cardSub}>{a.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
