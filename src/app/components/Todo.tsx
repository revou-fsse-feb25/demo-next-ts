import React from 'react';
import { Todo } from '../services/api';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className="flex items-center p-3 bg-gray-800 rounded-md mb-2 shadow-sm">
      <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${todo.completed ? 'bg-green-600' : 'bg-yellow-600'}`}>
        {todo.completed && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`text-gray-200 ${todo.completed ? 'line-through opacity-70' : ''}`}>
        {todo.title}
      </span>
    </div>
  );
};

export default TodoItem; 