import Eyebrow from '@/components/common/Eyebrow/Eyebrow';
import Gallery from '@/components/feedback/Gallery/Gallery';
import styles from './AboutGallery.module.css';

const images = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbFwzUxKLapmDRBiuPKBYnNYhguHq1vQmp_OT51EqIkUKAFMnb5e30ImzIbrtz0sll4M7mIyi7m-v2Q7s-wVBVVHpKv5Sm4Srgua6J0h1p8Fv73b4rQk47CpeH4KDKmo_4SEpl7ZXHHG08vyn9J1xSFTVb0n2LZmy4Iyj1hvO1oSTg8T60OF0rU-P_pJsB-35gCVYxwMHYj88fusZRVcVKrbFkES_RbfOms6OR84ExBQ0rl6vVUC2AFW85l4DLtHF1Yf1gJwXUtqw',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJMnD7qM0chat8satXcCrDzDr_MubEozNvVMjFrozOMXkhJr2Pns5gcZ9DGnYd69WaSptr5bC_JGritFcb__WR-QOe3STVlQ35-KgYZ-KJsrBXqtn2QT9d_Nrccp08X-6mmJb8IQSTe9OrFdUvmDATJVyG6OMgbLgGWXjCdpUEjhAeoliESWn42GcRsydN8y2jmu4sqIN71w_Y6J2r480U9-G_tW3a70qK2N4LVM6NlLdm-SA6WptLMcMgyqmE0etrS_hu8r_VR3Y',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdxM_AmzDFoU-1J__R9nHJMPNaAyaKXZdYU08uior1kPXanK_9uDUyXCMRzPxtsvqILL0rSYRip3r_ccGv6CT1UCmE9UPLVWrsKMzJ699fUB3--j9vjFaJifCE8ANjkoH1YzNajsqsOjsltSxo5dps417Q1rLuZ-JPGxsQHWHFuwiRr9ub6Y4iQiKeqHSzx1Cx0A9tlRrc6seQxclZWe91q3GbbWy-hXgwJL2T1SxwwACWTOpZmebjWjQy2467NHQEhrMurTHs-Kk',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvsdDsnc25mqzF0Ncm9aYGg9pLii9woNBXMXR4AQX14KsjnuB8NhrwwqFE8yfBSrWzIgKqEHGwCbEsIDn_P8Wj2Yx0j5hKnLad-2yTzDFpkvYfkwbER_9OKYpdYJ_fkugxkVJ9NKILSPWMPDyT1g9JGt-zpYiTbTHFNOa1yLIhiBXsX9kla6_Ldw-LxXFxp4hEk1dHan8RPOwidvbiy8D7qfaaG0jj0zTmzMmTSR6BY3xRNRQqJnV71u_WhW4b5eYXmUd9qL-Bndg',
  },
];

export default function AboutGallery() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <Eyebrow>Galeria Curada</Eyebrow>
            <h2 className={styles.title}>Visiones de Peru.</h2>
          </div>
        </div>
        <Gallery items={images} columns={4} gap="xs" />
      </div>
    </section>
  );
}
