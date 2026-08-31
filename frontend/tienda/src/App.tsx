import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CartDrawer } from './components/shop/CartDrawer';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { RequireAuth } from './components/layout/RequireAuth';
import { LoadingBlock } from './components/ui/Primitives';
import { Home } from './pages/Home';

// Solo la Home entra en el bundle inicial; el resto se parte por ruta.
const Shop = lazy(() => import('./pages/Shop').then((m) => ({ default: m.Shop })));
const ProductDetail = lazy(() =>
  import('./pages/ProductDetail').then((m) => ({ default: m.ProductDetail })),
);
const Collections = lazy(() => import('./pages/Misc').then((m) => ({ default: m.Collections })));
const Cart = lazy(() => import('./pages/Cart').then((m) => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then((m) => ({ default: m.Checkout })));
const PayOrder = lazy(() => import('./pages/Payment').then((m) => ({ default: m.PayOrder })));
const OrderConfirmed = lazy(() =>
  import('./pages/Misc').then((m) => ({ default: m.OrderConfirmed })),
);
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Register').then((m) => ({ default: m.Register })));
const Account = lazy(() => import('./pages/Account').then((m) => ({ default: m.Account })));
const Orders = lazy(() => import('./pages/Orders').then((m) => ({ default: m.Orders })));
const OrderDetail = lazy(() =>
  import('./pages/Orders').then((m) => ({ default: m.OrderDetail })),
);
const Wishlist = lazy(() => import('./pages/Misc').then((m) => ({ default: m.Wishlist })));
const Faq = lazy(() => import('./pages/Misc').then((m) => ({ default: m.Faq })));
const Contact = lazy(() => import('./pages/Misc').then((m) => ({ default: m.Contact })));
const ContentPage = lazy(() =>
  import('./pages/Misc').then((m) => ({ default: m.ContentPage })),
);
const NotFound = lazy(() => import('./pages/Misc').then((m) => ({ default: m.NotFound })));

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <ScrollToTop />
      <Header />

      <main id="main" style={{ flex: 1 }}>
        <Suspense fallback={<LoadingBlock />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Shop />} />
            <Route path="/producto/:slug" element={<ProductDetail />} />
            <Route path="/colecciones" element={<Collections />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/ingresar" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/preguntas" element={<Faq />} />
            <Route path="/contacto" element={<Contact />} />

            <Route path="/nosotros" element={<ContentPage slug="nosotros" />} />
            <Route path="/sostenibilidad" element={<ContentPage slug="sostenibilidad" />} />
            <Route path="/envios" element={<ContentPage slug="envios" />} />
            <Route path="/devoluciones" element={<ContentPage slug="devoluciones" />} />
            <Route path="/terminos" element={<ContentPage slug="terminos" />} />
            <Route path="/privacidad" element={<ContentPage slug="privacidad" />} />

            <Route
              path="/checkout"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />
            <Route
              path="/pedido/:id/pagar"
              element={
                <RequireAuth>
                  <PayOrder />
                </RequireAuth>
              }
            />
            <Route
              path="/pedido/:orderNumber/confirmado"
              element={
                <RequireAuth>
                  <OrderConfirmed />
                </RequireAuth>
              }
            />
            <Route
              path="/cuenta"
              element={
                <RequireAuth>
                  <Account />
                </RequireAuth>
              }
            />
            <Route
              path="/pedidos"
              element={
                <RequireAuth>
                  <Orders />
                </RequireAuth>
              }
            />
            <Route
              path="/pedidos/:id"
              element={
                <RequireAuth>
                  <OrderDetail />
                </RequireAuth>
              }
            />
            <Route
              path="/favoritos"
              element={
                <RequireAuth>
                  <Wishlist />
                </RequireAuth>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
