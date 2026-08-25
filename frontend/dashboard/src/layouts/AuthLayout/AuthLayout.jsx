import ErrorBoundary from '@components/feedback/ErrorBoundary/ErrorBoundary';
import ToastContainer from '@components/feedback/Toast/Toast';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ children }) {
  return (
    <div className={styles.layout}>
      <ErrorBoundary>{children}</ErrorBoundary>
      <ToastContainer />
    </div>
  );
}
