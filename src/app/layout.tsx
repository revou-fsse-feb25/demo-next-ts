import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "State Management Demo",
  description: "Next.js TypeScript State Management Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark`}
      >
        <ThemeProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <footer className="bg-card-light dark:bg-card-dark border-t border-gray-200 dark:border-gray-700 py-4">
                <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                  <p>State Management Demo - Next.js with TypeScript</p>
                </div>
              </footer>
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
