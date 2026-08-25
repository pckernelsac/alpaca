import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from './components/layout/RequireAuth';
import { Shell } from './components/layout/Shell';
import { LoadingBlock } from './components/ui/Primitives';
import { Login } from './pages/Login';
import { Overview } from './pages/Overview';

// El panel y el login entran en el bundle inicial; el resto se parte por ruta,
// que son pantallas pesadas y no todos los roles las abren.
const Products = lazy(() => import('./pages/Products').then((m) => ({ default: m.Products })));
const Orders = lazy(() => import('./pages/Orders').then((m) => ({ default: m.Orders })));
const OrderDetail = lazy(() =>
  import('./pages/Orders').then((m) => ({ default: m.OrderDetail })),
);
const Inventory = lazy(() => import('./pages/Inventory').then((m) => ({ default: m.Inventory })));
const Shipments = lazy(() => import('./pages/Shipments').then((m) => ({ default: m.Shipments })));
const Customers = lazy(() => import('./pages/Customers').then((m) => ({ default: m.Customers })));
const Users = lazy(() => import('./pages/Users').then((m) => ({ default: m.Users })));
const Content = lazy(() => import('./pages/Content').then((m) => ({ default: m.Content })));
const Marketing = lazy(() => import('./pages/Marketing').then((m) => ({ default: m.Marketing })));
const Audit = lazy(() => import('./pages/Audit').then((m) => ({ default: m.Audit })));
const Settings = lazy(() => import('./pages/Settings').then((m) => ({ default: m.Settings })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>

      <Suspense fallback={<LoadingBlock />}>
        <Routes>
          <Route path="/ingresar" element={<Login />} />

          <Route
            element={
              <RequireAuth>
                <Shell />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Overview />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/pedidos" element={<Orders />} />
            <Route path="/pedidos/:id" element={<OrderDetail />} />
            <Route path="/inventario" element={<Inventory />} />
            <Route path="/envios" element={<Shipments />} />
            <Route path="/clientes" element={<Customers />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/contenido" element={<Content />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/auditoria" element={<Audit />} />
            <Route path="/ajustes" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
