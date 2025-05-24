import CodeBlock from "@/components/CodeBlock";
import Greeting from "@/components/Greeting";
import Counter from "@/components/Counter";

export default function ComponentTestingPage() {
  // Example of a simple component
  const greetingComponentCode = `
// src/components/Greeting.tsx
import React from 'react';

interface GreetingProps {
  name?: string;
}

/**
 * A simple component that displays a greeting message.
 * If a name is provided, it greets the name, otherwise, it greets "Stranger".
 */
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div className="p-4 my-4 border border-indigo-200 dark:border-indigo-800 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
      <p className="text-lg text-indigo-600 dark:text-indigo-400">
        Hello, {name ? name : 'Stranger'}!
      </p>
    </div>
  );
};

export default Greeting;
  `;

  // Example of tests for the Greeting component
  const greetingTestCode = `
// src/components/Greeting.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

// Test suite for the Greeting component
describe('Greeting Component', () => {
  // Test case 1: Rendering with a name prop
  test('should render a greeting with the provided name', () => {
    const testName = "Alice";

    // Arrange: Render the component with a name prop
    render(<Greeting name={testName} />);

    // Act: (Implicit) The component renders.

    // Assert: Check if the greeting message with the name is in the document.
    // screen.getByText is an RTL query to find an element by its text content.
    const greetingElement = screen.getByText(\`Hello, \${testName}!\`);
    expect(greetingElement).toBeInTheDocument();
  });

  // Test case 2: Rendering without a name prop (default behavior)
  test('should render a greeting with "Stranger" if no name is provided', () => {
    // Arrange: Render the component without a name prop
    render(<Greeting />);

    // Assert: Check if the default greeting message is in the document.
    const greetingElement = screen.getByText('Hello, Stranger!');
    expect(greetingElement).toBeInTheDocument();
  });

  // Test case 3: Snapshot test (Optional, but good for UI consistency)
  test('should match snapshot when a name is provided', () => {
    const { container } = render(<Greeting name="Bob" />);
    // .toMatchSnapshot() creates a snapshot file on the first run,
    // and compares against it on subsequent runs.
    expect(container.firstChild).toMatchSnapshot();
  });
});
  `;

  // Example of a counter component with state and events
  const counterComponentCode = `
// src/components/Counter.tsx
import React, { useState } from 'react';

interface CounterProps {
  initialCount?: number;
  step?: number;
}

const Counter: React.FC<CounterProps> = ({ 
  initialCount = 0, 
  step = 1 
}) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(prevCount => prevCount + step);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - step);
  };

  const reset = () => {
    setCount(initialCount);
  };

  return (
    <div className="p-4 border border-indigo-200 dark:border-indigo-800 rounded-lg bg-white dark:bg-slate-800 text-center shadow-sm">
      <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Counter</h2>
      <p className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{count}</p>
      <div className="flex justify-center gap-2">
        <button
          onClick={decrement}
          className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
          aria-label="Decrement"
        >
          -
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 bg-slate-500 hover:bg-slate-600 text-white rounded-md transition-colors"
          aria-label="Reset"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
          aria-label="Increment"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
  `;

  // Example of a form component
  const formComponentCode = `
// src/components/LoginForm.tsx
import React, { useState } from 'react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
    // Call the onSubmit callback
    onSubmit(email, password);
  };

  return (
    <div className="p-6 border border-sky-500 rounded-lg bg-sky-900/30 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-sky-300 mb-4">Login</h2>
      
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 p-2 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-200 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            placeholder="you@example.com"
            data-testid="email-input"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-200 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            placeholder="••••••••"
            data-testid="password-input"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-md"
          data-testid="login-button"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
  `;

  // Example of tests for the form component
  const formTestCode = `
// src/components/LoginForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {
  // Mock function for the onSubmit prop
  const mockSubmit = jest.fn();
  
  // Reset the mock before each test
  beforeEach(() => {
    mockSubmit.mockReset();
  });
  
  test('should render login form with email and password inputs', () => {
    render(<LoginForm onSubmit={mockSubmit} />);
    
    // Check if form elements are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });
  
  test('should show error when submitting without email', () => {
    render(<LoginForm onSubmit={mockSubmit} />);
    
    // Fill only password
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit the form
    const submitButton = screen.getByTestId('login-button');
    fireEvent.click(submitButton);
    
    // Check if error message is shown
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    
    // Check that onSubmit was not called
    expect(mockSubmit).not.toHaveBeenCalled();
  });
  
  test('should show error when submitting without password', () => {
    render(<LoginForm onSubmit={mockSubmit} />);
    
    // Fill only email
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Submit the form
    const submitButton = screen.getByTestId('login-button');
    fireEvent.click(submitButton);
    
    // Check if error message is shown
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    
    // Check that onSubmit was not called
    expect(mockSubmit).not.toHaveBeenCalled();
  });
  
  test('should call onSubmit with email and password when form is valid', () => {
    render(<LoginForm onSubmit={mockSubmit} />);
    
    // Fill form
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit the form
    const submitButton = screen.getByTestId('login-button');
    fireEvent.click(submitButton);
    
    // Check that onSubmit was called with correct arguments
    expect(mockSubmit).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
  `;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          4. Component Testing
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Learn how to test React components using React Testing Library.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
          Introduction to React Testing Library
        </h2>
        <div className="space-y-3 text-slate-600 dark:text-slate-300">
          <p>
            React Testing Library (RTL) is a testing utility that helps you test
            React components in a way that resembles how users interact with
            your application. It encourages testing behavior rather than
            implementation details.
          </p>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              Key Principles of React Testing Library
            </h3>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong className="text-indigo-600 dark:text-indigo-400">
                  Test behavior, not implementation:
                </strong>{" "}
                Focus on what the user sees and interacts with, not how the
                component is implemented.
              </li>
              <li>
                <strong className="text-indigo-600 dark:text-indigo-400">
                  Find elements by accessibility attributes:
                </strong>{" "}
                Use queries that reflect how users find elements (by text, role,
                label, etc.).
              </li>
              <li>
                <strong className="text-indigo-600 dark:text-indigo-400">
                  Avoid testing internal state:
                </strong>{" "}
                Test the output and behavior of components, not their internal
                state.
              </li>
              <li>
                <strong className="text-indigo-600 dark:text-indigo-400">
                  Write maintainable tests:
                </strong>{" "}
                Tests should be resilient to implementation changes.
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 mt-4">
            <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              Core Functions and Utilities
            </h3>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <code>render()</code>: Renders a React component into a virtual
                DOM for testing.
              </li>
              <li>
                <code>screen</code>: An object that provides methods to query
                the rendered component.
              </li>
              <li>
                <code>fireEvent</code>: Simulates DOM events like clicks, input
                changes, etc.
              </li>
              <li>
                <code>waitFor()</code>: Waits for expectations to pass (useful
                for async operations).
              </li>
              <li>
                <code>userEvent</code>: A more advanced way to simulate user
                interactions (from <code>@testing-library/user-event</code>).
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
          Testing a Simple Component
        </h2>
        <div className="space-y-3 text-slate-600 dark:text-slate-300">
          <p>
            Let's start with testing a simple component that renders a greeting
            message.
          </p>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              Greeting Component
            </h3>
            <p className="mb-3">
              Here's a simple <code>Greeting</code> component:
            </p>
            <CodeBlock
              code={greetingComponentCode}
              language="tsx"
              title="src/components/Greeting.tsx"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm mt-4">
            <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              Testing the Greeting Component
            </h3>
            <p className="mb-3">Here's how we can test this component:</p>
            <CodeBlock
              code={greetingTestCode}
              language="tsx"
              title="src/components/Greeting.test.tsx"
            />

            <div className="mt-4 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <h4 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                Key Testing Concepts
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                <li>
                  <code>render()</code> renders the component into a virtual
                  DOM.
                </li>
                <li>
                  <code>screen.getByText()</code> finds an element by its text
                  content.
                </li>
                <li>
                  <code>toBeInTheDocument()</code> checks if an element is in
                  the document.
                </li>
                <li>
                  <code>toMatchSnapshot()</code> creates or compares a snapshot
                  of the rendered component.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              Live Example
            </h3>
            <p className="mb-3">Here's the Greeting component in action:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  With a name:
                </p>
                <Greeting name="Test User" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  Without a name (default):
                </p>
                <Greeting />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
          Testing Components with State and Events
        </h2>
        <div className="space-y-3 text-slate-600 dark:text-slate-300">
          <p>
            Now let's test a component with state and user interactions. We'll
            create a simple Counter component.
          </p>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              Counter Component
            </h3>
            <p className="mb-3">
              Here's a Counter component with increment, decrement, and reset
              functionality:
            </p>
            <CodeBlock
              code={counterComponentCode}
              language="tsx"
              title="src/components/Counter.tsx"
            />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              Live Example
            </h3>
            <p className="mb-3">Here's the Counter component in action:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  Default counter:
                </p>
                <Counter />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  Counter with initialCount=10 and step=5:
                </p>
                <Counter initialCount={10} step={5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
          Testing Forms and User Input
        </h2>
        <div className="space-y-3 text-slate-600 dark:text-slate-300">
          <p>
            Forms are common in web applications and require special attention
            when testing. Let's test a login form component.
          </p>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              Login Form Component
            </h3>
            <p className="mb-3">Here's a simple login form component:</p>
            <CodeBlock
              code={formComponentCode}
              language="tsx"
              title="src/components/LoginForm.tsx"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm mt-4">
            <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
              Testing the Login Form
            </h3>
            <p className="mb-3">Here's how we can test this form:</p>
            <CodeBlock
              code={formTestCode}
              language="tsx"
              title="src/components/LoginForm.test.tsx"
            />

            <div className="mt-4 bg-slate-100 dark:bg-slate-900 p-4 rounded-md">
              <h4 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                Testing Forms
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                <li>
                  <code>
                    fireEvent.change(input, {"{"} target: {"{"} value: 'text'{" "}
                    {"}"} {"}"})
                  </code>{" "}
                  simulates typing in an input field.
                </li>
                <li>
                  <code>jest.fn()</code> creates a mock function that we can use
                  to spy on function calls.
                </li>
                <li>We test form validation by checking error messages.</li>
                <li>
                  We test form submission by checking if the{" "}
                  <code>onSubmit</code> callback is called with the correct
                  arguments.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
          Best Practices for Component Testing
        </h2>
        <div className="space-y-3 text-slate-600 dark:text-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                Prefer Accessible Queries
              </h3>
              <p>Use queries that reflect how users interact with your UI:</p>
              <ul className="list-disc list-inside text-sm mt-2 pl-2">
                <li>
                  <code>getByRole</code> (preferred)
                </li>
                <li>
                  <code>getByLabelText</code> (for form fields)
                </li>
                <li>
                  <code>getByText</code> (for non-interactive elements)
                </li>
                <li>
                  <code>getByAltText</code> (for images)
                </li>
                <li>
                  <code>getByTitle</code> (when other options don't work)
                </li>
              </ul>
              <p className="text-sm mt-2">
                Avoid <code>getByTestId</code> when possible, but it's useful as
                a last resort.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                Test User Flows, Not Implementation
              </h3>
              <p>Focus on testing how users interact with your component:</p>
              <ul className="list-disc list-inside text-sm mt-2 pl-2">
                <li>What does the user see?</li>
                <li>What happens when they click a button?</li>
                <li>What happens when they submit a form?</li>
                <li>What error messages are displayed?</li>
              </ul>
              <p className="text-sm mt-2">
                Don't test implementation details like state variables or
                private methods.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                Mock External Dependencies
              </h3>
              <p>
                Use Jest's mocking capabilities to isolate components from
                external dependencies:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 pl-2">
                <li>API calls</li>
                <li>Redux store</li>
                <li>Context providers</li>
                <li>Third-party libraries</li>
              </ul>
              <p className="text-sm mt-2">
                This ensures your tests are focused on the component's behavior.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                Use Snapshots Judiciously
              </h3>
              <p>Snapshots are useful but can be brittle:</p>
              <ul className="list-disc list-inside text-sm mt-2 pl-2">
                <li>Use for small, stable components</li>
                <li>Review snapshot diffs carefully</li>
                <li>Don't rely solely on snapshots</li>
                <li>Consider inline snapshots for smaller components</li>
              </ul>
              <p className="text-sm mt-2">
                Snapshots are best as a complement to other tests, not a
                replacement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-700 pt-6 mt-10">
        <p className="text-slate-400">
          Now that you know how to test React components, you can move on to
          more advanced testing techniques in the next section.
        </p>
      </div>
    </div>
  );
}
