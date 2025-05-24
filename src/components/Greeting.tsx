import React from "react";

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
        Hello, {name ? name : "Stranger"}!
      </p>
    </div>
  );
};

export default Greeting;
