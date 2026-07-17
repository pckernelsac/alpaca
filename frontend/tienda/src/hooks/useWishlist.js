import { useState, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';

export function useWishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceProvider.wishlist.getItems();
      setItems(data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggle = useCallback(async (productId, variantId) => {
    try {
      const result = await serviceProvider.wishlist.toggleItem({ productId, variantId });
      await fetch();
      return result;
    } catch (err) {
      setError(err);
      return null;
    }
  }, [fetch]);

  return { items, loading, error, fetch, toggle };
}
