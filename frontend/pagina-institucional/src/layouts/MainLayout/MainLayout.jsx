import { Outlet } from 'react-router-dom';
import ErrorBoundary from '@/components/feedback/ErrorBoundary/ErrorBoundary';
import ToastContainer from '@/components/feedback/Toast/Toast';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <ToastContainer />
    </div>
  );
}
