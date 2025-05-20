"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/contexts/CartContext";
import { motion } from "framer-motion";

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1625723044792-44de33747b55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

export default function ProductsPage() {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-3xl font-bold mb-8 text-text-light dark:text-white text-center sm:text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Products
      </motion.h1>

      <motion.div
        className="bg-card-light dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Browse our selection of high-quality products. Adding items to your
          cart will update the count in the navigation bar instantly, thanks to
          our Context API-powered state management.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
