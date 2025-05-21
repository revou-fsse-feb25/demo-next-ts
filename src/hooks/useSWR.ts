import { useState, useEffect, useCallback, useRef } from "react";

interface UseSWRState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  isValidating: boolean;
}

interface UseSWROptions {
  dedupingInterval?: number;
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
}

interface CacheData<T> {
  data: T;
  timestamp: number;
}

export function useSWR<T>(
  key: string,
  fetcher: (key: string) => Promise<T>,
  options: UseSWROptions = {}
) {
  const {
    dedupingInterval = 2000,
    refreshInterval = 0,
    revalidateOnFocus = true,
  } = options;

  // Use refs to track state without causing re-renders
  const keyRef = useRef(key);
  const isValidatingRef = useRef(false);
  const fetcherRef = useRef(fetcher);
  const optionsRef = useRef(options);

  // Update refs when dependencies change
  useEffect(() => {
    keyRef.current = key;
    fetcherRef.current = fetcher;
    optionsRef.current = options;
  }, [key, fetcher, options]);

  const [state, setState] = useState<UseSWRState<T>>({
    data: null,
    loading: true,
    error: null,
    isValidating: false,
  });

  // Cache key for this request
  const cacheKey = `swr-${JSON.stringify(key)}`;

  // Function to fetch the data
  const fetchData = useCallback(
    async (shouldUpdateLoading = true) => {
      // If already validating, don't trigger another fetch
      if (isValidatingRef.current) return;

      isValidatingRef.current = true;

      try {
        // Set loading state
        if (shouldUpdateLoading) {
          setState((prev) => ({ ...prev, loading: true, isValidating: true }));
        } else {
          setState((prev) => ({ ...prev, isValidating: true }));
        }

        // Fetch the data
        const data = await fetcherRef.current(keyRef.current);

        // Update state with the fetched data
        setState({
          data,
          loading: false,
          error: null,
          isValidating: false,
        });

        // Store in session storage for caching
        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({
              data,
              timestamp: Date.now(),
            })
          );
        } catch (e) {
          // Ignore storage errors
        }
      } catch (error) {
        if (error instanceof Error) {
          setState({
            data: null,
            loading: false,
            error,
            isValidating: false,
          });
        } else {
          setState({
            data: null,
            loading: false,
            error: new Error("An unknown error occurred"),
            isValidating: false,
          });
        }
      } finally {
        isValidatingRef.current = false;
      }
    },
    [cacheKey] // Reduced dependencies
  );

  // Effect for initial data fetching and cache retrieval
  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      // Try to get data from cache
      let cachedData: string | null = null;

      try {
        cachedData = sessionStorage.getItem(cacheKey);
      } catch (e) {
        // Ignore storage errors
      }

      if (cachedData) {
        try {
          const { data, timestamp } = JSON.parse(cachedData) as CacheData<T>;

          // Check if cache is still valid
          if (Date.now() - timestamp < dedupingInterval) {
            // Use cached data only if component is still mounted
            if (isMounted) {
              setState({
                data,
                loading: false,
                error: null,
                isValidating: false,
              });

              // Revalidate in background
              fetchData(false);
              return;
            }
          }
        } catch (e) {
          // Invalid cache, proceed with normal fetching
        }
      }

      // No valid cache, fetch data normally
      if (isMounted) {
        fetchData();
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, [cacheKey, dedupingInterval, fetchData]);

  // Effect for refresh interval
  useEffect(() => {
    if (!refreshInterval) return;

    const intervalId = setInterval(() => {
      fetchData(false);
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refreshInterval, fetchData]);

  // Effect for revalidation on window focus
  useEffect(() => {
    if (!revalidateOnFocus) return;

    const handleFocus = () => {
      fetchData(false);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [revalidateOnFocus, fetchData]);

  // Function to manually trigger a revalidation
  const mutate = useCallback(
    (newData?: T) => {
      if (newData) {
        // Immediately update the data
        setState((prev) => ({
          ...prev,
          data: newData,
          loading: false,
          error: null,
        }));

        // Update the cache
        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({
              data: newData,
              timestamp: Date.now(),
            })
          );
        } catch (e) {
          // Ignore storage errors
        }
      }

      // Revalidate from the server
      return fetchData(false);
    },
    [fetchData, cacheKey]
  );

  return {
    ...state,
    mutate,
  };
}
