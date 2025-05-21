"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navigation from "@/components/Navigation";
import { Product } from "@/types/product";

export default function HomePage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://fakeapi.platzi.com/api/v1/products?limit=6"
        );

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load featured products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl shadow-lg p-8 mb-8 border border-blue-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome, {session?.user?.name || "User"}!
              </h1>
              <p className="text-blue-200 max-w-2xl">
                This is your personal dashboard where you can browse products
                and manage your account.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-blue-800/50 p-4 rounded-lg border border-blue-700 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-700 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Account Type</p>
                    <p className="text-white font-medium">
                      {session?.user?.role === "admin"
                        ? "Administrator"
                        : "Regular User"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 col-span-1">
            <h2 className="text-xl font-semibold text-white mb-4">
              Profile Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-700 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white">{session?.user?.name || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-gray-700 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">{session?.user?.email || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-gray-700 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Role</p>
                  <p className="text-white capitalize">
                    {session?.user?.role || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-700">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Featured Products */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">
              Featured Products
            </h2>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-400">Loading products...</span>
              </div>
            ) : error ? (
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-center">
                <p className="text-red-200">{error}</p>
                <button
                  className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                  onClick={() => window.location.reload()}
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.slice(0, 6).map((product) => (
                  <div
                    key={product.id}
                    className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-900/20 group"
                  >
                    <div className="h-32 overflow-hidden relative">
                      <img
                        src={
                          product.images[0] ||
                          "https://via.placeholder.com/300x150"
                        }
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                        ${product.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium truncate">
                        {product.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                          {product.category.name}
                        </span>
                        <button className="text-blue-400 hover:text-blue-300 text-sm">
                          View details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && !error && (
              <div className="mt-6 text-center">
                <button className="bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-md transition-colors inline-flex items-center space-x-2">
                  <span>View all products</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Activity Section */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-green-900/30 rounded-full p-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white">Successful login</p>
                <p className="text-gray-400 text-sm">Just now</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-900/30 rounded-full p-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white">Viewed product details</p>
                <p className="text-gray-400 text-sm">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-purple-900/30 rounded-full p-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white">Added item to cart</p>
                <p className="text-gray-400 text-sm">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
