"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navigation from "@/components/Navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminAnalyticsPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="flex items-center justify-center h-96">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-3 text-gray-300">Loading analytics data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mock data for charts
  const monthlyRevenue = [
    { month: "Jan", revenue: 12400 },
    { month: "Feb", revenue: 15600 },
    { month: "Mar", revenue: 13200 },
    { month: "Apr", revenue: 18900 },
    { month: "May", revenue: 22400 },
    { month: "Jun", revenue: 19800 },
  ];

  const topProducts = [
    { name: "Laptop", sales: 342 },
    { name: "Smartphone", sales: 289 },
    { name: "Headphones", sales: 187 },
    { name: "Monitor", sales: 145 },
    { name: "Keyboard", sales: 98 },
  ];

  const userAcquisition = [
    { source: "Organic Search", percentage: 45 },
    { source: "Direct", percentage: 30 },
    { source: "Social Media", percentage: 15 },
    { source: "Referral", percentage: 10 },
  ];

  const deviceUsage = [
    { device: "Desktop", percentage: 58 },
    { device: "Mobile", percentage: 35 },
    { device: "Tablet", percentage: 7 },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-white">Analytics</h1>
              <div className="flex space-x-4">
                <select className="bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last 12 months</option>
                  <option>All time</option>
                </select>
                <button className="bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                  Export Report
                </button>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 mb-6">
              <h2 className="text-lg font-medium text-white mb-4">
                Monthly Revenue
              </h2>
              <div className="h-80">
                <div className="h-64 flex items-end justify-between px-2">
                  {monthlyRevenue.map((item, index) => (
                    <div
                      key={index}
                      className="w-1/12 flex flex-col items-center"
                    >
                      <div
                        className="w-full bg-blue-600 rounded-t-sm"
                        style={{
                          height: `${
                            (item.revenue /
                              Math.max(
                                ...monthlyRevenue.map((i) => i.revenue)
                              )) *
                            100
                          }%`,
                        }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-2">
                        {item.month}
                      </span>
                      <span className="text-xs text-gray-500">
                        ${item.revenue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-semibold text-white mt-1">
                      $102,400
                    </p>
                  </div>
                  <div className="bg-green-900/30 p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-green-400 text-sm font-medium">
                    +8.2%
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Total Orders
                    </p>
                    <p className="text-2xl font-semibold text-white mt-1">
                      1,240
                    </p>
                  </div>
                  <div className="bg-blue-900/30 p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-400"
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
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-green-400 text-sm font-medium">
                    +5.3%
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Conversion Rate
                    </p>
                    <p className="text-2xl font-semibold text-white mt-1">
                      3.42%
                    </p>
                  </div>
                  <div className="bg-purple-900/30 p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-red-400 text-sm font-medium">
                    -0.5%
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Avg. Order Value
                    </p>
                    <p className="text-2xl font-semibold text-white mt-1">
                      $82.50
                    </p>
                  </div>
                  <div className="bg-yellow-900/30 p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-green-400 text-sm font-medium">
                    +2.8%
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>
            </div>

            {/* Two Column Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Top Products */}
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <h2 className="text-lg font-medium text-white mb-4">
                  Top Products
                </h2>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{product.name}</span>
                        <span className="text-gray-400">
                          {product.sales} sold
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (product.sales /
                                Math.max(...topProducts.map((p) => p.sales))) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Acquisition */}
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <h2 className="text-lg font-medium text-white mb-4">
                  User Acquisition
                </h2>
                <div className="flex items-center justify-center">
                  {/* Simple donut chart visualization */}
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="transparent"
                        stroke="#3B82F6"
                        strokeWidth="4"
                        strokeDasharray="100 0"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="transparent"
                        stroke="#10B981"
                        strokeWidth="4"
                        strokeDasharray="30 70"
                        strokeDashoffset="-100"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="transparent"
                        stroke="#F59E0B"
                        strokeWidth="4"
                        strokeDasharray="15 85"
                        strokeDashoffset="-130"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="transparent"
                        stroke="#EF4444"
                        strokeWidth="4"
                        strokeDasharray="10 90"
                        strokeDashoffset="-145"
                      />
                    </svg>
                  </div>
                  <div className="ml-8 space-y-3">
                    {userAcquisition.map((source, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${
                            index === 0
                              ? "bg-blue-500"
                              : index === 1
                              ? "bg-green-500"
                              : index === 2
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-sm text-gray-300">
                          {source.source} ({source.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Device Usage */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white mb-4">
                Device Usage
              </h2>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-3xl">
                  <div className="flex items-end h-64">
                    {deviceUsage.map((device, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className={`w-full ${
                            index === 0
                              ? "bg-indigo-600"
                              : index === 1
                              ? "bg-pink-600"
                              : "bg-amber-600"
                          } rounded-t-sm`}
                          style={{ height: `${device.percentage * 2}px` }}
                        ></div>
                        <div className="mt-2 text-center">
                          <div className="text-sm font-medium text-gray-300">
                            {device.device}
                          </div>
                          <div className="text-xs text-gray-500">
                            {device.percentage}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
