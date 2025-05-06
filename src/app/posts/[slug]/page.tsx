/*
LEARNING SEQUENCE FOR THIS FILE:

1. Type-safe props in Next.js components
   - TODO 1.1: Notice typed data and component props
2. TypeScript with Next.js Link and Router
   - TODO 2.1: Use the Link component for navigation
3. Typed dynamic routes and query parameters
   - TODO 3.1: Learn to type dynamic route parameters
   - TODO 3.2: Use the slug parameter from the URL
   - TODO 3.3: Handle missing data with notFound()
5. Working with images in Next.js
   - TODO 5.1: Use the Next.js Image component with proper props
6. SEO in Next.js
   - TODO 6.1: Generate dynamic metadata based on content
*/

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Post, PostPageParams } from "../../types";

// TODO 6.1: Generate dynamic metadata based on the post content
export async function generateMetadata({ params }: PostPageParams): Promise<Metadata> {
  // In a real app, fetch post data here
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Next.js TypeScript Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      authors: [post.author.name],
    },
  };
}

// TODO 1.1 & 3.2: Mock function to get post data using the slug parameter
function getPostBySlug(slug: string): Post | undefined {
  const posts: Post[] = [
    {
      id: "1",
      title: "Getting Started with Next.js and TypeScript",
      slug: "getting-started-with-nextjs-typescript",
      content: "Learn how to build modern web applications with Next.js and TypeScript. This comprehensive guide covers everything from setting up your development environment to deploying your first application.",
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
      content: "Learn how to implement type-safe routing in your Next.js applications using TypeScript. This article covers dynamic routes, query parameters, and how to ensure type safety throughout your routing system.",
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

  return posts.find(post => post.slug === slug);
}

// TODO 1.1: Interface for component props
interface CommentSectionProps {
  postId: string;
}

// Component with proper typing
function CommentSection({ postId }: CommentSectionProps) {
  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <div className="space-y-4">
        {/* In a real app, fetch and display comments here */}
        <p className="text-gray-300">No comments yet. Be the first to comment!</p>
      </div>
    </div>
  );
}

// TODO 3.1: Use PostPageParams type for the page component props
export default function PostPage({ params }: PostPageParams) {
  // TODO 3.2: Use the slug parameter from the URL
  const post = getPostBySlug(params.slug);

  // TODO 3.3: Handle missing data with notFound()
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* TODO 2.1: Use Link for navigation */}
      <Link
        href="/"
        className="inline-block mb-8 text-blue-400 hover:text-blue-300"
      >
        ← Back to Home
      </Link>

      {/* TODO 5.1: Use Image component with proper props */}
      <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4">
          {/* TODO 5.1: Another Image component example */}
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-gray-400">{new Date(post.publishedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="prose prose-invert max-w-none">
          <p>{post.content}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag.toLowerCase()}`}
            className="bg-blue-900 text-blue-100 px-3 py-1 rounded-full text-sm hover:bg-blue-800"
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* TODO 1.1: Pass typed props to the component */}
      <CommentSection postId={post.id} />
    </div>
  );
} 