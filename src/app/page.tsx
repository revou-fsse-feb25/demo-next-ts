import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Post } from "./types";
import PexelsImageDemo from './components/PexelsImageDemo';

// Demonstrate SEO with metadata
export const metadata: Metadata = {
  title: "Next.js TypeScript Blog Demo",
  description: "A practical demo of Next.js with TypeScript features",
  openGraph: {
    title: "Next.js TypeScript Blog Demo",
    description: "Learn Next.js and TypeScript through practical examples",
    type: "website",
  },
};

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

// Type-safe component props
interface PostCardProps {
  post: Post;
}

// Demonstrate type-safe props with a reusable component
function PostCard({ post }: PostCardProps) {
  return (
    <article className="overflow-hidden rounded-lg bg-gray-800">
      <div className="relative h-48">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-300 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="ml-2 text-sm text-gray-400">{post.author.name}</span>
          </div>
          <Link
            href={`/posts/${post.slug}`}
            className="text-blue-400 hover:text-blue-300"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Next.js TypeScript Blog Demo</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="flex flex-wrap gap-3">
          <Link
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
          </Link>
        </div>
        <PexelsImageDemo />
      </section>
    </div>
  );
}