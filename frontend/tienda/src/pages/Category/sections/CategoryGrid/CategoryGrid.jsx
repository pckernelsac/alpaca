import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cartStore } from '@/stores/cartStore';
import Styles from './CategoryGrid.module.css';

const products = [
  { id: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_2977bxRQoi5YvB42Qxi8jRloI73jEOWkS6tE_MRkbNKImjrcWZa8s6FHUT1JcY3W9wa59TtKDqn1hGoLbAjFrNpUhPghGiha-VYYWT58U-2jZbphZ9D2EskKH8v0CYrPW0-TmuhlF_rdSoHJKR3Sf0XRW-YbzbszOVhxK71lIeJ2rCezKpPTxgUiDPfNCCqKTscl2DPJhRi75hwDFxcTk4A07I0xQ4NjiP5K1vTq40jMczNJwrciZTtIdiOaTfqocnRSL7e0so2J', title: 'Cárdigan Infinito', subtitle: '100% Alpaca Real', price: 420 },
  { id: 2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5fu0RPQyDnR_EDqmxWYDDLZeSNPT1Po8oVJSg4zNBNrhSvNb5ZnV_TU7eJuklPrvXmgMw033ACpSkybHf5LZXD5Y08Hq0W6JhgRhuAH1O6ugdeNk67IewlafEcWCENnoWRnfmeAmna9qiqlVLJ4lfBAmhEBH6T2x-EUW_BU33RZuFH9olazFDr9eZRsYsvjCjedAkkvcJqkcOOtLNVRSo-oYOqhSULbknf9oX6CjugovCNPKoy0YzkayZcWmMVNOyxyeKvirF7CHW', title: 'Poncho Andino Bruma', subtitle: 'Mezcla de Vicuña', price: 1250 },
  { id: 3, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsVLiwbjXzBgOHJltQsqX1sTBX1Ia8qpZVvG0EeACrBg_hpDSPMcJ3KHgwSDqX-IhXDuauqob9QnMfpn-wce2Lq43IhjxlIQ-WpzRZyBm_zTTAmMZiGOdPA36LRpJR9caH_5AOWp1OAvb9ZVVNjaUc12DsNrl_fwk4jClZPxDXphGQAk_haUcLGH65rTvFDEwtp8Y0KaYxEhPWobIqcnBaVQtLDQ3TL7_-QAr1Po1KdotpGJpNgoH_jD3w90KFjcmogj7eAdvw2imj', title: 'Chal Heritage', subtitle: '100% Baby Alpaca', price: 280 },
  { id: 4, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3xtV-3feGKrbW4TMQykfXz0vNKQjB9clrQoNq1slKWY6tVVd6aBi4Pe9sn3pnUJvoSPH3PHu3wtLQyrujP6xo_E-SxIrLAuppbNrt2vsiiNWAaocz2IVKLe7aQ0M1SUhPyFWnN0kfMFciwgEbb4rN2fWFw-X0O89J3HL-LAaSZNdjk3rLY3B4LYNx_b5k3jf9zrJuYEKi23z3aEFHNdDsETj4zuPqKvG640Lwp0GYQBrreurOFkG1EOZpJOZ-z-jc0vuGFf6h6qAf', title: 'Jersey Nube', subtitle: '100% Baby Alpaca', price: 395 },
  { id: 5, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAthtpo6SS1SKrWGtzp7kok2TRUqEMv6Vj2fL51LVO9a2qEru_pjh36QCI0qmhlJk4ffKDGVNdC_e8GW4pUZhDU_4svM1BaWsv42BRl2Uxas3d3HD0iFD3ym8DBnNnN3CgfToxcvyGBXA624UtngtxqFgaGW9bHVPVoKrF_XgFTIzp5xqKzMsE8secDp4brCplwY2QsaV72fUpbvDXEDbXloD6jllsgFEjs01Jm3OmWkKdBYycwi-KmCA7VdmIGTmvsWOb5_IJ4KDH-', title: 'Chal Solsticio', subtitle: 'Mezcla de Vicuña', price: 890 },
  { id: 6, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIndMPR7QWIXPF087XEjZEHvMs0f40_8ojeztWfpTmd_GjDXUKeEKv3gG9kZnBG0X4a8zJhpu_KLrOZJerS5AJQ3LUXD526FDKKcdKfrsDxfIPaAG9PoMBCEpUrpKrR1JXg-O2O9ASfSWgIpgGuvoYFYuixNhhbUaIRm-br5KeBszMha5IEPkhl-qOO39xrtxcLfYuYL-s4fAqBt0jYNb3pEUymdi2-ArMltrzvMD280y30B5qbEsnow3u9378DHOVcN3mI2l0b56Q', title: 'Chaleco Texturizado', subtitle: 'Alpaca Real', price: 310 },
];

export default function CategoryGrid() {
  const [sort, setSort] = useState('popular');

  const handleAddToCart = (product) => {
    cartStore.addItem({ ...product, quantity: 1 });
  };

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.sidebar}>
        <div className={Styles.filterSection}>
          <h3 className={Styles.filterTitle}>Categoria</h3>
          {['Ponchos','Chompas','Bufandas','Accesorios','Abrigos'].map((c) => (
            <button key={c} className={Styles.filterOpt}>{c}</button>
          ))}
        </div>
      </div>
      <div className={Styles.main}>
        <div className={Styles.toolbar}>
          <span className={Styles.count}>{products.length} Productos</span>
          <select className={Styles.sort} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">Más Populares</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
          </select>
        </div>
        <div className={Styles.grid}>
          {products.map((p) => (
            <div key={p.id} className={Styles.card}>
              <Link to={'/product/' + p.id} className={Styles.cardLink}>
                <div className={Styles.cardImg} />
                <h3 className={Styles.cardTitle}>{p.title}</h3>
                <p className={Styles.cardSub}>{p.subtitle}</p>
                <p className={Styles.cardPrice}>${p.price}.00</p>
              </Link>
              <button className={Styles.addBtn} onClick={() => handleAddToCart(p)}>Agregar al Carrito</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
