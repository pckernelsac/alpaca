import { useState, useEffect, useCallback } from 'react';
import { cmsService } from '@/services/api';
import { mapTestimonials } from '@/mappers/testimonial.mapper';

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cmsService.getTestimonials();
      setTestimonials(mapTestimonials(data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { testimonials, loading, error, fetch };
}
