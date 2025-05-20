"use client";

import { useCart } from "@/contexts/CartContext";
import CartItemCard from "@/components/CartItemCard";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, totalItems } = useCart();

  // Calculate total price
  const totalPrice = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-text-light dark:text-white text-center sm:text-left">
        Shopping Cart
      </h1>

      <div className="bg-card-light dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        {totalItems > 0 ? (
          <>
            <motion.div
              className="mb-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {items.map((item) => (
                <motion.div key={item.product.id} variants={itemVariants}>
                  <CartItemCard item={item} />
                </motion.div>
              ))}
            </motion.div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-text-light dark:text-text-dark">
                  Total:
                </span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button className="w-full py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-md font-bold shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99]">
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-text-light dark:text-white mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link
                href="/products"
                className="inline-block py-3 px-6 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition-all transform hover:scale-105"
              >
                Browse Products
              </Link>
            </motion.div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-blue-50 dark:bg-gray-700 rounded-lg p-6 border border-blue-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-300">
          Context API in Action
        </h2>
        <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
          This cart page demonstrates how Context API allows components to
          access shared state without props drilling:
        </p>
        <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300 space-y-1.5 mt-2">
          <li>The cart data is stored in CartContext</li>
          <li>
            Any component can access or modify the cart using the useCart() hook
          </li>
          <li>
            Changes to the cart (adding/removing items) are reflected everywhere
            automatically
          </li>
          <li>No need to pass cart data through intermediate components</li>
        </ul>
      </div>
    </div>
  );
}
