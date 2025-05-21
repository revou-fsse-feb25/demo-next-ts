import { useState, useEffect, useRef } from "react";

export function useDebounceValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const previousValueRef = useRef<T>(value);

  useEffect(() => {
    // Skip effect if value hasn't changed
    if (value === previousValueRef.current) {
      return;
    }

    // Update ref with current value for next comparison
    previousValueRef.current = value;

    // Set up a timer to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer when value or delay changes, or on unmount
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
