import { useCallback, useEffect, useState } from 'react';

import { ApiRequestError, wishlistApi } from '../lib/api';
import type { WishlistEntry } from '../lib/types';
import { useAuth } from '../providers/AuthProvider';
import { useToast } from '../providers/ToastProvider';

/**
 * Favoritos compartidos entre componentes.
 *
 * Se guardan en un store de módulo con suscriptores en vez de un Context:
 * la ProductCard aparece decenas de veces por página y un Context haría
 * re-render de todo el árbol en cada toggle.
 */
let entries: WishlistEntry[] = [];
let loaded = false;
const subscribers = new Set<(rows: WishlistEntry[]) => void>();

function publish(rows: WishlistEntry[]) {
  entries = rows;
  subscribers.forEach((notify) => notify(rows));
}

export function resetWishlistCache() {
  entries = [];
  loaded = false;
  publish([]);
}

export function useWishlist() {
  const { isAuthenticated } = useAuth();
  const toast = useToast();
  const [items, setItems] = useState<WishlistEntry[]>(entries);
  const [loading, setLoading] = useState(!loaded);

  useEffect(() => {
    subscribers.add(setItems);
    return () => {
      subscribers.delete(setItems);
    };
  }, []);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      loaded = true;
      publish([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const rows = await wishlistApi.list();
      loaded = true;
      publish(rows);
    } catch {
      publish([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (loaded && entries.length > 0) {
      setLoading(false);
      return;
    }
    void refresh();
  }, [refresh]);

  const isFavourite = useCallback(
    (productId: string) => entries.some((entry) => entry.productId === productId),
    // `items` fuerza la revalidación cuando cambia el store.
    [items],
  );

  const toggle = useCallback(
    async (productId: string) => {
      if (!isAuthenticated) {
        toast.error('Iniciá sesión para guardar favoritos');
        return;
      }
      try {
        const result = await wishlistApi.toggle(productId);
        await refresh();
        toast.notify(result.added ? 'Agregado a favoritos' : 'Quitado de favoritos');
      } catch (error) {
        toast.error(
          error instanceof ApiRequestError ? error.message : 'No pudimos actualizar tus favoritos',
        );
      }
    },
    [isAuthenticated, refresh, toast],
  );

  return { items, loading, isFavourite, toggle, refresh };
}
