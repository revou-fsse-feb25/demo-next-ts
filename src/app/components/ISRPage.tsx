import React from 'react';
import { Todo } from '../services/api';

interface ISRPageProps {
  todos: Todo[];
  lastUpdated: string;
}

// Incremental Static Regeneration component
const ISRPage: React.FC<ISRPageProps> = ({ todos, lastUpdated }) => {
  // TODO: Implement the ISR component to display todos with revalidation timestamp
  // This component receives data that will be revalidated at the interval set in the page
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-amber-900 text-amber-100 rounded border border-amber-700">
        <p>This data was statically generated with ISR.</p>
        <p className="text-xs mt-1">Last updated: {lastUpdated}</p>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-amber-300">Todos (ISR):</h3>
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

export default ISRPage; 