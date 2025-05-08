# Step-by-Step Implementation Guide

This guide will walk you through creating this Next.js Todo application from scratch.

## 1. Setup the Project

```bash
# Create a new Next.js project with TypeScript and App Router
npx create-next-app@latest my-todo-app --typescript --eslint --app --src-dir --tailwind
cd my-todo-app

# Install React Hook Form
pnpm add react-hook-form
```

## 2. Define TypeScript Types

Create a types directory and define the Todo and form input types:

```bash
mkdir -p src/types
```

Create `src/types/index.ts`:
```typescript
// Define the structure of a Todo item
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// Define the form input for creating/editing a Todo
export interface TodoFormInput {
  title: string;
}
```

## 3. Setup Data Storage

Create a data directory with a JSON file to store todos:

```bash
mkdir -p src/data
```

Create `src/data/todos.json`:
```json
[
  {
    "id": "1",
    "title": "Learn Next.js",
    "completed": false
  },
  {
    "id": "2",
    "title": "Build a Todo App",
    "completed": false
  },
  {
    "id": "3",
    "title": "Deploy to Production",
    "completed": false
  }
]
```

## 4. Create Utility Functions

Create a utils directory for CRUD operations:

```bash
mkdir -p src/utils
```

Create `src/utils/todoUtils.ts`:
```typescript
import { Todo } from '@/types';
import fs from 'fs';
import path from 'path';

// Path to the JSON file
const filePath = path.join(process.cwd(), 'src/data/todos.json');

// Function to read todos from the JSON file
export async function getTodos(): Promise<Todo[]> {
  try {
    // Read file content
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    // Parse JSON string to JavaScript array
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading todos:', error);
    return [];
  }
}

// Function to write todos to the JSON file
async function writeTodos(todos: Todo[]): Promise<void> {
  try {
    // Convert JavaScript array to JSON string with pretty formatting
    const data = JSON.stringify(todos, null, 2);
    // Write JSON string to file
    await fs.promises.writeFile(filePath, data, 'utf-8');
  } catch (error) {
    console.error('Error writing todos:', error);
    throw new Error('Failed to save todos');
  }
}

// Function to add a new todo
export async function addTodo(title: string): Promise<Todo> {
  // Get existing todos
  const todos = await getTodos();
  
  // Create a new todo with a unique ID
  const newTodo: Todo = {
    id: Date.now().toString(), // Use timestamp as ID
    title,
    completed: false,
  };
  
  // Add new todo to the array
  todos.push(newTodo);
  
  // Save updated todos to the file
  await writeTodos(todos);
  
  return newTodo;
}

// Function to update an existing todo
export async function updateTodo(id: string, updates: Partial<Todo>): Promise<Todo | null> {
  // Get existing todos
  const todos = await getTodos();
  
  // Find the index of the todo to update
  const index = todos.findIndex(todo => todo.id === id);
  
  // If todo not found, return null
  if (index === -1) return null;
  
  // Update the todo with the provided changes
  todos[index] = { ...todos[index], ...updates };
  
  // Save updated todos to the file
  await writeTodos(todos);
  
  return todos[index];
}

// Function to delete a todo
export async function deleteTodo(id: string): Promise<boolean> {
  // Get existing todos
  const todos = await getTodos();
  
  // Filter out the todo to delete
  const newTodos = todos.filter(todo => todo.id !== id);
  
  // If no todo was removed, return false
  if (newTodos.length === todos.length) return false;
  
  // Save updated todos to the file
  await writeTodos(newTodos);
  
  return true;
}
```

## 5. Create API Routes

Set up API endpoints using Next.js App Router API routes:

```bash
mkdir -p src/app/api/todos/[id]
```

Create `src/app/api/todos/route.ts` for GET (list) and POST (create) operations:
```typescript
import { NextResponse } from 'next/server';
import { getTodos, addTodo } from '@/utils/todoUtils';

// GET handler - Retrieves all todos
export async function GET() {
  try {
    // Get all todos from the JSON file
    const todos = await getTodos();
    // Return todos as JSON response
    return NextResponse.json(todos);
  } catch (error) {
    // If an error occurs, return a 500 response
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST handler - Creates a new todo
export async function POST(request: Request) {
  try {
    // Parse the request body to get the todo title
    const { title } = await request.json();
    
    // Validate the title
    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required and must be a string' },
        { status: 400 }
      );
    }
    
    // Add the new todo
    const newTodo = await addTodo(title);
    
    // Return the created todo with a 201 status
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    // If an error occurs, return a 500 response
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
```

