import styles from './Avatar.module.css';

export default function Avatar({ src, alt = '', name, size = 'md', className = '' }) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  const classNames = [styles.avatar, styles[size], className]
    .filter(Boolean)
    .join(' ');

  if (src) {
    return <img src={src} alt={alt} className={classNames} />;
  }

  return (
    <div className={classNames}>
      {initials}
    </div>
  );
}