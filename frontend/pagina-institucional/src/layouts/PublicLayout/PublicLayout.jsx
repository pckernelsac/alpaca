import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ErrorBoundary from '@/components/feedback/ErrorBoundary/ErrorBoundary';
import ToastContainer from '@/components/feedback/Toast/Toast';
import styles from './PublicLayout.module.css';

export default function PublicLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
