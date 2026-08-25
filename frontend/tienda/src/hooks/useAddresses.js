import { useState, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';

export function useAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await serviceProvider.auth.getAddresses();
      const list = raw?.data ?? raw?.rows ?? raw ?? [];
      setAddresses(Array.isArray(list) ? list : []);
    } catch { setAddresses([]); }
    finally { setLoading(false); }
  }, []);

  const save = useCallback(async (data) => {
    try {
      await serviceProvider.auth.createAddress(data);
      await fetch();
      return true;
    } catch { return false; }
  }, [fetch]);

  const remove = useCallback(async (id) => {
    try {
      await serviceProvider.auth.deleteAddress(id);
      await fetch();
    } catch { /* ignore */ }
  }, [fetch]);

  return { addresses, loading, fetch, save, remove };
}
