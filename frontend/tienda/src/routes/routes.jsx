import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home/Home'));
const Cart = lazy(() => import('@/pages/Cart/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout/Checkout'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail/ProductDetail'));
const Collection = lazy(() => import('@/pages/Collection/Collection'));
const Category = lazy(() => import('@/pages/Category/Category'));
const Account = lazy(() => import('@/pages/Account/Account'));
const Addresses = lazy(() => import('@/pages/Addresses/Addresses'));
const Wishlist = lazy(() => import('@/pages/Wishlist/Wishlist'));
const Search = lazy(() => import('@/pages/Search/Search'));
const SearchResults = lazy(() => import('@/pages/SearchResults/SearchResults'));
const Thanks = lazy(() => import('@/pages/Thanks/Thanks'));
const Payment = lazy(() => import('@/pages/Payment/Payment'));
const OrderTracking = lazy(() => import('@/pages/OrderTracking/OrderTracking'));
const OrderConfirmed = lazy(() => import('@/pages/OrderConfirmed/OrderConfirmed'));
const OrderHistory = lazy(() => import('@/pages/OrderHistory/OrderHistory'));
const ProfileSettings = lazy(() => import('@/pages/ProfileSettings/ProfileSettings'));
const Login = lazy(() => import('@/pages/Login/Login'));
const Register = lazy(() => import('@/pages/Register/Register'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

const protectedRoutes = ['/account', '/addresses', '/wishlist', '/order/history', '/settings'];

export const routes = [
  { path: '/', element: <Home />, layout: 'main', protected: false },
  { path: '/cart', element: <Cart />, layout: 'main', protected: false },
  { path: '/checkout', element: <Checkout />, layout: 'main', protected: false },
  { path: '/product/:id', element: <ProductDetail />, layout: 'main', protected: false },
  { path: '/collection', element: <Collection />, layout: 'main', protected: false },
  { path: '/category/:slug', element: <Category />, layout: 'main', protected: false },
  { path: '/account', element: <Account />, layout: 'main', protected: true },
  { path: '/addresses', element: <Addresses />, layout: 'main', protected: true },
  { path: '/wishlist', element: <Wishlist />, layout: 'main', protected: true },
  { path: '/search/:query', element: <SearchResults />, layout: 'main', protected: false },
  { path: '/order/thanks', element: <Thanks />, layout: 'main', protected: false },
  { path: '/order/payment', element: <Payment />, layout: 'main', protected: false },
  { path: '/order/tracking/:id', element: <OrderTracking />, layout: 'main', protected: false },
  { path: '/order/confirmed', element: <OrderConfirmed />, layout: 'main', protected: false },
  { path: '/order/history', element: <OrderHistory />, layout: 'main', protected: true },
  { path: '/settings', element: <ProfileSettings />, layout: 'main', protected: true },
  { path: '/login', element: <Login />, layout: false, protected: false },
  { path: '/register', element: <Register />, layout: false, protected: false },
  { path: '/search', element: <Search />, layout: false, protected: false },
  { path: '*', element: <NotFound />, layout: 'main', protected: false },
];
