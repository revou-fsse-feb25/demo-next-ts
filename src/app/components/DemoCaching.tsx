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
  
  // Demonstrate SWR&apos;s caching with a memoized key
  const { data, isLoading } = useSWR<CacheData>(
    ['cached-data', count], 
    ([_, countValue]: [string, number]) => {
      // This function will return different results based on the count
      return new Promise<CacheData>(resolve => {
        setTimeout(() => {
          resolve({
            timestamp: new Date().toISOString(),
            count: countValue,
            message: `This data is cached by SWR (count: ${countValue})`
          });
        }, 1000);
      });
    },
    {
      // Keep cached data for 10 seconds
      dedupingInterval: 10000,
    }
  );
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Demonstrating SWR&apos;s caching and revalidation.</p>
      
      <div className="bg-gray-700 p-4 rounded-md mb-4">
        {isLoading ? (
          <LoadingState message="Loading cached data..." />
        ) : (
          <>
            <p className="text-gray-300 mb-2">{data?.message}</p>
            <p className="text-xs text-gray-400">Fetched at: {data?.timestamp}</p>
          </>
        )}
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