Create `src/app/api/todos/[id]/route.ts` for GET (single), PATCH (update), and DELETE operations:
```typescript
import { NextResponse } from 'next/server';
import { updateTodo, deleteTodo, getTodos } from '@/utils/todoUtils';

// GET handler - Retrieves a specific todo
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the todo ID from the route parameters
    const id = params.id;
    
    // Get all todos
    const todos = await getTodos();
    
    // Find the specific todo
    const todo = todos.find(todo => todo.id === id);
    
    // If todo not found, return a 404 response
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    // Return the todo
    return NextResponse.json(todo);
  } catch (error) {
    // If an error occurs, return a 500 response
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

// PATCH handler - Updates a specific todo
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the todo ID from the route parameters
    const id = params.id;
    
    // Parse the request body to get the updates
    const updates = await request.json();
    
    // Validate the updates
    if (updates.title !== undefined && typeof updates.title !== 'string') {
      return NextResponse.json(
        { error: 'Title must be a string' },
        { status: 400 }
      );
    }
    
    if (updates.completed !== undefined && typeof updates.completed !== 'boolean') {
      return NextResponse.json(
        { error: 'Completed must be a boolean' },
        { status: 400 }
      );
    }
    
    // Update the todo
    const updatedTodo = await updateTodo(id, updates);
    
    // If todo not found, return a 404 response
    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    // Return the updated todo
    return NextResponse.json(updatedTodo);
  } catch (error) {
    // If an error occurs, return a 500 response
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// DELETE handler - Deletes a specific todo
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the todo ID from the route parameters
    const id = params.id;
    
    // Delete the todo
    const success = await deleteTodo(id);
    
    // If todo not found, return a 404 response
    if (!success) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    // If an error occurs, return a 500 response
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
```

## 6. Create React Components

Create components directory and implement the todo components:

```bash
mkdir -p src/app/components
```

Create `src/app/components/TodoForm.tsx`:
```tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TodoFormInput } from '@/types';

interface TodoFormProps {
  onSuccess: () => void;
  initialData?: { id: string; title: string };
}

export default function TodoForm({ onSuccess, initialData }: TodoFormProps) {
  // Setup react-hook-form with default values if editing
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TodoFormInput>({
    defaultValues: {
      title: initialData?.title || ''
    }
  });
  
  // State to track any submission errors
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Handle form submission
  const onSubmit = async (data: TodoFormInput) => {
    try {
      setSubmitError(null);
      
      if (initialData) {
        // If initialData exists, we're updating an existing todo
        const response = await fetch(`/api/todos/${initialData.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error('Failed to update todo');
        }
      } else {
        // Otherwise, we're creating a new todo
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error('Failed to create todo');
        }
      }
      
      // Reset form and notify parent of success
      reset();
      onSuccess();
    } catch (error) {
      // Handle any errors
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Add'}
          </button>
        </div>
        
        {/* Display form validation errors */}
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
        
        {/* Display submission errors */}
        {submitError && (
          <p className="text-red-500 text-sm">{submitError}</p>
        )}
      </div>
    </form>
  );
}
```

Create `src/app/components/TodoItem.tsx`:
```tsx
'use client';

