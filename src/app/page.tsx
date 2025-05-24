import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import Counter from "@/components/Counter";

export default function HomePage() {
  const simpleTestExample = `
// A simple test example
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});
`;

  const componentTestExample = `
// Testing a React component
test('renders counter and increments when clicked', () => {
  render(<Counter />);
  
  // Check initial state
  expect(screen.getByText('0')).toBeInTheDocument();
  
  // Click the increment button
  fireEvent.click(screen.getByRole('button', { name: /increment/i }));
  
  // Check updated state
  expect(screen.getByText('1')).toBeInTheDocument();
});
`;

  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          Next.js Testing Workshop
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Learn how to write effective tests for your Next.js applications using
          Jest and React Testing Library
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            Workshop Overview
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            This workshop will guide you through the fundamentals of testing in
            Next.js, from basic JavaScript function testing to complex React
            component testing.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
            <li>Understanding why testing is important</li>
            <li>Setting up Jest with Next.js</li>
            <li>Writing tests for JavaScript/TypeScript functions</li>
            <li>Testing React components with React Testing Library</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            How to Use This Workshop
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Navigate through the sections using the navigation bar at the top.
            Each section builds on the previous one, introducing new concepts
            gradually.
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            The code examples are designed to be simple and focused on the
            testing concepts being taught. You can run the tests yourself using
            the commands below.
          </p>
          <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md font-mono text-sm">
            <code className="text-emerald-600 dark:text-emerald-400">
              pnpm test
            </code>{" "}
            - Run all tests once
            <br />
            <code className="text-emerald-600 dark:text-emerald-400">
              pnpm test:watch
            </code>{" "}
            - Run tests in watch mode
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
          Quick Demo
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
              A Simple Test
            </h3>
            <CodeBlock
              code={simpleTestExample}
              language="typescript"
              title="simple-test.test.ts"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
              Component Test
            </h3>
            <CodeBlock
              code={componentTestExample}
              language="typescript"
              title="Counter.test.tsx"
            />
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
              Interactive Component Example
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Try interacting with this Counter component. In the workshop,
              you'll learn how to test components like this.
            </p>
            <div className="max-w-xs mx-auto">
              <Counter />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
          Ready to Start?
        </h2>
        <Link
          href="/01-basics"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Begin with Testing Basics
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
