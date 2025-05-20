"use client";

import { useState, useEffect } from "react";
import { useDebounceValue } from "@/hooks/useDebounceValue";
import CodeBlock from "@/components/CodeBlock";

export default function DebounceDemoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceDelay, setDebounceDelay] = useState(500);
  const debouncedSearchTerm = useDebounceValue(searchTerm, debounceDelay);

  const [results, setResults] = useState<string[]>([]);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Mock API call that simulates searching
  useEffect(() => {
    const searchAPI = async () => {
      // Don't make API calls for empty search terms
      if (debouncedSearchTerm.trim() === "") {
        setResults([]);
        return;
      }

      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      setApiCallCount((prev) => prev + 1);

      // Generate mock results
      const mockResults = [
        `Result 1 for "${debouncedSearchTerm}"`,
        `Result 2 for "${debouncedSearchTerm}"`,
        `Result 3 for "${debouncedSearchTerm}"`,
        `Result 4 for "${debouncedSearchTerm}"`,
        `Result 5 for "${debouncedSearchTerm}"`,
      ];
      setResults(mockResults);
      setIsLoading(false);
    };

    searchAPI();
  }, [debouncedSearchTerm]); // Only depend on debouncedSearchTerm

  const useDebounceValueCode = `// Implementation
import { useState, useEffect } from 'react';

export function useDebounceValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
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
}`;

  const usageCode = `// Usage in a search component
import { useState } from 'react';
import { useDebounceValue } from '@/hooks/useDebounceValue';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
  
  // This effect will only run when debouncedSearchTerm changes
  useEffect(() => {
    // Make API call with debouncedSearchTerm
    searchAPI(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}`;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useDebounceValue Hook Demo</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">About useDebounceValue</h2>
        <p className="mb-4">
          The{" "}
          <code className="bg-gray-100 px-1 py-0.5 rounded">
            useDebounceValue
          </code>{" "}
          hook delays updating a value until after a specified delay. This is
          particularly useful for search inputs, where you want to wait until
          the user stops typing before making API calls.
        </p>
        <p>
          It helps reduce unnecessary API calls and improves performance by
          preventing excessive renders.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Implementation</h2>
          <CodeBlock code={useDebounceValueCode} language="typescript" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
          <CodeBlock code={usageCode} language="typescript" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Live Demo: Search with Debounce
        </h2>

        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="searchTerm">
              Search Term:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="searchTerm"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="pl-10 pr-10 py-2 border border-gray-300 rounded w-full focus:border-blue-500 transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Type quickly to see the debounce effect. API call will only be
              made after you stop typing.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="debounceDelay">
              Debounce Delay (ms): {debounceDelay}ms
            </label>
            <input
              id="debounceDelay"
              type="range"
              min="100"
              max="2000"
              step="100"
              value={debounceDelay}
              onChange={(e) => setDebounceDelay(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>100ms</span>
              <span>2000ms</span>
            </div>
          </div>
        </div>

        <div
          className="p-4 border rounded"
          style={{
            backgroundColor: "var(--card-bg)",
            color: "var(--card-text)",
            borderColor: "#4b5563",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Current State:</h3>
            <div className="text-sm">
              <span className="font-medium">API Calls Made:</span>{" "}
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {apiCallCount}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-1 text-sm">Raw Input Value:</h4>
              <div
                className="p-2 rounded min-h-[40px]"
                style={{
                  backgroundColor: "var(--code-bg)",
                  color: "var(--code-text)",
                }}
              >
                {searchTerm ? (
                  `"${searchTerm}"`
                ) : (
                  <em className="text-gray-400">Empty</em>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-1 text-sm">Debounced Value:</h4>
              <div
                className="p-2 rounded min-h-[40px]"
                style={{
                  backgroundColor: "var(--code-bg)",
                  color: "var(--code-text)",
                }}
              >
                {debouncedSearchTerm ? (
                  `"${debouncedSearchTerm}"`
                ) : (
                  <em className="text-gray-400">Empty</em>
                )}
                {debouncedSearchTerm !== searchTerm && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Waiting for debounce...
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-sm">Search Results:</h4>
            {isLoading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-600"></div>
                <p className="mt-2 text-gray-500">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <ul
                className="border rounded divide-y"
                style={{
                  backgroundColor: "var(--card-bg)",
                  color: "var(--card-text)",
                  borderColor: "#4b5563",
                }}
              >
                {results.map((result, index) => (
                  <li key={index} className="px-3 py-2">
                    {result}
                  </li>
                ))}
              </ul>
            ) : searchTerm ? (
              <p className="text-gray-500 text-center py-4">
                {debouncedSearchTerm === searchTerm
                  ? "No results found"
                  : "Waiting for you to stop typing..."}
              </p>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Type something to search
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Generic typing for any value type</li>
          <li>Configurable delay time</li>
          <li>Automatic cleanup to prevent memory leaks</li>
          <li>Prevents excessive API calls during rapid input changes</li>
          <li>Improves performance for expensive operations</li>
          <li>Simple, clean API for component use</li>
        </ul>
      </div>
    </div>
  );
}
