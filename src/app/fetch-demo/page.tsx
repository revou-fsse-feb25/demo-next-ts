"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import CodeBlock from "@/components/CodeBlock";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function FetchDemoPage() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/users");
  const { data, loading, error } = useFetch<{ users: User[] }>(url);

  const useFetchCode = `// Implementation
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
          throw new Error(\`HTTP error! Status: \${response.status}\`);
        }
        
        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== 'AbortError') {
            setState({ data: null, loading: false, error });
          }
        }
      }
    };

    fetchData();
    
    return () => {
      controller.abort();
    };
  }, [url, options]);

  return state;
}`;

  const usageCode = `// Usage
const { data, loading, error } = useFetch<{ users: User[] }>(url);

// Rendering
{loading && <p>Loading...</p>}
{error && <p>Error: {error.message}</p>}
{data && (
  <ul>
    {data.users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
)}`;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useFetch Hook Demo</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">About useFetch</h2>
        <p className="mb-4">
          The <code className="bg-gray-100 px-1 py-0.5 rounded">useFetch</code>{" "}
          hook provides a simple way to fetch data from an API. It handles
          loading states, errors, and provides the fetched data in a clean
          interface.
        </p>
        <p>
          It also automatically cancels in-flight requests when the component
          unmounts or when the URL changes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Implementation</h2>
          <CodeBlock code={useFetchCode} language="typescript" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
          <CodeBlock code={usageCode} language="typescript" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Live Demo</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="apiUrl">
            API URL (try changing to see useFetch in action):
          </label>
          <div className="flex gap-2">
            <input
              id="apiUrl"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={() =>
                setUrl("https://jsonplaceholder.typicode.com/users")
              }
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Reset
            </button>
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
          <h3 className="font-semibold mb-2">Results:</h3>

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

          {data && !loading && (
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
          <li>Generic typing for different response types</li>
          <li>Automatic loading state management</li>
          <li>Error handling and type-safe error states</li>
          <li>Request cancellation on unmount or URL change</li>
          <li>Simple, clean API for component use</li>
        </ul>
      </div>
    </div>
  );
}
