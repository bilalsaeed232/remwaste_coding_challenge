// Custom hook for managing skip data fetching

import { useState, useEffect } from 'react';
import { EnrichedSkip } from '../types/skip';
import { getEnrichedSkips } from '../services/skipService';

/**
 * Custom hook for fetching and managing skip data
 * Handles loading states, error handling, and retry logic
 */
export const useSkips = () => {
  const [skips, setSkips] = useState<EnrichedSkip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkips = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEnrichedSkips();
      setSkips(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load skips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkips();
  }, []);

  const retry = () => {
    fetchSkips();
  };

  return {
    skips,
    loading,
    error,
    retry
  };
};