import { useState } from 'react';
import { Todo } from '@/types';
import TodoForm from './TodoForm';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  // State to track if we're in edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State to track loading states for actions
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  
  // Handle toggling todo completion status
  const handleToggleComplete = async () => {
    try {
      setIsToggling(true);
      
      // Send PATCH request to update the completed status
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completed: !todo.completed
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      
      // Notify parent component to refresh todos
      onUpdate();
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setIsToggling(false);
    }
  };
  
  // Handle deleting a todo
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      // Send DELETE request
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      
      // Notify parent component to refresh todos
      onDelete();
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Handle the form submission success
  const handleEditSuccess = () => {
    setIsEditing(false);
    onUpdate();
  };
  
  // If in edit mode, show the TodoForm
  if (isEditing) {
    return (
      <div className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Edit Todo</h3>
        <TodoForm 
          initialData={{ id: todo.id, title: todo.title }} 
          onSuccess={handleEditSuccess} 
        />
        <button
          onClick={() => setIsEditing(false)}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancel
        </button>
      </div>
    );
  }
  
  // Otherwise, show the todo item
  return (
    <div className="flex items-center justify-between p-4 mb-2 border border-gray-200 rounded-md hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={isToggling}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </span>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
          aria-label="Edit todo"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3 py-1 text-sm text-red-500 hover:text-red-700 focus:outline-none"
          aria-label="Delete todo"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
```

Create `src/app/components/TodoList.tsx`:
```tsx
'use client';

import { useEffect, useState } from 'react';
import { Todo } from '@/types';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

export default function TodoList() {
  // State to store todos
  const [todos, setTodos] = useState<Todo[]>([]);
  // Loading state for initial fetch
  const [isLoading, setIsLoading] = useState(true);
  // Error state for fetch failures
  const [error, setError] = useState<string | null>(null);
  
  // Function to fetch todos from the API
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch todos from the API
      const response = await fetch('/api/todos');
      
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      // Parse response JSON
      const data = await response.json();
      // Update state with fetched todos
      setTodos(data);
    } catch (error) {
      // Handle errors
      setError('Error fetching todos. Please try again.');
      console.error('Error fetching todos:', error);
    } finally {
      // Update loading state
      setIsLoading(false);
    }
  };
  
  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);
  
  // Handler for when a todo is successfully added
  const handleTodoAdded = () => {
    // Refetch todos to get the updated list
    fetchTodos();
  };
  
  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>
      
      {/* Todo form */}
      <TodoForm onSuccess={handleTodoAdded} />
      
      {/* Error message */}
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center my-8">
          <p className="text-gray-500">Loading todos...</p>
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && todos.length === 0 && (
        <div className="p-4 text-center text-gray-500 border border-gray-200 rounded-md">
          No todos yet. Add one above!
        </div>
      )}
      
      {/* Todo list */}
      {todos.length > 0 && (
        <div className="mt-6">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={fetchTodos}
              onDelete={fetchTodos}
            />
          ))}
          <p className="text-sm text-gray-500 mt-4">
            {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
          </p>
        </div>
      )}
    </div>
  );
}
```

## 7. Update the Home Page

Update `src/app/page.tsx` to use the TodoList component:

```tsx
import TodoList from './components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <TodoList />
      </div>
    </div>
  );
}
```

## 8. Run the Application

Start the development server:

```bash
pnpm dev
```

Visit http://localhost:3000 to see your Todo application in action!

## 9. Key Concepts Explained

### React Hook Form

React Hook Form provides a simple, efficient way to handle forms with validation:

- `useForm()` initializes the form
- `register()` connects form fields to the validation system
- `handleSubmit()` processes the form data when valid
- `formState` provides status information (errors, submission state)

### Next.js API Routes

With Next.js App Router, API routes are created by defining route handler functions in a `route.ts` file:

- `GET`, `POST`, `PATCH`, `DELETE` methods are exported functions
- Route parameters (like `[id]`) are accessed via the second parameter
- Responses are returned using `NextResponse.json()`

### CRUD Operations

The application demonstrates all four CRUD operations:

- **Create**: Adding new todos via `POST /api/todos`
- **Read**: Fetching todos via `GET /api/todos` and `GET /api/todos/[id]`
- **Update**: Modifying todos via `PATCH /api/todos/[id]`
- **Delete**: Removing todos via `DELETE /api/todos/[id]`

### File System for Storage

The application uses Node.js file system APIs for data persistence:

- `fs.promises.readFile()` reads the JSON file
- `fs.promises.writeFile()` writes updates to the JSON file
- The file path is resolved using `path.join(process.cwd(), ...)`

### Client Components

All interactive components use the `'use client'` directive:

- Enables client-side interactivity
- Allows use of React hooks like `useState` and `useEffect`
- Handles form submissions and API calls 