"use client";

import { useForm } from "@/hooks/useForm";
import CodeBlock from "@/components/CodeBlock";

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export default function FormDemoPage() {
  const initialValues: SignupFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  };

  const validation = {
    firstName: [
      {
        validate: (value: string) => value.trim().length > 0,
        message: "First name is required",
      },
    ],
    lastName: [
      {
        validate: (value: string) => value.trim().length > 0,
        message: "Last name is required",
      },
    ],
    email: [
      {
        validate: (value: string) => value.trim().length > 0,
        message: "Email is required",
      },
      {
        validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Email is not valid",
      },
    ],
    password: [
      {
        validate: (value: string) => value.length > 0,
        message: "Password is required",
      },
      {
        validate: (value: string) => value.length >= 8,
        message: "Password must be at least 8 characters",
      },
      {
        validate: (value: string) => /[A-Z]/.test(value),
        message: "Password must contain at least one uppercase letter",
      },
      {
        validate: (value: string) => /[0-9]/.test(value),
        message: "Password must contain at least one number",
      },
    ],
    confirmPassword: [
      {
        validate: (value: string, formValues: SignupFormValues) =>
          value === formValues.password,
        message: "Passwords must match",
      },
    ],
    agreeTerms: [
      {
        validate: (value: boolean) => value === true,
        message: "You must agree to the terms and conditions",
      },
    ],
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isSubmitting,
    isValid,
  } = useForm<SignupFormValues>({
    initialValues,
    validation,
    onSubmit: (values, { resetForm }) => {
      // Simulate API call
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          resolve();
          // Uncomment to reset form after submission
          // resetForm();
        }, 1500);
      });
    },
  });

  const useFormCode = `// Implementation (simplified)
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

type ValidationRule<T> = {
  validate: (value: any, formValues: T) => boolean;
  message: string;
};

interface UseFormOptions<T> {
  initialValues: T;
  validation?: { [key: string]: ValidationRule<T>[] };
  onSubmit: (values: T, helpers: { resetForm: () => void }) => void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validation = {},
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Validation logic
  // Change handlers
  // Blur handlers
  // Submit handler
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
    isSubmitting,
    isValid,
  };
}`;

  const usageCode = `// Usage
const {
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  isValid,
} = useForm<SignupFormValues>({
  initialValues: {
    firstName: "",
    email: "",
    // ...other fields
  },
  validation: {
    firstName: [
      {
        validate: (value) => value.trim().length > 0,
        message: "First name is required",
      },
    ],
    email: [
      {
        validate: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
        message: "Email is not valid",
      },
    ],
    // ...validation for other fields
  },
  onSubmit: (values, { resetForm }) => {
    // Submit form data to server
    submitToServer(values).then(() => {
      resetForm();
    });
  },
});

// In your JSX:
<form onSubmit={handleSubmit}>
  <input
    name="firstName"
    value={values.firstName}
    onChange={handleChange}
    onBlur={handleBlur}
  />
  {touched.firstName && errors.firstName && (
    <div className="error">{errors.firstName[0]}</div>
  )}
  
  {/* Other form fields */}
  
  <button type="submit" disabled={isSubmitting || !isValid}>
    Submit
  </button>
</form>`;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useForm Hook Demo</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">About useForm</h2>
        <p className="mb-4">
          The <code className="bg-gray-100 px-1 py-0.5 rounded">useForm</code>{" "}
          hook simplifies form handling in React applications. It provides
          validation, touched states, error messages, and form submission
          handling.
        </p>
        <p>
          This custom hook is inspired by Formik but built specifically for our
          application needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Implementation</h2>
          <CodeBlock code={useFormCode} language="typescript" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
          <CodeBlock code={usageCode} language="typescript" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Live Demo: Signup Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="firstName">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                  </svg>
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 px-3 py-2 border rounded w-full transition-all duration-200 ${
                    touched.firstName && errors.firstName
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
              </div>
              {touched.firstName && errors.firstName && (
                <p className="text-error text-sm mt-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.firstName[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`px-3 py-2 border rounded w-full ${
                  touched.lastName && errors.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.lastName && errors.lastName && (
                <p className="text-error text-sm mt-1">{errors.lastName[0]}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`pl-10 px-3 py-2 border rounded w-full transition-all duration-200 ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
            </div>
            {touched.email && errors.email && (
              <p className="text-error text-sm mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.email[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`pl-10 px-3 py-2 border rounded w-full transition-all duration-200 ${
                  touched.password && errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
            </div>
            {touched.password && errors.password && (
              <div className="text-error text-sm mt-1">
                {errors.password.map((error, index) => (
                  <p key={index} className="flex items-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`px-3 py-2 border rounded w-full ${
                touched.confirmPassword && errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-error text-sm mt-1">
                {errors.confirmPassword[0]}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={values.agreeTerms}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="ml-2 block text-gray-700" htmlFor="agreeTerms">
              I agree to the terms and conditions
            </label>
          </div>
          {touched.agreeTerms && errors.agreeTerms && (
            <p className="text-error text-sm">{errors.agreeTerms[0]}</p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`px-4 py-2 rounded text-white flex items-center justify-center transition-all duration-200 ${
                isSubmitting || !isValid
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 hover:shadow-md transform hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Submit
                </>
              )}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10 4.5c1.215 0 2.417.055 3.604.162a.68.68 0 01.615.597c.124 1.038.208 2.088.25 3.15l-1.689-1.69a.75.75 0 00-1.06 1.061l2.999 3a.75.75 0 001.06 0l3.001-3a.75.75 0 10-1.06-1.06l-1.748 1.747a41.31 41.31 0 00-.264-3.386 2.18 2.18 0 00-1.97-1.913 41.512 41.512 0 00-7.477 0 2.18 2.18 0 00-1.969 1.913 41.16 41.16 0 00-.16 1.61.75.75 0 101.495.12c.041-.52.093-1.038.154-1.552a.68.68 0 01.615-.597A40.012 40.012 0 0110 4.5zM5.281 9.22a.75.75 0 00-1.06 0l-3.001 3a.75.75 0 101.06 1.06l1.748-1.747c.042 1.141.13 2.27.264 3.386a2.18 2.18 0 001.97 1.913 41.533 41.533 0 007.477 0 2.18 2.18 0 001.969-1.913c.064-.534.117-1.071.16-1.61a.75.75 0 10-1.495-.12c-.041.52-.093 1.037-.154 1.552a.68.68 0 01-.615.597 40.013 40.013 0 01-7.208 0 .68.68 0 01-.615-.597 39.785 39.785 0 01-.25-3.15l1.689 1.69a.75.75 0 001.06-1.061l-2.999-3z"
                  clipRule="evenodd"
                />
              </svg>
              Reset
            </button>
          </div>
        </form>

        <div
          className="mt-6 p-4 border rounded"
          style={{
            backgroundColor: "var(--card-bg)",
            color: "var(--card-text)",
            borderColor: "#4b5563",
          }}
        >
          <h3 className="font-semibold mb-2">Form State:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1 text-sm">Values:</h4>
              <pre
                className="p-2 rounded text-xs overflow-auto max-h-40"
                style={{
                  backgroundColor: "var(--code-bg)",
                  color: "var(--code-text)",
                }}
              >
                {JSON.stringify(values, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-1 text-sm">Errors:</h4>
              <pre
                className="p-2 rounded text-xs overflow-auto max-h-40"
                style={{
                  backgroundColor: "var(--code-bg)",
                  color: "var(--code-text)",
                }}
              >
                {JSON.stringify(errors, null, 2)}
              </pre>
            </div>
          </div>
          <div className="mt-2">
            <h4 className="font-medium mb-1 text-sm">Touched Fields:</h4>
            <pre
              className="p-2 rounded text-xs overflow-auto max-h-20"
              style={{
                backgroundColor: "var(--code-bg)",
                color: "var(--code-text)",
              }}
            >
              {JSON.stringify(touched, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Form state management with TypeScript support</li>
          <li>Field-level validation with custom validation rules</li>
          <li>Touched state tracking to show errors only after interaction</li>
          <li>Support for different input types (text, checkbox, etc.)</li>
          <li>Form submission handling with loading state</li>
          <li>Form reset functionality</li>
          <li>Validation on blur, change, and submit</li>
        </ul>
      </div>
    </div>
  );
}
