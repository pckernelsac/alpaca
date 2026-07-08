import Rating from '@/components/ecommerce/Rating/Rating';
import styles from './ReviewCard.module.css';

export default function ReviewCard({ review, className = '' }) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <div className={styles.avatar}>{review.author.charAt(0).toUpperCase()}</div>
        <div>
          <p className={styles.author}>{review.author}</p>
          <p className={styles.date}>{review.date}</p>
        </div>
        <Rating value={review.rating} size="sm" />
      </div>
      {review.title && <h4 className={styles.title}>{review.title}</h4>}
      <p className={styles.body}>{review.body}</p>
    </div>
  );
}