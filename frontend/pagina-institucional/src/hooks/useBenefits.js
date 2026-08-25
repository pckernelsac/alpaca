import { useState, useEffect, useCallback } from 'react';
import { cmsService } from '@/services/api';
import { mapBenefits } from '@/mappers/benefit.mapper';

export function useBenefits() {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cmsService.getBenefits();
      setBenefits(mapBenefits(data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { benefits, loading, error, fetch };
}
