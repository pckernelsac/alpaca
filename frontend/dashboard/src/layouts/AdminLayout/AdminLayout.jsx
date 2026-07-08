import Sidebar from '@components/layout/Sidebar/Sidebar';
import Navbar from '@components/layout/Navbar/Navbar';
import ErrorBoundary from '@components/feedback/ErrorBoundary/ErrorBoundary';
import ToastContainer from '@components/feedback/Toast/Toast';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.wrapper}>
        <Navbar />
        <main className={styles.main}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}