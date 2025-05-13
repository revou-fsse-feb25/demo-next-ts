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
  
  // Using SWR for client-side data fetching
  const { data, error, isLoading, mutate } = useSWR<Post>(
    `/api/posts/${postId}`,
    () => fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch post');
        return res.json();
      }),
    {
      // Caching and revalidation options
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 2000, // Deduplicate requests within 2 seconds
    }
  );
  
  const postIds = [1, 2, 3, 4, 5];
  
  const handlePostChange = (newId: number) => {
    setPostId(newId);
    // No need to explicitly call mutate, changing the key will trigger revalidation
  };
  
  if (isLoading) return <LoadingState message="Loading post data..." />;
  if (error) return <ErrorDisplay error={error} onRetry={() => mutate()} />;
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Using SWR for data fetching with caching.</p>
      
      <div className="bg-gray-700 p-4 rounded-md mb-4">
        {data && (
          <>
            <h3 className="text-lg font-medium text-blue-200 mb-2">{data.title}</h3>
            <p className="text-gray-300">{data.body}</p>
            <p className="text-gray-400 text-xs mt-2">Post ID: {data.id}</p>
          </>
        )}
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