import { useState, useEffect, useCallback } from "react";

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

  const [state, setState] = useState<UseSWRState<T>>({
    data: null,
    loading: true,
    error: null,
    isValidating: false,
  });

  // Cache key for this request
  const cacheKey = JSON.stringify(key);

  // Function to fetch the data
  const fetchData = useCallback(
    async (shouldUpdateLoading = true) => {
      // If already validating, don't trigger another fetch
      if (state.isValidating) return;

      try {
        // Set loading state
        if (shouldUpdateLoading) {
          setState((prev) => ({ ...prev, loading: true, isValidating: true }));
        } else {
          setState((prev) => ({ ...prev, isValidating: true }));
        }

        // Fetch the data
        const data = await fetcher(key);

        // Update state with the fetched data
        setState({
          data,
          loading: false,
          error: null,
          isValidating: false,
        });

        // Store in session storage for caching
        sessionStorage.setItem(
          `swr-${cacheKey}`,
          JSON.stringify({
            data,
            timestamp: Date.now(),
          })
        );
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
      }
    },
    [key, fetcher, state.isValidating, cacheKey]
  );

  // Effect for initial data fetching and cache retrieval
  useEffect(() => {
    // Try to get data from cache
    const cachedData = sessionStorage.getItem(`swr-${cacheKey}`);

    if (cachedData) {
      try {
        const { data, timestamp } = JSON.parse(cachedData);

        // Check if cache is still valid
        if (Date.now() - timestamp < dedupingInterval) {
          // Use cached data
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
      } catch (e) {
        // Invalid cache, proceed with normal fetching
      }
    }

    // No valid cache, fetch data normally
    fetchData();
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
        sessionStorage.setItem(
          `swr-${cacheKey}`,
          JSON.stringify({
            data: newData,
            timestamp: Date.now(),
          })
        );
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
