import { useState } from 'react';
import styles from './VariantSelector.module.css';

export default function VariantSelector({ colors = [], sizes = [] }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className={styles.wrapper}>
      <div>
        <span className={styles.label}>Elige tu tono</span>
        <div className={styles.swatches}>
          {colors.map((c, i) => (
            <button key={i} className={[styles.swatch, i === selectedColor ? styles.swatchActive : ''].filter(Boolean).join(' ')} style={{ background: c }} title={c} onClick={() => setSelectedColor(i)} />
          ))}
        </div>
      </div>
      <div>
        <div className={styles.sizeHeader}>
          <span className={styles.label}>Elige tu talla</span>
          <a className={styles.sizeGuide} href="#">Guía de tallas</a>
        </div>
        <div className={styles.sizes}>
          {sizes.map((s, i) => (
            <button key={i} className={[styles.sizeBtn, s.disabled ? styles.disabled : '', i === selectedSize ? styles.sizeActive : ''].filter(Boolean).join(' ')} disabled={s.disabled} onClick={() => setSelectedSize(i)}>{s.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}