import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";

// Define props type with TypeScript
interface ProductCardProps {
  product: Product;
  showDetails?: boolean; // Optional prop with default value
}

export default function ProductCard({
  product,
  showDetails = false,
}: ProductCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-blue-400 font-bold">${product.price.toFixed(2)}</p>

        {showDetails && (
          <p className="text-gray-300 mt-2">{product.description}</p>
        )}

        {/* Link to dynamic product page with TypeScript */}
        <Link href={`/products/${product.id}`}>
          <span className="mt-4 inline-block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
            View Details
          </span>
        </Link>
      </div>
    </div>
  );
}
