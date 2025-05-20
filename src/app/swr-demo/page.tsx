"use client";

import { useState } from "react";
import { useSWR } from "@/hooks/useSWR";
import CodeBlock from "@/components/CodeBlock";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function SWRDemoPage() {
  const [refreshInterval, setRefreshInterval] = useState(0);
  const [userId, setUserId] = useState(1);

  // Simple fetcher function for useSWR
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  };

  // Using our custom useSWR hook
  const { data, loading, error, mutate, isValidating } = useSWR<any>(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    fetcher,
    { refreshInterval, revalidateOnFocus: true }
  );

  const useSWRCode = `// Implementation (simplified)
import { useState, useEffect, useCallback } from 'react';

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
  const [state, setState] = useState<UseSWRState<T>>({...});
  
  // Cache management with sessionStorage
  // Automatic background revalidation
  // Focus revalidation
  // Interval polling
  
  // Function to manually trigger a revalidation
  const mutate = useCallback((newData?: T) => {
    // Update cache and revalidate
  }, []);

  return {
    ...state,
    mutate,
  };
}`;

  const usageCode = `// Usage
const { data, loading, error, mutate, isValidating } = useSWR<UserData>(
  \`https://api.example.com/users/\${userId}\`,
  fetcher,
  { refreshInterval: 5000, revalidateOnFocus: true }
);

// Manual revalidation
const handleRefresh = () => {
  mutate();
};

// Optimistic UI update
const handleUpdateUser = async (userData) => {
  // Optimistically update the local data
  mutate({ ...data, ...userData }, false);
  
  // Send the update to the server
  await updateUser(userData);
  
  // Revalidate to ensure data consistency
  mutate();
};`;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useSWR Hook Demo</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">About useSWR</h2>
        <p className="mb-4">
          The <code className="bg-gray-100 px-1 py-0.5 rounded">useSWR</code>{" "}
          hook implements the stale-while-revalidate caching strategy. It
          returns cached data first (stale), then sends a fetch request
          (revalidate), and finally comes with up-to-date data.
        </p>
        <p>
          This approach ensures a fast user experience while keeping the data
          fresh.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Implementation</h2>
          <CodeBlock code={useSWRCode} language="typescript" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
          <CodeBlock code={usageCode} language="typescript" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Live Demo</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="userId">
              User ID:
            </label>
            <div className="flex gap-2">
              <input
                id="userId"
                type="number"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
                min="1"
                max="10"
                className="px-3 py-2 border border-gray-300 rounded w-full"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Try changing the ID (1-10)
            </p>
          </div>

          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="refreshInterval"
            >
              Auto Refresh Interval:
            </label>
            <select
              id="refreshInterval"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded w-full"
            >
              <option value="0">Disabled</option>
              <option value="2000">2 seconds</option>
              <option value="5000">5 seconds</option>
              <option value="10000">10 seconds</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              {refreshInterval > 0
                ? `Auto-refreshing every ${refreshInterval / 1000} seconds`
                : "Auto-refresh disabled"}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => mutate()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Manually Refresh
          </button>

          <button
            onClick={() => {
              // Simulate optimistic UI update
              const updatedData = { ...data, name: `${data?.name} (Updated)` };
              mutate(updatedData);

              // Show a message that this is just a UI update
              alert(
                "Optimistic UI update applied! In a real app, this would be synced with the server."
              );
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            disabled={!data}
          >
            Simulate Optimistic Update
          </button>
        </div>

        <div
          className="p-4 border rounded"
          style={{
            backgroundColor: "var(--card-bg)",
            color: "var(--card-text)",
            borderColor: "#4b5563",
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Results:</h3>
            {isValidating && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Revalidating...
              </span>
            )}
          </div>

          {loading && <p className="text-gray-600">Loading...</p>}

          {error && (
            <div
              className="p-3 rounded mb-4"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: "var(--error)",
              }}
            >
              Error: {error.message}
            </div>
          )}

          {data && (
            <div>
              <p className="mb-2 text-success">Data loaded successfully!</p>
              <pre
                className="p-3 rounded overflow-auto max-h-60 text-sm"
                style={{
                  backgroundColor: "var(--code-bg)",
                  color: "var(--code-text)",
                }}
              >
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Stale-while-revalidate caching strategy</li>
          <li>Automatic revalidation on window focus</li>
          <li>Configurable polling intervals</li>
          <li>Optimistic UI updates</li>
          <li>Deduplication of requests</li>
          <li>Local cache with configurable TTL</li>
          <li>Manual revalidation control</li>
        </ul>
      </div>
    </div>
  );
}
