import { useState, useEffect, useRef, useCallback } from "react";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string, options?: RequestInit) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // Use refs to track values without causing re-renders
  const urlRef = useRef(url);
  const optionsRef = useRef(options);
  const isMountedRef = useRef(true);

  // Update refs when dependencies change
  useEffect(() => {
    urlRef.current = url;
    optionsRef.current = options;
  }, [url, options]);

  // Effect for data fetching
  useEffect(() => {
    // Skip if component is unmounted
    if (!isMountedRef.current) return;

    const controller = new AbortController();
    const signal = controller.signal;

    setState((prev) => ({ ...prev, loading: true }));

    const fetchData = async () => {
      try {
        const response = await fetch(urlRef.current, {
          ...optionsRef.current,
          signal,
        });

        // Skip if component is unmounted or URL has changed
        if (!isMountedRef.current || urlRef.current !== url) {
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Skip if component is unmounted or URL has changed
        if (!isMountedRef.current || urlRef.current !== url) {
          return;
        }

        setState({ data, loading: false, error: null });
      } catch (error) {
        // Skip if component is unmounted or URL has changed
        if (!isMountedRef.current || urlRef.current !== url) {
          return;
        }

        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            setState({ data: null, loading: false, error });
          }
        } else {
          setState({
            data: null,
            loading: false,
            error: new Error("An unknown error occurred"),
          });
        }
      }
    };

    // Start fetching data
    fetchData();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [url]); // Only depend on url for stable identity

  // Set isMountedRef to false on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return state;
}
