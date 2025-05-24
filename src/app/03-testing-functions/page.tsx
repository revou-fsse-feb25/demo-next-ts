import CodeBlock from "@/components/CodeBlock";

export default function TestingFunctionsPage() {
  // Example of a math utility file
  const mathUtilsCode = `
// src/lib/mathUtils.ts

/**
 * Adds two numbers together.
 * @param a The first number.
 * @param b The second number.
 * @returns The sum of a and b.
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtracts one number from another.
 * @param a The number to subtract from.
 * @param b The number to subtract.
 * @returns The result of a - b.
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplies two numbers.
 * @param a The first number.
 * @param b The second number.
 * @returns The product of a and b.
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Divides one number by another.
 * @param a The dividend.
 * @param b The divisor.
 * @returns The result of a / b.
 * @throws Error if b is zero.
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
  `;

  // Example of basic tests for the math utility functions
  const mathUtilsTestCode = `
// src/lib/mathUtils.test.ts
import { add, subtract, multiply, divide } from './mathUtils';

describe('Math Utilities', () => {
  // Testing add function
  describe('add function', () => {
    test('should add two positive numbers correctly', () => {
      // Arrange
      const a = 2;
      const b = 3;
      const expected = 5;
      
      // Act
      const result = add(a, b);
      
      // Assert
      expect(result).toBe(expected);
    });
    
    test('should handle negative numbers', () => {
      expect(add(-5, 3)).toBe(-2);
      expect(add(5, -3)).toBe(2);
      expect(add(-5, -3)).toBe(-8);
    });
    
    test('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });
  });
  
  // Testing subtract function
  describe('subtract function', () => {
    test('should subtract two numbers correctly', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(3, 5)).toBe(-2);
      expect(subtract(-5, -3)).toBe(-2);
    });
  });
  
  // Testing multiply function
  describe('multiply function', () => {
    test('should multiply two numbers correctly', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
      expect(multiply(0, 5)).toBe(0);
    });
  });
  
  // Testing divide function
  describe('divide function', () => {
    test('should divide two numbers correctly', () => {
      expect(divide(6, 3)).toBe(2);
      expect(divide(6, -3)).toBe(-2);
      expect(divide(-6, -3)).toBe(2);
    });
    
    test('should throw an error when dividing by zero', () => {
      // Using a function wrapper to catch the error
      expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
    });
  });
});
  `;

  // Example of a string utility file
  const stringUtilsCode = `
// src/lib/stringUtils.ts

/**
 * Capitalizes the first letter of a string.
 * @param str The input string.
 * @returns The string with the first letter capitalized.
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Reverses a string.
 * @param str The input string.
 * @returns The reversed string.
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated.
 * @param str The input string.
 * @param maxLength The maximum length of the returned string (including ellipsis).
 * @returns The truncated string.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}
  `;

  // Example of tests for the string utility functions
  const stringUtilsTestCode = `
// src/lib/stringUtils.test.ts
import { capitalize, reverse, truncate } from './stringUtils';

describe('String Utilities', () => {
  // Testing capitalize function
  describe('capitalize function', () => {
    test('should capitalize the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
    });
    
    test('should not change already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });
    
    test('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });
    
    test('should handle single character strings', () => {
      expect(capitalize('a')).toBe('A');
    });
  });
  
  // Testing reverse function
  describe('reverse function', () => {
    test('should reverse a string', () => {
      expect(reverse('hello')).toBe('olleh');
    });
    
    test('should handle palindromes', () => {
      expect(reverse('radar')).toBe('radar');
    });
    
    test('should handle empty strings', () => {
      expect(reverse('')).toBe('');
    });
  });
  
  // Testing truncate function
  describe('truncate function', () => {
    test('should truncate a string if it exceeds maxLength', () => {
      expect(truncate('hello world', 8)).toBe('hel...');
    });
    
    test('should not truncate a string if it is shorter than maxLength', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });
    
    test('should handle edge case where maxLength is exactly string length', () => {
      expect(truncate('hello', 5)).toBe('hello');
    });
  });
});
  `;

  // Example of a more complex utility with dependencies
  const userUtilsCode = `
// src/lib/userUtils.ts

export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

/**
 * Validates a user object.
 * @param user The user object to validate.
 * @returns An object containing validation results.
 */
export function validateUser(user: Partial<User>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check required fields
  if (!user.name) {
    errors.push('Name is required');
  } else if (user.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!user.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(user.email)) {
    errors.push('Email is invalid');
  }
  
  // Check age if provided
  if (user.age !== undefined) {
    if (typeof user.age !== 'number') {
      errors.push('Age must be a number');
    } else if (user.age < 0) {
      errors.push('Age cannot be negative');
    } else if (user.age > 120) {
      errors.push('Age cannot be greater than 120');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Checks if an email is valid.
 * @param email The email to check.
 * @returns True if the email is valid, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formats a user's full name.
 * @param firstName The user's first name.
 * @param lastName The user's last name.
 * @returns The formatted full name.
 */
export function formatFullName(firstName: string, lastName: string): string {
  return \`\${firstName} \${lastName}\`.trim();
}
  `;

  // Example of tests for the user utility functions
  const userUtilsTestCode = `
// src/lib/userUtils.test.ts
import { validateUser, isValidEmail, formatFullName, User } from './userUtils';

describe('User Utilities', () => {
  // Testing isValidEmail function
  describe('isValidEmail function', () => {
    test('should return true for valid emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('user.name@example.co.uk')).toBe(true);
    });
    
    test('should return false for invalid emails', () => {
      expect(isValidEmail('user@example')).toBe(false);
      expect(isValidEmail('user@.com')).toBe(false);
      expect(isValidEmail('user@example.')).toBe(false);
      expect(isValidEmail('userexample.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });
  
  // Testing formatFullName function
  describe('formatFullName function', () => {
    test('should format first and last name correctly', () => {
      expect(formatFullName('John', 'Doe')).toBe('John Doe');
    });
    
    test('should handle empty strings', () => {
      expect(formatFullName('', 'Doe')).toBe('Doe');
      expect(formatFullName('John', '')).toBe('John');
      expect(formatFullName('', '')).toBe('');
    });
  });
  
  // Testing validateUser function
  describe('validateUser function', () => {
    test('should validate a valid user', () => {
      const user: Partial<User> = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
      };
      
      const result = validateUser(user);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
    
    test('should return errors for invalid user', () => {
      const user: Partial<User> = {
        name: 'J',
        email: 'invalid-email',
        age: 150
      };
      
      const result = validateUser(user);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name must be at least 2 characters');
      expect(result.errors).toContain('Email is invalid');
      expect(result.errors).toContain('Age cannot be greater than 120');
    });
    
    test('should validate a user without age', () => {
      const user: Partial<User> = {
        name: 'John Doe',
        email: 'john@example.com'
      };
      
      const result = validateUser(user);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
    
    test('should validate required fields', () => {
      const user: Partial<User> = {};
      
      const result = validateUser(user);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name is required');
      expect(result.errors).toContain('Email is required');
    });
  });
});
  `;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-sky-400 mb-4">
          3. Testing Functions
        </h1>
        <p className="text-lg text-gray-300">
          Learn how to write tests for TypeScript functions using Jest.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">
          Testing Pure Functions
        </h2>
        <div className="space-y-3 text-gray-200">
          <p>
            Pure functions are the easiest to test because they always return
            the same output for a given input and don't have side effects. Let's
            start by testing some simple math utility functions.
          </p>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
            <h3 className="text-xl font-medium text-sky-400 mb-2">
              Math Utility Functions
            </h3>
            <p className="mb-3">
              Here's a file with some simple math utility functions:
            </p>
            <CodeBlock code={mathUtilsCode} language="typescript" />
          </div>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 mt-4">
            <h3 className="text-xl font-medium text-sky-400 mb-2">
              Testing Math Functions
            </h3>
            <p className="mb-3">Here's how we can test these functions:</p>
            <CodeBlock code={mathUtilsTestCode} language="typescript" />

            <div className="mt-4 bg-gray-900 p-4 rounded-md">
              <h4 className="text-lg font-medium text-sky-400 mb-2">
                Key Testing Concepts
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                <li>
                  We use <code>describe</code> blocks to group related tests.
                </li>
                <li>
                  We test multiple scenarios for each function (positive
                  numbers, negative numbers, zero, etc.).
                </li>
                <li>
                  For the <code>divide</code> function, we test that it throws
                  an error when dividing by zero.
                </li>
                <li>
                  We follow the AAA pattern (Arrange-Act-Assert) for clarity.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">
          Testing String Manipulation
        </h2>
        <div className="space-y-3 text-gray-200">
          <p>
            String manipulation functions are also good candidates for unit
            testing. Let's look at some string utility functions.
          </p>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
            <h3 className="text-xl font-medium text-sky-400 mb-2">
              String Utility Functions
            </h3>
            <p className="mb-3">
              Here's a file with some string utility functions:
            </p>
            <CodeBlock code={stringUtilsCode} language="typescript" />
          </div>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 mt-4">
            <h3 className="text-xl font-medium text-sky-400 mb-2">
              Testing String Functions
            </h3>
            <p className="mb-3">Here's how we can test these functions:</p>
            <CodeBlock code={stringUtilsTestCode} language="typescript" />

            <div className="mt-4 bg-gray-900 p-4 rounded-md">
              <h4 className="text-lg font-medium text-sky-400 mb-2">
                Testing Edge Cases
              </h4>
              <p className="text-sm">Notice how we test various edge cases:</p>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm mt-2">
                <li>Empty strings</li>
                <li>Single character strings</li>
                <li>Already capitalized strings</li>
                <li>Palindromes (which remain the same when reversed)</li>
                <li>Strings that are exactly at the truncation limit</li>
              </ul>
              <p className="text-sm mt-2">
                Testing edge cases helps ensure your functions behave correctly
                in all situations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">
          Testing More Complex Functions
        </h2>
        <div className="space-y-3 text-gray-200">
          <p>
            Now let's look at testing more complex functions that have
            dependencies and handle more complex logic.
          </p>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
            <h3 className="text-xl font-medium text-sky-400 mb-2">
              User Utility Functions
            </h3>
            <p className="mb-3">
              Here's a file with user validation functions:
            </p>
            <CodeBlock code={userUtilsCode} language="typescript" />
          </div>

          <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 mt-4">
            <h3 className="text-xl font-medium text-sky-400 mb-2">
              Testing User Functions
            </h3>
            <p className="mb-3">Here's how we can test these functions:</p>
            <CodeBlock code={userUtilsTestCode} language="typescript" />

            <div className="mt-4 bg-gray-900 p-4 rounded-md">
              <h4 className="text-lg font-medium text-sky-400 mb-2">
                Testing Complex Logic
              </h4>
              <p className="text-sm">
                When testing more complex functions like{" "}
                <code>validateUser</code>:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm mt-2">
                <li>
                  We test multiple validation rules in different test cases.
                </li>
                <li>We check both valid and invalid inputs.</li>
                <li>We verify that the correct error messages are returned.</li>
                <li>
                  We test optional fields (like <code>age</code>).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-sky-300">
          Best Practices for Testing Functions
        </h2>
        <div className="space-y-3 text-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Test One Thing at a Time
              </h3>
              <p>
                Each test should focus on testing one specific behavior or
                aspect of your function. This makes tests easier to understand
                and debug when they fail.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Use Descriptive Test Names
              </h3>
              <p>
                Test names should clearly describe what is being tested and what
                the expected outcome is. Good:{" "}
                <code>should return an error when email is invalid</code>
                Bad: <code>test email validation</code>
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Test Edge Cases
              </h3>
              <p>
                Don't just test the happy path. Test edge cases, error
                conditions, and boundary values. This helps catch unexpected
                behavior.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Keep Tests Independent
              </h3>
              <p>
                Each test should be able to run independently of other tests.
                Don't create tests that depend on the state from previous tests.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Use Type Safety
              </h3>
              <p>
                Leverage TypeScript's type system in your tests. This helps
                catch type-related errors and provides better editor support.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-xl font-medium text-sky-400 mb-2">
                Follow AAA Pattern
              </h3>
              <p>
                Structure your tests using the Arrange-Act-Assert pattern for
                clarity and consistency. This makes tests easier to read and
                understand.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-700 pt-6 mt-10">
        <p className="text-gray-400">
          Now that you know how to test functions, let's move on to testing
          React components in the next section.
        </p>
      </div>
    </div>
  );
}
