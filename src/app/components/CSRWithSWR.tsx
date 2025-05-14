'use client';

import React, { useState } from 'react';
// TODO: Import useSWR from 'swr'
// TODO: Import Post type from '../services/api'
import LoadingState from './LoadingState';
import ErrorDisplay from './ErrorDisplay';

interface CSRWithSWRProps {
  initialPostId?: number;
}

const CSRWithSWR: React.FC<CSRWithSWRProps> = ({ initialPostId = 1 }) => {
  const [postId, setPostId] = useState(initialPostId);
  
  // TODO: Implement SWR for data fetching
  // 1. Create an SWR hook to fetch post data from JSONPlaceholder API
  // 2. The URL should be dynamic based on the postId
  // 3. Add configuration for revalidation options
  
  // Example:
  // const { data, error, isLoading, mutate } = useSWR<Post>(...)
  
  const postIds = [1, 2, 3, 4, 5];
  
  // TODO: Add loading state handling
  // if (isLoading) return <LoadingState message="Loading post data..." />;
  
  // TODO: Add error handling
  // if (error) return <ErrorDisplay error={error} onRetry={() => mutate()} />;
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-800 rounded shadow border border-gray-700">
        <div>
          {/* TODO: Display post data from the SWR hook */}
          <h3 className="text-lg font-medium text-blue-300 mb-2">Post title will appear here</h3>
          <p className="text-gray-300">Post body will appear here...</p>
          <p className="text-gray-400 text-xs mt-2">Post ID: {postId}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {postIds.map(id => (
          <button
            key={id}
            onClick={() => setPostId(id)}
            className={`px-3 py-1 rounded ${
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

export default CSRWithSWR; 