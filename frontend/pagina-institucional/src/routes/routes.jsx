import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home/Home'));
const About = lazy(() => import('@/pages/About/About'));
const Catalog = lazy(() => import('@/pages/Catalog/Catalog'));
const Promotions = lazy(() => import('@/pages/Promotions/Promotions'));
const FAQ = lazy(() => import('@/pages/FAQ/FAQ'));
const Terms = lazy(() => import('@/pages/Terms/Terms'));
const Policies = lazy(() => import('@/pages/Policies/Policies'));
const Services = lazy(() => import('@/pages/Services/Services'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const Blog = lazy(() => import('@/pages/Blog/Blog'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

export const routes = [
  { path: '/', element: <Home />, layout: 'public', protected: false },
  { path: '/about', element: <About />, layout: 'public', protected: false },
  { path: '/catalogo', element: <Catalog />, layout: 'public', protected: false },
  { path: '/promociones', element: <Promotions />, layout: 'public', protected: false },
  { path: '/preguntas', element: <FAQ />, layout: 'public', protected: false },
  { path: '/terminos', element: <Terms />, layout: 'public', protected: false },
  { path: '/politicas', element: <Policies />, layout: 'public', protected: false },
  { path: '/services', element: <Services />, layout: 'public', protected: false },
  { path: '/contacto', element: <Contact />, layout: 'public', protected: false },
  { path: '/blog', element: <Blog />, layout: 'public', protected: false },
  { path: '*', element: <NotFound />, layout: false, protected: false },
];
