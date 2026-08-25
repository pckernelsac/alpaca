import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lleva el scroll al inicio en cada cambio de ruta.
 *
 * No alcanza con scrollTo(0): con rutas diferidas, el navegador restaura la
 * posicion anterior cuando el contenido termina de cargar y la pagina crece.
 * Desactivar `scrollRestoration` evita esa pelea.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
