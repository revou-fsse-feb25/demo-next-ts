import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieHub - Your Movie Guide",
  description: "Browse and discover amazing movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen`}>
        <NavBar />
        <main className="container mx-auto px-4 py-6 max-w-7xl">
        {children}
        </main>
      </body>
    </html>
  );
}
