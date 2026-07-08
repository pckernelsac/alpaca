import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Loader from '@/components/feedback/Loader/Loader';
import StoreLayout from '@/layouts/StoreLayout/StoreLayout';
import ProtectedRoute from '@/components/guards/ProtectedRoute/ProtectedRoute';

function SuspenseWrapper({ children }) {
  return <Suspense fallback={<Loader fullPage />}>{children}</Suspense>;
}

export default function AppRouter() {
  const publicMainRoutes = routes.filter((r) => r.layout === 'main' && !r.protected);
  const protectedMainRoutes = routes.filter((r) => r.layout === 'main' && r.protected);
  const standaloneRoutes = routes.filter((r) => r.layout === false && r.path !== '*');
  const catchAll = routes.find((r) => r.path === '*');

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          {publicMainRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<SuspenseWrapper>{route.element}</SuspenseWrapper>} />
          ))}
          {protectedMainRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={
              <ProtectedRoute><SuspenseWrapper>{route.element}</SuspenseWrapper></ProtectedRoute>
            } />
          ))}
          {catchAll && (
            <Route path="*" element={<SuspenseWrapper><catchAll.element /></SuspenseWrapper>} />
          )}
        </Route>
        {standaloneRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<SuspenseWrapper>{route.element}</SuspenseWrapper>} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
