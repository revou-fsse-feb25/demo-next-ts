/*
COMPONENT LEARNING OBJECTIVES:

1. Type-safe props in Next.js components
   - TODO 1.1: Create and use interfaces to define component props
   - TODO 1.2: Use TypeScript for type checking props including optional props
2. TypeScript with Next.js Link and Router
   - TODO 2.1: Use the Link component with type-safe routing
5. Working with images in Next.js
   - TODO 5.1: Use the Next.js Image component with proper props and optimization
*/

import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";

// TODO 1.1: Define ProductCardProps interface with proper types
interface ProductCardProps {
  product: Product;
  showDetails?: boolean; // Optional prop with default value
}

export default function ProductCard({
  product,
  showDetails = false, // TODO 1.2: Notice the default value for optional prop
}: ProductCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* TODO 5.1: Uncomment to use Image component with proper optimization */}
      {/* <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div> */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-blue-400 font-bold">${product.price.toFixed(2)}</p>

        {showDetails && (
          <p className="text-gray-300 mt-2">{product.description}</p>
        )}

        {/* TODO 2.1: Uncomment to use Link for type-safe routing */}
        {/* <Link href={`/products/${product.id}`}>
          <span className="mt-4 inline-block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
            View Details
          </span>
        </Link> */}
      </div>
    </div>
  );
}
