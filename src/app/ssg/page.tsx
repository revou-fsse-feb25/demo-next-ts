import React from "react";
import Link from "next/link";
import { fetchPosts } from "../services/api";
import SSGPage from "../components/SSGPage";

// This enables Static Site Generation
export const dynamic = "force-static";

export default async function StaticSiteGenerationPage() {
  // TODO: Fetch data at build time
  const posts = await fetchPosts();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-white">
          Static Site Generation (SSG)
        </h1>
        <p className="text-gray-300">
          Data is fetched at build time, not on each request
        </p>
        <Link
          href="/"
          className="text-green-400 hover:text-green-300 mt-2 inline-block"
        >
          ← Back to home
        </Link>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
          <h2 className="text-xl font-medium mb-4 text-green-300">
            Static Generated Data
          </h2>

          <div className="p-4 bg-yellow-900/50 rounded border border-yellow-800 text-yellow-200 font-medium">
            <SSGPage posts={posts} />
          </div>
        </div>

        <div className="p-4 bg-green-900/50 rounded border border-green-800">
          <h3 className="font-medium text-green-300 mb-2">
            About Static Site Generation
          </h3>
          <p className="text-green-100">
            This page demonstrates static site generation in Next.js. The data
            is fetched at build time, not on each request. This allows for
            maximum performance as the page can be served from a CDN. The
            tradeoff is that the data may become stale if it changes after build
            time.
          </p>
          <p className="text-green-100 mt-2">
            In this example, we use the{" "}
            <code className="bg-green-800 px-1 rounded">
              dynamic = &apos;force-static&apos;
            </code>{" "}
            option to ensure this page is statically generated regardless of
            route configuration.
          </p>
        </div>
      </main>
    </div>
  );
}
