import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            About This Demo
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A comprehensive demonstration of Next.js middleware, authentication
            patterns, and route protection using NextAuth.js
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="bg-zinc-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-zinc-700/50 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 p-6 border-b border-zinc-700/50">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Authentication Flow
                </h2>
              </div>
            </div>

            <div className="p-6">
              <p className="text-zinc-300 mb-6">
                This demo showcases how to implement route protection and
                role-based access control using Next.js and NextAuth.js.
              </p>

              <div className="space-y-8">
                {/* Authentication Flow Section */}
                <div className="bg-zinc-900/40 rounded-lg border border-zinc-700/50 p-5">
                  <h3 className="text-lg font-medium text-blue-400 mb-4">
                    Authentication Flow Explained
                  </h3>

                  <div className="relative">
                    {/* Flow Steps */}
                    <div className="border-l-2 border-dashed border-zinc-700 absolute h-full left-3 top-0"></div>

                    <div className="space-y-6 relative">
                      <div className="flex items-start">
                        <div className="bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-white font-semibold text-xs z-10 mt-0.5">
                          1
                        </div>
                        <div className="ml-6">
                          <h4 className="text-white font-medium mb-1">
                            Request Interception
                          </h4>
                          <p className="text-sm text-zinc-400">
                            Next.js middleware intercepts the request before it
                            reaches the page
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-white font-semibold text-xs z-10 mt-0.5">
                          2
                        </div>
                        <div className="ml-6">
                          <h4 className="text-white font-medium mb-1">
                            Authentication Check
                          </h4>
                          <p className="text-sm text-zinc-400">
                            Middleware checks for an authentication token in
                            cookies
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-white font-semibold text-xs z-10 mt-0.5">
                          3
                        </div>
                        <div className="ml-6">
                          <h4 className="text-white font-medium mb-1">
                            Redirect Logic
                          </h4>
                          <p className="text-sm text-zinc-400">
                            If no token is found, the user is redirected to the
                            login page with the original URL as a parameter
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-white font-semibold text-xs z-10 mt-0.5">
                          4
                        </div>
                        <div className="ml-6">
                          <h4 className="text-white font-medium mb-1">
                            Post-Login Redirection
                          </h4>
                          <p className="text-sm text-zinc-400">
                            After successful login, the user is sent to their
                            original destination
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Features Section */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    Key Features
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-700/50 flex">
                      <div className="bg-blue-500/20 p-2 rounded-lg h-min">
                        <svg
                          className="h-5 w-5 text-blue-400"
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
                      <div className="ml-4">
                        <h4 className="font-medium text-white">
                          Middleware Protection
                        </h4>
                        <p className="text-sm text-zinc-400">
                          Route-level security at the Next.js application layer
                        </p>
                      </div>
                    </div>

                    <div className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-700/50 flex">
                      <div className="bg-purple-500/20 p-2 rounded-lg h-min">
                        <svg
                          className="h-5 w-5 text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-white">
                          Role-Based Access
                        </h4>
                        <p className="text-sm text-zinc-400">
                          Admins and regular users see different UI components
                        </p>
                      </div>
                    </div>

                    <div className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-700/50 flex">
                      <div className="bg-green-500/20 p-2 rounded-lg h-min">
                        <svg
                          className="h-5 w-5 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-white">
                          JWT Authentication
                        </h4>
                        <p className="text-sm text-zinc-400">
                          Secure token-based session management
                        </p>
                      </div>
                    </div>

                    <div className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-700/50 flex">
                      <div className="bg-red-500/20 p-2 rounded-lg h-min">
                        <svg
                          className="h-5 w-5 text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-white">
                          Error Handling
                        </h4>
                        <p className="text-sm text-zinc-400">
                          Comprehensive error handling for authentication
                          failures
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Implementation Section */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    Technical Implementation
                  </h3>

                  <div className="bg-black/30 rounded-lg border border-zinc-700/50 overflow-hidden">
                    <div className="flex items-center px-4 py-2 bg-zinc-800/50 border-b border-zinc-700/50">
                      <div className="flex space-x-1">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="ml-3 text-zinc-400 text-sm font-mono">
                        src/middleware.ts
                      </span>
                    </div>

                    <div className="p-4">
                      <pre className="text-sm text-zinc-300 font-mono overflow-auto">
                        <code className="language-typescript">
                          {`export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Check for authentication token
  const token = request.cookies.get('authToken')?.value;
  
  // Define public paths that don't require auth
  const publicPaths = ['/login', '/register', '/about'];
  const isPublicPath = publicPaths.includes(path);
  
  // Redirect unauthenticated users
  if (!isPublicPath && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }
  
  // Continue with the request
  return NextResponse.next();
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Public Notice */}
          <div className="bg-blue-900/20 rounded-lg border border-blue-700/30 p-5 mb-8 flex items-start">
            <svg
              className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-medium text-blue-300 mb-1">
                Public Page Notice
              </h3>
              <p className="text-blue-200 text-sm">
                This about page is publicly accessible and doesn't require
                authentication. It serves as documentation for the
                authentication demo.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-2 bg-zinc-800/70 hover:bg-zinc-700/80 text-white px-5 py-2 rounded-full border border-zinc-700/50 backdrop-blur-sm shadow-lg transition-all duration-200"
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

            <Link
              href="/login"
              className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-500 text-white px-5 py-2 rounded-full shadow-lg transition-all duration-200"
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Try Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
