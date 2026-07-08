import { useState } from 'react';
import styles from './ProductGallery.module.css';

export default function ProductGallery({ images = [], className = '' }) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.main}>
        <img src={images[active]} alt="" className={styles.mainImg} />
      </div>
      <div className={styles.thumbs}>
        {images.map((img, i) => (
          <button key={i} className={[styles.thumb, i === active ? styles.thumbActive : ''].filter(Boolean).join(' ')} onClick={() => setActive(i)}>
            <img src={img} alt="" className={styles.thumbImg} />
          </button>
        ))}
      </div>
    </div>
  );
}