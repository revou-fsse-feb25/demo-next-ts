'use client';

/**
 * TodoItem Component
 * 
 * This component displays a single todo item with toggle, edit, and delete functionality.
 * See the TODO IMPLEMENTATION GUIDE in src/app/page.tsx for the full implementation sequence.
 * This file covers steps 5.1 to 5.4 in the guide.
 */

import { useState } from 'react';
import { Todo } from '@/types';
import { TodoFormInput } from '@/types';
import TodoForm from './TodoForm';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onUpdate: (id: string, data: TodoFormInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  // Set up state for edit mode
  const [isEditing, setIsEditing] = useState(false);
  // Set up loading states
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  
  // Implement function to handle todo completion toggle
  const handleToggleComplete = async () => {
    try {
      setIsToggling(true);
      await onToggle(todo.id, !todo.completed);
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setIsToggling(false);
    }
  };
  
  // Implement function to handle todo deletion
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Implement function to handle todo update
  const handleUpdate = async (data: TodoFormInput) => {
    await onUpdate(todo.id, data);
    setIsEditing(false);
  };
  
  // Render edit mode with TodoForm
  if (isEditing) {
    return (
      <div className="mb-4 p-4 border border-gray-700 rounded-md bg-gray-800 text-white">
        <h3 className="text-lg font-medium mb-2 text-white">Edit Todo</h3>
        <TodoForm 
          initialData={{ id: todo.id, title: todo.title }} 
          onSubmit={handleUpdate} 
        />
        <button
          onClick={() => setIsEditing(false)}
          className="text-gray-400 hover:text-gray-300 text-sm"
        >
          Cancel
        </button>
      </div>
    );
  }
  
  // Render todo item with toggle, edit, and delete options
  return (
    <div className="flex items-center justify-between p-4 mb-2 border border-gray-700 rounded-md hover:bg-gray-800 text-white">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={isToggling}
          className="h-5 w-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
        />
        <span className={`${todo.completed ? 'line-through text-gray-400' : ''}`}>
          {todo.title}
        </span>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 text-sm text-blue-400 hover:text-blue-300 focus:outline-none"
          aria-label="Edit todo"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3 py-1 text-sm text-red-400 hover:text-red-300 focus:outline-none"
          aria-label="Delete todo"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
} 