import { useEffect, useState } from 'react';

/**
 * Una petición de sólo lectura atada al ciclo de vida del componente.
 *
 * Todas las pantallas de este sitio hacen lo mismo: piden algo al montar, lo
 * muestran y se olvidan. En vez de repetir el useEffect con su AbortController
 * en cada una, vive acá una sola vez.
 *
 * `fetcher` se recibe como función y se ejecuta cuando cambia `key`, no cuando
 * cambia su identidad: definirla en línea es lo natural y no debería provocar
 * un bucle de peticiones.
 */
export function useResource<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  initial: T,
  key: string = '',
): { data: T; loading: boolean; error: string | null } {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let vigente = true;

    setLoading(true);
    setError(null);

    fetcher(controller.signal)
      .then((result) => {
        if (!vigente) return;
        setData(result);
      })
      .catch((cause: unknown) => {
        if (!vigente || controller.signal.aborted) return;
        setError(cause instanceof Error ? cause.message : 'No pudimos cargar el contenido');
      })
      .finally(() => {
        if (vigente) setLoading(false);
      });

    return () => {
      vigente = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data, loading, error };
}
