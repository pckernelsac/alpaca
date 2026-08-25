import { useCallback, useEffect, useState } from 'react';

import { ApiRequestError, catalogApi } from '../lib/api';
import type { Category, Collection, PageMeta, Product, ProductQuery } from '../lib/types';

interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

/**
 * Carga una lista de productos.
 *
 * Aborta la petición anterior al cambiar los filtros: sin eso, una respuesta
 * lenta de un filtro viejo puede pisar a una rápida del filtro nuevo.
 */
export function useProducts(params: ProductQuery) {
  const [state, setState] = useState<AsyncState<Product[]>>({
    data: [],
    loading: true,
    error: null,
  });
  const [meta, setMeta] = useState<PageMeta | null>(null);

  const key = JSON.stringify(params);

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, loading: true, error: null }));

    catalogApi
      .products(JSON.parse(key) as ProductQuery, controller.signal)
      .then((response) => {
        setState({ data: response.data, loading: false, error: null });
        setMeta(response.meta);
      })
      .catch((error: unknown) => {
        if ((error as Error).name === 'AbortError') return;
        setState({
          data: [],
          loading: false,
          error: error instanceof ApiRequestError ? error.message : 'No pudimos cargar el catálogo',
        });
      });

    return () => controller.abort();
  }, [key]);

  return { products: state.data, meta, loading: state.loading, error: state.error };
}

export function useProduct(id: string | undefined) {
  const [state, setState] = useState<AsyncState<Product | null>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setState({ data: null, loading: false, error: 'Producto no encontrado' });
      return;
    }

    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    catalogApi
      .product(id, controller.signal)
      .then((product) => setState({ data: product, loading: false, error: null }))
      .catch((error: unknown) => {
        if ((error as Error).name === 'AbortError') return;
        setState({
          data: null,
          loading: false,
          error: error instanceof ApiRequestError ? error.message : 'No pudimos cargar el producto',
        });
      });

    return () => controller.abort();
  }, [id]);

  return { product: state.data, loading: state.loading, error: state.error };
}

/** Categorías y colecciones cambian poco: se cachean en memoria del módulo. */
let categoryCache: Category[] | null = null;

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(categoryCache ?? []);
  const [loading, setLoading] = useState(categoryCache === null);

  useEffect(() => {
    if (categoryCache) return;
    const controller = new AbortController();

    catalogApi
      .categories(controller.signal)
      .then((rows) => {
        categoryCache = rows;
        setCategories(rows);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { categories, loading };
}

let collectionCache: Collection[] | null = null;

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>(collectionCache ?? []);
  const [loading, setLoading] = useState(collectionCache === null);

  useEffect(() => {
    if (collectionCache) return;
    const controller = new AbortController();

    catalogApi
      .collections(controller.signal)
      .then((rows) => {
        collectionCache = rows;
        setCollections(rows);
      })
      .catch(() => setCollections([]))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { collections, loading };
}

export function useReviews(productId: string | undefined) {
  const [state, setState] = useState({
    average: 0,
    count: 0,
    items: [] as { id: number; author: string; rating: number; text: string; tag: string | null; createdAt: string }[],
    loading: true,
  });

  const load = useCallback(() => {
    if (!productId) return;
    const controller = new AbortController();

    catalogApi
      .reviews(productId, controller.signal)
      .then((summary) => setState({ ...summary, loading: false }))
      .catch(() => setState((current) => ({ ...current, loading: false })));

    return () => controller.abort();
  }, [productId]);

  useEffect(() => load(), [load]);

  return state;
}
