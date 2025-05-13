'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import LoadingState from './LoadingState';

interface CacheData {
  timestamp: string;
  count: number;
  message: string;
}

const DemoCaching: React.FC = () => {
  const [count, setCount] = useState(0);
  
  // TODO: Caching and Revalidation Demo
  // 1. Use SWR with a caching strategy
  // 2. Set up a dedupingInterval to cache data for a specific time
  // 3. Demonstrate how changing the key (count) affects cache behavior
  // Example: const { data, isLoading } = useSWR<CacheData>(['cached-data', count], ...)
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Demonstrating SWR&apos;s caching and revalidation.</p>
      
      <div className="bg-gray-700 p-4 rounded-md mb-4">
        <p className="text-yellow-400">⚠️ TODO: Implement caching demonstration here</p>
        <p className="text-gray-400 text-sm">This should show cached data that updates when count changes</p>
        <p className="text-gray-400 text-sm">Current count: {count}</p>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
        >
          Update Count ({count})
        </button>
      </div>
    </div>
  );
};

export default DemoCaching; 