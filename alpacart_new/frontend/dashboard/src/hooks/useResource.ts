import { useCallback, useEffect, useRef, useState } from 'react';

import { ApiRequestError } from '../lib/api';

interface ResourceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Carga un recurso remoto y expone { data, loading, error, reload }.
 *
 * Aborta la petición anterior en cada cambio de dependencias: sin eso, una
 * búsqueda tecleada rápido puede resolver fuera de orden y pintar el
 * resultado viejo sobre el nuevo.
 */
export function useResource<T>(
  loader: (signal: AbortSignal) => Promise<T>,
  deps: unknown[] = [],
): ResourceState<T> & { reload: () => void; setData: (value: T) => void } {
  const [state, setState] = useState<ResourceState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const [nonce, setNonce] = useState(0);
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    setState((current) => ({ ...current, loading: true, error: null }));

    loaderRef
      .current(controller.signal)
      .then((data) => {
        if (alive) setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!alive || (error as Error).name === 'AbortError') return;
        const message =
          error instanceof ApiRequestError ? error.message : 'No pudimos cargar los datos';
        setState({ data: null, loading: false, error: message });
      });

    return () => {
      alive = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const reload = useCallback(() => setNonce((value) => value + 1), []);
  const setData = useCallback((value: T) => {
    setState({ data: value, loading: false, error: null });
  }, []);

  return { ...state, reload, setData };
}

/** Rebota un valor: evita una petición por tecla en los buscadores. */
export function useDebounced<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
