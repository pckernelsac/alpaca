import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '@components/common/Button/Button';
import styles from './NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Página no encontrada</h2>
      <p className={styles.description}>
        La página que buscas no existe o ha sido movida.
      </p>
      <Button onClick={() => navigate('/')}>
        <FiArrowLeft size={16} />
        Volver al inicio
      </Button>
    </div>
  );
}