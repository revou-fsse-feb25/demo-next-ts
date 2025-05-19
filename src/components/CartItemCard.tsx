"use client";

import Image from "next/image";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useState } from "react";

type CartItemCardProps = {
  item: CartItem;
};

const CartItemCard = ({ item }: CartItemCardProps) => {
  const { addToCart, removeFromCart } = useCart();
  const { product, quantity } = item;
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    setIsAnimating(true);
    addToCart(product);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700 group hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg px-3 transition-colors">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-sm font-medium text-text-light dark:text-text-dark">
          {product.name}
        </h3>
        <p className="text-sm text-secondary-light dark:text-secondary-dark font-medium">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleRemoveFromCart}
          className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span className="mx-2 text-text-light dark:text-text-dark font-medium min-w-[1.5rem] text-center">
          {quantity}
        </span>
        <button
          onClick={handleAddToCart}
          disabled={isAnimating}
          className={`p-1 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors ${
            isAnimating ? "animate-pulse" : ""
          }`}
          aria-label="Add item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
