"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   // If the user is not authenticated, redirect to login
  //   // This is a client-side check in addition to middleware protection
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [status, router]);

  // Show loading state while checking session
  // if (status === "loading") {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
  //       <div className="bg-zinc-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-zinc-700/50 text-center">
  //         <div className="flex justify-center mb-4">
  //           <div className="relative">
  //             <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
  //             <div className="absolute inset-0 flex items-center justify-center">
  //               <svg
  //                 className="h-8 w-8 text-blue-500"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path
  //                   stroke="currentColor"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   d="M12 6v6m0 0v6m0-6h6m-6 0H6"
  //                 />
  //               </svg>
  //             </div>
  //           </div>
  //         </div>
  //         <h3 className="text-xl text-white font-medium mb-1">
  //           Authenticating
  //         </h3>
  //         <p className="text-zinc-400">Verifying your session...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Only render dashboard content for authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Welcome, {session?.user.name}
            </h1>
            <p className="text-zinc-400 mt-1">
              Secure dashboard - protected by Next.js middleware
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-zinc-800/70 backdrop-blur-sm rounded-full px-4 py-1 border border-zinc-700/50 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-zinc-300 text-sm">
                {session?.user.role === "admin" ? "Admin" : "User"}
              </span>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-zinc-800/70 hover:bg-zinc-700/80 text-white px-4 py-2 rounded-full border border-zinc-700/50 shadow-lg flex items-center gap-2 backdrop-blur-sm transition-all duration-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Route Protection Card */}
          <div className="bg-zinc-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-zinc-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 p-4 border-b border-zinc-700/50">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <svg
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Route Protection
                </h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-zinc-300 mb-4">
                This dashboard is protected by Next.js middleware. Only
                authenticated users can access this page.
              </p>

              <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-400 mb-2">
                  How Route Protection Works:
                </h3>
                <ol className="list-decimal text-xs text-zinc-400 ml-4 space-y-2">
                  <li>
                    <span className="font-medium text-blue-400">
                      Server-side:
                    </span>{" "}
                    Next.js middleware checks the authentication cookie before
                    allowing access
                  </li>
                  <li>
                    <span className="font-medium text-blue-400">
                      Client-side:
                    </span>{" "}
                    The useSession hook verifies the user is authenticated and
                    redirects if not
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* User Information Card */}
          <div className="bg-zinc-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-zinc-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 p-4 border-b border-zinc-700/50">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <svg
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">
                  User Profile
                </h2>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold text-white">
                  {session?.user.name?.charAt(0) || "?"}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">
                    {session?.user.name}
                  </h3>
                  <p className="text-zinc-400">{session?.user.email}</p>
                  <div className="mt-1 flex items-center">
                    <span
                      className={`inline-block h-2 w-2 rounded-full mr-2 ${
                        session?.user.role === "admin"
                          ? "bg-purple-500"
                          : "bg-green-500"
                      }`}
                    ></span>
                    <span
                      className={`text-sm ${
                        session?.user.role === "admin"
                          ? "text-purple-400"
                          : "text-green-400"
                      }`}
                    >
                      {session?.user.role || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-zinc-900/50 border border-zinc-700 p-4">
                <p className="text-xs text-zinc-500 mb-2">
                  Session Information
                </p>
                <code className="text-xs block bg-black/30 p-2 rounded text-zinc-400 font-mono overflow-auto">
                  {JSON.stringify(
                    {
                      id: session?.user.id || "unknown",
                      name: session?.user.name,
                      role: session?.user.role,
                      // Add other non-sensitive session data here
                    },
                    null,
                    2
                  )}
                </code>
              </div>
            </div>
          </div>

          {/* Role-Based Access Card */}
          {/* <div className="bg-zinc-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-zinc-700/50 overflow-hidden">
            <div
              className={`${
                session?.user.role === "admin"
                  ? "bg-gradient-to-r from-purple-600/20 to-purple-800/20"
                  : "bg-gradient-to-r from-zinc-600/20 to-zinc-800/20"
              } p-4 border-b border-zinc-700/50`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`${
                    session?.user.role === "admin"
                      ? "bg-purple-500/20"
                      : "bg-zinc-500/20"
                  } p-2 rounded-lg`}
                >
                  <svg
                    className={`h-6 w-6 ${
                      session?.user.role === "admin"
                        ? "text-purple-400"
                        : "text-zinc-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Role-Based Access
                </h2>
              </div>
            </div>
            <div className="p-5">
              {session?.user.role === "admin" ? (
                <>
                  <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-purple-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-purple-300">
                        Admin Access Granted
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-purple-200">
                      You have administrative privileges with access to all
                      features.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-zinc-700/50 hover:bg-zinc-700 py-2 px-3 rounded-lg text-sm text-white flex items-center justify-between transition-colors">
                      <span>User Management</span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                    <button className="w-full bg-zinc-700/50 hover:bg-zinc-700 py-2 px-3 rounded-lg text-sm text-white flex items-center justify-between transition-colors">
                      <span>System Settings</span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-zinc-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-zinc-400">
                        Admin Access Required
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">
                      This section requires administrative privileges.
                    </p>
                  </div>

                  <p className="text-zinc-500 text-sm">
                    Some UI elements are conditionally rendered based on the
                    user's role.
                  </p>
                </>
              )}

              <p className="text-xs text-zinc-500 mt-4">
                This demonstrates role-based access control in Next.js
                applications.
              </p>
            </div>
          </div> */}
        </div>

        {/* Bottom Nav */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 bg-zinc-800/70 hover:bg-zinc-700/80 text-white px-5 py-2 rounded-full border border-zinc-700/50 shadow-lg backdrop-blur-sm transition-all duration-200"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
