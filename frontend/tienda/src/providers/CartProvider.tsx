import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { ApiRequestError, cartApi } from '../lib/api';
import type { Cart } from '../lib/types';
import { useAuth } from './AuthProvider';
import { useToast } from './ToastProvider';

interface CartContextValue {
  cart: Cart | null;
  count: number;
  loading: boolean;
  /** Distinto de `loading`: marca una mutación en curso, no la carga inicial. */
  busy: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (productId: string, quantity?: number, variantId?: string) => Promise<boolean>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clear: () => Promise<void>;
  applyCoupon: (code: string) => Promise<boolean>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

const EMPTY: Cart = {
  id: '',
  items: [],
  subtotal: 0,
  discount: 0,
  tax: 0,
  shippingFee: 0,
  total: 0,
  couponId: null,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const toast = useToast();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      setCart(await cartApi.get());
    } catch {
      setCart(EMPTY);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (authLoading) return;
    void refresh();
  }, [authLoading, refresh]);

  /** Envuelve una mutación: marca busy, actualiza el carrito y traduce errores. */
  const mutate = useCallback(
    async (action: () => Promise<Cart>, onError?: (message: string) => void) => {
      setBusy(true);
      try {
        setCart(await action());
        return true;
      } catch (error) {
        const message =
          error instanceof ApiRequestError ? error.message : 'No pudimos actualizar el carrito';
        if (onError) onError(message);
        else toast.error(message);
        return false;
      } finally {
        setBusy(false);
      }
    },
    [toast],
  );

  const addItem = useCallback(
    async (productId: string, quantity = 1, variantId?: string) => {
      if (!isAuthenticated) {
        toast.error('Iniciá sesión para agregar productos al carrito');
        return false;
      }
      const done = await mutate(() => cartApi.addItem(productId, quantity, variantId));
      if (done) {
        toast.success('Agregado al carrito');
        setDrawerOpen(true);
      }
      return done;
    },
    [isAuthenticated, mutate, toast],
  );

  const updateItem = useCallback(
    async (itemId: number, quantity: number) => {
      await mutate(() => cartApi.updateItem(itemId, quantity));
    },
    [mutate],
  );

  const removeItem = useCallback(
    async (itemId: number) => {
      const done = await mutate(() => cartApi.removeItem(itemId));
      if (done) toast.notify('Producto quitado del carrito');
    },
    [mutate, toast],
  );

  const clear = useCallback(async () => {
    await mutate(() => cartApi.clear());
  }, [mutate]);

  const applyCoupon = useCallback(
    async (code: string) => {
      const done = await mutate(() => cartApi.applyCoupon(code));
      if (done) toast.success('Cupón aplicado');
      return done;
    },
    [mutate, toast],
  );

  const count = useMemo(
    () => cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      count,
      loading,
      busy,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addItem,
      updateItem,
      removeItem,
      clear,
      applyCoupon,
      refresh,
    }),
    [cart, count, loading, busy, drawerOpen, addItem, updateItem, removeItem, clear, applyCoupon, refresh],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
}
