import React from "react";
import Link from "next/link";
// import { fetchTodos } from '../services/api';
import SSRPage from "../components/SSRPage";
import DynamicSSR from "../components/DynamicSSR";

export async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
}

export default async function ServerSideRenderingPage() {
  // Fetch todos for SSR demo
  const todos = await fetchTodos();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-white">
          Server-Side Rendering (SSR)
        </h1>
        <p className="text-gray-300">
          Data is fetched on the server for each request
        </p>
        <Link
          href="/"
          className="text-indigo-400 hover:text-indigo-300 mt-2 inline-block"
        >
          ← Back to home
        </Link>
        <div className="mt-4 flex gap-2">
          <Link
            href="/ssr/1"
            className="px-3 py-1 bg-indigo-700 hover:bg-indigo-600 text-white rounded"
          >
            User ID: 1
          </Link>
          <Link
            href="/ssr/2"
            className="px-3 py-1 bg-indigo-700 hover:bg-indigo-600 text-white rounded"
          >
            User ID: 2
          </Link>
          <Link
            href="/ssr/3"
            className="px-3 py-1 bg-indigo-700 hover:bg-indigo-600 text-white rounded"
          >
            User ID: 3
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
          <h2 className="text-xl font-medium mb-4 text-indigo-300">
            SSR with All Data
          </h2>
          <SSRPage todos={todos} />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
          <h2 className="text-xl font-medium mb-4 text-indigo-300">
            SSR with Dynamic Data (ID-based)
          </h2>
          <DynamicSSR userId={1} />
        </div>

        <div className="p-4 bg-indigo-900/50 rounded border border-indigo-800">
          <h3 className="font-medium text-indigo-300 mb-2">
            About Server-Side Rendering
          </h3>
          <p className="text-indigo-100">
            This page demonstrates server-side rendering in Next.js. The data is
            fetched on the server before the page is sent to the client. This
            results in a fully populated HTML document. We show both bulk data
            fetching and ID-based dynamic data fetching.
          </p>
          <p className="text-indigo-100 mt-2">
            Click the User ID links above to see dynamic routes in action.
          </p>
        </div>
      </main>
    </div>
  );
}
