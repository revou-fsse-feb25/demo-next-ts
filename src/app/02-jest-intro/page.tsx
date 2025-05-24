import CodeBlock from "@/components/CodeBlock";

export default function JestIntroPage() {
  const jestConfigCode = `
// jest.config.js
const nextJest = require('next/jest')

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
  },
  preset: 'ts-jest',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config
module.exports = createJestConfig(config)
  `;

  const jestSetupCode = `
// jest.setup.js
import '@testing-library/jest-dom'
  `;

  const packageJsonCode = `
{
  "name": "demo-next-ts",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  // ... dependencies
}
  `;

  const tsConfigCode = `
{
  "compilerOptions": {
    // ... other options
    "types": ["jest", "@testing-library/jest-dom"]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "jest.setup.js"],
  "exclude": ["node_modules"]
}
  `;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-sky-400 mb-4">
          2. Jest Introduction
        </h1>
        <p className="text-lg text-gray-300">
          Setting up and using Jest in a Next.js TypeScript project.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">What is Jest?</h2>
        <div className="space-y-3 text-gray-200">
          <p>
            Jest is a delightful JavaScript Testing Framework with a focus on
            simplicity. It's developed by Facebook and is very popular in the
            React ecosystem.
          </p>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
            <h3 className="text-xl font-medium text-sky-400 mb-2">
              Key Features of Jest
            </h3>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong className="text-sky-400">Zero Configuration:</strong>{" "}
                Works out of the box for most JavaScript projects.
              </li>
              <li>
                <strong className="text-sky-400">Isolated Tests:</strong> Tests
                run in parallel in their own processes to maximize performance.
              </li>
              <li>
                <strong className="text-sky-400">Snapshot Testing:</strong>{" "}
                Capture "snapshots" of large objects to simplify testing and
                track changes.
              </li>
              <li>
                <strong className="text-sky-400">Mocking:</strong> Powerful
                mocking library for functions and modules.
              </li>
              <li>
                <strong className="text-sky-400">Code Coverage:</strong>{" "}
                Built-in code coverage reports.
              </li>
              <li>
                <strong className="text-sky-400">Watch Mode:</strong>{" "}
                Automatically re-run tests related to changed files.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">
          Setting up Jest in a Next.js Project
        </h2>
        <div className="space-y-3 text-gray-200">
          <p>Setting up Jest in a Next.js project requires a few steps:</p>

          <ol className="list-decimal list-inside space-y-6 pl-4">
            <li>
              <div>
                <h3 className="text-xl font-medium text-sky-400 mb-2">
                  Install Required Packages
                </h3>
                <CodeBlock
                  code={`pnpm add -D jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest`}
                  language="bash"
                />
                <ul className="list-disc list-inside text-sm mt-2 pl-4">
                  <li>
                    <code>jest</code>: The testing framework itself
                  </li>
                  <li>
                    <code>@types/jest</code>: TypeScript type definitions for
                    Jest
                  </li>
                  <li>
                    <code>jest-environment-jsdom</code>: Simulates a DOM
                    environment for testing
                  </li>
                  <li>
                    <code>@testing-library/react</code>: Utilities for testing
                    React components
                  </li>
                  <li>
                    <code>@testing-library/jest-dom</code>: Custom Jest matchers
                    for asserting on DOM elements
                  </li>
                  <li>
                    <code>ts-jest</code>: TypeScript preprocessor for Jest
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <div>
                <h3 className="text-xl font-medium text-sky-400 mb-2">
                  Create Jest Configuration
                </h3>
                <p className="mb-2">
                  Create a <code>jest.config.js</code> file in the root of your
                  project:
                </p>
                <CodeBlock code={jestConfigCode} language="javascript" />
                <p className="mt-2 text-sm">
                  This configuration sets up Jest to work with Next.js and
                  TypeScript. It also handles module aliases (like{" "}
                  <code>@/components</code>) and sets up the test environment.
                </p>
              </div>
            </li>

            <li>
              <div>
                <h3 className="text-xl font-medium text-sky-400 mb-2">
                  Create Jest Setup File
                </h3>
                <p className="mb-2">
                  Create a <code>jest.setup.js</code> file in the root of your
                  project:
                </p>
                <CodeBlock code={jestSetupCode} language="javascript" />
                <p className="mt-2 text-sm">
                  This file imports <code>@testing-library/jest-dom</code>,
                  which adds custom matchers like{" "}
                  <code>.toBeInTheDocument()</code> to Jest.
                </p>
              </div>
            </li>

            <li>
              <div>
                <h3 className="text-xl font-medium text-sky-400 mb-2">
                  Update package.json
                </h3>
                <p className="mb-2">
                  Add test scripts to your <code>package.json</code>:
                </p>
                <CodeBlock code={packageJsonCode} language="json" />
                <p className="mt-2 text-sm">
                  These scripts allow you to run tests with{" "}
                  <code>pnpm test</code> or in watch mode with{" "}
                  <code>pnpm test:watch</code>.
                </p>
              </div>
            </li>

            <li>
              <div>
                <h3 className="text-xl font-medium text-sky-400 mb-2">
                  Update tsconfig.json
                </h3>
                <p className="mb-2">
                  Add Jest types to your TypeScript configuration:
                </p>
                <CodeBlock code={tsConfigCode} language="json" />
                <p className="mt-2 text-sm">
                  This ensures TypeScript recognizes Jest globals like{" "}
                  <code>describe</code>, <code>test</code>, and{" "}
                  <code>expect</code>.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">Jest Basics</h2>
        <div className="space-y-3 text-gray-200">
          <p>
            Let's go through the basic building blocks of writing tests with
            Jest:
          </p>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 space-y-6">
            <div>
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Test Blocks
              </h3>
              <CodeBlock
                code={`// Individual test
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

// Alternative syntax
it('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});`}
                language="typescript"
              />
              <p className="mt-1 text-sm">
                <code>test</code> and <code>it</code> are aliases - they do the
                same thing. Use whichever reads better to you.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Test Suites
              </h3>
              <CodeBlock
                code={`// Group related tests
describe('Math operations', () => {
  test('addition works', () => {
    expect(1 + 2).toBe(3);
  });
  
  test('subtraction works', () => {
    expect(5 - 2).toBe(3);
  });
});`}
                language="typescript"
              />
              <p className="mt-1 text-sm">
                <code>describe</code> blocks group related tests. You can nest{" "}
                <code>describe</code> blocks for more organization.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Common Matchers
              </h3>
              <CodeBlock
                code={`// Exact equality
expect(2 + 2).toBe(4);

// Object equality (checks values, not references)
expect({ name: 'John' }).toEqual({ name: 'John' });

// Truthiness
expect(true).toBeTruthy();
expect(false).toBeFalsy();
expect(null).toBeNull();
expect(undefined).toBeUndefined();

// Numbers
expect(4).toBeGreaterThan(3);
expect(4).toBeLessThan(5);

// Strings
expect('Hello world').toMatch(/world/);

// Arrays
expect([1, 2, 3]).toContain(2);

// Exceptions
expect(() => {
  throw new Error('Error!');
}).toThrow();`}
                language="typescript"
              />
              <p className="mt-1 text-sm">
                Jest provides many matchers to make assertions in different
                ways. These are just a few examples.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">Running Tests</h2>
        <div className="space-y-3 text-gray-200">
          <p>
            With our setup complete, we can run tests in a few different ways:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Run All Tests
              </h3>
              <CodeBlock code={`pnpm test`} language="bash" />
              <p className="mt-2 text-sm">
                This runs all test files in your project once and shows the
                results.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Watch Mode
              </h3>
              <CodeBlock code={`pnpm test:watch`} language="bash" />
              <p className="mt-2 text-sm">
                This starts Jest in watch mode, which automatically re-runs
                tests when files change. Great for development!
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Run Specific Tests
              </h3>
              <CodeBlock
                code={`pnpm test -- -t "test name pattern"`}
                language="bash"
              />
              <p className="mt-2 text-sm">
                This runs only tests that match the specified pattern.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Run Tests with Coverage
              </h3>
              <CodeBlock code={`pnpm test -- --coverage`} language="bash" />
              <p className="mt-2 text-sm">
                This runs tests and generates a coverage report, showing which
                parts of your code are tested.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-700 pt-6 mt-10">
        <p className="text-gray-400">
          Now that we have Jest set up and understand its basics, let's move on
          to writing actual tests for functions in the next section.
        </p>
      </div>
    </div>
  );
}
