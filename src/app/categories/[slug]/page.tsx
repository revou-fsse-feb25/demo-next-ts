/*
LEARNING SEQUENCE FOR THIS FILE:

1. Type-safe props in Next.js components
   - TODO 1.1: Notice typed data and component props
2. TypeScript with Next.js Link and Router
   - TODO 2.1: Use the Link component for navigation
3. Typed dynamic routes and query parameters
   - TODO 3.1: Use PostPageParams type for the page component
   - TODO 3.2: Use the slug parameter from the URL
4. Nested routes and simple private routing
   - TODO 4.1: Understand nested route organization (/categories/[slug])
5. Working with images in Next.js
   - TODO 5.1: Use the Next.js Image component with proper props
6. SEO in Next.js
   - TODO 6.1: Generate dynamic metadata based on category
*/

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Post, PostPageParams } from "../../types";

// TODO 6.1: Generate dynamic metadata based on the category
export async function generateMetadata({ params }: PostPageParams): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} Posts | Next.js TypeScript Blog`,
    description: category.description,
    openGraph: {
      title: `${category.name} Posts`,
      description: category.description,
      type: "website",
    },
  };
}

// TODO 3.2: Use the slug parameter to fetch category data
function getCategoryBySlug(slug: string) {
  const categories = [
    {
      id: "1",
      name: "Next.js",
      slug: "nextjs",
      description: "Articles about Next.js development and best practices",
    },
    {
      id: "2",
      name: "TypeScript",
      slug: "typescript",
      description: "TypeScript tips, tricks, and tutorials",
    },
    {
      id: "3",
      name: "Web Development",
      slug: "web-development",
      description: "General web development articles and guides",
    },
  ];

  return categories.find(category => category.slug === slug);
}

// TODO 3.2: Use the slug parameter to filter posts
function getPostsByCategory(categorySlug: string): Post[] {
  const posts: Post[] = [
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
    // Add more posts as needed
  ];

  return posts.filter(post => 
    post.tags.some(tag => tag.toLowerCase() === categorySlug)
  );
}

// TODO 1.1: Create interface for component props
interface PostListProps {
  posts: Post[];
}

// TODO 1.1: Component with properly typed props
function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <article key={post.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* TODO 5.1: Use Image component with proper props */}
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
            {/* TODO 2.1: Use Link for navigation to post detail */}
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-400 hover:text-blue-300"
            >
              Read more →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

// TODO 3.1 & 4.1: Page component using PostPageParams for typed dynamic routes
export default function CategoryPage({ params }: PostPageParams) {
  // TODO 3.2: Use the slug parameter to fetch data
  const category = getCategoryBySlug(params.slug);
  const posts = getPostsByCategory(params.slug);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        {/* TODO 2.1: Use Link for navigation */}
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* TODO 2.1: Use Link for navigation */}
      <Link
        href="/"
        className="inline-block mb-8 text-blue-400 hover:text-blue-300"
      >
        ← Back to Home
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        <p className="text-gray-300">{category.description}</p>
      </header>

      {/* TODO 1.1: Pass typed posts array to PostList component */}
      <PostList posts={posts} />
    </div>
  );
} 