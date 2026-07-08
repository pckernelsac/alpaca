import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import Badge from '@/components/common/Badge/Badge';
import styles from './PromoProducts.module.css';

const products = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM3hxaiQOMP06ERMkQh6r59-g3ICRvDJYtge20f8twSR-E5c5D6g1A0mlku1_zmbNRDBquFvdEIds5SQ2ZT7jBi4DG42z_ZlDX0VsKeq7h8CHbM5jl2vz64Qv4Tm-d1Zi_NSGPxK4CeU4xnDvRTaNBT9z81h2fUX7dvJ1wuK7UtEPWFsXD9lfERMFHy2APMOiUV4NEAPS2esDH0BBxP3H_w5_pUZobdsC_UvA9aW72tkVXsU7RQAjr_v-pg5_397m8SbT-y_5f0CE',
    badge: 'Edicion Limitada',
    title: 'Bufanda Infinity Charcoal',
    desc: 'Tejido a mano con hilos de 18 micras para una suavidad inigualable.',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDww4C8KvDwxU1rzDc28B0lMpdeueuZRPKNsCjp6UNpFVw3NK_OzoYbdXaRAYUiJ_t5Xh3ILtPplfFpbRgGdWCnO4bm7fzaRFHSQV-JVICuzclgShILFjcb_2LvujH0sOBNdKLLNtk1KdcEJ8SlHKrnStVPl_P6N926ReK1gBZweVaVkabu4ZIbsA7bR6whNauvpAIkXFNp9PQY6z4oeRQc40wzFTrYjqhoSbF9FhNml3gHHQFkC4-FcgusdphQQX6278sc5fPcza0',
    badge: 'Propuesta Estacional',
    title: 'Blazer Sastre Camel',
    desc: 'La estructura del sastre clasico fusionada con el confort andino.',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjtnipHvCuPSPJQrMB6jlLhHNthTGg1OFDwFWdgNhVNm4nq_5EcX_dW96juo5vwdWXSnL55evCWOpQP5MXvYlh8g0V_Do1kPdAdt0YjrtJDpDttYvQpcB2YUnp3AsZiiBebTjMNkVIJi2N8GGhOJDNVdpYAMJfnRY6EfXpaKQi42EvPKqBHTeAekxRhYmkZhoJgaaua7Dmhzk49YgrHh-pZf-2Mim-y81D4CrYMyv42Pc-7RaebmQFjeKl7Zuv6fCuDrUn5Fulwb4',
    badge: 'Ultimas Unidades',
    title: 'Manta Hogar Texturizada',
    desc: 'Una pieza de herencia que define el espacio con calidez y nobleza.',
  },
];

export default function PromoProducts() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Eyebrow>Curaduria</Eyebrow>
          <h2 className={styles.title}>Seleccion de Temporada</h2>
        </div>
        <div className={styles.grid}>
          {products.map((p, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardImg}>
                <img src={p.img} alt={p.title} className={styles.cardImgEl} loading="lazy" />
              </div>
              <Badge variant="primary" size="sm">
                {p.badge}
              </Badge>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
