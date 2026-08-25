import { useEffect } from 'react';
import { useGallery } from '@/hooks/useGallery';
import styles from './HomeGallery.module.css';

export default function HomeGallery() {
  const { images, loading, error, fetch } = useGallery();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Visiones del Perú</h2>
          <a className={styles.hashtag} href="#">
            @ALPACART_TEXTILES
          </a>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
            Cargando galería...
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--color-error)' }}>
            No se pudo cargar la galería desde el servidor.
          </div>
        )}

        {!loading && !error && images.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
            No hay imágenes en la galería actualmente.
          </div>
        )}

        {!loading && !error && images.length > 0 && (
          <div className={styles.grid}>
            {images.map((img, i) => (
              <div key={img.id || i} className={styles.item}>
                <img
                  src={img.url || img}
                  alt={img.altText || 'Visión Textil Alpacart'}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
