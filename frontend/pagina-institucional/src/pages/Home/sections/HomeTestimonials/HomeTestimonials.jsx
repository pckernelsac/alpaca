import { useEffect } from 'react';
import { useTestimonials } from '@/hooks/useTestimonials';
import styles from './HomeTestimonials.module.css';

export default function HomeTestimonials() {
  const { testimonials, loading, error, fetch } = useTestimonials();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={[styles.quoteIcon, 'material-symbols-outlined'].join(' ')}>
          format_quote
        </span>

        {loading && (
          <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', margin: '20px 0' }}>
            Cargando testimonios...
          </p>
        )}

        {error && !loading && (
          <p style={{ color: 'var(--color-error)', margin: '20px 0' }}>
            No se pudieron cargar los testimonios.
          </p>
        )}

        {!loading && !error && testimonials.length === 0 && (
          <p style={{ color: 'var(--color-text-muted)', margin: '20px 0' }}>
            No hay testimonios disponibles en este momento.
          </p>
        )}

        {!loading && !error && testimonials.length > 0 && (
          <div>
            <blockquote className={styles.quote}>
              &ldquo;{testimonials[0].text}&rdquo;
            </blockquote>
            <cite className={styles.cite}>
              &mdash; {testimonials[0].author.toUpperCase()}
              {testimonials[0].company ? `, ${testimonials[0].company.toUpperCase()}` : ''}
            </cite>
          </div>
        )}
      </div>
    </section>
  );
}
