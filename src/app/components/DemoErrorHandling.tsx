'use client';

import React from 'react';
import useSWR from 'swr';
import LoadingState from './LoadingState';
import ErrorDisplay from './ErrorDisplay';
import { fetchWithErrorDemo } from '../services/api';

const DemoErrorHandling: React.FC = () => {
  // This component uses SWR with built-in error handling and retry
  const { data, error, isLoading, mutate } = useSWR('/api/error-prone', () => {
    return fetchWithErrorDemo();
  }, {
    // Retry configuration
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Only retry up to 3 times
      if (retryCount >= 3) return;
      
      // Retry after 2 seconds
      setTimeout(() => revalidate({ retryCount }), 2000);
    },
  });
  
  if (isLoading) return <LoadingState message="Making error-prone request..." />;
  if (error) return <ErrorDisplay error={error} onRetry={() => mutate()} />;
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Handling errors with retry functionality.</p>
      
      <div className="bg-green-900 p-4 rounded-md">
        <p className="text-green-200">✓ {data?.message}</p>
        <p className="text-green-300 text-xs mt-2">This request succeeded, but has a 50% chance of failure.</p>
        <button
          onClick={() => mutate()}
          className="mt-3 px-4 py-1 bg-green-800 hover:bg-green-700 rounded-md text-white"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default DemoErrorHandling; 