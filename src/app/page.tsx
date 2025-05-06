/*
LEARNING SEQUENCE FOR THIS FILE:

1. Type-safe props in Next.js components
   - TODO 1.1: Create a PostCard component that accepts a typed Post prop.
   - TODO 1.2: Render a list of PostCard components using sample data.
2. TypeScript with Next.js Link and Router
   - TODO 2.1: Use the Link component to navigate to a post detail page.
   - TODO 2.2: Use Link for category navigation.
3. Typed dynamic routes and query parameters
   - TODO 3.1: (Implemented in posts/[slug]/page.tsx)
4. Nested routes and simple private routing
   - TODO 4.1: (Implemented in categories/[slug]/page.tsx)
5. Working with images in Next.js
   - TODO 5.1: Use the Next.js Image component for post covers and avatars.
6. SEO in Next.js
   - TODO 6.1: Add metadata export for SEO.
*/

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Post } from "./types";
// import PexelsImageDemo from './components/PexelsImageDemo'; // TODO 5.2: Uncomment for image API demo

// TODO 6.1: Uncomment to enable SEO metadata
// export const metadata: Metadata = {
//   title: "Next.js TypeScript Blog Demo",
//   description: "A practical demo of Next.js with TypeScript features",
//   openGraph: {
//     title: "Next.js TypeScript Blog Demo",
//     description: "Learn Next.js and TypeScript through practical examples",
//     type: "website",
//   },
// };

// Sample data - in a real app, this would come from an API
const featuredPosts: Post[] = [
  {
    id: "1",
    title: "Getting Started with Next.js and TypeScript",
    slug: "getting-started-with-nextjs-typescript",
    content: "Learn how to build modern web applications...",
    excerpt: "A comprehensive guide to building modern web applications with Next.js and TypeScript",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
      bio: "Full-stack developer and tech writer",
    },
    publishedAt: "2024-03-20",
    tags: ["Next.js", "TypeScript", "Web Development"],
  },
  {
    id: "2",
    title: "Type-Safe Routing in Next.js",
    slug: "type-safe-routing-in-nextjs",
    content: "Explore how to implement type-safe routing...",
    excerpt: "Learn how to implement type-safe routing in your Next.js applications",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    author: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      bio: "Frontend developer and Next.js enthusiast",
    },
    publishedAt: "2024-03-19",
    tags: ["Routing", "TypeScript", "Next.js"],
  },
];

// TODO 1.1: Uncomment to define the PostCardProps interface
// interface PostCardProps {
//   post: Post;
// }

// TODO 1.1: Uncomment to define the PostCard component
// function PostCard({ post }: PostCardProps) {
//   return (
//     <article className="overflow-hidden rounded-lg bg-gray-800">
//       {/* TODO 5.1: Uncomment to use Next.js Image for post cover */}
//       {/* <div className="relative h-48">
//         <Image
//           src={post.coverImage}
//           alt={post.title}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//       </div> */}
//       <div className="p-6">
//         <h2 className="text-xl font-bold mb-2">{post.title}</h2>
//         <p className="text-gray-300 mb-4">{post.excerpt}</p>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             {/* TODO 5.1: Uncomment to use Next.js Image for avatar */}
//             {/* <Image
//               src={post.author.avatar}
//               alt={post.author.name}
//               width={40}
//               height={40}
//               className="rounded-full"
//             /> */}
//             <span className="ml-2 text-sm text-gray-400">{post.author.name}</span>
//           </div>
//           {/* TODO 2.1: Uncomment to use Link for post detail navigation */}
//           {/* <Link
//             href={`/posts/${post.slug}`}
//             className="text-blue-400 hover:text-blue-300"
//           >
//             Read more →
//           </Link> */}
//         </div>
//       </div>
//     </article>
//   );
// }

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Next.js TypeScript Blog Demo</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* TODO 1.2: Uncomment to render PostCard components */}
          {/* {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))} */}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {/* TODO 2.2: Uncomment to use Link for category navigation */}
          {/* <Link
            href="/categories/nextjs"
            className="bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-full text-blue-100"
          >
            Next.js
          </Link>
          <Link
            href="/categories/typescript"
            className="bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-full text-blue-100"
          >
            TypeScript
          </Link>
          <Link
            href="/categories/web-development"
            className="bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-full text-blue-100"
          >
            Web Development
          </Link> */}
        </div>
        {/* TODO 5.2: Uncomment to show PexelsImageDemo for image API demo */}
        {/* <PexelsImageDemo /> */}
      </section>
    </div>
  );
}