import React from 'react';
import { fetchTodos, fetchPosts, fetchUser } from '../services/api';
import TodoItem from './Todo';
import PostItem from './Post';

const DemoParallelFetch = async () => {
  // Fetch multiple resources in parallel
  const [todos, posts, user] = await Promise.all([
    fetchTodos(),
    fetchPosts(),
    fetchUser(1)
  ]);
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Fetching multiple data sources in parallel.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-medium text-blue-200 mb-3">User</h3>
          <p className="text-white text-lg">{user.name}</p>
          <p className="text-gray-300">@{user.username}</p>
          <p className="text-gray-300">{user.email}</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-medium text-blue-200 mb-3">Todos</h3>
          <div className="max-h-60 overflow-y-auto">
            {todos.slice(0, 3).map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-medium text-blue-200 mb-3">Posts</h3>
          <div className="max-h-60 overflow-y-auto">
            {posts.slice(0, 1).map(post => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoParallelFetch; 