import React from 'react';
import { Todo } from '../services/api';
import TodoItem from './Todo';

interface DemoSSRProps {
  todos: Todo[];
}

const DemoSSR: React.FC<DemoSSRProps> = ({ todos }) => {
  return (
    <div>
      <p className="text-gray-300 mb-4">Data fetched at request time on the server.</p>
      
      <div className="mt-4">
        <h3 className="text-lg text-blue-200 mb-2">Todos from SSR:</h3>
        {todos.length > 0 ? (
          <div>
            {todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        ) : (
          <p>No todos found</p>
        )}
      </div>
    </div>
  );
};

export default DemoSSR; 