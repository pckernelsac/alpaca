import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lleva el scroll al inicio en cada cambio de ruta.
 *
 * No alcanza con scrollTo(0): con rutas diferidas, el navegador restaura la
 * posicion anterior cuando el contenido termina de cargar y la pagina crece.
 * Desactivar `scrollRestoration` evita esa pelea.
 *
 * Los saltos van con `behavior: 'instant'` a proposito. La hoja de estilos
 * declara `scroll-behavior: smooth` para los enlaces internos, y sin este
 * `instant` cada salto de ruta arranca una animacion que el propio cambio de
 * contenido cancela a mitad de camino: el resultado es que no se mueve nada.
 *
 * Con ancla (`/colecciones#fibras`) el destino es la seccion, no el inicio.
 * react-router cambia la URL sin recargar, asi que al navegador no le toca
 * buscarla: hay que ir a buscar el elemento a mano. Y no una sola vez —
 * mientras cargan las secciones de arriba la pagina se estira y el ancla se va
 * hacia abajo, de modo que un unico salto deja al lector en cualquier lado. Se
 * reencuadra durante un par de segundos y se corta apenas la persona toca el
 * scroll: a partir de ahi manda ella.
 */
const ESPERA_ANCLA = 2500;

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let vigente = true;

    const encuadrar = () => {
      if (!vigente) return;
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
    };

    const soltar = () => {
      vigente = false;
      arbol.disconnect();
      medida.disconnect();
      clearTimeout(limite);
      window.removeEventListener('wheel', soltar);
      window.removeEventListener('touchstart', soltar);
      window.removeEventListener('keydown', soltar);
    };

    // Dos vigilantes porque son dos causas distintas: el arbol cambia cuando
    // llega la respuesta de la API, y el alto cambia tambien sin tocar el
    // arbol —al cargar una tipografia o una imagen sin proporcion declarada—.
    // Los dos ya vienen agrupados por el navegador, asi que se reencuadra en el
    // acto: pasarlo por requestAnimationFrame lo dejaria colgado en una pestania
    // en segundo plano, que es justo cuando el navegador no dibuja cuadros.
    const arbol = new MutationObserver(encuadrar);
    const medida = new ResizeObserver(encuadrar);

    encuadrar();
    arbol.observe(document.body, { childList: true, subtree: true });
    medida.observe(document.body);
    const limite = setTimeout(soltar, ESPERA_ANCLA);

    window.addEventListener('wheel', soltar, { passive: true });
    window.addEventListener('touchstart', soltar, { passive: true });
    window.addEventListener('keydown', soltar);

    return soltar;
  }, [pathname, hash]);

  return null;
}
