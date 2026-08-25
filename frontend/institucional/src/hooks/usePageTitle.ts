import { useEffect } from 'react';

const SITE = 'Alpacart';

/** Título del documento por página. Restaura el anterior al desmontar. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} · ${SITE}` : SITE;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
