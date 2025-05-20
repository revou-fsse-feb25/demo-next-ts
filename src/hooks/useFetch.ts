import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true }));
      
      try {
        const response = await fetch(url, {
          ...options,
          signal,
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== 'AbortError') {
            setState({ data: null, loading: false, error });
          }
        } else {
          setState({ 
            data: null, 
            loading: false, 
            error: new Error('An unknown error occurred') 
          });
        }
      }
    };

    fetchData();
    
    return () => {
      controller.abort();
    };
  }, [url, options]);

  return state;
} 