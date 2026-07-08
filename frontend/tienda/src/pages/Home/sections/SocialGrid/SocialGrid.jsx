import styles from './SocialGrid.module.css';

const images = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCN6CR2oDSy95We7ZB4Vnaq_21bqf52eVfChN61vaL6T-N74eVxupoZrEkicoh1FLuYgOeBTHLnNgCDRiOPwef58dN2A1Wuhzv41Baabf24T-xaghbNANwLS45VL6l4l3ixZRE0GTfKPI0Ak7IYamqjGu--LtEG5vebSBZqXrteHGtNp9XZG7lw3PJHqnBspGX3hy4O6Yj0S-Hz0FjlfvZbi8LdVYxfosL3tVCV5YHjlxlWXjRDVN-Vz6mhFhJsbz9sYz0_MBwCmVaN',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBQuxoNYofV_-T2n7D_kDQAGj4mbUctcdox2aa7nBVYHFPP-_2rX8YoBs_6nc8owDZZ8fAuEYg-uRaD98r_Ja1SVZPt98l01Ilye8OTy4efXLAh__DAc5lFywG4Iv5N1ILOc_ujArzXGYvbRC03fgkfl1NenF_3ETXvaB_QW5BmmyptGwe9520UX2wmwAIgoblf3LIrVI_nX79upLGh6VTESQJX3YH_xZAJ2xNfH3VRwepme1VeqZmeaRGEnfDmTfeK4tbE1upyy6jz',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDC_jKBH5-zdOF_8HfT6vX3kYjqE0to4pjeKhPh57FBr9K3lFhMdhwxCYa-FGSKvq366o0CnihpD6mwD0a2eQXCR9UdZs7QS-c5k1pPJ1xoxozZwx8QvvMwziU7_agR4lWvt5Xe34T4XrkuhcvhTmnuzHMolXBxM_b-ieWECrJ6Q87aTpbgrdOaOTdkoo0IklbxTLsGwiuZ4eqwYdb_go75lPhTdAAv2wFXTaMT8WSBhOckKoVvB_urKxkAmAmE-ZawfSkPdEsiD2Fu',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC_BrqCaRDIKI3iG62OGJGFy2aVgJqOqS2TN-cja1MLhUaWcjdUj6BmJa8mHZGXz19FMEupPkfdgt0xmP_DSjvZPCBFiUYFeErIdDPBqMOhPWiUIU9qW_rb-oyKfU8xz-ii3Fa8wzl46UYH8BiLkPLNqY7Thp1ivIM-AfHyX3ms9C06thwB9OhvdqypjZ9B8IDzERBJY5N5TeMFu5dBrhBD2aEcS1Ak4Oj6ZkYtQ1423yay6gm3hi1MpDJ-t5s_QHA9nW5eIsnGRVSb',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAacFk7XnftMPloIlw5aM09qUp8YmnX2Im5EkfPJKon-53PNL3-Z3VGw4PicFFuhs7JTLT1lRj5MZP72SLMRUOwUkjz-R_Z2nPRR9JhIRkYeLkVhS47ABjDgsDu9xjsoNpXNi1XFk-d4xT4muAepuUC1XZAbXqCaanXc8TAWJPmvbv65p8Ll4vLaxrtwoq2S9zIyu-nX17coYw2Qzs7FKjLvgPxZ2JYwe4tMJW_ebyfx_ALYSuYxN0SjsNz1yQlbMNdCnI30VOznFw1',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBplEn8i2zWfyZX4LUSv2DQ0IwI9aLhFKPEulyOc7rkaQX4rWlkWizmqmqhab4ksgUOC-zRbl7dAroRPrES1wsEBe6OfYwt7wx_f3MtO968cuXK4mOAA56G_wS_TjcrMTVgItFv4OtuL4CQInvlzI-EjTY64EXWcb76wEG0CgybK4kPq5JWvU-WRv6TyIXxHd5MbE3WxK7raLac6fxvsEg81RkdAdYAsGG6USTPBpbJc71bBA8BBIQjhKNrT9sW-uuwvjjy4__UvsTV',
];

export default function SocialGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Inspiración Alpacart</h2>
          <a className={styles.link} href="#">Síguenos en @Alpacart</a>
        </div>
        <div className={styles.grid}>
          {images.map((src, i) => (
            <div key={i} className={styles.item}>
              <img src={src} alt="" className={styles.itemImg} loading="lazy" />
              <div className={styles.itemOverlay}>
                <span className="material-symbols-outlined" style={{ color: '#fff' }}>favorite</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}