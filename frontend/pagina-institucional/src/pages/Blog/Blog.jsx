import styles from './Blog.module.css';

export default function Blog() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blog</h1>
      <p className={styles.description}>Blog y noticias</p>
    </div>
  );
}
