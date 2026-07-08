import styles from './CategoryBento.module.css';

const categories = [
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoDm5T-dK69elmouthtL9xOX6SwoE4NUmYP2fS3bFIWsZAfDEechCewQ78R_ainFTgcyxRP00jH3J-K-TLiuHf6TjsX_ObOtFDKoKQWDbpoueOFfSeIlru-jkBtCndvMTsbK1zqmecKVAZcrowxX1Pqc_B0XdxwCNZSER_MgccfzSZ5QLYmrMA91Cv0HB9FQdREDIV8I2E_uVxzHbSVHrAVECrxyaWx0WHEHWVVekqgjSusV9rCqDlJZSC7qhKJMuAVqdkyWlTWX67', title: 'Mujer', link: 'Explorar Colección', to: '/category/women', span: '2' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9LuvFLYlk1hnl2oAUuZYExqLNNOtZFYgPk2DK6uY5kgZhjJbZBAFXdeLwKl3fyU45eNuOmmyqPkd0ZLmdfD-9_wHPVQlueyKSPLfw4a7ojze8nAb58Uz-WyTqBdN3jy2izzgexFBdT2HVDFQQnt_yFrkmTcbTi7Tq3SnQAzClLlFc7sDV4QVEUEpGofjEAvW18IIuTowsyEFAeoC9XsOVOFCQs3x9jHCplYSObbkbeoPtU5OoYUKjuKs5GCkYMroqznnXFcxZlp3P', title: 'Hombre', link: 'Explorar Colección', to: '/category/men', span: '1' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx1Pvg6Ih_mQ486m7_-0gAE3VdXQsmCF-uOxR-ZSNmvGIy_jI2otsCyhigkopeOtD6cKopScdLeBe-okS5OOGnLfSSXtPSgFEPQS9HvcyMyQikK-Xn5ELJ4M5EJw-4oYLHFQRAMsABQEVriC6Rg1xpqK1CY5eQwfbaiUpHWY56gtllQdYGgWoCIosr-tTMNms7SdwQ9Q1bN8PIn_HfM_C0G1z5VLsSedruB51HfBbKG83-OJJMLjEjl4YW3miB-c6cThKZ0-DzBfrh', title: 'Hogar', link: '', to: '/category/home', span: '1row' },
  { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOpUgVdY2bjJo33tlkjP_sGb87SwlGI8R_4bTv8w50s7z9m6v5fkL71IzU4kZRxGMfNovAkhV5Z0ZEirJAdQBfxFvg7DAIj648HLwNPvbL4t3eHym1gprgmlQHDE37hiG8qT3pbgoM9cfMl5_wMYibchJ5VXnQIgRMr9v7-EzkgKT-nI1XWirjYplO-USSOyaWSSYQbXWX4GpYlcw3Fxcpuk_1nnM5IYsY3Xtumzl5i7f2Yne0Bjxn649pXS9nrxvufnplUNJwKBAu', title: 'Accesorios', link: '', to: '/category/accesorios', span: '1row' },
];

export default function CategoryBento() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {categories.map((cat, i) => (
          <div key={i} className={[styles.card, styles['span' + cat.span]].filter(Boolean).join(' ')}>
            <img src={cat.img} alt={cat.title} className={styles.img} loading="lazy" />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h3 className={styles.title}>{cat.title}</h3>
              {cat.link && <a href={cat.to} className={styles.link}>{cat.link}</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}