"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Navigation from "@/components/Navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate saving settings
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("Settings saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1000);
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
                Admin Settings
              </h1>
            </div>

            {successMessage && (
              <div className="bg-green-900/50 p-4 rounded-md mb-6 border border-green-500">
                <p className="text-sm text-green-200">{successMessage}</p>
              </div>
            )}

            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg border border-gray-700 divide-y divide-gray-700">
              {/* General Settings */}
              <div className="p-6">
                <h2 className="text-lg font-medium text-white mb-4">
                  General Settings
                </h2>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="siteName"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Site Name
                      </label>
                      <input
                        type="text"
                        name="siteName"
                        id="siteName"
                        defaultValue="NextAuth Demo"
                        className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="siteUrl"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Site URL
                      </label>
                      <input
                        type="url"
                        name="siteUrl"
                        id="siteUrl"
                        defaultValue="https://example.com"
                        className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Site Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={3}
                      defaultValue="A demo site showcasing NextAuth.js authentication with Next.js and TypeScript."
                      className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="enableRegistration"
                      name="enableRegistration"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                    />
                    <label
                      htmlFor="enableRegistration"
                      className="ml-2 block text-sm text-gray-300"
                    >
                      Enable user registration
                    </label>
                  </div>
                </form>
              </div>

              {/* Email Settings */}
              <div className="p-6">
                <h2 className="text-lg font-medium text-white mb-4">
                  Email Settings
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="smtpHost"
                        className="block text-sm font-medium text-gray-300"
                      >
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        name="smtpHost"
                        id="smtpHost"
                        defaultValue="smtp.example.com"
                        className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="smtpPort"
                        className="block text-sm font-medium text-gray-300"
                      >
                        SMTP Port
                      </label>
                      <input
                        type="number"
                        name="smtpPort"
                        id="smtpPort"
                        defaultValue="587"
                        className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="emailFrom"
                        className="block text-sm font-medium text-gray-300"
                      >
                        From Email
                      </label>
                      <input
                        type="email"
                        name="emailFrom"
                        id="emailFrom"
                        defaultValue="noreply@example.com"
                        className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="emailName"
                        className="block text-sm font-medium text-gray-300"
                      >
                        From Name
                      </label>
                      <input
                        type="text"
                        name="emailName"
                        id="emailName"
                        defaultValue="NextAuth Demo"
                        className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="enableEmailVerification"
                      name="enableEmailVerification"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                    />
                    <label
                      htmlFor="enableEmailVerification"
                      className="ml-2 block text-sm text-gray-300"
                    >
                      Require email verification for new accounts
                    </label>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="p-6">
                <h2 className="text-lg font-medium text-white mb-4">
                  Security Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="sessionDuration"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Session Duration (days)
                    </label>
                    <input
                      type="number"
                      name="sessionDuration"
                      id="sessionDuration"
                      defaultValue="30"
                      min="1"
                      max="365"
                      className="mt-1 block w-full max-w-xs bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="enableTwoFactor"
                      name="enableTwoFactor"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                    />
                    <label
                      htmlFor="enableTwoFactor"
                      className="ml-2 block text-sm text-gray-300"
                    >
                      Enable two-factor authentication
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="enableRateLimiting"
                      name="enableRateLimiting"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                    />
                    <label
                      htmlFor="enableRateLimiting"
                      className="ml-2 block text-sm text-gray-300"
                    >
                      Enable rate limiting for login attempts
                    </label>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-800 text-right">
                <button
                  type="submit"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 ml-auto"
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    "Save Settings"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
