import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Next.js Data Fetching Patterns</h1>
        <p className="text-gray-300">Simple demonstrations of various data fetching strategies</p>
      </header>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-6xl mx-auto">
        {/* 1. Client-Side Rendering with SWR */}
        <Link href="/csr" className="group">
          <section className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-blue-400 group-hover:text-blue-300">1. Client-Side Rendering (CSR)</h2>
            <p className="text-gray-300">Using SWR for client-side data fetching with built-in caching and revalidation.</p>
          </section>
        </Link>

        {/* 2. Server-Side Rendering */}
        <Link href="/ssr" className="group">
          <section className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-indigo-400 group-hover:text-indigo-300">2. Server-Side Rendering (SSR)</h2>
            <p className="text-gray-300">Data fetching happens on the server for each request, including dynamic routes with params.</p>
          </section>
        </Link>

        {/* 3. Static Site Generation */}
        <Link href="/ssg" className="group">
          <section className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-green-400 group-hover:text-green-300">3. Static Site Generation (SSG)</h2>
            <p className="text-gray-300">Pre-render pages at build time for maximum performance.</p>
          </section>
        </Link>

        {/* 4. Incremental Static Regeneration */}
        <Link href="/isr" className="group">
          <section className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-amber-400 group-hover:text-amber-300">4. Incremental Static Regeneration (ISR)</h2>
            <p className="text-gray-300">Static generation with data revalidation at specified intervals.</p>
          </section>
        </Link>
      </main>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p>Next.js Data Fetching Patterns - © {new Date().getFullYear()}</p>
        <p>Using <a href="https://jsonplaceholder.typicode.com/" className="underline hover:text-gray-300">JSONPlaceholder</a></p>
      </footer>
    </div>
  );
}
