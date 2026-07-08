import ProfileMenu from '@/components/ecommerce/ProfileMenu/ProfileMenu';
import WishlistGrid from './sections/WishlistGrid/WishlistGrid';
import InspiredBy from './sections/InspiredBy/InspiredBy';
import styles from './Wishlist.module.css';

export default function Wishlist() {
  return (
    <div className={styles.layout}>
      <ProfileMenu userName="Julianne" />
      <div className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Mi lista de deseos</h1>
            <p className={styles.count}>12 artículos guardados</p>
          </div>
          <button className={styles.shareBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>ios_share</span>
            <span>Compartir lista</span>
          </button>
        </header>
        <WishlistGrid />
        <InspiredBy />
      </div>
    </div>
  );
}
