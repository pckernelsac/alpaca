import { Outlet } from 'react-router-dom';
import AnnouncementBar from '@/components/ecommerce/AnnouncementBar/AnnouncementBar';
import StoreHeader from '@/components/ecommerce/StoreHeader/StoreHeader';
import StoreNavbar from '@/components/ecommerce/StoreNavbar/StoreNavbar';
import StoreFooter from '@/components/ecommerce/StoreFooter/StoreFooter';
import ErrorBoundary from '@/components/feedback/ErrorBoundary/ErrorBoundary';
import ToastContainer from '@/components/feedback/Toast/Toast';
import styles from './StoreLayout.module.css';

export default function StoreLayout() {
  return (
    <div className={styles.layout}>
      <AnnouncementBar />
      <StoreHeader />
      <StoreNavbar />
      <main className={styles.main}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <StoreFooter />
      <ToastContainer />
    </div>
  );
}