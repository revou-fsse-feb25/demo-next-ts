"use client";
import { useState } from "react";
import { searchProductsByTitle, Product } from "@/lib/api";
import ProductList from "./ProductList";

const SearchProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a search term");
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const results = await searchProductsByTitle(searchTerm);
      setProducts(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while searching"
      );
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
          Search Products
        </h2>

        <form
          onSubmit={handleSearch}
          className="flex gap-2"
          data-testid="search-form"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter product title..."
            className="flex-grow px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
            data-testid="search-input"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
            disabled={isSearching}
            data-testid="search-button"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
          Search Results
        </h2>
        <ProductList
          products={products}
          isLoading={isSearching}
          error={error}
        />
      </div>
    </div>
  );
};

export default SearchProducts;
