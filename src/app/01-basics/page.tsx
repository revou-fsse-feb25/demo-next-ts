import CodeBlock from "@/components/CodeBlock";

export default function TestingBasicsPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-sky-400 mb-4">
          1. Testing Basics
        </h1>
        <p className="text-lg text-gray-300">
          Understanding the fundamentals of testing and why it matters.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">
          Why Test Your Code?
        </h2>
        <div className="space-y-3 text-gray-200">
          <p>
            Imagine building a complex Lego castle. You spend hours meticulously
            placing each brick. Then, you accidentally bump the table, and a
            crucial tower crumbles. Frustrating, right?
          </p>
          <p>
            In web development, tests are like little checks you put in place
            for each part of your "castle" (your application). They ensure that
            if you change something or add a new feature (like a new Lego
            tower), the existing parts still work as expected.
          </p>
          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
            <h3 className="text-xl font-medium text-sky-400 mb-2">
              Key Benefits of Testing
            </h3>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong className="text-sky-400">Catch Bugs Early:</strong> It's
                much easier and cheaper to fix a bug when it's first introduced
                than after it's been deployed to users.
              </li>
              <li>
                <strong className="text-sky-400">Improve Code Quality:</strong>{" "}
                Writing tests often forces you to think more clearly about how
                your code should behave, leading to better design.
              </li>
              <li>
                <strong className="text-sky-400">
                  Refactor with Confidence:
                </strong>{" "}
                Want to improve a piece of code or change how it works
                internally? Tests give you a safety net, ensuring you don't
                break existing functionality.
              </li>
              <li>
                <strong className="text-sky-400">Documentation:</strong> Tests
                serve as a form of documentation. They show how different parts
                of your code are intended to be used.
              </li>
              <li>
                <strong className="text-sky-400">Better Collaboration:</strong>{" "}
                When working in a team, tests help ensure that one person's
                changes don't accidentally break another person's code.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">Types of Tests</h2>
        <div className="space-y-3 text-gray-200">
          <p>
            There are several types of tests, each serving a different purpose
            and operating at a different level of your application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Unit Tests
              </h3>
              <p>Test individual functions or components in isolation.</p>
              <ul className="list-disc list-inside text-sm mt-2 pl-2">
                <li>Fast to run</li>
                <li>Easy to write</li>
                <li>Focus on small pieces of logic</li>
                <li>Example: Testing a function that calculates tax</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Integration Tests
              </h3>
              <p>Test how multiple units work together.</p>
              <ul className="list-disc list-inside text-sm mt-2 pl-2">
                <li>Verify components interact correctly</li>
                <li>More complex than unit tests</li>
                <li>Catch issues unit tests might miss</li>
                <li>Example: Testing a form submission flow</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                End-to-End Tests
              </h3>
              <p>Test the entire application flow.</p>
              <ul className="list-disc list-inside text-sm mt-2 pl-2">
                <li>Simulate real user behavior</li>
                <li>Slower and more complex</li>
                <li>Test the application as a whole</li>
                <li>Example: Testing user login to checkout flow</li>
              </ul>
            </div>
          </div>

          <p className="mt-4">
            In this workshop, we'll focus primarily on unit tests and some
            integration tests, as they form the foundation of a good testing
            strategy.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">
          The Testing Pyramid
        </h2>
        <div className="space-y-3 text-gray-200">
          <p>
            The testing pyramid is a concept that helps visualize the ideal
            distribution of different types of tests in your application.
          </p>

          <div className="flex justify-center py-8">
            <div className="w-64 h-64 relative">
              {/* E2E Tests */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-red-900 text-center flex items-center justify-center rounded-t-lg">
                <span>E2E Tests</span>
              </div>

              {/* Integration Tests */}
              <div className="absolute top-16 left-0 right-0 h-24 bg-yellow-800 text-center flex items-center justify-center">
                <span>Integration Tests</span>
              </div>

              {/* Unit Tests */}
              <div className="absolute top-40 left-0 right-0 h-24 bg-green-800 text-center flex items-center justify-center rounded-b-lg">
                <span>Unit Tests</span>
              </div>
            </div>
          </div>

          <p>The idea is to have:</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              <strong>Many unit tests</strong> - They're fast, cheap, and focus
              on small pieces of functionality
            </li>
            <li>
              <strong>Some integration tests</strong> - They ensure different
              parts work together correctly
            </li>
            <li>
              <strong>Few end-to-end tests</strong> - They're valuable but slow
              and expensive to maintain
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">
          Testing in TypeScript
        </h2>
        <div className="space-y-3 text-gray-200">
          <p>
            TypeScript adds static type checking to JavaScript, which already
            helps catch certain types of bugs before runtime. When combined with
            testing, it creates a powerful safety net for your code.
          </p>

          <p>Here's a simple example of a TypeScript function and its test:</p>

          <CodeBlock
            code={`// Function with TypeScript types
function multiply(a: number, b: number): number {
  return a * b;
}

// Test for the function
test('multiply should return the product of two numbers', () => {
  // Arrange
  const a = 3;
  const b = 4;
  const expected = 12;
  
  // Act
  const result = multiply(a, b);
  
  // Assert
  expect(result).toBe(expected);
});`}
            language="typescript"
          />

          <p>
            TypeScript helps ensure that the function receives the correct types
            of arguments, while the test verifies that the function behaves
            correctly with valid inputs.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">The AAA Pattern</h2>
        <div className="space-y-3 text-gray-200">
          <p>
            When writing tests, it's helpful to follow the AAA
            (Arrange-Act-Assert) pattern:
          </p>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 space-y-3">
            <div>
              <h3 className="text-xl font-medium text-sky-400">1. Arrange</h3>
              <p>Set up the test data, conditions, and environment.</p>
              <CodeBlock
                code={`const a = 3;
const b = 4;
const expected = 12;`}
                language="typescript"
              />
            </div>

            <div>
              <h3 className="text-xl font-medium text-sky-400">2. Act</h3>
              <p>Execute the code being tested.</p>
              <CodeBlock
                code={`const result = multiply(a, b);`}
                language="typescript"
              />
            </div>

            <div>
              <h3 className="text-xl font-medium text-sky-400">3. Assert</h3>
              <p>Verify that the result is what you expected.</p>
              <CodeBlock
                code={`expect(result).toBe(expected);`}
                language="typescript"
              />
            </div>
          </div>

          <p className="mt-2">
            Following this pattern makes your tests more readable and
            maintainable. It clearly separates the setup, the action being
            tested, and the verification.
          </p>
        </div>
      </section>

      <div className="border-t border-gray-700 pt-6 mt-10">
        <p className="text-gray-400">
          Now that you understand the basics of testing, let's move on to learn
          about Jest, the testing framework we'll use throughout this workshop.
        </p>
      </div>
    </div>
  );
}
