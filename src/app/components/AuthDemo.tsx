/*
COMPONENT LEARNING OBJECTIVES:

1. Type-safe props in Next.js components
   - TODO 1.1: Learn to create interfaces for structured data
4. Nested routes and simple private routing
   - TODO 4.1: Understand basic client-side authentication state
   - TODO 4.2: Implement conditional rendering based on auth state
*/

"use client";

import { useState } from "react";

// Simple auth demo component
export default function AuthDemo() {
  // TODO 4.1: Notice how we use state to track authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // TODO 1.1: Notice how we use TypeScript interface for structured data
  interface UserProfile {
    name: string;
    email: string;
    role: string;
  }

  // Mock user data with proper typing
  const user: UserProfile = {
    name: "Demo User",
    email: "user@example.com",
    role: "Developer",
  };

  return (
    <section className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Protected Content Demo</h2>

      <div className="mb-4">
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className={`px-4 py-2 rounded ${
            isLoggedIn
              ? "bg-red-600 hover:bg-red-500"
              : "bg-green-600 hover:bg-green-500"
          } text-white`}
        >
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>
      </div>

      {/* TODO 4.2: Notice conditional rendering based on authentication state */}
      {isLoggedIn ? (
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">User Profile</h3>
          <ul className="text-gray-300">
            <li>
              <strong>Name:</strong> {user.name}
            </li>
            <li>
              <strong>Email:</strong> {user.email}
            </li>
            <li>
              <strong>Role:</strong> {user.role}
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-400">
            This content is only visible when logged in. In a real app, you
            would use middleware and session management.
          </p>
        </div>
      ) : (
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-300">
            You need to log in to view the protected content.
          </p>
        </div>
      )}
    </section>
  );
}
