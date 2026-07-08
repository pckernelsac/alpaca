import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Loader from '@components/feedback/Loader/Loader';
import MainLayout from '@layouts/MainLayout/MainLayout';
import AdminLayout from '@layouts/AdminLayout/AdminLayout';
import AuthLayout from '@layouts/AuthLayout/AuthLayout';
import ProtectedRoute from '@guards/ProtectedRoute';

const layoutMap = {
  main: MainLayout,
  admin: AdminLayout,
  auth: AuthLayout,
};

function RouteWithLayout({ route }) {
  const Layout = layoutMap[route.layout] || MainLayout;

  return (
    <Layout>
      <Suspense fallback={<Loader fullPage />}>
        <route.element />
      </Suspense>
    </Layout>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>
                  <RouteWithLayout route={route} />
                </ProtectedRoute>
              ) : (
                <RouteWithLayout route={route} />
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}