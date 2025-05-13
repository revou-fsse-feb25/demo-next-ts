import React from 'react';
import { Todo, fetchPosts } from '../services/api';
import TodoItem from './Todo';
import PostItem from './Post';

interface DemoSSRWithClientStateProps {
  initialTodos: Todo[];
}

// Example of combining SSR data with additional server data
const DemoSSRWithClientState = async ({ initialTodos }: DemoSSRWithClientStateProps) => {
  // Fetch posts on the server
  const posts = await fetchPosts();
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Server data combined with client-side state.</p>
      
      <div className="mb-4">
        {posts.length > 0 ? (
          <PostItem key={posts[0].id} post={posts[0]} />
        ) : (
          <p>No posts found</p>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg text-blue-200 mb-2">Initial Todos:</h3>
        <div className="max-h-40 overflow-y-auto">
          {initialTodos.slice(0, 2).map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          These todos were passed from server-side props
        </p>
      </div>
    </div>
  );
};

export default DemoSSRWithClientState; 