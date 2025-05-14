import React from 'react';
import Link from 'next/link';

export default function CSRPage() {
  // TODO: Implement client-side rendering with SWR
  // 1. Create a client component with the 'use client' directive
  // 2. Use the SWR hook to fetch data from JSONPlaceholder API
  // 3. Add loading and error states
  // 4. Implement UI to display the fetched data
  
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-white">Client-Side Rendering with SWR</h1>
        <p className="text-gray-300">Data is fetched on the client after the page loads</p>
        <Link href="/" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">← Back to home</Link>
      </header>

      <main className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
        <div className="p-4 bg-yellow-900/50 rounded border border-yellow-800 text-yellow-200 font-medium">
          TODO: Implement the CSRWithSWR component here
        </div>
        
        <div className="mt-8 p-4 bg-blue-900/50 rounded border border-blue-800">
          <h3 className="font-medium text-blue-300 mb-2">About Client-Side Rendering</h3>
          <p className="text-blue-100">
            This page demonstrates client-side rendering with SWR. The component is rendered with empty data first, 
            then fetches data from the API on the client side. SWR provides caching, revalidation, and other helpful features.
          </p>
        </div>
      </main>
    </div>
  );
} 