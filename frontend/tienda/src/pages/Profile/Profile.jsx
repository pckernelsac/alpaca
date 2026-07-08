import styles from './Profile.module.css';

export default function Profile() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Perfil</h1>
      <p className={styles.description}>Perfil del cliente</p>
    </div>
  );
}