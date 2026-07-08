import styles from './TestimonialCard.module.css';

export default function TestimonialCard({ quote, author, role, className = '' }) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <blockquote className={styles.quote}>{quote}</blockquote>
      <div className={styles.author}>
        {author && <span className={styles.name}>{author}</span>}
        {role && <span className={styles.role}>{role}</span>}
      </div>
    </div>
  );
}
