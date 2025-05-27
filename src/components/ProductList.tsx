"use client";
import { useState, useEffect } from "react";
import { Product } from "@/lib/api";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const ProductList = ({ products, isLoading, error }: ProductListProps) => {
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

  if (products.length === 0) {
    return (
      <div
        className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative"
        role="alert"
      >
        No products found.
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-testid="product-list"
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md border border-slate-200 dark:border-slate-700"
          data-testid={`product-${product.id}`}
        >
          <div className="h-48 overflow-hidden">
            <img
              src={product.images[0] || "https://placehold.co/600x400"}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              {product.title}
            </h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-2">
              ${product.price}
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3">
              {product.description}
            </p>
            <div className="mt-3">
              <span className="inline-block bg-slate-100 dark:bg-slate-700 rounded-full px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                {product.category.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
