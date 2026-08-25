import { useEffect } from 'react';

/**
 * Aparición al entrar en pantalla.
 *
 * Marca con `data-reveal` cualquier elemento y esto le agrega `is-visible` la
 * primera vez que asoma. Se hace con IntersectionObserver y no con listeners de
 * scroll para no correr en cada cuadro, y se deja de observar cada elemento
 * apenas apareció: la animación es de entrada, no un estado que haya que
 * mantener.
 *
 * El MutationObserver no es un lujo: media portada son secciones que piden sus
 * propios datos, así que sus elementos entran al árbol después de que la página
 * ya montó. Sin él, esos bloques se quedaban en opacidad 0 para siempre —
 * repetir el registro en cada render tampoco alcanza, porque la página que
 * llama al hook no vuelve a renderizarse cuando responde la petición de un hijo.
 *
 * Si el navegador no lo soporta, o si quien mira pidió menos movimiento, todo
 * queda visible de entrada — el CSS ya deja `data-reveal` legible por defecto
 * bajo `prefers-reduced-motion`.
 */
export function useReveal() {
  useEffect(() => {
    const pendientes = () =>
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');

    if (typeof IntersectionObserver === 'undefined') {
      const destapar = () => pendientes().forEach((el) => el.classList.add('is-visible'));
      destapar();
      const mutaciones = new MutationObserver(destapar);
      mutaciones.observe(document.body, { childList: true, subtree: true });
      return () => mutaciones.disconnect();
    }

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add('is-visible');
          observer.unobserve(entrada.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );

    // Observar un elemento ya observado no hace nada, así que registrar de más
    // es inofensivo. El navegador ya agrupa las mutaciones en una sola llamada;
    // aplazarlas a un requestAnimationFrame dejaría la página invisible en una
    // pestaña en segundo plano, que es justo donde no se dibujan cuadros.
    const registrar = () => pendientes().forEach((el) => observer.observe(el));

    registrar();

    const mutaciones = new MutationObserver(registrar);
    mutaciones.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutaciones.disconnect();
      observer.disconnect();
    };
  }, []);
}
