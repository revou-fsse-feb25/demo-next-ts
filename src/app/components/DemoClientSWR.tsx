'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import LoadingState from './LoadingState';
import ErrorDisplay from './ErrorDisplay';
import { Post } from '../services/api';

interface DemoClientSWRProps {
  initialPostId: number;
}

// SWR Client-side data fetching demo
const DemoClientSWR: React.FC<DemoClientSWRProps> = ({ initialPostId }) => {
  const [postId, setPostId] = useState(initialPostId);
  
  // TODO: Client-side Data Fetching with SWR
  // 1. Use the useSWR hook to fetch data from the JSONPlaceholder API
  // 2. Implement error handling and loading states
  // 3. Add caching and revalidation options
  // Example: const { data, error, isLoading, mutate } = useSWR<Post>(...)
  
  const postIds = [1, 2, 3, 4, 5];
  
  const handlePostChange = (newId: number) => {
    setPostId(newId);
    // After implementing SWR, the UI will automatically update when postId changes
  };
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Using SWR for data fetching with caching.</p>
      
      <div className="bg-gray-700 p-4 rounded-md mb-4">
        <p className="text-yellow-400">⚠️ TODO: Implement SWR data fetching here</p>
        <p className="text-gray-400 text-sm">Show post with ID: {postId}</p>
      </div>
      
      <div className="flex space-x-2 flex-wrap">
        {postIds.map(id => (
          <button
            key={id}
            onClick={() => handlePostChange(id)}
            className={`px-3 py-1 text-sm rounded my-1 ${
              postId === id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Post {id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DemoClientSWR; 