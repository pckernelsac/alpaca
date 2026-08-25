import styles from './RecentlyViewed.module.css';

const items = [
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCsvIG9JPs1CEGhchtYFjUgViDvId0kOiArXgGK-TIz7eYvtjQNYCu-1b9O042TOKV2wj8f1Q7kegW1FMTuk0Y1smD_ua35rbQ7b-GxJ3lTxyeq7aPPNVp_0aNVa2LRpPQIm-kmXbpmYANI7WdC_g38eos4wSiFY2Cf6tVC3mVqWv9PFkhf_LXv0ztwsK6CAnxyBh0fV12kvon47405VdpNCetUtQbmNjEJeYORsZjxyxQRMVJyWTkKzRHuY5ZjfNAm8r8yPHYHml3', title: 'Bufanda Andina de Encaje', price: 'S/ 165.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc-oqiGd_Cm5YH_k-Lgx7KM936LXsEKONX3YWCi4V85UbPnJCUvTcIGE0lPBkqolBvb_D9G7-via5cRH-kd1lGkhwQIr9SoVvBoqrTcTES1AD232iKv9HAxMx-OxQThiM4sRSxfoIJOVxkNgoG0amEehbdoWWZDTcf69VnUVlJseF3tpsn4UFo3sBTmE7SwBTrguNKUKesLQSQAWIpxsK51d0rOwLyrMyqr3vzyB5e6D8m4n35T3fVWi3ubVve2PUUEHCrlHP9YbfJ', title: 'Mitones Heritage', price: 'S/ 95.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwOqkKoZaDmakjxiH2xlDigJF05foEuuZm2leC_HQ8AhaAoxpIjPeGMfmiBf1FQ1FFpG44f3SNMhjnq1ug_oT9iV5UU8SEbERpGxYw_8mz8xfSNoGwUlUVL8hK4Q07EC_FjUpnAoSuXXUfGIuZpAFuMawM-G0KaVZOBOL7YNHP3iCPmzoOc-A6vamLL1A5g6LAlAT3AqCs-V3hTsIc4Clbvp5oyE8dIK_jAIwAm-OtS-9JSYj-5OhaBIfrQ7Smz6LhV0BaWHS6hsWa', title: 'Gorro Alpino', price: 'S/ 120.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdco3WAuPdlqU8p3EqiNtOaGEAW4Zt1yyKX-qjs0RJ9-ZiheBVNTEejrzfbAhIutWrMLuVNWfcDHWUEgYxUagd5yTf8IBhyWecijSm8-IyMEAwMDjWPpyX_-PqG8wsBwm3GHdDQCyKLeWH9NQRMT7JA5jK_K0QLp5i6WCtiKAwVhInvhBHx8kfj3RR1hKC4sU1HnUnGi93CRmy_Fh-UF09qfIufforms3DjlLY7eIl7xoBaQG5vDNl-nRxhky64keyQEQAoSuesS6s', title: 'Manta Andes', price: 'S/ 550.00' },
];

export default function RecentlyViewed() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Vistos Recientemente</h2>
        <div className={styles.track}>
          {items.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardImg}>
                <img src={item.img} alt={item.title} className={styles.cardImgEl} loading="lazy" />
              </div>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p className={styles.cardPrice}>{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
