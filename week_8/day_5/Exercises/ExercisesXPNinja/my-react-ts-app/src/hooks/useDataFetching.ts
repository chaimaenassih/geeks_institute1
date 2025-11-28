import { useEffect, useRef, useState } from "react";

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

type CacheMap<T> = Map<string, CacheEntry<T>>;

// cache global, typé avec unknown pour éviter any
const globalCache: CacheMap<unknown> = new Map();

interface UseDataFetchingConfig {
  maxAge: number; // ms
}

interface UseDataFetchingResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  invalidateCache: () => void;
}

export function useDataFetching<T>(
  url: string,
  config: UseDataFetchingConfig
): UseDataFetchingResult<T> {
  const { maxAge } = config;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadFlag, setReloadFlag] = useState<number>(0);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const cacheEntry = globalCache.get(url) as
        | CacheEntry<T>
        | undefined;

      const now = Date.now();

      if (cacheEntry && now - cacheEntry.timestamp <= maxAge) {
        if (!didCancel && isMounted.current) {
          setData(cacheEntry.data);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const json = (await res.json()) as T;

        globalCache.set(url, {
          data: json,
          timestamp: Date.now(),
        });

        if (!didCancel && isMounted.current) {
          setData(json);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!didCancel && isMounted.current) {
          const message =
            err instanceof Error ? err.message : "Unknown error";
          setError(message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url, maxAge, reloadFlag]);

  const refetch = () => {
    setReloadFlag((prev) => prev + 1);
  };

  const invalidateCache = () => {
    globalCache.delete(url);
  };

  return {
    data,
    loading,
    error,
    refetch,
    invalidateCache,
  };
}
