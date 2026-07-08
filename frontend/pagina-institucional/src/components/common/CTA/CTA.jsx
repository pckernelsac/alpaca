import Button from '@/components/common/Button/Button';
import styles from './CTA.module.css';

export default function CTA({
  title,
  description,
  buttonText,
  buttonVariant = 'primary',
  onButtonClick,
  variant = 'primary',
  className = '',
}) {
  return (
    <section className={[styles.cta, styles[variant], className].filter(Boolean).join(' ')}>
      <div className={styles.content}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {description && <p className={styles.description}>{description}</p>}
        {buttonText && (
          <Button variant={buttonVariant} size="lg" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </section>
  );
}
