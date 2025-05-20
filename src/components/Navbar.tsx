"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [isCartHighlighted, setIsCartHighlighted] = useState(false);
  const [prevTotalItems, setPrevTotalItems] = useState(0);

  // Effect to highlight cart when items are added
  useEffect(() => {
    if (totalItems > prevTotalItems) {
      setIsCartHighlighted(true);
      const timer = setTimeout(() => {
        setIsCartHighlighted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    setPrevTotalItems(totalItems);
  }, [totalItems, prevTotalItems]);

  return (
    <nav className="sticky top-0 z-10 bg-card-light dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary-light dark:text-white hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              NextShop
            </Link>
          </div>

          <div className="flex items-center space-x-5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow-sm border border-gray-200 dark:border-gray-600"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Navigation Links */}
            <Link
              href="/"
              className="font-medium text-text-light dark:text-white hover:text-primary-light dark:hover:text-primary-dark transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="font-medium text-text-light dark:text-white hover:text-primary-light dark:hover:text-primary-dark transition-colors"
            >
              Products
            </Link>

            {/* Cart Icon with Counter */}
            <Link
              href="/cart"
              className={`relative p-2 text-text-light dark:text-white hover:text-primary-light dark:hover:text-primary-dark transition-colors ${
                isCartHighlighted ? "animate-pulse" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cart-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span
                  className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-600 dark:bg-green-500 rounded-full ${
                    isCartHighlighted ? "animate-bounce" : ""
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
