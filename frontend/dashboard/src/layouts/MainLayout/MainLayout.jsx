import ErrorBoundary from '@components/feedback/ErrorBoundary/ErrorBoundary';
import ToastContainer from '@components/feedback/Toast/Toast';
import styles from './MainLayout.module.css';

export default function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
      <ToastContainer />
    </div>
  );
}