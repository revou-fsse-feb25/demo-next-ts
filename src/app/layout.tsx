import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

// Define root layout props type
type RootLayoutProps = {
  children: React.ReactNode;
};

// Metadata for the application
export const metadata: Metadata = {
  title: "Next.js TypeScript Demo",
  description: "A demo application for Next.js with TypeScript",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen flex flex-col">
        <header className="bg-gray-800 py-4 border-b border-gray-700">
          <nav className="container mx-auto px-4 flex gap-8">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/products" className="hover:text-blue-400">Products</Link>
          </nav>
        </header>
        
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="bg-gray-800 py-4 border-t border-gray-700 text-center text-sm text-gray-400">
          Next.js TypeScript Demo © {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
