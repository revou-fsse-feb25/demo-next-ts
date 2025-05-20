"use client";

import Image from "next/image";
import { useCart, Product } from "@/contexts/CartContext";
import { useState, useRef } from "react";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dotPosition, setDotPosition] = useState({ top: 0, left: 0 });
  const [showDot, setShowDot] = useState(false);

  const handleAddToCart = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Create animation dot at button position
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDotPosition({
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
      });
      setShowDot(true);

      // Get cart icon position to animate towards
      const cartIcon = document.querySelector(".cart-icon");
      if (cartIcon) {
        const cartRect = cartIcon.getBoundingClientRect();
        const dot = document.createElement("div");
        dot.className = "cart-item-dot";
        dot.style.top = `${rect.top + rect.height / 2}px`;
        dot.style.left = `${rect.left + rect.width / 2}px`;
        document.body.appendChild(dot);

        // Animate the dot
        setTimeout(() => {
          dot.style.top = `${cartRect.top + cartRect.height / 2}px`;
          dot.style.left = `${cartRect.left + cartRect.width / 2}px`;
          dot.style.transform = "scale(0.5)";
          dot.style.transition =
            "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        }, 10);

        // Remove the dot and add to cart
        setTimeout(() => {
          document.body.removeChild(dot);
          addToCart(product);
          setIsAnimating(false);
          setShowDot(false);
        }, 500);
      } else {
        // Fallback if cart icon not found
        setTimeout(() => {
          addToCart(product);
          setIsAnimating(false);
          setShowDot(false);
        }, 800);
      }
    }
  };

  return (
    <div className="bg-card-light dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform product-card border border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-text-light dark:text-white mb-1">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 font-medium mt-1 mb-3">
          ${product.price.toFixed(2)}
        </p>
        <button
          ref={buttonRef}
          onClick={handleAddToCart}
          disabled={isAnimating}
          className={`mt-auto w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-2.5 px-4 rounded-md 
            font-semibold shadow-md transition-all relative overflow-hidden flex items-center justify-center
            ${isAnimating ? "pointer-events-none opacity-70" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
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
          <span
            className={isAnimating ? "animate-float-to-cart inline-block" : ""}
          >
            Add to Cart
          </span>
          {isAnimating && (
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
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
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
