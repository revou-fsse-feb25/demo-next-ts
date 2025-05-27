/**
 * API service for products
 */

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}

// Helper function to determine if we should log errors
// This can be mocked in tests
export const shouldLogErrors = (): boolean => {
  return process.env.NODE_ENV !== "test";
};

/**
 * Fetches all products from the API
 * @returns Promise with array of products
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Only log errors if not in a test environment
    if (shouldLogErrors()) {
      console.error("Error fetching products:", error);
    }
    throw error;
  }
}

/**
 * Searches products by title
 * @param title The title to search for
 * @returns Promise with array of matching products
 */
export async function searchProductsByTitle(title: string): Promise<Product[]> {
  try {
    if (!title) {
      throw new Error("Title parameter is required");
    }

    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/?title=${encodeURIComponent(
        title
      )}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Only log errors if not in a test environment
    if (shouldLogErrors()) {
      console.error("Error searching products:", error);
    }
    throw error;
  }
}

/**
 * Calculates statistics about products
 * @param products Array of products
 * @returns Object with statistics
 */
export function calculateProductStats(products: Product[]) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    throw new Error("Valid products array is required");
  }

  // Calculate total products
  const totalProducts = products.length;

  // Calculate price statistics
  const prices = products.map((product) => product.price);
  const totalPrice = prices.reduce((sum, price) => sum + price, 0);
  const averagePrice = totalPrice / totalProducts;
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Count products by category
  const categoryCounts: Record<string, number> = {};
  products.forEach((product) => {
    const categoryName = product.category.name;
    categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
  });

  return {
    totalProducts,
    totalPrice,
    averagePrice,
    minPrice,
    maxPrice,
    categoryCounts,
  };
}
