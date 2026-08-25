import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { ToastProvider } from './providers/ToastProvider';
import './styles/tokens.css';
import './styles/base.css';

/**
 * `basename` sale de la `base` de Vite: al compilar es el prefijo bajo el que se
 * publica esta app y en desarrollo es `/`. Leerlo de ahi en vez de escribirlo a
 * mano evita que el router y los assets terminen apuntando a prefijos distintos.
 * react-router lo quiere sin la barra final.
 */
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter basename={BASENAME}>
              <App />
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
