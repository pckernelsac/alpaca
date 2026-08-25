import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { ApiRequestError, cartApi, catalogApi } from '../lib/api';
import {
  addGuestItem,
  clearGuestCart,
  emptyGuestCart,
  getGuestCart,
  readGuestItems,
  removeGuestItem,
  updateGuestItem,
} from '../lib/guestCart';
import type { Cart } from '../lib/types';
import { useAuth } from './AuthProvider';
import { useToast } from './ToastProvider';

interface CartContextValue {
  cart: Cart | null;
  count: number;
  loading: boolean;
  /** Distinto de `loading`: marca una mutación en curso, no la carga inicial. */
  busy: boolean;
  /** El carrito vive en el navegador, sin sesión. Lo miran las pantallas para
   *  explicar lo único que un invitado todavía no puede hacer: cupones. */
  isGuest: boolean;
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
      // El carrito de invitado sale de localStorage: no hay red de por medio.
      setCart(getGuestCart());
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

  /** Solo interesa el flanco de "sin sesión" a "con sesión", no el valor en sí:
   *  por eso un ref y no estado. */
  const hadSession = useRef(false);

  useEffect(() => {
    if (authLoading) return;

    const wasGuest = !hadSession.current;
    hadSession.current = isAuthenticated;

    async function sync() {
      if (isAuthenticated && wasGuest) {
        const pending = readGuestItems();
        if (pending.length > 0) {
          // `loading` arriba durante todo el volcado: sin esto el checkout ve
          // el carrito del servidor todavía vacío y rebota a /carrito justo
          // después del login.
          setLoading(true);
          let perdidas = 0;

          // Secuencial a propósito: cada llamada devuelve el carrito entero y
          // lo muta, así que en paralelo se pisarían entre ellas.
          for (const line of pending) {
            if (!line.productId) continue;
            try {
              await cartApi.addItem(line.productId, line.quantity, line.variantId ?? undefined);
            } catch {
              // Sin stock o producto retirado mientras miraba: se pierde esa
              // línea, pero el resto del carrito llega igual.
              perdidas += 1;
            }
          }

          clearGuestCart();
          if (perdidas > 0) {
            toast.notify(
              perdidas === 1
                ? 'Una pieza de tu carrito ya no está disponible'
                : `${perdidas} piezas de tu carrito ya no están disponibles`,
            );
          }
        }
      }

      await refresh();
    }

    void sync();
  }, [authLoading, isAuthenticated, refresh, toast]);

  /** Envuelve una mutación contra el backend: marca busy y traduce errores. */
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

  /** Igual que `mutate` pero para el carrito local, que resuelve sin red y
   *  lanza Error pelado (stock, variante inválida) en vez de ApiRequestError. */
  const mutateGuest = useCallback(
    async (action: () => Cart | Promise<Cart>) => {
      setBusy(true);
      try {
        setCart(await action());
        return true;
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'No pudimos actualizar el carrito');
        return false;
      } finally {
        setBusy(false);
      }
    },
    [toast],
  );

  const addItem = useCallback(
    async (productId: string, quantity = 1, variantId?: string) => {
      const done = isAuthenticated
        ? await mutate(() => cartApi.addItem(productId, quantity, variantId))
        : // Sin sesión la línea se arma acá: el producto se pide al catálogo,
          // que es público, y la variante se resuelve igual que en el backend.
          await mutateGuest(async () =>
            addGuestItem(await catalogApi.product(productId), quantity, variantId),
          );

      if (done) {
        toast.success('Agregado al carrito');
        setDrawerOpen(true);
      }
      return done;
    },
    [isAuthenticated, mutate, mutateGuest, toast],
  );

  const updateItem = useCallback(
    async (itemId: number, quantity: number) => {
      if (isAuthenticated) await mutate(() => cartApi.updateItem(itemId, quantity));
      else await mutateGuest(() => updateGuestItem(itemId, quantity));
    },
    [isAuthenticated, mutate, mutateGuest],
  );

  const removeItem = useCallback(
    async (itemId: number) => {
      const done = isAuthenticated
        ? await mutate(() => cartApi.removeItem(itemId))
        : await mutateGuest(() => removeGuestItem(itemId));
      if (done) toast.notify('Producto quitado del carrito');
    },
    [isAuthenticated, mutate, mutateGuest, toast],
  );

  const clear = useCallback(async () => {
    if (isAuthenticated) await mutate(() => cartApi.clear());
    else await mutateGuest(() => emptyGuestCart());
  }, [isAuthenticated, mutate, mutateGuest]);

  const applyCoupon = useCallback(
    async (code: string) => {
      if (!isAuthenticated) {
        // Validar un cupón lo hace el backend y exige sesión. No se guarda el
        // código: ingresar es el paso siguiente igual, y ahí se aplica.
        toast.notify('Ingresá para aplicar tu cupón');
        return false;
      }
      const done = await mutate(() => cartApi.applyCoupon(code));
      if (done) toast.success('Cupón aplicado');
      return done;
    },
    [isAuthenticated, mutate, toast],
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
      isGuest: !isAuthenticated,
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
    [
      cart,
      count,
      loading,
      busy,
      isAuthenticated,
      drawerOpen,
      addItem,
      updateItem,
      removeItem,
      clear,
      applyCoupon,
      refresh,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
}
