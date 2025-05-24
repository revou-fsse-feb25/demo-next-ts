"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/01-basics", label: "1. Testing Basics" },
    { path: "/02-jest-intro", label: "2. Jest Introduction" },
    { path: "/03-testing-functions", label: "3. Testing Functions" },
    { path: "/04-component-testing", label: "4. Component Testing" },
  ];

  return (
    <nav className="mb-8 py-4 border-b border-indigo-200 dark:border-indigo-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Next.js Testing Workshop
          </h1>
          <ThemeToggle />
        </div>
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-800 dark:hover:text-indigo-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
