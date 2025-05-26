"use client";
import React from "react";
import Counter from "@/components/Counter";
import LoginForm from "@/components/LoginForm";

export default function UserInteractionsPage() {
  const handleLogin = (email: string, password: string) => {
    alert(`Login attempt with email: ${email}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
        Testing User Interactions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
            1. Testing Button Clicks
          </h2>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              The Counter component demonstrates how to test user interactions
              with buttons. We test increment, decrement, and reset
              functionality.
            </p>
            <Counter initialCount={5} step={1} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
            2. Testing Form Submissions
          </h2>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              The LoginForm component demonstrates how to test form submissions,
              validation, and error handling.
            </p>
            <LoginForm onSubmit={handleLogin} />
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
          Testing Techniques
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium mb-2 text-slate-800 dark:text-slate-200">
              Testing Button Interactions
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              To test button clicks, we use the{" "}
              <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">
                fireEvent.click()
              </code>{" "}
              method from React Testing Library. This simulates a user clicking
              on a button and allows us to verify that the expected state
              changes occur.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2 text-slate-800 dark:text-slate-200">
              Testing Form Inputs
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              For form inputs, we use{" "}
              <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">
                fireEvent.change()
              </code>{" "}
              to simulate typing in input fields. We can then verify that the
              component state updates correctly.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2 text-slate-800 dark:text-slate-200">
              Testing Form Submissions
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              To test form submissions, we fill in the form fields using{" "}
              <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">
                fireEvent.change()
              </code>
              , then trigger the submission with{" "}
              <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">
                fireEvent.click()
              </code>{" "}
              on the submit button or
              <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">
                fireEvent.submit()
              </code>{" "}
              on the form element. We can use Jest mock functions to verify that
              callbacks are called with the expected arguments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
