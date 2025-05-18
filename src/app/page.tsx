"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Next.js Authentication Demo
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Learn about Next.js middleware, authentication patterns, and route
            protection
          </p>
        </div>

        <div className="bg-zinc-800 rounded-lg shadow-xl p-8 max-w-4xl mx-auto border border-zinc-700">
          {/* Authentication status */}
          <div className="mb-8 p-4 rounded-lg border border-zinc-700">
            <h2 className="text-lg font-semibold mb-2 text-white">
              Authentication Status
            </h2>
            {session ? (
              <div className="bg-green-900/30 p-4 rounded-md border border-green-800">
                <div className="flex items-center mb-1">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-green-300">
                    Logged in as{" "}
                    <span className="font-semibold">{session.user?.name}</span>
                  </p>
                </div>
                <p className="text-green-400 text-sm ml-7">
                  Role:{" "}
                  <span className="font-medium">
                    {session.user?.role || "N/A"}
                  </span>
                </p>
              </div>
            ) : (
              <div className="bg-yellow-900/30 p-4 rounded-md border border-yellow-800">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-yellow-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-yellow-300">Not logged in</p>
                </div>
                <p className="text-yellow-400 text-sm ml-7 mt-1">
                  Protected routes will redirect you to the login page
                </p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-zinc-700 rounded-lg p-5 bg-zinc-800/50">
              <h2 className="text-xl font-semibold mb-3 text-white">
                Authentication Flow
              </h2>

              <div className="space-y-3 mb-4">
                <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-md">
                  <h3 className="text-sm font-medium text-blue-400 mb-1">
                    How It Works:
                  </h3>
                  <p className="text-xs text-zinc-300 mb-2">
                    This demo shows how Next.js middleware protects routes by
                    checking for authentication before allowing access.
                    Protected routes require a valid session.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login Page
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Register Page
                </Link>
                <Link
                  href="/dashboard"
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Protected Dashboard
                </Link>
              </div>
            </div>

            <div className="border border-zinc-700 rounded-lg p-5 bg-zinc-800/50">
              <h2 className="text-xl font-semibold mb-3 text-white">
                Key Features
              </h2>
              <ul className="list-disc pl-5 mb-6 text-zinc-300 space-y-2">
                <li>NextAuth integration for authentication</li>
                <li>Middleware for route protection</li>
                <li>Role-based access control</li>
                <li>Protected routes with redirects</li>
              </ul>

              <div className="space-y-3">
                <Link
                  href="/about"
                  className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  About Page
                </Link>
                <Link
                  href="/api/auth/error?error=Configuration"
                  className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Error Handling
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-700 pt-6">
            <h2 className="text-xl font-semibold mb-3 text-white">
              Technical Components
            </h2>
            <div className="bg-zinc-700/30 p-4 rounded-md border border-zinc-600">
              <ul className="space-y-3 text-zinc-300 text-sm">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-400 mr-2">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-400">
                      src/middleware.ts
                    </span>
                    : Intercepts requests to check authentication
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-400 mr-2">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-400">
                      src/app/api/auth/[...nextauth]/route.ts
                    </span>
                    : NextAuth.js configuration
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-400 mr-2">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-400">
                      src/types/next-auth.d.ts
                    </span>
                    : Extended TypeScript definitions
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
