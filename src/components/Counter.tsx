"use client";
import React, { useState } from "react";

interface CounterProps {
  initialCount?: number;
  step?: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount = 0, step = 1 }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount((prevCount) => prevCount + step);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - step);
  };

  const reset = () => {
    setCount(initialCount);
  };

  return (
    <div className="p-4 border border-indigo-200 dark:border-indigo-800 rounded-lg bg-white dark:bg-slate-800 text-center shadow-sm">
      <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
        Counter
      </h2>
      <p className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
        {count}
      </p>
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
