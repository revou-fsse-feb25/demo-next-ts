/**
 * Root Layout Component
 * 
 * This component defines the base layout for the entire application.
 * See the TODO IMPLEMENTATION GUIDE in src/app/page.tsx for the full implementation sequence.
 * This file covers steps 3.1 and 3.3 in the guide.
 */

// TODO: 1.1 Import necessary dependencies
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// TODO: 1.2 Set up fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: 1.3 Define metadata
export const metadata: Metadata = {
  title: "Todo App with Next.js and TypeScript",
  description: "A simple Todo app built with Next.js, TypeScript, and React Hook Form",
};

// TODO: 2.1 Create Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/* TODO: 2.2 Add dark mode class directly to html element */}
      <head>
        {/* No script needed - using dark mode by default */}
      </head>
      {/* TODO: 2.3 Set up body with font variables */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
