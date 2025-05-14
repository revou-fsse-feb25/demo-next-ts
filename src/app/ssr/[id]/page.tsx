import React from 'react';
import Link from 'next/link';
import DynamicSSR from '../../components/DynamicSSR';

export default function Page(props: any) {
  const id = props.params?.id;
  const userId = parseInt(id, 10);
  
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-white">Dynamic SSR for User {userId}</h1>
        <p className="text-gray-300">This page dynamically fetches data based on the URL parameter</p>
        <Link href="/ssr" className="text-indigo-400 hover:text-indigo-300 mt-2 inline-block">← Back to SSR page</Link>
        
        <div className="mt-4 flex gap-2">
          <Link href="/ssr/1" className={`px-3 py-1 rounded ${userId === 1 ? 'bg-indigo-600 text-white' : 'bg-indigo-900 text-indigo-300 hover:bg-indigo-800'}`}>
            User ID: 1
          </Link>
          <Link href="/ssr/2" className={`px-3 py-1 rounded ${userId === 2 ? 'bg-indigo-600 text-white' : 'bg-indigo-900 text-indigo-300 hover:bg-indigo-800'}`}>
            User ID: 2
          </Link>
          <Link href="/ssr/3" className={`px-3 py-1 rounded ${userId === 3 ? 'bg-indigo-600 text-white' : 'bg-indigo-900 text-indigo-300 hover:bg-indigo-800'}`}>
            User ID: 3
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
          <h2 className="text-xl font-medium mb-4 text-indigo-300">User Data (SSR with params.id: {id})</h2>
          <DynamicSSR userId={userId} />
        </div>
        
        <div className="p-4 bg-indigo-900/50 rounded border border-indigo-800">
          <h3 className="font-medium text-indigo-300 mb-2">About Dynamic Routes with SSR</h3>
          <p className="text-indigo-100">
            This page demonstrates dynamic routing with server-side rendering. The page gets the ID from 
            the URL parameters and fetches data for that specific user on the server before sending the 
            fully rendered HTML to the client.
          </p>
        </div>
      </main>
    </div>
  );
} 