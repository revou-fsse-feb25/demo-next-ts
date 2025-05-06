# Next.js TypeScript Demo Project (Starter)

A modern web application built with Next.js 14, TypeScript, and Tailwind CSS, designed as a step-by-step learning material.

## How to Use This Material

This project is structured as a hands-on workshop. Each step in the learning sequence is scaffolded with `// TODO` comments in the codebase. Code for each step is present but commented out—uncomment and implement as you progress.

**Learning Sequence:**

1. **Understand type-safe props in Next.js components.**
2. **Utilize TypeScript with the Next.js Link component and Router.**
3. **Learn to type dynamic routes and query parameters.**
4. **Explore nested routes and simple private routing.**
5. **Work with images in Next.js.**
6. **SEO in Next.js.**

Each step may have multiple TODOs. Only work on the next TODO after completing the previous one. Do not jump ahead!

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
│   ├── page.tsx        # TypeScript features demo page
├── categories/
│   └── [slug]/page.tsx # Dynamic category page
├── posts/
│   └── [slug]/page.tsx # Dynamic post detail page
├── components/         # (May contain commented-out demo components)
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

## Instructions for Each Step

- Open the relevant file for your current step.
- Look for `// TODO` comments at the top and in the code.
- Uncomment and implement the code as described.
- Only proceed to the next TODO after completing the current one.

---

Happy learning! Follow the sequence for the best experience.