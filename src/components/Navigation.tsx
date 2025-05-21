"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navigation() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <nav className="bg-gray-800 shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-400">
                NextAuth Demo
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="border-transparent text-gray-300 hover:border-blue-400 hover:text-blue-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/home"
                  className="border-transparent text-gray-300 hover:border-blue-400 hover:text-blue-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">
                  {session?.user?.name || session?.user?.email}
                  {isAdmin && (
                    <span className="ml-2 text-xs text-blue-400">(Admin)</span>
                  )}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
