import { useState, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';

const LOCAL_KEY = 'tienda_cart';
const SYNC_KEY = 'tienda_cart_synced';

function getLocal() { try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); } catch { return []; } }
function saveLocal(items) { localStorage.setItem(LOCAL_KEY, JSON.stringify(items)); try { window.dispatchEvent(new Event('cart-updated')); } catch {} }
function cleanLocal() { const items = getLocal().filter(i => i.price > 0 || i.unitPrice > 0); saveLocal(items); return items; }

export function useCart() {
  const [items, setItems] = useState(() => cleanLocal());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const localItems = getLocal();
      if (localItems.length > 0 && !localStorage.getItem(SYNC_KEY)) {
        for (const item of localItems) {
          try { await serviceProvider.cart.addItem({ productId: item.productId || item.id, quantity: item.quantity || 1 }); } catch {}
        }
        localStorage.setItem(SYNC_KEY, '1');
        saveLocal([]);
      }
      const data = await serviceProvider.cart.getCart();
      const serverItems = data?.items || data || [];
      setItems(serverItems);
      if (serverItems.length > 0) saveLocal(serverItems);
      try { window.dispatchEvent(new Event('cart-updated')); } catch {}
    } catch {
      setItems(getLocal());
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceProvider.cart.addItem(data);
      await fetch();
      return result;
    } catch {
      const local = getLocal();
      const exist = local.find(i => i.productId === data.productId || i.id === data.productId);
      let itemPrice = data.price;
      if (!itemPrice || itemPrice <= 0) {
        try { const p = await serviceProvider.catalog.getById(data.productId); itemPrice = p?.variants?.[0]?.price || 0; } catch { itemPrice = 0; }
      }
      if (exist) { exist.quantity = (exist.quantity || 1) + (data.quantity || 1); exist.price = itemPrice; }
      else { local.push({ id: data.productId, productId: data.productId, title: data.title || '', price: itemPrice, quantity: data.quantity || 1, image: data.image || '' }); }
      saveLocal(local);
      setItems([...local]);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetch]);

  const updateItem = useCallback(async (id, data) => {
    try {
      await serviceProvider.cart.updateItem(id, data);
      await fetch();
    } catch {
      const local = getLocal().map(i => i.id === id || i.productId === id ? { ...i, ...data } : i);
      saveLocal(local);
      setItems(local);
    }
  }, [fetch]);

  const removeItem = useCallback(async (id) => {
    try {
      await serviceProvider.cart.removeItem(id);
      await fetch();
    } catch {
      const local = getLocal().filter(i => i.id !== id && i.productId !== id);
      saveLocal(local);
      setItems(local);
    }
  }, [fetch]);

  const clearCart = useCallback(async () => {
    try {
      await serviceProvider.cart.clearCart();
    } catch { /* ignore */ }
    setItems([]);
    saveLocal([]);
  }, []);

  return { items, loading, error, fetch, addItem, updateItem, removeItem, clearCart };
}
