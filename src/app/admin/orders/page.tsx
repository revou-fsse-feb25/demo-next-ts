"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navigation from "@/components/Navigation";
import AdminSidebar from "@/components/AdminSidebar";

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  date: string;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  amount: string;
  items: number;
}

export default function AdminOrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate fetching orders
    setIsLoading(true);
    setTimeout(() => {
      // Mock order data
      const mockOrders: Order[] = [
        {
          id: "ORD-001",
          customer: {
            name: "John Doe",
            email: "john@example.com",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
          date: "2023-05-20T10:30:00Z",
          status: "Completed",
          amount: "$125.00",
          items: 3,
        },
        {
          id: "ORD-002",
          customer: {
            name: "Jane Smith",
            email: "jane@example.com",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          date: "2023-05-19T14:15:00Z",
          status: "Processing",
          amount: "$75.50",
          items: 2,
        },
        {
          id: "ORD-003",
          customer: {
            name: "Robert Johnson",
            email: "robert@example.com",
            avatar: "https://i.pravatar.cc/150?img=3",
          },
          date: "2023-05-18T09:45:00Z",
          status: "Completed",
          amount: "$220.00",
          items: 5,
        },
        {
          id: "ORD-004",
          customer: {
            name: "Emily Davis",
            email: "emily@example.com",
            avatar: "https://i.pravatar.cc/150?img=4",
          },
          date: "2023-05-17T16:20:00Z",
          status: "Cancelled",
          amount: "$45.99",
          items: 1,
        },
        {
          id: "ORD-005",
          customer: {
            name: "Michael Brown",
            email: "michael@example.com",
            avatar: "https://i.pravatar.cc/150?img=5",
          },
          date: "2023-05-16T11:10:00Z",
          status: "Completed",
          amount: "$180.25",
          items: 4,
        },
        {
          id: "ORD-006",
          customer: {
            name: "Sarah Wilson",
            email: "sarah@example.com",
            avatar: "https://i.pravatar.cc/150?img=6",
          },
          date: "2023-05-15T13:25:00Z",
          status: "Pending",
          amount: "$95.75",
          items: 2,
        },
      ];

      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-900 text-green-200";
      case "Processing":
        return "bg-yellow-900 text-yellow-200";
      case "Pending":
        return "bg-blue-900 text-blue-200";
      case "Cancelled":
        return "bg-red-900 text-red-200";
      default:
        return "bg-gray-900 text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-white">
                Order Management
              </h1>
              <div className="flex space-x-4">
                <select className="bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button className="bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Export Orders
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/50 p-4 rounded-md mb-6 border border-red-500">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-300">Loading orders...</p>
              </div>
            ) : (
              <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Items
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img
                                className="h-8 w-8 rounded-full object-cover border border-gray-600"
                                src={order.customer.avatar}
                                alt={order.customer.name}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/150";
                                }}
                              />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-100">
                                {order.customer.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {order.customer.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {order.items}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-400 hover:text-indigo-300 mr-3 transition-colors">
                            <span className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
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
                              View
                            </span>
                          </button>
                          <button className="text-blue-400 hover:text-blue-300 transition-colors">
                            <span className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                              </svg>
                              Invoice
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
