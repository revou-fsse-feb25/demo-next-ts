# Next.js Authentication and Middleware Demo

A beginner-friendly demonstration of Next.js authentication patterns, middleware, and route protection using NextAuth.js with dark mode UI.

## Demo Features

- **Next.js Middleware**: Understand how middleware works for route protection
- **Authentication Patterns**: Implementation of login, registration, and protected routes
- **NextAuth.js Integration**: Session management and authentication
- **Role-Based Access Control**: Different content for regular users vs. admins
- **Protected Routes**: Client-side and server-side protection
- **Type-Safe Authentication**: Using TypeScript for better developer experience
- **Error Handling**: Comprehensive error handling for authentication flows
- **Dark Mode UI**: Modern dark-themed interface using Tailwind CSS

## Authentication Flow

This demo implements a complete authentication flow using Next.js and NextAuth.js:

1. **Route Protection with Middleware**:
   - All requests are intercepted by the middleware in `src/middleware.ts`
   - The middleware checks for an authentication token in cookies
   - Public routes are accessible to everyone
   - Protected routes redirect unauthenticated users to login

2. **User Authentication**:
   - Users can log in with email/password using NextAuth.js Credentials Provider
   - JWT tokens are used to maintain user sessions
   - Role information is added to the JWT and session for role-based access

3. **Client-Side Protection**:
   - Components check authentication status using `useSession` hook
   - Protected content is conditionally rendered based on authentication status
   - Admin-only sections are only visible to users with the admin role

4. **Error Handling**:
   - Authentication errors are caught and displayed with user-friendly messages
   - Different error types have specific handling and UI treatments
   - Error codes from NextAuth.js are properly mapped to human-readable messages

## Error Handling in Authentication

This demo showcases proper error handling in authentication flows:

- **Error Types**: 
  - Credential errors (wrong username/password)
  - Access control errors (attempting to access protected resources)
  - System errors (configuration problems)
  - OAuth errors (problems with third-party authentication)

- **Error Display**: 
  - Each error has a user-friendly message
  - Visual indicators showing error severity
  - Clear instructions on how to resolve the issue

- **Error Recovery**:
  - Easy navigation back to login or home
  - Clear error codes for debugging

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/demo-next-ts.git
cd demo-next-ts
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the demo.

## Demo Users

For demonstration purposes, the app includes two pre-configured users:

- **Regular User**:
  - Email: john@example.com
  - Password: password123
  - Role: user

- **Admin User**:
  - Email: admin@example.com
  - Password: admin123
  - Role: admin

## Project Structure

- `src/middleware.ts` - Next.js middleware for route protection
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth.js implementation
- `src/app/api/auth/error/page.tsx` - Error handling for authentication issues
- `src/types/next-auth.d.ts` - TypeScript type extensions for NextAuth
- `src/components/AuthProvider.tsx` - Context provider for authentication
- `src/app/*` - Application routes and pages

## Technical Implementation Details

### Middleware

The middleware function in `src/middleware.ts` is the cornerstone of route protection:

```typescript
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Get the token from cookies
  const token = request.cookies.get('authToken')?.value;
  
  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/about'];
  const isPublicPath = publicPaths.includes(path);
  
  // Check if user is trying to access a protected route without authentication
  if (!isPublicPath && !token) {
    // Create the URL for the login page with a redirect parameter
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', path);
    
    // Redirect to login page
    return NextResponse.redirect(loginUrl);
  }
  
  // Continue with the request if the route is public or user is authenticated
  return NextResponse.next();
}
```

### Authentication

NextAuth.js handles user authentication and session management:

```typescript
// In src/app/api/auth/[...nextauth]/route.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // ...credentials configuration
      async authorize(credentials) {
        // Authentication logic
      },
    }),
  ],
  callbacks: {
    // Add role to session and JWT
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  // ...other configuration
};
```

### TypeScript Type Safety

Custom type definitions extend NextAuth's built-in types:

```typescript
// In src/types/next-auth.d.ts
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
```

## Learning Resources

This demo was designed to help beginners understand the following concepts:

1. **Next.js Middleware Basics**: How to intercept and modify requests
2. **Authentication Flows**: Login, registration, and session management
3. **Protected Routes**: How to restrict access based on authentication status
4. **Role-Based Authorization**: Showing different content based on user roles
5. **Type-Safe Authentication**: Using TypeScript with NextAuth.js

## License

This project is MIT licensed.
