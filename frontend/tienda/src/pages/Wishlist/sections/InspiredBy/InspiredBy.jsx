import styles from './InspiredBy.module.css';

const items = [
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkvyFiQByAvZslYTk3r2Avisy9u-atmizCpRqybYw4_kSUPdMeUNjTz61bHilNz0Q5S_i9e-rk3Zq2bM3409_m-haBYUsZZyP5LBpj6pRX_IlZ2mp1Lk9vw8d6l-dXdwDG2KLm02oPb1bb-dEl-M_yVLqZng5KXWqi0uTouUbTpdvUSJGjS9Kdk2L-vkkHJRRHRyHtizAaNkllDnWgkwqvHH8oFAEbZZhN9DjNho3zA64hsSj7mFj7MO8e-biNUdNaGXnie6nLN8TH', title: 'Bufanda Navier', price: '$145.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUCSDaIChum_fRcSGMgNBndv85qiFS-xNihjMCIz4-F_ZjbkqvxyR71-sMvqvgg0B2tilO2Dr1abHC2VHsvEFsJXWQrAtaPU2d2e_B3RzXar6OzR0WHqski6MO8Ca3vroPENtiCzVxZ_ofbyWyPDZggTqzs8fIhP57--siLnE_yJLJ5ORkBDi9s7adiiFVnV6nO38RQTQ4VFnLnUazF7cKjLme3HZAOAIWJ3Z3atFvCOydOSZRFPe0Glsgqt9eThmJPY2LHm-qNtAP', title: 'Pantalón Avena', price: '$280.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFQF4Cxq8BkcycVMrhoDbT_txN0T7SXCel9hKEV7vTo0sx6DBwkcLlzDRSfsegYv1-h09y9aqeS2R6umdkEL9MpSxcXNrkE4O5s1sfIyeFZBMnRh0ckF08T8bMEsJBP0hAvcb_9Qg8r3L6f2mkafakz6ESMTOLtL114OaREsP_zLzwCkpHcDEfcIVnIyr_-XpaxcGZI6jVel8qF-Roewtd5ejp6YgWjlWjYAkz2JQvnEmDlzMRKIQzBlRflt-wRV-0nhCf-e89uQ2n', title: 'Cojín de Punto Grueso', price: '$190.00' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDesnggfwcN8Iumm8Jfq35K9cg8AQSo5XfTk_wU2t3ucTNT8YnYAkaBvKue04O6aBAMJWcv-3xKHozsfZOR5u0mp1W3Sk3uCrO1VysEUBVMTmdbz72T--AXTtUlrGktWnKXxeyDqyCX1KguTg1K8b2KgRjgR150FiuCcQIdboj-ysGxkCEBISrTcFbKF7eubfouT6AvMWNFCwc_gQ41PTNUzWHW0oEZofG2r7pgdbmoRiGqQSeNXvgSoWsXd1o8NUcR3Y8Hu2Tzt0zy', title: 'Gorro Urbano', price: '$95.00' },
];

export default function InspiredBy() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>También te puede gustar</h2>
      <div className={styles.grid}>
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
    </section>
  );
}