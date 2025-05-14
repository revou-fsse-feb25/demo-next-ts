'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Post } from '../services/api';
import LoadingState from './LoadingState';
import ErrorDisplay from './ErrorDisplay';

interface CSRWithSWRProps {
  initialPostId?: number;
}

const CSRWithSWR: React.FC<CSRWithSWRProps> = ({ initialPostId = 1 }) => {
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
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
    }
  );
  
  const postIds = [1, 2, 3, 4, 5];
  
  if (isLoading) return <LoadingState message="Loading post data..." />;
  if (error) return <ErrorDisplay error={error} onRetry={() => mutate()} />;
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-800 rounded shadow border border-gray-700">
        <div>
          <h3 className="text-lg font-medium text-blue-300 mb-2">{data?.title}</h3>
          <p className="text-gray-300">{data?.body}</p>
          <p className="text-gray-400 text-xs mt-2">Post ID: {data?.id}</p>
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