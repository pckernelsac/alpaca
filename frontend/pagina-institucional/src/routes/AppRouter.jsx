import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { routes } from './routes';
import Loader from '@/components/feedback/Loader/Loader';
import PublicLayout from '@/layouts/PublicLayout/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';

function SuspenseWrapper({ children }) {
  return <Suspense fallback={<Loader fullPage />}>{children}</Suspense>;
}

export default function AppRouter() {
  const publicRoutes = routes.filter((r) => r.layout === 'public');
  const authRoutes = routes.filter((r) => r.layout === 'auth');
  const catchAll = routes.find((r) => r.path === '*');

  return (
    <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<SuspenseWrapper>{route.element}</SuspenseWrapper>}
            />
          ))}
        </Route>
        <Route element={<AuthLayout />}>
          {authRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<SuspenseWrapper>{route.element}</SuspenseWrapper>}
            />
          ))}
        </Route>
        {catchAll && (
          <Route
            path="*"
            element={<SuspenseWrapper>{catchAll.element}</SuspenseWrapper>}
          />
        )}
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  );
}
