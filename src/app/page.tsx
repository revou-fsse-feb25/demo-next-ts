"use client";

import Link from "next/link";
import PropsDrillingExample from "@/components/PropsDrillingExample";
import { motion } from "framer-motion";

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.h1
        className="text-3xl font-bold mb-8 text-text-light dark:text-white text-center sm:text-left"
        variants={fadeIn}
      >
        State Management in React & Next.js
      </motion.h1>

      <motion.section
        className="mb-10 bg-card-light dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
        variants={fadeIn}
      >
        <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-white">
          When to use global vs local state
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            Choosing between global and local state is a fundamental decision in
            React applications:
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2 text-text-light dark:text-white">
            Local State
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700 dark:text-gray-300">
            <li>
              Use for component-specific data that doesn't need to be shared
            </li>
            <li>Ideal for form inputs, toggles, and UI state</li>
            <li>Managed with useState or useReducer hooks</li>
            <li>Simpler to maintain and less prone to bugs</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2 text-text-light dark:text-white">
            Global State
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700 dark:text-gray-300">
            <li>Use for data needed across multiple components</li>
            <li>
              Examples: user authentication, shopping cart, theme preferences
            </li>
            <li>Managed with Context API or state management libraries</li>
            <li>Prevents props drilling through many component layers</li>
          </ul>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-md border border-blue-200 dark:border-gray-600">
            <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
              <strong>Best Practice:</strong> Start with local state and move to
              global state only when necessary. Overusing global state can make
              your application harder to maintain and debug.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section className="mb-10" variants={fadeIn}>
        <PropsDrillingExample />
      </motion.section>

      <motion.section
        className="mb-10 bg-card-light dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
        variants={fadeIn}
      >
        <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-white">
          Demo Examples
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          Explore our practical examples of state management in action:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/products"
            className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all transform hover:scale-[1.02] border border-gray-200 dark:border-gray-600 block"
          >
            <h3 className="text-lg font-semibold text-primary-light dark:text-blue-300 mb-1.5">
              Shopping Cart Example
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              See how Context API manages a shopping cart across different
              components.
            </p>
          </Link>
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-primary-light dark:text-blue-300 mb-1.5">
              Theme Toggle
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              The dark/light mode toggle in the navbar uses Context API for
              theme management.
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
