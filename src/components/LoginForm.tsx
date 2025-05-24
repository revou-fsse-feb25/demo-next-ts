import React, { useState } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    // Clear any previous errors
    setError(null);

    // Call the onSubmit callback
    onSubmit(email, password);
  };

  return (
    <div className="p-6 border border-indigo-200 dark:border-indigo-800 rounded-lg bg-white dark:bg-slate-800 max-w-md mx-auto shadow-sm">
      <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
        Login
      </h2>

      {error && (
        <div className="bg-rose-100 dark:bg-rose-900/30 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 p-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-slate-700 dark:text-slate-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            placeholder="you@example.com"
            data-testid="email-input"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-slate-700 dark:text-slate-300 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            placeholder="••••••••"
            data-testid="password-input"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          data-testid="login-button"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
