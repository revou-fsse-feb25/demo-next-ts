"use client";

import React, { useState } from "react";

// TODO 1: Define a Todo interface
// Create an interface that describes the shape of a todo item
// It should have id, text, and completed properties

export default function TypeScriptBasicsPage() {
  // TODO 2: Add proper type to useState
  // Use the Todo interface you created and make an array of todos
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn Next.js", completed: false },
    { id: 2, text: "Learn TypeScript", completed: false },
    { id: 3, text: "Build a project", completed: false },
  ]);

  // TODO 3: Add proper type to useState for the input field
  const [newTodoText, setNewTodoText] = useState("");

  // TODO 4: Add proper type for the event parameter
  // Import the correct event type from React and add it here
  const handleInputChange = (e) => {
    setNewTodoText(e.target.value);
  };

  // TODO 5: Add proper return type annotation to this function
  const addTodo = () => {
    if (newTodoText.trim()) {
      // TODO 6: Add type annotation for the newTodo object
      const newTodo = {
        id: Date.now(),
        text: newTodoText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    }
  };

  // TODO 7: Add parameter type and return type annotations
  const toggleTodo = (id) => {
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
