/*
COMPONENT LEARNING OBJECTIVES:

1. Type-safe props in Next.js components
   - TODO 1.1: Create and use interfaces to define component props
2. TypeScript with Next.js Link and Router
   - TODO 2.1: Use the Link component for navigation
3. Typed dynamic routes and query parameters
   - TODO 3.1: Learn about typing route parameters (demonstrated in code example)
5. Working with images in Next.js
   - TODO 5.1: Use the Next.js Image component with proper props and optimization
*/

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";

// TODO 1.1: Define ProductDetailsProps interface
interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  
  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div>
      {/* TODO 2.1: Learn about using Link component for navigation */}
      <Link href="/products" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
        &larr; Back to Products
      </Link>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TODO 5.1: Notice the Image component with optimization */}
          <div className="relative h-64 md:h-auto">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-blue-400 font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-300 mb-6">{product.description}</p>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Product Features</h2>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Premium quality materials</li>
                <li>1-year warranty</li>
                <li>Free shipping</li>
                <li>30-day money-back guarantee</li>
              </ul>
            </div>
            
            <button 
              className={`mt-6 px-6 py-2 rounded w-full font-medium transition-all ${
                addedToCart 
                  ? "bg-green-600 hover:bg-green-500" 
                  : "bg-blue-600 hover:bg-blue-500"
              } text-white`}
              onClick={handleAddToCart}
              disabled={addedToCart}
            >
              {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
      
      {/* TODO 3.1: Learn about typing route parameters */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">TypeScript with Dynamic Routes</h2>
        <p className="text-gray-300 mb-4">
          This page demonstrates how dynamic routes work with TypeScript in Next.js. The route parameter
          is strongly typed and converted to a number for lookup.
        </p>
        
        <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
          {`// Type definition for route parameters
type ProductPageParams = {
  params: {
    id: string;  // URL params are always strings
  };
};

// Page component with typed params
export default function ProductPage({ params }: ProductPageParams) {
  const productId = parseInt(params.id);
  // ...
}`}
        </pre>
      </div>
    </div>
  );
} 