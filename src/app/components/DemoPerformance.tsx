import React from 'react';
import { Todo } from '../services/api';

interface DemoPerformanceProps {
  todos: Todo[];
}

const DemoPerformance: React.FC<DemoPerformanceProps> = ({ todos }) => {
  // TODO: Performance Optimization Demo
  // 1. Implement optimized rendering for the todo list
  // 2. Add pagination or virtualization for large datasets
  // 3. Demonstrate proper component boundaries
  
  return (
    <div>
      <p className="text-gray-300 mb-4">Optimizing performance in server rendering.</p>
      
      <div className="bg-gray-700 p-4 rounded-md mb-4">
        <h3 className="text-lg font-medium text-blue-200 mb-2">Performance Tips:</h3>
        <ul className="list-disc pl-5 text-gray-300 space-y-2">
          <li>Use parallel data fetching (Promise.all)</li>
          <li>Implement proper caching strategies</li>
          <li>Use granular component boundaries</li>
          <li>Avoid large data transfers</li>
          <li>Implement pagination for large datasets</li>
        </ul>
      </div>
      
      <div className="bg-gray-700 p-4 rounded-md">
        <p className="text-yellow-400">⚠️ TODO: Implement performance optimizations</p>
        <p className="text-gray-400 text-sm">Demonstrate efficient rendering of {todos.length} todos</p>
        <p className="text-gray-400 text-sm">Consider adding pagination or virtualization</p>
      </div>
    </div>
  );
};

export default DemoPerformance; 