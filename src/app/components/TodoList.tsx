'use client';

/**
 * TodoList Component
 * 
 * This is the main component that manages the list of todos and CRUD operations.
 * See the TODO IMPLEMENTATION GUIDE in src/app/page.tsx for the full implementation sequence.
 * This file covers steps 6.1 to 6.6 in the guide.
 */

import { useEffect, useState } from 'react';
import { Todo, TodoFormInput } from '@/types';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { fetchTodos, createTodo, updateTodo as apiUpdateTodo, deleteTodo as apiDeleteTodo } from '@/utils/api';

export default function TodoList() {
  // state yang menampung semua data todos
  const [todos, setTodos] = useState<Todo[]>([]);
  console.log('todos', todos)
  // Set up loading state
  const [isLoading, setIsLoading] = useState(true);
  // Set up error state
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load todos from API when component mounts
  useEffect(() => {
    loadTodos();
  }, []);
  
  // Implement function to add a new todo
  const handleAddTodo = async (data: TodoFormInput) => {
    try {
      const newTodo = await createTodo(data);
      setTodos(prev => [...prev, newTodo]);
      return Promise.resolve();
    } catch (err) {
      console.error('Error creating todo:', err);
      return Promise.reject(new Error('Failed to create todo'));
    }
  };
  
  // Implement function to update a todo
  const handleUpdateTodo = async (id: string, data: TodoFormInput) => {
    try {
      const updatedTodo = await apiUpdateTodo(id, { title: data.title });
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? updatedTodo : todo
        )
      );
      return Promise.resolve();
    } catch (err) {
      console.error('Error updating todo:', err);
      return Promise.reject(new Error('Failed to update todo'));
    }
  };
  
  // Implement function to toggle todo completion
  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      const updatedTodo = await apiUpdateTodo(id, { completed });
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? updatedTodo : todo
        )
      );
      return Promise.resolve();
    } catch (err) {
      console.error('Error toggling todo:', err);
      return Promise.reject(new Error('Failed to toggle todo'));
    }
  };
  
  // Implement function to delete a todo
  const handleDeleteTodo = async (id: string) => {
    try {
      console.log('handle delete parent', id)
      await apiDeleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      return Promise.resolve();
    } catch (err) {
      console.error('Error deleting todo:', err);
      return Promise.reject(new Error('Failed to delete todo'));
    }
  };
  
  return (
    <div className="max-w-md mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Todo List</h1>
      </div>
      
      {/* Add form for creating new todos */}
      <TodoForm onSubmit={handleAddTodo} />
      
      {/* Show error message if API request fails */}
      {error && (
        <div className="p-4 mb-4 bg-red-500 bg-opacity-20 border border-red-400 rounded text-red-300">
          {error}
        </div>
      )}
      
      {/* Show loading indicator while fetching todos */}
      {isLoading && (
        <div className="flex justify-center my-8">
          <p className="text-gray-400">Loading todos...</p>
        </div>
      )}
      
      {/* Show message when no todos exist */}
      {!isLoading && !error && todos.length === 0 && (
        <div className="p-4 text-center text-gray-400 border border-gray-700 rounded-md">
          No todos yet. Add one above!
        </div>
      )}
      
      {/* Render list of todos */}
      {todos.length > 0 && (
        <div className="mt-6">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
          <p className="text-sm text-gray-400 mt-4">
            {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
          </p>
        </div>
      )}
    </div>
  );
} 