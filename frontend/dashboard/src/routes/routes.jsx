import { lazy } from 'react';

const Home = lazy(() => import('@pages/Home/Home'));
const Login = lazy(() => import('@pages/Login/Login'));
const Register = lazy(() => import('@pages/Register/Register'));
const Products = lazy(() => import('@pages/Products/Products'));
const Categories = lazy(() => import('@pages/Categories/Categories'));
const Orders = lazy(() => import('@pages/Orders/Orders'));
const Customers = lazy(() => import('@pages/Customers/Customers'));
const Reports = lazy(() => import('@pages/Reports/Reports'));
const Settings = lazy(() => import('@pages/Settings/Settings'));
const NotFound = lazy(() => import('@pages/NotFound/NotFound'));

export const routes = [
  { path: '/', element: <Home />, layout: 'admin', protected: true },
  { path: '/products', element: <Products />, layout: 'admin', protected: true },
  { path: '/categories', element: <Categories />, layout: 'admin', protected: true },
  { path: '/orders', element: <Orders />, layout: 'admin', protected: true },
  { path: '/customers', element: <Customers />, layout: 'admin', protected: true },
  { path: '/reports', element: <Reports />, layout: 'admin', protected: true },
  { path: '/settings', element: <Settings />, layout: 'admin', protected: true },
  { path: '/login', element: <Login />, layout: 'auth', protected: false },
  { path: '/register', element: <Register />, layout: 'auth', protected: false },
  { path: '*', element: <NotFound />, layout: 'main', protected: false },
];
