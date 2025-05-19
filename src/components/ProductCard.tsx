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
    <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
          {product.name}
        </h3>
        <p className="text-secondary-light dark:text-secondary-dark font-medium mt-1">
          ${product.price.toFixed(2)}
        </p>
        <button
          ref={buttonRef}
          onClick={handleAddToCart}
          disabled={isAnimating}
          className={`mt-3 w-full bg-primary-light dark:bg-primary-dark text-white py-2 px-4 rounded-md 
            hover:bg-opacity-90 transition-all relative overflow-hidden
            ${isAnimating ? "pointer-events-none" : ""}`}
        >
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
