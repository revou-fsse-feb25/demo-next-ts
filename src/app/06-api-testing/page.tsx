import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";

export default function ApiTestingPage() {
  const apiExample = `
// API service for products
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");

    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
`;

  const testExample = `
// Testing async functions
test('should fetch products successfully', async () => {
  // Mock successful response
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockProducts
  });

  // Call the function
  const result = await fetchProducts();

  // Assertions
  expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products');
  expect(result).toEqual(mockProducts);
});
`;

  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          API Testing Demo
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Learn how to test API interactions, async functions, and error
          handling
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            API Testing Overview
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            This section demonstrates how to test API interactions, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
            <li>Testing async functions</li>
            <li>Mocking API responses</li>
            <li>Testing error handling</li>
            <li>Testing advanced data processing</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            Demo Components
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Explore these components to see API testing in action:
          </p>
          <ul className="space-y-4">
            <li>
              <Link
                href="/06-api-testing/products"
                className="block p-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-md transition-colors"
              >
                <span className="font-medium text-indigo-700 dark:text-indigo-300">
                  Products List
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Fetching and displaying products
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/06-api-testing/search"
                className="block p-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-md transition-colors"
              >
                <span className="font-medium text-indigo-700 dark:text-indigo-300">
                  Search Products
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Searching products by title
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/06-api-testing/stats"
                className="block p-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-md transition-colors"
              >
                <span className="font-medium text-indigo-700 dark:text-indigo-300">
                  Product Statistics
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Advanced data processing
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
          Code Examples
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
              API Service
            </h3>
            <CodeBlock code={apiExample} language="typescript" title="api.ts" />
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
              API Test
            </h3>
            <CodeBlock
              code={testExample}
              language="typescript"
              title="api.test.ts"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
