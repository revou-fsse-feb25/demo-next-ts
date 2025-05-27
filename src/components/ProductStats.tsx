"use client";
import { useState, useEffect } from "react";
import { fetchProducts, calculateProductStats, Product } from "@/lib/api";

const ProductStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    totalProducts: number;
    totalPrice: number;
    averagePrice: number;
    minPrice: number;
    maxPrice: number;
    categoryCounts: Record<string, number>;
  } | null>(null);

  useEffect(() => {
    const loadProductsAndCalculateStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);

        // Calculate stats
        const productStats = calculateProductStats(data);
        setStats(productStats);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching products"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProductsAndCalculateStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
          Product Statistics
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          This component demonstrates using advanced functions to process data
          and calculate statistics.
        </p>
      </div>

      {stats && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
            Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">
                Total Products
              </h3>
              <p
                className="text-3xl font-bold text-indigo-600 dark:text-indigo-400"
                data-testid="total-products"
              >
                {stats.totalProducts}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-700 dark:text-green-300">
                Average Price
              </h3>
              <p
                className="text-3xl font-bold text-green-600 dark:text-green-400"
                data-testid="average-price"
              >
                ${stats.averagePrice.toFixed(2)}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
                Total Value
              </h3>
              <p
                className="text-3xl font-bold text-blue-600 dark:text-blue-400"
                data-testid="total-price"
              >
                ${stats.totalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-amber-700 dark:text-amber-300">
                Min Price
              </h3>
              <p
                className="text-3xl font-bold text-amber-600 dark:text-amber-400"
                data-testid="min-price"
              >
                ${stats.minPrice}
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300">
                Max Price
              </h3>
              <p
                className="text-3xl font-bold text-purple-600 dark:text-purple-400"
                data-testid="max-price"
              >
                ${stats.maxPrice}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
              Products by Category
            </h3>
            <div className="space-y-2" data-testid="category-counts">
              {Object.entries(stats.categoryCounts).map(([category, count]) => (
                <div
                  key={category}
                  className="flex justify-between items-center"
                >
                  <span className="text-slate-600 dark:text-slate-400">
                    {category}
                  </span>
                  <span className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md text-slate-700 dark:text-slate-300">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductStats;
