import styles from './HomeGallery.module.css';

const images = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA7ifpqgs1To9n_RXl4Pi-v-905cYLZwUwrUTiRj_f6sj0p3MyLAv4_2QEsUodR3smj-p1XDbR-Ca0n6K5JzV-o-AmVqMPEo2odR_BTJA0qZuyOWPm3RFVpezRAyXQ1eAV9VX9vb01jB0-Lpw8GyivC5Hp9K1Di0Risz0NB-DGoWJEloEeJqlRQLZ0wCjljo9119j1X6VBjkrZw0Cx9zVXnvcECIO1H1oif28d1nhicZcMhPqbUxSoXtSk46OZ1JueVXG9--qdA9eM',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDp_7toZvwwzpgPZY0kyKkT6mbDKUip_bYz0bT5nf1X2HcIEvH3HgNccWzWJo-vB9f7i7Qbtk5d5jZhesfjmQ48tUV4iMNdnzBqwypllK9ftTELGzuPe4Ugc10ehr-qZ30YGYhA7zyrSTLwCeXmeVct81Fi9MWtgoNXdDwET055Z7W-KLrOnpgM1B1jNPWyx7hUHKJ44m4AtVpBMLDiR5ZyisuJ15ChjaBKv4PYU2Bq5OVUr_-MPBO8QXVOEs6DUh7QjL974i-wmmU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA8YBdulhXNZWF7s2Bj-B_pTYkR53dH7DoErZ6ulsau6WxhFBk94hty1pEugKZUWF1LzGcghR_5QSNJD53wAUN58FvMFhEPiiNv1SIqCvGQF3b3HBGo-WYHTl7ycJ8X3P2NFSnEinIQ2oy39aWP7OrlUjqE0doQU5kA6arQkrv0nIYVqKhikUPYvNpJoFl1Vybu-cwJ9H6JIC5MnQYQfmWYQMZdck0wMQfNmvRkgfnSkkYDNVHbvcrE1jmnfHTAPNLik4HYtsXPzSM',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDXhnuxs5_mfCE-W0dU80MTTsJq1iB2EQ0epvf_rfUHjmEy6KQ4uqs-bEF_WtgGnixgv52bhiayTzVNZCh3WVtuW6bkWzQLlwTk_yZW51aweMJ-TCXQ_TenXU5F9SuPaSEIfmZcK16RYY8NYsRhNXfpyFFxAT3JfJbBzyutuIiC3J0dbjsTswR4BPwK7ywnlBZc8KHrnRwEhj3L_9S8JUa-DRgxN15iziEpoPT3ZYaEZ7tOyuDdV031CY1zr2e7XQ2asiXVf57WFQs',
];

export default function HomeGallery() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Visiones del Peru</h2>
          <a className={styles.hashtag} href="#">
            @ALPACART_TEXTILES
          </a>
        </div>
        <div className={styles.grid}>
          {images.map((src, i) => (
            <div key={i} className={styles.item}>
              <img src={src} alt="" className={styles.image} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
