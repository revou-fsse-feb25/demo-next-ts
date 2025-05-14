import React from 'react';
import { Todo } from '../services/api';

interface SSRPageProps {
  todos: Todo[];
}

// Server-Side Rendering component
const SSRPage: React.FC<SSRPageProps> = ({ todos }) => {
  // TODO: Implement the SSR component to display todos
  // This component receives server-fetched data through props
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-900 text-indigo-100 rounded border border-indigo-700">
        <p>This data was rendered on the server.</p>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-indigo-300">Todos (SSR):</h3>
        <ul className="space-y-2">
          {/* TODO: Map through todos and display them */}
          <li className="p-3 bg-gray-800 rounded shadow border border-gray-700">
            <div className="flex items-start">
              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-yellow-500" />
              <div className="ml-3">
                <p className="text-gray-200">
                  Todo title will appear here
                </p>
                <p className="text-xs text-gray-500">ID: 1</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SSRPage; 