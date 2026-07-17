import { useRef } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import styles from './ImageUploader.module.css';

export default function ImageUploader({ onUpload, currentImage, label, className = '' }) {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (file) onUpload?.(file);
  }

  function handleRemove(e) {
    e.stopPropagation();
    onUpload?.(null);
  }

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.dropzone} onClick={handleClick}>
        {currentImage ? (
          <div className={styles.preview}>
            <img src={currentImage} alt="Preview" className={styles.img} />
            <button className={styles.removeBtn} onClick={handleRemove} type="button">
              <FiX size={16} />
            </button>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <FiUpload size={24} />
            <span className={styles.placeholderText}>Haz clic para subir una imagen</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className={styles.input}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
