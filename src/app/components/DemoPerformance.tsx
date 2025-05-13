import React from 'react';
import { Todo } from '../services/api';

interface DemoPerformanceProps {
  todos: Todo[];
}

const DemoPerformance: React.FC<DemoPerformanceProps> = ({ todos }) => {
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
      
      <div className="text-sm text-gray-400">
        <p>
          This demo has loaded {todos.length} todos efficiently using server-side
          rendering and proper component structure.
        </p>
      </div>
    </div>
  );
};

export default DemoPerformance; 