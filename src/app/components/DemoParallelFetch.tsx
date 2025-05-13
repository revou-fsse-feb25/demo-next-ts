import React from 'react';
import { fetchTodos, fetchPosts, fetchUser } from '../services/api';
import TodoItem from './Todo';
import PostItem from './Post';

const DemoParallelFetch = async () => {
  // TODO: Parallel Data Fetching Demo
  // 1. Use Promise.all to fetch multiple data sources simultaneously
  // 2. Fetch todos, posts, and user data in parallel
  // 3. Display the results in a grid layout
  // Example: const [todos, posts, user] = await Promise.all([...])
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Fetching multiple data sources in parallel.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-medium text-blue-200 mb-3">User</h3>
          <p className="text-yellow-400">⚠️ TODO: Display user data</p>
          <p className="text-gray-400 text-sm">Fetch and show user information</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-medium text-blue-200 mb-3">Todos</h3>
          <p className="text-yellow-400">⚠️ TODO: Display todo list</p>
          <p className="text-gray-400 text-sm">Fetch and show todos using TodoItem component</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-medium text-blue-200 mb-3">Posts</h3>
          <p className="text-yellow-400">⚠️ TODO: Display posts</p>
          <p className="text-gray-400 text-sm">Fetch and show posts using PostItem component</p>
        </div>
      </div>
    </div>
  );
};

export default DemoParallelFetch; 