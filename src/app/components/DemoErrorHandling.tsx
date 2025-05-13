'use client';

import React from 'react';
import useSWR from 'swr';
import LoadingState from './LoadingState';
import ErrorDisplay from './ErrorDisplay';
import { fetchWithErrorDemo } from '../services/api';

const DemoErrorHandling: React.FC = () => {
  // TODO: Error Handling and Retry Demo
  // 1. Use SWR to fetch data from an error-prone API endpoint
  // 2. Configure error retry strategy with onErrorRetry
  // 3. Implement proper error and loading states
  // 4. Use mutate() to allow manual retries
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Handling errors with retry functionality.</p>
      
      <div className="bg-gray-700 p-4 rounded-md">
        <p className="text-yellow-400">⚠️ TODO: Implement error handling and retry logic</p>
        <p className="text-gray-400 text-sm">Use the ErrorDisplay component with a retry button</p>
        <p className="text-gray-400 text-sm mt-2">Note: The API has a 50% chance of failing for demo purposes</p>
        
        <button
          onClick={() => {/* TODO: Add retry functionality */}}
          className="mt-3 px-4 py-1 bg-blue-600 hover:bg-blue-500 rounded-md"
        >
          Try Request
        </button>
      </div>
    </div>
  );
};

export default DemoErrorHandling; 