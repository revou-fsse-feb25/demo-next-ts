import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Product } from "../../types";
import ProductDetails from "../../components/ProductDetails";

// Type definition for route parameters
type ProductPageParams = {
  params: {
    id: string; // URL params are always strings
  };
};

// This would normally be fetched from an API
const products: Product[] = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    description: "High-quality noise cancelling headphones with crystal clear sound.",
    imageUrl: "https://via.placeholder.com/600/92c952",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    description: "Track your fitness and stay connected with this feature-packed smartwatch.",
    imageUrl: "https://via.placeholder.com/600/771796",
  },
  {
    id: 3,
    name: "Wireless Keyboard",
    price: 89.99,
    description: "Ergonomic wireless keyboard with backlit keys and long battery life.",
    imageUrl: "https://via.placeholder.com/600/24f355",
  },
];

// Generate metadata for the page (server component)
export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  const id = parseInt(params.id);
  
  // Find product for metadata
  const product = products.find(p => p.id === id);
  
  if (product) {
    return {
      title: `${product.name} | Next.js TypeScript Demo`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        type: "website",
      },
    };
  }
  
  return {
    title: "Product Not Found | Next.js TypeScript Demo",
    description: "The requested product could not be found",
  };
}

export default function ProductPage({ params }: ProductPageParams) {
  // Convert string ID to number
  const productId = parseInt(params.id);
  
  // Get product
  const product = products.find(p => p.id === productId);
  
  // Type-safe handling of missing products
  if (!product) {
    notFound(); // Next.js 404 handling
  }
  
  // Render the client component with the product data
  return (
    <ProductDetails product={product} />
  );
} 