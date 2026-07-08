import { Outlet } from 'react-router-dom';
import ErrorBoundary from '@/components/feedback/ErrorBoundary/ErrorBoundary';
import ToastContainer from '@/components/feedback/Toast/Toast';
import styles from './AuthLayout.module.css';

export default function AuthLayout() {
  return (
    <div className={styles.layout}>
      <ErrorBoundary>
        <div className={styles.container}>
          <div className={styles.card}>
            <Outlet />
          </div>
        </div>
      </ErrorBoundary>
      <ToastContainer />
    </div>
  );
}
