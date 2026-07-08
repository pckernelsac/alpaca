import styles from './Login.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.description}>Inicio de sesión del administrador</p>
    </div>
  );
}