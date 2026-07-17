import { useState, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';

export function useCart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceProvider.cart.getCart();
      setItems(data.items || data || []);
    } catch (err) {
      setError(err);
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
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetch]);

  const updateItem = useCallback(async (id, data) => {
    try {
      const result = await serviceProvider.cart.updateItem(id, data);
      await fetch();
      return result;
    } catch (err) {
      setError(err);
      return null;
    }
  }, [fetch]);

  const removeItem = useCallback(async (id) => {
    try {
      await serviceProvider.cart.removeItem(id);
      await fetch();
    } catch (err) {
      setError(err);
    }
  }, [fetch]);

  const clearCart = useCallback(async () => {
    try {
      await serviceProvider.cart.clearCart();
      setItems([]);
    } catch (err) {
      setError(err);
    }
  }, []);

  return { items, loading, error, fetch, addItem, updateItem, removeItem, clearCart };
}
