# Next.js TypeScript Demo Project

A modern web application built with Next.js 14, TypeScript, and Tailwind CSS showcasing Next.js features and best practices.

## Features

- **TypeScript Integration**: Full type safety throughout the application
- **Next.js Image Optimization**: Optimized image loading and display
- **Route Protection**: Authentication demo for protected content
- **Server and Client Components**: Proper usage of React Server Components
- **Dynamic Routing**: Product detail pages with dynamic routes

## Project Structure

```
app/
├── layout.tsx          # Root layout with theme configuration
├── page.tsx            # Home page with navigation and feature showcases
├── products/
│   ├── page.tsx        # Products listing page with all demos
│   └── [id]/
│       └── page.tsx    # Dynamic product detail page
├── components/
│   ├── ProductCard.tsx # Reusable product card with type-safe props
│   ├── ProductDetails.tsx # Product details component
│   ├── ImageDemo.tsx   # Next.js Image component implementation
│   ├── Todo.tsx        # Todo component example
│   └── AuthDemo.tsx    # Authentication and protected content demo
└── types/
    └── index.ts        # Shared TypeScript interfaces and types
```

## Getting Started

1. Install dependencies:
   ```
   pnpm install
   ```

2. Run the development server:
   ```
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **React**: UI component library

## Configuration

- **next.config.ts**: Contains Next.js configuration including image domains
- **tsconfig.json**: TypeScript configuration
- **tailwind.config.js**: Tailwind CSS customization