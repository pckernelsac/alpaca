import styles from './CatalogFilters.module.css';

const filters = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKK3_sZ_Vi2oc6tvqXKL6_UZ45EPvuOKepk1SEcbP2YcERJ6bstIqyWfDSyRTH-IBOsT0Q8M7M4UIcI3nwh0Lc2OJRaP7eccJaM3V9AjTYLdmiLECH9ye3mnyzT8RXsgP-Tf13aKghjGrsI0XBwgXr_ijRgspIjGqvS7kgfOAGn8eUbrfGv9zMuU6tMOTF2cCZeH2at420T1UzQRMAW-OZLo_EKaMO9__yyvviMCMLb9e6Y-YmX4z4UtT29vxAuJf9e_c97vEURXk',
    label: 'Baby Alpaca',
    active: true,
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4zXJwAfvSMQiiV5q8xowx0Bv-XknC_pVwvvHYVfw5CiPjgpJ_v7ahvCWJJZ9-EAjNA4IPQxTFVERFXg1AFi_3dcTV7pYPf9pn03MgGKjaTMao-nx8rYNjvVBcf7vaCOb2uFkupZwWusDdGJdaoHaqqF0G5Xmn7XUAErpeUDd9tZLzdRAqqxoKpEhfjMpNS-nKUHxEg-RSd1qXxd8BI10S7qt3napocd397xPtsz_9_1qNm4bkn1Be5d4kXNptYMaC6wjvVps3pHI',
    label: 'Vicuna',
    active: false,
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6z7nDLqj-V9CtobwJT_eYfGelhmvtpCIaslDYObGGFRWohaNbx20B27SQ738_g3F6HamgHOMOSQZF-TYsb_cG1bSDH4P2eEKMeQDXOWm7LiAWRwECNOXTwY_9viMC-oEoZRtbzeCD5Y6Vu8ixHpldKP4MUHOOrdWEnkr4N8Rqht2Fm53XYCWTbqZnv3QUpk1_jN-MkPPqeh4FZgvaE46Rb5brv9vjT17sFb1NCV9hwZC28SqFVAw41-P74Qifg5_6A914mriSPxw',
    label: 'Mezcla Real',
    active: false,
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiOjHk_HaKLhFD47BLm8bF5ck86Q3iXAk8IKc6CAAEUhaIDm2v5WCQzRk2ndnscAb0r5PX6obMqpAgKLBsC1Bz1tgFdhpn6u4o-PTHg0EfrkJJci06meViWcnNrVKe1pYrdvySU5cUybA33nShGHJNChGIS3dMR0I_icCHJoPYJAENxML7zgB_YAJlAX9-B85wWA4ROED--vcVCmxOsEXLLCq0CHvmoU-e8g-22fzDUeYbfFGibs39nPCUr87WVBMeyzdqugcIGok',
    label: 'Tejido Artesanal',
    active: false,
  },
];

export default function CatalogFilters() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {filters.map((f, i) => (
          <button key={i} className={styles.btn}>
            <div
              className={[styles.imgWrap, f.active ? styles.activeBorder : '']
                .filter(Boolean)
                .join(' ')}
            >
              <div className={styles.img} style={{ backgroundImage: 'url(' + f.img + ')' }} />
            </div>
            <span
              className={[styles.label, f.active ? styles.labelActive : '']
                .filter(Boolean)
                .join(' ')}
            >
              {f.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
