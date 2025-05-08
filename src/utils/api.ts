/**
 * API Service for Todo Application
 * 
 * This file contains all the API functions for CRUD operations.
 * See the TODO IMPLEMENTATION GUIDE in src/app/page.tsx for the full implementation sequence.
 * This file covers steps 2.2 and 2.3 in the guide.
 */

import { Todo, TodoFormInput } from '@/types';

// API base URL
const API_URL = 'https://64ca45bd700d50e3c7049e2f.mockapi.io/todo';

// Get all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  
  return response.json();
};

// Get a single todo
export const fetchTodo = async (id: string): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch todo');
  }
  
  return response.json();
};

// Create a new todo
export const createTodo = async (data: TodoFormInput): Promise<Todo> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      completed: false,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  
  return response.json();
};

// Update a todo
export const updateTodo = async (id: string, data: Partial<Todo>): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  
  return response.json();
};

// Delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
}; 