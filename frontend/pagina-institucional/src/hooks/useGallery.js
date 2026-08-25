import { useState, useCallback } from 'react';
import { serviceProvider } from '@/providers/ServiceProvider';
import { mapGallery } from '@/mappers/gallery.mapper';

export function useGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceProvider.cms.getGallery();
      setImages(mapGallery(data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { images, loading, error, fetch };
}
