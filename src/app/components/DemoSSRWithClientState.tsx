import React from 'react';
import { Todo, fetchPosts } from '../services/api';
import TodoItem from './Todo';
import PostItem from './Post';

interface DemoSSRWithClientStateProps {
  initialTodos: Todo[];
}

// Example of combining SSR data with additional server data
const DemoSSRWithClientState = async ({ initialTodos }: DemoSSRWithClientStateProps) => {
  // TODO: SSR with Client State Demo
  // 1. Fetch additional data on the server (posts)
  // 2. Combine with the initialTodos that were passed as props
  // 3. Display both sets of data
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Server data combined with client-side state.</p>
      
      <div className="bg-gray-700 p-4 rounded-md mb-4">
        <h3 className="text-lg text-blue-200 mb-2">Posts from Server:</h3>
        <p className="text-yellow-400">⚠️ TODO: Fetch and display posts</p>
        <p className="text-gray-400 text-sm">Use the PostItem component to show posts</p>
      </div>
      
      <div className="bg-gray-700 p-4 rounded-md mt-4">
        <h3 className="text-lg text-blue-200 mb-2">Initial Todos:</h3>
        <p className="text-yellow-400">⚠️ TODO: Display initial todos</p>
        <p className="text-gray-400 text-sm">Use the TodoItem component to display initialTodos</p>
        <p className="text-gray-400 text-sm mt-2">
          Available todos: {initialTodos.length}
        </p>
      </div>
    </div>
  );
};

export default DemoSSRWithClientState; 