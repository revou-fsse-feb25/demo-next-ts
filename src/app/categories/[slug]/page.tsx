import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Post, PostPageParams } from "../../types";

// Demonstrate dynamic metadata for category pages
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

// Mock function to get category data
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

// Mock function to get posts by category
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

// Type-safe component props
interface PostListProps {
  posts: Post[];
}

function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <article key={post.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
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

export default function CategoryPage({ params }: PostPageParams) {
  const category = getCategoryBySlug(params.slug);
  const posts = getPostsByCategory(params.slug);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
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

      <PostList posts={posts} />
    </div>
  );
} 