import React from 'react';
import Link from 'next/link';
import { fetchTodo } from '../../services/api';

// Set revalidation time for ISR
export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Page(props: any) {
  const id = props.params?.id;
  const todoId = parseInt(id, 10);
  
  // Fetch specific todo data
  const todo = await fetchTodo(todoId);
  
  // Format current time to show when the page was last regenerated
  const lastUpdated = new Date().toLocaleString();
  
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-white">ISR for Todo {todoId}</h1>
        <p className="text-gray-300">This page uses ISR with dynamic routes</p>
        <Link href="/isr" className="text-amber-400 hover:text-amber-300 mt-2 inline-block">← Back to ISR page</Link>
        
        <div className="mt-4 flex gap-2">
          <Link href="/isr/1" className={`px-3 py-1 rounded ${todoId === 1 ? 'bg-amber-600 text-white' : 'bg-amber-900 text-amber-300 hover:bg-amber-800'}`}>
            Todo ID: 1
          </Link>
          <Link href="/isr/2" className={`px-3 py-1 rounded ${todoId === 2 ? 'bg-amber-600 text-white' : 'bg-amber-900 text-amber-300 hover:bg-amber-800'}`}>
            Todo ID: 2
          </Link>
          <Link href="/isr/3" className={`px-3 py-1 rounded ${todoId === 3 ? 'bg-amber-600 text-white' : 'bg-amber-900 text-amber-300 hover:bg-amber-800'}`}>
            Todo ID: 3
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
          <h2 className="text-xl font-medium mb-4 text-amber-300">Todo Item with ISR</h2>
          
          <div className="p-3 bg-gray-800 rounded shadow border border-gray-700">
            <div className="flex items-start">
              <div className={`h-5 w-5 flex-shrink-0 rounded-full ${todo.completed ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <div className="ml-3">
                <p className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-200'}`}>
                  {todo.title}
                </p>
                <p className="text-xs text-gray-500">ID: {todo.id}</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-400 text-xs mt-4">Last generated: {lastUpdated}</p>
        </div>
        
        <div className="p-4 bg-amber-900/50 rounded border border-amber-800">
          <h3 className="font-medium text-amber-300 mb-2">About ISR with Dynamic Routes</h3>
          <p className="text-amber-100">
            This page demonstrates Incremental Static Regeneration with dynamic routes. The page gets the todo ID 
            from the URL parameters and generates a static page for that specific todo. It will be regenerated 
            every 60 seconds if requested.
          </p>
          <p className="text-amber-100 mt-2">
            This allows you to have the performance benefits of static generation while still supporting 
            dynamic parameters and keeping content fresh.
          </p>
        </div>
      </main>
    </div>
  );
}