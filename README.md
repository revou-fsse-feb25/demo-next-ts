# Next.js Data Fetching Patterns - Starter Templates

A simple demonstration of data fetching strategies in Next.js with TypeScript and Tailwind CSS.

## Overview

This demo showcases different strategies for fetching data in Next.js applications. Each pattern is implemented as a starter template with TODO comments that guide you through implementing the functionality during a live demo or learning session.

## Features

This demo covers:

1. **Server-side Rendering (SSR)** - Fetching data on the server at request time
2. **Dynamic Data Fetching** - Fetching data based on dynamic parameters
3. **Combining SSR with Client State** - Using server-fetched data with client-side state
4. **Client-side Data Fetching with SWR** - Using SWR for data fetching with caching
5. **Loading States** - Implementing proper loading indicators
6. **Error Handling and Retry** - Handling errors with retry mechanisms
7. **Caching and Revalidation** - Demonstrating SWR&apos;s caching capabilities
8. **Performance Considerations** - Tips for optimizing server-rendered applications
9. **Parallel Data Fetching** - Fetching multiple resources simultaneously

## How to Use the Starter Templates

Each component contains TODO comments that explain:
- What to implement
- How to implement it
- Best practices for that specific pattern

To use these templates during a demo:
1. Start with the existing structure
2. Follow the TODO comments in each component
3. Implement the functionality during your demo
4. Show the before and after for each pattern

## Technologies Used

- **Next.js** - React framework for production
- **TypeScript** - Static typing for JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **SWR** - React Hooks for data fetching
- **JSONPlaceholder API** - Fake online REST API for testing

## Running the Demo

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   pnpm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
  ├── app/              # Next.js App Router structure
  │   ├── components/   # React components
  │   │   ├── DemoSSR.tsx                # Server-side rendering demo
  │   │   ├── DemoDynamicFetch.tsx       # Dynamic data fetching 
  │   │   ├── DemoSSRWithClientState.tsx # SSR + client state
  │   │   ├── DemoClientSWR.tsx          # Client-side SWR fetching
  │   │   ├── DemoLoadingStates.tsx      # Loading indicators
  │   │   ├── DemoErrorHandling.tsx      # Error handling with retry
  │   │   ├── DemoCaching.tsx            # SWR caching demo
  │   │   ├── DemoPerformance.tsx        # Performance considerations
  │   │   ├── DemoParallelFetch.tsx      # Parallel data fetching demo
  │   │   ├── ErrorDisplay.tsx           # Error display component
  │   │   ├── LoadingState.tsx           # Loading state component
  │   │   ├── Post.tsx                   # Post display component
  │   │   └── Todo.tsx                   # Todo display component
  │   ├── services/     # Data fetching services
  │   │   └── api.ts    # API service functions
  │   ├── page.tsx      # Main page component
  │   └── layout.tsx    # Root layout
```

## Key Concepts

### Server-Side Rendering

Data is fetched on the server before the page is sent to the client, improving SEO and initial load performance.

### Client-Side Fetching with SWR

[SWR](https://swr.vercel.app/) (stale-while-revalidate) is a strategy for fetching data that ensures the UI always stays fast and reactive:

- Returns cached data first (stale)
- Sends the fetch request
- Returns the up-to-date data when it&apos;s ready

### Error Handling and Retry

The demo shows how to implement proper error handling with retry mechanisms for failed requests.

### Caching and Revalidation

Learn how to implement effective caching strategies to minimize unnecessary network requests.

## Acknowledgements

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing a fake REST API
- [Next.js documentation](https://nextjs.org/docs) for reference
- [SWR documentation](https://swr.vercel.app/) for data fetching strategies

## License

MIT
