import React, { Suspense } from "react";
import { Todo, fetchTodos } from "./services/api";
import LoadingState from "./components/LoadingState";
import Link from "next/link";

// Import components in sequence
import DemoSSR from "./components/DemoSSR";
import DemoDynamicFetch from "./components/DemoDynamicFetch";
import DemoSSRWithClientState from "./components/DemoSSRWithClientState";
import DemoClientSWR from "./components/DemoClientSWR";
import DemoLoadingStates from "./components/DemoLoadingStates";
import DemoErrorHandling from "./components/DemoErrorHandling";
import DemoCaching from "./components/DemoCaching";
import DemoPerformance from "./components/DemoPerformance";
import DemoParallelFetch from "./components/DemoParallelFetch";

export default async function Home() {
  // Fetch todos for demos that need initial data
  let todos: Todo[] = [];
  // try {
  //   todos = await fetchTodos();
  // } catch (error) {
  //   console.error('Error fetching todos:', error);
  // }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Next.js Data Fetching Patterns
        </h1>
        <p className="text-gray-400">
          Simple demonstrations of various data fetching strategies
        </p>
        <div className="mt-4 p-4 bg-blue-900 rounded-md">
          <p className="font-medium">Looking for Pages Router SSR Example?</p>
          <Link href="/ssr-demo" className="text-blue-300 hover:underline">
            → View getServerSideProps example
          </Link>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* 1. Server-side Rendering */}
        <section className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            1. Server-Side Rendering
          </h2>
          <Suspense fallback={<LoadingState message="Loading todos..." />}>
            <DemoSSR todos={todos} />
          </Suspense>
        </section>

        {/* 2. Dynamic data fetching */}
        <section className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            2. Dynamic Data Fetching
          </h2>
          <Suspense fallback={<LoadingState message="Loading user data..." />}>
            <DemoDynamicFetch userId={1} />
          </Suspense>
        </section>

        {/* 3. Combining SSR with client-side state */}
        <section className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            3. SSR + Client State
          </h2>
          <Suspense fallback={<LoadingState message="Loading posts..." />}>
            <DemoSSRWithClientState initialTodos={todos} />
          </Suspense>
        </section>

        {/* 4. Client-side data fetching with SWR */}
        <section className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            4. Client-Side Fetching (SWR)
          </h2>
          <DemoClientSWR initialPostId={1} />
        </section>

        {/* 5. Loading states */}
        <section className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            5. Loading States
          </h2>
          <DemoLoadingStates />
        </section>

        {/* 6. Error handling and retry */}
        <section className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            6. Error Handling & Retry
          </h2>
          <DemoErrorHandling />
        </section>

        {/* 7. Caching and revalidation */}
        <section className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            7. Caching & Revalidation
          </h2>
          <DemoCaching />
        </section>

        {/* 8. Performance considerations */}
        <section className="bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            8. Performance Considerations
          </h2>
          <DemoPerformance todos={todos} />
        </section>

        {/* 9. Parallel Data Fetching */}
        <section className="bg-gray-800 p-5 rounded-lg shadow-lg col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            9. Parallel Data Fetching
          </h2>
          <Suspense
            fallback={<LoadingState message="Loading parallel data..." />}
          >
            <DemoParallelFetch />
          </Suspense>
        </section>
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Next.js Data Fetching Patterns - © {new Date().getFullYear()}</p>
        <p>
          Using{" "}
          <a
            href="https://jsonplaceholder.typicode.com/"
            className="underline hover:text-gray-400"
          >
            JSONPlaceholder
          </a>
        </p>
      </footer>
    </div>
  );
}
