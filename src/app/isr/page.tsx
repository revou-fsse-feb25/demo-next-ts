import React from 'react';
import Link from 'next/link';
// TODO: Import fetchTodos from '../services/api'
// TODO: Import ISRPage component

// Set revalidation time for ISR
export const revalidate = 60; // revalidate this page every 60 seconds

export default async function IncrementalStaticRegenerationPage() {
  // TODO: Fetch data that will be revalidated
  // Example: const todos = await fetchTodos();
  
  // TODO: Generate current time to show when the page was last regenerated
  // Example: const lastUpdated = new Date().toLocaleString();
  
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-white">Incremental Static Regeneration (ISR)</h1>
        <p className="text-gray-300">Static generation with timed revalidation</p>
        <Link href="/" className="text-amber-400 hover:text-amber-300 mt-2 inline-block">← Back to home</Link>
        <div className="mt-4 flex gap-2">
          <Link href="/isr/1" className="px-3 py-1 bg-amber-700 hover:bg-amber-600 text-white rounded">
            Todo ID: 1
          </Link>
          <Link href="/isr/2" className="px-3 py-1 bg-amber-700 hover:bg-amber-600 text-white rounded">
            Todo ID: 2
          </Link>
          <Link href="/isr/3" className="px-3 py-1 bg-amber-700 hover:bg-amber-600 text-white rounded">
            Todo ID: 3
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
          <h2 className="text-xl font-medium mb-4 text-amber-300">ISR Data (Revalidated every 60s)</h2>
          
          <div className="p-4 bg-yellow-900/50 rounded border border-yellow-800 text-yellow-200 font-medium">
            TODO: Implement the ISRPage component with todos data and lastUpdated time
          </div>
        </div>
        
        <div className="p-4 bg-amber-900/50 rounded border border-amber-800">
          <h3 className="font-medium text-amber-300 mb-2">About Incremental Static Regeneration</h3>
          <p className="text-amber-100">
            This page demonstrates Incremental Static Regeneration (ISR) in Next.js. The page is initially 
            statically generated like SSG, but can be regenerated in the background after a specified time interval.
          </p>
          <p className="text-amber-100 mt-2">
            In this example, we&apos;ve set <code className="bg-amber-800 px-1 rounded">revalidate = 60</code>, which means
            the page will be regenerated at most once every 60 seconds. Refresh after 60 seconds to see updated data.
          </p>
          <p className="text-amber-100 mt-2">
            This gives you the performance benefits of static generation while keeping content relatively fresh.
            Visit the individual Todo pages to see ISR with dynamic routes.
          </p>
        </div>
      </main>
    </div>
  );
} 