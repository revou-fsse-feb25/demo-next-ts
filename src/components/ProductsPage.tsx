"use client";
import { useState, useEffect } from "react";
import { fetchProducts, Product } from "@/lib/api";
import ProductList from "./ProductList";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
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

    loadProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
          All Products
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          This page demonstrates fetching data from an external API and
          displaying it in a component. The data is fetched from the Platzi Fake
          Store API.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
          Product List
        </h2>
        <ProductList products={products} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default ProductsPage;
