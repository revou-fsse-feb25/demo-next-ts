"use client";

import React, { useState, ChangeEvent } from "react";

// Define Todo interface
// An interface defines the shape of an object in TypeScript
// This helps catch errors if you try to use properties that don't exist
interface Todo {
  id: number; // Unique identifier for each todo
  text: string; // The content of the todo item
  completed: boolean; // Whether the todo is completed or not
}

export default function TypeScriptBasicsPage() {
  // useState with TypeScript: We specify the type of state using generics <Type>
  // This ensures our todos will always follow the Todo interface structure
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Next.js", completed: false },
    { id: 2, text: "Learn TypeScript", completed: false },
    { id: 3, text: "Build a project", completed: false },
  ]);

  // For simple types like strings, TypeScript can often infer the type
  // But it's good practice to specify it explicitly for clarity
  const [newTodoText, setNewTodoText] = useState<string>("");

  // Event handlers in TypeScript need to specify the event type
  // ChangeEvent<HTMLInputElement> is the correct type for input change events
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTodoText(e.target.value);
  };

  // Function with return type annotation
  // void means this function doesn't return anything
  const addTodo = (): void => {
    if (newTodoText.trim()) {
      // Creating a new todo with the correct type structure
      const newTodo: Todo = {
        id: Date.now(), // Using timestamp as unique ID
        text: newTodoText,
        completed: false,
      };
      // Using the spread operator to create a new array with the added todo
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    }
  };

  // Function that takes a parameter with type annotation
  // This ensures we only call toggleTodo with a number
  const toggleTodo = (id: number): void => {
    // Using map to create a new array with the toggled todo
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-purple-400 mb-2">
          TypeScript Basics
        </h1>
        <p className="text-gray-400 mb-6">
          A simple todo application with TypeScript
        </p>

        {/* Form for adding new todos */}
        <div className="mb-6">
          <div className="flex">
            <input
              type="text"
              value={newTodoText}
              onChange={handleInputChange}
              className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-l focus:outline-none focus:border-purple-500"
              placeholder="Add a new task..."
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-purple-600 text-white rounded-r hover:bg-purple-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* List of todos - we use TypeScript to ensure we're using the correct properties */}
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              className={`p-3 rounded cursor-pointer ${
                todo.completed
                  ? "bg-gray-800 text-gray-500"
                  : "bg-gray-800 border-l-4 border-purple-500"
              }`}
            >
              <span className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </span>
            </div>
          ))}
        </div>

        {/* TypeScript example code snippets */}
        <div className="mt-8 space-y-4">
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg font-medium text-purple-400 mb-3">
              TypeScript Examples
            </h2>

            <div className="mb-3">
              <h3 className="text-white text-sm font-medium mb-1">
                Basic Types:
              </h3>
              <div className="bg-gray-900 p-2 rounded">
                <code className="text-green-400">
                  const name: string = 'John';
                  <br />
                  const age: number = 30;
                  <br />
                  const isActive: boolean = true;
                </code>
              </div>
            </div>

            <div className="mb-3">
              <h3 className="text-white text-sm font-medium mb-1">Arrays:</h3>
              <div className="bg-gray-900 p-2 rounded">
                <code className="text-blue-400">
                  const hobbies: string[] = ['Reading', 'Coding'];
                  <br />
                  const scores: number[] = [95, 87, 92];
                </code>
              </div>
            </div>

            <div className="mb-3">
              <h3 className="text-white text-sm font-medium mb-1">
                Interface:
              </h3>
              <div className="bg-gray-900 p-2 rounded">
                <code className="text-yellow-400">
                  interface Todo
                  <br />
                  &nbsp;&nbsp;id: number;
                  <br />
                  &nbsp;&nbsp;text: string;
                  <br />
                  &nbsp;&nbsp;completed: boolean;
                  <br />
                </code>
              </div>
            </div>

            <div className="mb-3">
              <h3 className="text-white text-sm font-medium mb-1">
                React Hooks:
              </h3>
              <div className="bg-gray-900 p-2 rounded">
                <code className="text-cyan-400">
                  // With primitive type
                  <br />
                  const [text, setText] = useState&lt;string&gt;('');
                  <br />
                  <br />
                  // With interface type
                  <br />
                  const [todos, setTodos] = useState&lt;Todo[]&gt;([]);
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
